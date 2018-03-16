import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
  	isLoggedIn: localStorage.getItem('is_logged_in'),
  	id: localStorage.getItem('user_id'),
  	name: localStorage.getItem('user_name'),
  },
  getters: {
  	getId: function(state) {
  		return state.id;
  	},
  	getName: function(state) {
  		return state.name;
  	},
  	getLogInState: function(state) {
  		if(state.isLoggedIn==="false") return false;
  		else return true;
  	}
  },
  mutations: {
  	
  }
});