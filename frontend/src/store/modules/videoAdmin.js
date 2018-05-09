const state = {
	adminName: '관리자1',
	editVideoList: [],
	editScriptList: [],
	editVideoInfo: '',
}
const getters = {
	adminName: state => {
		return state.adminName
	},
	editVideoList: state => {
		return state.editVideoList;
	},
	editScriptList: state => {
		return state.editScriptList;
	},
	editVideoInfo: state => {
		return state.editVideoInfo;
	}
}
const mutations = {
	updateEditVideoList (state, videoList) {
		state.editVideoList = videoList;
	},
	updateEditScriptList (state, scriptList) {
		state.editScriptList = scriptList;
	},
	updateEditVideoInfo (state, videoInfo) {
		state.editVideoInfo = videoInfo;
	},
	updateEditVideoCategory (state, cat) {
		state.editVideoInfo.VIDEO_Category = cat;
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
	},
	getEditScriptList({commit}, payload) {
		const baseURL = this.$http.options.root;
		this.$http.get(`${baseURL}/api/subtitle/${payload.videoid}?start=${payload.start}`)
		.then((response) => {
			commit('updateEditScriptList', response.data);
		})

	},
	getEditVideoInfo({commit}, payload) {
		const baseURL = this.$http.options.root;
		this.$http.get(`${baseURL}/api/videos/${payload.videoid}`)
		.then((response) => {
			commit('updateEditVideoInfo', response.data);
		});
	}
}

export default {
  state,
  getters,
  actions,
  mutations,
}