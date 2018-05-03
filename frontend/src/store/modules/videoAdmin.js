const state = {
	adminName: '관리자1',
	editVideoList: [],
}
const getters = {
	adminName: state => {
		return state.adminName
	},
	editVideoList: state => {
		return state.editVideoList;
	}
}
const mutations = {
	updateEditVideoList (state, videoList) {
		state.videoList = videoList;
	}
	
}
const actions = {
	getEditVideoList({commit}, payload) {
		const baseURL = this.$http.options.root;
		if(payload.method === 'all') { 
			this.$http.get(`${baseURL}/api/videos/list/all?start=${payload.start}`)
			.then((response) => {
				commit('updateEditVideoList', response.data);
			});
		} else {
			this.$http.get(`${baseURL}/api/videos/list/${payload.method}/${payload.target}?start=${payload.start}`)
			.then((response) => {
				commit('updateEditVideoList', response.data);
			});
		}
	}
}

export default {
  state,
  getters,
  actions,
  mutations,
}