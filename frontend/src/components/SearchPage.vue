<template>
	<div class="container content-box">
		<word-list v-if="words" v-bind:words="words"/>
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
		
	},
	watch: {
    	
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