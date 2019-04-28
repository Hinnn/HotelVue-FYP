<template>
  <div class="hero" id="signup">
    <v-container grid-list-md text-xs-center>
    <v-layout justify-center wrap>
      <v-flex xs12 sm10 md8 lg6>
        <v-card ref="form" id="signupCard">
          <v-card-title class="display-1 pl-5 pt-5">SIGN UP</v-card-title>
          <v-card-text>
            <v-text-field
              ref="name" v-model="name" :rules="[() => !!name || 'This field is required']" label="Name" placeholder="Required" required>
            </v-text-field>
            <v-text-field
              v-model="email" :rules="emailRules" label="Email" placeholder="e.g.xxx@xx.com" required
            ></v-text-field>
            <v-text-field ref="password"
                          v-model="password"
                          :append-icon="show1 ? 'visibility_off' : 'visibility'"
                          :rules="[() => !!password || 'This field is required',() => !!password && password.length >= 8 || 'Password should be more than 8 characters!',
                                   () => !!password && password.length <= 15 || 'Password should be less than 15 characters!',passwordRules]"
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
                          () => !!password2 && password2.length <= 15 || 'Password should be less than 15 characters!',
                           password2Rules]"
                          :type="show2 ? 'text' : 'password'"
                          :counter="15"
                          label="Confirm Password"
                          placeholder="Same as password"
                          @click:append="show2 = !show2"
                          required>
            </v-text-field>
            <v-radio-group v-model="role" :mandatory="false" row>
              <v-radio label="Customer" value="customer"></v-radio>
              <v-radio label="Administrator" value="admin"></v-radio>
            </v-radio-group>
          </v-card-text>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-btn outline color="indigo" flat @click="submit">Submit</v-btn>
            <v-btn outline color="indigo" flat @click="clear">Cancel</v-btn>
            <v-btn outline color="indigo" flat @click="verify">Verify</v-btn>
          </v-card-actions>
          <div class="foot-lnk">
            <a href="#/Login" for="tab-1">Already Member?</a>
          </div>
          <v-card-text>
            <p class="typo__p red--text" v-if="submitStatus === 'ERROR'">Please input all the fields correctly.</p>
            <p class="typo__p red--text" v-if="isRegister === 'NO'">{{message}}</p>
            <p class="typo__p green--text" v-if="isRegister === 'YES'">{{message}}</p>
            <p class="typo__p orange--text" v-if="submitStatus === 'PENDING' && isRegister === 'YES'"> Please waiting...</p>
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
  name: 'SignUp',
  data: () => ({
    roles: ['Customer', 'Administrator'],
    errorMessages: '',
    name: null,
    email: null,
    password: null,
    password2: null,
    show1: false,
    show2: false,
    checkbox: false,
    role: 'customer',
    formErrors: false,
    submitStatus: null,
    isRegister: null,
    message: '',
    // emailRules: [
    //   v => !!v || 'E-mail is required',
    //   v => /.+@.+/.test(v) || 'E-mail must be valid'
    // ],
    emailRules: [
      v => !!v || 'Email is required',
      v => /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(v) || 'Email must be valid'
    ],
    passwordRules: [
      v => !!v || 'Password is required!',
      v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[a-zA-Z\d\W?$]{8,16}/.test(v) || 'Password must has number,special character, lowercase and capital Letters!'
    ],
    password2Rules: [
      v => !!v || 'Password is required!',
      v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[a-zA-Z\d\W?$]{8,16}/.test(v) || 'Password must has number,special character, lowercase and capital Letters!',
      v => !!v.password || 'Must be same as Password'
    ]
  }),
  // validations: {
  //   // password: {
  //   // },
  //   // password2: {
  //   //   sameAsPassword: sameAs('password')
  //   // },
  //   checkbox: {
  //     checked (val) {
  //       return val
  //     }
  //   }
  // },
  computed: {
    form () {
      return {
        name: this.name,
        email: this.email,
        password: this.password,
        password2: this.password2,
        role: this.role
      }
    }
    // checkboxErrors () {
    //   const errors = []
    //   if (!this.$v.checkbox.$dirty) return errors
    //   !this.$v.checkbox.checked && errors.push('You must agree to continue!')
    //   return errors
    // }
  },
  watch: {
    name () {
      this.errorMessages = ''
    }
  },
  methods: {
    emailCheck () {
      let checkEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      this.errorMessages = checkEmail.test(this.email) ? '' : 'Wrong email format!'
      return this.errorMessages
    },
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
      // this.$v.$reset()
      // this.name = ''
      // this.email = ''
      // this.password = ''
      // this.password2 = ''
      this.$router.push('/')
      // this.checkbox = false
    },
    verify () {
      // this.$v.$reset()
      // this.name = ''
      // this.email = ''
      // this.password = ''
      // this.password2 = ''
      this.$router.push('/verification')
      // this.checkbox = false
    },
    submit () {
      this.formErrors = false
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formErrors = true
      })
      if (this.formErrors === false) {
        let user = {'email': this.email, 'password': this.password, 'password2': this.password2, 'name': this.name}
        if (this.role === 'customer') {
          CustomerService.SignUp(user).then(response => {
            if (response.data.data === null) {
              this.message = ''
              this.message = response.data.message
              this.isRegister = 'NO'
            } else {
              this.isRegister = 'YES'
              this.message = ''
              this.message = response.data.message
              this.submitStatus = 'PENDING'
              this.$swal('Congratulations!', 'Registered successfully! Just confirm your email by inputting your code! ')
              this.$router.push('/verification')
            }
            console.log(response.data)
          })
        } else if (this.role === 'admin') {
          AdminService.SignUp(user).then(response => {
            if (response.data.data === null) {
              this.isRegister = 'NO'
              this.message = ''
              this.message = response.data.message
            } else {
              this.isRegister = 'YES'
              this.message = ''
              this.message = response.data.message
              this.submitStatus = 'PENDING'
              this.$swal('Congratulations!', 'Registered successfully! Just confirm your email by inputting your code! ')
              this.$router.push('/verification')
            }
          })
        }
      }
    }
  }
}
</script>

<style scoped>
  #signupCard {
    min-width: 500px;
  }
</style>
