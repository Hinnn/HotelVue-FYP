<template>
    <div id="EditInfo">
      <v-layout justify-center>
        <v-flex xs12 sm10 md8 lg6>
          <v-card ref="form" id="EditInfoCard" v-model="valid" lazy-validation>
            <v-card-title class="display-1 pl-5 pt-5">Edit Info</v-card-title>
            <v-card-text>
              <v-text-field
                ref="phoneNum"
                label="phoneNum"
                platholder="10 digital numbers"
                prepend-icon="phone"
              >
              </v-text-field>
              <v-text-field
                ref="Gender" v-model="Gender"
                label="Gender"
                platholder="male/female"
                prepend-icon="edit"
              >
              </v-text-field>
  <v-menu
    ref="menu" v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
  >
    <template slot="activator">
      <v-text-field
        v-model="date"
        label="Birthday date"
        prepend-icon="event"
        readonly
      ></v-text-field>
    </template>
    <v-date-picker
      ref="picker"
      v-model="date"
      :max="new Date().toISOString().substr(0, 10)"
      @change="save"
    ></v-date-picker>
  </v-menu>
            </v-card-text>
            <v-card-actions>
              <v-btn flat large @click="submit">Submit</v-btn>
              <v-btn flat large @click="clear">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
</template>
<script>
export default {
  data: () => ({
    date: null,
    phoneNum: null,
    Gender: null,
    menu: false
  }),
  watch: {
    menu (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    clear () {
      this.$v.$reset()
      this.date = ''
      this.phoneNum = ''
      this.Gender = ''
      // this.checkbox = false
    }
  }
}
</script>
