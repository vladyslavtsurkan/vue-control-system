import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { useUserStore } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = Cookies.get('token')
  const userStore = useUserStore()
  if (token) {
    userStore.isLoggedIn = true
  }

  if (to.meta.requiresAuth) {
    if (userStore.isLoggedIn) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
});

export default router
