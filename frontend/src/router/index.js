import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Login.vue'
import SignupView from '../views/Signup.vue'
import DomainsView from '../views/Domain/DomainsView.vue'

const routes = [
  {
    path: '/adminsettings/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/adminsettings/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/adminsettings/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/adminsettings/domains',
    name: 'domains',
    component: DomainsView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
