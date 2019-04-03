<template>
  <div class="hero">
    <adminLine />
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="bookings" :options="options">
        <a slot="edit" slot-scope="props" class="fa fa-edit fa-2x" @click="editBooking(props.row.email)"></a>
        <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteBooking(props.row.email)"></a>
      </v-client-table>
    </div>
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
      errors: [],
      columns: ['_id', 'email', 'name', 'contactNum', 'amount', 'payment_status', 'roomType', 'checkin_date', 'leave_date', 'edit', 'remove'],
      options: {
        perPage: 10,
        filterable: ['roomType', 'email', 'checkin_date', 'leave_date'],
        headings: {
          _id: 'ID',
          email: 'Email',
          name: 'Name',
          contactNum: 'Contact Phone',
          leave_date: 'Leave Date',
          amount: 'Amount',
          roomType: 'Room Type',
          payment_status: 'Payment Status',
          checkin_date: 'Check in Date'
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
  },
  methods: {
    loadBookings: function () {
      this.userEmail = sessionStorage.getItem('email')
      this.user_role = sessionStorage.getItem('role')
      if (this.user_role === 'admin') {
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
      } else {
        console.log('You can not do this operation!')
      }
    },
    // Fetches Bookings when the component is created
    editBooking: function (email) {
      this.$router.params = email
      // this.$router.push('edit')
    },
    deleteBooking: function (email) {
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
          BookingSer.deleteBooking(email)
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
