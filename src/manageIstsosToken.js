
import axios from 'axios';

const TEMPERATURE_DEFAULTS = {
    chart: {
        marginTop: 40
    },
    title: {
        text: 'My Title'
    },
    xAxis: {
        categories: ['<span class="hc-cat-title">Temperature</span><br/>°C']
    },
    yAxis: {
        plotBands: [{
            from: -8,
            to: -4,
            color: 'rgb(116, 180, 202)'
        }, {
            from: -4,
            to: 0,
            color: 'rgb(93, 133, 198)'
        }, {
            from: 0,
            to: 4,
            color: 'rgb(68, 125, 99)'
        }, {
            from: 4,
            to: 10,
            color: 'rgb(228, 248, 119)'
        }, {
            from: 10,
            to: 21,
            color: 'rgb(243, 183, 4)'
        }],
        title: null
    },
    series: [{
        data: [{
            y: 0,
            target: 12
        }]
    }],
    tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})'
    }
}

const TEMPERATURE_SERIES_DEFAULTS = {
    chart: {
        zoomType: 'x'
    },
    title: {
        text: 'My Title'
    },
    subtitle: {
        text: document.ontouchstart === undefined ?
            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
    },
    xAxis: {
        type: 'datetime'
    },
    yAxis: {
        title: {
            text: 'Temperature'
        }
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        area: {
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, '#000000'],
                    [1, '#ffffff']
                ]
            },
            marker: {
                radius: 2
            },
            lineWidth: 1,
            states: {
                hover: {
                    lineWidth: 1
                }
            },
            threshold: null
        }
    },

    series: [{
        type: 'line',
        name: 'My Name',
        data: []
    }]
}

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  if ( config.url ) {

  };
  return config;
  }, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


export default class IstsosIO {
  constructor(formname, formkey, proxyUrl, services) {
    // this.proxyPayload = {'_formname': formname, '_formkey': formkey};
    this.services = services;
    this.formname = formname;
    this.formkey = formkey;
    this.proxy = proxyUrl;
    // this.token = null;
    this._tokenInfo = null;
    this._expiry = null;
  };
  _updateToken() {
    var self = this;
    var bodyFormData = new FormData();
    bodyFormData.append('_formname', this.formname);
    bodyFormData.append('_formkey', this.formkey);
    return axios.post(this.proxy, bodyFormData, {
        headers: {"Content-Type": "multipart/form-data" }
    }).then(response => {
      self._tokenInfo = response.data;
      self._expiry = Date.now() + response.data["expires_in"] * 1000
    });
  };
  _getToken() {
    return this._tokenInfo.access_token;
  };
  _fetch(params) {
    var self = this;
    let DEFAULT_PARAMS = {
      services: self.services,
      operations: 'getobservation',
      offerings: 'temporary',
      procedures: undefined,
      observedproperties: undefined,
      eventtime: 'last'
    };
    const path = Object.entries({...DEFAULT_PARAMS, ...(params||{})}).map((pair)=>pair.join('/')).join('/');
    const url = new URL(`/istsos/wa/istsos/${path}`, 'https://istsos.ddns.net').toString();
    var config = {
        method: 'get',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${self._getToken()}`
        }
    };
    return axios(config);
  };
  fetch(params) {
    var self = this;
    let cached = 0;
    let fetched;
    if ( this._expiry===null || Date.now()>=this._expiry ) {
      fetched = this._updateToken().then(()=>self._fetch(params))
    } else {
      fetched = self._fetch(params)
    };
    // Non dovrebbe essere necessario...
    // fetched.catch((error)=>{
    //   cached += 1
    //   if ( error.response.status==401 ) {
    //     if ( cached<1 ) {
    //
    //     } else {alert};
    //   };
    // });
    return fetched;
  };
  _fetchTemperature(procedures, eventtime='last') {
      var self = this;
      return this.fetch({
          procedures: procedures,
          eventtime: eventtime,
          observedproperties: 'urn:ogc:def:parameter:x-istsos:1.0:water:temperature'
      })
  };
  fetchLastTemetature(procedures) {
    var self = this;
    return this._fetchTemperature(procedures).then((response) => {
        const dataArray = response.data.data[0].result.DataArray;
        // console.log(dataArray);
        let info = {
            // order: order,
            options: JSON.parse(JSON.stringify(TEMPERATURE_DEFAULTS))
        };

        info.options.xAxis.categories[0] = `<span class="hc-cat-title">uom</span><br/>${dataArray.field[1].uom}`;
        info.options.series[0].data[0].y = dataArray.values[0][1];
        info.value = dataArray.values[0][1];

        return info;
    });
  };
  fetchTemetatureSeries(procedures, begin, end) {
    /** 
    procedure @string : Procedure name
    begin       @Date : Start date (Default one year ago);
    end         @Date : End date (Default now)
    */
    var self = this;
    end = (end === undefined) ? new Date() : end;
    begin = (begin === undefined) ? new Date(new Date().setFullYear(new Date().getFullYear() + 1)) : begin;
    let eventtime = `${begin.toISOString()}/${end.toISOString()}`;
    return this._fetchTemperature(procedures, eventtime).then((response) => {
        const dataArray = response.data.data[0].result.DataArray;
        let info = {
            // order: order,
            options: JSON.parse(JSON.stringify(TEMPERATURE_SERIES_DEFAULTS))
        };

        // info.options.xAxis.categories[0] = `<span class="hc-cat-title">uom</span><br/>${dataArray.field[1].uom}`;
        // info.options.series[0].data[0].y = dataArray.values[0][1];
        // info.value = dataArray.values[0][1];
        info.options.series.data = dataArray.values; //.map(el => el.slice(0, 2));

        return info;
    });
  };
  fetchO2d(procedures) {
      var self = this;
      // TODO: NotImplemented
  };
};
