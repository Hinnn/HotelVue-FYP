<template>
  <div id="changepass">
    <!--<customerLine />-->
    <v-container>
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
                                   () => !!password && password.length <= 15 || 'Password should be less than 15 characters!',
                                   passwordRules]"
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
                          () => !!password2 && password2.length <= 15 || 'Password should be less than 15 characters!', password2Rules]"
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
          <v-card-text>
            <p class="typo__p red--text" v-if="submitStatus === 'ERROR'">Please input all the fields correctly.</p>
            <p class="typo__p red--text" v-if="isChanged === 'NO'">{{message}}</p>
            <p class="typo__p green--text" v-if="isChanged === 'YES'">{{message}}</p>
            <p class="typo__p orange--text" v-if="submitStatus === 'PENDING' && isChanged === 'YES'"> Please waiting...</p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    </v-container>
  </div>
</template>
<script>
import CustomerService from '@/services/customerservice'
import AdminService from '@/services/adminservice'
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
      submitStatus: null,
      isChanged: null,
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
      // console.log(this.password)
      // console.log(this.password2)
      let updateOne = {
        password: this.password,
        password2: this.password2
      }
      console.log(updateOne)
      let token = sessionStorage.getItem('token')
      this.role = sessionStorage.getItem('role')
      // console.log(this.role)
      if (this.role === 'customer') {
        console.log(this.role)
        CustomerService.changePass(this.userEmail, updateOne, token)
          .then(response => {
            console.log(response.data)
            if (response.data.data === null) {
              this.message = ''
              this.message = response.data.message
              this.isChanged = 'NO'
            } else {
              this.isChanged = 'YES'
              this.message = ''
              this.message = response.data.message
              this.submitStatus = 'PENDING'
              // this.user = response.data
              // console.log(this.user)
              console.log(response.data)
              console.log('After editing: ' + JSON.stringify(this.user, null, 5))
              sessionStorage.removeItem('email')
              sessionStorage.removeItem('role')
              sessionStorage.removeItem('name')
              this.$swal('', 'Your password has been changed. Please login again!')
              this.$router.push('/Login')
            }
          })
          .catch(error => {
            console.log(error.response)
          })
      } else if (this.role === 'admin') {
        console.log(this.role)
        AdminService.changePass(this.userEmail, updateOne, token)
          .then(response => {
            console.log(response.data)
            if (response.data.data === null) {
              this.message = ''
              this.message = response.data.message
              this.isChanged = 'NO'
            } else {
              this.isChanged = 'YES'
              this.message = ''
              this.message = response.data.message
              this.submitStatus = 'PENDING'
              // this.user = response.data
              // console.log(this.user)
              console.log(response.data)
              console.log('After editing: ' + JSON.stringify(this.user, null, 5))
              sessionStorage.removeItem('email')
              sessionStorage.removeItem('role')
              sessionStorage.removeItem('name')
              this.$swal('', 'Your password has been changed. Please login again!')
              this.$router.push('/Login')
            }
          })
          .catch(error => {
            console.log(error.response)
          })
      }
    }
  }
}

</script>

<style scoped>
#changepasswordCard {
  min-width: 500px;
}
</style>
