const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

const state = {
  isLoggedIn: !!localStorage.getItem("token"),
  user_info: {
    id: localStorage.getItem("user_id"),
    name: localStorage.getItem("user_name"),
    address: '',
    lang: '',
    phone: '',
  },
  languages: [
    {id: '1', name: 'lang-en', kor: '영어', for: 'English', active: false},
    {id: '2', name: 'lang-ja', kor: '일본어', for: '日本語', active: false},
    {id: '3', name: 'lang-fr', kor: '프랑스어', for: 'le français', active: false},
    {id: '4', name: 'lang-es', kor: '스페인어', for: 'Español' , active: false},
    {id: '5', name: 'lang-ar', kor: '아랍어', for: 'العربية', active: false },
    {id: '6', name: 'lang-mn', kor: '몽골어', for: 'Монгол хэл', active: false},
    {id: '7', name: 'lang-vi', kor: '베트남어', for: 'Tiếng Việt', active: false},
    {id: '8', name: 'lang-lo', kor: '타이어', for: 'ภาษาไทย', active: false},
    {id: '9', name: 'lang-id', kor: '인도네시아어', for: 'Bahasa indonesia', active: false},
    {id: '10', name: 'lang-ru', kor: '러시아어', for: 'русский', active: false},
  ],
  lang: JSON.parse(localStorage.getItem("lang")),
}

const getters = {
  isLoggedIn: state => {
    return state.isLoggedIn;
  },
  userEmail: state => {
    return state.user_info.id;
  },
  userName: state => {
    return state.user_info.name;
  },
  userInfo: state => {
    return state.user_info;
  },
  langlist: state => {
    return state.languages;
  },
  lang: state => {
    return state.lang;
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
          localStorage.setItem("token", res.data);
          localStorage.setItem("user_id", res.data.USER_ID);
          localStorage.setItem("user_name", res.data.USER_NAME);
          localStorage.setItem("lang", JSON.stringify(state.languages[res.data.lang]));
          commit(LOGIN_SUCCESS);
        }
    })
   },
   logout({ commit }) {
    const baseURL = this.$http.options.root;
    this.$http.post(`${baseURL}/api/auth/logout`)
    .then((res)=>{
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_name");
      localStorage.setItem("lang", JSON.stringify(state.languages[0]));
      commit(LOGOUT);
    })
   },
   getUserInfo({commit}) {
    const baseURL = this.$http.options.root;
    this.$http
    .post(`${baseURL}/api/users`, {id: state.user_info.id})
    .then((res) => {
      let userinfo = res.data;
      commit('updateUserInfo', userinfo);
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
  },
  updateUserInfo(state, userInfo) {
    state.user_info.address = userInfo.address;
    state.user_info.phone = userInfo.phone;
    state.user_info.lang = state.languages[parseInt(userInfo.lang)];
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}