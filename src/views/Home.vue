<template>
  <div class="home">
    <p>Login / Signup</p>
    <HelloWorld/>
    <router-link to="/about">Signup</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
