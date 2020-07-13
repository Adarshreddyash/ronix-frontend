import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';
import VuePlyr from 'vue-plyr'

Vue.config.productionTip = false

Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: false }
  },
  emit: ['ended']
})

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
