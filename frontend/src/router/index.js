import Vue from 'vue'
import Router from 'vue-router'
import MultiPage from '@/components/MultiPage'
import HomePage from '@/components/HomePage'
import SearchPage from '@/components/SearchPage'
import LoginPage from '@/components/LoginPage'
import SignupPage from '@/components/SignUpPage'
import WordList from '@/components/WordList'
import VideoPage from '@/components/VideoPage'
import UserInfoPage from '@/components/UserInfoPage'

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
        {
          path: 'search', 
          component: SearchPage,
          children: [
            { path: ':word',
              component: WordList,
            }
          ]
        },
        {
          path: 'video',
          name: 'video',
          component: VideoPage,        
        },
        {
          path: 'login', 
          component: LoginPage
        },
        {
          path: 'signup', 
          component: SignupPage
        },
        {
          path: 'userinfo',
          component: UserInfoPage
        }
      ]
    },    
]

export default new Router({
  routes
})
