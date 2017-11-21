import BeBeing from '@/components/movie/BeBeing'
import HotShowing from '@/components/movie/HotShowing'
import BeAboutto from '@/components/movie/BeAboutto'
import MyCard from '@/components/movie/MyCard'
import MyStore from '../../components/movie/store/MyStore'

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
  }
]
