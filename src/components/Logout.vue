<template>
  <div id="logout" data-app>
    <v-container>
      <v-layout row justify-center>
        <v-card id="logoutCard" flat style="width: 80%">
          <v-card-title class="headline">Log Out</v-card-title>
          <v-card-text>Are you totally sure to log out?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click="cancelDialog">Cancel</v-btn>
            <v-btn color="green darken-1" flat="flat" @click="LogOut">Log Out</v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import AdminService from '@/services/adminservice'
import CustomerService from '@/services/customerservice'
import Vue from 'vue'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)

export default {
  name: 'LogOut',
  props: ['dialog'],
  data () {
    return {
      openStatus: this.dialog,
      islogin: false
    }
  },
  methods: {
    cancelDialog () {
      this.openStatus = false
      // this.$emit('update-dialog', this.openStatus)
      this.$router.push('/')
    },
    LogOut () {
      if (sessionStorage.getItem('token') === null) {
        this.$swal('Logout', 'You should login first ', 'info')
        this.islogin = false
        this.$router.push('/Login')
      } else {
        this.$swal({
          title: 'Logout',
          text: 'Are you sure?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Logout',
          cancelButtonText: 'Cancel',
          showCloseButton: true
          // showLoaderOnConfirm: true
        }).then((result) => {
          console.log('SWAL Result : ' + result.value)
          this.user_role = sessionStorage.getItem('role')
          if (result.value === true && this.user_role === 'customer') {
            CustomerService.Logout()
              .then(response => {
                console.log(response.data.data)
                sessionStorage.removeItem('email')
                sessionStorage.removeItem('role')
                sessionStorage.removeItem('token')
                this.islogin = false
                this.$router.push('/')
                this.$router.go(0)
                this.$router.push('/home')
                this.$swal('Logout', 'You successfully logout ', 'success')
                setTimeout(() => {
                  this.$router.push('/')
                }, 1000)
              })
          } else if (result.value === true && this.user_role === 'admin') {
            AdminService.Logout()
              .then(response => {
                console.log(response.data.data)
                sessionStorage.removeItem('email')
                sessionStorage.removeItem('role')
                sessionStorage.removeItem('token')
                this.islogin = false
                this.$router.push('/')
                this.$router.go(0)
                this.$router.push('/home')
                this.$swal('Logout', 'You successfully logout ', 'success')
                setTimeout(() => {
                  this.$router.push('/')
                }, 1000)
              })
          } else {
            console.log('SWAL Else Result : ' + result.value)
            this.$swal('Cancelled', 'You still in logging status!', 'info')
          }
        })
      }
      // this.user_role = sessionStorage.getItem('role')
      // if (this.user_role === 'customer') {
      //   CustomerService.Logout()
      //     .then(response => {
      //       console.log(response.data.data)
      //       sessionStorage.removeItem('email')
      //       sessionStorage.removeItem('role')
      //       sessionStorage.removeItem('token')
      //       this.openStatus = false
      //       // this.$emit('update-dialog', this.openStatus)
      //       this.$router.push('/')
      //       this.$router.go(0)
      //       this.$router.push('/home')
      //     })
      // } else if (this.user_role === 'admin') {
      //   AdminService.Logout()
      //     .then(response => {
      //       console.log(response.data.data)
      //       sessionStorage.removeItem('email')
      //       sessionStorage.removeItem('role')
      //       sessionStorage.removeItem('token')
      //       this.openStatus = false
      //       // this.$emit('update-dialog', this.openStatus)
      //       this.$router.push('/')
      //       this.$router.go(0)
      //       this.$router.push('/home')
      //     })
      // }
    }
  }
}
</script>

<style scoped>
  #logout{
    min-width: 500px;
    margin-top: 100px;
  }
</style>
