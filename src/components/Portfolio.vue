<template lang="html" class="primary_bg">
<div class="primary_bg">
<v-container fluid class="mb-15">
  <v-layout row>
    <v-flex md6 lg6 sm12 xs12 x6>
      <img src="../assets/Chilling-at-Home/main_files/chilling.svg" width="95%">
     </v-flex>
    <v-flex md6 lg6 sm12 xs12 x6 pl-3>
      <h1 class="white--text font-weight-medium mt-16 d-sm-pl-8 d-xs-pl-6">Roni<span class="red--text">X</span></h1>
      <h2 class="white--text d-sm-pl-6">Discover great music <span class="yellow--text">that rules out </span></h2>
      <p class="white--text d-sm-pl-6">Music is eternal that has limitless potential in grasping and treating of great forces on the earth.However to get started login to your existing account or create one if you dont have.</p>
      <v-dialog v-model="dialog" scrollable max-width="300px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="black--text white"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Login
          </v-btn>
        </template>
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-2">
            <v-text-field
            v-model="email"
            solo
            label="Email"
            prepend-inner-icon="mdi-email"
          ></v-text-field>

       <v-text-field
            v-model="password"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            @click:append="show1 = !show1"
            solo
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            label="Password"
            prepend-inner-icon="mdi-account-key"
         ></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click.prevent="authenticate">login</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
<v-btn class="ml-2" outlined color="white"> <router-link to="/signup" tag='span'>Create account</router-link> </v-btn>
        <p><v-chip
      color="black"
      text-color="white"
      class="mt-12"
    >
      <v-avatar
        left
        class="red darken-4"
      >
        <v-icon size="16">mdi-newspaper-plus</v-icon>
      </v-avatar>
      Updated with Private Music streams >
    </v-chip></p>
    </v-flex>
  </v-layout>
  </v-container>
  <v-footer
   color="primary_bg"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-col
        class="text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Ronix music</strong>
        <p>Project by adarshreddyash</p>
      </v-col>
    </v-row>
  </v-footer>
</div>

</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      show1: false,
      email: '',
      password: '',
      dialog: false,
    }
  },
  methods: {
    authenticate () {
      const payload = {
        email: this.email,
        password: this.password
      }
      axios.post(this.$store.state.endpoints.obtainJWT, payload)
        .then((response) => {
          this.$store.commit('updateToken', response.data.token)
          // get and set auth user
          
          const base = {
            baseURL: this.$store.state.endpoints.baseUrl,
            headers: {
            // Set your Authorization to 'JWT', not Bearer!!!
              Authorization: `JWT ${this.$store.state.jwt}`,
              'Content-Type': 'application/json'
            },
            xhrFields: {
                withCredentials: true
            }
          }
          // Even though the authentication returned a user object that can be
          // decoded, we fetch it again. This way we aren't super dependant on
          // JWT and can plug in something else.
          const axiosInstance = axios.create(base)
          axiosInstance({
            url: "/rest-auth/user/",
            method: "get",
            params: {}
          })
            .then((response) => {
              this.$store.commit("setAuthUser",
                {authUser: response.data, isAuthenticated: true},
                sessionStorage.setItem(`userInfo`, JSON.stringify(response.data))
              )
              this.$router.push({name: 'Songs'})
            })

        })
        .catch((error) => {
          console.log(error);
          console.debug(error);
          console.dir(error);
        })
    }
  }
}
</script>

<style lang="css" scoped>
.primary_bg{
  background-color:#9921e8;
  background-image:linear-gradient(315deg, #9921e8 0%, #5f72be 74%);
}

.v-text-field{
      width: 400px;
}
</style>