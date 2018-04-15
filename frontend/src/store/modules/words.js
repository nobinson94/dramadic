const state = {
	targetWord: '', //찾고자 하는 단어 string (1개 이상의 단어)
	lang: JSON.parse(localStorage.getItem("lang")),
	referedWordList: [],
	searchedWordList: [],
	focusWord: null,
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
		let tempArr = [];
		this.$http.get(`${baseURL}/api/search/wordlist/${state.targetWord}?lang=`+state.lang.id)
		.then((response) => {
			//console.log(response.data);
			tempArr = response.data;
			return tempArr;
		})
		.then(() => {
			for(let temp of tempArr) {
				//console.log(temp);
				this.$http.get(`${baseURL}/api/search/videolist/${temp.name}`)
				.then((res) => {
					console.log(res.data);
					temp.videoList = res.data;
				})
			}
			return tempArr;
		})
		.then(() => {
			console.log(tempArr);
			commit('updateSearchedWordList', tempArr);
		})
	},
	getFocusWord({commit}, creds) {
		const baseURL = this.$http.options.root;
		let tempObj = null;
		this.$http.get(`${baseURL}/api/words?lang=${creds.lang}&code=${creds.code}`)
		.then((response) => {
			tempObj = response.data;
			this.$http.get(`${baseURL}/api/search/videolist/${tempObj.name}`)
			.then((res) => {
				tempObj.videoArr = res.data;
			})
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
	updateFocusWord (state, wordInfo) {
		state.focusWord = wordInfo;
	}
}

export default {
	state,
	getters,
	actions,
	mutations,
}