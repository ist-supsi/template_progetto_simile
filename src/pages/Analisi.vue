<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <card>
                        <div v-if="Object.keys(bulletOptions).length>0" class="row">
                            <div class="col-md-12">
                              <figure class="highcharts-figure">
                                  <highcharts id="bulletgraph" :options="bulletOptions"></highcharts>
                                </figure>
                            </div>
                        </div>


                        <div v-if="Object.keys(series_data).length>0" class="row">
                            <div class="col-md-12">
                                <highcharts :options="series_data"></highcharts>
                            </div>
                        </div>

                        <div slot="footer">
                            <i v-if="Object.keys(series_data).length==0"
                                class="fa fa-refresh fa-spin"></i>
                        </div>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {Chart} from 'highcharts-vue';
    import Highcharts from 'highcharts';
    import loadBullet from 'highcharts/modules/bullet.js';

    import ChartCard from 'src/components/Cards/ChartCard.vue'
    import HighchartCard from 'src/components/Cards/HighchartCard.vue'
    import StatsCard from 'src/components/Cards/StatsCard.vue'
    import LTable from 'src/components/Table.vue'

    // import Modal from 'src/components/Modal.vue';
    // import ModalButton from 'src/components/ModalButton.vue';
    import NotifyButton from 'src/components/NotifyButton.vue';
    import AnchorToAnalisysPage from 'src/components/AnchorToAnalisysPage.vue';

    import { mean,std,min } from 'mathjs'

    loadBullet(Highcharts);

    Highcharts.setOptions({
        chart: {
            inverted: true,
            marginLeft: 135,
            type: 'bullet'
        },
        title: {
            text: null
        },
        legend: {
            enabled: false
        },
        yAxis: {
            gridLineWidth: 0
        },
        plotOptions: {
            series: {
                pointPadding: 0.25,
                borderWidth: 0,
                color: '#000'
            }
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        }
    });

    const dataColor = '#4572A7'

    const BULLET_DEFAULTS = {
        chart: {
            marginTop: 40
        },
        title: {
            text: "Ultimo valore misurato"
        },
        subtitle: {style: {"color": "#666666", 'padding-bottom': '1.5em'}},
        xAxis: {
            categories: ['<span class="hc-cat-title">Temperature</span><br/>°C']
        },
        yAxis: {
            plotBands: [{
                from: 0,
                to: 0,
                color: 'grey'
            },{
                from: 0,
                to: 0,
                color: 'rgb(116, 180, 202)'
            }, {
                from: 0,
                to: 0,
                color: 'rgb(93, 133, 198)'
            }, {
                from: 0,
                to: 0,
                color: 'rgb(68, 125, 99)'
            }],
            title: null
        },
        series: [{
            data: [{
                y: 0,
                target: null,
                color: dataColor
            }]
        }],
        tooltip: {
            pointFormat: '<b>{point.y}</b> (with target at {point.target})'
        }
    };

    const SERIES_DEFAULTS = {
        chart: {
            zoomType: 'x',
            inverted: false
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
            title: {
              text: 'Temperatura'
            }
        },
        legend: {
            enabled: true
        },
        plotOptions: {},
        series: [{
            type: 'line',
            name: 'Temperatura',
            data: [],
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
            // ModalButton,
            // Modal
        },
        data () { return {
            last_value: null,
            series_data: {},
            allProcedure: this.$root.allProcedure.data,
            groupedProcedures: {},
            procedureInfos: {},
            analisysVariable: this.$root.analisysVariable,
            analisysVariableUrn: this.$root.analisysVariableUrn,
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
          }
        },
        mounted() {
            var self = this;

            let prm = this.istsos.fetch({
                procedures: this.analisysVariable,
                eventtime: 'last',
                observedproperties: this.analisysVariableUrn
            }).then((result)=>{
                const info = self.istosToBullet(result);
                // console.log(info);

                self.bulletOptions = info.options;
            });

            this.groupedProcedures = this.allProcedure.reduce((acc, it) => {
                let arr = it.name.split('_');
                if ( arr.length<=2 ) {
                    acc[it.name] = [it.name];
                    return acc;
                } else {
                    const key = arr.slice(0, -2).join('_');
                    self.procedureInfos[it.name] = {
                        group: key,
                        observedproperties: it.observedproperties[0].definition
                    };
                    if ( key in acc ) {
                        acc[key].push(it.name);
                    } else {
                        acc[key] = [it.name];
                    };
                    return acc;
                };
            }, {});

            let i=0;
            for (const procedure of this.groupedProcedures[self.procedureInfos[this.analisysVariable].group]) {
                this.istsos.fetchSeries(procedure, this.procedureInfos[procedure].observedproperties).then((result)=>{
                    if ( procedure!=self.analisysVariable ) {
                        result.options.series[0].visible = false;
                    } else {
                        const series = result.options.series[0].data.map((xy)=>xy[1]);
                        // console.log(series);
                        const variableAverage = mean(series);
                        const variableStd = std(series);

                        prm.then(()=>{
                            self.bulletOptions.yAxis.plotBands[0].from = 0;
                            self.bulletOptions.yAxis.plotBands[0].to = variableAverage-3*variableStd;
                            self.bulletOptions.yAxis.plotBands[1].from = variableAverage-3*variableStd;
                            self.bulletOptions.yAxis.plotBands[1].to = variableAverage-variableStd;
                            self.bulletOptions.yAxis.plotBands[2].from = variableAverage-variableStd;
                            self.bulletOptions.yAxis.plotBands[2].to = variableAverage+variableStd;
                            self.bulletOptions.yAxis.plotBands[3].from = variableAverage+variableStd;
                            self.bulletOptions.yAxis.plotBands[3].to = variableAverage+3*variableStd;
                            self.bulletOptions.series[0].data[0].target = series.slice(-1)[0];
                        });

                    };

                    result.options.series[0].color = this.category_colors[i];
                    i = i+1;
                    if ( !self.series_data.series ) {
                        self.series_data = result.options;
                    } else {
                        self.series_data.series.push(result.options.series[0]);
                        self.series_data.series.sort((el1, el2) => { el1.name<el2.name } );
                    };
                });
            };

        },
        methods: {
            istosToBullet (response) {
                var self = this;
                const dataArray = response.data.data[0].result.DataArray;

                // console.log(dataArray); /profondità di [+-]?\d+(\.\d+)? m/gm
                // const coords_ = response.data.data[0].featureOfInterest.geom.match(/<gml:Point srsName='EPSG:4326'><gml:coordinates>[+-]?\d+(\.\d+)?,[+-]?\d+(\.\d+)?,[+-]?\d+(\.\d+)?<\/gml:coordinates><\/gml:Point>/gm);
                // const coords = coords_[0].match(/[+-]?\d+(\.\d+)?,[+-]?\d+(\.\d+)?,[+-]?\d+(\.\d+)?/gm)[0].split(',')

                let info = {
                    // order: order,
                    procedure: this.analisysVariable,
                    options: JSON.parse(JSON.stringify(BULLET_DEFAULTS)),
                    // coords: coords.map(el=>parseFloat(el))
                };

                info.uom = dataArray.field[1].uom;
                info.x = new Date(dataArray.values[0][0]);
                // info.options.title.text = "Temperatura Superficiale";
                // TODO: new Date(dataArray.values[0][0])) -> more human format!
                info.options.subtitle.text = `Valore rilevato al: ${dataArray.values[0][0]}`;

                info.options.xAxis.categories[0] = `<span class="hc-cat-title">uom</span><br/>${dataArray.field[1].uom}`;
                info.options.series[0].data[0].y = parseFloat(dataArray.values[0][1].toPrecision(2));
                info.value = dataArray.values[0][1];
                return info;
            }
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

</style>
