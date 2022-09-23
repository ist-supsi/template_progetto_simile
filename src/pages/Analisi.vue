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


            <div v-if="Object.keys(series_data).length>0" class="row" >
                            <div class="col-md-12">

                                    <highcharts :constructor-type="'stockChart'" :options="series_data"></highcharts>

                            </div>
                        </div>

                        <div slot="footer">
                            <i v-if="Object.keys(series_data).length==0"
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
            rangeSelectorFrom: "Da",
            rangeSelectorTo: "A",
            rangeSelectorZoom: "Periodo",
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
            NotifyButton,
            // BULLET_DEFAULTS,
            // LINE_DEFAULT_ANALISI,
            // ModalButton,
            // Modal
        },
        data () { return {
            last_value: null,
            series_data: {},
            allProcedures: this.$root.allProcedures,
            groupedProcedures: {},
            procedureInfos: {},
            variableInfo: {},
            description: '',
            valueInfo: {},
            cards: [{}],
            analisysVariable: this.$root.analisysVariable,
            analisysVariableUrn: this.$root.analisysVariableUrn,
            seriesBegin: new Date(new Date().setDate(new Date().getDate() - 365)),
            seriesEnd: new Date(),
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
          seriesBegin: {
              handler(value) {
                this.setSeries();
              },
              deep: true
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
            this.setSeries();
        },
        methods: {
            setBegin (value) {
                this.seriesBegin = new Date(new Date().setDate(new Date().getDate() - value));

            },
            setSeries () {
                var self = this;
                self.series_data = {};
                let counter=0;

                // if(this.groupedProcedures[self.procedureInfos[this.analisysVariable]]!=undefined){
                    for (const procedure of this.groupedProcedures[self.procedureInfos[this.analisysVariable].group]) {

                    console.log(procedure);
                    this.istsos.fetchSeries(
                        procedure,
                        this.procedureInfos[procedure].observedproperties,
                        this.seriesBegin,
                        this.seriesEnd
                    ).then((response)=>{
                        const result = istsosToHighcharts.istosToLine(response, undefined, true);
                        console.log(result);

                        if ( procedure!=self.analisysVariable ) {
                            result.options.series[0].visible = false;
                        } else {
                            result.options.series[0].visible = true;
                            const series = result.options.series[0].data.map((xy)=>xy[1]);

                            const variableAverage = mean(series);
                            const variableStd = sqrt(std(series));

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
                        result.options.series[0].color = this.category_colors[counter];
                        counter = counter+1;

                        if ( !self.series_data.series ) {
                            self.series_data = result.options;
                        } else {
                            self.series_data.series.push(result.options.series[0]);
                            self.series_data.series.sort((el1, el2) => { el1.name<el2.name } );
                        };
                    });
                };
                // };

            },
            // DEPRECATED
            // istosToBullet (response) {
            //     var self = this;
            //     const dataArray = response.data.data[0].result.DataArray;
            //
            //     // console.log(dataArray); /profondità di [+-]?\d+(\.\d+)? m/gm
            //     // const coords_ = response.data.data[0].featureOfInterest.geom.match(/<gml:Point srsName='EPSG:4326'><gml:coordinates>[+-]?\d+(\.\d+)?,[+-]?\d+(\.\d+)?,[+-]?\d+(\.\d+)?<\/gml:coordinates><\/gml:Point>/gm);
            //     // const coords = coords_[0].match(/[+-]?\d+(\.\d+)?,[+-]?\d+(\.\d+)?,[+-]?\d+(\.\d+)?/gm)[0].split(',')
            //
            //     let info = {
            //         // order: order,
            //         procedure: this.analisysVariable,
            //         options: JSON.parse(JSON.stringify(BULLET_DEFAULTS)),
            //         // coords: coords.map(el=>parseFloat(el))
            //     };
            //
            //     info.uom = dataArray.field[1].uom;
            //     info.x = new Date(dataArray.values[0][0]);
            //     // info.options.title.text = "Temperatura Superficiale";
            //     // TODO: new Date(dataArray.values[0][0])) -> more human format!
            //     info.options.subtitle.text = `Valore rilevato al: ${dataArray.values[0][0]}`;
            //
            //     info.options.xAxis.categories[0] = `<span class="hc-cat-title">uom</span><br/>${dataArray.field[1].uom}`;
            //     info.options.series[0].data[0].y = parseFloat(dataArray.values[0][1].toPrecision(2));
            //     info.value = dataArray.values[0][1];
            //     return info;
            // },
            // istosToLine (response) {
            //       var self = this;
            //       const dataArray = response.data.data[0].result.DataArray;
            //       let info = {
            //           // order: order,
            //           procedure: this.analisysVariable,
            //           options: JSON.parse(JSON.stringify(LINE_DEFAULT_ANALISI))
            //       };

            //     //   info.options.yAxis.title.text = `Temperatura (${dataArray.field[1].uom})`
            //       info.uom = dataArray.field[1].uom;
            //       info.x = new Date(dataArray.values[0][0]);
            //       // info.options.xAxis.categories[0] = `<span class="hc-cat-title">uom</span><br/>${dataArray.field[1].uom}`;
            //       // info.options.series[0].data[0].y = dataArray.values[0][1];
            //       // info.value = dataArray.values[0][1];
            //       info.options.xAxis.categories = [`<span class="hc-cat-title">uom</span><br/>${dataArray.field[1].uom}`];
            //       const coeff = 1000 * 60 * 1;
            //       info.options.subtitle.text = `Valore rilevato al: ${dataArray.values[0][0]}`;
            //     //   info.options.xAxis.categories[0] = `<span class="hc-cat-title">uom</span><br/>${dataArray.field[1].uom}`;
            //       info.options.series[0].data = dataArray.values.filter(el => el[1]!==null).map(el => [(new Date(new Date(Math.round(new Date(el[0]).getTime() / coeff) * coeff))).getTime(), parseFloat(el[1].toPrecision(3))]);
            //       info.options.series[0].name = response.data.data[0].name;
            //       info.value = dataArray.values[0][1];
            //       // info.options.series[0].label = {format: '{name}'+`${dataArray.field[1].uom}`}
            //       return info;

            // },
            getCardIcon2(name){

                return indicatorDescription.getCardIcon(name);

            },

        },
  }
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
