import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import words from './modules/words'
import videos from './modules/videos'
import user from './modules/user'

Vue.use(Vuex);
Vuex.Store.prototype.$http = axios

export const store = new Vuex.Store({
  modules: {
    words,
    videos,
    user
  },
});