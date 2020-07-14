<template>
  <v-app>
    <v-app-bar
      app
      color="primary_bg"
      dark
      dense
    >
      <div class="d-flex align-center">
       <v-toolbar-title>Ronix</v-toolbar-title>
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

      <v-btn icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>

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

  data: () => ({
        links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us',
      ],
  }),
};
</script>

<style lang="css">
.primary_bg{
  background-color:#9921e8;
  background-image:linear-gradient(315deg, #9921e8 0%, #5f72be 74%);
}
</style>
