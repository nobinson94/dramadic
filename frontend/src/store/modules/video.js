const state = {
	videoinfo: {
		id: '',
		scriptnum: ''
	},
	wordCode: null,
	video: null,
	word: null,
	lang: JSON.parse(localStorage.getItem("lang")),
	loadingVideo: true,
	loadingWord: true,
}

const getters = {
	video : function(state) {
		return state.video;
	},
	word: function(state) {
		return state.word;
	},
	loadingVideo: function(state) {
		return state.loadingVideo
	}
}
const actions = {
	getVideo ({commit}) {
		let video;
		const baseURL = this.$http.options.root;
		this.$http.get(`${baseURL}/api/videos/${state.videoinfo.id}/scriptnum/${state.videoinfo.scriptnum}`)
		.then((response) => {
			video = response.data;
		}).then(function() {
			commit('updateVideo', video);
		})
	},
	getWord({commit}) {
		const baseURL = this.$http.options.root;
		this.$http.get(`${baseURL}/api/words?lang=${state.lang.id}&code=${state.wordCode}&method=view`)
		.then((response) => {
			let tempObj = response.data;
			commit('updateWord', tempObj);
		})
	},

}

const mutations = {
	updateVideoInfo(state, videoinfo) {
		state.videoinfo.id = videoinfo.videoid;
		state.videoinfo.scriptnum = videoinfo.scriptnum;
	},
	updateVideo(state, video) {
		state.loadingVideo = false;
		state.video = video;
	},
	updateWordCode(state, wordCode) {
		state.wordCode = wordCode;
	},
	updateWord (state, word) {
		state.loadingWord = false;
		state.word = word;
	},
}

export default {
	state,
	getters,
	actions,
	mutations,
}