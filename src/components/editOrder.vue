<template>
  <div  class="hero" id="editOrder">
    <v-container grid-list-md text-xs-center>
      <!--<v-container>-->
        <v-layout justify-center row>
          <v-flex xs12 sm10 md8 lg6>
            <v-card ref="form" id="editOrderCard" lazy-validation>
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
        <Room />
      </v-container>
    <!--</v-container>-->
  </div>
</template>

<script>
import BookingSer from '@/services/bookingservices'
import ConditionService from '@/services/conditionservice'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
export default {
  name: 'editOrder',
  data () {
    return {
      booking: {},
      childDataLoaded: false,
      roomID: '',
      checkin_date: '',
      leave_date: '',
      amount: '',
      isDisable1: false,
      isDisable2: false,
      isDisable3: false,
      isDisable4: false,
      isDisable5: false,
      isDisable6: false,
      isDisable7: false,
      isDisable8: false,
      isDisable9: false,
      isDisable10: false,
      // isShow: false,
      items: ['101', '102', '103', '104', '105'],
      id: ''
    }
  },
  components: {
    Room: () => import('@/components/Room')
  },
  methods: {
    clear () {
      this.$v.$reset()
      this.roomID = ''
    },
    isDisable: function () {
      this.checkin_date = sessionStorage.getItem('checkin_date')
      this.roomType = sessionStorage.getItem('roomType')
      this.leave_date = sessionStorage.getItem('leave_date')
    },
    availableRoom: function () {
      // https://forum.vuejs.org/t/how-to-enabled-a-disabled-button-when-there-are-texts-in-the-input/18057/5
      // let checkindate = this.$router.checkin_date
      // let leavedate = this.$router.leave_date
      // console.log(checkindate)
      this.checkin_date = sessionStorage.getItem('checkin_date')
      this.roomType = sessionStorage.getItem('roomType')
      this.leave_date = sessionStorage.getItem('leave_date')
      ConditionService.multipleSelect(this.checkin_date, this.leave_date)
        .then(response => {
          this.booking = response.data
          console.log('booking', this.booking)
          // let roomID = null;
          let roomID = this.booking.doc[0].roomID
          console.log(roomID)
          if (roomID === '101') {
            console.log('1')
            this.isDisable1 = true
            return 1
          } else if (roomID === '102') {
            this.isDisable2 = true
            // return 2
          } else if (roomID === '103') {
            this.isDisable3 = true
            // return 3
          } else if (roomID === '104') {
            this.isDisable4 = true
            // return 4
          } else if (roomID === '105') {
            this.isDisable5 = true
            // return 5
          } else if (roomID === '106') {
            this.isDisable6 = true
            // return 6
          } else if (roomID === '107') {
            this.isDisable7 = true
            // return 7
          } else if (roomID === '108') {
            this.isDisable8 = true
            // return 8
          } else if (roomID === '109') {
            this.isDisable9 = true
            // return 9
          } else if (roomID === '110') {
            this.isDisable10 = true
            // return 10
          } else {
            this.isDisable1 = false
            this.isDisable2 = false
            this.isDisable3 = false
            this.isDisable4 = false
            this.isDisable5 = false
            this.isDisable6 = false
            this.isDisable7 = false
            this.isDisable8 = false
            this.isDisable9 = false
            this.isDisable10 = false
            // return 0
          }
          // this.isShow = true
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
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
          this.$router.push('/customerOrder')
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
