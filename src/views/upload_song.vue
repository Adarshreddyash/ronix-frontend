<template lang="html">
  <v-form method="post" @submit.prevent="upload_song">
    <v-container>
      <v-row>
       <v-col cols="12" sm="12" md="12" lg="6">
    <p  class="mx-auto" justify-center>Upload Song</p>
    <v-textarea
          label="Title"
          prepend-icon="mdi-format-title"
          v-model="title"
          :rules="[v => !!v || 'Item is required']"
          dense
          outlined
          rows="1"
          auto-grow
    ></v-textarea>

    <v-textarea
          label="Artist"
          prepend-icon="mdi-account-music"
          :rules="[v => !!v || 'Item is required']"
          dense
          v-model="artist"
          outlined
          rows="1"
          auto-grow
    ></v-textarea>

  <v-file-input
    label="select song"
    v-model="src"
    outlined
    id="file" 
    ref="file"
    prepend-icon="mdi-file-music"
    dense
    :rules="[v => !!v || 'Item is required']"
  ></v-file-input>
   
    <v-file-input
    label="Album"
    v-model="album"
    prepend-icon="mdi-image"
    :rules="[v => !!v || 'Item is required']"
    outlined
    dense
  ></v-file-input>

  <v-btn
      :loading="loading3"
      :disabled="loading3"
      color="blue-grey"
      class="ma-2 white--text"
      @click.prevent="upload_song"
      type="submit" 
    >
      Upload
      <v-icon right dark>mdi-upload</v-icon>
    </v-btn>
    </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      title: '',
      artist: '',
      src: '',
      album: '',
    };
  },
  methods: {
    upload_song() {
      const base = {
        baseURL: this.$store.state.endpoints.baseUrl,
        headers: {
          // Set your Authorization to 'JWT', not Bearer!!!
          Authorization: `JWT ${this.$store.state.jwt}`,
          "Content-Type": "application/json"
        },
        xhrFields: {
          withCredentials: true
        }
      };

      let formData = new FormData()
      formData.append("title", this.title)
      formData.append("artist",this.artist)
      formData.append("src", this.src)
      formData.append("album", this.album)

      const axiosInstance = axios.create(base);
      axiosInstance({
        url: "http://127.0.0.1:8000/api/v1/songup/",
        method: "post",
        data:formData
      })
        .then(response => {
          console.log(response)
        })

        .catch(e => {
           if (e.response.status === 400) {
             alert(e.response.data)
           } else {
             alert("done")
           }
        });
    },
  }
};
</script>

<style lang="css">
</style>