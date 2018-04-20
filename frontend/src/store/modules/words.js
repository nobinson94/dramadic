const state = {
	targetWord: '', //찾고자 하는 단어 string (1개 이상의 단어)
	lang: JSON.parse(localStorage.getItem("lang")),
	referedWordList: [],
	searchedWordList: null,
	focusWord: null,
	focusWordCode: null,
}

const getters = {
	wordList: function(state) {
		return state.searchedWordList;
	},
	refWordList: function(state) {
		return state.referedWordList;
	},
	lang: function(state) {
		return state.lang;
	},
	focusWord: function(state) {
		return state.focusWord;
	}

}
const actions = {
	getWordList ({commit}) {
		const baseURL = this.$http.options.root;
		let tempArr = null;

		this.$http.get(`${baseURL}/api/search/wordlist/${state.targetWord}?lang=`+state.lang.id)
		.then((response) => {
			console.log(response.data);
			let tempArr = response.data;
			
			return tempArr;
		}).
		then((tempArr) => { //비동기로 만들어주기
			for(let temp of tempArr) {
				let sup = temp.sup_no === 0 ? '' : temp.sup_no;
				this.$http.get(`${baseURL}/api/search/videolist/${temp.name}${sup}`)
				.then((res) => {
					let videolist = res.data;
					temp.videoList = videolist;
				})
			}
			return tempArr;
		}).
		then((tempArr) => {
			commit('updateSearchedWordList', tempArr);
		})	
	},
	getFocusWord({commit}) {
		const baseURL = this.$http.options.root;
		let tempObj = null;
		this.$http.get(`${baseURL}/api/words?lang=${state.lang.id}&code=${state.focusWordCode}`)
		.then((response) => {
			tempObj = response.data;
		})
		.then(() => {
			commit('updateFocusWord', tempObj);
		})
	}
}
const mutations = {
	updateTargetWord (state, word) {
		state.targetWord = word;
	},
	updateSearchedWordList (state, wordlist) {
		state.searchedWordList = wordlist;
	},
	updateLang (state, lang) {
		state.lang = lang;
	},
	updateFocusWordCode(state, wordCode) {
		state.focusWordCode = wordCode;
	},
	updateFocusWord (state, wordInfo) {
		state.focusWord = wordInfo;
	},
}

export default {
	state,
	getters,
	actions,
	mutations,
}