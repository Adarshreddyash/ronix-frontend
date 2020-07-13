<template lang="html">
<ul v-if="posts && posts.length">
    <v-li v-for="post in posts" :key="post.title">  
          <v-flex md3>
          <v-card
           max-width="300"
          class="ma-3"
          >
            <v-img
              :src="post.album"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="post.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
            </v-card>
  </v-flex>
            <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
    <vuetify-audio :file="post.song" color="success" :ended="audioFinish"></vuetify-audio>

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    </v-li>
  </ul>
</template>

<script>
import axios from 'axios'

export default {
 data() {
    return {
      posts: [],
      errors: [],
      file: '',
      snackbar:false,
    }
  },
  components: {
        VuetifyAudio: () => import('vuetify-audio'),
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
ul
{
	list-style: none;
}


</style>