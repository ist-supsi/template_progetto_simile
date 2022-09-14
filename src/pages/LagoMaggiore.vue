<template>
    <div class="content">
            <div class="container-fluid">
                <div class="alert alert-simile" role="alert">
                        <h5>Stato Attuale</h5>
                </div>
            </div>

        <div class="container-fluid">

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
                    <div v-for="ii in Array.from(Array(Object.entries(cards).length), (n,i)=>i).filter(e=>!(e%2))" class="row">
                        <div class="col-6">
                            <stats-card>
                                <div slot="header" class="icon-warning">
                                    <!-- <i class="nc-icon nc-chart text-warning"></i> -->
                                    <i :class="cards[ii] && getCardIcon(cards[ii].name)"
                                      data-toggle="tooltip"
                                      title="(cards[ii] && cards[ii].title)||'no data'"></i>
                                </div>
                                <div slot="content">
                                    <p v-if="!(cards[ii] && cards[ii].title)" class="card-category placeholder-glow">
                                      <span class="placeholder col-12"></span>
                                    </p>
                                    <p v-else class="card-category">{{(cards[ii] && cards[ii].title) || "--"}}</p>
                                    <h4 class="card-title">{{(cards[ii] && cards[ii].data) || "N.P."}} {{(cards[ii] && cards[ii].uom) || ""}}</h4>
                                    <p class="card-category">{{(cards[ii] && cards[ii].message) || "--"}}</p>
                                </div>
                                <div slot="footer">
                                    <i v-if="!cards[ii] || cards[ii].data===null" class="fa fa-refresh fa-spin"></i>
                                    <i v-if="!cards[ii] || cards[ii].data===undefined" class="fa fa-exclamation-triangle"></i>
                                    <i v-if="cards[ii] && cards[ii].time" class="fa fa-calendar" aria-hidden="true"></i>{{cards[ii] && cards[ii].time && cards[ii].time.date}}
                                    <i v-if="cards[ii+1] && cards[ii].time" class="fa fa-clock-o" aria-hidden="true"></i>{{cards[ii] && cards[ii].time && cards[ii].time.time}}
                                </div>
                            </stats-card>
                        </div>
                        <div class="col-6">
                            <stats-card>
                                <div slot="header" class="icon-warning">
                                    <!-- <i class="nc-icon nc-chart text-warning"></i> -->
                                    <i :class="cards[ii+1] && getCardIcon(cards[ii+1].name)"
                                      data-toggle="tooltip"
                                      title="(cards[ii+1] && cards[ii+1].title)||'no data'"></i>
                                </div>
                                <div slot="content">
                                    <p v-if="!(cards[ii+1] && cards[ii+1].title)" class="card-category placeholder-glow">
                                      <span class="placeholder col-12"></span>
                                    </p>
                                    <p v-else class="card-category">{{(cards[ii+1] && cards[ii+1].title) || "--"}}</p>
                                    <h4 class="card-title">{{(cards[ii+1] && cards[ii+1].data) || "N.P."}} {{(cards[ii+1] && cards[ii+1].uom) || ""}}</h4>
                                    <p class="card-category">{{(cards[ii+1] && cards[ii+1].message) || "--"}}</p>
                                </div>
                                <div slot="footer">
                                    <i v-if="!cards[ii+1] || cards[ii+1].data===null" class="fa fa-refresh fa-spin"></i>
                                    <i v-if="!cards[ii+1] || cards[ii+1].data===undefined" class="fa fa-exclamation-triangle"></i>
                                    <i v-if="cards[ii+1] && cards[ii+1].time" class="fa fa-calendar" aria-hidden="true"></i>{{cards[ii+1] && cards[ii+1].time && cards[ii+1].time.date}}
                                    <i v-if="cards[ii+1] && cards[ii+1].time" class="fa fa-clock-o" aria-hidden="true"></i>{{cards[ii+1] && cards[ii+1].time && cards[ii+1].time.time}}
                                </div>
                            </stats-card>
                        </div>
                    </div>

                </div>
                <div class="col-4" style="height: 510px">
                    <card style="height: 94%;">
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
                            :opacity="layer.opacity"
                            layer-type="overlay"


                          ></l-wms-tile-layer>

                          <!-- <v-marker-cluster>
                            <v-marker v-for="feat in features.features" :lat-lng="feat.geometry.coordinates.slice(0, 2)">
                            </v-marker>
                          </v-marker-cluster> -->


                          <l-geo-json
                              ref="markerLayer"
                              :geojson="features"
                              :options="markerLayerOptions()"

                          />
                      </l-map>
                    </card>
                </div>
            </div>


            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                    <a :class="{'nav-link': true, active: selectedTab=='home'}" id="home-tab" data-toggle="tab"
                        role="tab" aria-controls="home"
                        aria-selected="true" @click="selectedTab='home'">Home</a>
                </li>
                <li class="nav-item">
                    <a :class="{'nav-link': true, active: selectedTab=='cipais', disabled: selectedCipaisProcedures.length==0}" id="profile-tab" data-toggle="tab"
                        role="tab" aria-controls="profile"
                        aria-selected="false" @click="selectedTab='cipais'">Pannello CIPAIS</a>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                    <div :class="{'tab-pane': true, 'fade': true, show: selectedTab=='home', active: selectedTab=='home'}"
                        id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div :class="{'container-fluid': true, invisible: Object.keys(tableData).length == 0}">
                            <h4>Misure disponibili</h4>
                            <div class="row">
                                <div class="col-12">
                                    <data-table
                                        :columns="tableColumns2"
                                        :data="tableData"
                                        :per-page="[5, 10, 15]"
                                        @on-table-props-changed="reloadTable"
                                        >
                                    </data-table>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div :class="{'tab-pane': true, 'fade': true, show: selectedTab=='cipais', active: selectedTab=='cipais'}"
                        id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div v-if="dataCipais.length>0" class="container-fluid">
                            <div v-for="cc in loopOnPairs(Array.from(Array(dataCipais.length), (n,i)=>i))" class="row">
                                <div class="col-lg-6 col-sm-12">
                                    <figure style="min-width: 100%" class="highcharts-figure">
                                        <highcharts :options="dataCipais[cc[0]]"></highcharts>
                                    </figure>
                                </div>
                                <div v-if="cc[1]" class="col-lg-6 col-sm-12">
                                    <figure style="min-width: 100%" class="highcharts-figure">
                                        <highcharts :options="dataCipais[cc[1]]"></highcharts>
                                    </figure>
                                </div>
                            </div>
                            <!-- <div class="row" v-if="dataCipais.length%2">
                                <div class="col-sm-12">
                                    <figure style="min-width: 100%" class="highcharts-figure">
                                        <highcharts :options="dataCipais[dataCipais.length]"></highcharts>
                                    </figure>
                                </div>
                            </div> -->
                        </div>
                    </div>
            </div>
        </div>
    </div>


