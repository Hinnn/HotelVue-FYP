<template>
  <div id="customerline">
    <v-divider></v-divider>
    <v-container fluid>
      <v-layout row>
        <v-flex xs12 sm6>
          <v-btn class="ml-0 hidden-sm-and-down" flat @click="editInfo">
            Edit
          </v-btn>
          <v-btn class="ml-0 hidden-sm-and-down" flat @click="getRoom">
            Search
          </v-btn>
          <v-btn class="ml-0 hidden-sm-and-down" flat @click="getAccount">
            Account
          </v-btn>
          <v-btn class="ml-0 hidden-sm-and-down" flat @click="getOrder">
            Order
          </v-btn>
          <v-btn class="ml-0 hidden-sm-and-down" flat @click="changePass">
            Change password
          </v-btn>
          <v-btn class="ml-0 hidden-sm-and-down" flat @click="roomwithimage">
            Room
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'customerLine',
  methods: {
    editInfo () {
      this.$router.push('/EditInfo')
    },
    getRoom () {
      this.$router.push('/customerSearch')
    },
    getAccount () {
      this.$router.push('/AccountInfo')
    },
    getOrder () {
      this.$router.push('/customerOrder')
    },
    changePass () {
      this.$router.push('/changePassword')
    },
    roomwithimage () {
      this.$router.push('/roomImage')
    }
  }
}
</script>

<style scoped>

</style>
