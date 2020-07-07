<template lang="html">
  <v-form>
    <v-container>
      <v-row>
       <v-col cols="12" sm="12" md="12" lg="6">
  
        <p  class="mx-auto" justify-center>Login</p>
     <v-text-field
            v-model="email"
            solo
            label="Prepend inner"
            prepend-inner-icon="mdi-map-marker"
          ></v-text-field>

       <v-text-field
            v-model="password"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            @click:append="show1 = !show1"
            solo
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            label="Prepend inner"
            prepend-inner-icon="mdi-map-marker"
         ></v-text-field>
  <v-btn
      :loading="loading3"
      :disabled="loading3"
      color="blue-grey"
      class="ma-2 white--text"
      @click.prevent="authenticate"
    >
      Login
      <v-icon right dark>mdi-account</v-icon>
    </v-btn>
  <p class="ma-3 ma-md-1">Dont have an account ?</p> 
 <v-btn> <router-link to="/signup" tag='span'>Create account</router-link> </v-btn>
    </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      show1: false,
      email: '',
      password: ''
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
                {authUser: response.data, isAuthenticated: true}
              )
              this.$router.push({name: 'Home'})
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
.v-text-field{
      width: 400px;
}
</style>