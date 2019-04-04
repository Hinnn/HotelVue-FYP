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
  },
  changePass (user, one) {
    // console.log('REQUESTING ' + user.email + ' ' +
    //   JSON.stringify(user, null, 5))
    return Api().put(`/admin/changePassword/${user}`, one,
      { headers: {'Content-type': 'application/json'} })
  },
  forgetPass (user) {
    return Api().post(`/admin/forgetPassword`, user)
  },
  fetchAdmin (email) {
    return Api().get(`/admin/${email}`)
  }
}
