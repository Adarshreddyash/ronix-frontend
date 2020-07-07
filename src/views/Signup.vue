<template lang="html">
  <form class="login form">
    <div class="field">
      <label for="id_username">Email</label>
      <input
        v-model="email"
        type="text"
        placeholder="Email"
        autofocus="autofocus"
        maxlength="150"
        id="id_username">
    </div>
    <div class="field">
      <label for="id_password">Password</label>
      <input
        v-model="password1"
        type="password"
        placeholder="Password"
        id="id_password">
    </div>
    <div class="field">
      <label for="id_password">Password(repeat)</label>
      <input
        v-model="password2"
        type="password"
        placeholder="Password"
        id="id_password">
    </div>
    <button
      @click.prevent="register"
      class="button primary"
      type="submit">
      Log In
    </button>
  </form>
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