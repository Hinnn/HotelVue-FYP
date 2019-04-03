import Api from '@/services/api'

export default {

  fetchRooms (room) {
    return Api().get('/rooms', room,
      {headers: {'Content-type': 'application/json'}})
  },
  upvoteRoom (roomNum) {
    return Api().put(`/rooms/upvotes/${roomNum}`)
  },
  deleteRoom (admin, roomNum) {
    return Api().delete(`/${admin}/rooms/${roomNum}`)
  },
  addRoom (admin) {
    return Api().post(`/${admin}/rooms`)
  }
}
