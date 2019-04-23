<template>
  <div id="customerline">
    <v-card color="grey lighten-4" flat tile>
      <b-navbar toggleable="md">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand>Customer</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <div><v-btn to="/AccountInfo" flat large class="fa fa-home" style="padding: 5px">My Account</v-btn></div>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <div><v-btn to="/customerSearch" flat large class="fa fa-info" style="padding: 5px">Find rooms</v-btn></div>
            <!--<div><v-btn to="/RoomList" flat large class="fa fa-info" style="padding: 5px">Room List</v-btn></div>-->
            <div><v-btn to="/customerOrder" flat large class="fa fa-info" style="padding: 5px">My Orders</v-btn></div>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <!--<v-toolbar dense>-->
        <!--<v-toolbar-title>Customer</v-toolbar-title>-->
        <!--<v-spacer></v-spacer>-->
    <!--&lt;!&ndash;<v-divider></v-divider>&ndash;&gt;-->
    <!--&lt;!&ndash;<v-container fluid  grid-list-md pa-2 style="width: 90%;height:25%">&ndash;&gt;-->
      <!--&lt;!&ndash;<v-card>&ndash;&gt;-->
        <!--<v-layout row>-->
          <!--&lt;!&ndash;<v-flex xs12 sm4 md4>&ndash;&gt;-->
        <!--&lt;!&ndash;<v-flex xs12 sm6>&ndash;&gt;-->
          <!--<v-btn class="ml-0 hidden-sm-and-down" flat @click="editInfo">-->
            <!--Edit-->
          <!--</v-btn>-->
          <!--<v-btn class="ml-0 hidden-sm-and-down" flat @click="getRoom">-->
            <!--Search-->
          <!--</v-btn>-->
          <!--<v-btn class="ml-0 hidden-sm-and-down" flat @click="getAccount">-->
            <!--Account-->
          <!--</v-btn>-->
          <!--<v-btn class="ml-0 hidden-sm-and-down" flat @click="getOrder">-->
            <!--Order-->
          <!--</v-btn>-->
          <!--<v-btn class="ml-0 hidden-sm-and-down" flat @click="changePass">-->
            <!--Change password-->
          <!--</v-btn>-->
        <!--&lt;!&ndash;</v-flex>&ndash;&gt;-->
      <!--</v-layout>-->
      <!--</v-toolbar>-->
      </v-card>
    <!--</v-container>-->
    <!--<v-divider></v-divider>-->
  </div>
</template>

<script>
export default {
  name: 'customerLine'
  // methods: {
  //   editInfo () {
  //     this.$router.push('/EditInfo')
  //   },
  //   getRoom () {
  //     this.$router.push('/customerSearch')
  //   },
  //   getAccount () {
  //     this.$router.push('/AccountInfo')
  //   },
  //   getOrder () {
  //     this.$router.push('/customerOrder')
  //   },
  //   changePass () {
  //     this.$router.push('/changePassword')
  //   }
  // }
}
</script>

<style scoped>

</style>
