<template>

    <div class="content">


        <div class="container-fluid">
            <div class="row">
                <div class="col-6">
                    <span height="200px"><h3>{{cards[0].title}}</h3>
                      <!-- {{ description }} -->
                      {{cards[0].description}}
                    </span>
                </div>


                        <div class="col-6">

                        <stats-card>
                            <div slot="header" class="icon-warning">
                                <i :class="getCardIcon2(cards[0].name)"
                                    data-toggle="tooltip"
                                    :title="cards[0].title||'no data'"></i>

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
                                <i v-if="!cards[0].time" class="fa fa-refresh fa-spin"></i>
                                <!-- <i v-if="cards[0].data===undefined" class="fa fa-exclamation-triangle"></i> -->
                                <i v-if="cards[0].time" class="fa fa-calendar" aria-hidden="true"></i>{{cards[0].time && cards[0].time.date}}
                                <i v-if="cards[0].time" class="fa fa-clock-o"
                                    data-toggle="tooltip"
                                    :title="`approximately ${cards[0].time.from_now}`"
                                    aria-hidden="true"></i>{{cards[0].time && cards[0].time.time}}
                            </div>
                        </stats-card>

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

            <div v-if="Object.keys(series_data).length>0" class="row mb-4" >
                <div class="col-md-12">
                        <highcharts :constructor-type="'stockChart'" :options="series_data"></highcharts>
                </div>
            </div>
            <div v-else-if="data_loading" class="row mb-4" >
                <div class="col-md-12">
                  <i v-if="wind_data_loading"
                      class="fa fa-refresh fa-spin"></i>
                </div>
            </div>

            <div v-if="Object.keys(wind_data_options).length>0" class="row mb-4" >
                <div class="col-md-8">
                        <highcharts :options="wind_data_options"></highcharts>
                </div>
                <div class="col-md-4">
                        <highcharts :options="wind_series"></highcharts>
                </div>
            </div>
            <div v-else-if="wind_data_loading" class="row mb-4" >
                <div class="col-md-12">
                  <i class="fa fa-refresh fa-spin"></i>
                </div>
            </div>


            <!-- <div slot="footer">
                <i v-if="wind_data_loading"
                    class="fa fa-refresh fa-spin"></i>
            </div> -->
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

    import { Chart } from 'highcharts-vue';
    import Highcharts from 'highcharts';
    import More from 'highcharts/highcharts-more';
    // import loadBullet from 'highcharts/modules/bullet.js';

    import ChartCard from 'src/components/Cards/ChartCard.vue';
    import HighchartCard from 'src/components/Cards/HighchartCard.vue';
    import StatsCard from 'src/components/Cards/StatsCard.vue';
    import LTable from 'src/components/Table.vue';

    // import Modal from 'src/components/Modal.vue';
    // import ModalButton from 'src/components/ModalButton.vue';
    import NotifyButton from 'src/components/NotifyButton.vue';
    import AnchorToAnalisysPage from 'src/components/AnchorToAnalisysPage.vue';

    import { mean,std,min,sqrt,max } from 'mathjs';
    import indicatorDescription  from '../indicatorDescription';

    import istsosToHighcharts from './istsosToHighcharts';
    import exportingInit from 'highcharts/modules/exporting';
    import stockInit from 'highcharts/modules/stock';
    // loadBullet(Highcharts);

    import sharedFunctions from './sharedFunctions.js';

    More(Highcharts)
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
            decimalPoint: ',',
            week:'settimana',
            from:'dal'
        }


    });

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
            data_loading: false,
            wind_data_options: {},
            wind_data_loading: false,
            // wind_data_options: {plotOptions: {
            //     windbarb: {
            //        turboThreshold: Infinity
            //     }
            // }},
            // wind_freq_options: {},
            wind_series: {},
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
            // locked: false,
            variableAverage: 0,
            variableStd: 0,
            bulletOptions: {},
            setDataTimeout: null,
            category_colors: [
                '#2f7ed8',
                '#8bbc21', '#f28f43', '#492970',
                '#0d233a', '#77a1e5', '#a6c96a']
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
                  this._setSeries();
              },
              deep: true
          },
          seriesEnd: {
              handler(value) {
                  this._setSeries();
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

            this.seriesFrom = this.seriesBegin.toISOString().split('T')[0];
            this.seriesTo = this.seriesEnd.toISOString().split('T')[0];

            this.istsos.call({
                procedures: this.analisysVariable
            }).then((response)=>{
                self.variableInfo = response;
            });

            this.istsos.fetch({
                procedures: this.analisysVariable,
                eventtime: 'last',
                observedproperties: this.analisysVariableUrn
            }).then((result)=>{
                // const info = self.istosToBullet(result);
                // console.log(info);
                // self.bulletOptions = info.options;

                let data;
                let time;
                if(result.data.data[0].result.DataArray.values[0][1]){
                    data = result.data.data[0].result.DataArray.values[0][1].toFixed(2);
                    time = new Date(result.data.data[0].result.DataArray.values[0][0])
                }
                else{
                    data=null;
                    time=new Date(result.data.data[0].result.DataArray.values[0][0]);
                };
                // console.log(result.data.data);
                const info= {
                    message: result.data.data[0].featureOfInterest.name.split(':').at(-1),
                    data: data,
                    time: time && {
                        date: time.toLocaleDateString('it-IT', {day: '2-digit', month: '2-digit', year: '2-digit'}),
                        time: time.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'}),
                        from_now: sharedFunctions.fromNow(time)
                    },
                    uom: result.data.data[0].result.DataArray.field[1].uom,
                    name:result.data.data[0].result.DataArray.field[1].name,
                    description:'',
                };
                // self.cards[0].message = result.data.data[0].featureOfInterest.name.split(':').at(-1);
                // self.cards[0].data = result.data.data[0].result.DataArray.values[0][1].toFixed(2);
                // cards[0].message =

                if(indicatorDescription.indicatorDescription[info.name]==undefined){
                    info.title = 'N.P.';
                    info.description = 'N.P.';
                }
                else{
                    info.title = indicatorDescription.indicatorDescription[info.name].title;
                    info.icon = indicatorDescription.indicatorDescription[info.name].icon;
                    info.description = indicatorDescription.indicatorDescription[info.name].breveDescrizione;
                }
                self.cards = [info];

            });

            [this.groupedProcedures, this.procedureInfos] = sharedFunctions.groupProcedures(this.allProcedures);

        },
        methods: {
            // setBegin (value) {
            //     this.seriesBegin = new Date(new Date().setDate(new Date().getDate() - value));
            // },
            _setSeries () {
                var self = this;
                clearTimeout(this.setDataTimeout);
                this.setDataTimeout = setTimeout(()=>{self.setSeries ()})
            },
            // has_wind_data () {
            //     return !!this.wind_data_options.series
            // },
            setSeries () {
                var self = this;
                this.series_data = {};
                // this.wind_data_options = {plotOptions: {
            		//     windbarb: {
                //   	   turboThreshold: Infinity
                //      }
                // }};

                for (const [index, procedure] of this.groupedProcedures[self.procedureInfos[this.analisysVariable].group].entries()) {
                    //
                    this.data_loading = true;
                    console.log([procedure, self.analisysVariable]);

                    this.istsos.fetchSeries(
                        procedure,
                        self.procedureInfos[procedure].observedproperties,
                        self.seriesBegin,
                        self.seriesEnd
                    ).then((response)=>{
                        let result = istsosToHighcharts.istosToLine(response, undefined, true);

                        // TODO:
                        // 1. verificare il raggruppamento delle procedure nella pagina del Como

                        if ( procedure!=self.analisysVariable ) {
                            result.options.series[0].visible = false; // should be false
                        } else {
                            result.options.series[0].visible = true;
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

                        if ( !self.series_data.series ) {
                            result.options.legend.enabled = false;
                            // result.options.series[0].name = self.allProcedures[result.options.series[0].name].description;
                            self.series_data = result.options;
                        } else {
                            self.series_data.legend.enabled = true;
                            result.options.series[0].color = this.category_colors[index];
                            // result.options.series[0].name = self.allProcedures[result.options.series[0].name].description;

                            self.series_data.series.push(result.options.series[0]);
                            // self.series_data.series.sort((el1, el2) => { el1.name<el2.name } );
                        };

                        // result.options.series[counter].color = this.category_colors[counter];

                        if (procedure=='VENTO_VEL_MAX') {
                            self.wind_data_loading = true;
                            //
                            this.wind_data_options = {plotOptions: {
                        		    windbarb: {
                              	   turboThreshold: Infinity
                                 }
                            }};

                            let windPromise = this.istsos.fetchSeries(
                                "VENTO_DIR",
                                "urn:ogc:def:parameter:x-istsos:1.0:meteo:wind:direction",
                                self.seriesBegin,
                                self.seriesEnd
                            )

                            let timeout;
                            result.options.chart.events = {render: function(event) {
                                var evt = this;
                                // IMPORTANTE: per non reiterare l'azione ogni volta che l'evento viene invocato
                                clearTimeout(timeout);
                                timeout = setTimeout(()=>{
                                    windPromise.then((response)=>{
                                        const windirData = istsosToHighcharts.istsosToSeries(response);

                                        let windataObj = {};
                                        for (const el of windirData.series) {
                                            windataObj[el[0]] = el[1];
                                        };

                                        const start_ts = evt.rangeSelector.maxInput.min;
                                        const end_ts = evt.rangeSelector.minInput.max;
                                        const end = new Date(end_ts);
                                        const start = new Date(start_ts);

                                        const sd = self.series_data.series[0].data.map(cc=>(Math.abs(start-(new Date(cc[0]))) ));
                                        const ed = self.series_data.series[0].data.map(cc=>(Math.abs(end-(new Date(cc[0]))) ));

                                        const startIndex = sd.indexOf(Math.min(...sd));
                                        const endIndex = ed.indexOf(Math.min(...ed));

                                        // let startIndex = self.series_data.series[0].data.map(cc=>cc[0]).indexOf(start.getTime());
                                        // if (startIndex==-1) { startIndex=0 };
                                        // let endIndex = self.series_data.series[0].data.map(cc=>cc[0]).indexOf(end.getTime());
                                        // if (endIndex==-1) { endIndex=self.series_data.series[0].data.length };

                                        let wind_data = self.series_data.series[0].data.slice(startIndex, endIndex).map((el)=>[...el, windataObj[el[0]]]);

                                        const wind_series = wind_data.map((el)=> el.slice(1).reverse());

                                        // *************************************
                                        // A causa di uno strano limite del grafico wind barb che supporta fino a 1000
                                        // valori ho introdotto questo workaround per limitare la serie al massimo consentito
                                        // issue aperta: https://github.com/highcharts/highcharts/issues/17851
                                        // const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
                                        // const series_excess = wind_data.length-1000;
                                        // if ( series_excess>0 ) {
                                        //     for (let i = 0; i < series_excess; i++) {
                                        //         wind_data.splice(random(1, wind_data.length-1), 1)
                                        //     }
                                        // };
                                        // *************************************

                                        self.wind_data_options = istsosToHighcharts.windbarb(wind_data);

                                        self.wind_data_options.title.text = 'Velocità del vento';
                                        self.wind_data_options['subtitle'] = {
                                            text: 'Comparazione tra velocità e direzione del vento per il periodo in dettaglio'
                                        };
                                        //Copio l'oggetto wind_data e trattengo le proprietà che mi interessano  direzione e velocità

                                        //     const allowedProperties = ['dato1', 'dato2'];

                                        //     const allKeys = Object.keys(wind_data);
                                        //     const freqs =allKeys.reduce((next, key)=> {
                                        //         if(allowedProperties.includes(key)){
                                        //         return { ...next, [key]: wind_data[key]};
                                        //     } else {
                                        //         return next;
                                        //     }
                                        // } , {});


                                        self.wind_series = istsosToHighcharts.polar(wind_series);

                                        // const b = 16;
                                        // const dirs = Array(b+1).fill(0).map((_, i) => [i*(360/b), 0]);
                                        // console.log(wind_data);
                                        // const freqs = wind_data.reduce((pp, cc)=>{
                                        //     const mm = dirs.map(d=>Math.abs(d[0]-cc[2]));
                                        //     let ii = mm.indexOf(min(mm));
                                        //     if (ii==(mm.length-1)) {ii=0};
                                        //     pp[ii][1] = pp[ii][1]+1;
                                        //     return pp
                                        // }, [...dirs]).slice(0, dirs.length-1).map(vv=>vv[1]);

                                        // let wind_freq_options = istsosToHighcharts.polar(freqs);
                                        // console.log(wind_freq_options)
                                        // wind_freq_options.title.text = 'Frequenza della direzione';
                                        // wind_freq_options.subtitle.text = '';
                                        //   wind_freq_options.series[0].name = 'Frequenza'

                                        // self.wind_freq_options = wind_freq_options;
                                        self.wind_data_loading = false;
                                    });
                                });

                            }};
                        };

                    });
                    // break;
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
