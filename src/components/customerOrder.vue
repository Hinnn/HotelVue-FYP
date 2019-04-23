<template>
    <div id="customerOrder">
      <customerLine />
      <v-container>
          <v-layout row justify-center>
            <v-flex xs12 sm6 md4>
              <v-text><h3>Order Detail</h3></v-text>
          </v-flex>
        </v-layout>
          <v-client-table :columns="columns" :data="booking" :options="options">
            <!--<paypal :amount="1" ></paypal>-->
              <!--pay-->
            <!--</paypal>-->
            <v-btn flat icon color="indigo" slot="choose room" slot-scope="props" @click="editBooking(props.row._id)">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn flat icon color="indigo" slot="cancel" slot-scope="props" @click="deleteBooking(props.row._id)">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-client-table>
      </v-container>
    </div>
</template>

<script>
import BookingService from '@/services/bookingservices'
// import PayPal from '@/components/paypal'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueTables from 'vue-tables-2'
Vue.use(Vuelidate)
Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'customerOrder',
  components: {
    customerLine: () => import('@/components/customerLine')
    // 'paypal': PayPal
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
      toPay: false,
      columns: ['_id', 'name', 'contactNum',
        'amount', 'roomType', 'days', 'checkin_date', 'leave_date', 'roomID', 'payment_status', 'choose room', 'cancel'],
      options: {
        perPage: 5,
        headings: {
          id: 'Order ID',
          name: 'Name',
          // email: 'email',
          contactNum: 'Phone',
          amount: 'Amount',
          roomType: 'Room Type',
          days: 'Days',
          checkin_date: 'Check in date',
          leave_date: 'Leave date',
          roomID: 'Room number',
          payment_status: 'Payment status'
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
            console.log(error)
          })
      }
    },
    // pay: function (_id) {
    //   this.$router.params = _id
    //   this.toPay = true
    // },
    editBooking: function (_id) {
      this.$router.params = _id
      // sessionStorage.setItem('roomID', this.$router.roomID)
      // sessionStorage.setItem('checkin_date', this.$router.checkin_date)
      // sessionStorage.setItem('leave_date', this.$router.leave_date)
      // console.log(roomID)
      this.$router.push('/editOrder')
    },
    deleteBooking: function (_id) {
      this.$swal({
        title: 'Are you totally sure:',
        text: 'You can\'t Undo this action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK Delete it',
        cancelButtonText: 'Cancel',
        showCloseButton: true
        // showLoaderOnConfirm: true
      }).then((result) => {
        console.log('SWAL Result : ' + result.value)
        if (result.value === true) {
          // let id = this.booking._id
          // console.log(id)
          BookingService.deleteBooking(_id)
            .then(response => {
              // JSON responses are automatically parsed.
              this.message = response.data
              console.log(this.message)
              this.getBooking()
              // Vue.nextTick(() => this.$refs.vuetable.refresh())
              this.$swal('Deleted', 'You successfully deleted this Booking ' + JSON.stringify(response.data, null, 5), 'success')
            })
            .catch(error => {
              this.$swal('EREOR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          console.log(' SWAL Else Result: ' + result.value)
          this.$swal('Cancelled', 'Booking Still Exist!', 'info')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
