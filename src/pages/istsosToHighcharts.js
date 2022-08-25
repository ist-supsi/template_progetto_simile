const LINE_DEFAULTS = {
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
        gridLineWidth: 1,
        title: {
          text: ''
        }
    },
    legend: {
        enabled: true
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

function istosToLine (response) {
      const dataArray = response.data.data[0].result.DataArray;
      let info = {
          // order: order,
          options: JSON.parse(JSON.stringify(LINE_DEFAULTS))
      };

      info.options.yAxis.title.text = `Temperatura (${dataArray.field[1].uom})`
      info.uom = dataArray.field[1].uom;
      // info.options.xAxis.categories[0] = `<span class="hc-cat-title">uom</span><br/>${dataArray.field[1].uom}`;
      // info.options.series[0].data[0].y = dataArray.values[0][1];
      // info.value = dataArray.values[0][1];
      // info.options.xAxis.categories = [`<span class="hc-cat-title">uom</span><br/>${dataArray.field[1].uom}`];
      const coeff = 1000 * 60 * 1;
      info.options.series[0].data = dataArray.values.filter(el => el[1]!==null).map(el => [(new Date(new Date(Math.round(new Date(el[0]).getTime() / coeff) * coeff))).getTime(), parseFloat(el[1].toPrecision(3))]);
      info.options.series[0].name = response.data.data[0].name;
      // info.options.series[0].label = {format: '{name}'+`${dataArray.field[1].uom}`}
      console.log(info.options.series[0]);
      return info;
}

export default {istosToLine};
