import Api from '@/services/api'

export default {
  getAmountByType () {
    return Api().get(`/conditions/getAmountByType`)
  },
  multipleSelect () {
    return Api().get(`/conditions/multipleSelect`)
  }
}
