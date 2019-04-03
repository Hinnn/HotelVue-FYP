<template>
  <div id="addBooking">
    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6>
        <v-card ref="form" id="addBookingCard">
          <v-card-title class="display-1 pl-5 pt-5">Reserve a room</v-card-title>
          <v-card-text>
            <v-text-field
              ref="name" v-model="name" :rules="[() => !!name || 'This field is required']"
              label="Name"
              placeholder="people who will check in"
              required>
            </v-text-field>
            <v-text-field ref="email"
                          v-model="email"
                          :rules="[() => !!email || 'This field is required', emailCheck]"
                          label="Email"
                          placeholder="contact email"
                          required>

            </v-text-field>
            <v-text-field ref="contactNum"
                          :rules="[() => !!contactNum || 'This field is required']"
                          label="Contact phone number"
                          placeholder="10 digital contact phone number"
                          required>

            </v-text-field>
            <v-menu
              ref="menu" v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template slot="activator">
                <v-text-field
                  v-model="date"
                  label="Check in date"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="date"
                :max="new Date().toISOString().substr(0, 10)"
                @change="save"
              ></v-date-picker>
            </v-menu>
            <v-menu
              ref="menu" v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template slot="activator">
                <v-text-field
                  v-model="date"
                  label="leave date"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="date"
                :max="new Date().toISOString().substr(0, 10)"
                @change="save"
              ></v-date-picker>
            </v-menu>
          </v-card-text>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-btn outline color="indigo" flat @click="submit">Reserve</v-btn>
            <v-btn outline color="indigo" flat @click="clear">Cancel</v-btn>
          </v-card-actions>
          <v-card-text>
            <p class="typo__p red--text" v-if="submitStatus === 'ERROR'">Please input all the fields correctly.</p>
            <p class="typo__p red--text" v-if="isReserved === 'NO'">{{message}}</p>
            <p class="typo__p green--text" v-if="isReserved === 'YES'">{{message}}</p>
            <p class="typo__p orange--text" v-if="submitStatus === 'PENDING' && isReserved === 'YES'"> Please waiting...</p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import BookingService from '@/services/bookingservices'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

export default {
  name: 'Book',

  data: () => ({
    errorMessages: '',
    name: null,
    email: null,
    contactNum: null,
    checkin_date: null,
    leave_date: null,
    formErrors: false,
    submitStatus: null,
    isReserved: null,
    message: ''
  }),
  computed: {
    form () {
      return {
        name: this.name,
        email: this.email,
        contactNum: this.contactNum,
        checkin_date: this.checkin_date,
        leave_date: this.leave_date
      }
    }
  },
  watch: {
    name () {
      this.errorMessages = ''
    }
  },
  methods: {
    emailCheck () {
      let checkEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      this.errorMessages = checkEmail.test(this.email) ? '' : 'Wrong email format!'
      return this.errorMessages
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.contactNum = ''
      this.checkin_date = ''
      this.leave_date = ''
    },
    submit () {
      this.formErrors = false
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formErrors = true
      })
      if (this.formErrors === false) {
        let booking = {'email': this.email, 'checkin_date': this.checkin_date, 'contactNum': this.contactNum, 'name': this.name, 'leave_date': this.leave_date}
        BookingService.addBooking(booking).then(response => {
          if (response.data.data === null) {
            this.message = ''
            this.message = response.data.message
            this.isReserved = 'NO'
          } else {
            this.isReserved = 'YES'
            this.message = ''
            this.message = response.data.message
            this.submitStatus = 'PENDING'
            this.$router.push('/')
          }
          console.log(response.data)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
