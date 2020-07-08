<template lang="html">
<ul v-if="posts && posts.length">
    <li v-for="post of posts" :key="post.title">
      <p>{{post.title}}</p>
      <audio>{{post.song}}</audio>
    </li>
  </ul>
</template>

<script>
import axios from 'axios'

export default {
 data() {
    return {
      posts: [],
      errors: []
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
            url: "http://127.0.0.1:8000/api/v1/songs/",
            method: "get",
            params: {}
          })
            .then((response) => {
               this.posts = response.data.results
            })

        .catch(e => {
      this.errors.push(e)
    })

}
}

</script>

<style lang="css">
</style>