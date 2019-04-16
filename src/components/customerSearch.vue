<template>
  <div id="customersearch">
    <customerLine />
      <div>
        <v-container fluid grid-list-md>
          <v-layout column wrap>
            <v-flex xs12 sm6 md4 lg3>
              <v-card>
                <v-card-title><h2>Reserve a room</h2></v-card-title>
                <v-divider></v-divider>
                <v-layout row>
                  <v-flex xs12 sm4 md3>
                    <div id = "checkin_date">
                      <v-menu
                        v-model="menu1" :close-on-content-click="false" :nudge-right="40"
                        lazy transition="scale-transition" offset-y DateCheck>
                        <template slot="activator">
                          <v-text-field v-model="checkin_date" label="CheckIn Date" prepend-icon="event" readonly required>
                          </v-text-field>
                        </template>
                        <v-date-picker v-model="checkin_date" @on-change="startTimeChange" @input="menu1 = false"></v-date-picker>
                      </v-menu>
                    </div>
                  </v-flex>
                  <!--<v-spacer></v-spacer>-->
                  <v-flex  xs12 sm4 md3>
                    <div id = "leave_date">
                      <v-menu
                        v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                        lazy transition="scale-transition" offset-y>
                        <template slot="activator">
                          <v-text-field v-model="leave_date" label="CheckOut Date" prepend-icon="event" readonly required>
                          </v-text-field>
                        </template>
                        <v-date-picker v-model="leave_date" @on-change="endTimeChange" @input="menu2 = false"></v-date-picker>
                      </v-menu>
                    </div>
                  </v-flex>
                  <v-flex xs12 sm4 md3>
                    <div id = "roomType">
                      <v-select v-model="roomType"
                        :items="items" label="Room Type" prepend-icon="hotel"
                      ></v-select>
                    </div>
                  </v-flex>
                  <!--<v-flex  xs12 sm6 md3>-->
                    <!--<v-card-text><h5>{{message}} Day(s)</h5></v-card-text>-->
                  <!--</v-flex>-->
                  <!--<v-spacer></v-spacer>-->
                  <v-flex  xs12 sm4 md3>
                    <div id ="search">
                      <v-btn block color="#BA68C8" dark outline @click="submit" style="width: 50%">
                        <v-icon>search</v-icon>Submit</v-btn>
                    </div>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex>
                  <v-client-table :columns="columns" :data="type" :options="options">
                    <v-btn flat icon color="indigo" slot="reserve" slot-scope="props" @click="dialog = true">
                      Reserve
                    </v-btn>
                  </v-client-table>
                  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
                    <v-card tile>
                      <v-toolbar card dark color="primary">
                        <v-btn icon dark @click="dialog = false">
                          <v-icon>close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Book Your Room</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                          <v-btn dark flat @click="reserveRoom" :disabled="submitStatus === 'PENDING'">Reserve</v-btn>
                        </v-toolbar-items>
                      </v-toolbar>
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
                        <!--<div id = "checkin_date">-->
                          <v-menu
                            v-model="menu1" :close-on-content-click="false" :nudge-right="40"
                            lazy transition="scale-transition" offset-y full-width>
                            <template slot="activator">
                              <v-text-field v-model="checkin_date" label="Check In Date" prepend-icon="event" readonly required>
                              </v-text-field>
                            </template>
                            <!--<v-date-picker v-model="checkin_date" @on-change="startTimeChange" @input="menu1 = false"></v-date-picker>-->
                          </v-menu>
                        <!--</div>-->
                        <!--<div id = "leave_date">-->
                          <v-menu
                            v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                            lazy transition="scale-transition" offset-y full-width>
                            <template slot="activator">
                              <v-text-field v-model="leave_date" label="Check Out Date" prepend-icon="event" readonly required>
                              </v-text-field>
                            </template>
                            <!--<v-date-picker v-model="leave_date" @on-change="endTimeChange" @input="menu2 = false"></v-date-picker>-->
                          </v-menu>
                        <!--</div>-->
                        <!--<div id = "roomType">-->
                        <v-select v-model="roomType"
                                  :items="items" label="Room Type" prepend-icon="hotel"
                        ></v-select>
                        <!--</div>-->
                        <!--<div id = "amount">-->
                        <v-select v-model="amount"
                                  :items="items1" label="Amount" prepend-icon="plus_one"
                        ></v-select>
                      </v-card-text>
                      <v-card-text>
                        <p class="typo__p red--text" v-if="submitStatus === 'ERROR'">Please input all the fields correctly.</p>
                        <p class="typo__p red--text" v-if="isReserved === 'NO'">{{message}}</p>
                        <p class="typo__p green--text" v-if="isReserved === 'YES'">{{message}}</p>
                        <p class="typo__p orange--text" v-if="submitStatus === 'PENDING'"> Please waiting...</p>
                      </v-card-text>
                      <v-divider class="mt-5"></v-divider>
                    </v-card>
                    <!--<v-card ref="form" id="addBookingCard">-->
                      <!--<v-card-title class="display-1 pl-5 pt-5">Reserve a room</v-card-title>-->
                      <!--<booking-form :booking="booking" @booking-is-created-updated="submitBooking"></booking-form>-->
                    <!--</v-card>-->
                  </v-dialog>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
  </div>
