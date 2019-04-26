<template>
  <div id="adminline">
    <v-card color="grey lighten-4" flat tile>
      <b-navbar toggleable="md">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand>Administrator</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <div><v-btn to="/AdminInfo" flat large class="fa fa-home" style="padding: 5px">My Account</v-btn></div>
            <div><v-btn to="/customerList" flat large class="fa fa-info" style="padding: 5px">Customer List</v-btn></div>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <div><v-btn to="/RoomList" flat large class="fa fa-info" style="padding: 5px">Room List</v-btn></div>
            <div><v-btn to="/manageBooking" flat large class="fa fa-info" style="padding: 5px">Orders</v-btn></div>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <!--<v-toolbar dense>-->
        <!--<v-toolbar-title>Administrator</v-toolbar-title>-->
        <!--<v-spacer></v-spacer>-->
    <!--&lt;!&ndash;<v-divider></v-divider>&ndash;&gt;-->
    <!--&lt;!&ndash;<v-container fluid>&ndash;&gt;-->
      <!--<v-layout row>-->
        <!--&lt;!&ndash;<v-flex xs12 sm6>&ndash;&gt;-->
          <!--<v-btn class="ml-0 hidden-sm-and-down" flat @click="manage">-->
            <!--Orders-->
          <!--</v-btn>-->
          <!--<v-btn class="ml-0 hidden-sm-and-down" flat @click="changePass">-->
            <!--Change password-->
          <!--</v-btn>-->
          <!--<v-btn class="ml-0 hidden-sm-and-down" flat @click="accountInfo">-->
            <!--Account-->
          <!--</v-btn>-->
          <!--<v-btn class="ml-0 hidden-sm-and-down" flat @click="customerList">-->
            <!--Customer List-->
          <!--</v-btn>-->
          <!--<v-btn class="ml-0 hidden-sm-and-down" flat @click="roomList">-->
            <!--Room List-->
          <!--</v-btn>-->
        <!--&lt;!&ndash;</v-flex>&ndash;&gt;-->
      <!--</v-layout>-->
      <!--</v-toolbar>-->
    </v-card>
    <!--</v-container>-->
  </div>
</template>

<script>
export default {
  name: 'adminLine'
  // methods: {
  //   // reserve () {
  //   //   this.$router.push('/Book')
  //   // },
  //   manage () {
  //     this.$router.push('/manageBooking')
  //   },
  //   // editOrder () {
  //   //   this.$router.push('/editOrder')
  //   // },
  //   changePass () {
  //     this.$router.push('/changePassword')
  //   },
  //   accountInfo () {
  //     this.$router.push('/AdminInfo')
  //   },
  //   customerList () {
  //     this.$router.push('/customerList')
  //   },
  //   roomList () {
  //     this.$router.push('/RoomList')
  //   }
  // }
}
</script>

<style scoped>

</style>
