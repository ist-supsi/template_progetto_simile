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
              <p class="longtext"><span class="category"><b><i>Chlorophyll-a</i></b></span><br></p>
              
          <div class="row">
          <div class="col-md-8">
          <chart-card :chart-data="lineChart.data"
                      :chart-options="lineChart.options"
                      :responsive-options="lineChart.responsiveOptions">
            <template slot="header">
              <h4 class="card-title">Users Behavior</h4>
              <p class="card-category">24 Hours performance</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Open
                <i class="fa fa-circle text-danger"></i> Click
                <i class="fa fa-circle text-warning"></i> Click Second Time
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-history"></i> Updated 3 minutes ago
              </div>
            </template>
          </chart-card>
        </div>

        <div class="col-md-4">
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
        </div>
        </div>
        </div>
          </card>
        </div>
      </div>

      <div class="row">
        <div class="col-md-8">
          <chart-card :chart-data="lineChart.data"
                      :chart-options="lineChart.options"
                      :responsive-options="lineChart.responsiveOptions">
            <template slot="header">
              <h4 class="card-title">Users Behavior</h4>
              <p class="card-category">24 Hours performance</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Open
                <i class="fa fa-circle text-danger"></i> Click
                <i class="fa fa-circle text-warning"></i> Click Second Time
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-history"></i> Updated 3 minutes ago
              </div>
            </template>
          </chart-card>
        </div>

        <div class="col-md-4">
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
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <chart-card
            :chart-data="barChart.data"
            :chart-options="barChart.options"
            :chart-responsive-options="barChart.responsiveOptions"
            chart-type="Bar">
            <template slot="header">
              <h4 class="card-title">2014 Sales</h4>
              <p class="card-category">All products including Taxes</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Tesla Model S
                <i class="fa fa-circle text-danger"></i> BMW 5 Series
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-check"></i> Data information certified
              </div>
            </template>
          </chart-card>
        </div>

        <!--div class="col-md-6">
          <card>
            <template slot="header">
              <h5 class="title">Tasks</h5>
              <p class="category">Backend development</p>
            </template>
            <l-table :data="tableData.data"
                     :columns="tableData.columns">
              <template slot="columns"></template>

              <template slot-scope="{row}">
                <td>
                  <base-checkbox v-model="row.checked"></base-checkbox>
                </td>
                <td>{{row.title}}</td>
                <td class="td-actions text-right">
                  <button type="button" class="btn-simple btn btn-xs btn-info" v-tooltip.top-center="editTooltip">
                    <i class="fa fa-edit"></i>
                  </button>
                  <button type="button" class="btn-simple btn btn-xs btn-danger" v-tooltip.top-center="deleteTooltip">
                    <i class="fa fa-times"></i>
                  </button>
                </td>
              </template>
            </l-table>
            <div class="footer">
              <hr>
              <div class="stats">
                <i class="fa fa-history"></i> Updated 3 minutes ago
              </div>
            </div>
          </card>

        </div-->
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

  export default {
    components: {
      LTable,
      ChartCard,
      StatsCard,
      LMap,
      LTileLayer,
      "l-wms-tile-layer": LWMSTileLayer,
      LControlLayers
    },
    data () {
      return {
        editTooltip: 'Edit Task',
        deleteTooltip: 'Remove',
        pieChart: {
          data: {
            labels: ['40%', '20%', '40%'],
            series: [40, 20, 40]
          }
        },
        lineChart: {
          data: {
            labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
            series: [
              [287, 385, 490, 492, 554, 586, 698, 695],
              [67, 152, 143, 240, 287, 335, 435, 437],
              [23, 113, 67, 108, 190, 239, 307, 308]
            ]
          },
          options: {
            low: 0,
            high: 800,
            showArea: false,
            height: '245px',
            axisX: {
              showGrid: false
            },
            lineSmooth: true,
            showLine: true,
            showPoint: true,
            fullWidth: true,
            chartPadding: {
              right: 50
            }
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0]
                }
              }
            }]
          ]
        },
        barChart: {
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
              [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
              [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
            ]
          },
          options: {
            seriesBarDistance: 10,
            axisX: {
              showGrid: false
            },
            height: '245px'
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0]
                }
              }
            }]
          ]
        },
        tableData: {
          data: [
            {title: 'Sign contract for "What are conference organizers afraid of?"', checked: false},
            {title: 'Lines From Great Russian Literature? Or E-mails From My Boss?', checked: true},
            {
              title: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
              checked: true
            },
            {title: 'Create 4 Invisible User Experiences you Never Knew About', checked: false},
            {title: 'Read "Following makes Medium better"', checked: false},
            {title: 'Unfollow 5 enemies from twitter', checked: false}
          ]
        },
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
        showMap: true
      }
    },
      methods: {
        zoomUpdate(zoom) {
          this.currentZoom = zoom;
        },
        centerUpdate(center) {
          this.currentCenter = center;
        }
      }
  }
</script>
<style>

</style>
