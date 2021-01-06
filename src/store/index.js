import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// Make Axios handle Django CSRF
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
//axios.defaults.baseURL = this.$store.state.endpoints.baseUrl;
//axios.defaults.headers.common['Authorization'] = `JWT ${this.$store.state.jwt}`;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


export default new Vuex.Store({
  state: {
    authUser:JSON.parse(sessionStorage.getItem(`userInfo`))||{},
    isAuthenticated: !!localStorage.getItem('token'),
    jwt: localStorage.getItem('token'),
    endpoints: {
      // TODO: Remove hardcoding of dev endpoints
      obtainJWT: 'http://127.0.0.1:8000/api/v1/auth/obtain_token/',
      refreshJWT: 'http://127.0.0.1:8000/api/v1/auth/refresh_token/',
      baseUrl: 'http://127.0.0.1:8000/'
    }
  },

  mutations: {
    setAuthUser(state, {
      authUser,
      isAuthenticated
    }) {
      Vue.set(state, 'authUser', authUser)
      Vue.set(state, 'isAuthenticated', isAuthenticated)
    },
    updateToken(state, newToken) {
      localStorage.setItem('token', newToken);
      state.jwt = newToken;
    },
    removeToken(state) {
      localStorage.removeItem('token');
      state.jwt = null;
    },
  }
})