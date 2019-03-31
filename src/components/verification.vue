<template>
  <div id="verification">
    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6>
        <v-card ref="form" id="verificationCard">
          <v-card-title class="display-1 pl-5 pt-5">Email Verification</v-card-title>
          <v-card-text>
              <v-text-field ref="email"
                            :rules="[() => !!email || 'This field is required', emailCheck]"
                            v-model="email"
                            label="Email"
                            placeholder="e.g.xxx@xx.com" required>
              </v-text-field>
            <v-text-field ref="code"
                          v-model="code"
                          :rules="[() => !!code || 'This field is required']"
                          label="Code"
                          placeholder="Code in your email" required>
            </v-text-field>
            <v-radio-group v-model="role" :mandatory="false" row>
              <v-radio label="Customer" value="customer"></v-radio>
              <v-radio label="Administrator" value="admin"></v-radio>
            </v-radio-group>
          </v-card-text>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-btn color="primary" flat @click="submit">Verify</v-btn>
          </v-card-actions>
          <v-card-text>
            <p class="typo__p red--text" v-if="submitStatus === 'ERROR'">Wrong code!</p>
            <p class="typo__p red--text" v-if="isVerified === 'NO'">{{message}}</p>
            <p class="typo__p green--text" v-if="isVerified === 'YES'">{{message}}</p>
            <p class="typo__p orange--text" v-if="submitStatus === 'PENDING' && isVerified === 'YES'"> Please waiting...</p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import CustomerService from '@/services/customerservice'
import AdminService from '@/services/adminservice'

import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

export default {
  name: 'Email Verification',
  data: () => ({
    roles: ['Customer', 'Administrator'],
    errorMessages: '',
    code: null,
    role: 'customer',
    formError: false,
    submitStatus: null,
    isVerified: null,
    message: ''
  }),

  computed: {
    form () {
      return {
        code: this.code,
        role: this.role
      }
    }
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

    submit () {
      this.formError = false

      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formError = true
      })

      if (this.formError === false) {
        let user = {'email': this.email, 'code': this.code}
        if (this.role === 'customer') {
          CustomerService.Verification(user)
            .then(response => {
              if (!user) {
                this.message = 'Wrong code!'
                this.isVerified = 'NO'
              } else if ((Date.now() - user.register_date) > (1000 * 60 * 10)) {
                this.message = 'Timeout! Please sign up again!'
                this.isVerified = 'NO'
              } else {
                this.isVerified = 'YES'
                this.message = 'Congratulations! Your account has been verified!'
                this.submitStatus = 'PENDING'
                // this.$router.push('/Login')
              }
              console.log(response.data)
            })
        } else if (this.role === 'admin') {
          AdminService.Verification(user)
            .then(response => {
              if (!user) {
                this.message = 'Wrong code!'
                this.isVerified = 'NO'
              } else if ((Date.now() - user.register_date) > (1000 * 60 * 10)) {
                this.message = 'Timeout! Please sign up again!'
                this.isVerified = 'NO'
              } else {
                this.isVerified = 'YES'
                this.message = 'Congratulations! Your account has been verified!'
                this.submitStatus = 'PENDING'
                // this.$router.push('/Login')
              }
              console.log(response.data)
            })
        }
      }
    }
  }
}
</script>

<style scoped>
  #verificationCard {
    min-width: 500px;
  }
</style>
