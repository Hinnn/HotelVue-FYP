<template>
<div id="login">
  <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <v-card ref="form" id="loginCard">
        <v-card-title class="display-1 pl-5 pt-5">Login</v-card-title>
        <v-card-text>
          <v-text-field v-model="email" :error-message="emailCheck" label="Email" placeholder="e.g.xxx@xx.com" required
                        @input="$v.email.$touch()" @blur="$v.email.$touch()"></v-text-field>
          <v-text-field ref="password"
                        v-model="password"
                        :append-icon="show ? 'visibility_off' : 'visibility'"
                        :error-message="passwordCheck"
                        :counter="15"
                        label="Password"
                        :type="show ? 'text' : 'password'"
                        @click:append="show = !show"
                        required
                        @input="$v.password.$touch()" @blur="$v.password.$touch()">
          </v-text-field>
          <v-radio-group v-model="role" :mandatory="false" row>
            <v-radio label="Customer" value="customer"></v-radio>
            <v-radio label="Administrator" value="admin"></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider class="mt-5"></v-divider>
        <v-card-actions>
          <v-btn outline color="indigo" flat @click="submit">Submit</v-btn>
        </v-card-actions>
        <v-card-text>
          <p class="typo__p red--text" v-if="submitStatus === 'ERROR'">Please input your email and password correctly.</p>
          <p class="typo__p red--text" v-if="isLogged === 'NO'">{{message}}</p>
          <p class="typo__p green--text" v-if="isLogged === 'YES'">{{message}}</p>
          <p class="typo__p orange--text" v-if="submitStatus === 'PENDING' && isLogged === 'YES'"> Please waiting...</p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</div>
</template>
<script>
import CustomerService from '@/services/CustomerService'
import AdminService from '@/services/adminservice'
import Vue from 'vue'
// import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import { required, minLength, email, maxLength } from 'vuelidate/lib/validators'

Vue.use(Vuelidate)

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      show: false,
      hint: false,
      isLogged: null,
      messagetitle: ' Login ',
      submitStatus: null,
      info: null
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(15)
    }
  },
  computed: {
    emailCheck () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Wrong email format!')
      !this.$v.email.required && errors.push('Email is required!')
      return errors
    },
    passwordCheck () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Password should more than 8 characters!')
      !this.$v.password.maxLength && errors.push('Password should less than 15 characters!')
      !this.$v.password.required && errors.push('Please input your password!')
      return errors
    },
    methods: {
      submit () {
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          let user = {'email': this.email, 'password': this.password}
          if (this.role === 'customer') {
            CustomerService.Login(user)
              .then(response => {
                this.info = response
                // console.log(this.info.headers)
                if (this.info.data.data === null) {
                  this.message = ''
                  this.message = response.data.message
                  this.isLogged = 'NO'
                } else {
                  this.isLogged = 'YES'
                  this.message = ''
                  this.message = response.data.message
                  this.submitStatus = 'PENDING'
                  sessionStorage.setItem('token', this.info.headers.token)
                  setTimeout(() => {
                    this.$router.push('/Home')
                  }, 1000)
                  this.$router.push({
                    path: '/'
                    // query: {id: response.data.data._id, name: response.data.data.name, role: this.role}
                  })
                }
              })
          } else if (this.role === 'admin') {
            AdminService.Login(user)
              .then(response => {
                this.info = response
                // console.log(this.info.headers)
                if (this.info.data.data === null) {
                  this.message = ''
                  this.message = response.data.message
                  this.isLogged = 'NO'
                } else {
                  this.isLogged = 'YES'
                  this.message = ''
                  this.message = response.data.message
                  this.submitStatus = 'PENDING'

                  this.$router.push('/Home')
                }
              })
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }
  .donate-form .form-control-label.text-left{
    text-align: left;
  }

  label {
    display: inline-block;
    width: 540px;
    text-align: left;
    font-size: x-large;
  }
  .typo__p {
    width: 540px;
    font-size: x-large;
  }
  .btn1 {
    width: 300px;
    font-size: x-large;
  }
  p {
    margin-top: 20px;
  }

  input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
    width: 540px;
  }

  .dirty {
    border-color: #5A5;
    background: #EFE;
  }

  .dirty:focus {
    outline-color: #8E8;
  }

  .error {
    border-color: red;
    background: #157ffb;
    color: whitesmoke;
  }

  .error:focus {
    outline-color: #ffa519;
  }
</style>
