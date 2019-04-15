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
                <!--<v-divider></v-divider>-->
                <!--<v-flex  xs12 sm6 md3>-->
                <!--<v-card-text><h5>{{message}} Day(s)</h5></v-card-text>-->
                <!--</v-flex>-->
                <!--</div>-->
                <!--<v-divider></v-divider>-->
                <!--<v-text id="roomTypeTable">-->
                <v-client-table :columns="columns" :data="type" :options="options">
                  <v-btn flat icon color="indigo" slot="reserve" slot-scope="props" @click="reserveRoom(props.row.roomType)">
                    Reserve
                  </v-btn>
                </v-client-table>
                <!--</v-text>-->
                <!--<v-list dense>-->
                  <!--<v-list-tile>-->
                    <!--<v-list-tile-content>double:</v-list-tile-content>-->
                    <!--&lt;!&ndash;<v-list-tile-content class="align-end">{{ double }}</v-list-tile-content>&ndash;&gt;-->
                  <!--</v-list-tile>-->
                <!--</v-list>-->
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    <!--</v-img>-->
  <!--</base-card>-->
  </div>
</template>
<script>
import RoomTypeService from '@/services/roomTypeservice'
import Vue from 'vue'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable)

export default {
  name: 'customerSearch',
  data () {
    return {
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
      message: ''
    }
  },
  components: {

    customerLine: () => import('@/components/customerLine')
  },
  computed: {
    form () {
      return {
        checkin_date: this.checkin_date,
        leave_date: this.leave_date,
        roomType: this.roomType
      }
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
    reserveRoom: function (roomType) {
      let dateBegin = new Date(this.checkin_date)
      // console.log(dateBegin)
      let dateEnd = new Date(this.leave_date)
      let dateDiff = dateEnd.getTime() - dateBegin.getTime()
      let days = Math.floor(dateDiff / (24 * 3600 * 1000))
      console.log(days)
      this.days = days
      sessionStorage.setItem('days', this.days)
      sessionStorage.setItem('checkin_date', this.checkin_date)
      sessionStorage.setItem('leave_date', this.leave_date)
      roomType = this.roomType
      console.log(roomType)
      sessionStorage.getItem('roomType', this.roomType)
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
