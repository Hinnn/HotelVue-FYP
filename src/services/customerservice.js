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
  EditInfo (user, one, token) {
    return Api().put(`/customers/${user}/edit`, one,
      { headers: {'Content-type': 'application/json', 'token': token} })
  },
  changePass (user, one, token) {
    // console.log('REQUESTING ' + user.email + ' ' +
    //   JSON.stringify(user, null, 5))
    return Api().put(`/customers/changePassword/${user}`, one,
      { headers: {'Content-type': 'application/json', 'token': token} })
  },
  forgetPass (user) {
    return Api().post(`/customers/forgetPassword`, user)
  },
  fetchCustomer (email) {
    return Api().get(`/customers/${email}`)
  },
  deleteCustomer (user, email, token) {
    return Api().delete(`/${user}/customers/${email}`,
      { headers: {'Content-type': 'application/json', 'token': token} })
  },
  fetchCustomers (user, token) {
    return Api().get(`/${user}/customers`,
      { headers: {'Content-type': 'application/json', 'token': token} })
  }
}
