<template>
  <div id="login">
    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6>
        <v-card id="loginCard" flat>
          <v-card-title class="display-1 pl-5 pt-5">LOGIN</v-card-title>
          <v-card-text>
            <form @submit.prevent="submit">
              <v-text-field v-model="email"
                            :error-messages="checkEmail"
                            label="Email" required
                            @input="$v.email.$touch()" @blur="$v.email.$touch()">
              </v-text-field>
              <v-text-field v-model="password"
                            :append-icon="show ? 'visibility_off' : 'visibility'"
                            :error-messages="checkPassword"
                            :counter="15"
                            label="Password" required
                            :type="show ? 'text' : 'password'"
                            @click:append="show = !show"
                            @input="$v.password.$touch()" @blur="$v.password.$touch()">
              </v-text-field>
              <div class="foot-lnk">
                <a href="#/forgetPass" for="tab-1">Forget your Password?</a>
              </div>
              <v-container fluid>
              <v-radio-group v-model="role" :mandatory="false" row>
                <v-radio label="Customer"  value="customer"></v-radio>
                <v-radio label="Administrator" value="admin"></v-radio>
              </v-radio-group>
              </v-container>
              <v-btn outline color="indigo" flat @click="submit">submit</v-btn>
              <p class="typo__p red--text" v-if="submitStatus === 'ERROR'">Please input email and password correctly.</p>
              <p class="typo__p red--text" v-if="isLogged === 'NO'">{{message}}</p>
              <p class="typo__p green--text" v-if="isLogged === 'YES'">{{message}}</p>
              <p class="typo__p orange--text" v-if="submitStatus === 'PENDING'"> Please waiting ...</p>
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import AdminService from '@/services/adminservice'
import CustomerService from '@/services/customerservice'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

Vue.use(Vuelidate)

export default {
  name: 'Login',

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8), maxLength: maxLength(15) }
  },
  computed: {
    checkEmail () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Please input valid email')
      !this.$v.email.required && errors.push('Email is required')
      return errors
    },
    checkPassword () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Password must be at least 8 characters')
      !this.$v.password.maxLength && errors.push('Password must be less than 15 characters')
      !this.$v.password.required && errors.push('Name is required.')
      return errors
    }
  },
  data () {
    return {
      email: '',
      password: '',
      show: false,
      role: '',
      submitStatus: null,
      isLogged: null,
      message: ''
    }
  },
  methods: {
    submit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        let user = {'email': this.email, 'password': this.password}
        if (this.role === 'customer') {
          CustomerService.Login(user).then(response => {
            if (response.data.data === null) {
              this.message = ''
              this.message = response.data.message
              this.isLogged = 'NO'
            } else {
              this.isLogged = 'YES'
              sessionStorage.setItem('token', response.headers.token)
              console.log(response.headers.token)
              sessionStorage.setItem('email', response.data.data.email)
              sessionStorage.setItem('role', this.role)
              // sessionStorage.setItem('name', response.data.data.name)
              this.message = ''
              this.message = response.data.message
              this.submitStatus = 'PENDING'
              // setTimeout(() => {
              //   this.$router.go(0)
              // }, 1000)
              this.$router.push({path: '/AccountInfo'})
              this.$router.go(0)
            }
          })
        } else if (this.role === 'admin') {
          let user = {'email': this.email, 'password': this.password}
          AdminService.Login(user).then(response => {
            if (response.data.data === null) {
              this.isLogged = 'NO'
              this.message = ''
              this.message = response.data.message
            } else {
              this.isLogged = 'YES'
              // const token = response.data.token
              sessionStorage.setItem('token', response.headers.token)
              sessionStorage.setItem('id', response.data.data._id)
              sessionStorage.setItem('email', response.data.data.email)
              sessionStorage.setItem('role', this.role)
              console.log(response.headers.token)
              console.log(response.data._id)
              console.log(this.role)
              this.message = ''
              this.message = response.data.message
              this.submitStatus = 'PENDING'
              this.$router.push('/AdminInfo')
              this.$router.go(0)
            }
          })
        }
      }
    }
  }
}
</script>

<style scoped>
  #loginCard {
    min-width: 500px;
  }

</style>
