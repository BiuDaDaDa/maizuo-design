import Home from '@/components/home/Home'
import Vue from 'vue'
import Router from 'vue-router'
import PlayFilm from '@/components/playfilm/PlayFilm'
import { Swipe, SwipeItem } from 'mint-ui'
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.use(Router)

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/film/:id',
    name: 'PlayFilm',
    component: PlayFilm
  }
]
