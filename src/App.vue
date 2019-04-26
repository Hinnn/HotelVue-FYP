<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="app">
    <v-app>
    <b-navbar toggleable="md">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <v-icon color="primary" dark >home</v-icon>
      <b-navbar-brand to="/">YourHotel</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <div><v-btn to="/" flat large class="fa fa-home" style="padding: 5px">HOME</v-btn></div>
          <!--<div><v-btn to="/searchangpay" flat class="fa fa-home" style="padding: 5px">Room Status</v-btn></div>-->
          <!--<b-nav-item to="/customerHome"><i class="fa fa-money" style="padding: 5px"> Customer</i></b-nav-item>-->
          <!--<b-nav-item to="/adminHome"><i class="fa fa-money" style="padding: 5px"> Admin</i></b-nav-item>-->
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <div><v-btn to="/SignUp" flat  class="fa fa-info" style="padding: 5px">SIGN UP</v-btn></div>
          <div><v-btn to="/Login" flat  class="fa fa-info" style="padding: 5px">LOGIN</v-btn></div>
          <div><v-btn to="/Logout" flat  class="fa fa-info" style="padding: 5px">LOGOUT</v-btn></div>
          <!--<v-menu>-->
          <v-btn fab small icon > <v-icon @click="showAccount">account_circle</v-icon></v-btn>
              <!--<v-btn fab small icon>-->
                <!--<v-icon @click="facebook">more_vert</v-icon>-->
          <!--<v-menu bottom left>-->
            <!--<v-list v-if="loadMenu() === 2" dense dark subheader>-->
              <!--<v-list-tile v-for="(item, i) in items2" :key="i" @click="goSomewhere(item.title)">-->
                <!--<v-list-tile-title>{{ item.title }}-->
                  <!--<v-icon small dense subheader>call_made</v-icon>-->
                <!--</v-list-tile-title>-->
              <!--</v-list-tile>-->
            <!--</v-list>-->
            <!--<v-list v-else-if="loadMenu() === 3"  dense dark subheader>-->
              <!--<v-list-tile v-for="(item, i) in items3" :key="i" @click="goSomewhere(item.title)">-->
                <!--<v-list-tile-title>{{ item.title }}-->
                  <!--<v-icon small dense subheader>call_made</v-icon>-->
                <!--</v-list-tile-title>-->
              <!--</v-list-tile>-->
            <!--</v-list>-->
            <!--<v-list v-else-if="loadMenu() === 1"  dense dark subheader>-->
              <!--<v-list-tile v-for="(item, i) in items1" :key="i" @click="goSomewhere(item.title)">-->
                <!--<v-list-tile-title>{{ item.title }}-->
                  <!--<v-icon small dense subheader>call_made</v-icon>-->
                <!--</v-list-tile-title>-->
              <!--</v-list-tile>-->
            <!--</v-list>-->
          <!--</v-menu>-->
              <!--</v-btn>-->
          <i class="fa fa-pied-piper-alt fa-1x" style="padding: 5px; color: white;"></i>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    // CoreCta: () => import('@/components/core/Cta'),
    // CoreDrawer: () => import('@/components/core/Drawer'),
    // CoreFooter: () => import('@/components/core/Footer'),
    // CoreToolbar: () => import('@/components/Toolbar')
    // CoreView: () => import('@/components/core/View')
  },
  data () {
    return {
      message: '',
      items1: [
        { title: 'Orders' }
      ],
      items2: [
        { title: 'Seller Home' },
        { title: 'Order List' }
      ],
      items3: [
        { title: 'Admin Home' }
      ],
      // notifications: [
      //   'Account',
      //   'Edit'
      // ],
      name: ''
    }
  },
  methods: {
    showAccount () {
      this.user_role = sessionStorage.getItem('role')
      this.userEmail = sessionStorage.getItem('email')
      this.name = sessionStorage.getItem('name')
      console.log(this.userEmail)
      if (sessionStorage.getItem('email') === null) {
        this.$router.push('/Login')
      } else if (this.user_role === 'customer') {
        this.$router.push({path: '/AccountInfo'})
      } else if (this.user_role === 'admin') {
        this.$router.push({path: '/AdminInfo'})
      }
    },
    facebook () {
      this.$router.push({path: '/facebook-login'})
    }
  }
}
</script>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-top: 20px;
    /*background: url("/static/images/back01.JPG") repeat center top;*/
  }
  .VueTables_sortable{
    cursor: pointer;
  }
</style>
