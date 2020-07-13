import Vue from 'vue'
import VueRouter from 'vue-router'
import Signup from '../views/Signup.vue'
import Portfolio from '@/components/Portfolio';
import Songs from '@/components/Songs'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Portfolio
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/songs',
    name: 'Songs',
    component: Songs
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
