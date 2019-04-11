<template>
  <div id="editOrder">
    <adminLine />
    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6>
        <v-card ref="form" id="editOrderCard" lazy-validation>
          <v-card-title class="display-1 pl-5 pt-5">Edit Order</v-card-title>
          <v-card-text>
            <!--<v-text-field-->
            <!--v-model="contactNum" :counter="10" label="Contact Number"-->
            <!--prepend-icon="phone" :rules="phoneRules"-->
          <!--&gt;</v-text-field>-->
    <v-select v-model="roomID"
      :items="items" label="Room Number" prepend-icon="local_hotel"
    ></v-select>
            <!--<v-text-field-->
              <!--v-model="roomID" :counter="10" label="Room Number"-->
              <!--prepend-icon="local_hotel" :rules="phoneRules"-->
            <!--&gt;</v-text-field>-->
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
      items: ['101', '102', '103'],
      id: ''
      // phoneRules: [
      //   v => (v && v.length <= 10) || 'Phone number must be 10 characters'
      // ]
    }
  },
  components: {

    adminLine: () => import('@/components/adminLine')
  },
  // // Fetches Bookings when the component is created.
  // created () {
  //   this.getBooking()
  // },
  methods: {
    clear () {
      this.$v.$reset()
      // this.contactNum = ''
      this.roomID = ''
    },
    // getBooking: function () {
    //   BookingSer.fetchOneBooking(this.$router.params).then(response => {
    //     this.booking = response.data.data
    //     this.childDataLoaded = true
    //     console.log(this.booking)
    //   })
    //     .catch(error => {
    //       this.errors.push(error)
    //       console.log(error)
    //     })
    // },
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
