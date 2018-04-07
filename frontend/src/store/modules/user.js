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
  },
  userName: state => {
    return state.name;
  }
}

const actions = {
  login({ commit }, creds) {

  var baseURL = this.$http.options.root;
    commit(LOGIN); // show spinner
    this.$http
      .post(`${baseURL}/api/auth/login`, {email: creds.email, password: creds.password})
      .then((res) => {
        console.log(res.data);
        if(res.data==1) {
          alert('비밀번호를 확인하세요');
        } else if(res.data==2) {
          alert('아이디를 확인하세요');
        } else {
          //console.log(res.data);
          localStorage.setItem("token", res.data);
          localStorage.setItem("user_id", res.data.USER_ID);
          localStorage.setItem("user_name", res.data.USER_NAME);
          commit(LOGIN_SUCCESS);
        }
    })
   },
   logout({ commit }) {
    var baseURL = this.$http.options.root;
    this.$http.post(`${baseURL}/api/auth/logout`)
    .then((res)=>{
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