</template>
<script>
    // import {Chart} from 'highcharts-vue';
    // import Highcharts from 'highcharts';
    // import loadBullet from 'highcharts/modules/bullet.js';

    // import SimileIcon from 'src/components/Icon/SimileIcon.vue'

    // import ChartCard from 'src/components/Cards/ChartCard.vue'
    // import HighchartCard from 'src/components/Cards/HighchartCard.vue'
    import StatsCard from 'src/components/Cards/StatsCard.vue'
    import LTable from 'src/components/Table.vue'

    // Courtesy of: https://vue2-leaflet.netlify.app/quickstart/#marker-icons-are-missing
    // Otherwise Marker Icons are missing
    import { Icon } from 'leaflet';

    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });


    import { latLngBounds, latLng } from "leaflet";
    import { LMap, LTileLayer, LWMSTileLayer, LControlLayers, LGeoJson } from "vue2-leaflet";

    import 'leaflet/dist/leaflet.css';

    // import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
    // import Vue2LeafletMarker from 'vue2-leaflet-markercluster'

    // import "leaflet.markercluster/dist/MarkerCluster.css";
    // import "leaflet.markercluster/dist/MarkerCluster.Default.css";

    // import Modal from 'src/components/Modal.vue';
    // import ModalButton from 'src/components/ModalButton.vue';
    import NotifyButton from 'src/components/NotifyButton.vue';
    import AnchorToAnalisysPage from 'src/components/AnchorToAnalisysPage.vue';
    import indicatorDescription from '../indicatorDescription';

    import TabNav from '../layout/TabNav.vue';
    import Tab from '../components/Tab.vue';
    import CipaisLugano from '../components/CipaisLugano.vue';
    import TestChart from '../components/testChart.vue';

    import {Chart} from 'highcharts-vue';
    import Highcharts from 'highcharts';

    import IstsosIO from '../manageIstsosToken.js';

    import istsosToHighcharts from './istsosToHighcharts';
    import { mean,std,min,sqrt,max } from 'mathjs';

    // Highcharts.setOptions({
    //     chart: {
    //         inverted: true,
    //         marginLeft: 135,
    //         type: 'bullet'
    //     },
    //     title: {
    //         text: null
    //     },
    //     legend: {
    //         enabled: false
    //     },
    //     yAxis: {
    //         gridLineWidth: 0
    //     },
    //     plotOptions: {
    //         series: {
    //             pointPadding: 0.25,
    //             borderWidth: 0,
    //             color: '#000'
    //         }
    //     },
    //     credits: {
    //         enabled: false
    //     },
    //     exporting: {
    //         enabled: false
    //     }
    // });

  //   loadBullet(Highcharts);
  //
  //   Highcharts.setOptions({
  //     chart: {
  //         inverted: true,
  //         marginLeft: 135,
  //         type: 'bullet'
  //     },
  //     title: {
  //         text: null
  //     },
  //     legend: {
  //         enabled: false
  //     },
  //     yAxis: {
  //         gridLineWidth: 0
  //     },
  //     plotOptions: {
  //         series: {
  //             pointPadding: 0.25,
  //             borderWidth: 0,
  //             color: '#000',
  //             targetOptions: {
  //                 width: '200%'
  //             }
  //         }
  //     },
  //     credits: {
  //         enabled: false
  //     },
  //     exporting: {
  //         enabled: false
  //     }
  // });

    export default {
        components: {
    LTable,
    // ChartCard,
    StatsCard,
    LMap,
    LTileLayer,
    "l-wms-tile-layer": LWMSTileLayer,
    LGeoJson,
    LControlLayers,
    highcharts: Chart,
    // HighchartCard,
    NotifyButton,
    // 'v-marker-cluster': Vue2LeafletMarkerCluster,
    // 'v-marker': Vue2LeafletMarker,
    // ModalButton,
    // Modal
    // SimileIcon,
    TabNav,
    Tab,
    CipaisLugano,
    TestChart
},
        data () {
            return {
                // markers: [],
                istsos: null,
                selectedTab: 'home',
                selectedCipaisProcedures: [],
                cipaisData: [],
                selectedProc: null,
                showDescription: true,
                lastSdtFig: '',
                lastSdtTime: null,
                lastTemp04: '',
                lastTemp04Time: null,
                lastO2s04: '',
                lastO2s04Time: null,
                selected_temperature: 'TEMP_0_4',
                selected_o2c: 'O2C_0_4',
                last_temperature_data: {},
                series_data: {},
                last_o2c_data: {},
                series_o2c_data: {},
                tableAllData: {},
                allProcedures: {},
                dataCipais:{},
                tableAllData2: {},
                showModal: false,
                tableData: {},
                tableDataCipais:{},
                tableData2: {},
                tableProps: {
                    page: 1,
                    search: '',
                    length: 5,
                    column: 'name',
                    dir: 'asc'
                },
                // tablePropsCipais: {
                //     page: 1,
                //     search: '',
                //     length: 5,
                //     column: 'name',
                //     dir: 'asc'
                // },
                tableColumns2: [
                    // {
                    //     // label: 'Nome',
                    //     // name: 'name',
                    //     // orderable: true,
                    //     // hidden: true,

                    // },
                    {
                        label:'Titolo',
                        name:'title',
                        orderable: true,
                    },
                    // {
                    //     label: 'Descrizione',
                    //     name: 'description',
                    //     orderable: false,
                    // },
                    // {
                    //     label: 'Giorni',
                    //     name: 'days',
                    //     orderable: false,
                    // },
                    {
                        label: 'Inizio',
                        name: 'begin',
                        orderable: false,
                    },
                    {
                        label: 'Fine',
                        name: 'end',
                        orderable: false,
                    },
                     {
                        label: ' ',
                        name: 'info',
                        orderable: false,
                        classes: {
                            'btn': true,
                            'btn-info': true,
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
                        event: "click",
                        handler: (data)=>{
                            this.$root.analisysVariable = `${data.procedures[0]}`;
                            this.$root.analisysVariableUrn = `${data.definition}`;

                        },
                        orderable: false,
                        classes: {
                            'btn': true,
                            'btn-primary': false,
                            'btn-info': true,
                            'btn-sm': true,
                        },
                        component: AnchorToAnalisysPage
                    }
                ],
                selectedRow: {},
                editTooltip: 'Edit Task',
                deleteTooltip: 'Remove',
                zoom: 13,
                //center: latLng(47.41322, -1.219482),
                // 45.98815472817849, 8.970311660582176
                // minlat="45.9029678" minlon="8.8586625" maxlat="46.0363240" maxlon="9.1252600"/
                bounds: latLngBounds([
                  [45.72, 8.50],
                  [46.18, 8.86]
                ]),
                features: {
                  "type": "FeatureCollection",
                  "features": []
                },
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
                    opacity: .5,
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
                    opacity: .5,
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
                markerLayer: {
                    name: 'Marker',
                    visible: true,
                    layers: 'Marker',
                    geojson: {
                      'name': 'markers',
                      'type': 'FeatureCollection',
                      'features': []
                    },
                    pointToLayer: function (feature, latlng) {
                        return L.marker(latlng);

                    }
                },
                attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                currentZoom: 10.5,
                //currentCenter: latLng(47.41322, -1.219482),
                showParagraph: false,
                mapOptions: {
                  zoomSnap: 0.5,
                  scrollWheelZoom: false
                },
                showMap: true,
                selectedMarker: 1,
                cards: [{}, {}, {}, {}, {}, {}],
                selected: 'Serie storiche'
            }
        },
        watch: {
            selectedCipaisProcedures: {
                handler(val){
                    // do stuff
                    // TODO: load cipais data
                    this.loadCipaisData();
                },
                // deep: true
            },
            markerLayer: {
                handler(val){
                    // do stuff
                },
                deep: true
            },
            selectedMarker: {
                handler(val){
                    // do stuff
                    this.loadCardsData();
                    this.tableSetData();
                    this.tableSetDataCipais();
                },
            },
            cards: {
                handler(val){
                    // do stuff
                },
                deep: true
            },
        },
        mounted() {
            var self = this;
            this.$root.whereAmI = 'Lago di Lugano';

            this.istsos = this.verbanoIstosos;

            const good_names = [
                "air-temperature",
                "air-relative-humidity",
                "wind-direction",
                "wind-speed-max",
                "water-temperature",
                "water-O2S",
                "water-SDT",
                "water-PTOT",
                "water-depth",
                "water-Pload",
                "water-Biovol",
                "water-PC"
            ];

            const groupBy = (x,f,g)=>x.reduce((a,b)=>{
                const rr = g(b);

                if ( a[f(b)] ) {
                    // a[f(b)].push(g(b))
                    if ( !a[f(b)][rr.name] ) {
                        a[f(b)][rr.name] = rr;
                    };
                    return a;
                } else {
                    a[f(b)] = {};
                    a[f(b)][rr.name] = rr;
                    return a;
                }
            },{});

            function approxPosition (a) {
                const ff = .005 // Approximation
                const lon = (a.geometry.coordinates[0]/ff).toFixed(0)*ff;
                const lat = (a.geometry.coordinates[1]/ff).toFixed(0)*ff;
                return `${lon};${lat}`;
            };
            const collectNames = (b)=>{

                return {
                    name: b.properties.observedproperties[0].name,
                    procedure: b.properties.name,
                    urn: b.properties.observedproperties[0].def,
                    description: b.properties.description,

                }
            };

            Promise.all([
                this.tableFetchData2(),
                this.istsos.fetchGeometryCollection(),
            ]).then(results=>{
                const result = results[1];
                const reduced = groupBy(
                    result.data.features,
                    approxPosition,
                    collectNames
                );
                let bounds = L.latLngBounds([]);

                const features = Object.entries(reduced).map(([k, v], ii) => {
                    const coords = k.split(';').map(parseFloat);
                    // bounds.extend(L.latLng(coords[1], coords[0]));
                    return {
                        "type": "Feature",
                        "properties": {
                            markerIndex: ii,
                            names: Object.entries(v).sort((a, b) => {
                                const ia = good_names.indexOf(a[0]);
                                const ib = good_names.indexOf(b[0]);

                                if ( ia==ib ) return 0;
                                if ( ia==-1 ) return 1;
                                if ( ib==-1 ) return -1;
                                if ( ia>ib ) return 1;
                                return -1

                            }).map(a=>a[1]),
                            // infos: v,
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": coords
                        }

                    }

            });

                // Set FeatureCollection
                self.features = {
                    "type": "FeatureCollection",
                    "features": features
                };
                self.loadCardsData();
                self.tableSetData();
                self.tableSetDataCipais();

                // Set map bounds
                self.bounds = bounds;

            })

            // TODO: DEPRECATE
            // this.populateCockpit();
            this.$root.dropdownVisible = false;

        },

    methods: {
        loopOnPairs (myarray) {
            return myarray.reduce(function(result, value, index, array) {
                if (index % 2 === 0)
                    result.push(array.slice(index, index + 2));
                return result;
                }, []);
        },
        getCardIcon (name) {
            if(indicatorDescription.indicatorDescription[name]==undefined || indicatorDescription.indicatorDescription[name].icon==undefined){
                return 'fa fa-question-circle-o text-info';
            } else {
                return indicatorDescription.indicatorDescription[name].icon;
            };
        },
        loadCipaisData () {
            var self = this;
            let dataCipais = [];
            let prms = [];
            for (const proc of this.selectedCipaisProcedures) {

                const info = self.allProcedures[proc.procedure];

                if (info.samplingTime.beginposition && info.samplingTime.endposition) {
                    const begin = new Date(info.samplingTime.beginposition);
                    const end = new Date(info.samplingTime.endposition);

                    const prm = this.istsos.fetchSeries(
                        proc.procedure,
                        info.observedproperties[0].definition,
                        begin,
                        end
                    ).then(response=>{
                        const result = istsosToHighcharts.istosToLine(response);
                        // result.options.name = 'foo';
                        const variableAverage = mean(result.options.series[0].data.map((xy)=>xy[1]));

                        result.options.yAxis.plotLines = [{
                            color: 'darkgrey',
                            dashStyle: 'ShortDash',
                            width: 2,
                            value: variableAverage,
                            label: {
                                text: 'media della serie',
                                align: 'center',
                                style: {color: 'darkgrey'}

                            }
                        }];

                        if(info.observedproperties[0].name in indicatorDescription.indicatorDescription){
                            result.options.title.text = indicatorDescription.indicatorDescription[info.observedproperties[0].name].title;
                        }
                        else{
                            result.options.title.text = info.description;
                            console.log(info)
                        }
                        result.options.subtitle.text = `${info.description} (${result.uom})`;
                        dataCipais.push(result.options);
                    });
                    prms.push(prm);
                };
            };

            Promise.all(prms).then(()=>{self.dataCipais=dataCipais});

        },
        loadCardsData () {
            var self = this;

            // const titles = {
            //     'air-temperature': "Temperatura dell'aria",
            //     'wind-speed-max': "Velocità del vento di picco",
            //     'water-temperature': "Temperatura dell'acqua",
            //     'air-relative-humidity': "Umidità relativa dell'aria",
            //     'wind-direction': "Direzione del vento"
            // };


            let cards = {};
            function updateCard(index, result) {
                // self.cards[index].description = self.cards[index].description.substring(0, 27)
                // const title = self.tableAllData.filter((el)=>{el.definition==result.urn})[0];
                // cards[index].title = titles[cards[index].name] || cards[index].description.substring(0, 27);
                if(cards[index]==undefined){
                    cards[index].title = ''; //indicatorDescription.indicatorDescription[cards[index].name].title
                } else if (indicatorDescription.indicatorDescription[cards[index].name]==undefined) {
                  cards[index].title = cards[index].description.substring(0, 27);
                } else {
                  cards[index].title = indicatorDescription.indicatorDescription[cards[index].name].title
                };
                // cards[index].title = indicatorDescription.indicatorDescription[cards[index].name] || cards[index].description.substring(0, 27);
                cards[index].data = result.value;
                cards[index].uom = result.uom;
                if ( result.x ) {
                    cards[index].time = {
                        date: result.x.toLocaleDateString('it-IT', {day: '2-digit', month: '2-digit', year: '2-digit'}),
                        time: result.x.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})
                    };
                };

                cards[index].message = result.locationUrn.split(':').at(-1);
            };

            let calls = []
            for (let ii = 0; ii < 6; ii++) {
                if ( self.features.features[self.selectedMarker].properties.names[ii] ) {
                    let info = self.features.features[self.selectedMarker].properties.names[ii];
                    // cards.push(info)
                    cards[ii] = info;

                    cards[ii].data = null;
                    calls.push(this.istsos.fetchBy(
                        cards[ii].urn,
                        cards[ii].procedure
                    ).then((result)=>{
                        updateCard(ii, result);
                    }));
                };
            };
            Promise.all(calls).then(()=>{
                self.cards = cards;
            })
        },

        markerLayerOptions () {
            var self = this;
            return {
                pointToLayer: function (feature, latlng) {
                    let clr;
                    if ( feature.properties.markerIndex == self.selectedMarker ) {
                        clr = 'text-primary'
                    } else {
                        clr = 'text-secondary'
                    };
                    const fontAwesomeIcon = L.divIcon({
                        html: `<i class="fa fa-map-marker fa-4x ${clr}"></i>`,
                        iconSize: [40, 80],
                        iconAnchor: [20, 40],
                        className: ''
                    });

                    const marker = L.marker(latlng, {icon: fontAwesomeIcon}).on('click', (ee)=>{
                        self.selectedMarker=feature.properties.markerIndex
                    });

                    if (feature.properties.names[0].message) {
                        marker.bindTooltip(`<h6>${feature.properties.names[0].message}</h6>`)
                    };

                    return marker;
                }
            }
        },
        removeMarker(index) {
            this.markers.splice(index, 1);
            },
        addMarker(event) {
            this.markers.push(event.latlng);
            },
        displayRow (data) {
          const horizontalAlign = 'center';
          const verticalAlign = 'top';
          // const color = Math.floor((Math.random() * 4) + 1)
          //if it finds the name of the indicator in the indicatorDescription.indicatorDescription dictionary then
          //it shows the notification
          if(indicatorDescription.indicatorDescription[data.name]){
                this.$notifications.notify(
                {
                // message: `<span>Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer.</span>`,
                    message: indicatorDescription.indicatorDescription[data.name].description,
                    icon: 'nc-icon nc-quote',
                    horizontalAlign: horizontalAlign,
                    verticalAlign: verticalAlign,
                    type: 'primary',
                 })
          }
          else {
             this.$notifications.notify(
                {
                // message: `<span>Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer.</span>`,
                    message: 'no description found',
                    icon: 'nc-icon nc-quote',
                    horizontalAlign: horizontalAlign,
                    verticalAlign: verticalAlign,
                    type: 'primary',
                 })
          }

        },
        updateSelectedModal(data) {
            this.selectedRow = data;
        },
        tableFetchData2 () {
            var self = this;

            return Promise.all([
                this.istsos.fetchObserverProperties(),
                this.istsos.fetchProcedures()
            ]).then((results)=>{
                self.$root.allProcedures = results[1].data.data.reduce((obj, it)=>{
                    obj[it.name]=it;
                    return obj
                }, {});
                self.allProcedures = self.$root.allProcedures;
                let tableAllData = results[0].data.data;

                tableAllData.forEach((el => {

                    const ff = results[1].data.data.filter(proc => proc.observedproperties[0].name==el.name);
                    const ends = ff.map(proc=>proc.samplingTime.endposition);
                    const begins = ff.map(proc=>proc.samplingTime.beginposition);
                    const begin = begins.length ? Math.min(...begins.map(bb=>(Date.parse(bb)))) : 0;
                    const end = ends.length ? Math.min(...ends.map(bb=>(Date.parse(bb)))) : 0;


                    if ( begin && end ) {
                        const diffTime = Math.abs(end - begin);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        el['days'] = diffDays;
                        el['begin'] = new Date(begin).toLocaleDateString('it-IT');
                        el['end'] = new Date(end).toLocaleDateString('it-IT');
                    }

                }));
                //testing inizio
                // console.log(tableAllData[2].name);
                // console.log(indicatorDescription.indicatorDescription[tableAllData[2].name].title)
                // var i
                // var titleTable
                // for( i=0;i<tableAllData.length;i++){
                //     if(tableAllData[i].name==undefined){
                //         el['title']= "N.P."
                //     }
                //     else{
                //         el['title'] = indicatorDescription.indicatorDescription[tableAllData[i].name].title;
                //     }

                // }
                // console.log(title);
                //testing fine
                self.tableAllData = {data: tableAllData.filter(el => el.begin && el.end)};
            })
        },
        tableSetData () {

            var self = this;

            const substr = self.tableProps.search.toLowerCase();

            const start = (this.tableProps.page||1)*this.tableProps.length-this.tableProps.length;
            const end = (this.tableProps.page||1)*this.tableProps.length-1;

            const selectedProc = self.features.features[self.selectedMarker].properties.names.map(feat=>feat.procedure)
                                // self.features.features[self.selectedMarker].properties.names
            const filteredSortedData = this.tableAllData.data.filter(el=>{


                if(el.procedures[0] && !el.procedures[0].includes("CIPAIS") && selectedProc.includes(el.procedures[0]) ){
                    return true;
                }
                else {
                    return false;
                };
            }).filter(el=>{
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
            });

            // TODO: Concordare la paginazione e la statistica dei risultati con
            // il numero di dati filtrati.

            const last_page = Math.floor(filteredSortedData.length/this.tableProps.length)+1;
            const slicedData = filteredSortedData.slice(start, end+1).map(el=>{
                if (el.name in indicatorDescription.indicatorDescription) {
                    el['title'] = indicatorDescription.indicatorDescription[el.name].title;
                } else {
                    el['title'] = '';
                };
                // el['title'] = indicatorDescription.indicatorDescription[el.name].title;
                return el;
            });
            const tableData = {
                // payload: this.tableAllData.payload,
                links: {},
                meta: {
                    current_page: this.tableProps.page,
                    from: start+1,
                    last_page: last_page,
                    per_page: this.tableProps.length,
                    total: filteredSortedData.length,
                    to: Math.min(end+1, this.tableAllData.data.length)
                },
                data: slicedData
            };
            this.tableData = tableData;

        },
        tableSetDataCipais () {
            const selectedProc = this.features.features[this.selectedMarker].properties.names;
            this.selectedCipaisProcedures = selectedProc.filter(el=>el.procedure.includes("CIPAIS"));

        },
        reloadTable (tableProps) {
            var self = this;
            this.tableProps = tableProps
            this.tableSetData();
        },
        reloadTableCipais (tableProps) {
            var self = this;
            this.tableProps = tableProps
            this.tableSetDataCipais();
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

                // self.addMarker(result.coords[0], result.coords[1])

            });
            this.istsos.fetchLastSdt('SDT_FIG').then((result)=>{
                self.last_trasparency_data = result.options;
                self.lastSdtFig = `${result.options.series[0].data[0].y}${result.uom}`
                self.lastSdtTime = {
                    date: result.x.toLocaleDateString('it-IT', {day: '2-digit', month: '2-digit', year: '2-digit'}),
                    time: result.x.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})
                }//result.x.toLocaleDateString('it', {hour: "numeric", minute: "numeric"})

            });
            this.istsos.fetchLastO2s('W_O2S_0_4').then((result)=>{
                // self.last_temperature_data = result.options;
                self.lastO2s04 = `${result.options.series[0].data[0].y} ${result.uom}`;
                self.lastO2s04Time = {
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
        },
        setSelected(tab){
            this.selected =tab;
        }



    }

}




</script>
<style>
.table > thead > tr > th:last-child,
.table > tbody > tr > th:last-child,
.table > tfoot > tr > th:last-child,
.table > thead > tr > td:last-child,
.table > tbody > tr > td:last-child,
.table > tfoot > tr > td:last-child {
  width: auto;
}
</style>
