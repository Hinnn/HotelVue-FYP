import Vue from 'vue'
import 'vuetify/dist/vuetify.min.css'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignUp from '@/components/SignUp'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Verification from '@/components/verification'
import EditInfo from '@/components/EditInfo'
import forgetPass from '@/components/forgetPass'
import room from '@/components/Room'
import customerHome from '@/components/customerHome'
import customerOrder from '@/components/customerOrder'
import AccountInfo from '@/components/AccountInfo'
import customerSearch from '@/components/customerSearch'
import changePassword from '@/components/changePassword'
import adminHome from '@/components/adminHome'
import addRoom from '@/components/addRoom'
import editOrder from '@/components/editOrder'
import AdminInfo from '@/components/AdminInfo'
import manageBooking from '@/components/manageBooking'
import customerList from '@/components/customerList'
import book from '@/components/book'
import RoomList from '@/components/RoomList'
import roomStatus from '@/components/roomStatus'
import facebooklogin from '@/facebook-login/facebook-login'
import paypal from '@/components/paypal'
import searchandpay from '@/components/searchangpay'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/verification',
      name: 'Email verification',
      component: Verification
    },
    {
      path: '/EditInfo',
      name: 'Edit Information',
      component: EditInfo
    },
    {
      path: '/forgetPass',
      name: 'ForgetPassword',
      component: forgetPass
    },
    {
      path: '/room',
      name: 'room',
      component: room
    },
    {
      path: '/customerHome',
      name: '/customerHome',
      component: customerHome
    },
    {
      path: '/customerOrder',
      name: 'customerOrder',
      component: customerOrder
    },
    {
      path: '/AccountInfo',
      name: 'AccountInfo',
      component: AccountInfo
    },
    {
      path: '/customerSearch',
      name: 'customerSearch',
      component: customerSearch
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: changePassword
    },
    {
      path: '/adminHome',
      name: 'adminHome',
      component: adminHome
    },
    {
      path: '/manageBooking',
      name: 'manageBooking',
      component: manageBooking
    },
    {
      path: '/addRoom',
      name: 'addRoom',
      component: addRoom
    },
    {
      path: '/editOrder',
      name: 'editOrder',
      component: editOrder
    },
    {
      path: '/AdminInfo',
      name: 'AdminInfo',
      component: AdminInfo
    },
    {
      path: '/customerList',
      name: 'customerList',
      component: customerList
    },
    {
      path: '/book',
      name: 'book',
      component: book
    },
    {
      path: '/RoomList',
      name: 'RoomList',
      component: RoomList
    },
    {
      path: '/roomStatus',
      name: 'roomStatus',
      component: roomStatus
    },
    {
      path: '/facebooklogin',
      name: 'facebooklogin',
      component: facebooklogin
    },
    {
      path: '/paypal',
      name: 'paypal',
      component: paypal
    },
    {
      path: '/searchandpay',
      name: 'searchandpay',
      component: searchandpay
    }
  ]
})
