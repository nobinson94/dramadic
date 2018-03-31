const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

const state = {
  isLoggedIn: !!localStorage.getItem("token"),
  id: localStorage.getItem("user_id"),
  name: localStorage.getItem("user_name"),
}

const getters = {
  isLoggedIn: state => {
    return state.isLoggedIn;
  }
}

const actions = {
  login({ commit }, creds) {
    //commit(LOGIN); // show spinner
    this.$http.post('/api/auth/login', {email: creds.email, password: creds.password}).
    then((res) => {
        console.log(res.data);
        if(res.data==1) {
          alert('비밀번호를 확인하세요');
        } else if(res.data==2) {
          alert('아이디를 확인하세요');
        } else {
          localStorage.setItem("token", res.data);
          localStorage.setItem("user_id", res.data.USER_ID);
          localStorage.setItem("user_name", res.data.USER_NAME);
          commit(LOGIN_SUCCESS);
        }
    })
   },
   logout({ commit }) {
    this.$http.post('/api/auth/logout')
    .then((res)=>{
      console.log(res);
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_name");
      commit(LOGOUT);
    })
   }
}

const mutations = {
  [LOGIN] (state) {
    state.pending = true;
  },
  [LOGIN_SUCCESS] (state) {
    state.isLoggedIn = true;
    state.pending = false;
  },
  [LOGOUT](state) {
    state.isLoggedIn = false;
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}