<template>
    <div class="content">
        <div :class="backdropClasses"></div>
            <div class="container-fluid">

                <div class="alert alert-simile" role="alert">
                    <div >
                        <h5>{{ cards[0].message && guessLocTitle(cards[0].message) }}</h5>
                    </div>

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
                        <div v-if="cards[ii]" :class="[cards[ii+1] ? 'col-6' : 'col-12']">
                            <stats-card>
                                <div slot="header" class="icon-warning">
                                    <!-- <i class="nc-icon nc-chart text-warning"></i> -->
                                    <i :class="getCardIcon(cards[ii].name)"
                                      data-toggle="tooltip"
                                      title="cards[ii].title||'no data'"></i>
                                </div>
                                <div slot="content">
                                    <p v-if="!cards[ii].title" class="card-category placeholder-glow">
                                      <span class="placeholder col-12"></span>
                                    </p>
                                    <p v-else class="card-category">{{cards[ii].title || "--"}}</p>
                                    <h4 class="card-title">{{cards[ii].data || "N.P."}} {{cards[ii].uom || ""}}</h4>
                                    <p class="card-category">{{(cards[ii].message && guessLocLabel(cards[ii].message)) || "--"}}</p>
                                    <p class="card-text"><small class="text-muted">{{cards[ii].type}}</small></p>
                                </div>
                                <div slot="footer">
                                    <i v-if="cards[ii].data===null" class="fa fa-refresh fa-spin"></i>
                                    <i v-if="cards[ii].data===undefined" class="fa fa-exclamation-triangle"></i>
                                    <i v-if="cards[ii].time" class="fa fa-calendar" aria-hidden="true"></i>{{cards[ii].time && cards[ii].time.date}}
                                    <i v-if="cards[ii].time && cards[ii].time.time" class="fa fa-clock-o" aria-hidden="true"></i>{{cards[ii].time && cards[ii].time.time}}

                                </div>
                            </stats-card>
                        </div>
                        <div v-if="cards[ii+1]" class="col-6">
                            <stats-card>
                                <div slot="header" class="icon-warning">
                                    <!-- <i class="nc-icon nc-chart text-warning"></i> -->
                                    <i :class="getCardIcon(cards[ii+1].name)"
                                      data-toggle="tooltip"
                                      title="cards[ii+1].title||'no data'"></i>
                                </div>
                                <div slot="content">
                                    <p v-if="!cards[ii+1].title" class="card-category placeholder-glow">
                                      <span class="placeholder col-12"></span>
                                    </p>
                                    <p v-else class="card-category">{{cards[ii+1].title || "--"}}</p>
                                    <h4 class="card-title">{{cards[ii+1].data || "N.P."}} {{cards[ii+1].uom || ""}}</h4>
                                    <p class="card-category">{{(cards[ii+1].message && guessLocLabel(cards[ii+1].message)) || "--"}}</p>
                                    <p class="card-text"><small class="text-muted">{{cards[ii+1].type}}</small></p>

                                </div>
                                <div slot="footer">
                                    <i v-if="cards[ii+1].data===null" class="fa fa-refresh fa-spin"></i>
                                    <i v-if="cards[ii+1].data===undefined" class="fa fa-exclamation-triangle"></i>
                                    <i v-if="cards[ii+1].time" class="fa fa-calendar" aria-hidden="true"></i>{{cards[ii+1].time && cards[ii+1].time.date}}
                                    <i v-if="cards[ii+1].time && cards[ii+1].time.time" class="fa fa-clock-o" aria-hidden="true"></i>{{cards[ii+1].time && cards[ii+1].time.time}}
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
                        :maxBounds="[
                            [45.58,8.0255],
                            [47.428, 9.950]
                        ]"
                        :options="mapOptions"
                        @update:center="centerUpdate"
                        @update:zoom="zoomUpdate"
                        style="height: 100%;"
                        ref="map"
                      >

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

                      <l-geo-json
                          ref="areaLayer"
                          :geojson="basins"
                          :options = areaLayerOptions()
                      />

                      <l-geo-json
                          ref="markerLayer"
                          :geojson="features"
                          :options=markerLayerOptions()
                      />

                      <l-control position="bottomright">
                        <div class="input-group input-group-sm mb-3">
                          <div class="input-group-prepend">
                            <button class="btn btn-info" type="button"
                                @click="this.displayInfo"
                            >
                                <i aria-hidden="true" class="fa fa-info-circle" title="Scopri come interagire con la mappa"></i></button>
                          </div>
                          <select class="custom-select" id="inputGroupSelect03"
                              aria-label="Example select with button addon" v-model="selectedMarker"
                              title="Scegli una località o un'area da analizzare"
                              >
                            <option v-for="feature in features.features" :value="feature.properties.markerIndex">
                                  {{ guessLocLabel(feature.properties.foi_name) }}
                              </option>
                          </select>
                        </div>
                      </l-control>

                  </l-map>

                </card>
            </div>
        </div>


            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                    <a :class="{'nav-link': true, active: selectedTab=='home', enabled: tableData.data}"
                        id="home-tab" data-toggle="tab"
                        role="tab" aria-controls="home"
                        aria-selected="true" @click="selectedTab='home'">Sensori</a>
                </li>
                <li class="nav-item">
                    <a :class="{'nav-link': true, active: selectedTab=='cipais', enabled: selectedCipaisProcedures.length==0}"
                        id="cipais-tab" data-toggle="tab"
                        role="tab" aria-controls="cipais"
                        aria-selected="true" @click="selectedTab='cipais'">Indicatori CIPAIS</a>
                </li>
                <li class="nav-item">
                    <a :class="{'nav-link': true, active: selectedTab=='satellitari', enabled: selectedSatelliteProcedures.length==0}"
                        id="satellitari-tab" data-toggle="tab"
                        role="tab" aria-controls="satellitari"
                        aria-selected="true" @click="selectedTab='satellitari'">Dati satellitari</a>
                </li>
            </ul>

            <div class="tab-content" id="myTabContent">
                    <div :class="{'tab-pane': true, 'fade': true, show: selectedTab=='home', active: selectedTab=='home'}"
                        id="home" role="tabpanel" aria-labelledby="home-tab">

                        <!-- <div :class="{'container-fluid': true, invisible: Object.keys(tableData).length == 0}"> -->
                        <div v-if="!(tableData.meta && tableData.meta.total>0)">
                            <div class="row">
                            <h4>Non sono disponibili misure da sensore per la stazione selezionata.</h4>
                            </div>

                            <div class="form-group row">
                            <label for="inputGroupSelect03" class="form-text text-muted">Scegli un'altra località o un'area da analizzare:</label>
                                <div class="col-sm-6">
                                    <select name="prova" class="custom-select" id="inputGroupSelect03"
                                        aria-label="Example select with button addon" v-model="selectedMarker"
                                        title="Scegli una località o un'area da analizzare"
                                        >
                                        <option v-for="feature in features.features" :value="feature.properties.markerIndex">
                                            {{ guessLocLabel(feature.properties.foi_name) }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div v-else>
                            <h4>Cosa sono i dati da sensori</h4>

                            <p class="description text-justify">I dati provengono da sensori in-situ collocati su boe
                            (laghi Maggiore e Como) e piattaforme (Lago di Lugano). I dati sono raccolti a frequenza
                            elevata (sub-oraria) e trasmessi in tempo quasi reale. I sensori utilizzati sono di diversa
                            tipologia a seconda della proprietà misurata. Nel caso dei pigmenti algali
                            (clorofilla, ficocianina e ficoeritrina) si utilizzano sensori di tipo fluorimetrico.
                            I sensori sono soggetti a periodiche operazioni di manutenzione (pulizia, calibrazione).
                            I dati raccolti sono inoltre periodicamente validati mediante campagne di misura e analisi
                            di laboratorio. </p>

                            <h4>Misure disponibili:</h4>
                        </div>
                        <div :class="{'row': true, 'd-none': !(tableData.meta && tableData.meta.total>0)}">
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




                        <!-- </div> -->

                    </div>
                    <div :class="{'tab-pane': true, 'fade': true, show: selectedTab=='cipais', active: selectedTab=='cipais'}"
                        id="cipais" role="tabpanel" aria-labelledby="cipais-tab">
                            <div v-if="dataCipais.length==0">
                                <div class="row">
                                <h4>Non sono presenti indicatori CIPAIS per la stazione selezionata</h4>
                            </div>

                                <div class="form-group row">
                                    <label for="inputGroupSelect03" class="form-text text-muted">Scegli un'altra località o un'area da analizzare:</label>
                                    <div class="col-sm-6">
                                        <select name="prova" class="custom-select" id="inputGroupSelect03"
                                        aria-label="Example select with button addon" v-model="selectedMarker"
                                        title="Scegli una località o un'area da analizzare"
                                        >
                                        <option v-for="feature in features.features" :value="feature.properties.markerIndex">
                                            {{ guessLocLabel(feature.properties.foi_name) }}
                                        </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        <div v-else class="container-fluid">
                            <h4>Cosa sono i dati degli Indicatori CIPAIS</h4>

                            <p class="description text-justify">I dati degli “Indicatori CIPAIS” provengono dalle campagne limnologiche svolte sui laghi Maggiore e
                                Lugano e finanziate dalla Commissione internazionale per la protezione delle acque italo-svizzere
                                (CIPAIS). La Commissione si occupa di problemi quali l'inquinamento o altre alterazioni delle acque dei
                                laghi Maggiore e di Lugano, nonché dei corsi d'acqua che segnano il confine o che lo attraversano. Le
                                ricerche promosse dalla Commissione hanno lo scopo di proporre ai Governi contraenti i provvedimenti
                                necessari per il risanamento delle acque comuni e la prevenzione dell'insorgenza di ulteriori forme di
                                inquinamento. Contribuiscono inoltre ad integrare e approfondire le attività di monitoraggio e controllo
                                effettuate dalle Istituzioni locali. <br>Per ulteriori informazioni:<a href="https://www.cipais.org/" target="_blank"> Sito Cipais</a> </p>

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
                        </div>


                    </div>


                    <div :class="{'tab-pane': true, 'fade': true, show: selectedTab=='satellitari', active: selectedTab=='satellitari'}"
                        id="satellitari" role="tabpanel" aria-labelledby="satellitari-tab">
                        <div v-if="dataSatellite.length>0" class="container-fluid">
                            <h4>Cosa sono i dati satellitari</h4>

                            <p class="description text-justify">I grafici rappresentano le serie storiche di alcune statistiche derivate da immagini
                                satellitari per ognuno dei parametri di qualità delle acque dei laghi (concentrazione di clorofilla-a, solidi sospesi
                                totali e temperatura superficiale). Le statistiche che vengono calcolate sono la media, il primo e il terzo quartile,
                                e la deviazione standard. I laghi possono essere divisi in più bacini, e per ogni bacino vengono calcolate le statistiche
                                 dei valori ottenuti a partire dalle mappe dei parametri, che vengono prodotte utilizzando le immagini acquisite
                                 dalle missioni ESA Sentinel-3 e NASA Landsat 8. Le mappe complete sono disponibili al seguente <a href="https://www.webgis.eo.simile.polimi.it/" target="_blank"> link</a> </p>
                            <div v-for="cc in loopOnPairs(Array.from(Array(dataSatellite.length), (n,i)=>i))" class="row">

                                <div class="col-lg-6 col-sm-12">

                                    <figure style="min-width: 100%" class="highcharts-figure">
                                        <highcharts :options="dataSatellite[cc[0]]"></highcharts>
                                        <!--  modal -->
                                            <div class="container py-2" id="app">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <a role="button" class="btn btn-primary" @click="toggle(cc[0])">Vedi dettaglio</a>
                                                        <div :class="modalClasses[cc[0]]" id="reject" role="dialog">
                                                            <div class="modal-dialog modal-lg">
                                                                <div class="modal-content">
                                                                    <!-- <div class="modal-header">
                                                                         <h4 class="modal-title"></h4>
                                                                        <button type="button" class="close" @click="toggle()">&times;</button>
                                                                    </div> -->
                                                                    <div class="modal-body">
                                                                        <highcharts :constructor-type="'stockChart'" :options="dataSatellite[cc[0]]"></highcharts>
                                                                    </div>
                                                                    <div class="modal-footer">
                                                                        <button type="button" class="btn btn-primary" @click="toggle(cc[0])">Close</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Modal -->

                                    </figure>
                                </div>
                                <div v-if="cc[1]" class="col-lg-6 col-sm-12">

                                    <figure style="min-width: 100%" class="highcharts-figure">
                                        <highcharts :options="dataSatellite[cc[1]]"></highcharts>
                                        <!--  modal -->
                                        <div class="container py-2" id="app">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <a role="button" class="btn btn-primary" @click="toggle(cc[1])">Vedi dettaglio</a>
                                                        <div :class="modalClasses[cc[1]]" id="reject" role="dialog">
                                                            <div class="modal-dialog modal-lg">
                                                                <div class="modal-content">
                                                                    <div class="modal-body">
                                                                        <highcharts :constructor-type="'stockChart'" :options="dataSatellite[cc[1]]"></highcharts>
                                                                    </div>
                                                                    <div class="modal-footer">
                                                                        <button type="button" class="btn btn-primary" @click="toggle(cc[1])">Close</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Modal -->
                                    </figure>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="row">
                            <h4>Non sono presenti dati satellitari per la stazione selezionata</h4>
                            </div>
                            <div class="form-group row">
                                    <label for="inputGroupSelect03" class="form-text text-muted">Scegli un'altra località o un'area da analizzare:</label>
                                    <div class="col-sm-6">
                                        <select name="prova" class="custom-select" id="inputGroupSelect03"
                                        aria-label="Example select with button addon" v-model="selectedMarker"
                                        title="Scegli una località o un'area da analizzare"
                                        >
                                        <option v-for="feature in features.features" :value="feature.properties.markerIndex">
                                            {{ guessLocLabel(feature.properties.foi_name) }}
                                        </option>
                                        </select>
                                    </div>
                            </div>
                        </div>
                    </div>

            </div>
        </div>
    </div>


</template>
<script>
    import Modal from 'src/components/Modal.vue';
    import ModalButton from 'src/components/ModalButton.vue';
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
    import { LMap, LTileLayer, LWMSTileLayer, LControlLayers, LGeoJson, LControl } from "vue2-leaflet";

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

    import lake_basins from './lake_basins.js'

    import {Chart} from 'highcharts-vue';
    import Highcharts from 'highcharts';

    import IstsosIO from '../manageIstsosToken.js';

    import sharedFunctions from './sharedFunctions.js';

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
        LControl,
        LTileLayer,
        "l-wms-tile-layer": LWMSTileLayer,
        LGeoJson,
        LControlLayers,
        highcharts: Chart,
        // HighchartCard,
        NotifyButton,
        Modal,
        ModalButton,
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
                backdropClasses: [],
                // modalClasses: ['modal','fade'],
                modalClasses:[],
                istsos: null,
                selectedTab: 'home',
                selectedCipaisProcedures: [],
                selectedSatelliteProcedures: [],
                cipaisData: [],
                satelliteData:[],
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
                dataCipais: [],
                dataSatellite: {},
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
                  [45.90, 8.85],
                  [46.03, 9.12]
                ]),
                features: {
                  "type": "FeatureCollection",
                  "features": []
                },
                basins: lake_basins.ceresio,
                // url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                // url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
                wmsUrl: 'https://www.gishosting.gter.it/lizmap-web-client/lizmap/www/index.php/lizmap/service/?repository=dorota&project=cartografia_simile&',
                layers: sharedFunctions.map_layers,
                baseLayers: sharedFunctions.base_layers,
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

                    },
                },
                // attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
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
            features: {
                handler(val){
                    // do stuff
                },
                deep: true
            },
            selectedCipaisProcedures: {
                handler(val){
                    // do stuff
                    this.loadCipaisData();
                },
                // deep: true
            },
            selectedSatelliteProcedures: {
                handler(val){
                    this.loadSatelliteData();
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
                    // DEPRERCATED??
                    this.tableSetDataSatellite();
                    this.tableSetDataCipais();
                    // this.tableSetDataSatellite();
                    // this.loadCipaisData();
                    // this.loadSatelliteData();
                    if ( this.tableData.data && this.tableData.data.length>0 ) {
                        this.selectedTab='home'
                    } else if ( this.selectedSatelliteProcedures.length>0 ) {
                        this.selectedTab='satellitari'
                    } else {
                        this.selectedTab='cipais'
                    };
                },
            },
            cards: {
                handler(val){
                    // do stuff
                },
                deep: true
            },
            // basins: {
            //     handler(val){
            //         // do stuff
            //     },
            //     deep: true
            // },
        },
        mounted() {
            var self = this;
            this.$root.whereAmI = 'Lago di Lugano';
            this.istsos = this.ceresioIstosos;
            this.$root.istsos = this.istsos;

            sharedFunctions.addBaseLayers(this.$refs.map.mapObject);

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
                    foi_name: b.properties.foi_name
                }
            };


            Promise.all([
                this.tableFetchData2(),
                this.istsos.fetchGeometryCollection(),
            ]).then(results=>{
                const result = results[1];

                // result.data.features.forEach(el=>{console.log(el.properties.foi_name)});

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
                            foi_name: Object.values(v)[0].foi_name,
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

            // this.tableFetchData2().then((values) => {
            //     this.tableSetData();
            //     this.tableSetDataCipais();
            // });


            // Load markers
            // this.istsos.fetchGeometryCollection().then((result)=>{
            //     console.log(result.data.features);
            //     const reduced = groupBy(
            //         result.data.features,
            //         approxPosition,
            //         collectNames
            //     );
            //     let bounds = L.latLngBounds([]);

            //     const features = Object.entries(reduced).map(([k, v], ii) => {
            //         const coords = k.split(';').map(parseFloat);
            //         bounds.extend(L.latLng(coords[1], coords[0]));
            //         return {
            //             "type": "Feature",
            //             "properties": {
            //                 markerIndex: ii,
            //                 names: Object.entries(v).sort((a, b) => {
            //                       const ia = good_names.indexOf(a[0]);
            //                       const ib = good_names.indexOf(b[0]);

            //                       if ( ia==ib ) return 0;
            //                       if ( ia==-1 ) return 1;
            //                       if ( ib==-1 ) return -1;
            //                       if ( ia>ib ) return 1;
            //                       return -1

            //                   }).map(a=>a[1]),

            //             },
            //             "geometry": {
            //                 "type": "Point",
            //                 "coordinates": coords
            //             }
            //         }
            //     });

                // Set FeatureCollection
                self.features = {
                    "type": "FeatureCollection",
                    "features": features
                };
                self.loadCardsData();
                self.tableSetData();
                self.tableSetDataCipais();
                self.tableSetDataSatellite();
                // self.loadCipaisData();
                // self.loadSatelliteData();

                // Set map bounds
                self.bounds = bounds;

            })


            // TODO: DEPRECATE
            // this.populateCockpit();
            this.$root.dropdownVisible = false;
        },

    methods: {
        toggle(index) {
            console.log(index);
            if( this.modalClasses[index].includes('show')){
                this.modalClasses[index].pop()
                this.modalClasses[index].pop()
                this.backdropClasses=[]
            }
            else {
                this.modalClasses[index].push('d-block')
                this.modalClasses[index].push('show')
                this.backdropClasses=['modal-backdrop', 'fade', 'show']
            }

        },
        selectedTabObs(){
            if ( this.tableData.data && this.tableData.data.length>0 ) {
                        this.selectedTab='home'
                    } else if (this.selectedSatelliteProcedures && this.selectedSatelliteProcedures.length>0 ) {
                        this.selectedTab='satellitari'
                    } else if(this.selectedCipaisProcedures && this.selectedCipaisProcedure.length>0) {
                        this.selectedTab='cipais'
                    };
        },
        guessLocLabel(foi_name){
            return sharedFunctions.guessLocLabel(foi_name);
        },
        guessLocTitle(foi_name){
            return sharedFunctions.guessLocTitle(foi_name);
        },
        
        onChange(event) {
            return event.target.value;
        },
        getLocLabel (feature) {
            // basins.features.filter(()=>{})
            const labels = [
                'Gandria',
                'Figino',
                'Ceresio Nord',
                'Ceresio Sud'
            ]
            // return feature.properties.names[0].message || 'N.P.'
            return labels[feature.properties.markerIndex];
        },
        getFeatureLabel (feature) {
            // basins.features.filter(()=>{})
            const labels = [
                'Dato Satellitare',
                'Dato Cipais',
                'Dato Arpa',
                'Dato da sensore'
            ]
            // return feature.properties.names[0].message || 'N.P.'
            return labels[feature.properties.procedure.name];
        },
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
                        console.log(proc.name);
                        result.options.yAxis.plotLines = []

                        if (indicatorDescription.indicatorDescription[proc.name]) {
                            result.options.yAxis.reversed=indicatorDescription.indicatorDescription[proc.name].reversed===true;
                            if(indicatorDescription.indicatorDescription[proc.name].limite.lugano!=null){
                                result.options.yAxis.plotLines.push({
                                color: 'yellow',
                                dashStyle: 'Solid',
                                width: 2,
                                value: indicatorDescription.indicatorDescription[proc.name].limite.lugano,
                                label: {
                                    text: 'Limite',
                                    align: 'center',
                                    style: {color: 'darkgrey'}
                                }});
                            };
                            if(indicatorDescription.indicatorDescription[proc.name].obiettivo.lugano!=null){
                                result.options.yAxis.plotLines.push({
                                color: 'green',
                                dashStyle: 'ShortDash',
                                width: 2,
                                value: indicatorDescription.indicatorDescription[proc.name].obiettivo.lugano,
                                label: {
                                    text: 'Obiettivo',
                                    align: 'center',
                                    style: {color: 'darkgrey'}
                                }
                            });};
                        } else {
                            result.options.yAxis.reversed=false;

                        }

                        if(info.observedproperties[0].name in indicatorDescription.indicatorDescription){
                            result.options.title.text = indicatorDescription.indicatorDescription[info.observedproperties[0].name].title;
                        }
                        else{
                            result.options.title.text = info.description;

                        }
                        result.options.subtitle.text = `${info.description} (${result.uom})`;
                        dataCipais.push(result.options);
                    });
                    prms.push(prm);
                };
            };

            Promise.all(prms).then(()=>{self.dataCipais=dataCipais});

        },
        loadSatelliteData () {
            var self = this;
            let dataSatellite = [];
            let prms = [];
            for (const proc of self.selectedSatelliteProcedures) {

                const info = self.allProcedures[proc.procedure];

                if (info.samplingTime.beginposition && info.samplingTime.endposition) {
                    const begin = new Date(info.samplingTime.beginposition);
                    const end = new Date(info.samplingTime.endposition);
                    for (const prop of info.observedproperties) {
                        const prm = self.istsos.fetchSeries(
                            proc.procedure,
                            prop.definition,
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

                            }
                            result.options.subtitle.text = `${info.description} (${result.uom})`;
                            dataSatellite.push(result.options);
                        });
                        prms.push(prm);
                    };

                };
            };

            Promise.all(prms).then(()=>{self.dataSatellite=dataSatellite;
                self.modalClasses=[];
                for (let i = 0; i < self.dataSatellite.length; i++) {
                self.modalClasses.push(['modal','fade']);
                }
            });

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
                    cards[index].title = indicatorDescription.indicatorDescription[cards[index].name].title
                }
                else if(indicatorDescription.indicatorDescription[cards[index].name]==undefined){
                cards[index].title = cards[index].description.substring(0, 27);
                }
                else{
                    cards[index].title = indicatorDescription.indicatorDescription[cards[index].name].title
                }
                // cards[index].title = indicatorDescription.indicatorDescription[cards[index].name] || cards[index].description.substring(0, 27);

                cards[index].type = result.procedure;
                if((cards[index].type).includes('CIPAIS') ){
                    cards[index].type='Dato Cipais'
                }
                else if((cards[index].type).includes('ARPA') ) {
                cards[index].type='Dato Arpa'
                }
                else if((cards[index].type).includes('SATELLITE') ) {
                cards[index].type='Dato Satellitare'
                }
                else{cards[index].type='Dato da Sensore'}

                cards[index].data = result.value;
                
                cards[index].uom = result.uom;
                
                if (result.x){

                    if(indicatorDescription.indicatorDescription[cards[index].name] && indicatorDescription.indicatorDescription[cards[index].name].annuale){
                        cards[index].time = {
                        date: result.x.toLocaleDateString('it-IT', { year: 'numeric'}),
                        }
                    }
                    else{
                        cards[index].time = {
                            date: result.x.toLocaleDateString('it-IT', {day: '2-digit', month: '2-digit', year: '2-digit'}),
                            time: result.x.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})
                        }
                    }
                }
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
                        cards[ii].procedure,
                        
                        
                    ).then((result)=>{
                        updateCard(ii, result);
                    }));
                };
            };
            Promise.all(calls).then(()=>{
                self.cards = cards;
            })
        },
        areaLayerOptions () { return sharedFunctions.areaLayerOptions(this) },
        markerLayerOptions () { return sharedFunctions.markerLayerOptions(this) },
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
        displayInfo (data) {
          const horizontalAlign = 'center';
          const verticalAlign = 'top';

          this.$notifications.notify(
                {
                    message: `<span>Interagisci con la <b>Mappa del Lago</b> - seleziona e visualizza i dati rilevati dai sensori nelle tab sottostanti.</span>`,

                    icon: 'nc-icon nc-quote',
                    horizontalAlign: horizontalAlign,
                    verticalAlign: verticalAlign,
                    type: 'primary',
                 })
        },
        displayModal (data) {
          const horizontalAlign = 'center';
          const verticalAlign = 'top';

          this.$notifications.notify(
                {
                    message: `<span>Interagisci con la <b>Mappa del Lago</b> - seleziona e visualizza i dati rilevati dai sensori nelle tab sottostanti.</span>`,

                    icon: 'nc-icon nc-quote',
                    horizontalAlign: horizontalAlign,
                    verticalAlign: verticalAlign,
                    type: 'primary',
                 })
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

            const selectedProc =self.features.features[self.selectedMarker].properties.names.map(feat=>feat.procedure)

            // Courtesy of: https://stackoverflow.com/a/1885569/1039510
            const hadIntersection = (array1, array2)=>array1.filter(value => array2.includes(value));
            const filteredSortedData = this.tableAllData.data.filter(el=>{
              const intesection = hadIntersection(selectedProc, el.procedures);
              if (
                  intesection.length>0
                  && intesection.every((proc)=>!proc.includes("CIPAIS"))
                  && intesection.every((proc)=>!proc.includes("SATELLITE"))
              ) {
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

            const last_page = Math.floor(filteredSortedData.length/this.tableProps.length)+1;
            const slicedData = filteredSortedData.slice(start, end+1).map(el=>{
                el['title'] = indicatorDescription.indicatorDescription[el.name].title;
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
        tableSetDataSatellite () {
            const selectedProc = this.features.features[this.selectedMarker].properties.names;
            this.selectedSatelliteProcedures = selectedProc.filter(el=>el.procedure.includes("SATELLITE"));

        },
        // tableSetDataCipais_old () {

        //     var self = this;

        //     const substr = self.tableProps.search.toLowerCase();
        //     const selectedProc = self.features.features[self.selectedMarker].properties.names.map(feat=>feat.procedure)
        //     const start = (this.tableProps.page||1)*this.tableProps.length-this.tableProps.length;
        //     const end = (this.tableProps.page||1)*this.tableProps.length-1;

        //     const filteredSortedData = this.tableAllData.data.filter(el=>{
        //         if (el.procedures[0].includes("CIPAIS") && selectedProc.includes(el.procedures[0])) {
        //                 return true;
        //             } else {
        //                 return false;
        //     };}).filter(el=>{
        //         if (self.tableProps.search.length==0) {
        //             return true;
        //         } else if (el.description.toLowerCase().includes(substr)) {
        //             return true;
        //         } else if (el.name.toLowerCase().includes(substr)) {
        //             return true;
        //         } else {
        //             return false;
        //         };
        //     }).sort((item, other)=>{
        //         let comparison;
        //         if ( item[this.tableProps.column]<other[this.tableProps.column] ) {
        //             comparison = -1;
        //         } else {
        //             comparison = 1
        //         }
        //         if ( this.tableProps.dir=='asc' ) {
        //             return comparison
        //         } else {
        //             return comparison*-1
        //         }
        //     });

        //     // TODO: Concordare la paginazione e la statistica dei risultati con
        //     // il numero di dati filtrati.

        //     const last_page = Math.floor(filteredSortedData.length/this.tableProps.length)+1;
        //     const slicedData = filteredSortedData.slice(start, end+1).map(el=>{
        //         el['title']= indicatorDescription.indicatorDescription[el.name].title;
        //         return el;
        //     });
        //     const tableDataCipais = {
        //         // payload: this.tableAllData.payload,
        //         links: {},
        //         meta: {
        //             current_page: this.tableProps.page,
        //             from: start+1,
        //             last_page: last_page,
        //             per_page: this.tableProps.length,
        //             total: filteredSortedData.length,
        //             to: Math.min(end+1, this.tableAllData.data.length)
        //         },
        //         data: slicedData
        //     };
        //     this.tableDataCipais = tableDataCipais;

        // },
        reloadTable (tableProps) {
            var self = this;
            this.tableProps = tableProps
            this.tableSetData();


        },
        // reloadTableCipais (tableProps) {
        //     var self = this;
        //     this.tableProps = tableProps
        //     this.tableSetDataCipais();
        // },
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
        },
      

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
.nav-link {
  cursor: pointer
}
.modal { overflow: auto !important;}

.input-group > .form-control, .input-group > .form-control-plaintext, .input-group > .custom-select, .input-group > .custom-file {
    position: relative;
    -ms-flex: 1 1 auto;
    -webkit-box-flex: 1;
    flex: 1 1 auto;
    width: 1%;
    min-width: 0;
    margin-bottom: 0;
    height: auto;
}

.btn {
    border-width: 2px;
    background-color: #eeeeee;
    font-weight: 400;
    opacity: 0.8;
    filter: alpha(opacity=80);
    padding: 8px 16px;
    border-color: #888888;
    color: #888888;
    /* fill-opacity: 0; */
}

.btn-info:hover, .btn-info:focus, .btn-info:active, .btn-info.active, .open > .btn-info.dropdown-toggle {
    background-color: #eeeeee;
    color: #42d0ed;
    border-color: #42d0ed;
}

</style>
