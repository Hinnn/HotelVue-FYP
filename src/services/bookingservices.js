import Api from '@/services/api'

export default {
  fetchBookings (user, token) {
    return Api().get(`/bookings/byEmail/${user}`, {headers: {'token': token}})
  },
  fetchAllBookings (user, token) {
    return Api().get(`/${user}/bookings`, {headers: {'token': token}})
  },
  addBooking (booking) {
    return Api().post('/bookings', booking, {headers: {'Content-type': 'application/json'}})
  },
  fetchBooking (email) {
    return Api().get(`/bookings/${email}`)
  },
  deleteBooking (_id) {
    return Api().delete(`/bookings/delete/${_id}`)
  },
  editBooking (_id, one) {
    return Api().put(`/bookings/${_id}/edit`, one)
  },
  fetchOneBooking (id) {
    return Api().get(`/bookings/${id}`)
  }
}
