<meta name="viewpoint" content="width=device-width, initial-scale=1"/>
<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-money" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form action="#" @submit.prevent="submit" class="sign-up-htm">
            <div class="group">
              <label :class="{ invalid: $v.customerID.$dirty && $v.customerID.$invalid }" for="sign-up-customerID" class="label">customerID</label>
              <input @input="$v.customerID.$touch()" :class="{ invalid: $v.customerID.$dirty && $v.customerID.$invalid }" id="sign-up-customerID" type="text" class="input" placeholder="Required" v-model.trim="customerID">
              <div class="error" v-if="!$v.customerID.minLength">Minimum customerID length is 8</div>
            </div>
            <div class="group">
              <label :class="{ invalid: $v.name.$dirty && $v.name.$invalid }" for="sign-up-name" class="label">Name</label>
              <input @input="$v.name.$touch()" :class="{ invalid: $v.name.$dirty && $v.name.$invalid }" id="sign-up-name" type="text" class="input" placeholder="Required" v-model.trim="name">
            </div>
            <div class="group">
              <label :class="{ invalid: $v.email.$dirty && $v.email.$invalid }" for="email" class="label">Email</label>
              <input @input="$v.email.$touch()" :class="{ invalid: $v.email.$dirty && $v.email.$invalid }" id="email" type="text" class="input" placeholder="Required" v-model.trim="email">
              <div class="error" v-if="!$v.email.email">Email format is wrong</div>
            </div>
            <div class="group">
              <label :class="{ invalid: $v.phoneNumber.$dirty && $v.phoneNumber.$invalid }" for="phoneNumber" class="label">phoneNumber</label>
              <input @input="$v.phoneNumber.$touch()" :class="{ invalid: $v.phoneNumber.$dirty && $v.phoneNumber.$invalid }" id="phoneNumber" type="text" class="input" placeholder="Optional" v-model.trim="phoneNumber">
            </div>
            <div class="group">
              <label :class="{ invalid: $v.password.$dirty && $v.password.$invalid }" for="sign-up-pass1" class="label">Password</label>
              <input @input="$v.password.$touch()" :class="{ invalid: $v.password.$dirty && $v.password.$invalid }" id="sign-up-pass1" type="password" class="input" data-type="password" placeholder="Required" v-model.trim="password">
            </div>
            <div class="error" v-if="!$v.password.minLength">Minimum Password length is 6</div>
            <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
            </div>
            <div class="group">
              <label :class="{ invalid: $v.password2.$dirty && $v.password2.$invalid }" for="sign-up-pass2" class="label">Confirm Password</label>
              <input @input="$v.password2.$touch()" :class="{ invalid: $v.password2.$dirty && $v.password2.$invalid }" id="sign-up-pass2" type="password" class="input" data-type="password" placeholder="Required" v-model.trim="password2">
              <div class="error" v-if="!$v.password2.minLength">Minimum Password length is 6</div>
              <div class="error" v-if="!$v.password2.sameAsPassword">Different password</div>
            </div>
            <p>
              <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">SignUp</button>
            </p>
            <p class="typo__p" v-if="submitStatus === 'OK'" >SignUp Successfully!</p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">Something wrong</p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">signing up...</p>
            <div class="hr"></div>
            <div class="foot-lnk">
              <a href="#/Login" for="tab-1">Already Member?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerService from '@/services/CustomerService'
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import {required, email, minLength, sameAs} from 'vuelidate/lib/validators'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})

Vue.use(Vuelidate)

export default {
  name: 'SignUp',
  data () {
    return {
      customerID: '',
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      password2: '',
      hint: false,
      messagetitle: ' SignUp ',
      submitStatus: null,
      info: null
    }
  },
  validations: {
    customerID: {
      required,
      minLength: minLength(8)
    },
    name: {
      required
    },
    email: {
      required,
      email
    },
    phoneNumber: {
      minLength: minLength(9)
    },
    password: {
      required,
      minLength: minLength(6)
    },
    password2: {
      required,
      minLength: minLength(6),
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    submit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        let params = {'customerID': this.customerID, 'name': this.name, 'email': this.email, 'phoneNumber': this.phoneNumber, 'password': this.password, 'password2': this.password2}
        CustomerService.SignUp(params)
          .then(response => {
            this.info = response
            if (this.info.data.data === null) {
              this.submitStatus = 'ERROR'
            } else {
              this.submitStatus = 'OK'
              sessionStorage.setItem('token', this.info.headers.token)
              setTimeout(() => {
                this.$router.push('/customerLogin')
              }, 1000)
            }
          })
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
