import Home from '@/components/home/Home'
import { Swipe, SwipeItem } from 'mint-ui'
import Vue from 'vue'
import Router from 'vue-router'
import PlayFilm from '@/components/playfilm/PlayFilm'

Vue.use(Router)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
export default [
  {
    path: '/film',
    name: 'Home',
    component: Home
  },
  {
    path: '/film/:id',
    name: 'PlayFilm',
    component: PlayFilm
  }
]
