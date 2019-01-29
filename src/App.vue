<template>
  <div id="app">
    <b-navbar toggleable="md" variant="dark" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <img src="./assets/007.jpg" width = "50" height = "47" class="img-circle" style="padding: 5px">
      <b-navbar-brand to="/">Yve Hotel</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/#"><i class="fa fa-home" style="padding: 5px"> Home</i></b-nav-item>
          <b-nav-item to="/room"><i class="fa fa-money" style="padding: 5px"> Room</i></b-nav-item>
          <b-nav-item to="/bookings"><i class="fa fa-list" style="padding: 5px"> Manage Bookings</i></b-nav-item>
          <b-nav-item to="/book"><i class="fa fa-money" style="padding: 5px"> Book</i></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/SignUp"><i class="fa fa-info" style="padding: 5px"> SignUp</i></b-nav-item>
          <b-nav-item to="/Login"><i class="fa fa-info" style="padding: 5px"> Login</i></b-nav-item>
          <b-nav-item to="/Logout"><i class="fa fa-info" style="padding: 5px"> Logout</i></b-nav-item>
          <b-nav-item to="/about"><i class="fa fa-info" style="padding: 5px"> About Us</i></b-nav-item>
          <b-nav-item to="/contact"><i class="fa fa-comment" style="padding: 5px"> Contact Us</i></b-nav-item>
          <i class="fa fa-pied-piper-alt fa-1x" style="padding: 5px; color: white;"></i>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
    background: url("./assets/002.jpg") repeat center top;
  }
  .VueTables_sortable{
    cursor: pointer;
  }
</style>
