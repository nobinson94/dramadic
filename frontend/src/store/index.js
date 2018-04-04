import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import words from './modules/words'
import videos from './modules/videos'
import user from './modules/user'

Vue.use(Vuex);
Vuex.Store.prototype.$http = axios
Vuex.Store.prototype.$http.options.root = "https://35.174.44.161:3000"

export const store = new Vuex.Store({
  modules: {
    words,
    videos,
    user
  },
});