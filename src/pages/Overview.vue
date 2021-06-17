<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-2 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <!--i class="nc-icon nc-mobile text-warning"></i-->
              <i class="fa fa-binoculars text-simile"></i>
            </div>
            <div slot="content">
              <p class="card-category">N. Osservazioni Citizen Science</p>
              <h4 class="card-title">{{ resultCount }}</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </div>
          </stats-card>
        </div>

        <div class="col-xl-2 col-md-6">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="fa fa-balance-scale text-interreglight"></i>
            </div>
            <div slot="content">
              <p class="card-category">N. Misure Citizen Science</p>
              <h4 class="card-title">{{ resultCountMeasures }}</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </div>
          </stats-card>
        </div>

        <div class="col-xl-2 col-md-6">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="fa fa-map text-interreg"></i>
            </div>
            <div slot="content">
              <p class="card-category">N. Mappe Satellitari</p>
              <h4 class="card-title">NN</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </div>
          </stats-card>
        </div>

        <div class="col-xl-2 col-md-6">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="fa fa-line-chart text-simile"></i>
            </div>
            <div slot="content">
              <p class="card-category">Indicatore Lago Maggiore</p>
              <h4 class="card-title">XX</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </div>
          </stats-card>
        </div>

        <div class="col-xl-2 col-md-6">
          <stats-card>
            <div slot="header" class="icon-info">
              <i class="fa fa-bar-chart text-interreglight"></i>
            </div>
            <div slot="content">
              <p class="card-category">Indicatore Lago Ceresio</p>
              <h4 class="card-title">YY</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </div>
          </stats-card>
        </div>
        <div class="col-xl-2 col-md-6">
          <stats-card>
            <div slot="header" class="icon-info">
              <i class="fa fa-area-chart text-interreg"></i>
            </div>
            <div slot="content">
              <p class="card-category">Indicatore Lago Lario</p>
              <h4 class="card-title">ZZ</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </div>
          </stats-card>
        </div>
        <!-- se dovessero servire due card in più basta mettere col-xl-2 -->
        <!--div class="col-xl-2 col-md-6">
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

        <div class="col-xl-2 col-md-6">
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
        </div-->

      </div>
      <div class="row" style="height: 600px; margin-bottom: 30px;">
        <div class="col-md-12">
          <iframe
            :src="src"
            width="100%"
            height="100%"
            frameborder="0" >
           </iframe>
        </div>
      </div>

      <!--div class="row">
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
      </div-->
      <div class="row">
        <div class="col-12">
          <card>
            <div class="typo-line">
              <p class="longtext"><span class="category"><b><i>IL PROGETTO</i></b></span><br></p>
                <table cellspacing="2" cellpadding="2" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td valign="center" width="30%" style="text-align: left;"><img src="img/simile.png" alt="" style="width: 90%;"></td>
                      <td valign="center" width="70%" style="text-align: justify;">
                        Il progetto SIMILE mira alla salvaguardia dei laghi, risorsa fondamentale per il nostro territorio costantemente minacciata dai cambiamenti climatici e dagli interventi dell’uomo sull’ambiente. 
                        Attraverso la creazione di un sistema informativo avanzato, SIMILE si pone l’obiettivo di creare una politica di gestione dell’area dei grandi laghi subalpini e una strategia comune per migliorarne 
                        l’attuale sistema di monitoraggio, per prevenire e affrontare eventuali situazioni di criticità. L’iniziativa, attraverso l’approccio partecipativo “Citizen Science”, intende coinvolgere cittadini, 
                        enti, associazioni e altri attori interessati al tema della gestione delle acque affinché possano contribuire alla formalizzazione di nuove linee guida per fare fronte alle sfide che l’ecosistema dei 
                        laghi dovrà sostenere in futuro.
                      </td>
                    </tr>
                  </tbody>
                </table>
              <!--/p-->
            </div>
          </card>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <card>
            <div class="typo-line">
              <p class="longtext"><span class="category"><b><i>DETTAGLI TECNICI</i></b></span><br>
                Il progetto SIMILE – Sistema Informativo per il Monitoraggio Integrato dei Laghi insubrici e dei loro Ecosistemi è finanziato nell’ambito del Programma di Cooperazione Interreg Italia-Svizzera 2014-2020. 
                La qualità delle acque e dei loro ecosistemi è un elemento chiave sia per la sua fruizione ricreativa e turistica sia per il suo utilizzo agricolo e domestico. I laghi insubrici sono geograficamente collocati 
                tra l’Italia e la Svizzera e la loro gestione non può prescindere da questo aspetto, pertanto solo un’azione congiunta e coordinata può garantire il raggiungimento della buona qualità della risorsa idrica. 
                SIMILE nasce quindi sulla base della sinergia tra gli attori tecnico-scientifici e istituzionali dei due Paesi coinvolti. Il progetto, tramite un processo partecipato (partner, cittadini, associazioni, enti), 
                prevede la produzione di linee guida per affrontate le sfide future che i grandi laghi subalpini saranno chiamati ad affrontare.
              </p>
            </div>
          </card>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <card>
            <div class="typo-line">
              <p><span class="category"><b><i>I PARTNER</i></b></span><br></p>
                <table cellspacing="2" cellpadding="2" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td valign="center" width="16%" style="text-align: center;"><img src="img/partner/polimi.jpg" alt="" style="width: 80%;"></td>
                      <td valign="center" width="16%" style="text-align: center;"><img src="img/partner/supsi.png" alt="" style="width: 80%;"></td>
                      <td valign="center" width="16%" style="text-align: center;"><img src="img/partner/lombardia.jpg" alt="" style="width: 100%;"></td>
                      <td valign="center" width="16%" style="text-align: center;"><img src="img/partner/cnr.jpg" alt="" style="width: 40%;"></td>
                      <td valign="center" width="16%" style="text-align: center;"><img src="img/partner/fpolimi.jpg" alt="" style="width: 80%;"></td>
                      <td valign="center" width="16%" style="text-align: center;"><img src="img/partner/ticino.png" alt="" style="width: 100%;"></td>
                    </tr>
                  </tbody>
                </table>
                <!--div class="logo-img">
                  <img src="img/partner/polimi.jpg" alt="" style="width: 100%;">
                  <img src="img/partner/supsi.png" alt="" style="width: 100%;">
                </div-->
            </div>
          </card>
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

      <!--div class="row">
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

        <div class="col-md-6">
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

        </div>
      </div-->
    </div>
  </div>
