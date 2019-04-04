<template>
    <div id="EditInfo">
      <customerLine />
      <v-layout justify-center>
        <v-flex xs12 sm10 md8 lg6>
          <v-card ref="form" id="EditInfoCard" v-model="valid" lazy-validation>
            <v-card-title class="display-1 pl-5 pt-5">Edit Info</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="phoneNum" :counter="10" label="phoneNum"
                prepend-icon="phone" :rules="phoneRules"
              ></v-text-field>
              <v-select v-model="Gender"
                :items="items" label="Gender" prepend-icon="edit"
              ></v-select>
              <v-menu
                ref="menu" v-model="menu" :close-on-content-click="false"
                :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
              <template slot="activator">
              <v-text-field v-model="DateOfBirth" label="Birthday" prepend-icon="event" readonly></v-text-field>
              </template>
              <v-date-picker
              ref="picker"
              v-model="DateOfBirth"
              :max="new Date().toISOString().substr(0, 10)"
              @change="save"
              ></v-date-picker>
              </v-menu>
            </v-card-text>
            <v-card-actions>
              <v-btn flat large @click="editInfo">Submit</v-btn>
              <v-btn flat large @click="clear">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
</template>
<script>
import CustomerSer from '@/services/customerservice'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
export default {
  name: 'EditInfo',
  // props: ['user', 'isCustomer', 'isAdmin'],
  // data: () => ({
  data () {
    return {
      // updateOne: {},
      valid: false,
      user: {},
      DateOfBirth: '',
      phoneNum: '',
      Gender: '',
      menu: false,
      items: ['Female', 'Male'],
      phoneRules: [
        v => (v && v.length <= 10) || 'Phone number must be 10 characters'
      ]
    }
  },
  components: {

    customerLine: () => import('@/components/customerLine')
  },
  watch: {
    menu (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },

  methods: {
    save (DateOfBirth) {
      this.$refs.menu.save(DateOfBirth)
    },
    clear () {
      this.$v.$reset()
      this.DateOfBirth = ''
      this.phoneNum = ''
      this.Gender = ''
    },
    editInfo () {
      this.userEmail = sessionStorage.getItem('email')
      // this.user_role = sessionStorage.getItem('role')
      console.log(this.DateOfBirth)
      console.log(this.phoneNum)

      let updateOne = {
        DateOfBirth: this.DateOfBirth,
        Gender: this.Gender,
        phoneNum: this.phoneNum
      }
      console.log(updateOne)
      // this.user.Gender = this.Gender
      CustomerSer.EditInfo(this.userEmail, updateOne)
        .then(response => {
          // this.user = response.data
          // console.log(this.user)
          console.log(response.data.data)
          console.log('After editing: ' + JSON.stringify(this.user, null, 5))
          this.$router.push('/AccountInfo')
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  }
}
</script>
