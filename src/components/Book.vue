<template>
  <div id="addBooking">
    <adminLine/>
    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6>
        <v-card ref="form" id="addBookingCard">
          <v-card-title class="display-1 pl-5 pt-5">Reserve a room</v-card-title>
          <booking-form :booking="booking" @booking-is-created-updated="submitBooking"></booking-form>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import BookingService from '@/services/bookingservices'
import BookingForm from '@/components/add-order-form'
// import BookingForm from '@/components/customerSearch'
export default {
  data () {
    return {
      booking: {}
    }
  },
  components: {
    'booking-form': BookingForm,
    adminLine: () => import('@/components/adminLine')
  },
  methods: {
    submitBooking: function (booking) {
      BookingService.addBooking(booking)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style scoped>
#addBooking {
  width: 95%;
  margin: 0 auto;
}
.vue-title {
  margin-top: 30px;
  text-align: center;
  font-size: 45pt;
  margin-bottom: 10px;
}
</style>
