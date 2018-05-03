import Vue from 'vue'
import Router from 'vue-router'
import MultiPage from '@/components/MultiPage'
import HomePage from '@/components/HomePage'

import LoginPage from '@/components/auth/LoginPage'
import SignupPage from '@/components/auth/SignUpPage'
import UserInfoPage from '@/components/auth/UserInfoPage'

import WordList from '@/components/search/WordList'
import SearchPage from '@/components/search/SearchPage'

import VideoPage from '@/components/video/VideoPage'

import AdminPage from '@/components/admin/AdminPage'
import VideoEditPage from '@/components/admin/VideoEditPage'

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
          path: 'admin',
          component: AdminPage,
          children: [
            {
              path: 'edit',
              component: VideoEditPage,
            },
          ]
        },
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
