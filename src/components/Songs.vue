<template>
<v-container>
    <v-layout wrap style="margin-bottom:84px">
      <v-flex xs4 md2
        v-for="song in songs"
        :key="song.title"
        pb-16>
        <v-card
    class="mx-auto"
    max-width="100"
    max-height="100"
  >
    <v-img
      class="white--text align-end rounded-lg"
      height="130px"
      width="150px"
      :src="song.album"
    >
      <v-btn
       class="mx-9 my-9"
       fab
       dark
       x-small
       color="green"
       @click="play(song)" :class="(song.src ==
       current.src) ? 'song playing': 'song'">
       <v-icon size="24">mdi-play-circle</v-icon>
      </v-btn>
    </v-img>
   <div class="overflow_prevent">{{ song.title}}</div>
   <div class="caption overflow_prevent" style="line-height: 100%;">{{ song.artist}}</div>
  </v-card>
 </v-flex>
 </v-layout>
     <v-snackbar
      v-model="snackbar"
      :multi-line="multiLine"
       :timeout="-1"
    >
          <v-img
              :src="current.album"
              height="45"
              width="45"
              class="grey darken-4"
        ></v-img>
    <p class="song-title" style="float:left; padding-right:20px">{{current.title}} - <span>{{current.artist}}</span></p>
       <div class="control">
         <a class="prev pointer" @click="prev"><v-icon size="44">mdi-skip-previous</v-icon></a>
         <a class="play pointer" v-if='!isPlaying' @click="play()"><v-icon green size="54">mdi-play-circle</v-icon></a>
         <a class="pause pointer" v-else @click="pause()"><v-icon size="54">mdi-pause-circle</v-icon></a>         
         <a class="next pointer" @click="next()"><v-icon size="44">mdi-skip-next</v-icon></a>
       </div>
    </v-snackbar>

  
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
 data() {
    return {
      songs: [{
       title:'',
       artist:'',
       src:'',
     }],
      current:{},
      errors: [],
      index: 0,
      isPlaying:false,
      file: '',
      multiLine: true,
      snackbar: true,
      player: new Audio()
    }
  },
  components: {
        // VuetifyAudio: () => import('vuetify-audio'),
    },
  methods:{
      play(song){
        if(typeof song.src!= "undefined"){
          this.current = song;
          this.player.src = this.current.src;
        }
        this.player.play();
        this.player.addEventListener('ended', function(){
          this.index++;  
          if(this.index > this.songs.length - 1){
            this.index=0;
          }
          this.current = this.songs[this.index];
          this.play(this.current);
        }.bind(this));
        this.isPlaying= true;
      },

      pause(){
        this.player.pause();
        this.isPlaying=false;
      },

      next(){
        this.index++;
        if(this.index> this.songs.length -1 ){
          this.index = 0;
      }

      this.current = this.songs[this.index];
      this.play(this.current);
  },
   prev (){
      this.index--;
     if(this.index < 0){
       this.index = this.songs.length - 1;
     }
    
     this.current = this.songs[this.index];
     this.play(this.current);

   },
  
  },
 created() {
      this.current = this.songs[this.index];
      this.player.src = this.current.src;    
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
               this.songs = response.data.results
               
               console.log("Sucessfully loaded songs")
            })

        .catch(e => {
      this.errors.push(e)
      console.log("Error loading songs")
    })

}
}

</script>

<style lang="css">
.overflow_prevent{
   white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
}

.v-application .pb-16 {
    padding-bottom: 94px !important;
}

</style>