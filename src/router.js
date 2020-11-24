import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from './views/Home.vue'
import Waiting from './views/Waiting'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'test',
    component: () => import(/* webpackChunkName: "about" */ './views/Test.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/Test.vue')
  },
  {
    path: '/test',
    name: 'test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/Test.vue')
  },
  {
    path: '/waiting',
    name: 'Waiting',
    component: Waiting
  }
]

const router = new VueRouter({
  routes
})

export default router
