import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '../plugins/firebase'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Default'),
    meta: {
      requiresAuth: true
    },
    children:[
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import(/* webpackChunkname: "profile" */'../views/Profile.vue')
      },
      {
        path: '/bf',
        name: 'BF',
        component: () => import(/* webpackChunkname: "bf" */'../views/BF.vue')
      },
      {
        path: '/gpo',
        name: 'GPO',
        component: () => import(/* webpackChunkname: "gpo" */'../views/GPO.vue')
      },
      {
        path: '/astd',
        name: 'ASTD',
        component: () => import(/* webpackChunkname: "astd" */'../views/ASTD.vue')
      },
      {
        path: '/sl2',
        name: 'SL2',
        component: () => import(/* webpackChunkname: "sl2" */'../views/SL2.vue')
      },
    ]
  },
  {
    path: '/',
    component: () => import('@/layouts/Blank'),
    children:[{
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkname: "login" */'../views/Login.vue')
    }]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
