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
  
  <div v-show="logus">
   <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
          v-bind="attrs"
          v-on="on"
          icon
        >
        <v-avatar size="27">
          <img icon :src="$store.state.authUser.avatar" alt="Profile">
        </v-avatar>

        </v-btn>

      </template>
 
      <v-list>
        <v-list-item
        >
         <v-list-item-content>
              <v-list-item-title><v-icon class="ma-1">mdi-account-circle</v-icon>{{ userDetails.profile_name }}</v-list-item-title>
               <v-divider></v-divider>
              <v-list-item-subtitle><v-icon class="ma-1">mdi-email-check</v-icon>{{ userDetails.email }}</v-list-item-subtitle>
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

<div>
  <v-btn icon>
    <v-icon>{{ userDetail }}</v-icon>
  </v-btn>
</div>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>

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

  methods:{
  },
  
  computed:{
    logus(){
      return this.$store.state.isAuthenticated
    },

    userDetails(){
      return this.$store.state.authUser
    }
  }
};
</script>

<style lang="css">
.v-snack__wrapper.theme--dark{
  background-color:#333333c7!important;
}
</style>
