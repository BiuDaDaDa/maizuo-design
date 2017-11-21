import Login from '@/components/login/Login.vue'
import Succeed from '@/components/login/Succeed.vue'
import Setting from '@/components/login/Setting.vue'
import StoreHome from '@/components/store/StoreHome.vue'

export default [
  {
    path: '/login',
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
  }
]
