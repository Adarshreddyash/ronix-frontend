<template lang="html">
  <p>songs den</p>
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