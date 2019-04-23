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
  fetchBooking (_id) {
    return Api().get(`/bookings/${_id}`)
  },
  deleteBooking (_id) {
    return Api().delete(`/bookings/delete/${_id}`)
  },
  editBooking (_id, one) {
    return Api().put(`/bookings/${_id}/edit`, one)
  },
  changePayment (_id, one) {
    return Api().put(`/bookings/${_id}/changePayment`, one)
  },
  fetchOneBooking (id) {
    return Api().get(`/bookings/${id}`)
  },
  Pay (_id, payment, one) {
    return Api().post(`/bookings/${_id}/pay`, payment, one)
  }
}
