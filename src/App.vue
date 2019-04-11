<!--<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">-->
<template>
  <div id="app">
    <v-app>
    <b-navbar toggleable="md">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <!--<img src="./assets/007.jpg"  width = "50" height = "47" class="img-circle" style="padding: 5px">-->
      <!--<template slot=activator>-->
        <v-icon color="primary" dark >home</v-icon>
      <!--</template>-->
      <b-navbar-brand to="/">YourHotel</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <div><v-btn to="/" flat large class="fa fa-home" style="padding: 5px">HOME</v-btn></div>
          <!--<b-nav-item to="/"><i class="fa fa-home" style="padding: 5px"> HOME</i></b-nav-item>-->
          <b-nav-item to="/customerHome"><i class="fa fa-money" style="padding: 5px"> Customer</i></b-nav-item>
          <b-nav-item to="/adminHome"><i class="fa fa-money" style="padding: 5px"> Admin</i></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <div><v-btn to="/SignUp" flat large class="fa fa-info" style="padding: 5px">SIGN UP</v-btn></div>
          <div><v-btn to="/Login" flat large class="fa fa-info" style="padding: 5px">LOGIN</v-btn></div>
          <div><v-btn to="/Logout" flat large class="fa fa-info" style="padding: 5px">LOGOUT</v-btn></div>
          <v-btn fab small icon > <v-icon color="primary" @click="showAccount">account_circle</v-icon></v-btn>
          <!--<div class="text-xs-center">-->
          <!--<v-menu offset-y>-->
            <!--<template>-->
              <!--<v-btn fab small icon> <v-icon color="primary">account_circle</v-icon></v-btn>-->
            <!--</template>-->
            <!--<v-list>-->
              <!--<v-list-tile>-->
                <!--<v-list-tile-title>{{items.title1}}</v-list-tile-title>-->
              <!--</v-list-tile>-->
              <!--<v-list-tile @click="showAccount">-->
                <!--<v-list-tile-title>{{items.title2}</v-list-tile-title>-->
              <!--</v-list-tile>-->
            <!--</v-list>-->
          <!--</v-menu>-->
          <!--</div>-->
            <!--<b-nav-item to="/SignUp"><i class="fa fa-info" style="padding: 5px"> SIGN UP </i></b-nav-item>-->
          <!--<b-nav-item to="/Login"><i class="fa fa-info" style="padding: 5px"> LOGIN </i></b-nav-item>-->
          <!--<b-nav-item to="/Logout"><i class="fa fa-info" style="padding: 5px"> LOGOUT</i></b-nav-item>-->
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
    CoreToolbar: () => import('@/components/Toolbar')
    // CoreView: () => import('@/components/core/View')
  },
  data () {
    return {
    //
    }
  },
  // data: () => ({
  //   items: [
  //     { title2: 'Account' },
  //     { title1: sessionStorage.getItem('name') }
  //   ],
  //   name: ''
  // }),
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
    background: url("/static/images/back01.JPG") repeat center top;
  }
  .VueTables_sortable{
    cursor: pointer;
  }
</style>