</template>
<script>
  import ChartCard from 'src/components/Cards/ChartCard.vue'
  import StatsCard from 'src/components/Cards/StatsCard.vue'
  import LTable from 'src/components/Table.vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'

  export default {
    components: {
      LTable,
      ChartCard,
      StatsCard,
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
        src: 'https://www.gishosting.gter.it/lizmap-web-client/lizmap/www/index.php/view/map/?repository=dorota&project=cartografia_simile',
        responseData: [],
        countMeasures: 0
      }
    },
      methods: {
        zoomUpdate(zoom) {
          this.currentZoom = zoom;
        },
        centerUpdate(center) {
          this.currentCenter = center;
        },
      },
      mounted() {
      axios.get('https://api-simile.como.polimi.it/v1/observations/').then((response) => {
        //console.log(response.data["data"][10].measures)
        this.responseData = response.data["data"]
        this.responseData.forEach(element => {
            //console.log(element)
            if(element.hasOwnProperty('measures')){
              //console.log(element["measures"])
              //console.log(Object.keys(element["measures"]).length)
              this.countMeasures += Object.keys(element["measures"]).length
            }
        });
        //console.log(this.count)
      })

      /* .then(response => {
        this.logItems = response.data // this bit works fine
        this.responseData = response
        console.log(response.data)
      //.catch(error => console.log(error))
      }) */
      console.log('dentro');
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
            this.token = response2.data["access_token"]
            console.log(this.token);
          });

          /* let ciao = fetch(
            'https://istsos.ddns.net/auth/realms/istsos/protocol/openid-connect/token', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
              body: formBody
            }
          ) */
          //console.log(ciao);
    },
// mounted(){
//       console.log('ciao')
//       var base_url = 'https://istsos.ddns.net/auth/realms/istsos/protocol/openid-connect/token'
//       var client_id='istsos-istsos'
//       var username='test'
//       var password='test'
//       var grant_type='password'
//       axios({
//         method: 'post',
//         url: base_url,
//         headers: {
//           'Accept':'application/json'
//         },
//         data: {
//           'grant_type':grant_type,
//           'client_id':client_id,
//           'username':username, 
//           'password':password}
//       }).then((response) => {
//         console.log(response);
//       });
//     },
    computed: {
      resultCount () {
        return this.responseData && this.responseData.length
      },
      resultCountMeasures () {
        return this.countMeasures
      }

    }
  }
</script>
<style>

</style>
