<template>
  <div id="changepass">
    <customerLine />
    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6>
        <v-card ref="form" id="changepasswordCard">
          <v-card-title class="display-1 pl-5 pt-5">Change Password</v-card-title>
          <v-card-text>
            <!--<v-text-field-->
              <!--v-model="email"-->
              <!--:rules="emailRules"-->
              <!--label="Email"-->
              <!--placeholder="e.g.xxx@xx.com"-->
              <!--required-->
            <!--&gt;</v-text-field>-->
            <v-text-field ref="password"
                          v-model="password"
                          :append-icon="show1 ? 'visibility_off' : 'visibility'"
                          :rules="[() => !!password || 'This field is required',() => !!password && password.length >= 8 || 'Password should be more than 8 characters!',
                                   () => !!password && password.length <= 15 || 'Password should be less than 15 characters!']"
                          :type="show1 ? 'text' : 'password'"
                          :counter="15"
                          label="Password"
                          placeholder="8-15 characters contain number,special character, lowercase and capital Letters"
                          @click:append="show1 = !show1"
                          required>

            </v-text-field>
            <v-text-field ref="password2"
                          v-model="password2"
                          :append-icon="show2 ? 'visibility_off' : 'visibility'"
                          :rules="[() => !!password2 || 'This field is required',
                          () => !!password2 && password2.length >= 8 || 'Password should be more than 8 characters!',
                          () => !!password2 && password2.length <= 15 || 'Password should be less than 15 characters!']"
                          :type="show2 ? 'text' : 'password'"
                          :counter="15"
                          label="Confirm Password"
                          placeholder="Same as password"
                          @click:append="show2 = !show2"
                          required>
            </v-text-field>
          </v-card-text>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-btn outline color="indigo" flat @click="submit">Submit</v-btn>
            <v-btn outline color="indigo" flat @click="clear">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import CustomerService from '@/services/customerservice'
import Vue from 'vue'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

export default {
  name: 'changePass',
  data () {
    return {
      user: {},
      password: null,
      password2: null,
      show1: false,
      show2: false,
      message: '',
      // emailRules: [
      //   v => !!v || 'E-mail is required',
      //   v => /.+@.+/.test(v) || 'E-mail must be valid'
      // ],
      passwordRules: [
        v => !!v || 'Password is required!',
        v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[a-zA-Z\d\W?$]{8,16}/.test(v) || 'Password must has number,special character, lowercase and capital Letters!'
      ],
      password2Rules: [
        v => !!v || 'Password is required!',
        v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[a-zA-Z\d\W?$]{8,16}/.test(v) || 'Password must has number,special character, lowercase and capital Letters!',
        v => !!v.password || 'Must be same as Password'
      ]
    }
  },
  components: {
    customerLine: () => import('@/components/customerLine')
  },
  methods: {
    // passwordCheck () {
    //   let checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[a-zA-Z\d\W?$]{8,16}/
    //   this.errorMessages = checkPassword.test(this.password) ? '' : 'Password must has number,special character, lowercase and capital Letters!'
    //   return this.errorMessages
    // },
    // password2Check () {
    //   let checkPassword2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[a-zA-Z\d\W?$]{8,16}/
    //   this.errorMessages = checkPassword2.test(this.password2) ? '' : 'At least a number, lowercase letter, capital letter and special character'
    //   return this.errorMessages
    // },
    clear () {
      this.$v.$reset()
      // this.email = ''
      this.password = ''
      this.password2 = ''
    },
    submit () {
      this.userEmail = sessionStorage.getItem('email')
      // this.user_role = sessionStorage.getItem('role')
      console.log(this.password)
      console.log(this.password2)

      let updateOne = {
        password: this.password,
        password2: this.password2
      }
      console.log(updateOne)
      // this.user.Gender = this.Gender
      CustomerService.changePass(this.userEmail, updateOne)
        .then(response => {
          // this.user = response.data
          // console.log(this.user)
          console.log(response.data)
          console.log('After editing: ' + JSON.stringify(this.user, null, 5))
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  }
}

</script>

<style scoped>
#changepasswordCard {
  min-width: 500px;
}
</style>
