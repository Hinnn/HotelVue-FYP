<template>
  <div class="hero">
    <adminLine />
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>Customer List</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="customers" :options="options">
        <v-btn flat icon color="indigo" slot="remove" slot-scope="props" @click="deleteCustomer(props.row.email)">
          <v-icon>delete</v-icon>
        </v-btn>
      </v-client-table>
    </div>
  </div>
</template>

<script>
import CustomerService from '@/services/customerservice'
import Vue from 'vue'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'customerList',
  data () {
    return {
      customers: [],
      props: ['customer'],
      errors: [],
      childDataLoaded: false,
      columns: ['_id', 'email', 'name', 'Gender', 'DateOfBirth', 'phoneNum', 'remove'],
      options: {
        perPage: 10,
        filterable: ['email'],
        headings: {
          _id: 'Customer ID',
          email: 'Email',
          name: 'Name',
          phoneNum: 'Phone number',
          DateOfBirth: 'Birthday',
          Gender: 'Gender'
        }
      }
    }
  },
  components: {

    adminLine: () => import('@/components/adminLine')
  },
  // Fetches Bookings when the component is created.
  created () {
    this.loadCustomers()
    // this.getCustomer()
  },
  methods: {
    loadCustomers: function () {
      this.email = sessionStorage.getItem('email')
      this.id = sessionStorage.getItem('id')
      this.user_role = sessionStorage.getItem('role')
      if (this.user_role === 'admin') {
        console.log(this.email)
        CustomerService.fetchCustomers(this.email)
          .then(response => {
          // JSON responses are automatically parsed.
            this.customers = response.data
            console.log(this.customers)
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
      } else {
        console.log('You can not do this operation!')
      }
    },
    // getCustomer: function () {
    //   CustomerService.fetchCustomer(this.$router.params).then(response => {
    //     this.customer = response.data
    //     this.childDataLoaded = true
    //     console.log(this.customer)
    //   })
    //     .catch(error => {
    //       this.errors.push(error)
    //       console.log(error)
    //     })
    // },
    deleteCustomer: function (email) {
      this.$swal({
        title: 'Are you totally sure:',
        text: 'You can\'t Undo this action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK Delete it',
        cancelButtonText: 'Cancel',
        showCloseButton: true
        // showLoaderOnConfirm: true
      }).then((result) => {
        console.log('SWAL Result : ' + result.value)
        if (result.value === true) {
          this.user = sessionStorage.getItem('email')
          // this.id = sessionStorage.getItem('id')
          this.user_role = sessionStorage.getItem('role')
          if (this.user_role === 'admin') {
            console.log(this.user)
            CustomerService.deleteCustomer(this.user, email)
              .then(response => {
                // JSON responses are automatically parsed.
                // console.log(email)
                this.message = response.data
                console.log(this.message)
                this.loadCustomers()
                // Vue.nextTick(() => this.$refs.vuetable.refresh())
                this.$swal('Deleted', 'You successfully deleted this customer ' + JSON.stringify(response.data, null, 5), 'success')
              })
              .catch(error => {
                this.$swal('EREOR', 'Something went wrong trying to Delete ' + error, 'error')
                this.errors.push(error)
                console.log(error)
              })
          } else {
            console.log(' SWAL Else Result: ' + result.value)
            this.$swal('Cancelled', 'Customer Still Exist!', 'info')
          }
        }
      })
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 80%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
