<template>
  <div id="cuatomersearch">
    <customerLine />
  <!--<base-card dark>-->
    <!--<v-img class="white&#45;&#45;text" height="30%" width="100%"-->
           <!--src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">-->
      <div>
        <v-container fluid  grid-list-md pa-2 style="width: 90%;height:25%">
          <v-card>
            <v-layout row justify-center>
              <v-flex xs12 sm4 md3>
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
              <v-flex  xs12 sm4 md3>
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
              <v-spacer></v-spacer>
              <v-flex xs12 sm4 md3>
                <div id = "roomType">
                  <v-select
                    :items="items" label="Room Type" prepend-icon="hotel"
                  ></v-select>
                </div>
              </v-flex>
              <v-flex  xs12 sm4 md3>
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
    <!--</v-img>-->
  <!--</base-card>-->
  </div>
</template>
<script>
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
      items: ['double', 'single', 'family'],
      startTimeOptions: {}, // 开始日期约束
      endTimeOptions: {}, // 结束日期约束
      checkin_date: '', // 开始日期
      leave_date: '' // 结束日期
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
