import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import libs from '../libs/libs'

Vue.use(VueRouter)



const Router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes,
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE
})

Router.beforeEach((to, from, next) => {
  let nextObject = {}

  // Search if the route requires Authentication
  if(to.matched.some( record => record.meta.requiresAuth)) {
    // Verify that the user is authenticated
    if (!libs.isAuthenticated()) {
      nextObject = {
        path: '/',
        query: { redirect: to.fullPath }
      }
      next(nextObject)
    }
  }
  next(nextObject)
})

  export default Router

