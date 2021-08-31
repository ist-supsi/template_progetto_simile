/*!

 =========================================================
 * Vue Light Bootstrap Dashboard - v2.0.0 (Bootstrap 4)
 =========================================================

 * Product Page: http://www.creative-tim.com/product/light-bootstrap-dashboard
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Keycloak from 'keycloak-js';

import 'leaflet/dist/leaflet.css';

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'

// router setup
import routes from './routes/routes'

import './registerServiceWorker'
import axios from 'axios';
// plugin setup
Vue.use(VueRouter)
Vue.use(LightBootstrap)

//inizio richiesta token per API istsos
var details = {
  'username': 'test',
  'password': 'test',
  'grant_type': 'password',
  'client_id': 'istsos-istsos'
}

var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");
axios({
  method: 'post',
  url: 'https://istsos.ddns.net/auth/realms/istsos/protocol/openid-connect/token',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  data: formBody
}).then((response2) => {
  window.localStorage.setItem('kcAccessToken', response2.data["access_token"])
  window.localStorage.setItem('kcRefreshToken', response2.data["refresh_token"])
  window.localStorage.setItem('kcExpiresIn', response2.data["expires_in"])
  var now = Date.now()
  var expiresAt = now + (response2.data["expires_in"] * 1000)
  window.localStorage.setItem('kcExpiresAt', expiresAt)
  // this.token = response2.data["access_token"]
  // console.log(this.token);
  // console.log(response2.data);
});

//inizio codice per refresh token se scaduto
let isRefreshing = false;
let subscribers = [];

axios.interceptors.response.use(response =>{
  // console.log(response);
  return response;
},
err => {
  const {
    config,
    response: {status, data}
  } = err;

  var originalRequest = config;

  if (status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      //let refreshToken = window.localStorage.getItem('kcRefreshToken');
      var details = {
        //'grant_type': 'refresh_token',
        'username': 'test',
        'password': 'test',
        'grant_type': 'password',
        'client_id': 'istsos-istsos',
        //'refresh_token': refreshToken
      }

      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      axios({
        method: 'post',
        url: 'https://istsos.ddns.net/auth/realms/istsos/protocol/openid-connect/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        data: formBody
      }).then((response) => {
        window.localStorage.setItem('kcAccessToken', response.data["access_token"])
        window.localStorage.setItem('kcRefreshToken', response.data["refresh_token"])
        window.localStorage.setItem('kcExpiresIn', response.data["expires_in"])
        var now = Date.now()
        var expiresAt = now + (response.data["expires_in"] * 1000)
        window.localStorage.setItem('kcExpiresAt', expiresAt)
        console.log(response.data["access_token"]);
        console.log(response.data);
        isRefreshing = false;

        onRefreshed();

        subscribers = [];
      })
      .catch(error => {
        console.error(error);
      });
    }

    const requestSubscribers = new Promise(resolve => {
      subscribeTokenRefresh(() => {
        originalRequest.headers.Authorization = "Bearer " + window.localStorage.getItem("kcAccessToken");
        resolve(axios(originalRequest));
      });
    });

    //onRefreshed();

    return requestSubscribers;
  }
});

function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}

function onRefreshed(){
  subscribers.map(cb => cb());
}

subscribers = [];

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'nav-item active',
  scrollBehavior: (to) => {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  }
})

/* let initOptions = {
  url: 'https://istsos.ddns.net/auth/realms/istsos/protocol/openid-connect/token', realm: 'istsos', clientId: 'app-vue', onLoad: 'login-required'
}

let keycloak = Keycloak(initOptions); */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
