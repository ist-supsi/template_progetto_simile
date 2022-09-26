<template>
    <div class="row" >
        <div class="col-md-12">
            <highcharts :options="options"></highcharts>
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

    import windbarbInit from 'highcharts/modules/windbarb'

    // loadBullet(Highcharts);

    stockInit(Highcharts)
    windbarbInit(Highcharts)

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
            data: [
                [Date.UTC(2017, 0, 1, 0), 8.9, 246],
                [Date.UTC(2017, 0, 1, 1), 4.1, 242],
                [Date.UTC(2017, 0, 1, 2), 3.2, 262],
                [Date.UTC(2017, 0, 1, 3), 1.5, 284],
                [Date.UTC(2017, 0, 1, 4), 1.1, 294],
                [Date.UTC(2017, 0, 1, 5), 0.4, 192],
                [Date.UTC(2017, 0, 1, 6), 0.2, 30],
                [Date.UTC(2017, 0, 1, 7), 1.1, 110],
                [Date.UTC(2017, 0, 1, 8), 1.4, 112],
                [Date.UTC(2017, 0, 1, 9), 2.1, 132],
                [Date.UTC(2017, 0, 1, 10), 1.6, 134],
                // [1.5, 128],
                // [0.7, 91],
                // [0.7, 275],
                // [0.6, 341],
                // [4.5, 236],
                // [4.9, 241],
                // [3.4, 234],
                // [0.7, 260],
                // [1.1, 274],
                // [0.9, 327],
                // [0.5, 336],
                // [0.4, 331],
                // [1.4, 157]
            ],
            options: {}
        }},
        watch: {},
        mounted() {
            this.options = {

                title: {
                    text: 'Observed wind in Vik, 30. July 2022'
                },

                subtitle: {
                    text: 'Source: ' +
                        '<a href="https://www.yr.no/nb/historikk/graf/1-137598/Norge/Vestland/Vik/Vik%C3%B8yri?q=2022-07-30"' +
                        'target="_blank">YR</a>'
                },

                xAxis: {
                    type: 'datetime',
                    offset: 40
                },

                yAxis: {
                    title: {
                        text: 'Wind speed (m/s)'
                    }
                },

                plotOptions: {
                    series: {
                        pointStart: Date.UTC(2017, 0, 1, 0),
                        // pointInterval: 36e5
                    }
                },

                series: [{
                    type: 'windbarb',
                    data: this.data,
                    name: 'Wind',
                    color: Highcharts.getOptions().colors[1],
                    showInLegend: false,
                    tooltip: {
                        valueSuffix: ' m/s'
                    }
                }, {
                    type: 'area',
                    keys: ['x', 'y'], // wind direction is not used here
                    data: this.data,
                    color: Highcharts.getOptions().colors[0],
                    fillColor: {
                        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [
                                1,
                                Highcharts.color(Highcharts.getOptions().colors[0])
                                    .setOpacity(0.25).get()
                            ]
                        ]
                    },
                    name: 'Wind speed',
                    tooltip: {
                        valueSuffix: ' m/s'
                    },
                    states: {
                        inactive: {
                            opacity: 1
                        }
                    }
                }],

                rangeSelector: {

                    // inputFields: {
                    //     startValue: new Date(2022, 7, 8),
                    //     endValue: new Date(2022, 8, 9),
                    // },
                    // inputPosition: {
                    //     align: 'left',
                    //     x: 0,
                    //     y: 0
                    // },
                    // buttonPosition: {
                    //     align: 'right',
                    //     x: 0,
                    //     y: 0
                    // },
                    // inputDateFormat: '%Y-%m-%d',
                    buttons: [
                        // {
                        //     type: 'week',
                        //     count: 2,
                        //     text: '2w'
                        // },
                        // {
                        //     type: 'month',
                        //     count: 1,
                        //     text: '1m',
                        //     events: {
                        //     // click: function() {
                        //     //     alert('Clicked button');
                        //     // }
                        // }
                        // }, {
                        //     type: 'month',
                        //     count: 3,
                        //     text: '3m'
                        // },
                        // // {
                        //     type: 'month',
                        //     count: 6,
                        //     text: '6m'
                        // },
                        // {
                        //     type: 'ytd',
                        //     text: 'YTD'
                        // },
                        // {
                        //     type: 'year',
                        //     count: 1,
                        //     text: '1y'
                        // },
                        {
                            type: 'all',
                            text: 'All'
                        }
                    ],
                    inputEnabled: false
                }

            };
        },
        methods: {},
    }

</script>
