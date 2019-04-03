<template>
  <v-container fill-height fluid>
    <v-layout row fill-height>
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
          <!--<v-text-field ref="email"&ndash;&gt;-->
                         <!--v-model="email"-->
                         <!--:rules="[() => !!email || 'This field is required', emailCheck]"-->
                         <!--label="Please input your email"-->
                         <!--placeholder="e.g.xxx@xx.com"-->
                         <!--required>-->
        <!--</v-text-field>-->
          <v-btn flat outline color="orange" @click="submit">Get email</v-btn>
          <v-card-text>
            <!--<p class="typo__p red&#45;&#45;text" v-if="submitStatus === 'ERROR'">Please input all the fields correctly.</p>-->
            <p class="typo__p red--text" v-if="Sent === 'NO'">{{message}}</p>
            <p class="typo__p green--text" v-if="Sent === 'YES'">{{message}}</p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CustomerService from '@/services/customerservice'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
export default {
  name: 'forgetPass',
  data () {
    return {
      email: null,
      emailRules: [
        v => !!v || 'Email is required',
        v => /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(v) || 'Wrong email format!'
      ]
    }
  },
  computed: {
    form () {
      return {
        email: this.email
      }
    }
  },
  methods: {
    submit () {
      let params = {'email': this.email}
      CustomerService.forgetPass(params).then(response => {
        if (!params) {
          this.message = 'Wrong email!'
          this.Sent = 'NO'
        } else {
          this.Sent = 'YES'
          this.message = 'Your password has been reset. Please check your email!'
          this.$router.push('/Login')
        }
        console.log(response.data)
      })
    }
  }
}

</script>

<style scoped>

</style>
