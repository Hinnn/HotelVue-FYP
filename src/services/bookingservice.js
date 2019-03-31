import Api from '@/services/api'

export default {

  addBooking (booking) {
    return Api().post('/bookings', booking,
      {headers: {'Content-type': 'application/json'}})
  }
}
