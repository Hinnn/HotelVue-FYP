<template>
  <!--<v-container>-->
    <!--<v-card>-->
    <!--<v-layout row>-->
      <v-container grid-list-md text-xs-center>
        <v-divider></v-divider>
        <v-layout>
          <v-flex justify-center>
            <h5>First Floor</h5>
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
      <!--fluid grid-list-sm-->
      <v-flex xs2>
        <v-card dark color="blue">
          <v-btn flat width="100%" height="100%" @click="availableRoom" :disabled="disabled1">101(double)</v-btn>
        </v-card>
      </v-flex>
          <v-flex xs2>
            <v-card dark color="blue">
              <v-btn flat width="100%" height="100%">103</v-btn>
            </v-card>
          </v-flex>
          <v-flex xs2>
            <v-card dark color="blue">
              <v-btn flat width="100%" height="100%">105</v-btn>
            </v-card>
          </v-flex>
          <v-flex xs2>
            <v-card dark color="blue">
              <v-btn flat width="100%" height="100%">107</v-btn>
            </v-card>
          </v-flex>
          <v-flex xs2>
            <v-card dark color="blue">
              <v-btn flat width="100%" height="100%">109</v-btn>
            </v-card>
          </v-flex>
          <v-flex xs2>
            <!--<v-card>-->
              <!--<h5>Elevator</h5>-->
              <v-btn disabled>Elevator</v-btn>
            <!--</v-card>-->
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
        <v-flex justify-center>
        <h3>Corridor</h3>
        <v-divider></v-divider>
        </v-flex>
        </v-layout>
  <!--<v-container grid-list-md text-xs-center>-->
    <v-layout row wrap>
      <!--fluid grid-list-sm-->
      <v-flex xs2>
        <!--<v-card>-->
          <v-btn disabled>Elevator</v-btn>
        <!--</v-card>-->
      </v-flex>
      <v-flex xs2>
        <v-card dark color="blue">
          <v-btn flat width="100%" height="100%">102</v-btn>
        </v-card>
      </v-flex>
      <v-flex xs2>
        <v-card dark color="blue">
          <v-btn flat width="100%" height="100%">104</v-btn>
        </v-card>
      </v-flex>
      <v-flex xs2>
        <v-card dark color="blue">
          <v-btn flat width="100%" height="100%">106</v-btn>
        </v-card>
      </v-flex>
      <v-flex xs2>
        <v-card dark color="blue">
          <v-btn flat width="100%" height="100%">108</v-btn>
        </v-card>
      </v-flex>
      <v-flex xs2>
        <v-card dark color="blue">
          <v-btn flat width="100%" height="100%">110</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ConditionService from '@/services/conditionservice'
export default {
  name: 'roomStatus',
  data () {
    return {
      checkin_date: '',
      leave_date: '',
      roomType: '',
      roomID: '',
      disabled1: false
    }
  },
  methods: {
    availableRoom: function () {
      // this.checkin_date = sessionStorage.getItem('checkin_date')
      // this.roomType = sessionStorage.getItem('roomType')
      // this.leave_date = sessionStorage.getItem('leave_date')
      ConditionService.multipleSelect()
        .then(response => {
          this.roomID = response.data.roomID
          if (this.roomID === '101') {
            this.disabled1 = true
          }
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
