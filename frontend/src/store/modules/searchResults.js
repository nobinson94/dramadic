const state = {
	targetWord: '', //찾고자 하는 단어 string (1개 이상의 단어)
	lang: JSON.parse(localStorage.getItem("lang")), //search 할때 번역할 외국어
	refWordList: [],
	wordList: null,
}

const getters = {
	wordList: function(state) {
		return state.wordList;
	},
	refWordList: function(state) {
		return state.refWordList;
	}
}

const actions = {
	getWordList ({commit}) {
		const baseURL = this.$http.options.root;
		let tempArr = null;

		this.$http.get(`${baseURL}/api/words?lang=${state.lang.id}&words=${state.targetWord}&method=search`)
		.then((response) => {
			console.log(response.data);
			let tempArr = response.data;
			
			commit('updateWordList', tempArr);
		})
	},
	getVideoNum({commit}, payload) {
		const baseURL = this.$http.options.root;

		this.$http.get(`${baseURL}/api/videos/num/includeWord/${payload.targetWord}`
		).then((response) => {
			let videoTotalNum = parseInt(response.data.num);
			console.log(videoTotalNum);
			commit('updateVideoTotalNum', {id: parseInt(payload.index)-1 , videoTotalNum: videoTotalNum});
		})

	},
	getVideoList({commit}, payload) {
		const baseURL = this.$http.options.root;

		this.$http.get(`${baseURL}/api/videos/includeWord/${payload.targetWord}?start=${payload.start}`)
		.then((response) => {
		
			let videoList = response.data;
			console.log(videoList);
			commit('updateVideoList',{id: parseInt(payload.index)-1 , video: videoList});
		})
	},
	
}
const mutations = {
	updateTargetWord (state, word) {
		state.targetWord = word;
	},
	updateWordList (state, wordlist) {
		state.wordList = wordlist;
	},
	updataRefWordList (state, refWords) {
		state.refWordList = refWords;
	},
	updateVideoList (state, creds) {
		state.wordList[creds.id].videoList = state.wordList[creds.id].videoList.concat(creds.video);
		state.wordList[creds.id].videoNum += creds.video.length;
	},
	updateVideoTotalNum(state, creds) {
		state.wordList[creds.id].videoTotalNum = creds.videoTotalNum;
	},
	clearVideoList(state, creds) {
		state.wordList[creds.id].videoList = [];
		state.wordList[creds.id].videoNum = 0;
	}
}

export default {
	state,
	getters,
	actions,
	mutations,
}