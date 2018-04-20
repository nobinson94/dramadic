<template>
	<div class="container content-box">
		<load-page v-if="loading" />
		<word-list v-if="words" v-bind:words="words"/>
	</div>
</template>


<script>
import ReferedWordList from './ReferedWordList.vue'
import WordList from './WordList.vue'
import LoadPage from './LoadPage.vue'

export default {
	data () {
	    return {
	      loading: false,
	    }
  	},
	created () {
		this.fetchData();
	},
	watch: {
    	'$route' : 'fetchData'
  	},
  	methods: {
  		fetchData: function() {
  			this.$store.commit('updateSearchedWordList', null);
  			this.loading = true;

  			let targetWord = this.$route.query.word
			this.$store.commit('updateTargetWord', targetWord);
			this.$store.dispatch('getWordList');
			this.loading = false;
  		}
  	},
  	computed: {
  		words() {
  			return this.$store.getters.wordList;
  		}
  	},
	components: {
			ReferedWordList, WordList, LoadPage
	}
}
</script>	