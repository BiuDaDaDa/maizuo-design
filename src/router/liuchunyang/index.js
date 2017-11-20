import BeBeing from '@/components/movie/BeBeing'
import HotShowing from '@/components/movie/HotShowing'
import BeAboutto from '@/components/movie/BeAboutto'

export default [
  {
    path: '/film',
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
  }
]
