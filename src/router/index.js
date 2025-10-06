import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/catalogue',
      name: 'catalogue',
      component: () => import('../views/CatalogueView.vue'),
    },
    {
      path: '/catalogue/:id',
      name: 'catalogue-detail',
      component: () => import('../views/CatalogueDetailView.vue'),
      props: true, 
    },
    {
      path: '/vault',
      name: 'vault',
      component: () => import('../views/VaultView.vue'),
    },
    {
      path: '/vault/:id',
      name: 'card-detail',
      component: () => import('../views/CardDetailView.vue'),
      props: true, 
    },
  ],
})

export default router
