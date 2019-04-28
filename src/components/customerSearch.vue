<template>
  <div class="hero" id="customersearch">
    <customerLine />
      <div>
        <v-container fluid grid-list-md text-xs-center>
          <v-layout justify-center column wrap>
            <v-flex xs12 sm6 md4 lg3>
              <v-card>
                <v-card-title><h2>Reserve a room</h2></v-card-title>
                <v-layout align-center mb-2>
                  <v-flex xs12 d-flex>
                    <v-img src="/static/images/singleroom.jpg" class="mr-3">
                      <div><h5>Single</h5></div>
                    </v-img>
                  </v-flex>
                  <v-flex xs12 d-flex>
                    <v-img src="/static/images/003.jpg" class="mr-3">
                    <div><h5>Double</h5></div>
                    </v-img>
                  </v-flex>
                  <v-flex xs12 d-flex>
                    <v-img src="/static/images/twin.jpg" class="mr-3">
                      <div><h5>Twin</h5></div>
                    </v-img>
                  </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <!--<v-container fluid grid-list-md text-xs-center>-->
                <v-layout justify-center row>
                  <v-flex xs12 sm4 md3>
                    <div id = "checkin_date">
                      <v-menu
                        v-model="menu1" :close-on-content-click="false" :nudge-right="40"
                        lazy transition="scale-transition" offset-y DateCheck>
                        <template slot="activator">
                          <v-text-field v-model="checkin_date" label="CheckIn Date" prepend-icon="event" readonly required>
                          </v-text-field>
                        </template>
                        <v-date-picker v-model="checkin_date" @on-change="startTimeChange" @input="menu1 = false" :picker-options="startTimeOptions"></v-date-picker>
                      </v-menu>
                    </div>
                  </v-flex>
                  <v-flex xs12 sm4 md3>
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
                    <div class="hero" id = "roomType">
                      <v-select v-model="roomType" style="width: 80%" justify-center
                        :items="items" label="Room Type" prepend-icon="hotel"
                      ></v-select>
                    </div>
                  </v-flex>
                  <v-flex  xs12 sm4 md3 justify-center>
                    <div id ="search">
                      <v-btn block color="#BA68C8" dark outline @click="submit" style="width: 80%">
                        <v-icon>search</v-icon>Submit</v-btn>
                    </div>
                  </v-flex>
                </v-layout>
                <!--</v-container>-->
                <v-layout>
                  <v-flex>
                  <v-client-table :columns="columns" :data="type, availableAmount" :options="options">
                    <v-btn flat icon color="indigo" slot="Available" slot-scope="props" >
                      {{availableAmount}} Rooms Left
                    </v-btn>
                    <v-btn outline color="indigo" slot="Reserve" slot-scope="props" @click="dialog = true" :disabled="submitStatus === 'PENDING'|| availableAmount <= 0">
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
                          <v-btn v-if="!toPay" dark flat @click="reserveRoom" :disabled="submitStatus === 'PENDING'|| availableAmount <= 0">Reserve</v-btn>
                          <v-spacer></v-spacer>
                          <template v-if="toPay">
                            <paypal :amount="total"></paypal>
                          </template>
                        </v-toolbar-items>
                      </v-toolbar>
                      <v-card-text>
                        <v-text-field
                          ref="name" v-model="name" :rules="[() => !!name || 'This field is required']" label="Name (people who will check in)"
                          required prepend-icon="person" class="form__input">
                        </v-text-field>
                        <v-text-field v-model="email" :rules="emailRules" label="Email" required prepend-icon="email" class="form__input"
                        >{{email}}</v-text-field>
                        <v-text-field
                          class="form-group" v-model="contactNum" :counter="10" label="Contact Number" prepend-icon="phone" :rules="phoneRules"
                        ></v-text-field>
                        <v-text-field
                          class="form-group"
                          v-model="checkin_date" label="check in date"
                          prepend-icon="event"
                        >{{checkin_date}}</v-text-field>
                        <v-text-field
                          class="form-group"
                          v-model="leave_date" label="leave date"
                          prepend-icon="event"
                        >{{leave_date}}</v-text-field>
                        <v-text-field
                          class="form-group"
                          v-model="days" label="Days"
                          prepend-icon="event"
                        >{{days}}</v-text-field>
                        <v-text-field
                          class="form-group"
                          v-model="price" label="Price"
                          prepend-icon="event"
                        >{{price}}</v-text-field>
                        <!--</div>-->
                        <!--<div id = "roomType">-->
                        <v-text-field
                          class="form-group"
                          v-model="roomType" label="Room Type"
                          prepend-icon="hotel"
                        >{{roomType}}</v-text-field>
                        <v-select v-model="quantity"
                                  :items="items1" label="quantity" prepend-icon="plus_one"
                        ></v-select>
                      </v-card-text>
                      <v-card-text>
                        <p class="typo__p red--text" v-if="submitStatus === 'ERROR'">Please input all the fields correctly.</p>
                        <p class="typo__p red--text" v-if="availableAmount <= 0">Sorry. All rooms are booked</p>
                        <p class="typo__p red--text" v-if="isReserved === 'NO'">{{message}}</p>
                        <p class="typo__p green--text" v-if="isReserved === 'YES'">{{message}}</p>
                        <p class="typo__p orange--text" v-if="submitStatus === 'PENDING'"> Please wait.</p>
                      </v-card-text>
                      <v-divider class="mt-5"></v-divider>
                    </v-card>
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
import ConditionService from '@/services/conditionservice'
import PayPal from '@/components/paypal'
// import TypeService from '@/services/typeservice'
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
      columns: ['roomType', 'bedType', 'people', 'price', 'Available', 'Reserve'],
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
      quantity: '',
      name: '',
      email: '',
      contactNum: '',
      price: '',
      total: '',
      subtotal: '',
      isLoaded: false,
      // Info: null,
      // roomImage: this.$route.params.roomImage,
      availableAmount: '',
      totalAmount: '', // reserve amount
      reserveAmount: '', // reserve amount in particular days
      submitStatus: null,
      isReserved: null,
      errorMessages: '',
      toPay: false,
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
    customerLine: () => import('@/components/customerLine'),
    'paypal': PayPal
  },
  computed: {
    form () {
      return {
        name: this.name,
        email: this.email,
        quantity: this.quantity,
        contactNum: this.contactNum,
        checkin_date: this.checkin_date,
        leave_date: this.leave_date,
        days: this.days,
        roomType: this.roomType
        // availableAmount: this.availableAmount,
        // totalAmount: this.totalAmount
      }
    }
  },
  watch: {
    name () {
      this.errorMessages = ''
    }
  },
  // created() {
  //   this.getOrder()
  // },
  methods: {
    startTimeChange: function (e) { // 设置开始时间
      this.checkin_date = e
      this.endTimeOptions = {
        disabledDate (date) {
          let startTime = this.checkin_date ? new Date(this.checkin_date).valueOf() : ''
          return date && date.valueOf() < startTime
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
      if (this.availableAmount !== 0) {
        let dateBegin = new Date(this.checkin_date)
        let dateEnd = new Date(this.leave_date)
        let dateDiff = dateEnd.getTime() - dateBegin.getTime()
        let days = Math.floor(dateDiff / (24 * 3600 * 1000))
        console.log(days)
        this.days = days
        // this.total = total
        this.email = sessionStorage.getItem('email')
        this.price = sessionStorage.getItem('price')
        // let email = this.email
        // console.log(email)
        this.formErrors = false
        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formErrors = true
        })
        if (this.formErrors === false) {
          // this.total = (this.price * parseInt(this.amount, 10)).toString()
          var booking = {
            name: this.name,
            email: this.email,
            checkin_date: this.checkin_date,
            leave_date: this.leave_date,
            days: this.days,
            quantity: this.quantity,
            roomType: this.roomType,
            price: this.price,
            contactNum: this.contactNum
          }
          this.booking = booking
          // this.roomInfo = booking
          console.log('Submitting in BookingForm : ' +
          JSON.stringify(this.booking, null, 5))
          this.$emit('booking-is-created-updated', this.booking)
          BookingService.addBooking(booking)
            .then(response => {
              console.log(response)
              sessionStorage.setItem('booking_id', response.data.data._id)
              console.log(response.data.data)
              let total = (this.price * parseInt(this.quantity, 10) * parseInt(this.days, 10)).toString()
              console.log(total)
              sessionStorage.setItem('total', total)
              // this.subtotal = parseFloat(this.subtotal).toString()
              this.isLoaded = true
              this.toPay = true
              // this.$router.push('/customerOrder')
            })
            .catch(error => {
              console.log(error)
            })
        }
      } else {
        console.log('Sorry. Rooms are all reserved!')
      }
    },
    submit () {
      let dateBegin = new Date(this.checkin_date)
      // console.log(dateBegin)
      let dateEnd = new Date(this.leave_date)
      let dateDiff = dateEnd.getTime() - dateBegin.getTime()
      let days = Math.floor(dateDiff / (24 * 3600 * 1000))
      console.log(days)
      this.days = days
      // sessionStorage.setItem('days', this.days)
      this.email = sessionStorage.getItem('email')
      sessionStorage.setItem('checkin_date', this.checkin_date)
      sessionStorage.setItem('leave_date', this.leave_date)
      let roomType = this.roomType
      console.log(this.roomType)
      sessionStorage.setItem('roomType', this.roomType)
      if (this.roomType === 'double') {
        let checkindate = this.checkin_date
        let leavedate = this.leave_date
        console.log(checkindate)
        ConditionService.getAmountByType(roomType)
          .then(response => {
            this.totalAmount = response.data
            console.log(response.data)
          })
        ConditionService.getReserveAmount(checkindate, leavedate)
          .then(response => {
            this.reserveAmount = response.data
            console.log(response.data)
            let availableAmount = this.totalAmount - this.reserveAmount
            this.availableAmount = availableAmount
            // console.log(this.type)
            return availableAmount
          })
        RoomTypeService.fetchType(roomType)
          .then(response => {
            this.type = response.data
            this.price = this.type[0].price
            console.log(this.type)
            // console.log(response.data)
            sessionStorage.setItem('price', this.price)
            // this.type.price = price
            console.log(this.price)
          })
      } else if (this.roomType === 'single') {
        let roomType = this.roomType
        let checkindate = this.checkin_date
        let leavedate = this.leave_date
        console.log(checkindate)
        ConditionService.getAmountByType(roomType)
          .then(response => {
            this.totalAmount = response.data
            console.log(response.data)
          })
        ConditionService.getReserveAmount(checkindate, leavedate)
          .then(response => {
            this.reserveAmount = response.data
            console.log(response.data)
            let availableAmount = this.totalAmount - this.reserveAmount
            this.availableAmount = availableAmount
            // console.log(this.type)
            return availableAmount
          })
        RoomTypeService.fetchType(roomType)
          .then(response => {
            this.type = response.data
            this.price = this.type[0].price
            console.log(this.type)
            // console.log(response.data)
            sessionStorage.setItem('price', this.price)
            // this.type.price = price
            console.log(this.price)
          })
      } else if (this.roomType === 'twin') {
        let roomType = this.roomType
        let checkindate = this.checkin_date
        let leavedate = this.leave_date
        console.log(checkindate)
        ConditionService.getAmountByType(roomType)
          .then(response => {
            this.totalAmount = response.data
            console.log(response.data)
          })
        ConditionService.getReserveAmount(checkindate, leavedate)
          .then(response => {
            this.reserveAmount = response.data
            console.log(response.data)
            let availableAmount = this.totalAmount - this.reserveAmount
            this.availableAmount = availableAmount
            // console.log(this.type)
            return availableAmount
          })
        RoomTypeService.fetchType(roomType)
          .then(response => {
            this.type = response.data
            this.price = this.type[0].price
            console.log(this.type)
            // console.log(response.data)
            sessionStorage.setItem('price', this.price)
            // this.type.price = price
            console.log(this.price)
          })
      }
    // },
    // getOrder: function () {
    //   this.booking_id = sessionStorage.getItem('booking_id')
    //   BookingService.fetchBooking(this.booking_id).then(response => {
    //     if (response.data.data) {
    //       this.booking = response.data
    //       let total = (this.price * parseInt(this.amount, 10) * parseInt(this.days, 10)).toString()
    //       console.log(total)
    //       this.subtotal = parseFloat(this.subtotal).toString()
    //       this.Info = [
    //         {text: 'Quantity', value: this.booking.amount},
    //         {text: 'Type', value: this.booking[0].roomType},
    //         {text: 'Subtotal', value: this.subtotal}
    //       ]
    //       this.isLoaded = true
    //     }
    //   })
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
