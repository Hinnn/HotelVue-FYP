import Api from '@/services/api'

export default {
  getAmountByType (roomType) {
    return Api().get(`/conditions/getAmountByType/${roomType}`)
  },
  multipleSelect () {
    return Api().get(`/conditions/multipleSelect`)
  },
  getReserveAmount (checkindate, leavedate) {
    return Api().get(`/conditions/getReserveAmount/${checkindate}/${leavedate}`)
  }
}
