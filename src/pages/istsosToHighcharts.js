import Highcharts from 'highcharts';
import sharedFunctions from './sharedFunctions.js';
import { log } from 'mathjs';

const category_colors = ['#2f7ed8',, '#a6c96a', '#492970', '#f28f43',
    '#0d233a', '#77a1e5', '#8bbc21'];

const LINE_DEFAULTS = {

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
        "clicca e trascina nell'area del tracciato per ingrandire" : 'Pizzica il grafico per ingrandire'
    },
    xAxis: {
        type: 'datetime',
    },
    yAxis: {
        gridLineWidth: 1,
        title: {
          text: ''
        }
    },
    legend: {
         enabled: false
    },
    plotOptions: {
        line: {marker: {enabled: false}}
    },
    series: [{
        type: 'line',
        name: '',
        data: [],
        // color: dataColor
    }]
};

let STOCK_DEFAULTS = {...LINE_DEFAULTS, legend: {
     enabled: true
}};

STOCK_DEFAULTS['rangeSelector'] = {

    // inputFields: {
    //     startValue: new Date(2022, 7, 8),
    //     endValue: new Date(2022, 8, 9),
    // },
    inputPosition: {
        align: 'left',
        x: 0,
        y: 0
    },
    buttonPosition: {
        align: 'right',
        x: 0,
        y: 0
    },
    inputDateFormat: '%Y-%m-%d',
    buttons: [
        {
            type: 'week',
            count: 2,
            text: '2w'
        },
        {
            type: 'month',
            count: 1,
            text: '1m',
            events: {
            // click: function() {
            //     alert('Clicked button');
            // }
        }
        }, {
            type: 'month',
            count: 3,
            text: '3m'
        },
        {
            type: 'month',
            count: 6,
            text: '6m'
        },
        // {
        //     type: 'ytd',
        //     text: 'YTD'
        // },
        {
            type: 'year',
            count: 1,
            text: '1y'
        },
        {
            type: 'all',
            text: 'All'
        }
    ],
    selected: 2
};

const WINDBARB_DEFAULTS = {

    title: {
        text: 'Vento'
    },

    // subtitle: {
    //     text: 'Source: ' +
    //         '<a href="https://www.yr.no/nb/historikk/graf/1-137598/Norge/Vestland/Vik/Vik%C3%B8yri?q=2022-07-30"' +
    //         'target="_blank">YR</a>'
    // },

    xAxis: {
        type: 'datetime',
        offset: 40,
        // format: '{value}'
    },

    yAxis: {
        title: {
            text: 'Velocità del vento (m/s)'
        }
    },

    plotOptions: {
        series: {
            pointStart: Date.UTC(2017, 0, 1, 0),
            // pointInterval: 36e5
        }
    },
    legend: {
         enabled: false
    },
    windbarb: {
      // animation: false
      animationLimit: 999,
      // grouping: false
      turboThreshold: Infinity
    },
    series: [
      {
        type: 'windbarb',
        data: [],
        name: 'Wind',
        color: Highcharts.getOptions().colors[1],
        showInLegend: false,

        // tooltip: {valueSuffix: ' m/s'}
      },
      {
        type: 'line',
        keys: ['x', 'y'], // wind direction is not used here
        data: [],
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
        tooltip: {valueSuffix: ' m/s'},
        states: {inactive: {opacity: 1}}
    }]
};

const dirNames = ['N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW'
];
const nameByDirs = dirNames.map((nn,i)=>[nn, i]).reduce((pp, cc)=>{
    const b = dirNames.length;
    pp[cc[1]*(360/b)] = cc[0];
    return pp
}, {});

const polar_base_interval = 22.5

const POLAR_DEFAULT = {

    chart: {
        polar: true
    },

    title: {
        text: 'Rosa dei venti'
    },

    subtitle: {
        text: 'Distribuzione velocità e direzione del vento'
    },

    pane: {
        startAngle: 0,
        endAngle: 360
    },

    xAxis: {
        tickInterval: polar_base_interval,
        min: 0,
        max: 360,
        labels: {
            // format: '{value}°'
            formatter: (x) => {
              return nameByDirs[x.value]
            }
        }
    },

    yAxis: {
        min: 0
    },

    plotOptions: {
        series: {
            pointStart: polar_base_interval/(-2),
            pointInterval: polar_base_interval
        },
        column: {
            pointPadding: 0,
            groupPadding: 0
        },
        areaspline: {marker: {enabled: false}}
    },

    legend: {
         enabled: false
    },

    series: [{
        // type: 'areaspline',
        type: 'scatter',
        name: '',
        data: [],
        pointPlacement: 'between'
    }]
};

