import { createRouter, createWebHistory } from 'vue-router'
import MainScreen from '@/views/Mainscreen';
import Mededelingen from '@/views/Mededelingen';

const routes = [
  {
    path: '/',
    name: 'mainScreen',
    component: MainScreen,
  },
  {
    path: '/mededelingen',
    name: 'mededelingen',
    component: Mededelingen,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
