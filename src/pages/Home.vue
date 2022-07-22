<template>
  <div class="content">
    <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <card>
              <div class="typo-line">
                <h4 class="title">Il Progetto<br />
                  <!-- <small>Lago Ceresio</small> -->
                </h4>
                <!-- <p class="longtext"><span class="category"><b><i>IL PROGETTO</i></b></span><br></p> -->
                   <div class="row">
                     <div class="col-3 justify-content-center align-self-center">
                       <img src="img/simile.png" alt="" style="width: 100%;">
                     </div>
                     <div class="col-9">
                      Il progetto SIMILE mira alla salvaguardia dei laghi, risorsa fondamentale per il nostro territorio costantemente minacciata dai cambiamenti climatici e dagli interventi 
                      dell’uomo sull’ambiente.
                       Attraverso la creazione di un sistema informativo avanzato, SIMILE si pone l’obiettivo di creare una politica di gestione dell’area dei grandi laghi subalpini e una strategia comune per migliorarne
                       l’attuale sistema di monitoraggio, per prevenire e affrontare eventuali situazioni di criticità. L’iniziativa, attraverso l’approccio partecipativo “Citizen Science”, intende coinvolgere cittadini,
                       enti, associazioni e altri attori interessati al tema della gestione delle acque affinché possano contribuire alla formalizzazione di nuove linee guida per fare fronte alle sfide che l’ecosistema dei
                       laghi dovrà sostenere in futuro.
                     </div>
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
          <div class="col-12">
            <card>
              <div class="typo-line">
                <!-- <p class="longtext"><span class="category"><b><i>DETTAGLI TECNICI</i></b></span><br> -->
                  <h4 class="title">Dettagli tecnici<br />
                    <!-- <small>Lago Ceresio</small> -->
                  </h4>
                  <p>Il progetto SIMILE – Sistema Informativo per il Monitoraggio Integrato dei Laghi insubrici e dei loro Ecosistemi è finanziato nell’ambito del Programma di Cooperazione Interreg Italia-Svizzera 2014-2020.
                  La qualità delle acque e dei loro ecosistemi è un elemento chiave sia per la sua fruizione ricreativa e turistica sia per il suo utilizzo agricolo e domestico. I laghi insubrici sono geograficamente collocati
                  tra l’Italia e la Svizzera e la loro gestione non può prescindere da questo aspetto, pertanto solo un’azione congiunta e coordinata può garantire il raggiungimento della buona qualità della risorsa idrica.
                  SIMILE nasce quindi sulla base della sinergia tra gli attori tecnico-scientifici e istituzionali dei due Paesi coinvolti. Il progetto, tramite un processo partecipato (partner, cittadini, associazioni, enti),
                  prevede la produzione di linee guida per affrontate le sfide future che i grandi laghi subalpini saranno chiamati ad affrontare.</p>
                
              </div>
            </card>
          </div>
        </div>

      
         <div style="margin-left:15px; width:100%">
            <div class="row">
              <h4 class="title">Dettagli tecnici<br/>
                <!-- <small>Lago Ceresio</small> -->
              </h4>
            </div>
          </div>
          <!-- raw where technical details will be displayed -->
          <div class="row">
            <div class="col-xl-2 col-md-6">
              <stats-card>
                <div slot="header" class="icon-warning">
                  <i class="nc-icon nc-chart text-warning"></i>
                </div>
                <div slot="content">
                  <p class="card-category">Capacity</p>
                  <h4 class="card-title">105GB</h4>
                </div>
                <!-- <div slot="footer">
                  <i class="fa fa-refresh"></i>Updated now
                </div> -->
              </stats-card>
              </div>
          </div>

    <!-- raw where Overview details will be displayed -->
         <div style="margin-left:15px; width:100%">
          <div class="row"> 
              <h4 class="title">
            Overview<br/>
              </h4> 
            </div>
          </div>

          <div class="row"> 
            <div class="col-xl-3 col-md-6">
                <stats-card>
                  <div slot="header" class="icon-success">
                    <i class="fa fa-balance-scale text-interreglight"></i>
                  </div>
                    <div slot="content">
                      <p class="card-category">N. Visualizzazioni</p>
                      <h4 class="card-title">XX</h4>
                    </div>
                      <div slot="footer">
                        <i class="fa fa-refresh"></i>Updated now
                      </div>
                </stats-card>
            </div>

            <div class="col-xl-3 col-md-6">
              <stats-card>
                <div slot="header" class="icon-success">
                  <i class="fa fa-map text-interreg"></i>
                </div>
                  <div slot="content">
                    <p class="card-category">N. Visitatori</p>
                    <h4 class="card-title">XX</h4>
                  </div>
                  <div slot="footer">
                    <i class="fa fa-refresh"></i>Updated now
                  </div>
              </stats-card>
            </div>

            <div class="col-xl-3 col-md-6">
             <stats-card>
                <div slot="header" class="icon-danger">
                  <i class="fa fa-newspaper-o text-simile"></i>
                </div>
                  <div slot="content">
                    <p class="card-category">News sul PROGETTO</p>
                    <h4 class="card-title"><a href="https://www.fondazionepolitecnico.it/progetti/connettivita-informazione/simile/" target="_blank"><i class="fa fa-link text-simile" style="font-size: xxx-large; margin-right: 14%;"></i></a></h4>
                  </div>
                    <div slot="footer">
                      <!--i class="fa fa-refresh"></i>Updated now-->
                    </div>
              </stats-card>  
            </div>


            <div class="col-xl-3 col-md-6">
              <stats-card>
                <div slot="header" class="icon-danger">
                  <i class="fa fa-youtube text-interreglight"></i>
                </div>
                  <div slot="content">
                    <p class="card-category">Video presentazione</p>
                    <h4 class="card-title"><a href="https://youtu.be/bTxJodSuixo" target="_blank"><i class="fa fa-youtube-play text-interreglight" style="font-size: xxx-large; margin-right: 14%;"></i></a></h4>
                  </div>
                    <div slot="footer">
                      <!--i class="fa fa-refresh"></i>Updated now-->
                    </div>
              </stats-card>
            </div>
        

        </div>


  </div>
    
  </div>

</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  import StatsCard from 'src/components/Cards/StatsCard.vue'
  import LuganoCard from './UserProfile/LuganoCard.vue'
  import ComoCard from './UserProfile/ComoCard.vue'
  import MaggioreCard from './UserProfile/MaggioreCard.vue'
  export default {
    components: {
      Card,
      LuganoCard,
      ComoCard,
      MaggioreCard,
      StatsCard
    },
    data () {
      return {
        whereAmI: 'Home'
      }
    },
    mounted () {
      this.$root.whereAmI = '';
    }
  }
</script>
<style>

</style>
