import BeBeing from '@/components/movie/BeBeing'
import HotShowing from '@/components/movie/HotShowing'
import BeAboutto from '@/components/movie/BeAboutto'
import MyCard from '@/components/movie/MyCard'
import MyStore from '../../components/movie/store/MyStore'
import MyStore2 from '../../components/movie/store/MyStore2'

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
  }
]
