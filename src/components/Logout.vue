<meta name="viewpoint" content="width=device-width, initial-scale=1"/>
<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-info" style="padding: 3px"></i>{{messagetitle}}</h3>
    <p>
      <button class="btn btn-primary btn1" @click="Logout()">Logout</button>
    </p>
  </div>
</template>

<script>
// import CustomerService from '@/services/CustomerService'

export default {
  name: 'Logout',
  data () {
    return {
      messagetitle: ' Logout '
    }
  },
  /* created () {
      this.fetchCustomer()
    }, */
  methods: {
    Logout: function () {
      this.$swal({
        title: 'Are you totally sure:',
        text: 'You can\'t Undo this action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK Logout',
        cancelButtonText: 'Cancel',
        showCloseButton: true
      }).then((result) => {
        console.log('SWAL Result : ' + result.value)
        if (result.value === true) {
          // CustomerService.Logout()
          // .then(response => {
          // JSON responses are automatically parsed.
          // this.message = response.data
          console.log(this.message)
          // this.loadBookings()
          this.$swal('Logged out', 'Successfully Logout ')
          this.$router.push('Home')
        } else {
          console.log(' SWAL Else Result: ' + result.value)
          this.$swal('Cancelled', 'Logout cancelled!', 'info')
        }
      })
    }
  }
}

</script>

<style scoped>
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
