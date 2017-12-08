// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './common/js/store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { InfiniteScroll } from 'mint-ui'
import request from './common/js/requestServerSetting'
Vue.config.productionTip = false
request(Vue)
Vue.use(InfiniteScroll)
Vue.use(VueAwesomeSwiper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App, InfiniteScroll}
})
