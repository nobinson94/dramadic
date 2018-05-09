<template>
	<div class="container content-box">
		<load-page v-if="wordNum === -1" />
		<word-list v-if="wordNum > 0" v-bind:words="words"/>
		<no-result-page v-if="wordNum === 0"/>
	</div>
</template>


<script>
import ReferedWordList from './ReferedWordList.vue'
import WordList from './WordList.vue'
import LoadPage from '../LoadPage.vue'
import NoResultPage from './NoResultPage.vue'

export default {
	created () {
		this.fetchData();
	},
	watch: {
    	'$route' : 'fetchData'
  	},
  	methods: {
  		fetchData: function() {
  			this.$store.commit('updateWordList', null);
  			this.$store.commit('updateWordNum', -1);
  			let targetWord = this.$route.query.word
			  this.$store.commit('updateTargetWord', targetWord);
			  this.$store.dispatch('getWordList');
  		}
  	},
  	computed: {
  		words() {
  			return this.$store.getters.wordList;
  		},
  		wordNum() {
  			return this.$store.getters.wordNum;
  		}
  	},
	components: {
			ReferedWordList, WordList, LoadPage, NoResultPage
	}
}
</script>	