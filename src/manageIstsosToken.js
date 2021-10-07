
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
  constructor(formname, formkey, proxyUrl) {
    this.proxyPayload = {formname: formname, formkey: formkey}
    // this.formname = formname;
    // this.formkey = formkey;
    this.proxy = proxyUrl;
    this.token = null;
    this._tokenInfo = null;
    this._expiry = null;
  };
  _updateToken() {
    var self = this;
    return axios.post(this.proxy, this.proxyPayload).then(data => {
      self.tokenInfo = data;
      self.expiry = Date.now() + data["expires_in"] * 1000
    });
  };
  _getToken() {
    return this.tokenInfo.access_token;
  };
  _fetch(params) {
    var self = this;
    const DEFAULT_PARAMS = {
      services: 'demo',
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
          'Authorization': `Bearer ${this._getToken()}`
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
  fetchTemetature(procedures) {
    var self = this;
    return this.fetch({
        procedures: procedures,
        observedproperties: 'urn:ogc:def:parameter:x-istsos:1.0:water:temperature'
    }).then((response) => {
        const dataArray = response.data.data[0].result.DataArray;
        // console.log(dataArray);
        // let info = {
        //     // order: order,
        //     options: JSON.parse(JSON.stringify(TEMPERATURE_DEFAULTS))
        // };

        console.log(dataArray.values[0]);

        // const title = alt.title ? alt.title : `${dataArray.field[1].name} [${procedures}]`;
        // const ts = new Date(dataArray.values[0][0]);

        // info.options.title.text = `${title} al ${ts.toLocaleDateString()} ${ts.toLocaleTimeString()}`;
        info.options.xAxis.categories[0] = `<span class="hc-cat-title">uom</span><br/>${dataArray.field[1].uom}`;
        info.options.series[0].data[0].y = dataArray.values[0][1];
        info.value = dataArray.values[0][1];

        return info;
    });
  };
};
