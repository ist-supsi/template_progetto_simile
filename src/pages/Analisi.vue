<template>

    <div class="content">


        <div class="container-fluid">
            <div class="row">
                <div class="col-6">
                    <span height="200px"><H3>Descrizione</H3>
                      {{ description }}
                    </span>
                </div>


                        <div class="col-6">
                        <!-- <div class="alert alert-simile"> -->
                        <stats-card>
                            <div slot="header" class="icon-warning">
                                <!-- <i class="nc-icon nc-chart text-warning"></i> -->
                                <i :class="getCardIcon2(cards[0].name)"
                                    data-toggle="tooltip"
                                    title="cards[0].title||'no data'"></i>

                            </div>
                            <div slot="content">
                                <p v-if="!cards[0].title" class="card-category placeholder-glow">
                                <span class="placeholder col-12"></span>
                                </p>
                                <p v-else class="card-category">{{cards[0].title || "--"}}</p>
                                <h4 class="card-title">{{cards[0].data || "N.P."}} {{cards[0].uom || ""}}</h4>
                                <p class="card-category">{{cards[0].message || "--"}}</p>
                            </div>
                            <div slot="footer">
                                <i v-if="cards[0].data===null" class="fa fa-refresh fa-spin"></i>
                                <i v-if="cards[0].data===undefined" class="fa fa-exclamation-triangle"></i>
                                <i v-if="cards[0].time" class="fa fa-calendar" aria-hidden="true"></i>{{cards[0].time && cards[0].time.date}}
                                <i v-if="cards[0].time" class="fa fa-clock-o" aria-hidden="true"></i>{{cards[0].time && cards[0].time.time}}
                            </div>
                        </stats-card>
                        <!-- </div> -->
                        </div>

            </div>

            <div class="row">
              <div class="col-md-6">
                <base-input type="date"
                    label=""
                    placeholder=""
                    :max="seriesTo"
                    helperText="Dati richiesti a partire dal"
                    v-model="seriesFrom">
                </base-input>
              </div>
              <div class="col-md-6">
                <base-input type="date"
                    label=""
                    placeholder=""
                    :min="seriesFrom"
                    :max="(new Date()).toISOString().split('T')[0]"
                    helperText="Dati richiesti fino al"
                    v-model="seriesTo">
                </base-input>
              </div>
            </div>

            <div v-if="Object.keys(series_data).length>0" class="row" >
                <div class="col-md-12">
                        <highcharts :constructor-type="'stockChart'" :options="series_data"></highcharts>
                </div>
            </div>

            <div v-if="Object.keys(wind_data_options).length>0" class="row" >
                <div class="col-md-8">
                        <highcharts :options="wind_data_options"></highcharts>
                </div>
                <div class="col-md-8">
                        <!-- <highcharts :options=""></highcharts> -->
                </div>
            </div>

            <div slot="footer">
                <i v-if="Object.keys(wind_data_options).length==0"
                    class="fa fa-refresh fa-spin"></i>
            </div>
            <!-- <div class="row">
                <div class="col-12">
                    <card>
                        <div class="row">
                            <div class="col-md-12">
                              <div class="form-group row">
                                  <label for="inputPassword" class="col-sm-1 col-form-label">Periodo</label>
                                  <div class="col-sm-11">
                                      <select @input="setBegin($event.target.value)" class="form-control">
                                          <option :value="7">Una settimana</option>
                                          <option :value="35">Un mese</option>
                                          <option :value="371">Un anno</option>
                                       </select>
                                  </div>
                              </div>

                            </div>
                        </div>


                    </card>
                </div>
            </div> -->
        </div>
    </div>
