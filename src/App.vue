<template>
  <v-app>
    <v-app-bar app dense color="white">
      <div>
        <v-img src="./assets/Ronixlogo.png" max-width="90" contain></v-img>
      </div>

      <v-spacer></v-spacer>

      <v-btn v-show="$route.path != '/'" icon>
        <router-link to="/" tag="icon">
          <v-icon>mdi-home</v-icon>
        </router-link>
      </v-btn>

      <v-btn icon>
        <router-link to="/songs" tag="icon">
          <v-icon>mdi-playlist-music</v-icon>
        </router-link>
      </v-btn>

      <v-btn icon>
        <v-badge color="green" content="3" overlap>
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>

      <div v-show="logus">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" text>
              <v-avatar size="27" v-if="$store.state.authUser.avatar">
                <img icon :src="$store.state.authUser.avatar" alt="Profile avatar" />
              </v-avatar>

              <v-avatar size="27" v-else>
                <img
                  icon
                  src="https://image.flaticon.com/icons/png/128/483/483361.png"
                  alt="Profile avatar"
                />
              </v-avatar>
            </v-btn>
          </template>

          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-btn
                  color="green"
                  x-small
                  v-show="!$store.state.authUser.avatar"
                  outlined
                  :loading="isSelecting"
                  @click="onButtonClick"
                >
                  <v-icon left>mdi-cloud-upload-outline</v-icon>upload picture
                </v-btn>
                <input
                  type="file"
                  ref="uploader"
                  class="d-none"
                  accept="image/*"
                  @change="uploadImage($event)"
                  id="file-input"
                />
                <v-list-item-title>
                  <v-icon class="ma-1">mdi-account-circle</v-icon>
                  {{ userDetails.profile_name }}
                </v-list-item-title>
                <v-divider></v-divider>
                <v-list-item-subtitle>
                  <v-icon class="ma-1">mdi-email-check</v-icon>
                  {{ userDetails.email }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-btn small color="primary" dark>Log out</v-btn>
        </v-menu>
      </div>
    </v-app-bar>

    <v-snackbar v-model="snackbar" :timeout="timeout" left top>
      <v-icon color="red">mdi-party-popper</v-icon> {{ text }}
    </v-snackbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>
import axios from "axios";

export default {
  name: "App",

  components: {},

  data() {
    return {
      links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
      snackbar: false,
      text: "Your Picture is uploaded",
      timeout: 2000
    };
  },
  methods: {
    uploadImage(event) {
      let img = new FormData();
      img.append("avatar", event.target.files[0]);
      
      const base = {
        baseURL: this.$store.state.endpoints.baseUrl,
        headers: {
          // Set your Authorization to 'JWT', not Bearer!!!
          Authorization: `JWT ${this.$store.state.jwt}`,
          "Content-Type": "multipart/form-data"
        },
        xhrFields: {
          withCredentials: true
        }
      };
      const axiosInstance = axios.create(base);
      axiosInstance({
        url: "/rest-auth/user/",
        data: img,
        method: "patch"
      })
        .then(response => {
          console.log(response);
          this.snackbar = true
        })
        .catch(error => {
          console.log(error);
          console.debug(error);
          console.dir(error);
        });
    },
    onButtonClick() {
      this.$refs.uploader.click();
    }
  },

  computed: {
    logus() {
      return this.$store.state.isAuthenticated;
    },

    userDetails() {
      return this.$store.state.authUser;
    }
  }
};
</script>

<style lang="css">

/* Medium Devices, Desktops */
@media only screen and (min-width: 992px) {
  .v-toolbar__content,
  .v-toolbar__extension {
    padding: 4px 136px !important;
  }
}
.v-image__image--contain {
  background-size: contain;
  background-position: left !important;
}

.v-icon--left {
  margin-right: 8px;
}
</style>
