import Home from '@/components/home/Home'
import Vue from 'vue'
import Router from 'vue-router'
import { Swipe, SwipeItem } from 'mint-ui'
import PlayFilm from '@/components/film/PlayFilm'
import Cinema from '@/components/cinema/Cinema'
Vue.use(Router)
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
  },
  {
    path: '/film/:id/cinema',
    name: 'Cinema',
    component: Cinema
  }
]
