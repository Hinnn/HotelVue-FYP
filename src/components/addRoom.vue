<template>
    <div id="addRoom">
      <adminLine/>
      <v-layout justify-center>
        <v-flex xs12 sm10 md8 lg6>
          <v-card ref="form" id="addRoomCard">
            <v-card-title class="display-1 pl-5 pt-5">Add a room</v-card-title>
            <v-card-text>
              <room-form :room="room" @room-is-created-updated="addRoom"></room-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
</template>

<script>
import RoomService from '@/services/roomservice'
import RoomForm from '@/components/add-room-form'
export default {
  name: 'addRoom',
  data () {
    return {
      room: {}
    }
  },
  components: {
    'room-form': RoomForm,
    adminLine: () => import('@/components/adminLine')
  },
  methods: {
    addRoom: function (room) {
      console.log(sessionStorage.getItem('token'))
      let user = sessionStorage.getItem('email')
      RoomService.addRoom(user, room).then(response => {
        console.log(response)
        this.message = response.data.message
        this.$router.push({path: '/'})
      })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    }
  }
}
</script>
<style scoped>
  #addRoom {
    width: 95%;
    margin: 0 auto;
  }
</style>
