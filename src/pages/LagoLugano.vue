<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <!-- <card> -->
                    <!-- <card v-if="showDescription"> -->
                        <!-- <template slot="header">
                          <h5 class="title">LAGO CERESIO</h5>
                          <p class="category">Descrizione</p>
                        </template> -->
                        <div class="row">
                            <!-- <div class="col-7">
                                Lorem ipsum dolor sit amet. Ea dignissimos aspernatur et quaerat quia et quasi ipsa et voluptates debitis sit ipsum laudantium sed nobis accusantium quo quidem debitis.
                                Non possimus dolorum qui dolores optio aut quasi dolorem. In adipisci voluptatem et consectetur sequi aut recusandae iste. Non nesciunt earum qui tempora maiores At dolorem sunt quo quia officiis.
                                Sed facilis sunt in omnis dolor et consequatur autem aut ducimus nisi ea eius quibusdam et omnis quasi? Qui nobis mollitia eos perspiciatis asperiores et magni sequi? Non quos consequatur 33 sint facilis qui deserunt quae ex nemo illum et distinctio voluptas.<br><br>
                                Ad libero obcaecati a atque quibusdam sed commodi iusto 33 maiores et minus debitis qui dolores dolor eum corrupti laudantium. Et exercitationem pariatur ut ipsa eveniet quo necessitatibus odit aut rerum harum et maiores odio et dolores amet ut inventore incidunt.
                                Ut voluptates molestias et voluptatem beatae id fugit velit et voluptas expedita? Incidunt sint qui officiis iusto At quidem quis. In maxime omnis et nulla eaque qui molestiae fugiat 33 reiciendis inventore qui reiciendis totam in fuga assumenda. Sed amet distinctio
                                vel possimus amet At voluptas dolorem aut eaque internos. Ut ducimus tenetur et nihil quaerat ea nulla laudantium aut numquam possimus in cumque aliquam. Et perspiciatis earum cum tenetur ipsum est asperiores voluptate eum doloremque molestiae. Et saepe eius sed sapiente natus At laudantium magni.<br><br>
                            </div> -->
                            <div class="col-8">
                              <div class="row">
                                  <div class="col-6">
                                      <stats-card>
                                          <div slot="header" class="icon-warning">
                                            <!-- <i class="nc-icon nc-chart text-warning"></i> -->
                                            <i class="fa fa-sun-o text-warning"
                                              data-toggle="tooltip"
                                              title="Temperatura aria"></i>
                                          </div>
                                          <div slot="content">
                                            <p class="card-category">Temperatura dell'aria</p>
                                            <h4 class="card-title">22°C</h4>
                                            <p class="card-category">da stazione meteo</p>
                                          </div>
                                          <div slot="footer">
                                              <i class="fa fa-calendar" aria-hidden="true"></i>oggi
                                              <i class="fa fa-clock-o" aria-hidden="true"></i>adesso
                                          </div>
                                      </stats-card>
                                  </div>
                                  <div class="col-6">
                                      <stats-card>
                                          <div slot="header" class="icon-warning">
                                            <!-- <i class="nc-icon nc-chart text-warning"></i> -->
                                            <i class="fa fa-cloud text-primary"
                                              data-toggle="tooltip"
                                              title="Umidità"></i>
                                          </div>
                                          <div slot="content">
                                            <p class="card-category">Umidità atmosferica</p>
                                            <h4 class="card-title">30%</h4>
                                            <p class="card-category">da stazione meteo</p>
                                          </div>
                                          <div slot="footer">

                                              <i class="fa fa-calendar" aria-hidden="true"></i>oggi
                                              <i class="fa fa-clock-o" aria-hidden="true"></i>adesso
                                          </div>
                                      </stats-card>
                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col-6">
                                      <stats-card>
                                          <div slot="header" class="icon-warning">
                                            <!-- <i class="nc-icon nc-chart text-warning"></i> -->
                                            <i class="fa fa-flag text-info"
                                              data-toggle="tooltip"
                                              title="Velocità del vento"></i>
                                          </div>
                                          <div slot="content">
                                            <p class="card-category">Velocità del vento</p>
                                            <h4 class="card-title">20km/h</h4>
                                            <p class="card-category">da stazione meteo</p>
                                          </div>
                                          <div slot="footer">

                                              <i class="fa fa-calendar" aria-hidden="true"></i>oggi
                                              <i class="fa fa-clock-o" aria-hidden="true"></i>adesso
                                          </div>
                                      </stats-card>
                                  </div>
                                  <div class="col-6">
                                      <stats-card>
                                          <div slot="header" class="icon-warning">
                                            <!-- <i class="nc-icon nc-chart text-warning"></i> -->
                                            <i class="fa fa-compass text-info"
                                              data-toggle="tooltip"
                                              title="Velocità del vento"></i>
                                          </div>
                                          <div slot="content">
                                            <p class="card-category">Direzione del vento</p>
                                            <h4 class="card-title">NNE</h4>
                                            <p class="card-category">da stazione meteo</p>
                                          </div>
                                          <div slot="footer">

                                              <i class="fa fa-calendar" aria-hidden="true"></i>oggi
                                              <i class="fa fa-clock-o" aria-hidden="true"></i>adesso
                                          </div>
                                      </stats-card>
                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col-6">
                                      <stats-card>
                                          <div slot="header" class="icon-warning">
                                            <!-- <i class="nc-icon nc-chart text-warning"></i> -->
                                            <i class="fa fa-thermometer text-warning"
                                              data-toggle="tooltip"
                                              title="Temperatura superficiale"></i>
                                          </div>
                                          <div slot="content">
                                            <p class="card-category">Temperatura dell'acqua</p>
                                            <h4 class="card-title"><b>{{lastTemp04}}</b></h4>
                                            <p class="card-category">profondità: 40cm</p>
                                          </div>
                                          <div slot="footer">
                                              <i v-if="lastTemp04Time===null" class="fa fa-refresh fa-spin"></i>
                                              <i v-if="lastTemp04Time" class="fa fa-calendar" aria-hidden="true"></i>{{lastTemp04Time && lastTemp04Time.date}}
                                              <i v-if="lastTemp04Time" class="fa fa-clock-o" aria-hidden="true"></i>{{lastTemp04Time && lastTemp04Time.time}}
                                          </div>
                                      </stats-card>
                                  </div>
                                  <div class="col-6">
                                      <stats-card>
                                          <div slot="header" class="icon-warning">
                                            <!-- <i class="nc-icon nc-chart text-warning"></i> -->
                                            <i class="fa fa-flask text-primary"
                                              data-toggle="tooltip"
                                              title="Ossigeno disciolto"></i>
                                          </div>
                                          <div slot="content">
                                            <p class="card-category">Ossigeno disciolto</p>
                                            <h4 class="card-title"><b>{{lastO2s04}}</b></h4>
                                            <p class="card-category">profondità: 40cm</p>
                                          </div>
                                          <div slot="footer">
                                              <i v-if="lastO2s04Time===null" class="fa fa-refresh fa-spin"></i>
                                              <i v-if="lastO2s04Time" class="fa fa-calendar" aria-hidden="true"></i>{{lastO2s04Time && lastO2s04Time.date}}
                                              <i v-if="lastO2s04Time" class="fa fa-clock-o" aria-hidden="true"></i>{{lastO2s04Time && lastO2s04Time.time}}
                                          </div>
                                      </stats-card>
                                  </div>
                              </div>
                              <div class="row">
                                <div class="col-6">
                                    <stats-card>
                                        <div slot="header" class="icon-warning">
                                          <i class="fa fa-tint text-primary"
                                            data-toggle="tooltip"
                                            title="Trasparenza acque"></i>
                                        </div>
                                        <div slot="content">
                                          <p class="card-category">Trasparenza</p>
                                          <h4 class="card-title"><b>{{lastSdtFig}}</b></h4>
                                          <p class="card-category">località: Figino</p>
                                        </div>
                                        <div slot="footer">
                                            <i v-if="lastSdtTime===null" class="fa fa-refresh fa-spin"></i>
                                            <i v-if="lastSdtTime" class="fa fa-calendar" aria-hidden="true"></i>{{lastSdtTime && lastSdtTime.date}}
                                            <i v-if="lastSdtTime" class="fa fa-clock-o" aria-hidden="true"></i>{{lastSdtTime && lastSdtTime.time}}
                                        </div>
                                    </stats-card>
                                </div>
                                <div class="col-6">
                                    <stats-card>
                                        <div slot="header" class="icon-warning">
                                          <i class="fa fa-pagelines text-success"
                                            data-toggle="tooltip"
                                            title="Clorofilla e alghe"></i>
                                        </div>
                                        <div slot="content">
                                          <p class="card-category">Clorofilla e alghe</p>
                                          <h4 class="card-title">20 μg/L</h4>
                                          <p class="card-category">località: Figino</p>
                                        </div>
                                        <div slot="footer">
                                          <i class="fa fa-calendar" aria-hidden="true"></i>oggi
                                          <i class="fa fa-clock-o" aria-hidden="true"></i>adesso
                                        </div>
                                    </stats-card>
                                </div>
                              </div>
                            </div>

                            <div class="col-4">
                                <card style="height: 62.5vh;">
                                <l-map
                                    v-if="showMap"
                                    :zoom="currentZoom"
                                    :bounds="bounds"
                                    :options="mapOptions"
                                    @update:center="centerUpdate"
                                    @update:zoom="zoomUpdate"
                                    style="height: 100%;"
                                  >
                                  <l-tile-layer
                                      :url="url"
                                      :attribution="attribution"
                                  />
                                    <!-- <l-tile-layer
                                      :url="url"
                                      :attribution="attribution"
                                    ></l-tile-layer> -->
                                    <!-- <l-control-layers /> -->
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
                                      ></l-wms-tile-layer>
                                  </l-map>
                                </card>
                            </div>
                        </div>
                    <!-- </card> -->

                        <!-- <card v-if="showTemperatureAnalysis">

                        </card> -->
                    <!-- </card> -->
                    <div class="row">
                        <div class="col-12">
                            <data-table
                                :columns="tableColumns"
                                :data="tableData"
                                :per-page="[5, 10, 15]"
                                @on-table-props-changed="reloadTable"
                            >
                            </data-table>
                        </div>
                    </div>
                    <!-- <card>

                        <div v-if="Object.keys(series_data).length>0" class="row">
                            <div class="col-md-12">
                                <highcharts :options="series_data"></highcharts>
                            </div>
                        </div>

                        <div slot="footer">
                            <i v-if="Object.keys(series_data).length==0"
                                class="fa fa-refresh fa-spin"></i>
                        </div>
                    </card> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {Chart} from 'highcharts-vue';
    import Highcharts from 'highcharts';
    import loadBullet from 'highcharts/modules/bullet.js';

    import ChartCard from 'src/components/Cards/ChartCard.vue'
    import HighchartCard from 'src/components/Cards/HighchartCard.vue'
    import StatsCard from 'src/components/Cards/StatsCard.vue'
    import LTable from 'src/components/Table.vue'
    import { latLngBounds, latLng } from "leaflet";
    import { LMap, LTileLayer, LWMSTileLayer, LControlLayers } from "vue2-leaflet";
    import 'leaflet/dist/leaflet.css';
    import axios from 'axios';

    // import Modal from 'src/components/Modal.vue';
    // import ModalButton from 'src/components/ModalButton.vue';
    import NotifyButton from 'src/components/NotifyButton.vue';

    // import IstsosIO from '../manageIstsosToken.js';

    loadBullet(Highcharts);

    // function getCookieValue(key) {
    //     return document.cookie
    //     .split('; ')
    //     .find((row) => row.startsWith(key+'='))
    //     .split('=')[1];
    // };
    //
    // const formname = getCookieValue('form-name');
    // const formkey = getCookieValue('form-key');
    // const root = getCookieValue('app-name');
    // const istsosServices = getCookieValue('istsos-services');
    // let istsos = new IstsosIO(this.$root.proxyUrl, this.$root.proxyServices);

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
            highcharts: Chart,
            HighchartCard,
            NotifyButton,
            // ModalButton,
            // Modal
        },
        data () {
            return {
                showDescription: true,
                lastSdtFig: '',
                lastSdtTime: null,
                lastTemp04: '',
                lastTemp04Time: null,
                lastTemp25: '',
                lastTemp25Time: null,
                lastTemp50: '',
                lastTemp50Time: null,
                lastTemp80: '',
                lastTemp80Time: null,
                lastTemp125: '',
                lastTemp125Time: null,
                lastTemp200: '',
                lastTemp200Time: null,
                lastO2c04: '',
                lastO2c04Time: null,
                lastO2c25: '',
                lastO2c25Time: null,
                lastO2c50: '',
                lastO2c50Time: null,
                lastO2c80: '',
                lastO2c80Time: null,
                lastO2c125: '',
                lastO2c125Time: null,
                lastO2c200: '',
                lastO2c200Time: null,
                lastO2s04: '',
                lastO2s04Time: null,
                lastO2s25: '',
                lastO2s25Time: null,
                lastO2s50: '',
                lastO2s50Time: null,
                lastO2s80: '',
                lastO2s80Time: null,
                lastO2s125: '',
                lastO2s125Time: null,
                lastO2s200Time: null,
                lastO2s200: '',
                selected_temperature: 'TEMP_0_4',
                selected_o2c: 'O2C_0_4',
                last_temperature_data: {},
                series_data: {},
                last_o2c_data: {},
                series_o2c_data: {},
                tableAllData: {},
                showModal: false,
                tableData: {},
                tableProps: {
                    page: 1,
                    search: '',
                    length: 5,
                    column: 'name',
                    dir: 'asc'
                },
                tableColumns: [
                    // {
                    //     label: 'ID',
                    //     name: 'id',
                    //     orderable: true,
                    // },
                    {
                        label: 'Etichetta',
                        transform: (item)=>{
                            return item.data.observedproperties[0].name
                        },
                        // name: 'name',
                        orderable: true,
                    },
                    {
                        label: 'Nome',
                        name: 'name',
                        orderable: true,
                    },
                    {
                        label: 'Unità',
                        transform: (item)=>{
                            return item.data.observedproperties[0].uom
                        },
                        // name: 'name',
                        orderable: false,
                    },
                    {
                        label: 'Profondità sensore',
                        transform: (item)=>{
                            const sub = item.data.description.match(/a [+-]?\d+(\.\d+)? m di profondità/gm)
                            return sub && sub[0].match(/[+-]?\d+(\.\d+)? m/gm);
                        },
                        // name: 'name',
                        orderable: false,
                    },
                    {
                        label: 'Inizio',
                        transform: (item)=>{
                            return item.data.samplingTime.beginposition.split('T')[0]
                        },
                        // name: 'name',
                        orderable: false,
                    },
                    {
                        label: 'Ultimo',
                        transform: (item)=>{
                            return item.data.samplingTime.endposition.split('T')[0]
                        },
                        // name: 'name',
                        orderable: false,
                    },
                    {
                        label: 'Descrizione',
                        name: 'Apri',
                        orderable: false,
                        classes: {
                            'btn': true,
                            'btn-primary': true,
                            'btn-sm': true,
                        },
                        event: "click",
                        handler: this.displayRow,
                        component: NotifyButton,
                        iclasses: {
                            'fa': true,
                            'fa-info-circle': true
                        }
                    },
                    {
                        label: '',
                        name: 'Analizza',
                        orderable: false,
                        classes: {
                            'btn': true,
                            'btn-primary': false,
                            'btn-info': true,
                            'btn-sm': true,
                        },
                        href: '/#/foo',
                        // event: "click",
                        // handler: (data)=>{
                        //     console.log(data);
                        //     alert('Hello!');
                        // },
                        component: NotifyButton,
                        iclasses: {
                            'fa-info-circle': false,
                            'fa-line-chart': true
                        }
                    }
                ],
                selectedRow: {},
                // procedures: [
                //     {
                //         procedure: 'TEMP_0_4'
                //     },
                //     {
                //         procedure: 'O2C_0_4'
                //     },
                //     // {
                //     //     procedure: 'O2S_0_4'
                //     // },
                // ],
                // tempChartOptions: {
                //     chart: {
                //         marginTop: 40
                //     },
                //     title: {
                //         text: '2017 YTD'
                //     },
                //     xAxis: {
                //         categories: ['<span class="hc-cat-title">Revenue</span><br/>U.S. $ (1,000s)']
                //     },
                //     yAxis: {
                //         plotBands: [{
                //             from: -10,
                //             to: 4,
                //             color: 'cyan'
                //         }, {
                //             from: 4,
                //             to: 8,
                //             color: 'blue'
                //         }, {
                //             from: 8,
                //             to: 16,
                //             color: 'orange'
                //         }, {
                //             from: 16,
                //             to: 30,
                //             color: 'red'
                //         }],
                //         title: null
                //     },
                //     series: [{
                //         data: [{
                //             y: 5.5,
                //             target: 12
                //         }]
                //     }],
                //     tooltip: {
                //         pointFormat: '<b>{point.y}</b> (with target at {point.target})'
                //     }
                // },
                editTooltip: 'Edit Task',
                deleteTooltip: 'Remove',
                zoom: 13,
                //center: latLng(47.41322, -1.219482),
                // 45.98815472817849, 8.970311660582176
                // minlat="45.9029678" minlon="8.8586625" maxlat="46.0363240" maxlon="9.1252600"/
                bounds: latLngBounds([
                  [45.90, 8.85],
                  [46.03, 9.12]
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
                  // {
                  //   name: 'Aree protette Piemonte',
                  //   visible: true,
                  //   format: 'image/png',
                  //   layers: 'Aree_protette_Piemonte',
                  //   transparent: true/*,
                  //   attribution: "Weather data © 2012 IEM Nexrad"*/
                  // },
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
                  // {
                  //   name: 'Strade',
                  //   visible: true,
                  //   format: 'image/png',
                  //   layers: 'Strade',
                  //   transparent: true/*,
                  //   attribution: "Weather data © 2012 IEM Nexrad"*/
                  // },
                  // {
                  //   name: 'Ferrovie',
                  //   visible: true,
                  //   format: 'image/png',
                  //   layers: 'Ferrovie',
                  //   transparent: true/*,
                  //   attribution: "Weather data © 2012 IEM Nexrad"*/
                  // },
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
                  zoomSnap: 0.5,
                  scrollWheelZoom: false
                },
                showMap: true,
            }
        },
        watch: {
          series_data: {
             handler(val){
               // do stuff
             },
             deep: true
          }
        },
        mounted() {
            var self = this;
            this.$root.whereAmI = 'Lago di Lugano';
            this.tableFetchData().then((result)=>{this.tableSetData()});

            this.populateCockpit();
            self.appendTempSeries();
            // this.fetchO2c('O2C_0_4');
            this.$root.dropdownVisible = false;
        },
    methods: {
        displayRow (data) {
          const horizontalAlign = 'center';
          const verticalAlign = 'top';
          // const color = Math.floor((Math.random() * 4) + 1)
          this.$notifications.notify(
            {
              // message: `<span>Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer.</span>`,
              message: data.description,
              icon: 'nc-icon nc-quote',
              horizontalAlign: horizontalAlign,
              verticalAlign: verticalAlign,
              type: 'primary'
            })
        },
        updateSelectedModal(data) {
            this.selectedRow = data;
        },
        tableFetchData () {
            var self = this;
            return this.istsos.fetchProcedures().then((result)=>{
                self.tableAllData = {
                    data: result.data.data
                };
            });
            // return new Promise((resolve, reject) => {
            //     self.tableAllData = {};
            //     resolve();
            // });
        },
        tableSetData () {

            var self = this;

            const substr = self.tableProps.search.toLowerCase();

            const start = (this.tableProps.page||1)*this.tableProps.length-this.tableProps.length;
            const end = (this.tableProps.page||1)*this.tableProps.length-1;

            const filteredSortedData = this.tableAllData.data.filter(el=>{
                if (self.tableProps.search.length==0) {
                    return true;
                } else if (el.description.toLowerCase().includes(substr)) {
                    return true;
                } else if (el.name.toLowerCase().includes(substr)) {
                    return true;
                } else {
                    return false;
                };
            }).sort((item, other)=>{
                let comparison;
                if ( item[this.tableProps.column]<other[this.tableProps.column] ) {
                    comparison = -1;
                } else {
                    comparison = 1
                }
                if ( this.tableProps.dir=='asc' ) {
                    return comparison
                } else {
                    return comparison*-1
                }
            }).slice(start, end+1);

            // TODO: Concordare la paginazione e la statistica dei risultati con
            // il numero di dati filtrati.

            const last_page = Math.floor(this.tableAllData.data.length/this.tableProps.length)+1;

            const tableData = {
                // payload: this.tableAllData.payload,
                links: {},
                meta: {
                    current_page: this.tableProps.page,
                    from: start+1,
                    last_page: last_page,
                    per_page: this.tableProps.length,
                    total: this.tableAllData.data.length,
                    to: Math.min(end+1, this.tableAllData.data.length)
                },
                data: filteredSortedData
            };
            this.tableData = tableData;
        },
        reloadTable (tableProps) {
            var self = this;
            this.tableProps = tableProps
            this.tableSetData();
        },
        populateCockpit () {
            var self = this;
            this.istsos.fetchLastTemetature('W_TEMP_0_4').then((result)=>{
                // self.last_temperature_data = result.options;
                self.lastTemp04 = `${result.options.series[0].data[0].y}${result.uom}`
                self.lastTemp04Time = {
                    date: result.x.toLocaleDateString('it-IT', {day: '2-digit', month: '2-digit', year: '2-digit'}),
                    time: result.x.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})
                }//result.x.toLocaleDateString('it', {hour: "numeric", minute: "numeric"})

            });
            this.istsos.fetchLastSdt('SDT_FIG').then((result)=>{
                self.last_trasparency_data = result.options;
                self.lastSdtFig = `${result.options.series[0].data[0].y}${result.uom}`
                self.lastSdtTime = {
                    date: result.x.toLocaleDateString('it-IT', {day: '2-digit', month: '2-digit', year: '2-digit'}),
                    time: result.x.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})
                }//result.x.toLocaleDateString('it', {hour: "numeric", minute: "numeric"})

            });
            // this.istsos.fetchLastTemetature('TEMP_2_5').then((result)=>{
            //     // self.last_temperature_data = result.options;
            //     self.lastTemp25 = `${result.options.series[0].data[0].y}${result.uom}`
            //     self.lastTemp25Time = {
            //         date: result.x.toLocaleDateString('it-IT', {day: '2-digit', month: '2-digit', year: '2-digit'}),
            //         time: result.x.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})
            //     }//result.x.toLocaleDateString('it', {hour: "numeric", minute: "numeric"})
            // });
            // this.istsos.fetchLastTemetature('TEMP_5_0').then((result)=>{
            //     // self.last_temperature_data = result.options;
            //     self.lastTemp50 = `${result.options.series[0].data[0].y}${result.uom}`
            //     self.lastTemp50Time = {
            //         date: result.x.toLocaleDateString('it-IT', {day: '2-digit', month: '2-digit', year: '2-digit'}),
            //         time: result.x.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})
            //     }//result.x.toLocaleDateString('it', {hour: "numeric", minute: "numeric"})
            // });
            // this.istsos.fetchLastTemetature('TEMP_8_0').then((result)=>{
            //     // self.last_temperature_data = result.options;
            //     self.lastTemp80 = `${result.options.series[0].data[0].y}${result.uom}`
            //     self.lastTemp80Time = {
            //         date: result.x.toLocaleDateString('it-IT', {day: '2-digit', month: '2-digit', year: '2-digit'}),
            //         time: result.x.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})
            //     }//result.x.toLocaleDateString('it', {hour: "numeric", minute: "numeric"})
            // });
            // this.istsos.fetchLastTemetature('TEMP_12_5').then((result)=>{
            //     // self.last_temperature_data = result.options;
            //     self.lastTemp125 = `${result.options.series[0].data[0].y}${result.uom}`
            //     self.lastTemp125Time = {
            //         date: result.x.toLocaleDateString('it-IT', {day: '2-digit', month: '2-digit', year: '2-digit'}),
            //         time: result.x.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})
            //     }//result.x.toLocaleDateString('it', {hour: "numeric", minute: "numeric"})
            // });
            // this.istsos.fetchLastTemetature('TEMP_20_0').then((result)=>{
            //     // self.last_temperature_data = result.options;
            //     self.lastTemp200 = `${result.options.series[0].data[0].y}${result.uom}`
            //     self.lastTemp200Time = {
            //         date: result.x.toLocaleDateString('it-IT', {day: '2-digit', month: '2-digit', year: '2-digit'}),
            //         time: result.x.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})
            //     }//result.x.toLocaleDateString('it', {hour: "numeric", minute: "numeric"})
            // });
            // this.istsos.fetchLastO2c('O2C_0_4').then((result)=>{
            //     // self.last_temperature_data = result.options;
            //     self.lastO2c04 = `${result.options.series[0].data[0].y} ${result.uom}`;
            //     self.lastO2c04Time = {
            //         date: result.x.toLocaleDateString('it-IT', {day: '2-digit', month: '2-digit', year: '2-digit'}),
            //         time: result.x.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})
            //     }//result.x.toLocaleDateString('it', {hour: "numeric", minute: "numeric"})
            // });
            // this.istsos.fetchLastO2c('O2C_2_5').then((result)=>{
            //     // self.last_temperature_data = result.options;
            //     self.lastO2c25 = `${result.options.series[0].data[0].y} ${result.uom}`;
            //     self.lastO2c25Time = {
            //         date: result.x.toLocaleDateString('it-IT', {day: '2-digit', month: '2-digit', year: '2-digit'}),
            //         time: result.x.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})
            //     }//result.x.toLocaleDateString('it', {hour: "numeric", minute: "numeric"})
            // });
            // this.istsos.fetchLastO2c('O2C_5_0').then((result)=>{
            //     // self.last_temperature_data = result.options;
            //     self.lastO2c50 = `${result.options.series[0].data[0].y} ${result.uom}`;
            //     self.lastO2c50Time = {
            //         date: result.x.toLocaleDateString('it-IT', {day: '2-digit', month: '2-digit', year: '2-digit'}),
            //         time: result.x.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})
            //     }//result.x.toLocaleDateString('it', {hour: "numeric", minute: "numeric"})
            // });
            // this.istsos.fetchLastO2c('O2C_8_0').then((result)=>{
            //     // self.last_temperature_data = result.options;
            //     self.lastO2c80 = `${result.options.series[0].data[0].y} ${result.uom}`;
            //     self.lastO2c80Time = {
            //         date: result.x.toLocaleDateString('it-IT', {day: '2-digit', month: '2-digit', year: '2-digit'}),
            //         time: result.x.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})
            //     }//result.x.toLocaleDateString('it', {hour: "numeric", minute: "numeric"})
            // });
            // this.istsos.fetchLastO2c('O2C_12_5').then((result)=>{
            //      // self.last_temperature_data = result.options;
            //      self.lastO2c125 = `${result.options.series[0].data[0].y} ${result.uom}`;
            //      self.lastO2c125Time = {
            //          date: result.x.toLocaleDateString('it-IT', {day: '2-digit', month: '2-digit', year: '2-digit'}),
            //          time: result.x.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})
            //      }//result.x.toLocaleDateString('it', {hour: "numeric", minute: "numeric"})
            //  });
            //  this.istsos.fetchLastO2c('O2C_20_0').then((result)=>{
            //      // self.last_temperature_data = result.options;
            //      self.lastO2c200 = `${result.options.series[0].data[0].y} ${result.uom}`;
            //      self.lastO2c200Time = {
            //          date: result.x.toLocaleDateString('it-IT', {day: '2-digit', month: '2-digit', year: '2-digit'}),
            //          time: result.x.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})
            //      }//result.x.toLocaleDateString('it', {hour: "numeric", minute: "numeric"})
            //  });
             this.istsos.fetchLastO2s('W_O2S_0_4').then((result)=>{
                 // self.last_temperature_data = result.options;
                 self.lastO2s04 = `${result.options.series[0].data[0].y} ${result.uom}`;
                 self.lastO2s04Time = {
                     date: result.x.toLocaleDateString('it-IT', {day: '2-digit', month: '2-digit', year: '2-digit'}),
                     time: result.x.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})
                 }//result.x.toLocaleDateString('it', {hour: "numeric", minute: "numeric"})
             });
            //  this.istsos.fetchLastO2s('O2S_2_5').then((result)=>{
            //      // self.last_temperature_data = result.options;
            //      self.lastO2s25 = `${result.options.series[0].data[0].y} ${result.uom}`;
            //      self.lastO2s25Time = {
            //          date: result.x.toLocaleDateString('it-IT', {day: '2-digit', month: '2-digit', year: '2-digit'}),
            //          time: result.x.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})
            //      }//result.x.toLocaleDateString('it', {hour: "numeric", minute: "numeric"})
            //  });
            //  this.istsos.fetchLastO2s('O2S_5_0').then((result)=>{
            //      // self.last_temperature_data = result.options;
            //      self.lastO2s50 = `${result.options.series[0].data[0].y} ${result.uom}`;
            //      self.lastO2s50Time = {
            //          date: result.x.toLocaleDateString('it-IT', {day: '2-digit', month: '2-digit', year: '2-digit'}),
            //          time: result.x.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})
            //      }//result.x.toLocaleDateString('it', {hour: "numeric", minute: "numeric"})
            //  });
            //  this.istsos.fetchLastO2s('O2S_8_0').then((result)=>{
            //      // self.last_temperature_data = result.options;
            //      self.lastO2s80 = `${result.options.series[0].data[0].y} ${result.uom}`;
            //      self.lastO2s80Time = {
            //          date: result.x.toLocaleDateString('it-IT', {day: '2-digit', month: '2-digit', year: '2-digit'}),
            //          time: result.x.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})
            //      }//result.x.toLocaleDateString('it', {hour: "numeric", minute: "numeric"})
            //  });
            //  this.istsos.fetchLastO2s('O2S_12_5').then((result)=>{
            //       // self.last_temperature_data = result.options;
            //       self.lastO2s125 = `${result.options.series[0].data[0].y} ${result.uom}`;
            //       self.lastO2s125Time = {
            //           date: result.x.toLocaleDateString('it-IT', {day: '2-digit', month: '2-digit', year: '2-digit'}),
            //           time: result.x.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})
            //       }//result.x.toLocaleDateString('it', {hour: "numeric", minute: "numeric"})
            //   });
            //   this.istsos.fetchLastO2s('O2S_20_0').then((result)=>{
            //       // self.last_temperature_data = result.options;
            //       self.lastO2s200 = `${result.options.series[0].data[0].y} ${result.uom}`;
            //       self.lastO2s200Time = {
            //           date: result.x.toLocaleDateString('it-IT', {day: '2-digit', month: '2-digit', year: '2-digit'}),
            //           time: result.x.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})
            //       }//result.x.toLocaleDateString('it', {hour: "numeric", minute: "numeric"})
            //   });

        },
        appendTempSeries () {
            var self = this;
            const colors = ['#2f7ed8',, '#a6c96a', '#492970', '#f28f43',
            '#0d233a', '#77a1e5', '#8bbc21'];

            const visibleProcedure = 'W_TEMP_0_4'
            const procedures = [
                visibleProcedure,
                'W_TEMP_2_5',
                'W_TEMP_5_0',
                'W_TEMP_8_0',
                'W_TEMP_12_5',
                'W_TEMP_20_0'
            ];
            let i=0;
            for (const procedure of procedures) {
                this.istsos.fetchTemperatureSeries(procedure).then((result)=>{
                    if ( procedure!=visibleProcedure ) {
                        result.options.series[0].visible = false;
                    };

                    result.options.series[0].color = colors[i];
                    i = i+1;
                    if ( !self.series_data.series ) {
                        self.series_data = result.options;
                    } else {
                        self.series_data.series.push(result.options.series[0]);
                        self.series_data.series.sort((el1, el2) => { el1.name<el2.name } );
                    };

                });
            }
        },
        fetchTemperatures(procedure) {
            var self = this;

            this.istsos.fetchTemperatureSeries(procedure).then((result)=>{
                self.series_data = result.options;
            });
        },
        loadNewTemperatures() {
            this.fetchTemperatures(this.selected_temperature);
        },
        fetchO2c(procedure) {
            var self = this;
            this.istsos.fetchLastO2c(procedure).then((result)=>{
                self.last_o2c_data = result.options;
            });
            this.istsos.fetchO2cSeries(procedure).then((result)=>{
                self.series_o2c_data = result.options;
            });
        },
        loadNewO2c() {
            this.fetchO2c(this.selected_o2c);
        },
        zoomUpdate(zoom) {
            this.currentZoom = zoom;
        },
        centerUpdate(center) {
            this.currentCenter = center;
        }
    },
  }
</script>
<style>
.table > thead > tr > th:last-child, .table > tbody > tr > th:last-child, .table > tfoot > tr > th:last-child, .table > thead > tr > td:last-child, .table > tbody > tr > td:last-child, .table > tfoot > tr > td:last-child {
  width: auto;
}
</style>
