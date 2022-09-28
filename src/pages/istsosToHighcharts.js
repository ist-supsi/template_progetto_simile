

const category_colors = ['#2f7ed8',, '#a6c96a', '#492970', '#f28f43',
    '#0d233a', '#77a1e5', '#8bbc21']

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
        "clic e trascina nell'area del tracciato per ingrandire" : 'Pizzica il grafico per ingrandire'
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

let STOCK_DEFAULTS = LINE_DEFAULTS

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
        // {
        //     type: 'month',
        //     count: 6,
        //     text: '6m'
        // },
        {
            type: 'ytd',
            text: 'YTD'
        },
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
    selected: 2
}

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
        offset: 40
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
    series: [
      // {
      //   type: 'windbarb',
      //   data: [],
      //   name: 'Wind',
      //   // color: Highcharts.getOptions().colors[1],
      //   showInLegend: false,
      //   // tooltip: {valueSuffix: ' m/s'}
      // },
      {
        type: 'area',
        keys: ['x', 'y'], // wind direction is not used here
        data: [],
        // color: Highcharts.getOptions().colors[0],
        // fillColor: {
        //     linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
        //     stops: [
        //         [0, Highcharts.getOptions().colors[0]],
        //         [
        //             1,
        //             Highcharts.color(Highcharts.getOptions().colors[0])
        //                 .setOpacity(0.25).get()
        //         ]
        //     ]
        // },
        name: 'Wind speed',
        tooltip: {valueSuffix: ' m/s'},
        states: {inactive: {opacity: 1}}
    }]
}

function windbarb(data) {
    let options = JSON.parse(JSON.stringify(WINDBARB_DEFAULTS));
    // options['series'][0].data = data;
    options['series'][1].data = data;
    return options;
};

function epochToTime(epoch) {
    const coeff = 1000 * 60 * 1;
    return (new Date(new Date(Math.round(new Date(epoch).getTime() / coeff) * coeff))).getTime()
};

function istsosToSeries(response) {
    const dataArray = response.data.data[0].result.DataArray;
    return {
        name: dataArray.field[1].name,
        uom: dataArray.field[1].uom,
        series: dataArray.values.filter(el=>el[1]!==null).map(el=>[epochToTime(el[0]), parseFloat(el[1].toPrecision(3))]),
    }
};

function istosToLine (response, title, stock = false) {
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
      info.options.yAxis.title.text = `${dataArray.field[1].name} (${dataArray.field[1].uom})`
      info.uom = dataArray.field[1].uom;
      info.options.tooltip = {
          shared: true,
          useHTML: true,
          headerFormat: '<table><tr><th colspan="2">{point.key}</th></tr>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name} </td>' +
              `<td style="text-align: right"><b>{point.y} ${dataArray.field[1].uom}</b></td></tr>`,
          footerFormat: '</table>',
          valueDecimals: 2
      };
      // info.options.xAxis.categories[0] = `<span class="hc-cat-title">uom</span><br/>${dataArray.field[1].uom}`;
      // info.options.series[0].data[0].y = dataArray.values[0][1];
      // info.value = dataArray.values[0][1];
      // info.options.xAxis.categories = [`<span class="hc-cat-title">uom</span><br/>${dataArray.field[1].uom}`];

      info.options.series[0].data = dataArray.values.filter(el=>el[1]!==null).map(el=>[epochToTime(el[0]), parseFloat(el[1].toPrecision(3))]);
      info.options.series[0].name = response.data.data[0].name;
      info.options.series[0].color = category_colors[0];
      // info.options.series[0].label = {format: '{name}'+`${dataArray.field[1].uom}`}
      return info;
}

export default {istosToLine, windbarb, istsosToSeries};