</template>
<script>
import RoomTypeService from '@/services/roomTypeservice'
import BookingForm from '@/components/add-order-form'
import BookingService from '@/services/bookingservices'
import Vue from 'vue'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable)

export default {
  name: 'customerSearch',
  data () {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      type: [],
      props: ['type'],
      columns: ['roomType', 'bedType', 'people', 'price', 'reserve'],
      options: {
        filterable: [''],
        headings: {
          roomType: 'Room Type',
          bedType: 'Bed Type',
          people: 'People Amount',
          price: 'Price'
        }
      },
      date: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      items: ['double', 'single', 'twin'],
      startTimeOptions: {}, // 开始日期约束
      endTimeOptions: {}, // 结束日期约束
      checkin_date: '', // 开始日期
      leave_date: '', // 结束日期
      roomType: '',
      days: '',
      amount: '',
      name: '',
      email: '',
      contactNum: '',
      submitStatus: null,
      isReserved: null,
      errorMessages: '',
      message: '',
      items1: ['1', '2', '3'],
      phoneRules: [
        v => (v && v.length <= 10) || 'Phone number must be 10 characters'
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(v) || 'Email must be valid'
      ]
    }
  },
  components: {
    'booking-form': BookingForm,
    customerLine: () => import('@/components/customerLine')
  },
  computed: {
    form () {
      return {
        name: this.name,
        email: this.email,
        amount: this.amount,
        contactNum: this.contactNum,
        checkin_date: this.checkin_date,
        leave_date: this.leave_date,
        roomType: this.roomType
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
    reserveRoom: function () {
      let dateBegin = new Date(this.checkin_date)
      // console.log(dateBegin)
      let dateEnd = new Date(this.leave_date)
      let dateDiff = dateEnd.getTime() - dateBegin.getTime()
      let days = Math.floor(dateDiff / (24 * 3600 * 1000))
      console.log(days)
      this.days = days
      // sessionStorage.setItem('days', this.days)
      // sessionStorage.setItem('checkin_date', this.checkin_date)
      // sessionStorage.setItem('leave_date', this.leave_date)
      // roomType = this.roomType
      // console.log(roomType)
      // sessionStorage.getItem('roomType', this.roomType)
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
        BookingService.addBooking(booking)
          .then(response => {
            console.log(response)
            this.$router.push('/customerOrder')
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    submit () {
      // let dateBegin = new Date(this.checkin_date)
      // // console.log(dateBegin)
      // let dateEnd = new Date(this.leave_date)
      // let dateDiff = dateEnd.getTime() - dateBegin.getTime()
      // let days = Math.floor(dateDiff / (24 * 3600 * 1000))
      // console.log(days)
      // this.days = days
      // sessionStorage.setItem('days', this.days)
      // sessionStorage.setItem('checkin_date', this.checkin_date)
      // sessionStorage.setItem('leave_date', this.leave_date)
      let roomType = this.roomType
      console.log(this.roomType)
      // sessionStorage.getItem('roomType', this.roomType)
      if (this.roomType === 'double') {
        RoomTypeService.fetchType(roomType)
          .then(response => {
            this.type = response.data
            console.log(this.type)
          })
      } else if (this.roomType === 'single') {
        let roomType = this.roomType
        RoomTypeService.fetchType(roomType)
          .then(response => {
            this.type = response.data
          })
      } else if (this.roomType === 'twin') {
        let roomType = this.roomType
        RoomTypeService.fetchType(roomType)
          .then(response => {
            this.type = response.data
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
      }
    }
  }
}

</script>
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
