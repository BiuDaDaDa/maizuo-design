import Login from '@/components/login/Login.vue'
import Succeed from '@/components/login/Succeed.vue'
import Setting from '@/components/login/Setting.vue'
import StoreHome from '@/components/store/StoreHome.vue'
import Ticket from '@/components/login/Ticket'
import Chooseseat from '@/components/chooseseat/ChooseSeat'
import Vue from 'vue'
import Router from 'vue-router'
import {Swipe, SwipeItem} from 'mint-ui'
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.use(Router)
export default [
  {
    path: '/login/:id?',
    name: 'Login',
    component: Login
  },
  {
    path: '/succeed',
    name: 'Succeed',
    component: Succeed
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting
  },
  {
    path: '/store',
    name: 'Store',
    component: StoreHome
  },
  {
    path: '/ticket',
    name: 'Ticket',
    component: Ticket
  },
  {
    path: '/chooseseat',
    name: 'Chooseseat',
    component: Chooseseat
  }
]
