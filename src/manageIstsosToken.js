
import axios from 'axios';

import config from '../config.js'

const dataColor = '#4572A7'

const TEMPERATURE_DEFAULTS = {
    chart: {
        marginTop: 40
    },
    title: {
        text: "My Title"
    },
    subtitle: {style: {"color": "#666666", 'padding-bottom': '1.5em'}},
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
            to: 28,
            color: 'rgb(243, 183, 4)'
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
const TEMPERATURE_SERIES_DEFAULTS = {
    chart: {
        zoomType: 'x',
        inverted: false
    },
    height: '400px',
    time: {
        timezone: 'Europe/Rome'
    },
    title: {
        text: 'Andamento della temperatura nel tempo'
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

// TODO:
// Per informazioni aggregate per tipo di misura:
// https://istsos.ddns.net/istsos/wa/istsos/services/<servizio>/observedproperties

export default class IstsosIO {
  constructor(services, proxyEndpoint='index', baseUrl='https://istsos.ddns.net') {
    this.services = services;
    // this.formname = formname;
    // this.formkey = formkey;
    this.proxy = `${window.location.protocol}//${config.istsosProxy.host}${config.istsosProxy.port}/${config.istsosProxy.name}/${proxyEndpoint}`;
    this.baseUrl = baseUrl;
    this._tokenInfo = null;
    this._expiry = null;
    this._wait_for_me = null;
  };
  _updateToken() {
    var self = this;
    var bodyFormData = new FormData();
    // bodyFormData.append('_formname', this.formname);
    // bodyFormData.append('_formkey', this.formkey);
    return axios.post(this.proxy, bodyFormData, {
        headers: {"Content-Type": "multipart/form-data" }
    }).then(response => {
        self._tokenInfo = response.data;
        self._expiry = Date.now() + response.data["expires_in"] * 1000
        return self._tokenInfo.access_token;
    });
  };
  _getToken() {
      var self = this;
      if ( this._wait_for_me===null ) {
          // Il token non è ancora stato recuperato
          this._wait_for_me = this._updateToken();
          return this._wait_for_me;
      } else if ( this._expiry===null ) {
          // Token in fase di recupero
          // this._wait_for_me = this._updateToken();
          return this._wait_for_me;
      } else if ( Date.now()>=this._expiry ) {
          // Token scaduto forzo l'aggiornamento
          this._expiry=null;
          this._wait_for_me = this._updateToken();
          return this._wait_for_me;
      } else {
          // Il token presente è ancora valido... usiamolo!
          return this._wait_for_me;
      };
  };
  _call(params) {
      var self = this;
      const path = Object.entries({...(params||{})}).map((pair)=>pair.join('/')).join('/');
      const url = new URL(`/istsos/wa/istsos/${path}`, this.baseUrl).toString();
      return this._getToken().then((token) => {
          var config = {
              method: 'get',
              url: url,
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
          };
          return  axios(config);
      });
  };
  call(params) {
      var self = this;
      const DEFAULT_PARAMS = {
          services: self.services,
          // operations: 'getobservation',
          // offerings: 'temporary',
          procedures: undefined,
          // observedproperties: undefined,
          // eventtime: 'last'
      };
      return this._call({...DEFAULT_PARAMS, ...(params||{})});
  };
  fetch(params) {
      var self = this;
      let DEFAULT_PARAMS = {
          services: self.services,
          operations: 'getobservation',
          offerings: 'temporary',
          procedures: undefined,
          observedproperties: undefined,
          eventtime: 'last'
      };
      return this._call({...DEFAULT_PARAMS, ...(params||{})});
  };
  fetchProcedures() {
      var self = this;
      return this._call({
            services: self.services,
            procedures: 'operations',
            getlist: undefined
      });
  };
  fetchObserverProperties() {
      var self = this;
      return this._call({
            services: self.services,
            observedproperties: undefined,
      });
  };
  fetchGeometryCollection() {
      var self = this;
      return this._call({
            services: self.services,
            procedures: 'operations',
            geojson: undefined
      });
  };

  adaptResponse (response) {
      // water:temperature
      const dataArray = response.data.data[0].result.DataArray;
      // profondità di [+-]?\d+(\.\d+)? m/gm
      const coords_ = response.data.data[0].featureOfInterest.geom.match(/<gml:Point srsName='EPSG:4326'><gml:coordinates>[+-]?\d+(\.\d+)?,[+-]?\d+(\.\d+)?,[+-]?\d+(\.\d+)?<\/gml:coordinates><\/gml:Point>/gm);
      const coords = coords_[0].match(/[+-]?\d+(\.\d+)?,[+-]?\d+(\.\d+)?,[+-]?\d+(\.\d+)?/gm)[0].split(',')

      let info = {
          // order: order,
          procedure: response.data.data[0].name,
          options: JSON.parse(JSON.stringify(TEMPERATURE_DEFAULTS)),
          coords: coords.map(el=>parseFloat(el)),
          x: null,
          value: null
      };
      info.urn = response.data.data[0].procedure
      info.locationUrn = response.data.data[0].featureOfInterest.name
      info.uom = dataArray.field[1].uom;

      if ( dataArray.values.length>0 ) {
          info.x = new Date(dataArray.values[0][0]);
          // info.options.title.text = "Temperatura Superficiale";
          // TODO: new Date(dataArray.values[0][0])) -> more human format!
          info.options.subtitle.text = `Valore rilevato al: ${dataArray.values[0][0]}`;

          info.options.xAxis.categories[0] = `<span class="hc-cat-title">uom</span><br/>${dataArray.field[1].uom}`;
          const value = dataArray.values[0][1] && dataArray.values[0][1].toPrecision(3);
          info.options.series[0].data[0].y = parseFloat(value);
          info.value = dataArray.values[0][1] && dataArray.values[0][1].toFixed(1);
      };

      return info;
  };
  fetchBy(urn, procedures, eventtime='last') {
      var self = this;
      return this.fetch({
          procedures: procedures,
          eventtime: eventtime,
          observedproperties: urn
      }).then((response)=>{
          return self.adaptResponse(response);
          // if ( urn.endsWith('water:temperature') ) {
          //     return self.responseToWaterTemperature(response)
          // } else if ( urn.endsWith('meteo:air:temperature') ) {
          //     return self.responseToAirTemperature(response)
          // } else {
          //     console.error(urn);
          //     throw 'Not Implemented!';
          // };
      });
  };
  _fetchTemperature(procedures, eventtime='last') {
      var self = this;
      return this.fetch({
          procedures: procedures,
          eventtime: eventtime,
          observedproperties: 'urn:ogc:def:parameter:x-istsos:1.0:water:temperature'
      })
  };
  _fetchO2c(procedures, eventtime='last') {
      var self = this;
      return this.fetch({
          procedures: procedures,
          eventtime: eventtime,
          observedproperties: 'urn:ogc:def:parameter:x-istsos:1.0:water:O2D'
      })
  };
  _fetchO2s(procedures, eventtime='last') {
      var self = this;
      return this.fetch({
          procedures: procedures,
          eventtime: eventtime,
          observedproperties: 'urn:ogc:def:parameter:x-istsos:1.0:water:O2S'
      })
  };
  _fetchSdt(procedures, eventtime='last') {
      var self = this;
      return this.fetch({
          procedures: procedures,
          eventtime: eventtime,
          observedproperties: 'urn:ogc:def:parameter:x-istsos:1.0:water:SDT'
      })
  };
  fetchLastTemetature(procedures) {
    var self = this;
    return this._fetchTemperature(procedures).then((response) => {

        const dataArray = response.data.data[0].result.DataArray;

        // profondità di [+-]?\d+(\.\d+)? m/gm
        const coords_ = response.data.data[0].featureOfInterest.geom.match(/<gml:Point srsName='EPSG:4326'><gml:coordinates>[+-]?\d+(\.\d+)?,[+-]?\d+(\.\d+)?,[+-]?\d+(\.\d+)?<\/gml:coordinates><\/gml:Point>/gm);
        const coords = coords_[0].match(/[+-]?\d+(\.\d+)?,[+-]?\d+(\.\d+)?,[+-]?\d+(\.\d+)?/gm)[0].split(',')

        let info = {
            // order: order,
            procedure: procedures,
            options: JSON.parse(JSON.stringify(TEMPERATURE_DEFAULTS)),
            coords: coords.map(el=>parseFloat(el))
        };
        info.uom = dataArray.field[1].uom;
        info.x = new Date(dataArray.values[0][0]);
        // info.options.title.text = "Temperatura Superficiale";
        // TODO: new Date(dataArray.values[0][0])) -> more human format!
        info.options.subtitle.text = `Valore rilevato al: ${dataArray.values[0][0]}`;

        info.options.xAxis.categories[0] = `<span class="hc-cat-title">uom</span><br/>${dataArray.field[1].uom}`;
        const value = dataArray.values[0][1] && dataArray.values[0][1].toPrecision(2);
        info.options.series[0].data[0].y = parseFloat(value);
        info.value = dataArray.values[0][1];
        return info;
    });
  };
  fetchSeries (procedures, observedproperties, begin, end) {
      var self = this;
      end = (end === undefined) ? new Date() : end;
      // begin = (begin === undefined) ? new Date(new Date().setFullYear(new Date().getFullYear() - 1)) : begin;
      begin = (begin === undefined) ? new Date(new Date().setDate(new Date().getDate() - 30)) : begin;
      let eventtime = `${begin.toISOString()}/${end.toISOString()}`;
      return this.fetch({
          procedures: procedures,
          eventtime: eventtime,
          observedproperties: observedproperties
      })
  };
  fetchSeries_old (procedures, observedproperties, begin, end) {
      var self = this;
      end = (end === undefined) ? new Date() : end;
      // begin = (begin === undefined) ? new Date(new Date().setFullYear(new Date().getFullYear() - 1)) : begin;
      begin = (begin === undefined) ? new Date(new Date().setDate(new Date().getDate() - 30)) : begin;
      let eventtime = `${begin.toISOString()}/${end.toISOString()}`;
      return this.fetch({
          procedures: procedures,
          eventtime: eventtime,
          observedproperties: observedproperties
      }).then((response) => {
          const dataArray = response.data.data[0].result.DataArray;
          let info = {
              // order: order,
              options: JSON.parse(JSON.stringify(TEMPERATURE_SERIES_DEFAULTS))
          };

          info.options.yAxis.title.text = `Temperatura (${dataArray.field[1].uom})`
          info.uom = dataArray.field[1].uom;
          // info.options.xAxis.categories[0] = `<span class="hc-cat-title">uom</span><br/>${dataArray.field[1].uom}`;
          // info.options.series[0].data[0].y = dataArray.values[0][1];
          // info.value = dataArray.values[0][1];
          // info.options.xAxis.categories = [`<span class="hc-cat-title">uom</span><br/>${dataArray.field[1].uom}`];
          const coeff = 1000 * 60 * 1;
          info.options.series[0].data = dataArray.values.filter(el => el[1]!==null).map(el => [(new Date(new Date(Math.round(new Date(el[0]).getTime() / coeff) * coeff))).getTime(), parseFloat(el[1].toPrecision(3))]);
          info.options.series[0].name = procedures;
          // info.options.series[0].label = {format: '{name}'+`${dataArray.field[1].uom}`}

          return info;
      });
  };
  fetchTemperatureSeries(procedures, begin, end) {
    /**
    procedure @string : Procedure name
    begin       @Date : Start date (Default one year ago);
    end         @Date : End date (Default now)
    */
    var self = this;
    end = (end === undefined) ? new Date() : end;
    begin = (begin === undefined) ? new Date(new Date().setFullYear(new Date().getFullYear() - 1)) : begin;
    let eventtime = `${begin.toISOString()}/${end.toISOString()}`;
    return this._fetchTemperature(procedures, eventtime).then((response) => {
        const dataArray = response.data.data[0].result.DataArray;
        let info = {
            // order: order,
            options: JSON.parse(JSON.stringify(TEMPERATURE_SERIES_DEFAULTS))
        };

        info.options.yAxis.title.text = `Temperatura (${dataArray.field[1].uom})`
        info.uom = dataArray.field[1].uom;
        // info.options.xAxis.categories[0] = `<span class="hc-cat-title">uom</span><br/>${dataArray.field[1].uom}`;
        // info.options.series[0].data[0].y = dataArray.values[0][1];
        // info.value = dataArray.values[0][1];
        // info.options.xAxis.categories = [`<span class="hc-cat-title">uom</span><br/>${dataArray.field[1].uom}`];
        const coeff = 1000 * 60 * 1;
        info.options.series[0].data = dataArray.values.filter(el => el[1]!==null).map(el => [(new Date(new Date(Math.round(new Date(el[0]).getTime() / coeff) * coeff))).getTime(), parseFloat(el[1].toPrecision(3))]);
        info.options.series[0].name = procedures;
        // info.options.series[0].label = {format: '{name}'+`${dataArray.field[1].uom}`}

        return info;
    });
  };
  fetchLastO2c(procedures) {
    var self = this;
    return this._fetchO2c(procedures).then((response) => {
        const dataArray = response.data.data[0].result.DataArray;
        let info = {
            // order: order,
            procedure: procedures,
            options: JSON.parse(JSON.stringify(TEMPERATURE_DEFAULTS))
        };

        // info.options.title.text = "Concentrazione di ossigneno";
        info.uom = dataArray.field[1].uom;
        info.x = new Date(dataArray.values[0][0]);
        info.options.subtitle = {
            text: `Valore rilevato al: ${dataArray.values[0][0]}`
        };

        info.options.xAxis.categories[0] = `<span class="hc-cat-title">uom</span><br/>${dataArray.field[1].uom}`;
        info.options.series[0].data[0].y = parseFloat(dataArray.values[0][1].toPrecision(2));
        info.value = dataArray.values[0][1];
        return info;
    });
  };
  fetchO2cSeries(procedures, begin, end) {
    var self = this;
    end = (end === undefined) ? new Date() : end;
    begin = (begin === undefined) ? new Date(new Date().setFullYear(new Date().getFullYear() - 1)) : begin;
    let eventtime = `${begin.toISOString()}/${end.toISOString()}`;
    return this._fetchO2c(procedures, eventtime).then((response) => {
        const dataArray = response.data.data[0].result.DataArray;
        let info = {
            // order: order,
            options: JSON.parse(JSON.stringify(TEMPERATURE_SERIES_DEFAULTS))
        };

        info.options.title.text = "Concentrazione di ossigneno";
        info.options.yAxis.title.text = `Concentrazione (${dataArray.field[1].uom})`

        info.options.series[0].name = 'O2'
        info.options.series[0].data = dataArray.values.map(el => [(new Date(el[0])).getTime(), parseFloat(el[1].toPrecision(3))]);

        return info;
    });
  };
  fetchLastO2s(procedures) {
    var self = this;
    return this._fetchO2s(procedures).then((response) => {
        const dataArray = response.data.data[0].result.DataArray;
        let info = {
            // order: order,
            options: JSON.parse(JSON.stringify(TEMPERATURE_DEFAULTS))
        };

        // info.options.title.text = "Concentrazione di ossigneno";
        info.uom = dataArray.field[1].uom;
        info.x = new Date(dataArray.values[0][0]);
        info.options.subtitle = {
            text: `Valore rilevato al: ${dataArray.values[0][0]}`
        };

        info.options.xAxis.categories[0] = `<span class="hc-cat-title">uom</span><br/>${dataArray.field[1].uom}`;
        const value = dataArray.values[0][1] && dataArray.values[0][1].toPrecision(3);
        info.options.series[0].data[0].y = parseFloat(value);
        info.value = dataArray.values[0][1];
        return info;
    });
  };
  fetchLastSdt(procedures) {
      var self = this;
      return this._fetchSdt(procedures).then((response) => {
        const dataArray = response.data.data[0].result.DataArray;
        let info = {
            // order: order,
            options: JSON.parse(JSON.stringify(TEMPERATURE_DEFAULTS))
        };

        info.options.title.text = "Trasparenza";
        info.uom = dataArray.field[1].uom;
        info.x = new Date(dataArray.values[0][0]);
        info.options.subtitle = {
            text: `Valore rilevato al: ${dataArray.values[0][0]}`
        };
        //
        info.options.xAxis.categories[0] = `<span class="hc-cat-title">uom</span><br/>${dataArray.field[1].uom}`;
        info.options.series[0].data[0].y = parseFloat(dataArray.values[0][1].toPrecision(3));
        info.value = dataArray.values[0][1];
        return info;
    });
  };
};