</template>
<script>

    import {Chart} from 'highcharts-vue';
    import Highcharts from 'highcharts';
    // import loadBullet from 'highcharts/modules/bullet.js';

    import ChartCard from 'src/components/Cards/ChartCard.vue'
    import HighchartCard from 'src/components/Cards/HighchartCard.vue'
    import StatsCard from 'src/components/Cards/StatsCard.vue'
    import LTable from 'src/components/Table.vue'

    // import Modal from 'src/components/Modal.vue';
    // import ModalButton from 'src/components/ModalButton.vue';
    import NotifyButton from 'src/components/NotifyButton.vue';
    import AnchorToAnalisysPage from 'src/components/AnchorToAnalisysPage.vue';

    import { mean,std,min,sqrt,max } from 'mathjs';
    import indicatorDescription  from '../indicatorDescription';

    import istsosToHighcharts from './istsosToHighcharts';
    import exportingInit from 'highcharts/modules/exporting';
    import stockInit from 'highcharts/modules/stock'

    // loadBullet(Highcharts);

    stockInit(Highcharts)

    Highcharts.setOptions({
        lang: {
            loading: 'Sto caricando...',
            months: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
            weekdays: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Venerdì', 'Sabato', 'Domenica'],
            shortMonths: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lugl', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
            exportButtonTitle: "Esporta",
            printButtonTitle: "Importa",
            rangeSelectorFrom: "Dati in dettaglio dal",
            rangeSelectorTo: "fino al",
            rangeSelectorZoom: "Lunghezza periodo in dettaglio",
            downloadPNG: 'Download immagine PNG',
            downloadJPEG: 'Download immagine JPEG',
            downloadPDF: 'Download documento PDF',
            downloadSVG: 'Download immagine SVG',
            printChart: 'Stampa grafico',
            thousandsSep: ".",
            decimalPoint: ','
        }


    });
    const LINE_DEFAULT_ANALISI = {
        chart: {
            zoomType: 'x',
            inverted: false,

        },
        height: '400px',
        time: {
            timezone: 'Europe/Rome'
        },
        title: {
            text: 'Serie temporale'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
            "clic e trascina nell'area del tracciato per ingrandire" : 'Pizzica il grafico per ingrandire'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            gridLineWidth: 1,
            title: {
              text: ''
            }
        },
        // legend: {
        //     enabled: true
        // },
        plotOptions: {
            line: {marker: {enabled: false}}
        },
        // rangeSelector: {
        //     inputFields: {
        //         startValue: new Date(2022, 8, 15),
        //     },
        //     inputPosition: {
        //     align: 'left',
        //     x: 0,
        //     y: 0
        //      },
        //     buttonPosition: {
        //         align: 'right',
        //         x: 0,
        //         y: 0
        //     },
        //     inputDateFormat: '%b %e, %Y %H:%M',
        //      buttons: [
        //         {
        //             type: 'month',
        //             count: 1,
        //             text: '1m',
        //             events: {
        //                 click: function() {
        //                     alert('Clicked button');
        //                 }
        //             }
        //         }, {
        //             type: 'month',
        //             count: 3,
        //             text: '3m'
        //         }, {
        //             type: 'month',
        //             count: 6,
        //             text: '6m'
        //         }, {
        //             type: 'ytd',
        //             text: 'YTD'
        //         }, {
        //             type: 'year',
        //             count: 1,
        //             text: '1y'
        //         }, {
        //             type: 'all',
        //             text: 'All'
        //         }
        //     ]
        // },
        series: [{
            type: 'line',
            name: '',
            data: [1,2,3,],
            // color: dataColor
        }]
    };

    export default {
        components: {
            LTable,
            ChartCard,
            StatsCard,
            highcharts: Chart,
            HighchartCard,
            NotifyButton
            // BULLET_DEFAULTS,
            // LINE_DEFAULT_ANALISI,
            // ModalButton,
            // Modal
        },
        data () { return {
            last_value: null,
            series_data: {},
            wind_data_options: {},
            allProcedures: this.$root.allProcedures,
            groupedProcedures: {},
            procedureInfos: {},
            variableInfo: {},
            description: '',
            valueInfo: {},
            cards: [{}],
            analisysVariable: this.$root.analisysVariable,
            analisysVariableUrn: this.$root.analisysVariableUrn,
            seriesFrom: null,
            seriesTo: null,
            seriesBegin: new Date(new Date().setDate(new Date().getDate() - 185)),
            seriesEnd: new Date(),
            locked: false,
            variableAverage: 0,
            variableStd: 0,
            bulletOptions: {},
            category_colors: ['#2f7ed8',, '#a6c96a', '#492970', '#f28f43',
                '#0d233a', '#77a1e5', '#8bbc21']
        }},
        watch: {
          series_data: {
             handler(val){
               // do stuff
             },
             deep: true
          },
          wind_data_options: {
             handler(val){
               // do stuff
             },
             deep: true
          },
          valueInfo: {
             handler(val){
               // do stuff
             },
             deep: true
          },
          cards:{
            handler(val){

            },
            deep: true
          },
          seriesFrom: {
              handler(value) {
                  this.seriesBegin = new Date(value);
              },
              // deep: true
          },
          seriesBegin: {
              handler(value) {
                  if (this.locked===false) {
                      this.locked=true;
                      this.setSeries();
                  };

              },
              deep: true
          },
          seriesEnd: {
              handler(value) {
                  if (this.locked===false) {
                      this.locked=true;
                      this.setSeries();
                  };
              },
              deep: true
          },
          seriesTo: {
              handler(value) {
                  this.seriesEnd = new Date(value);
              },
              // deep: true
          },
          variableInfo: {
              handler(value) {
                  this.description = this.variableInfo.data.data.description
              },
              deep: true
          }
        },
        mounted() {
            var self = this;
            this.istsos = this.$root.istsos;

            this.seriesFrom = this.seriesBegin.toISOString().split('T')[0]
            this.seriesTo = this.seriesEnd.toISOString().split('T')[0]

            this.istsos.call({
                procedures: this.analisysVariable
            }).then((response)=>{
                self.variableInfo = response;
            });

            let prm = this.istsos.fetch({
                procedures: this.analisysVariable,
                eventtime: 'last',
                observedproperties: this.analisysVariableUrn
            }).then((result)=>{
                // const info = self.istosToBullet(result);
                // console.log(info);
                // self.bulletOptions = info.options;

                let data;
                if(result.data.data[0].result.DataArray.values[0][1]){
                    data =result.data.data[0].result.DataArray.values[0][1].toFixed(2)
                }
                else{
                    data=null;
                };

                const info= {
                    message: result.data.data[0].featureOfInterest.name.split(':').at(-1),
                    data: data,
                    uom: result.data.data[0].result.DataArray.field[1].uom,
                    name:result.data.data[0].result.DataArray.field[1].name,
                };
                // self.cards[0].message = result.data.data[0].featureOfInterest.name.split(':').at(-1);
                // self.cards[0].data = result.data.data[0].result.DataArray.values[0][1].toFixed(2);
                // cards[0].message =

                if(indicatorDescription.indicatorDescription[info.name]==undefined){
                    info.title = 'N.P.';
                }
                else{
                    info.title = indicatorDescription.indicatorDescription[info.name].title;
                    info.icon = indicatorDescription.indicatorDescription[info.name].icon;
                }
                self.cards = [info];

            });

            this.groupedProcedures = Object.values(this.allProcedures).reduce((acc, it) => {

                let arr = it.name.split('_');
                let key;
                if ( arr.length<=2 ) {
                    key = it.name;
                } else {
                    key = arr.slice(0, -2).join('_');
                };
                self.procedureInfos[it.name] = {
                    group: key,
                    observedproperties: it.observedproperties[0].definition
                };
                if ( acc ) {
                    if ( key in acc ) {
                        acc[key].push(it.name);
                    } else {
                        acc[key] = [it.name];
                    };
                };
                return acc;

            }, {});
            // this.setSeries();
        },
        methods: {
            // setBegin (value) {
            //     this.seriesBegin = new Date(new Date().setDate(new Date().getDate() - value));
            // },
            setSeries () {
                var self = this;
                self.series_data = {};
                self.wind_data_options = {};
                let counter=0;

                for (const procedure of this.groupedProcedures[self.procedureInfos[this.analisysVariable].group]) {

                    this.istsos.fetchSeries(
                        procedure,
                        this.procedureInfos[procedure].observedproperties,
                        this.seriesBegin,
                        this.seriesEnd
                    ).then((response)=>{
                        let result = istsosToHighcharts.istosToLine(response, undefined, true);

                        if ( procedure!=self.analisysVariable ) {
                            result.options.series[counter].visible = true;
                        } else {
                            result.options.series[counter].visible = true;
                            const series = result.options.series[0].data.map((xy)=>xy[1]);

                            if ( series.length > 0 ) {
                                const variableAverage = mean(series);
                                // const variableStd = sqrt(std(series));

                                result.options.yAxis.plotLines = [{
                                    color: 'darkgrey',
                                    dashStyle: 'ShortDash',
                                    width: 2,
                                    value: variableAverage,
                                    label: {
                                        text: 'media della serie',
                                        align: 'center',
                                        style: {color: 'darkgrey'}
                                    }
                                }];
                            };
                        };
                        result.options.series[counter].color = this.category_colors[counter];
                        counter = counter+1;

                        if (procedure=='VENTO_VEL_MAX') {

                            this.istsos.fetchSeries(
                                "VENTO_DIR",
                                "urn:ogc:def:parameter:x-istsos:1.0:meteo:wind:direction",
                                this.seriesBegin,
                                this.seriesEnd
                            ).then((response)=>{
                                const windirData = istsosToHighcharts.istsosToSeries(response);

                                let windataObj = {};
                                for (const el of windirData.series) {
                                    windataObj[el[0]] = el[1];
                                };
                                console.log(windataObj);
                                console.log(result);
                                let timeout;
                                result.options.chart.events = {render: function(event) {
                                    // IMPORTANTE: per non reiterare l'azione ogni volta che l'evento viene invocato
                                    clearTimeout(timeout);
                                    timeout = setTimeout(()=>{
                                        const start_ts = this.rangeSelector.maxInput.min;
                                        const end_ts = this.rangeSelector.minInput.max;
                                        const end = new Date(end_ts);
                                        const start = new Date(start_ts);

                                        let startIndex = self.series_data.series[0].data.map(cc=>cc[0]).indexOf(start.getTime());
                                        if (startIndex==-1) { startIndex=0 };
                                        let endIndex = self.series_data.series[0].data.map(cc=>cc[0]).indexOf(end.getTime());
                                        if (endIndex==-1) { endIndex=self.series_data.series[0].data.length };

                                        let wind_data = self.series_data.series[0].data.slice(startIndex, endIndex);
                                        for ( const el of wind_data ) {
                                            el.push(windataObj[el[0]]||null);
                                        };
                                        console.log(wind_data);
                                        self.wind_data_options = istsosToHighcharts.windbarb(wind_data);
                                    }, 1000);
                                }};
                            });
                        };
                        if ( !self.series_data.series ) {
                            self.series_data = result.options;
                        } else {
                            self.series_data.series.push(result.options.series[0]);
                            self.series_data.series.sort((el1, el2) => { el1.name<el2.name } );
                        };
                    });
                };

                self.locked = false; //
                // self.wind_data_options=result.options;
                // self.wind_data_options=self.series_data
            },
            getCardIcon2(name){
                return indicatorDescription.getCardIcon(name);
            }
        }
    };

</script>
<style>

#bulletgraph {
    height: 130px;
}

.hc-cat-title {
    font-size: 13px;
    font-weight: bold;
}

.highcharts-figure,
.highcharts-data-table table {
    min-width: 320px;
    max-width: 800px;
    margin: 1em auto;
}

.highcharts-data-table table {
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #ebebeb;
    margin: 10px auto;
    text-align: center;
    width: 100%;
    max-width: 500px;
}

.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}

.highcharts-data-table th {
    font-weight: 600;
    padding: 0.5em;
}

.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
    padding: 0.5em;
}

.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}

.highcharts-data-table tr:hover {
    background: #f1f7ff;
}

.stats-card {
    height: 150px;
    overflow-y: auto;
}


</style>
