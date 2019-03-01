import Api from '@/services/api'

export default {

  SignUp (user) {
    return Api().post('/admin/signUp', user,
      { headers: {'Content-type': 'application/json'} })
  },
  Verification (user) {
    return Api().post('admin/verification', user)
  },
  Login (user) {
    return Api().post('/admin/login', user)
  },
  Logout () {
    return Api().post('/admin/logout')
  }
}
