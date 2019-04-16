<template>
  <div id="editOrder">
    <adminLine />
    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6>
        <v-card ref="form" id="editOrderCard" lazy-validation>
          <v-card-title class="display-1 pl-5 pt-5">Edit Order</v-card-title>
          <v-card-text>
    <v-select v-model="roomID"
      :items="items" label="Room Number" prepend-icon="local_hotel" attach chips multiple="amount"
    ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn flat large @click="editBooking">Submit</v-btn>
            <v-btn flat large @click="clear">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import BookingSer from '@/services/bookingservices'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
export default {
  name: 'editOrder',
  data () {
    return {
      booking: {},
      childDataLoaded: false,
      // contactNum: '',
      roomID: '',
      checkin_date: '',
      leave_date: '',
      amount: '',
      items: ['101', '102', '103', '104', '105'],
      id: ''
    }
  },
  components: {
    adminLine: () => import('@/components/adminLine')
  },
  methods: {
    clear () {
      this.$v.$reset()
      this.roomID = ''
    },
    getRoomID () {
      let amount = this.$router.amount
      console.log(amount)
      // let checkin_date = this.$router.checkin_date
      // console.log(checkin_date)
      // let leave_date = this.$router.leave_date
      // console.log(leave_date)
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
