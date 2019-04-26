<template>
  <div  class="hero" id="adminEditOrder">
    <v-container grid-list-md text-xs-center>
      <v-container>
        <v-layout justify-center>
          <v-flex xs12 sm10 md8 lg6>
            <v-card ref="form" id="adminEditOrderCard" lazy-validation>
              <v-card-title class="display-1 pl-5 pt-5">Edit Order</v-card-title>
              <v-card-text>
                <v-select v-model="roomID"
                          :items="items" label="Room Number" prepend-icon="local_hotel" attach chips multiple
                ></v-select>
              </v-card-text>
              <v-card-actions>
                <v-btn flat large @click="editBooking">Submit</v-btn>
                <v-btn flat large @click="clear">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import BookingSer from '@/services/bookingservices'
// import ConditionService from '@/services/conditionservice'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
export default {
  name: 'adminEditOrder',
  data () {
    return {
      booking: {},
      childDataLoaded: false,
      roomID: '',
      items: ['101', '102', '103', '104', '105'],
      id: ''
    }
  },
  methods: {
    clear () {
      this.$v.$reset()
      this.roomID = ''
    },
    editBooking () {
      let id = this.$router.params
      console.log(id)
      let updateOne = {
        // contactNum: this.contactNum,
        roomID: this.roomID
      }
      console.log(updateOne)
      BookingSer.editBooking(id, updateOne)
        .then(response => {
          console.log(response.data.data)
          console.log(id)
          console.log('After editing: ' + JSON.stringify(this.booking, null, 5))
          this.$router.push('/manageBooking')
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  }
}
</script>

<style scoped>

</style>
