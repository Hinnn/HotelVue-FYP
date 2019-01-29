import Api from '@/services/api'

export default {

  SignUp (customer) {
    return Api().post('/customers/signUp', customer,
      { headers: {'Content-type': 'application/json'} })
  },
  Login (params) {
    return Api().post('/customers/login', params)
  }
}
