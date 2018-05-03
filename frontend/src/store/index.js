import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import video from './modules/video'
import users from './modules/user'
import modals from './modules/modals'
import searchResults from './modules/searchResults'
import videoAdmin from './modules/videoAdmin'

Vue.use(Vuex);
Vuex.Store.prototype.$http = axios
Vuex.Store.prototype.$http.options.root = process.env.NODE_ENV === 'production' ? "http://35.174.44.161:3000" : "http://localhost:8080"

export const store = new Vuex.Store({
  modules: {
    video,
    users,
    modals,
    searchResults,
    videoAdmin
  },
});