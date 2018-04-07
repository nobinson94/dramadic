<template>
	<div class="container content-box">

		<word-list v-if="words" v-bind:words="words"/>
		<div v-if="!words">검색 결과가 없습니다.</div>
	</div>
</template>


<script>
import ReferedWordList from './ReferedWordList.vue'
import WordList from './WordList.vue'

export default {
	data () {
		return {
			
		}
	},
	created () {
		var targetWord = this.$route.query.word
		this.$store.commit('updateTargetWord', targetWord);
		this.$store.dispatch('getWordList');
	},
	watch: {
    	$route : function() {
    		var targetWord = this.$route.query.word
			this.$store.commit('updateTargetWord', targetWord);
			this.$store.dispatch('getWordList');
    	}
  	},
  	methods: {
  		
  	},
  	computed: {
  		words() {
  			return this.$store.getters.wordList;
  		}
  	},
	components: {
			ReferedWordList, WordList
	}
}
</script>	