<template>
  <div class="hero">
    <adminLine />
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>Orders</h3>
    <v-text id="app1">
      <v-client-table :columns="columns" :data="bookings" :options="options">
        <!--<v-text>Check in Date: {{props.row.checkin_date|moment}} </v-text>-->
        <v-btn flat icon color="indigo" slot="edit" slot-scope="props" @click="editBooking(props.row._id)">
        <v-icon>edit</v-icon>
      </v-btn>
        <v-btn flat icon color="indigo" slot="remove" slot-scope="props" @click="deleteBooking(props.row._id)">
          <v-icon>delete</v-icon>
        </v-btn>
      </v-client-table>
    </v-text>
    </div>
</template>

<script>
import BookingSer from '@/services/bookingservices'
import Vue from 'vue'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'manageBooking',
  data () {
    return {
      bookings: [],
      props: ['booking'],
      // props: {
      //   _id: String,
      //   email: String,
      //   name: String,
      //   contactNum: Number,
      //   amount: Number,
      //   // payment_status: Boolean,
      //   roomType: String,
      //   roomNum: String,
      //   checkin_date: Date,
      //   leave_date: Date
      // },
      errors: [],
      childDataLoaded: false,
      columns: ['_id', 'email', 'name', 'contactNum', 'amount', 'roomType', 'roomNum', 'checkin_date', 'leave_date', 'payment_status', 'edit', 'remove'],
      options: {
        perPage: 10,
        filterable: ['roomType', 'email', 'checkin_date', 'leave_date', 'name', 'payment_status'],
        headings: {
          _id: 'Order ID',
          email: 'Account',
          name: 'Name',
          contactNum: 'Contact Phone',
          amount: 'Amount',
          roomType: 'Room Type',
          roomNum: 'Room Number',
          checkin_date: 'Check in Date',
          leave_date: 'Leave Date',
          payment_status: 'Payment Status'
        }
      }
    }
  },
  components: {

    adminLine: () => import('@/components/adminLine')
  },
  // Fetches Bookings when the component is created.
  created () {
    this.loadBookings()
    // this.getBooking()
  },
  methods: {
    loadBookings: function () {
      // this.email = sessionStorage.getItem('email')
      // this.id = sessionStorage.getItem('id')
      // this.user_role = sessionStorage.getItem('role')
      // if (this.user_role === 'admin') {
      // console.log(this.id)
      BookingSer.fetchBookings()
        .then(response => {
          // JSON responses are automatically parsed.
          this.bookings = response.data
          console.log(this.bookings)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
      // } else {
      //   console.log('You can not do this operation!')
      // }
    },
    // Fetches Bookings when the component is created
    editBooking: function (_id) {
      this.$router.params = _id
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
          BookingSer.deleteBooking(_id)
            .then(response => {
              // JSON responses are automatically parsed.
              this.message = response.data
              console.log(this.message)
              this.loadBookings()
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
  #app1 {
    width: 80%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
