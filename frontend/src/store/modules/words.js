const state = {
	targetWord: '',
	referedWords: [],
	searchedWordList: [],
}

const getters = {
	wordList: function(state) {
		return state.searchedWordList;
	},
	video: function(state, wordid, videoid, scriptnum) {
		return state.searchedWordList;
	}
}
const actions = {
	getWordList ({commit}) {
		var baseURL = this.$http.options.root;
		console.log(baseURL);
		var tempArr = [];
		this.$http.get(`${baseURL}/api/search/words/${state.targetWord}`)
		.then((response) => {
			for(var i = 0; i < response.data.length; i++) {
				const tempObj = {
					name: '',
					index: '',
					pos: '',
					senses: [],
					videos: []
				};
				tempObj.name = response.data[i].name;
				tempObj.index = response.data[i].index;
				tempObj.pos = response.data[i].pos;
				tempObj.senses = response.data[i].senses;

				this.$http.get(`/api/search/videos/${response.data[i].name}`)
				
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
		console.log(wordlist);
		state.searchedWordList = wordlist;
	}
}

export default {
	state,
	getters,
	actions,
	mutations,
}