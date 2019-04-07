import Api from '@/services/api'

export default {

  fetchRooms (room) {
    return Api().get('/rooms', room,
      {headers: {'Content-type': 'application/json'}})
  },
  upvoteRoom (roomNum) {
    return Api().put(`/rooms/upvotes/${roomNum}`)
  },
  addRoom (user) {
    return Api().post(`/${user}/rooms`)
  },
  fetchRoom (roomNum) {
    return Api().get(`/rooms/${roomNum}`)
  },
  deleteRoom (user, roomNum) {
    return Api().delete(`/${user}/rooms/${roomNum}`)
  }
}