const AREARANGE_DEFAULT = {};

function polar(data) {
    let options = {...POLAR_DEFAULT};
    options.series[0].data = data;
    return options;
};

function windbarb(data) {
    let options = JSON.parse(JSON.stringify(WINDBARB_DEFAULTS));
    options['series'][0].data = data;
    options['series'][1].data = data;
    return options;
};

function epochToTime(epoch) {
    const coeff = 1000 * 60 * 1;
    return (new Date(new Date(Math.round(new Date(epoch).getTime() / coeff) * coeff))).getTime()
};

function istsosToSeries(response, args) {
    const dataArray = response.data.data[0].result.DataArray;
    return {
        name: dataArray.field[1].name,
        uom: dataArray.field[1].uom,
        series: dataArray.values.filter(el=>el[1]!==null).map(el=>[epochToTime(el[0]), parseFloat(el[1].toPrecision(3))]),
        ...(args||{})
    }
};

function istosToLine(response, title, stock = false, decimals = 2, precision = 3) {
    console.log("title");
      const dataArray = response.data.data[0].result.DataArray;
      let info;
      if ( !stock ) {
        info = {
            // order: order,
            options: JSON.parse(JSON.stringify(LINE_DEFAULTS))
        };
      }
      else{
        info = {
            // order: order,
            options: JSON.parse(JSON.stringify(STOCK_DEFAULTS))
        };
      }

      // console.log(dataArray);
      if (title) { info.options.title = title; };

      let tip;
      if (dataArray.field[1].uom=="null") {
        info.options.yAxis.title.text = dataArray.field[1].name
        info.uom = null;
        tip ="";
      } else {
        info.options.yAxis.title.text = `${dataArray.field[1].name} (${dataArray.field[1].uom})`
        info.uom = dataArray.field[1].uom;
        tip=` ${dataArray.field[1].uom}`
    };
    // info.options.legend.enabled = true;
    // info.options.legend.floating = true;
    console.log(info.options.legend.enabled);

      info.options.tooltip = {
          shared: true,
          valueSuffix: tip,
          // useHTML: true,
          // headerFormat: '<table><tr><th colspan="2">{point.key}</th></tr>',
          // pointFormat: '<tr><td style="color: {series.color}">{series.name} </td>' +
          //     `<td style="text-align: right"><b>{point.y} ${dataArray.field[1].uom}</b></td></tr>`,
          // footerFormat: '</table>',
          valueDecimals: decimals
      };
      // info.options.xAxis.categories[0] = `<span class="hc-cat-title">uom</span><br/>${dataArray.field[1].uom}`;
      // info.options.series[0].data[0].y = dataArray.values[0][1];
      // info.value = dataArray.values[0][1];
      // info.options.xAxis.categories = [`<span class="hc-cat-title">uom</span><br/>${dataArray.field[1].uom}`];

      info.options.series[0].data = dataArray.values.filter(el=>{
          // if (el[1]<=0) console.log(el[1], el[1]==-999, el[2]);
          return el[1]!==null && el[2]>0
      }).map(el=>[epochToTime(el[0]), parseFloat(el[1].toPrecision(precision))]);
      info.options.series[0].name = response.data.data[0].name;
      info.options.series[0].color = category_colors[0];
      // TODO:
      // if (heatmap) {
      //     info.options.chart.type = 'heatmap'
      //     console.log(info.options.series[0].data);
      //     info.options.xAxis = {categories: info.options.series[0].data.map(el=>(new Date(el[0])))}
      //     info.options.yAxis
      // };
      // if (heatmap) {
      //     info.options.series[0].type = 'column';
      //     info.options.chart.inverted =  false;
      //
      //     // const roundBy = (date, ms) => new Date(Math.round(date / ms) * ms);
      //
      //     // const data = Object.entries(sharedFunctions.groupBy(
      //     //     info.options.series[0].data,
      //     //     el=>roundBy(new Date(el[0]), 2*36e5)
      //     // )).map(entry=>[(entry[1][0][0]), Math.min(entry[1][0][1])])
      //     //
      //     // // info.options.series[0].grouping = false;
      //     // info.options.series[0].data = data;
      //
      // };

      // info.options.series[0].label = {format: '{name}'+`${dataArray.field[1].uom}`}
      return info;
}

