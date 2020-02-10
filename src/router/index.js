import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login.vue"
import Home from "../views/Home.vue"
import Admin from "../views/Admin.vue"
import Register from "../views/Register.vue"
import store from "../store/index"

Vue.use(VueRouter)

const ifNotAuthenticated = (to, from, next) => {
  if (store.getters.isLoggedIn) {
    next()
    return
  }
  next('/')
}

const routes = [
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/',
    name:'login',
    component: Login,
    beforeEnter: ((to, from, next) => {
      if (store.getters.isLoggedIn) next('/home')
      else next()
    })
  },
  {
    path:'/Registration',
    name:'register',
    component: Register
  },
  {
    path:'/Admin',
    name:'admin',
    component: Admin,
    beforeEnter: ((to, from, next) => {
      if (localStorage.getItem('admin') === 'ROLE_ADMIN') next()
      else next('/home')
    })
  },
  {
    path:'/home',
    name:'home',
    component: Home,
    beforeEnter: ifNotAuthenticated,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
