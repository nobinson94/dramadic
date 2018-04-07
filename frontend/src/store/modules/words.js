const state = {
	targetWord: '',
	lang: JSON.parse(localStorage.getItem("lang")),
	referedWords: [],
	searchedWordList: [],
}

const getters = {
	wordList: function(state) {
		return state.searchedWordList;
	},
	lang: function(state) {
		return state.lang;
	}
}
const actions = {
	getWordList ({commit}) {
		var baseURL = this.$http.options.root;
		var tempArr = [];
		this.$http.get(`${baseURL}/api/search/words/${state.targetWord}/lang/${state.lang.id}`)
		.then((response) => {
			console.log(response.data);
			for(var i = 0; i < response.data.length; i++) {
				const tempObj = {
					name: '',
					index: '',
					pos: '',
					code: '',
					senses: [],
					videos: []
				};
				tempObj.name = response.data[i].name;
				tempObj.index = response.data[i].index;
				tempObj.code = parseInt(response.data[i].code);
				tempObj.pos = response.data[i].pos;
				tempObj.senses = response.data[i].senses;


				this.$http.get(`${baseURL}/api/search/videos/${response.data[i].name}`)
				.then((res) => {
					var tmpVideoArr = [];
					for(var j = 0; j < res.data.length; j++ ) {
						tmpVideoArr[j] = res.data[j];
					}
					tempObj.videos = tmpVideoArr;
					tempArr.push(tempObj);
				})
			}		
		}).then(function() {
			commit('updateSearchedWordList', tempArr);
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
	}
}

export default {
	state,
	getters,
	actions,
	mutations,
}