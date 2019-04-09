<template>
  <form @submit.prevent="submit">
        <v-card ref="form" id="add-orderCard">
          <!--<v-card-title class="display-1 pl-5 pt-5">Reserve a room</v-card-title>-->
          <v-card-text>
            <v-text-field
              ref="name" v-model="name" :rules="[() => !!name || 'This field is required']"
              label="Name (people who will check in)"
              required prepend-icon="person" class="form__input">
            </v-text-field>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email"
              required
              prepend-icon="email"
              class="form__input"
            ></v-text-field>
            <v-text-field
              class="form-group"
              v-model="contactNum" :counter="10" label="Contact Number"
              prepend-icon="phone" :rules="phoneRules"
            ></v-text-field>
            <div id = "checkin_date">
              <v-menu
                v-model="menu1" :close-on-content-click="false" :nudge-right="40"
                lazy transition="scale-transition" offset-y full-width>
                <template slot="activator">
                  <v-text-field v-model="checkin_date" label="Check In Date" prepend-icon="event" readonly required>
                  </v-text-field>
                </template>
                <v-date-picker v-model="checkin_date" @on-change="startTimeChange" @input="menu1 = false"></v-date-picker>
              </v-menu>
            </div>
            <div id = "leave_date">
              <v-menu
                v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                lazy transition="scale-transition" offset-y full-width>
                <template slot="activator">
                  <v-text-field v-model="leave_date" label="Check Out Date" prepend-icon="event" readonly required>
                  </v-text-field>
                </template>
                <v-date-picker v-model="leave_date" @on-change="endTimeChange" @input="menu2 = false"></v-date-picker>
              </v-menu>
            </div>
            <!--<div id = "roomType">-->
              <v-select v-model="roomType"
                :items="items" label="Room Type" prepend-icon="hotel"
              ></v-select>
            <!--</div>-->
            <!--<div id = "amount">-->
              <v-select v-model="amount"
                :items="items1" label="Amount" prepend-icon="plus_one"
              ></v-select>
            <!--</div>-->
          </v-card-text>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-btn outline color="indigo" flat @click="submit" :disabled="submitStatus === 'PENDING'">Reserve</v-btn>
            <!--<v-btn outline color="indigo" flat @click="clear">Cancel</v-btn>-->
          </v-card-actions>
          <v-card-text>
            <p class="typo__p red--text" v-if="submitStatus === 'ERROR'">Please input all the fields correctly.</p>
            <p class="typo__p red--text" v-if="isReserved === 'NO'">{{message}}</p>
            <p class="typo__p green--text" v-if="isReserved === 'YES'">{{message}}</p>
            <p class="typo__p orange--text" v-if="submitStatus === 'PENDING'"> Please waiting...</p>
          </v-card-text>
        </v-card>
  </form>
      <!--</v-flex>-->
    <!--</v-layout>-->
  <!--</div>-->
</template>

<script>
// import BookingService from '@/services/bookingservices'
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'from-control-danger'
  }
})
Vue.use(Vuelidate)
export default {
  name: 'add-order-form',
  // props: ['booking'],
  data () {
    return {
      // name: this.name,
      // email: this.email,
      roomType: '',
      amount: '',
      // contactNum: this.contactNum,
      // checkin_date: this.checkin_date,
      // leave_date: this.leave_date,
      name: '',
      email: '',
      contactNum: '',
      checkin_date: '',
      leave_date: '',
      formErrors: false,
      submitStatus: null,
      isReserved: null,
      message: '',
      errorMessages: '',
      date: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      items: ['double', 'single', 'family'],
      items1: ['1', '2', '3'],
      startTimeOptions: {}, // 开始日期约束
      endTimeOptions: {},
      // formErrors: false,
      phoneRules: [
        v => (v && v.length <= 10) || 'Phone number must be 10 characters'
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(v) || 'Email must be valid'
      ]
    }
  },
  computed: {
    form () {
      return {
        name: this.name,
        email: this.email,
        roomType: this.roomType,
        amount: this.amount,
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
    // submit () {
    //   this.$v.$touch()
    //   if (this.$v.$invalid) {
    //     this.submitStatus = 'ERROR'
    //   } else {
    //     this.submitStatus = 'PENDING'
    //     setTimeout(() => {
    //       // this.isReserved = 'YES'
    //       var booking = {
    //         name: this.name,
    //         email: this.email,
    //         checkin_date: this.checkin_date,
    //         leave_date: this.leave_date,
    //         amount: this.amount,
    //         roomType: this.roomType,
    //         contactNum: this.contactNum
    //       }
    //       this.booking = booking
    //       console.log('Submitting in BookingForm : ' +
    //         JSON.stringify(this.booking, null, 5))
    //       this.$emit('booking-is-created-updated', this.booking)
    //     }, 500)
    //   }
    // }
    submit () {
      this.formErrors = false
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formErrors = true
      })
      if (this.formErrors === false) {
        var booking = {
          name: this.name,
          email: this.email,
          checkin_date: this.checkin_date,
          leave_date: this.leave_date,
          amount: this.amount,
          roomType: this.roomType,
          contactNum: this.contactNum
        }
        this.booking = booking
        console.log('Submitting in BookingForm : ' +
                JSON.stringify(this.booking, null, 5))
        this.$emit('booking-is-created-updated', this.booking)
      }
    }
  }
}
</script>
<style scoped>

</style>
