import config from '../../../config.js'

import Sidebar from './SideBar.vue'
import SidebarLink from './SidebarLink.vue'

import IstsosIO from '../../manageIstsosToken.js';

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    {
      name: 'Dashboard',
      icon: 'ti-panel',
      path: '/admin/overview'
    }
  ],
  displaySidebar (value) {
    this.showSidebar = value
  }
}

// const proxyUrl = `${window.location.protocol}//${config.istsosProxy.host}${config.istsosProxy.port}/${config.istsosProxy.name}/index`
// const proxyServices = 'ceresiohourly'

const SidebarPlugin = {

  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore,
          dropdownVisible: false,
          // istsos: new IstsosIO(proxyUrl, proxyServices),
          istsos: null,
          ceresioIstsos: new IstsosIO(config.ceresioIstsos.endpoint, config.ceresioIstsos.proxyEndpoint, config.ceresioIstsos.baseUrl),
          verbanoIstsos: new IstsosIO(config.verbanoIstsos.endpoint, config.verbanoIstsos.proxyEndpoint, config.verbanoIstsos.baseUrl),
          larioIstsos: new IstsosIO(config.larioIstsos.endpoint, config.larioIstsos.proxyEndpoint, config.larioIstsos.baseUrl),
          vareseIstsos: new IstsosIO(config.vareseIstsos.endpoint, config.vareseIstsos.proxyEndpoint, config.vareseIstsos.baseUrl),
          whereAmI: '',
          allProcedures: null
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$sidebar', {
      get () {
        return this.$root.sidebarStore
      }
    })
    Vue.component('side-bar', Sidebar)
    Vue.component('sidebar-link', SidebarLink)
  }
}

export default SidebarPlugin
