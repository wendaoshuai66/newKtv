// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import './assets/sass/base.scss'
import './assets/sass/icon.scss'
import './assets/js/rem.js'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import Fastclick from 'fastclick'

Fastclick.attach(document.body)

Vue.use(VueLazyLoad, {
  loading: require('./assets/img/M-ktv_03.png')
})

Vue.http.options.emulateJSON = true

Vue.config.productionTip = false
const info=sessionStorage.info
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App},
})

