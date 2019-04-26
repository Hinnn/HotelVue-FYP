<template>
  <v-container grid-list-xl id="subscribe" tag="section">
    <v-layout row wrap justify-center class="my-5">
      <v-flex xs12 sm6>
        <v-card class="elevation-0 transparent">
          <v-card-title primary-title class="layout justify-center">
            <div class="headline">Find Our Location</div>
          </v-card-title>
          <v-flex xs12 sm12>
            <div>
              <div>
                <label>
                  <gmap-autocomplete @place_changed="setPlace">
                  </gmap-autocomplete>
                  <button @click="addMarker">Add</button>
                </label>
                <br/>

              </div>
              <br>
              <gmap-map
                :center="center"
                :zoom="12"
                style="width:100%;  height: 400px;"
              >
                <gmap-marker
                  :key="index"
                  v-for="(m, index) in markers"
                  :position="m.position"
                  @click="center=m.position"
                ></gmap-marker>
              </gmap-map>
            </div>
          </v-flex>
        </v-card>
      </v-flex>
      <v-flex xs12 sm4 offset-sm1>
        <!--<v-card class="elevation-0 transparent">-->
          <!--<v-card-title primary-title class="layout justify-center">-->
            <!--<div class="headline">Contact us</div>-->
          <!--</v-card-title>-->
          <!--<v-card-text>-->
            <!--<div>-->
            <!--If you have any questions, do not hesitate!-->
            <!--</div>-->
            <!--<div>-->
            <!--Just contact us!-->
            <!--</div>-->
          <!--</v-card-text>-->
          <!--<v-list class="transparent">-->
            <!--<v-list-tile>-->
              <!--<v-list-tile-action>-->
                <!--<v-icon class="blue&#45;&#45;text text&#45;&#45;lighten-2">phone</v-icon>-->
              <!--</v-list-tile-action>-->
              <!--<v-list-tile-content>-->
                <!--<v-list-tile-title>Contact Phone Number</v-list-tile-title>-->
              <!--</v-list-tile-content>-->
            <!--</v-list-tile>-->
            <!--<v-list-tile>-->
              <!--<v-list-tile-action>-->
                <!--<v-icon class="blue&#45;&#45;text text&#45;&#45;lighten-2">place</v-icon>-->
              <!--</v-list-tile-action>-->
              <!--<v-list-tile-content>-->
                <!--<v-list-tile-title>Hotel Location</v-list-tile-title>-->
              <!--</v-list-tile-content>-->
            <!--</v-list-tile>-->
            <!--<v-list-tile>-->
              <!--<v-list-tile-action>-->
                <!--<v-icon class="blue&#45;&#45;text text&#45;&#45;lighten-2">email</v-icon>-->
              <!--</v-list-tile-action>-->
              <!--<v-list-tile-content>-->
                <!--<v-list-tile-title>Contact Email</v-list-tile-title>-->
              <!--</v-list-tile-content>-->
            <!--</v-list-tile>-->
          <!--</v-list>-->
        <!--</v-card>-->
        <v-card-title primary-title class="layout justify-center">
        <div class="headline">CONTACT</div>
        </v-card-title>
        <!--<base-title class="font-weight-bold">CONTACT</base-title>-->
        <v-list class="transparent">
        <v-list-tile>
        <v-icon color="teal darken-2">email</v-icon>
        <v-list-tile-title>EMAIL</v-list-tile-title>
        <v-list-tile-sub-title>
        Contact Email
        </v-list-tile-sub-title>
        </v-list-tile>
        <v-list-tile>
        <v-icon color="teal darken-2">place</v-icon>
        <v-list-tile-title>ADDRESS</v-list-tile-title>
        <v-list-tile-sub-title>
        Hotel Address
        </v-list-tile-sub-title>
        </v-list-tile>
        <v-list-tile>
        <v-icon color="teal darken-2">local_phone</v-icon>
        <v-list-tile-title>PHONE</v-list-tile-title>
        <v-list-tile-sub-title>
        Phone Number
        </v-list-tile-sub-title>
        </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
// export default {
//   name: 'Home',
//   methods: {
//     OpenMap () {
//       this.$router.push('/GoogleMap')
//     }
//   }
// }
export default {
  name: 'Subscribe',
  data () {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 52.25, lng: -7.12 },
      markers: [],
      places: [],
      currentPlace: null
    }
  },
  mounted () {
    this.geolocate()
  },
  methods: {
    // receives a place object via the autocomplete component
    setPlace (place) {
      this.currentPlace = place
    },
    addMarker () {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    }
  }
}
</script>
