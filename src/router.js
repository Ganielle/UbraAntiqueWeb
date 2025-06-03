import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

import Signup from './views/signup'
import Login from './views/login'
import Dashboard from './views/dashboard'
import NotFound from './views/not-found'
import './style.css'

Vue.use(Router)
Vue.use(Meta)
export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'Signup',
      path: '/signup',
      component: Signup,
    },
    {
      name: 'Login',
      path: '/',
      component: Login,
    },
    {
      name: 'Dashboard',
      path: '/dashboard',
      component: Dashboard,
    },
    {
      name: '404 - Not Found',
      path: '**',
      component: NotFound,
      fallback: true,
    },
  ],
})
