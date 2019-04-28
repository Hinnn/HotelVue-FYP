import Api from '@/services/api'

export default {
  getAmountByType (roomType) {
    return Api().get(`/conditions/getAmountByType/${roomType}`)
  },
  multipleSelect (checkindate, leavedate) {
    return Api().get(`/conditions/multipleSelect/${checkindate}/${leavedate}`)
  },
  getReserveAmount (checkindate, leavedate) {
    return Api().get(`/conditions/getReserveAmount/${checkindate}/${leavedate}`)
  },
  getAvailableRooms (roomType) {
    return Api().get(`/conditions/getAvailableRooms/${roomType}`)
  }
}
