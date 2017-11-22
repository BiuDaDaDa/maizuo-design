import Vue from 'vue'
import Router from 'vue-router'
import YaoRoutes from './yaoguoqiang/index'
import ZhangRoutes from './zhangzeyu'
import LiuRoutes from './liuchunyang'
import LiRoutes from './limingyu'
Vue.use(Router)
let routers = YaoRoutes.concat(LiuRoutes).concat(ZhangRoutes).concat(LiRoutes)
export default new Router({
  mode: 'history',
  routes: routers
})
