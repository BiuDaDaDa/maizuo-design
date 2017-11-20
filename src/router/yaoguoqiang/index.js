import CitySelect from '@/components/cityselect/CitySelect'
import CinemaSelect from '@/components/cinemaselect/CinemaSelect'
import MovieTheatre from '@/components/movietheatre/MovieTheatre'
export default [
  {
    path: '/cityselect',
    name: 'CitySelect',
    component: CitySelect
  },
  {
    path: '/cinema',
    name: 'CinemaSelect',
    component: CinemaSelect
  },
  {
    path: '/:id',
    name: 'MovieTheatre',
    component: MovieTheatre
  }
]
