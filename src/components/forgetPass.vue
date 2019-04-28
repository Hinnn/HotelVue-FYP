<template>
  <v-container grid-list-md text-xs-center>
    <v-layout justify-center row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card style="width: 100%; height:100%">
          <div>
          <h1 class="headline">Get your password back</h1>
          </div>
          <!--<v-flex xs12 >-->
          <span class="mb-0">Dear customer,</span><br>
          <span>We will send you an email with a random password.
            You need to use this password to login.
            Please do remember to change your password after logging in to make sure your account is safe.</span><br>
          <!--</v-flex>-->
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Please input your Email"
            placeholder="e.g.xxx@xx.com"
            required>
          </v-text-field>
          <v-container fluid>
            <v-radio-group v-model="role" :mandatory="false" row>
              <v-radio label="Customer"  value="customer"></v-radio>
              <v-radio label="Administrator" value="admin"></v-radio>
            </v-radio-group>
          </v-container>
          <!--<v-text-field ref="email"&ndash;&gt;-->
                         <!--v-model="email"-->
                         <!--:rules="[() => !!email || 'This field is required', emailCheck]"-->
                         <!--label="Please input your email"-->
                         <!--placeholder="e.g.xxx@xx.com"-->
                         <!--required>-->
        <!--</v-text-field>-->
          <v-btn flat outline color="orange" @click="submit">Get email</v-btn>
          <v-card-text>
            <p class="typo__p red--text" v-if="submitStatus === 'ERROR'">Please input all the fields correctly.</p>
            <p class="typo__p red--text" v-if="isSent === 'NO'">{{message}}</p>
            <p class="typo__p green--text" v-if="isSent === 'YES'">{{message}}</p>
            <p class="typo__p orange--text" v-if="submitStatus === 'PENDING' && isSent === 'YES'"> Please waiting...</p>
          <!--</v-card-text>-->
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CustomerService from '@/services/customerservice'
import AdminService from '@/services/adminservice'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
export default {
  name: 'forgetPass',
  data () {
    return {
      email: null,
      role: 'customer',
      isSent: null,
      submitStatus: null,
      message: '',
      errorMessages: '',
      emailRules: [
        v => !!v || 'Email is required',
        v => /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(v) || 'Wrong email format!'
      ]
    }
  },
  computed: {
    form () {
      return {
        email: this.email,
        role: this.role
      }
    }
  },
  methods: {
    submit () {
      let user = {'email': this.email}
      if (this.role === 'customer') {
        CustomerService.forgetPass(user).then(response => {
          if (!user) {
            this.message = 'Wrong email!'
            // this.isSent = 'NO'
          } else {
            this.isSent = 'YES'
            this.message = 'Your password has been reset. Please check your email!'
            this.submitStatus = 'PENDING'
            this.$swal(this.message)
            this.$router.push('/Login')
          }
          console.log(response.data)
        })
      } else if (this.role === 'admin') {
        AdminService.forgetPass(user).then(response => {
          if (!user) {
            this.message = 'Wrong email!'
            console.log(this.message)
            // this.isSent = 'NO'
          } else {
            this.isSent = 'YES'
            this.message = 'Your password has been reset. Please check your email!'
            this.submitStatus = 'PENDING'
            this.$swal(this.message)
            this.$router.push('/Login')
          }
          console.log(response.data)
        })
      }
    }
  }
}

</script>

<style scoped>

</style>
