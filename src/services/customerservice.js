import Api from '@/services/api'

export default {

  SignUp (user) {
    return Api().post('/customers/signUp', user,
      { headers: {'Content-type': 'application/json'} })
  },
  Verification (user) {
    return Api().post('customers/verification', user)
  },
  Login (user) {
    return Api().post('/customers/login', user)
  },
  Logout () {
    return Api().post('/customers/logout')
  }
}
