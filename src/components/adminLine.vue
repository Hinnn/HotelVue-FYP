<template>
  <div id="adminline">
    <v-divider></v-divider>
    <v-container fluid>
      <v-layout row>
        <v-flex xs12 sm6>
          <v-btn class="ml-0 hidden-sm-and-down" flat @click="addRoom">
            add rooms
          </v-btn>
          <v-btn class="ml-0 hidden-sm-and-down" flat @click="reserve">
            Reserve
          </v-btn>
          <v-btn class="ml-0 hidden-sm-and-down" flat @click="manage">
            Orders
          </v-btn>
          <v-btn class="ml-0 hidden-sm-and-down" flat @click="editOrder">
            Edit Order
          </v-btn>
          <v-btn class="ml-0 hidden-sm-and-down" flat @click="changePass">
            Change password
          </v-btn>
          <v-btn class="ml-0 hidden-sm-and-down" flat @click="accountInfo">
            Account
          </v-btn>
          <v-btn class="ml-0 hidden-sm-and-down" flat @click="customerList">
            Customer List
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'adminLine',
  methods: {
    addRoom () {
      this.$router.push('/addRoom')
    },
    reserve () {
      this.$router.push('/Book')
    },
    manage () {
      this.$router.push('/manageBooking')
    },
    editOrder () {
      this.$router.push('/editOrder')
    },
    changePass () {
      this.$router.push('/changePassword')
    },
    accountInfo () {
      this.$router.push('/AdminInfo')
    },
    customerList () {
      this.$router.push('/customerList')
    }
  }
}
</script>

<style scoped>

</style>
