<template>

  <div class="content">

    <div class="container-fluid">

        <div class="row">

          <div class="col-12">

            <card>

              <div class="typo-line">

                <!-- <h4 class="title">Il Progetto<br />
                </h4> -->
                <!-- <p class="longtext"><span class="category"><b><i>IL PROGETTO</i></b></span><br></p> -->
                   <img src="img/monitoraggioLaghi.png" alt="" class="img-fluid" >
                   <div class="row">
                     <!-- <div class="col-3 justify-content-center align-self-center"> -->
                      <!-- <div class="col-3 align-items-start">
                      <div></div>
                        -->

                       <!-- <img src="img/simile.png" alt="" style="width: 100%;"> -->

                     <!-- </div> -->
                     <!-- <div class="col-9"><br /> -->
                     <!-- <h4 class="title">Il Progetto</h4>
                     <p class="description text-justify">
                      Il progetto SIMILE mira alla salvaguardia dei laghi, risorsa fondamentale per il nostro territorio costantemente minacciata dai cambiamenti climatici e dagli interventi
                      dell’uomo sull’ambiente.
                       Attraverso la creazione di un sistema informativo avanzato, SIMILE si pone l’obiettivo di creare una politica di gestione dell’area dei grandi laghi subalpini e una strategia comune per migliorarne
                       l’attuale sistema di monitoraggio, per prevenire e affrontare eventuali situazioni di criticità. L’iniziativa, attraverso l’approccio partecipativo “Citizen Science”, intende coinvolgere cittadini,
                       enti, associazioni e altri attori interessati al tema della gestione delle acque affinché possano contribuire alla formalizzazione di nuove linee guida per fare fronte alle sfide che l’ecosistema dei
                       laghi dovrà sostenere in futuro.
                       </p> -->
                     <!-- </div> -->
                   </div>
              </div>
            </card>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <maggiore-card></maggiore-card>
          </div>
          <div class="col-4">
            <lugano-card></lugano-card>
          </div>
          <div class="col-4">
            <como-card></como-card>
          </div>
        </div>
        <div class="row">
          <div class="col-12 mt-4">
            <card>
              <div class="typo-line">
                <!-- <p class="longtext"><span class="category"><b><i>DETTAGLI TECNICI</i></b></span><br> -->
                  <h4 class="title">Il Progetto<br />
                    <!-- <small>Lago Ceresio</small> -->
                  </h4>
                  <p class="description text-justify">Il progetto SIMILE mira alla salvaguardia dei laghi, risorsa fondamentale per il nostro territorio costantemente minacciata dai cambiamenti climatici e dagli interventi
                      dell’uomo sull’ambiente.
                       Attraverso la creazione di un sistema informativo avanzato, SIMILE si pone l’obiettivo di creare una politica di gestione dell’area dei grandi laghi subalpini e una strategia comune per migliorarne
                       l’attuale sistema di monitoraggio, per prevenire e affrontare eventuali situazioni di criticità. L’iniziativa, attraverso l’approccio partecipativo “Citizen Science”, intende coinvolgere cittadini,
                       enti, associazioni e altri attori interessati al tema della gestione delle acque affinché possano contribuire alla formalizzazione di nuove linee guida per fare fronte alle sfide che l’ecosistema dei
                       laghi dovrà sostenere in futuro.</p>

              </div>
            </card>
          </div>
        </div>


         <!-- <div style="margin-left:15px; width:100%">
            <div class="row">
              <h4 class="title">Dettagli tecnici<br/>
                <small>Lago Ceresio</small>
               </h4>
            </div>
          </div> -->

          <!-- raw where technical details will be displayed -->
          <div class="row justify-content-center">
              <div class="col-xl-3 col-lg-6">
            <stats-card>
              <div slot="header" class="icon-warning">
                <!--i class="nc-icon nc-mobile text-warning"></i-->
                <i class="fa fa-binoculars text-simile"></i>
              </div>
              <div slot="content">
                <p class="card-category">N. Osservazioni da Citizen Science</p>
                <h4 class="card-title">{{ resultCount }}</h4>
              </div>
              <div slot="footer">
                <!-- <i class="fa fa-refresh"></i>Updated now -->
              </div>
            </stats-card>
           </div>

          <div class="col-xl-3 col-lg-6">
            <stats-card>
              <div slot="header" class="icon-success">
                <i class="fa fa-balance-scale text-interreglight"></i>
              </div>
              <div slot="content">
                <p class="card-category">N. Misure da Citizen Science</p>
                <h4 class="card-title">{{ resultCountMeasures }}</h4>
              </div>
              <div slot="footer">
                <!-- <i class="fa fa-refresh"></i>Updated now -->
              </div>
            </stats-card>
          </div>

          <div class="col-xl-3 col-lg-6">
            <stats-card>
              <div slot="header" class="icon-success">
                <i class="fa fa-line-chart text-success" aria-hidden="true"></i>
                <!-- <i class="fa fa-thermometer-full text-simile"></i> -->
              </div>
              <div slot="content">
                <p class="card-category">N. Proprietà Osservate da Sensori</p>
                <h4 class="card-title">{{ resultCountIstsos }}</h4>
              </div>
              <div slot="footer">
                <!-- <i class="fa fa-refresh"></i>Updated now -->
              </div>
            </stats-card>
          </div>

          <div class="col-xl-3 col-lg-6">
            <stats-card>
              <div slot="header" class="icon-success">
                <i class="fa fa-thumbs-up  text-simile" aria-hidden="true"></i>
                <!-- <i class="fa fa-thermometer-full text-simile"></i> -->
              </div>
              <div slot="content">
                <p class="card-category">N. Osservazioni da sensori</p>
                <h4 class="card-title">{{ resultMeasuresCountIstsos }}</h4>
              </div>
              <div slot="footer">
                <!-- <i class="fa fa-refresh"></i>Updated now -->
              </div>
            </stats-card>
          </div>

        </div>


  </div>
  <!-- <disclaimer-message /> -->
  </div>

