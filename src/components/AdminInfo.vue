<template>
  <div id="admininfo">
    <adminLine />
    <!--<v-container fluid>-->
    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6>
        <v-card>
          <v-card-title primary-title>
            <div class="headline">Admin ID: {{userId}}</div>
          </v-card-title>
          <v-card-title primary-title>
            <div class="headline">Name: {{userName}}</div>
          </v-card-title>
          <v-card-title primary-title>
            <div class="headline">Email: {{userEmail}}</div>
          </v-card-title>
          <v-card-title primary-title>
            <div class="headline">Register Date: {{registerDate}}</div>
          </v-card-title>
          <v-card-actions>
            <v-layout justify-center row>
              <v-btn depressed color="primary" flat @click="editUser">Edit Account</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <!--</v-container>-->
  </div>
</template>

<script>
import AdminService from '@/services/adminservice'
export default {
  name: 'AdminInfo',
  components: {

    adminLine: () => import('@/components/adminLine')
  },
  data () {
    return {
      user: {},
      data: {},
      isAdmin: false,
      userId: '',
      userName: '',
      userEmail: '',
      registerDate: '',
      name: '',
      adminID: '',
      register_date: ''
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    getUser () {
      this.userEmail = sessionStorage.getItem('email')
      this.user_role = sessionStorage.getItem('role')
      if (this.user_role === 'admin') {
        this.isAdmin = true
        console.log(this.user_role)
        console.log(this.userEmail)
        AdminService.fetchAdmin(this.userEmail)
          .then(response => {
            this.user = response.data
            console.log(response.data)
            console.log(this.user)
            console.log('Getting user: ' + JSON.stringify(this.user, null, 5))
            this.userId = this.user[0].adminID
            this.userName = this.user[0].name
            // console.log(this.userName)
            this.registerDate = this.user[0].register_date
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
