import Home from '@/components/home/Home'
import { Swipe, SwipeItem } from 'mint-ui'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]
