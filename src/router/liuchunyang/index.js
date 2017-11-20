import BeBeing from '@/components/movie/BeBeing'
import HotShowing from '@/components/movie/HotShowing'
import BeAboutto from '@/components/movie/BeAboutto'
import MyCard from '@/components/movie/MyCard'

export default [
  {
    path: '/films',
    name: 'BeBeing',
    component: BeBeing,
    children: [
      {
        path: 'hotshowing',
        component: HotShowing
      },
      {
        path: 'beaboutto',
        component: BeAboutto
      }
    ]
  },
  {
    path: '/card',
    name: 'MyCard',
    component: MyCard
  }
]
