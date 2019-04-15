import Api from '@/services/api'

export default {
  fetchType (roomType) {
    return Api().get(`/types/findByRoomType/${roomType}`)
  }
}
