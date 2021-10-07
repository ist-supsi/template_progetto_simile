<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <div class="typo-line">
              <p class="longtext"><span class="category"><b><i>LAGO CERESIO</i></b></span><br></p>
                <table cellspacing="2" cellpadding="2" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td valign="center" width="65%">
                        <div class="col-xl-4" style="max-width:100%;">
                          <card>
                            Lorem ipsum dolor sit amet. Ea dignissimos aspernatur et quaerat quia et quasi ipsa et voluptates debitis sit ipsum laudantium sed nobis accusantium quo quidem debitis.
                            Non possimus dolorum qui dolores optio aut quasi dolorem. In adipisci voluptatem et consectetur sequi aut recusandae iste. Non nesciunt earum qui tempora maiores At dolorem sunt quo quia officiis.
                            Sed facilis sunt in omnis dolor et consequatur autem aut ducimus nisi ea eius quibusdam et omnis quasi? Qui nobis mollitia eos perspiciatis asperiores et magni sequi? Non quos consequatur 33 sint facilis qui deserunt quae ex nemo illum et distinctio voluptas.<br><br>
                            Ad libero obcaecati a atque quibusdam sed commodi iusto 33 maiores et minus debitis qui dolores dolor eum corrupti laudantium. Et exercitationem pariatur ut ipsa eveniet quo necessitatibus odit aut rerum harum et maiores odio et dolores amet ut inventore incidunt.
                            Ut voluptates molestias et voluptatem beatae id fugit velit et voluptas expedita? Incidunt sint qui officiis iusto At quidem quis. In maxime omnis et nulla eaque qui molestiae fugiat 33 reiciendis inventore qui reiciendis totam in fuga assumenda. Sed amet distinctio
                            vel possimus amet At voluptas dolorem aut eaque internos. Ut ducimus tenetur et nihil quaerat ea nulla laudantium aut numquam possimus in cumque aliquam. Et perspiciatis earum cum tenetur ipsum est asperiores voluptate eum doloremque molestiae. Et saepe eius sed sapiente natus At laudantium magni.<br><br>
                            Est consequuntur similique sed Quis corrupti sed porro obcaecati et quia magnam. Ut blanditiis explicabo vel omnis exercitationem qui facere blanditiis At dolorem quia. Non ducimus repellendus cum unde tenetur et similique quod qui pariatur possimus ea ipsum maxime.
                            Et veniam laudantium eos tempore voluptatem qui deleniti nihil et consectetur dolore? Sit illum explicabo qui architecto nobis qui mollitia consequuntur qui odit galisum ut quae tenetur et ipsam magni est internos ducimus. Qui voluptatibus ipsa ut itaque dolore et
                            corrupti magni hic sunt fugiat et facere harum ut libero accusantium ut molestiae tempora! Sed animi sunt non quasi explicabo sit voluptates porro qui harum omnis aut perspiciatis corrupti qui architecto consectetur in delectus iste.
                          </card>
                        </div>
                      </td>
                      <td valign="center" width="35%">
                        <card style="height: 500px;">
                        <l-map
                            v-if="showMap"
                            :zoom="currentZoom"
                            :bounds="bounds"
                            :options="mapOptions"
                            @update:center="centerUpdate"
                            @update:zoom="zoomUpdate"
                            style="height: 100%; width: 100%;"
                          >
                            <l-tile-layer
                              :url="url"
                              :attribution="attribution"
                            />
                            <!--l-control-layers />
                              <l-wms-tile-layer
                                v-for="layer in layers"
                                :key="layer.name"
                                :base-url="wmsUrl"
                                :layers="layer.layers"
                                :visible="layer.visible"
                                :name="layer.name"
                                :transparent="layer.transparent"
                                :format="layer.format"
                                layer-type="overlay"
                              /-->
                          </l-map>
                        </card>
                        <!--div class="col-xl-4" style="max-width:100%;">
                          <chart-card :chart-data="pieChart.data" chart-type="Pie">
                            <template slot="header">
                              <h4 class="card-title">Email Statistics</h4>
                              <p class="card-category">Last Campaign Performance</p>
                            </template>
                            <template slot="footer">
                              <div class="legend">
                                <i class="fa fa-circle text-info"></i> Open
                                <i class="fa fa-circle text-danger"></i> Bounce
                                <i class="fa fa-circle text-warning"></i> Unsubscribe
                              </div>
                              <hr>
                              <div class="stats">
                                <i class="fa fa-clock-o"></i> Campaign sent 2 days ago
                              </div>
                            </template>
                          </chart-card>
                        </div-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              <!--/p-->
            </div>
          </card>
        </div>
      </div>
      <!--div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Capacity</p>
              <h4 class="card-title">105GB</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-light-3 text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">Revenue</p>
              <h4 class="card-title">$1,345</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-calendar-o"></i>Last day
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-vector text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">Errors</p>
              <h4 class="card-title">23</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-clock-o"></i>Last day
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-info">
              <i class="nc-icon nc-favourite-28 text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">Followers</p>
              <h4 class="card-title">+45</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </div>
          </stats-card>
        </div>

      </div-->
      <!--div class="row" style="height: 600px; margin-bottom: 30px;">
        <div class="col-md-12">
          <l-map
            v-if="showMap"
            :zoom="zoom"
            :bounds="bounds"
            :options="mapOptions"
            @update:center="centerUpdate"
            @update:zoom="zoomUpdate"
            style="height: 100%; width: 100%;"
          >
            <l-tile-layer
              :url="url"
              :attribution="attribution"
            />
            <l-control-layers />
              <l-wms-tile-layer
                v-for="layer in layers"
                :key="layer.name"
                :base-url="wmsUrl"
                :layers="layer.layers"
                :visible="layer.visible"
                :name="layer.name"
                :transparent="layer.transparent"
                :format="layer.format"
                layer-type="overlay"
              />
          </l-map>
        </div>
      </div-->



      <div class="row">
        <div class="col-12">
          <card>
            <div class="typo-line">
              <p class="longtext"><span class="category"><b><i>Temperatura Superficiale</i></b></span><br></p>
              <card v-for="info in insitu_temperatures_data">
                <div class="row">
                  <div class="col-md-12" :test="info.value">

                        <highcharts :options="info.options" style="height: 115px;"></highcharts>

                  </div>
                </div>
              </card>


            </div>
          </card>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import ChartCard from 'src/components/Cards/ChartCard.vue'
  import StatsCard from 'src/components/Cards/StatsCard.vue'
  import LTable from 'src/components/Table.vue'
  import { latLngBounds, latLng } from "leaflet";
  import { LMap, LTileLayer, LWMSTileLayer, LControlLayers } from "vue2-leaflet";
  import axios from 'axios';

  import {Chart} from 'highcharts-vue';
  import Highcharts from 'highcharts';
  import loadBullet from 'highcharts/modules/bullet.js';
  import IstsosIO from '../manageIstsosToken.js';

  loadBullet(Highcharts);

  function getCookieValue(key) {
    return document.cookie
    .split('; ')
    .find((row) => row.startsWith(key+'='))
    .split('=')[1];
  };

  const formname = getCookieValue('form-name');
  const formkey = getCookieValue('form-key');
  let istsos = new IstsosIO(formname, formkey, 'get_token');

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
              color: '#000',
              targetOptions: {
                  width: '200%'
              }
          }
      },
      credits: {
          enabled: false
      },
      exporting: {
          enabled: false
      }
  });

  export default {
    components: {
      LTable,
      ChartCard,
      StatsCard,
      LMap,
      LTileLayer,
      "l-wms-tile-layer": LWMSTileLayer,
      LControlLayers,
      highcharts: Chart
    },
    data () {
      return {
        TEMPERATURE_DEFAULTS: {
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
        },
        insitu_temperatures_data: [],
        tempChartOptions: {
            chart: {
                marginTop: 40
            },
            title: {
                text: '2017 YTD'
            },
            xAxis: {
                categories: ['<span class="hc-cat-title">Revenue</span><br/>U.S. $ (1,000s)']
            },
            yAxis: {
                plotBands: [{
                    from: -10,
                    to: 4,
                    color: 'cyan'
                }, {
                    from: 4,
                    to: 8,
                    color: 'blue'
                }, {
                    from: 8,
                    to: 16,
                    color: 'orange'
                }, {
                    from: 16,
                    to: 30,
                    color: 'red'
                }],
                title: null
            },
            series: [{
                data: [{
                    y: 5.5,
                    target: 12
                }]
            }],
            tooltip: {
                pointFormat: '<b>{point.y}</b> (with target at {point.target})'
            }
        },
        editTooltip: 'Edit Task',
        deleteTooltip: 'Remove',
        zoom: 13,
        //center: latLng(47.41322, -1.219482),
        bounds: latLngBounds([
          [45.9, 8.9],
          [46.0, 9.1]
        ]),
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        wmsUrl: 'https://www.gishosting.gter.it/lizmap-web-client/lizmap/www/index.php/lizmap/service/?repository=dorota&project=cartografia_simile&',
        layers: [
          {
            name: 'Maschera',
            visible: true,
            format: 'image/png',
            layers: 'Maschera',
            transparent: true/*,
            attribution: "Weather data © 2012 IEM Nexrad"*/
          },
          {
            name: 'Aree naturali poligonali Svizzera',
            visible: true,
            format: 'image/png',
            layers: 'Aree_naturali_poligonali_Svizzera',
            transparent: true/*,
            attribution: "Weather data © 2012 IEM Nexrad"*/
          },
          {
            name: 'Aree protette Piemonte',
            visible: true,
            format: 'image/png',
            layers: 'Aree_protette_Piemonte',
            transparent: true/*,
            attribution: "Weather data © 2012 IEM Nexrad"*/
          },
          {
            name: 'Aree protette poligonali Lombardia',
            visible: true,
            format: 'image/png',
            layers: 'Aree_protette_poligonali_Lombardia',
            transparent: true/*,
            attribution: "Weather data © 2012 IEM Nexrad"*/
          },
          {
            name: 'Aree naturali puntuali Svizzera',
            visible: true,
            format: 'image/png',
            layers: 'Aree_naturali_puntuali_Svizzera',
            transparent: true/*,
            attribution: "Weather data © 2012 IEM Nexrad"*/
          },
          {
            name: 'Aree protette puntuali Lombardia',
            visible: true,
            format: 'image/png',
            layers: 'Aree_protette_puntuali_Lombardia',
            transparent: true/*,
            attribution: "Weather data © 2012 IEM Nexrad"*/
          },
          {
            name: 'Reticolo idrografico',
            visible: true,
            format: 'image/png',
            layers: 'Reticolo_idrografico',
            transparent: true/*,
            attribution: "Weather data © 2012 IEM Nexrad"*/
          },
          {
            name: 'Laghi',
            visible: true,
            format: 'image/png',
            layers: 'Laghi',
            transparent: true/*,
            attribution: "Weather data © 2012 IEM Nexrad"*/
          },
          {
            name: 'Strade',
            visible: true,
            format: 'image/png',
            layers: 'Strade',
            transparent: true/*,
            attribution: "Weather data © 2012 IEM Nexrad"*/
          },
          {
            name: 'Ferrovie',
            visible: true,
            format: 'image/png',
            layers: 'Ferrovie',
            transparent: true/*,
            attribution: "Weather data © 2012 IEM Nexrad"*/
          },
          {
            name: 'Limiti amministrativi',
            visible: true,
            format: 'image/png',
            layers: 'Limiti_amministrativi',
            transparent: true/*,
            attribution: "Weather data © 2012 IEM Nexrad"*/
          },
          {
            name: 'Uso di suolo (CORINE_2018)',
            visible: false,
            format: 'image/png',
            layers: 'Uso_di_suolo_CORINE_2018',
            transparent: true/*,
            attribution: "Weather data © 2012 IEM Nexrad"*/
          },
          {
            name: 'Stato delle rive',
            visible: false,
            format: 'image/png',
            layers: 'Stato_delle_rive',
            transparent: true/*,
            attribution: "Weather data © 2012 IEM Nexrad"*/
          },
          {
            name: 'Depuratori con capacità > 2000 AE',
            visible: false,
            format: 'image/png',
            layers: 'Depuratori_con_capacita_greater_2000_AE',
            transparent: true/*,
            attribution: "Weather data © 2012 IEM Nexrad"*/
          },
          {
            name: 'Punti prelievo d\'acqua',
            visible: false,
            format: 'image/png',
            layers: 'Punti_prelievo_d_acqua',
            transparent: true/*,
            attribution: "Weather data © 2012 IEM Nexrad"*/
          },
          {
            name: 'Bacini idrografici',
            visible: true,
            format: 'image/png',
            layers: 'Bacini_idrografici',
            transparent: true/*,
            attribution: "Weather data © 2012 IEM Nexrad"*/
          }
        ],
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        currentZoom: 10.5,
        //currentCenter: latLng(47.41322, -1.219482),
        showParagraph: false,
        mapOptions: {
          zoomSnap: 0.5
        },
        showMap: true,
      }
    },
    mounted() {
      var self = this;
      // axios({
      //   method: 'get',
      //   url: 'https://istsos.ddns.net/istsos/wa/istsos/services/demo/offerings/operations/getlist',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': 'Bearer ' + window.localStorage.getItem('kcAccessToken')
      //   }
      // }).then((response) => {
      //   // console.log(response.data);
      // }).catch(error => {
      //   console.error(error);
      // });

      Promise.all([
          istsos.fetchTemetature('GHIFFA_EPILIMNIOM', 0, {
              title: "Temperatura puntuale (misura in situ)"
          }),

      ]).then((res)=>{
          res[0]['order'] = 0
          res[0].options.title.text
          // const pp = {...res[0], ...res[1]};
          self.insitu_temperatures_data = Object.values(res);
          // console.log(self.insitu_temperatures_data);
      });

      Promise.all([
          this.fetchTemetature('GHIFFA_EPILIMNIOM', 0, {
              title: "Temperatura puntuale (misura in situ)"
          }),
          this.fetchTemetature('CO_CHL_EAST', 1, {
              title: "Temperatura areale (stima da satellite)"
          })
      ]).then((res)=>{
          // const pp = {...res[0], ...res[1]};
          self.insitu_temperatures_data = Object.values(res);
          // console.log(self.insitu_temperatures_data);
      });

    },
      methods: {
        zoomUpdate(zoom) {
          this.currentZoom = zoom;
        },
        centerUpdate(center) {
          this.currentCenter = center;
        },
        call4istsos(params) {
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
                    'Authorization': 'Bearer ' + window.localStorage.getItem('kcAccessToken')
                }
            };

            return axios(config);

        },
        fetchTemetature(procedures, order=0, alt={}) {
            var self = this;

            return this.call4istsos({
                procedures: procedures,
                observedproperties: 'urn:ogc:def:parameter:x-istsos:1.0:water:temperature'
            }).then((response) => {
                const dataArray = response.data.data[0].result.DataArray;
                // console.log(dataArray);
                let info = {
                    order: order,
                    options: JSON.parse(JSON.stringify(self.TEMPERATURE_DEFAULTS))
                };

                console.log(dataArray.values[0]);

                const title = alt.title ? alt.title : `${dataArray.field[1].name} [${procedures}]`;
                const ts = new Date(dataArray.values[0][0]);

                info.options.title.text = `${title} al ${ts.toLocaleDateString()} ${ts.toLocaleTimeString()}`;

                info.options.xAxis.categories[0] = `<span class="hc-cat-title">uom</span><br/>${dataArray.field[1].uom}`;
                info.options.series[0].data[0].y = dataArray.values[0][1];
                info.value = dataArray.values[0][1];

                let newstore = {};
                newstore[procedures] = info;
                // self.insitu_temperatures_data = newstore;

                return info;
                // self.insitu_temperatures_data[procedures] = info;
                // console.log(self.insitu_temperatures_data);
            });
        },
        fetchTempData() {
            var self = this;

            this.call4istsos({
                procedures: 'GHIFFA_EPILIMNIOM',
                observedproperties: 'urn:ogc:def:parameter:x-istsos:1.0:water:temperature'
            }).then(function (response) {
                const dataArray = response.data.data[0].result.DataArray;
                self.tempChartOptions.title.text = dataArray.field[1].name;
                self.tempChartOptions.xAxis.categories[0] = `<span class="hc-cat-title">uom</span><br/>${dataArray.field[1].uom}`;
                const value = dataArray.values[0][1];
                self.tempChartOptions.series[0].data[0].y = value;
            });

        }
      }
  }
</script>
<style>

</style>
