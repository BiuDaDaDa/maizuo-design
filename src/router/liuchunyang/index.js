import BeBeing from '@/components/movie/BeBeing'
import HotShowing from '@/components/movie/HotShowing'
import BeAboutto from '@/components/movie/BeAboutto'
import MyCard from '@/components/movie/MyCard'
import MyStore from '@/components/movie/store/MyStore'
import MyStore2 from '@/components/movie/store/MyStore2'
import MyStoremsage from '@/components/movie/store/MyStoremsage'
import MyOrder from '@/components/movie/store/MyOrder'
import LoginExercise from '@/components/movie/exerciselogin/LoginExercise'

export default [
  {
    path: '/film',
    name: 'BeBeing',
    component: BeBeing,
    children: [
      {
        path: 'now-playing',
        component: HotShowing
      },
      {
        path: 'coming-soon',
        component: BeAboutto
      }
    ]
  },
  {
    path: '/card',
    name: 'MyCard',
    component: MyCard
  },
  {
    path: '/mystore',
    name: 'MyStore',
    component: MyStore
  },
  {
    path: '/mystore2',
    name: 'MyStore2',
    component: MyStore2
  },
  {
    path: '/mymsage/:id',
    name: 'MyStoremsage',
    component: MyStoremsage
  },
  {
    path: '/preorder',
    name: 'MyOrder',
    component: MyOrder
  },
  {
    path: '/loginecs',
    name: 'LoginExercise',
    component: LoginExercise
  }
]
