import Vue from 'vue'
import 'vuetify/dist/vuetify.min.css'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignUp from '@/components/SignUp'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Verification from '@/components/verification'
import EditInfo from '@/components/EditInfo'

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
    }
  ]
})
