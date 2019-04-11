import Api from '@/services/api'

export default {

  fetchRooms (room) {
    return Api().get('/rooms', room,
      {headers: {'Content-type': 'application/json'}})
  },
  upvoteRoom (user, roomID, token) {
    return Api().put(`/${user}/rooms/upvotes/${roomID}`, {headers: {'token': token}})
  },
  addRoom (user, room, token) {
    return Api().post(`/${user}/rooms`, room, {headers: {'token': token}})
  },
  fetchRoom (roomID) {
    return Api().get(`/rooms/byNum/${roomID}`)
  },
  fetchType (roomType) {
    return Api().get(`/rooms/byType/${roomType}`)
  },
  deleteRoom (user, roomID, token) {
    return Api().delete(`/${user}/rooms/${roomID}`, {headers: {'token': token}})
  },
  editRoom (user, roomID, token) {
    return Api().put(`/${user}/rooms/edit/${roomID}`, {headers: {'token': token}})
  }
}
