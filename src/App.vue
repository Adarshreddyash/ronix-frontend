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
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    
      <v-btn icon>
        <v-icon>mdi-compass</v-icon>
      </v-btn>
    
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>

    <v-btn icon>
        <v-icon>mdi-refresh</v-icon>
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
