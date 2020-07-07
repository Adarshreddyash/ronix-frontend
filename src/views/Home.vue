<template>
  <div class="home">
    <p>Login / Signup</p>
    <Login/>
    <router-link to="/about">Signup</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  name: 'Home',
  components: {
    Login
  }
}
</script>
