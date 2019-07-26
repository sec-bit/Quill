// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../theme/index.css'
import ElementUI from 'element-ui'
import JsonCSV from 'vue-json-csv'
import JsonExcel from 'vue-json-excel'
import JsonPretty from 'vue-json-pretty'
import VueClipboard from 'vue-clipboard2'
import VueOnlinePlugin from 'vue-navigator-online'

Vue.use(ElementUI)
Vue.use(VueClipboard)
Vue.use(VueOnlinePlugin)
Vue.component('downloadCsv', JsonCSV)
Vue.component('downloadExcel', JsonExcel)
Vue.component('JsonPretty', JsonPretty)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
