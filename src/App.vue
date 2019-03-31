<template>
  <!--<div id="app">-->
    <v-app>
    <b-navbar toggleable="md">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <!--<img src="./assets/007.jpg"  width = "50" height = "47" class="img-circle" style="padding: 5px">-->
      <!--<template slot=activator>-->
        <v-icon color="primary" dark v-on="on">home</v-icon>
      <!--</template>-->
      <b-navbar-brand to="/">YourHotel</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/#"><i class="fa fa-home" style="padding: 5px"> HOME</i></b-nav-item>
          <b-nav-item to="/room"><i class="fa fa-money" style="padding: 5px"> ROOM</i></b-nav-item>
          <b-nav-item to="/bookings"><i class="fa fa-list" style="padding: 5px"> MANAGE</i></b-nav-item>
          <b-nav-item to="/book"><i class="fa fa-money" style="padding: 5px"> BOOK</i></b-nav-item>
          <b-nav-item to="/EditInfo"><i class="fa fa-money" style="padding: 5px"> EDIT INFO</i></b-nav-item>
          <b-nav-item to="/GoogleMap"><i class="fa fa-money" style="padding: 5px"> Map</i></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/SignUp"><i class="fa fa-info" style="padding: 5px"> SIGN UP </i></b-nav-item>
          <b-nav-item to="/Login"><i class="fa fa-info" style="padding: 5px"> LOGIN </i></b-nav-item>
          <b-nav-item to="/Logout"><i class="fa fa-info" style="padding: 5px"> LOGOUT</i></b-nav-item>
          <i class="fa fa-pied-piper-alt fa-1x" style="padding: 5px; color: white;"></i>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
    </v-app>
  <!--</div>-->
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
    background: url("/static/images/007.JPG") repeat center top;
  }
  .VueTables_sortable{
    cursor: pointer;
  }
</style>
