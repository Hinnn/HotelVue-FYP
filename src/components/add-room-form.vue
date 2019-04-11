<template>
  <form @submit.prevent="submit">
    <v-card ref="form" id="add-roomCard">
      <!--<v-card-title class="display-1 pl-5 pt-5">Reserve a room</v-card-title>-->
      <v-card-text>
        <v-select v-model="roomType" :rules="[() => !!roomType || 'This field is required']"
                  :items="items" label="Room Type"
        ></v-select>
        <v-text-field
          v-model="price" :rules="[() => !!price || 'This field is required']"
          label="Price"
          required
          class="form__input"
        ></v-text-field>
        <v-text-field
          ref="roomID" v-model="roomID" :rules="[() => !!roomID || 'This field is required']"
          label="Room Number"
          required class="form__input">
        </v-text-field>
        <v-select v-model="people"
                  :items="items1" label="People Amount"
        ></v-select>
        <v-text-field
          ref="isEmpty" v-model="isEmpty" label="Empty"
          required default="true" class="form__input">
        </v-text-field>
      </v-card-text>
      <v-divider class="mt-5"></v-divider>
      <v-card-actions>
        <v-btn outline color="indigo" flat @click="submit" :disabled="submitStatus === 'PENDING'">Add</v-btn>
        <!--<v-btn outline color="indigo" flat @click="clear">Cancel</v-btn>-->
      </v-card-actions>
      <v-card-text>
        <p class="typo__p red--text" v-if="submitStatus === 'ERROR'">Please input all the fields correctly.</p>
        <p class="typo__p red--text" v-if="isAdded === 'NO'">{{message}}</p>
        <p class="typo__p green--text" v-if="isAdded === 'YES'">{{message}}</p>
        <p class="typo__p orange--text" v-if="submitStatus === 'PENDING'"> Please waiting...</p>
      </v-card-text>
    </v-card>
  </form>
  <!--</v-flex>-->
  <!--</v-layout>-->
  <!--</div>-->
</template>

<script>
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'from-control-danger'
  }
})
Vue.use(Vuelidate)
export default {
  name: 'add-room-form',
  // props: ['booking'],
  data () {
    return {
      roomType: '',
      roomID: '',
      people: '',
      price: '',
      isEmpty: true,
      formErrors: false,
      submitStatus: null,
      isAdded: null,
      message: '',
      errorMessages: '',
      items: ['double', 'single', 'family'],
      items1: ['1', '2', '3']
    }
  },
  computed: {
    form () {
      return {
        roomType: this.roomType,
        roomID: this.roomID,
        price: this.price,
        people: this.people,
        isEmpty: true
      }
    }
  },
  watch: {
    name () {
      this.errorMessages = ''
    }
  },
  methods: {
    submit () {
      this.formErrors = false
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formErrors = true
      })
      if (this.formErrors === false) {
        var room = {
          roomType: this.roomType,
          roomID: this.roomID,
          price: this.price,
          people: this.people,
          isEmpty: true
        }
        this.room = room
        console.log('Submitting in RoomForm : ' +
            JSON.stringify(this.room, null, 5))
        this.$emit('room-is-created-updated', this.room)
      }
    }
  }
}
</script>
<style scoped>

</style>
