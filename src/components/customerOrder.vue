<template>
    <div id="customerOrder">
      <customerLine />
      <v-container>
          <v-layout row justify-center>
            <v-flex xs12 sm6 md4>
              <v-text>Order Detail</v-text>
          </v-flex>
        </v-layout>
          <v-client-table :columns="columns" :data="booking" :options="options">
          </v-client-table>
      </v-container>
    </div>
</template>

<script>
import BookingService from '@/services/bookingservices'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueTables from 'vue-tables-2'
Vue.use(Vuelidate)
Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'customerOrder',
  components: {
    customerLine: () => import('@/components/customerLine')
  },
  data () {
    return {
      payment_status: '',
      id: '',
      contactNum: '',
      name: '',
      email: '',
      amount: '',
      roomType: '',
      checkin_date: '',
      leave_date: '',
      booking: [],
      columns: ['_id', 'name', 'email', 'contactNum',
        'amount', 'roomType', 'checkin_date', 'leave_date', 'payment_status'],
      options: {
        perPage: 5,
        headings: {
          id: 'Order ID',
          name: 'name',
          email: 'email',
          contactNum: 'contactNum',
          amount: 'amount',
          roomType: 'roomType',
          checkin_date: 'check in date',
          leave_date: 'leave date',
          payment_status: 'payment status'
        },
        filterable: ['checkin_date', 'leave_date']
      }
    }
  },
  created () {
    this.getBooking()
  },
  methods: {
    getBooking () {
      this.user_role = sessionStorage.getItem('role')
      let user = sessionStorage.getItem('email')
      if (this.user_role === 'customer') {
        console.log(this.user_role)
        console.log(user)
        let token = sessionStorage.getItem('token')
        console.log(token)
        BookingService.fetchBookings(user, token)
          .then(response => {
            this.booking = response.data
            console.log('Getting Booking: ' + JSON.stringify(this.booking, null, 5))
          })
          .catch(error => {
            // this.errors.push(error)
            console.log(error)
          })
      // this.userEmail = sessionStorage.getItem('email')
      // this.user_role = sessionStorage.getItem('role')
      // if (this.user_role === 'customer') {
      //   console.log(this.user_role)
      //   console.log(this.userEmail)
      //   BookingService.fetchBooking(this.userEmail)
      //     .then(response => {
      //       this.booking = response.data
      //       console.log(response.data)
      //       console.log(this.user)
      //       console.log('Getting booking: ' + JSON.stringify(this.user, null, 5))
      //       this.id = this.booking.id
      //       this.payment_status = this.booking.payment_status
      //       this.name = this.booking.name
      //       this.email = this.booking.email
      //       this.contactNum = this.booking.contactNum
      //     })
      }
    }
  }
}
</script>

<style scoped>

</style>
