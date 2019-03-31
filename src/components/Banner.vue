
<template>
  <base-card dark>
    <v-img class="white--text" height="30%" width="100%"
           src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
      <v-container fluid>
      <v-layout fill-height align-center pa-3>
          <v-flex xs12 align-end flexbox>
            <span class="display-3">Welcome!</span>
          </v-flex>
      </v-layout></v-container>
      <div>
        <v-container fluid  grid-list-md pa-2 style="width: 90%;height:25%">
          <v-card>
            <v-layout row justify-center>
              <v-flex xs12 sm4 md4>
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
                  </v-flex>
              <v-spacer></v-spacer>
              <v-flex  xs12 sm4 md4>
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
              </v-flex>
              <v-flex  xs12 sm4 md4>
                <div id ="search">
                <v-card-actions>
                <v-btn block color="#BA68C8" dark @click="search">
                <v-icon>search</v-icon>Search</v-btn>
                </v-card-actions>
                </div>
              </v-flex>
            </v-layout>
          </v-card>
        </v-container>
      </div>
            <!--<v-container fluid>-->
            <!--<v-layout row>-->
              <!--<v-card style="width:90%; height:100%" class="mx-auto">-->
                <!--<v-flex row xs12>-->
                  <!--<v-card style="width:33.3%; height:100%">-->
          <!--<v-flex xs4 md12>-->
            <!--<div id = "checkin_date">-->
              <!--<v-menu-->
                <!--v-model="menu1" :close-on-content-click="false" :nudge-right="40"-->
                <!--lazy transition="scale-transition" offset-y>-->
                <!--<template slot="activator">-->
                  <!--<v-text-field v-model="checkin_date" label="CheckIn Date" prepend-icon="event" readonly v-on="on">-->
                  <!--</v-text-field>-->
                <!--</template>-->
                <!--<v-date-picker v-model="checkin_date" @on-change="startTimeChange" @input="menu1 = false"></v-date-picker>-->
              <!--</v-menu>-->
            <!--</div>-->
          <!--</v-flex>-->
                  <!--</v-card>-->
                  <!--<v-card style="width:33.3%; height:100%">-->
                    <!--<v-flex xs4 md12>-->
            <!--<div id = "leave_date">-->
              <!--<v-menu-->
                <!--v-model="menu2" :close-on-content-click="false" :nudge-right="40"-->
                <!--lazy transition="scale-transition" offset-y>-->
                <!--<template slot="activator">-->
                  <!--<v-text-field v-model="leave_date" label="CheckOut Date" prepend-icon="event" readonly v-on="on">-->
                  <!--</v-text-field>-->
                <!--</template>-->
                <!--<v-date-picker v-model="leave_date" @on-change="endTimeChange" @input="menu2 = false"></v-date-picker>-->
              <!--</v-menu>-->
            <!--</div>-->
          <!--</v-flex>-->
                  <!--</v-card>-->
                  <!--<v-card  style="width:33.4%" class="mx-auto" order-md3 order-xs3>-->
                    <!--<v-flex xs4>-->
          <!--<div id ="search">-->
              <!--<v-card-actions>-->
                <!--<v-btn icon block color="#BA68C8" dark @click="search">-->
                <!--<v-icon>search</v-icon>Search</v-btn>-->
              <!--</v-card-actions>-->
          <!--</div>-->
              <!--</v-flex>-->
                  <!--</v-card>-->
                <!--</v-flex>-->
              <!--</v-card>-->
            <!--</v-layout>-->
            <!--</v-container>-->
    </v-img>
    <div>
      <v-container fluid  grid-list-md pa-2 style="width: 90%">
        <v-card>
          <v-layout row justify-center>
            <v-flex xs12 sm6 md6>
              <v-card style="width:100%; height:100%">
                <v-img height="100%" width="100%"
                       src="/static/images/008.png">
                <v-flex xs12 flexbox column>
                  <div>
                  <span class="font-weight-bold">HI! Customer!</span>
                  </div>
                  <base-title class="font-weight-bold">About Our Hotel</base-title>
                  <div>
                    <span class="font-weight-bold">
                      This card is used to introduce the hotel. Because I don't have a real hotel. I just show you the layout and the function of this card. Everyone who use my website can change it to show their hotel details.</span>
                  </div>
                  <div>
                    <span class="font-weight-bold">Why not register our website and enjoy some privileges? </span>
                  </div>
                  <v-btn outline color="indigo" dark @click="Signup">SIGNUP</v-btn>
                </v-flex>
                </v-img>
              </v-card>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex  xs12 sm6 md6>
              <v-carousel hide-delimiters>
                <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src">
                  <img style="width:100%; height:100%">
                </v-carousel-item>
              </v-carousel>
            </v-flex>
          </v-layout>
        </v-card>
      </v-container>
    </div>
  </base-card>
</template>
<script>
// import BookingService from '@/services/bookingservice'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
export default {
  name: 'Home',
  data () {
    return {
      // data: () => ({
      date: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      startTimeOptions: {}, // 开始日期约束
      endTimeOptions: {}, // 结束日期约束
      checkin_date: '', // 开始日期
      leave_date: '', // 结束日期
      items: [
        // download from http://www.huazhu.com/Hanting
        {src: '/static/images/001.jpg'},
        {src: '/static/images/003.jpg'},
        {src: '/static/images/004.jpg'},
        {src: '/static/images/005.jpg'}
      ]
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
    passwordCheck () {
      let checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[a-zA-Z\d\W?$]{8,16}/
      this.errorMessages = checkPassword.test(this.password) ? '' : 'Password must has number,special character, lowercase and capital Letters!'
      return this.errorMessages
    },
    Signup () {
      this.$router.push('/SignUp')
    },
    search () {
      this.$router.push('/Room')
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