</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  import disclaimerMessage from '../components/disclaimerMessage.vue'
  import StatsCard from 'src/components/Cards/StatsCard.vue'
  import LuganoCard from './UserProfile/LuganoCard.vue'
  import ComoCard from './UserProfile/ComoCard.vue'
  import MaggioreCard from './UserProfile/MaggioreCard.vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  export default {
    components: {
      Card,
      LuganoCard,
      ComoCard,
      MaggioreCard,
      StatsCard,
      disclaimerMessage
    },
    data () {
      return {
        whereAmI: 'Home',
        // src: 'https://www.gishosting.gter.it/lizmap-web-client/lizmap/www/index.php/view/map/?repository=dorota&project=cartografia_simile',
        responseData: [],
        countMeasures: 0,
        measuresCountIstsos: null,
        responseIstsosData: []
      }
    },
    mounted () {
      this.$root.whereAmI = '';

       axios.get('https://api-simile.como.polimi.it/v1/observations/').then((response) => {
          this.responseData = response.data["data"]
          this.responseData.forEach(element => {
              //console.log(element)
              if(element.hasOwnProperty('measures')){
                  this.countMeasures += Object.keys(element["measures"]).length
              }
          });
        });

        Promise.all([
            this.ceresioIstosos._call({services: 'ceresiohourly', observedproperties: ''}),
            this.verbanoIstosos._call({services: 'maggiorelive', observedproperties: ''}).then((r)=>r).catch(e=>{ return {'data': {'data': []}} }),
          this.larioIstosos._call({ services: 'lariolive', observedproperties: '' }).then((r) => r).catch(e => { return { 'data': { 'data': [] } } }),
          this.vareseIstosos._call({services: 'test_varese', observedproperties: ''}).then((r)=>r).catch(e=>{ return {'data': {'data': []}} })
        ]).then(responses=>{
            let responseIstsosData = [];
            responses.forEach((response)=>{responseIstsosData = responseIstsosData.concat(response.data.data)});
            this.responseIstsosData = responseIstsosData;
        })

        // TODO:
        Promise.all([
            this.ceresioIstosos._call({services: 'ceresiohourly', operations: 'getobservation/count'}),
            // ...
        ]).then(responses=>{
            // console.log(responses);
            this.measuresCountIstsos = responses.reduce((pp, cc)=>{
                return pp+cc.data.data.count
            }, 0)
            // let responseIstsosData = [];
            // responses.forEach((response)=>{responseIstsosData = responseIstsosData.concat(response.data.data)});
            // this.responseIstsosData = responseIstsosData;
        })

    },
    computed: {
      resultCount () {
        return this.responseData && this.responseData.length
      },
      resultCountMeasures () {
        return this.countMeasures
      },
      resultCountIstsos () {
        return this.responseIstsosData && this.responseIstsosData.length
      },
      resultMeasuresCountIstsos () {
          return this.measuresCountIstsos || 'N.P.'
      }

    }
  }
</script>
<style>

</style>
