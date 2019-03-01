
<template>
  <div id="logout" data-app>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Log Out</v-card-title>
          <v-card-text>Are you totally sure to log out?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click="cancelDialog">Cancel</v-btn>
            <v-btn color="green darken-1" flat="flat" @click="LogOut">Log Out</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import AdminService from '@/services/adminservice'
import Vue from 'vue'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)

export default {
  name: 'LogOut',
  props: ['dialog'],
  data () {
    return {
      openStatus: this.dialog
    }
  },
  methods: {
    cancelDialog () {
      this.openStatus = false
      this.$emit('update-dialog', this.openStatus)
    },
    LogOut () {
      AdminService.Logout()
        .then(response => {
          this.$cookies.remove('user')
          this.openStatus = false
          this.$emit('update-dialog', this.openStatus)
          this.$router.go(0)
          this.$router.push('/')
        })
    }
  }
}
</script>

<style scoped>
  #signout{
    min-width: 500px;
    margin-top: 100px;
  }
</style>
