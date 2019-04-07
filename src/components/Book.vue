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
            <v-text-field v-model="email"
                          :error-messages="checkEmail"
                          label="Email" required
                          @input="$v.email.$touch()" @blur="$v.email.$touch()">
            </v-text-field>
            <v-text-field
            v-model="contactNum" :counter="10" label="Contact Number"
            prepend-icon="phone" :rules="phoneRules"
            ></v-text-field>
            <div id = "checkin_date">
              <v-menu
                v-model="menu1" :close-on-content-click="false" :nudge-right="40"
                lazy transition="scale-transition" offset-y DateCheck>
                <template slot="activator">
                  <v-text-field v-model="checkin_date" label="CheckIn Date" prepend-icon="event" readonly v-on="on" required>
                  </v-text-field>
                </template>
                <v-date-picker v-model="checkin_date" @on-change="startTimeChange" @input="menu1 = false"></v-date-picker>
              </v-menu>
            </div>
            <div id = "leave_date">
              <v-menu
                v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                lazy transition="scale-transition" offset-y>
                <template slot="activator">
                  <v-text-field v-model="leave_date" label="CheckOut Date" prepend-icon="event" readonly v-on="on" required>
                  </v-text-field>
                </template>
                <v-date-picker v-model="leave_date" @on-change="endTimeChange" @input="menu2 = false"></v-date-picker>
              </v-menu>
            </div>
            <div id = "roomType">
              <v-select
                :items="items" label="Room Type" prepend-icon="hotel"
              ></v-select>
            </div>
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
// import { required, email } from 'vuelidate/lib/validators'
Vue.use(Vuelidate)
export default {
  name: 'Book',
  // validations: {
  //   email: {required, email}
  // },
  data: () => ({
    // errorMessages: '',
    name: '',
    email: '',
    contactNum: '',
    checkin_date: '',
    leave_date: '',
    formErrors: false,
    submitStatus: null,
    isReserved: null,
    message: '',
    date: new Date().toISOString().substr(0, 10),
    menu1: false,
    menu2: false,
    items: ['double', 'single', 'family'],
    startTimeOptions: {}, // 开始日期约束
    endTimeOptions: {},
    phoneRules: [
      v => (v && v.length <= 10) || 'Phone number must be 10 characters'
    ]
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
  components: {

    customerLine: () => import('@/components/customerLine')
  },
  methods: {
    startTimeChange: function (e) { // 设置开始时间
      this.checkin_date = e
      this.endTimeOptions = {
        disabledDate (date) {
          let startTime = this.checkin_date ? new Date(this.checkin_date).valueOf() : ''
          return date && (date.valueOf() < startTime)
        }
      }
    },
    endTimeChange: function (e) { // 设置结束时间
      this.leave_date = e
      let endTime = this.leave_date ? new Date(this.leave_date).valueOf() - 1 * 24 * 60 * 60 * 1000 : ''
      this.startTimeOptions = {
        disabledDate (date) {
          return date && date.valueOf() > endTime
        }
      }
    },
    // emailCheck () {
    //   let checkEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
    //   this.errorMessages = checkEmail.test(this.email) ? '' : 'Wrong email format!'
    //   return this.errorMessages
    // },
    checkEmail () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Please input valid email')
      !this.$v.email.required && errors.push('Email is required')
      return errors
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
