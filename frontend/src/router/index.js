import Vue from 'vue'
import Router from 'vue-router'
import MultiPage from '@/components/MultiPage'
import HomePage from '@/components/HomePage'
import SearchPage from '@/components/SearchPage'
import LoginPage from '@/components/LoginPage'
import SignupPage from '@/components/SignUpPage'

Vue.use(Router)

const routes = [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/',
      component: MultiPage,
      children: [
        {path: 'search', component: SearchPage},
        {path: 'login', component: LoginPage},
        {path: 'signup', component: SignupPage},
      ]
    },    
]

export default new Router({
  routes
})
