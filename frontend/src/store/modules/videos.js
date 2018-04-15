const state = {
	videoinfo: {
		id: '',
		scriptnum: ''
	},
	video: Object,
	lang: JSON.parse(localStorage.getItem("lang")),
}

const getters = {
	video : function(state) {
		return state.video
	},
}
const actions = {
	getVideo ({commit}) {
		var baseURL = this.$http.options.root;
		var video = [];
		this.$http.get(`${baseURL}/api/videos/${state.videoinfo.id}/scriptnum/${state.videoinfo.scriptnum}`)
		.then((response) => {
			console.log(response.data);
			video = response.data;
		}).then(function() {
			commit('updateVideo', video);
		})
	},
	getWord ({commit}) {
		var baseURL = this.$http.options.root;
		var word = [];
		this.$http.get(`${baseURL}/api/words/${state.wordcode}/lang/${state.lang.id}`)
		.then((response) => {
			console.log(response.data);
			word  = response.data;
		}).then(function() {
			commit('updateWord', word);
		})
	}

}

const mutations = {
	updateVideoInfo(state, videoinfo) {
		state.videoinfo.id = videoinfo.videoid;
		state.videoinfo.scriptnum = videoinfo.scriptnum;
	},
	updateWordCode(state, wordcode) {
		state.wordcode = wordcode;
	},
	updateVideo(state, video) {
		state.video = video;
	},
	updateWord(state, word) {
		state.word = word;
	}

}

export default {
	state,
	getters,
	actions,
	mutations,
}