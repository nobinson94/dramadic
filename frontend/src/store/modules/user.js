const state = {
  isLoggedIn: sessionStorage.getItem('is_logged_in'),
  id: sessionStorage.getItem('user_id'),
  name: sessionStorage.getItem('user_name'),
}

const getters = {
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
}
const actions = {

}

const mutations = {

}

export default {
  state,
  getters,
  actions,
  mutations,
}