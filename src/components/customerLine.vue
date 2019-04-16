<template>
  <div id="customerline">
    <v-divider></v-divider>
    <v-container fluid  grid-list-md pa-2 style="width: 90%;height:25%">
      <!--<v-card>-->
        <v-layout row>
          <v-flex xs12 sm4 md4>
        <!--<v-flex xs12 sm6>-->
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
        </v-flex>
      </v-layout>
      <!--</v-card>-->
    </v-container>
    <v-divider></v-divider>
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
    }
  }
}
</script>

<style scoped>

</style>
