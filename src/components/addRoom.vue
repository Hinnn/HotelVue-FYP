<template>
    <div>
      <v-layout justify-center>
        <v-flex xs12 sm10 md8 lg6>
          <v-card>
            <v-card-title>
              {{messagetitle}}
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
              <add-room-form :room="room" @room-is-added-updated="addRoom"></add-room-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
</template>

<script>
import RoomService from '@/services/roomservice'
import RoomForm from '@/components/room'
export default {
  name: 'addRoom',
  data () {
    return {
      product: {},
      messagetitle: 'Add Room'
    }
  },
  components: {
    'add-room-form': RoomForm
  },
  methods: {
    addProduct: function (room) {
      let user = sessionStorage.getItem('email')
      RoomService.addRoom(user, room).then(response => {
      })
        .catch(error => {
          this.errors.push(error)
        })
    }
  }
}
</script>
