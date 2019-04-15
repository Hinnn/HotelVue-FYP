<template>
  <div class="hero" id="app2">
    <adminLine />
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>Rooms</h3>
      <v-client-table :columns="columns" :data="rooms" :options="options">
        <!--<v-text>Check in Date: {{props.row.checkin_date|moment}} </v-text>-->
        <!--<v-avatar :size="40">-->
          <!--<img :src="props.row.roomImage.path[0]" v-if="props.row.roomImage !== null">-->
        <!--</v-avatar>-->
        <v-btn flat icon color="indigo" slot="edit" slot-scope="props" @click="editRoom(props.row.roomID)">
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn flat icon color="indigo" slot="remove" slot-scope="props" @click="deleteRoom(props.row.roomID)">
          <v-icon>delete</v-icon>
        </v-btn>
      </v-client-table>
    <v-btn class="ml-0 hidden-sm-and-down" flat @click="addRoom">
      add rooms
    </v-btn>
  </div>
</template>
<script>
import RoomService from '@/services/roomservice'
import Vue from 'vue'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'RoomList',
  data () {
    return {
      rooms: [],
      props: ['room'],
      errors: [],
      childDataLoaded: false,
      columns: ['roomType', 'roomID', 'price', 'people', 'bedType', 'roomImage', 'edit', 'remove'],
      options: {
        perPage: 10,
        filterable: ['roomType', 'price', 'isEmpty'],
        headings: {
          roomType: 'Room Type',
          roomID: 'Room Number',
          price: 'Price',
          people: 'Amount of people',
          bedType: 'beds',
          roomImage: 'Image'
        }
      },
      imgURL: '',
      isShowData: false
    }
  },
  components: {

    adminLine: () => import('@/components/adminLine')
  },
  created () {
    this.loadRooms()
  },
  methods: {
    addRoom () {
      this.$router.push('/addRoom')
    },
    loadRooms: function () {
      RoomService.fetchRooms()
        .then(response => {
          // JSON responses are automatically parsed.
          this.rooms = response.data
          console.log(this.rooms)
          this.isShowData = true
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    editRoom: function (roomID) {
      this.$router.params = roomID
      this.$router.push('/editRoom')
    },
    deleteRoom: function (roomID) {
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
          let user = sessionStorage.getItem('email')
          let token = sessionStorage.getItem('token')
          RoomService.deleteRoom(user, roomID, token)
            .then(response => {
              // JSON responses are automatically parsed.
              this.message = response.data
              console.log(this.message)
              this.loadRooms()
              this.$swal('Deleted', 'You successfully deleted this Room ' + JSON.stringify(response.data, null, 5), 'success')
            })
            .catch(error => {
              this.$swal('EREOR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          console.log(' SWAL Else Result: ' + result.value)
          this.$swal('Cancelled', 'Room Still Exist!', 'info')
        }
      })
    }

  }
}
</script>

<style scoped>
  #app2 {
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
