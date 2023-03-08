<template>
  <div class="wrapper" style="height: 100%;">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>


      <!-- <sidebar-link to="/gter">
        <i class="nc-icon nc-circle-09"></i>
        <p>WEB APP</p>
      </sidebar-link> -->
      <!-- <li class="router-link-exact-active nav-item">
        <a href="https://simile.como.polimi.it/SimileWebAdministrator2/" class="nav-link" target="_blank">
          <i class="nc-icon nc-mobile"></i>
          <p>WEB APP SIMILE</p>
        </a>
      </li> -->
      <!-- <li class="router-link-exact-active nav-item">
        <a href="https://simile.como.polimi.it/SimileWebAdministrator2/" class="nav-link" target="_blank">
          <i class="nc-icon nc-map-big"></i>
          <p>WEBGIS DATI SAT</p>
        </a>
      </li> -->
      <!--sidebar-link to="/admin/user">
        <i class="nc-icon nc-circle-09"></i>
        <p>User Profile</p>
      </sidebar-link-->
      <sidebar-link to="/admin/home">
        <i class="nc-icon nc-compass-05"></i>
        <p>Home</p>
      </sidebar-link>
      <sidebar-link to="/admin/lago-maggiore">
        <i class="nc-icon nc-tag-content"></i>
        <p>Lago Maggiore</p>
      </sidebar-link>
      <sidebar-link to="/admin/lago-lugano">
        <i class="nc-icon nc-tag-content"></i>
        <p>Lago di Lugano</p>
      </sidebar-link>
      <sidebar-link to="/admin/lago-como">
        <i class="nc-icon nc-tag-content"></i>
        <p>Lago di Como</p>
      </sidebar-link>
      <sidebar-link to="/admin/lago-varase">
        <i class="nc-icon nc-tag-content"></i>
        <p>Lago di Varase</p>
      </sidebar-link>

      <!-- <li><a class="nav-link">Test</a>
          <ul> -->
      <li class="">
          <a href="https://simile.como.polimi.it/SimileWebAdministrator2/"
              class="nav-link" target="_blank">
              <i class="nc-icon nc-planet"></i>
              <p title="Applicazione web SIMILE">SIMILE WEB APP</p>
          </a>
      </li>
      <li class="">
          <a href="https://www.webgis.eo.simile.polimi.it/"
              class="nav-link" target="_blank">
              <i class="nc-icon nc-square-pin"></i>
              <p title="Web gis dati satellitari">WEB GIS</p>
          </a>
      </li>
      <!-- <li class="">
          <a href="https://www.skylinewebcams.com/webcam/italia/piemonte/verbania/lago-maggiore-boa-limnologica.html?w=1764"
              class="nav-link" target="_blank">
              <i class="nc-icon nc-camera-20"></i>
              <p title="Pallanza live webcam">WEBCAM</p>
          </a>
      </li> -->
      <li class="">
          <span @click="toggleModalWebcam()"
              class="nav-link">
              <i class="nc-icon nc-camera-20"></i>
              <p title="webcam">WEBCAM</p>
          </span>

      </li>
          <!-- </ul>
      </li> -->

      <!-- <sidebar-link target="_blank"  to="">
        <i class="nc-icon nc-planet"></i>

          <p title="Altre risorse del progetto Simile">
            <a href="" class="text-white" >Altre risorse</a>
          </p>

          <a alt="foo"
          class="dropdown-item active"
          target="_blank"

          rel="noopener noreferrer"
          href="https://simile.como.polimi.it/SimileWebAdministrator2/">
          WEB APP SIMILE
          </a>

          <a class="dropdown-item active"
          target="_blank"

          rel="noopener noreferrer"
          href="https://www.webgis.eo.simile.polimi.it/">
          WEB GIS DATI
          </a>
      </sidebar-link> -->


      <!-- <sidebar-link target="_blank" to="" href="https://simile.como.polimi.it/SimileWebAdministrator2/">

        <p>&nbsp &nbsp &nbsp WEB APP SIMILE</p>
      </sidebar-link>
      <sidebar-link target="_blank" to="" href="https://www.webgis.eo.simile.polimi.it/#">

        <p>WEB GIS DATI</p>
      </sidebar-link> -->

      <!-- <base-dropdown title="Altre risorse del progetto">
            <a class="dropdown-item" target="_blank" alt="foo" rel="noopener noreferrer" href="https://simile.como.polimi.it/SimileWebAdministrator2/">WEB APP SIMILE</a>
            <a class="dropdown-item" target="_blank" rel="noopener noreferrer" href="https://simile.como.polimi.it/SimileWebAdministrator2/">WEB GIS DATI SAT</a>
      </base-dropdown> -->


      <!-- <sidebar-link to="/admin/maps">
        <i class="nc-icon nc-pin-3"></i>
        <p>Maps</p>
      </sidebar-link> -->
      <!--sidebar-link to="/admin/notifications">
        <i class="nc-icon nc-bell-55"></i>
        <p>Notifications</p>
      </sidebar-link-->

      <!-- <template slot="bottom-links">
        <sidebar-link class="active"
                      to="/admin/upgrade">
          <i class="nc-icon nc-alien-33"></i>
          <p>Upgrade to PRO</p>
        </sidebar-link>
      </template> -->

    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer> </content-footer>

      <!-- Modal -->
<div
    :class="{modal: true, fade: true, show: webcamModalShow}"
    :style="{display: webcamModalShow ? 'block' : 'none'}"
    id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
    style="padding-right: 15px;"
>
  <div class="modal-dialog modal-xl" style="z-index: 1072;">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Lago Maggiore: boa in località Pallanza</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="toggleModalWebcam()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <iframe v-if="webcamModalShow" loading="lazy" src="https://www.skylinewebcams.com/webcam/italia/piemonte/verbania/lago-maggiore-boa-limnologica.html?w=1764"
            width="800" height="500" frameborder="0" scrolling="no" marginwidth="0" marginheight="0" allow=autoplay allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal"
            @click="toggleModalWebcam()"
        >Close</button>
        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
      </div>
    </div>
  </div>
  <div
    :class = "{'modal-backdrop': true, fade: true, show: webcamModalShow}" :style="{display: webcamModalShow ? 'block' : 'none'}">
  </div>
</div>

    </div>

  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'

  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu,

    },
    data () {
        return {
            webcamModalShow: false,
        }
    },
    methods: {
      toggleModalWebcam () {this.webcamModalShow = !this.webcamModalShow},
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
<style>
.dropdown-item.active:hover
{
  background-color: #b3b3b452;
}
.dropdown-item.active
{
  background-color:transparent;
}
.carousel-control-prev, .carousel-control-next {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-align: center;
    -webkit-box-align: center;
    align-items: center;
    -ms-flex-pack: center;
    -webkit-box-pack: center;
    justify-content: center;
    width: 15%;
    color: #fff;
    text-align: center;
    opacity: 0.5;
    -webkit-transition: opacity 0.15s ease;
    transition: opacity 0.15s ease;
    border-color: rgba(0,0,0,0);
    background-color: rgba(0,0,0,0.2)
}
</style>
