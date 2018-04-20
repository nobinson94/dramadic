const state = {
	videoinfo: {
		id: '',
		scriptnum: ''
	},
	video: null,
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
}

const mutations = {
	updateVideoInfo(state, videoinfo) {
		state.videoinfo.id = videoinfo.videoid;
		state.videoinfo.scriptnum = videoinfo.scriptnum;
	},
	updateVideo(state, video) {
		state.video = video;
	}
}

export default {
	state,
	getters,
	actions,
	mutations,
}