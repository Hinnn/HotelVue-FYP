import Api from '@/services/api'

export default {
  fetchBookings (admin) {
    return Api().get(`/${admin}/bookings`)
  },
  addBooking (booking) {
    return Api().post('/bookings', booking,
      {headers: {'Content-type': 'application/json'}})
  },
  fetchBooking (email) {
    return Api().get(`/bookings/${email}`)
  },
  deleteBooking (email) {
    return Api().delete(`/bookings/${email}`)
  }
}
