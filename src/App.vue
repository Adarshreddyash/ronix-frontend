<template>
  <v-app>
    <v-app-bar
      app
      dark
      dense
    >
      <div class="d-flex align-center">
       <v-toolbar-title >Ronix</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
   
     <v-btn icon>
        <router-link to="/" tag="icon"><v-icon>mdi-home</v-icon></router-link>
      </v-btn>
    
      <v-btn icon>
         <router-link to="/songs" tag="icon"><v-icon>mdi-playlist-music</v-icon></router-link>
      </v-btn>
    
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
  
  <div v-if="isLoggedin">
   <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
          v-bind="attrs"
          v-on="on"
          icon
          @click="userdetails()"
        >
        <v-avatar size="27">
          <img icon :src="userdetails.avatar" alt="Profile">
        </v-avatar>

        </v-btn>

      </template>
 
      <v-list>
        <v-list-item
        >
         <v-list-item-content>
              <v-list-item-title><v-icon class="ma-1">mdi-account-circle</v-icon>{{ userdetails.profile_name }}</v-list-item-title>
               <v-divider></v-divider>
              <v-list-item-subtitle><v-icon class="ma-1">mdi-email-check</v-icon>{{ userdetails.email }}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-btn
              small
              color="primary"
              dark
            >
              Log out
            </v-btn>
    </v-menu>
</div>

<div v-else>
  <v-btn icon>
    <v-icon>mdi-magnify</v-icon>
  </v-btn>
</div>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>
import axios from 'axios'

export default {
  name: 'App',

  components: {

  },

  data() {
    return{
        links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us',
      ],
      userdetails:[],
      isLoggedin: false,
      }
  },
 

 mounted() {
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
          const axiosInstance = axios.create(base)
          axiosInstance({
            url: "http://127.0.0.1:8000/rest-auth/user/",
            method: "get",
            params: {}
          })
            .then((response) => {
               this.userdetails = response.data
               this.isLoggedin = true
               console.log("Successfully loaded user details")
            })

        .catch(e => {
      this.errors.push(e)
      console.log("Error loading user details")
    })
 }
};
</script>

<style lang="css">
.v-snack__wrapper.theme--dark{
  background-color:#333333c7!important;
}
</style>
