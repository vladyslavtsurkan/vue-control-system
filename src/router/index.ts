import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { useUserStore } from "@/stores/user";
import {setToken} from "@/api";

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
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
    },
    {
      path: '/:notFound',
      name: 'NotFound',
      component: NotFoundView,
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = Cookies.get('token', { sameSite: 'None', secure: true })
  const userStore = useUserStore()
  if (token) {
    userStore.isLoggedIn = true
    setToken(token)
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
