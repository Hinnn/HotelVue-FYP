// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueTables from 'vue-tables-2'
import VueMq from 'vue-mq'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import VueSweetalert2 from 'vue-sweetalert2'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(BootstrapVue)
Vue.use(VueSweetalert2)
Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})
Vue.use(VueMq, {
  breakpoints: {
    mobile: 450,
    tablet: 900,
    laptop: 1250,
    desktop: Infinity
  }
})
Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})

Vue.use(Vuelidate)
Vue.use(VueSweetalert2)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDITmc7Hn86sX0IWKSlycvmr_M0YG-QwhA',
    // key: 'AIzaSyCnEJk8higuHy3o-wUutB2-qpqwVlJjU38',
    libraries: 'places' // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    // If you want to set the version, you can do so:
    // v: '3.26',
  }

  // If you intend to programmatically custom event listener code
  // (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  // instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  // you might need to turn this on.
  // autobindAllEvents: false,

  // If you want to manually install components, e.g.
  // import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  // Vue.component('GmapMarker', GmapMarker)
  // then disable the following:
  // installComponents: true,
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
