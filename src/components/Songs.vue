<template v-slot:body="{ songs }">
<v-container>
  <h3 class="my-4">Latest Picks</h3>
    <v-layout wrap style="margin-bottom:84px">
      <v-flex xs4 md2
        v-for="song in songs"
        :key="song.title"
         pb-16
         @mouseover="selectItem(song)"
         @mouseleave="unSelectItem(song)">
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
     <div v-if="song === selectedItem">
      <v-btn
       class="mx-9 my-9"
       fab
       dark
       x-small
       color="green"
       @click="play(song)" :class="(song.src ==
       current.src) ? 'song playing': 'song'">
       <v-icon v-if="selectedItem !== current" size="24">mdi-play-circle</v-icon>
      <!--<v-iconv size="24" v-else>mdi-pause</!--<v-iconv> -->
      <div v-else class="loader">
<svg id="wave" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 38.05">
  <title>Now Playing</title>
  <path id="Line_1" data-name="Line 1" d="M0.91,15L0.78,15A1,1,0,0,0,0,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H0.91Z"/>
  <path id="Line_2" data-name="Line 2" d="M6.91,9L6.78,9A1,1,0,0,0,6,10V28a1,1,0,1,0,2,0s0,0,0,0V10A1,1,0,0,0,7,9H6.91Z"/>
  <path id="Line_3" data-name="Line 3" d="M12.91,0L12.78,0A1,1,0,0,0,12,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H12.91Z"/>
  <path id="Line_4" data-name="Line 4" d="M18.91,10l-0.12,0A1,1,0,0,0,18,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H18.91Z"/>
  <path id="Line_5" data-name="Line 5" d="M24.91,15l-0.12,0A1,1,0,0,0,24,16v6a1,1,0,0,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H24.91Z"/>
  <path id="Line_6" data-name="Line 6" d="M30.91,10l-0.12,0A1,1,0,0,0,30,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H30.91Z"/>
  <path id="Line_7" data-name="Line 7" d="M36.91,0L36.78,0A1,1,0,0,0,36,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H36.91Z"/>
  <path id="Line_8" data-name="Line 8" d="M42.91,9L42.78,9A1,1,0,0,0,42,10V28a1,1,0,1,0,2,0s0,0,0,0V10a1,1,0,0,0-1-1H42.91Z"/>
  <path id="Line_9" data-name="Line 9" d="M48.91,15l-0.12,0A1,1,0,0,0,48,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H48.91Z"/>
</svg>
</div>
      </v-btn>
     </div>
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
      width="44"
    >
          <v-img
              :src="current.album"
              height="45"
              width="45"
              class="grey darken-4"
        ></v-img>
    <p class="song-title" style="float:left; padding-right:20px">{{current.title}} - <span>{{current.artist}}</span></p>
       <div class="control">
         <a class="prev pointer" @click="prev"><v-icon size="44" color="red">mdi-skip-previous</v-icon></a>
         <a class="play pointer" v-if='!isPlaying' @click="play()"><v-icon color="green" size="54">mdi-play-circle</v-icon></a>
         <a class="pause pointer" v-else @click="pause()"><v-icon color="green" size="54">mdi-pause-circle</v-icon></a>         
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
      selectedItem: false,
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
   selectItem (song) {
      this.selectedItem = song

    },
    unSelectItem() {
      this.selectedItem = false
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

.loader {
   display: flex;
   align-items: center;
   justify-content: center;
   height: 100%;
}
 #wave {
   height: 70px;
   width: 70px;
   fill: #fff;
}
 #Line_1 {
   animation: pulse 1s infinite;
   animation-delay: 0.15s;
}
 #Line_2 {
   animation: pulse 1s infinite;
   animation-delay: 0.3s;
}
 #Line_3 {
   animation: pulse 1s infinite;
   animation-delay: 0.45s;
}
 #Line_4 {
   animation: pulse 1s infinite;
   animation-delay: 0.6s;
}
 #Line_5 {
   animation: pulse 1s infinite;
   animation-delay: 0.75s;
}
 #Line_6 {
   animation: pulse 1s infinite;
   animation-delay: 0.9s;
}
 #Line_7 {
   animation: pulse 1s infinite;
   animation-delay: 1.05s;
}
 #Line_8 {
   animation: pulse 1s infinite;
   animation-delay: 1.2s;
}
 #Line_9 {
   animation: pulse 1s infinite;
   animation-delay: 1.35s;
}
 @keyframes pulse {
   0% {
     transform: scaleY(1);
     transform-origin: 50% 50%;
  }
   50% {
     transform: scaleY(0.7);
     transform-origin: 50% 50%;
  }
   100% {
     transform: scaleY(1);
     transform-origin: 50% 50%;
  }
}
 

</style>