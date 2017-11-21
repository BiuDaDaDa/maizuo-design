import CitySelect from '@/components/cityselect/CitySelect'
import CinemaSelect from '@/components/cinemaselect/CinemaSelect'
import MovieTheatre from '@/components/movietheatre/MovieTheatre'
import MovieSelect from '@/components/movietheatre/MovieSelect'

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
    path: '/cinema/:id',
    name: 'MovieTheatre',
    component: MovieTheatre
  },
  {
    path: '/cinema/:id/film',
    name: 'MovieSelect',
    component: MovieSelect
  }
]
