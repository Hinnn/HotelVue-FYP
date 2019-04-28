<template>
    <div id="accountinfo">
      <customerLine />
      <v-container grid-list-md text-xs-center>
      <v-layout justify-center row>
        <v-flex xs12 sm10 md8 lg6>
              <v-card>
                <v-card-title primary-title>
                  <div class="headline">Account ID: {{userId}}</div>
                </v-card-title>
                <v-card-title primary-title>
                  <div class="headline">Name: {{userName}}</div>
                </v-card-title>
                <v-card-title primary-title>
                  <div class="headline">Email: {{userEmail}}</div>
                </v-card-title>
                  <v-card-title primary-title>
                  <div class="headline">Birthday: {{birthday|moment}}</div>
                  </v-card-title>
                    <v-card-title primary-title>
                  <div class="headline">Gender: {{gender}}</div>
                    </v-card-title>
                      <v-card-title primary-title>
                  <div class="headline">Phone Number: {{phone}}</div>
                </v-card-title>
                <v-card-title primary-title>
                  <div class="headline">Register Date: {{registerDate|moment}}</div>
                </v-card-title>
                <v-card-actions>
                  <v-layout justify-center row>
                    <v-btn depressed color="primary" flat @click="editUser">Edit Account</v-btn>
                    <v-btn depressed color="primary" flat @click="changePassword">Change Password</v-btn>
                  </v-layout>
                </v-card-actions>
              </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
</template>

<script>
import CustomerService from '@/services/customerservice'
// import AdminService from '@/services/adminservice'
export default {
  name: 'AccountInfo',
  components: {

    customerLine: () => import('@/components/customerLine')
  },
  data () {
    return {
      user: {},
      data: {},
      isCustomer: false,
      isAdmin: false,
      userId: '',
      userName: '',
      userEmail: '',
      gender: '',
      registerDate: '',
      birthday: '',
      phone: '',
      name: '',
      DateOfBirth: '',
      Gender: '',
      phoneNum: '',
      id: '',
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
      if (this.user_role === 'customer') {
        this.isCustomer = true
        this.isAdmin = false
        console.log(this.user_role)
        console.log(this.userEmail)
        CustomerService.fetchCustomer(this.userEmail)
          .then(response => {
            this.user = response.data
            // console.log(response.data)
            // console.log(this.user)
            console.log('Getting user: ' + JSON.stringify(this.user, null, 5))
            this.userId = this.user[0]._id
            this.userName = this.user[0].name
            // console.log(this.userName)
            this.phone = this.user[0].phoneNum
            this.gender = this.user[0].Gender
            this.birthday = this.user[0].DateOfBirth
            this.registerDate = this.user[0].register_date
          })
      }
      // } else if (this.user_role === 'admin') {
      //   this.isCustomer = false
      //   this.isAdmin = true
      //   console.log(this.user_role)
      //   console.log(this.userEmail)
      //   AdminService.fetchAdmin(this.userEmail)
      //     .then(response => {
      //       this.user = response.data
      //       console.log('Getting user: ' + JSON.stringify(this.user, null, 5))
      //       this.userName = this.user[0].name
      //       console.log(this.user)
      //     })
      //     .catch(error => {
      //       // this.errors.push(error)
      //       console.log(error)
      //     })
      // }
      //   // },
      //   getUser () {
      //     this.userEmail = sessionStorage.getItem('email')
      //     this.user_role = sessionStorage.getItem('role')
      //     if (this.user_role === 'customer') {
      //       this.isCustomer = true
      //       this.isAdmin = false
      //       console.log(this.user_role)
      //       console.log(this.userEmail)
      //       CustomerService.fetchCustomer(this.userEmail)
      //         .then(response => {
      //           this.user = response.data
      //           console.log(response.data)
      //           console.log(this.user)
      //           // this.userEmail = this.user.email
      //           this.userId = this.user._id
      //           // console.log(this.user._id)
      //           this.userName = this.user.name
      //           this.gender = this.user.Gender
      //           this.birthday = this.user.DateOfBirth
      //           this.phone = this.user.phoneNum
      //         // this.registerDate = this.user.register_date
      //         })
      //     } else if (this.user_role === 'admin') {
      //       this.isCustomer = false
      //       this.isAdmin = true
      //       AdminService.fetchAdmin(this.userEmail)
      //         .then(response => {
      //           this.user = response.data.data
      //           console.log(this.user)
      //           this.userName = this.user.name
      //           this.userEmail = this.user.email
      //         })
      //     }
      // }
    },
    editUser () {
      this.$router.push('/EditInfo')
    },
    changePassword () {
      this.$router.push('/changePassword')
    }
  }
}
</script>

<style scoped>

</style>
