
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuetify/dist/vuetify.min.css'
import VueTables from 'vue-tables-2'
import VueMq from 'vue-mq'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import VueSweetalert2 from 'vue-sweetalert2'
import * as VueGoogleMaps from 'vue2-google-maps'
import moment from 'moment/moment'
// import Auth from 'vue-token'
Vue.config.productionTip = false

// Vue.use(Vuetify, {
//   iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
// })
Vue.use(Vuetify)
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
// Vue.use(Auth)
Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD'
  return moment(value).format(formatString)
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
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