function getPointCategoryName(point, dimension) {
    var series = point.series,
        isY = dimension === 'y',
        axis = series[isY ? 'yAxis' : 'xAxis'];
    return axis.categories[point[isY ? 'y' : 'x']];
}

const HEATMAP_DEFAULTS = {

    chart: {
        type: 'heatmap',
        // marginTop: 40,
        marginBottom: 80,
        plotBorderWidth: 1,
        zoomType: 'x',
    },


    title: {
        text: 'Serie temporale'
    },
    subtitle: {
        text: document.ontouchstart === undefined ?
        "clicca e trascina nell'area del tracciato per ingrandire" : 'Pizzica il grafico per ingrandire'
    },

    xAxis: {
     // date dei valori
        categories: ['2010', '2011', '2012', '2013', '2014', '2015'] // dates
    },

    yAxis: {
    		// profondità a cui sono i sensori
        categories: ['0.4', '2.5', '5.0', '8.0', '12.5', '20.0'], // profondità a cui sono i sensori
        title: "Profondità",
        reversed: true
    },

    // accessibility: {
    //     point: {
    //         descriptionFormatter: function (point) {
    //             var ix = point.index + 1,
    //                 xName = getPointCategoryName(point, 'x'),
    //                 yName = getPointCategoryName(point, 'y'),
    //                 val = point.value;
    //             return ix + '. ' + xName + ' sales ' + yName + ', ' + val + '.';
    //         }
    //     }
    // },

    colorAxis: {
        // min: 0,
        minColor: '#FFFFFF',
        maxColor: Highcharts.getOptions().colors[0]
    },

    legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 280
    },

    tooltip: {
        formatter: function () {
            const classi = {4: 'Eccellente', 3: 'Buona', 2: 'Sufficiente', 1: 'Scarsa'};
            return '<b>' + getPointCategoryName(this.point, 'x') + '</b><br>' +
                'Classe di ossigenazione: <b>' + classi[this.point.value] + '</b><br>' +
                'Profondità: <b>' + getPointCategoryName(this.point, 'y') + ' m</b>';
        }
    },

    series: [{
        name: 'Sales per employee',
        borderWidth: 0.5,
        data: [
            // index della lista di date, index della lista delle profondità,valore all'index
            [0, 0, 4], [0, 1, 4], [0, 2, 4], [0, 3, 3], [0, 4, 3], [0, 5, 1],
            [1, 0, 4], [1, 1, 4], [1, 2, 4], [1, 3, 4], [1,4, 4], [1, 5, 3],
            [2, 0, 4], [2, 1, 4], [2, 2, 4], [2, 3, 4], [2, 4, 3],[2, 5, 2]
        ],
        color: "black",
        fillColor: "#FFF",
        dataLabels: {
            enabled: false,
            color: '#FFF'
        },
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                yAxis: {
                    labels: {
                        formatter: function () {
                            return this.value.charAt(0);
                        }
                    }
                }
            }
        }]
    }

};

// let HEATMAP_DEFAULTS = LINE_DEFAULTS;
// HEATMAP_DEFAULTS.chart.type = 'heatmap';

HEATMAP_DEFAULTS['rangeSelector'] = STOCK_DEFAULTS['rangeSelector']

function istsosToHeatmap(multi_response, title) {
    let info = {options: {...HEATMAP_DEFAULTS}};
    if (title) { info.options.title = title; };
    // info.options.chart.width = 800;
    // response.data.data[0].result.DataArray
    const timestamps = Array.from(new Set(multi_response.map(res=>res.data.data[0].result.DataArray.values).flat().map(el=>{
        let day = new Date(el[0]);
        return day.toLocaleDateString();
    })))
    info.options.xAxis.categories = timestamps;

    let values = [];
    for (const [index, response] of multi_response.entries()) {
        response.data.data[0].result.DataArray.values.filter(el=>el[1]!=-999).forEach(val=>{
            let day = new Date(val[0]);
            const tsi = timestamps.indexOf(day.toLocaleDateString()) // .findIndex(ts=>ts.valueOf()===day.valueOf())
            const ycat = response.data.data[0].name.replace('OXYGENATION_', '').replace('_', '.')
            const ycati = info.options.yAxis.categories.indexOf(ycat);
            values.push([tsi, ycati, val[1]]);
        });
    };
    // TODO:
    info.options.series[0].data = values;
    return info;
};

export default {istosToLine, windbarb, istsosToSeries, polar, istsosToHeatmap};
