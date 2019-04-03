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
  },
  EditInfo (user, one) {
    return Api().put(`/customers/${user}/edit`, one)
  },
  changePass (user, one) {
    // console.log('REQUESTING ' + user.email + ' ' +
    //   JSON.stringify(user, null, 5))
    return Api().put(`/customers/changePassword/${user}`, one,
      { headers: {'Content-type': 'application/json'} })
  },
  forgetPass (user) {
    return Api().post(`/customers/forgetPassword`, user)
  },
  fetchCustomer (email) {
    return Api().get(`/customers/${email}`)
  }
}
