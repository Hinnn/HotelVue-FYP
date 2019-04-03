<template>
  <div class="hero" id="room">
    <customerLine />
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <table align="center">
    </table>
    <div id="app1">
      <v-client-table :columns="columns" :data="rooms" :options="options">
        <a slot="upvote" slot-scope="props" class="fa fa-thumbs-up-alt fa-2x" @click="upvote(props.row.roomNum)"></a>
        <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteRoom(props.row.roomNum)"></a>
      </v-client-table>
    </div>
  </div>
</template>
<!--<template>-->
  <!--<div id="roomCard">-->
  <!--<v-layout>-->
  <!--<v-flex xs12 sm6 offset-sm3>-->
    <!--<v-card>-->
      <!--<v-container v-bind="{ [`grid-list-${size}`]: true }" fluid>-->
        <!--<v-layout row>-->
          <!--<v-flex :key=1 xs4>-->
            <!--<v-card flat tile>-->
              <!--<v-img src="/static/images/003.jpg" height="150px"></v-img>-->
            <!--</v-card>-->
          <!--</v-flex>-->
        <!--</v-layout>-->
        <!--<v-spacer></v-spacer>-->
        <!--<v-layout row>-->
          <!--<v-flex :key=1 xs4>-->
            <!--<v-card flat tile>-->
              <!--<v-img src="/static/images/004.jpg" height="150px"></v-img>-->
            <!--</v-card>-->
          <!--</v-flex>-->
        <!--</v-layout>-->
        <!--<v-spacer></v-spacer>-->
        <!--<v-layout row>-->
          <!--<v-flex :key=1 xs4>-->
            <!--<v-card flat tile>-->
              <!--<v-img src="/static/images/005.jpg" height="150px"></v-img>-->
            <!--</v-card>-->
          <!--</v-flex>-->
        <!--</v-layout>-->
      <!--</v-container>-->
    <!--</v-card>-->
  <!--</v-flex>-->
  <!--</v-layout>-->
  <!--</div>-->
<!--</template>-->
<script>
import RoomService from '@/services/roomservice'
import Vue from 'vue'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'Rooms',
  data () {
    return {
      size: 'sm',
      rooms: [],
      props: ['roomNum'],
      errors: [],
      columns: ['roomNum', 'roomType', 'price', 'upvotes', 'upvote'],
      options: {
        perPage: 10,
        filterable: ['roomNum', 'roomType', 'price'],
        sortable: ['upvotes'],
        headings: {
          roomNum: 'roomNum',
          roomType: 'Type',
          price: 'price',
          upvotes: 'Upvotes'
        }
      }
    }
  },
  components: {

    customerLine: () => import('@/components/customerLine')
  },
  // Fetches Donations when the component is created.
  created () {
    this.loadRooms()
  },
  methods: {
    loadRooms: function () {
      RoomService.fetchRooms()
        .then(response => {
          // JSON responses are automatically parsed.
          this.rooms = response.data
          console.log(this.rooms)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    upvote: function (roomNum) {
      RoomService.upvoteRoom(roomNum)
        .then(response => {
          // JSON responses are automatically parsed.
          this.loadRooms()
          console.log(response)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    // Fetches Bookings when the component is created
    deleteRoom: function (roomNum) {
      let user = sessionStorage.getItem('email')
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
          RoomService.deleteRoom(user, roomNum)
            .then(response => {
              // JSON responses are automatically parsed.
              this.message = response.data
              console.log(this.message)
              this.loadRooms()
              // Vue.nextTick(() => this.$refs.vuetable.refresh())
              this.$swal('Deleted', 'You successfully deleted this Room ' + JSON.stringify(response.data, null, 5), 'success')
            })
            .catch(error => {
              this.$swal('EREOR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          console.log(' SWAL Else Result: ' + result.value)
          this.$swal('Cancelled', 'This room Still Exist!', 'info')
        }
      })
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 60%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
