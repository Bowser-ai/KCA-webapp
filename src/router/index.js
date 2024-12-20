import { createRouter, createWebHistory } from 'vue-router'
import MainScreen from '@/views/Mainscreen.vue';
import Mededelingen from '@/views/Mededelingen.vue';

const routes = [
  {
    path: '/',
    name: 'mainScreen',
    component: MainScreen,
  },
  {
    path: '/mededelingen',
    name: 'Mededelingen',
    component: Mededelingen,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
