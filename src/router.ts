import { createRouter, createWebHistory } from 'vue-router'
import ControlRoom from './views/ControlRoom.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: ControlRoom },
    { path: '/insights', component: () => import('./views/InsightsView.vue') },
  ],
})
