import CitySelect from '@/components/cityselect/CitySelect'
import CinemaSelect from '@/components/cinemaselect/CinemaSelect'
import MovieTheatre from '@/components/movietheatre/MovieTheatre'
import MovieSelect from '@/components/movietheatre/MovieSelect'
import MobilePhoneShell from '../../components/detail/MobilePhoneShell'
import TicketDetail from '../../components/movietheatre/ticketdetail'
import TongTicket from '../../components/movietheatre/tongticket'
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
  },
  {
    path: '/cinema/:id/film/item',
    name: 'Ticketdetail',
    component: TicketDetail
  },
  {
    path: '/help/ticket',
    name: 'TongTicket',
    component: TongTicket
  },
  {
    path: '/mobilephoneshell',
    name: 'MobilePhoneShell',
    component: MobilePhoneShell
  }
]
