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

const proxyUrl = window.location.protocol + '//' + window.location.hostname + ':8000/istsos/index';
const proxyServices = 'ceresiohourly'

const SidebarPlugin = {

  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore,
          dropdownVisible: false,
          istsos: new IstsosIO(proxyUrl, proxyServices),
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
