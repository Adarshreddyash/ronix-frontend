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
            v-model="password1"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            @click:append="show1 = !show1"
            solo
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            label="Password"
            prepend-inner-icon="mdi-map-marker"
         ></v-text-field>

         <v-text-field
            v-model="password2"
            :type="show2 ? 'text' : 'password'"
            name="input-10-1"
            @click:append="show2 = !show2"
            solo
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            label="Repeat Password"
            prepend-inner-icon="mdi-map-marker"
         ></v-text-field>

  <v-btn
      :loading="loading3"
      :disabled="loading3"
      color="blue-grey"
      class="ma-2 white--text"
      @click.prevent="register"
    >
      signup
      <v-icon right dark>mdi-account</v-icon>
    </v-btn>
  <p class="ma-3 ma-md-1">Have an account ?</p> 
 <v-btn> <router-link to="/" tag='span'>Login</router-link> </v-btn>
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
      email: '',
      password1: '',
      password2: '',
    }
  },
  methods: {
    register () {
      const payload = {
        email: this.email,
        password1: this.password1,
        password2:this.password2
      }
      axios.post('http://127.0.0.1:8000/rest-auth/registration/', payload)
      
  }
}
}
</script>

<style lang="css">
</style>