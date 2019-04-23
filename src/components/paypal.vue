<template>
  <div>
    <div id="paypal-button-container"></div>
    <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <div v-if="success">
        <v-alert :value="true" color="success" icon="check_circle" transition="scale-transition">
          Payment successfully done.
        </v-alert>
      </div>
      <div v-if="error">
        <v-alert :value="true" color="error" icon="warning" transition="scale-transition">
          Payment failed! Something went wrong.
        </v-alert>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import BookingService from '@/services/bookingservices'
import PayPal from 'paypal-checkout'
export default {
  name: 'PayPal',
  props: ['amount', 'id'],
  data () {
    return {
      error: false,
      success: false,
      dialog: false
      // paymentCon: false
    }
  },
  watch: {
    dialog (val) {
      if (!val) {
        return val
      } else {
        setTimeout(() => {
          this.dialog = false
          this.$router.go(-1)
        }, 3000)
      }
    }
  },
  // created () {
  //   this.changePayment()
  // },
  methods: {
    sendDataPaypal (creds) {
      let id = sessionStorage.getItem('booking_id')
      // let paymentCon = false
      BookingService.Pay(id, creds).then(response => {
        this.dialog = true
        console.log(sessionStorage.getItem('booking_id'))
        if (response.data.data) {
          this.success = false
          this.error = true
          console.log(response.data.data)
          this.error = false
          this.success = true
          // paymentCon = true
          // if (this.success) {
          let updateOne = {
            payment_status: 'paid',
            paymentId: creds.data.paymentID
          }
          console.log(updateOne)
          BookingService.changePayment(id, updateOne)
            .then(response => {
              console.log(response.data.data)
              console.log(id)
              console.log('After editing: ' + JSON.stringify(this.booking, null, 5))
            }).catch(error => {
              console.log(error.response)
            })
        } else {
          this.success = false
          this.error = true
        }
      })
      console.log(creds)
    }
  },
  mounted () {
    let client = {
      sandbox: 'AYmbmd0DChOgUMMw9FDaAUxA1byQSqOZhMM3Fcmp_HtSZxM6z_0n6qGgT52ziEaUbr6Bimdr_lml5uO_'
    }
    let payment = (data, actions) => {
      // console.log(this.item)
      // Make a call to the REST api to create the payment
      return actions.payment.create({
        payment: {
          transactions: [
            {
            //   item_list: {
            //     items: [
            //       {
            //         name: this.item.name,
            //         // name: 'room',
            //         sku: '101',
            //         // price: '20',
            //         price: this.item.price.toString(),
            //         currency: 'EUR',
            //         // quantity: 1
            //         quantity: parseInt(this.item.amount, 10)
            //       }
            //     ]
            //   },
              amount: {
                currency: 'EUR',
                total: sessionStorage.getItem('total')
                // total: this.total,
                // details: {
                //   subtotal: '0',
                //   // subtotal: this.subtotal,
                //   tax: '0'
                // }
              }
            }
          ]
        }
      })
    }
    let onAuthorize = (data) => {
      var paymentdata = {
        paymentID: data.paymentID,
        payerID: data.payerID,
        amount: sessionStorage.getItem('total')
      }
      this.sendDataPaypal({data: paymentdata})
    }
    PayPal.Button.render({
      env: 'sandbox',
      commit: true,
      style: {
        label: 'paypal',
        size: 'medium',
        shape: 'pill',
        color: 'gold',
        tagline: false
      },
      client,
      payment,
      onAuthorize
    }, '#paypal-button-container')
  }
}
</script>

<style scoped>
</style>
