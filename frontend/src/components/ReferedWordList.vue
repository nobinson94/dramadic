<template>
	<div class="row">
		<div class="col-md-12">
			<div class="font-weight-bold refered-word">연관검색어</div>
			<refered-word v-for="word in words" :word="word" />	
		</div>
	</div>
</template>

<script>
import ReferedWord from './ReferedWord.vue'

export default {
	components: {
		ReferedWord
	},
	data () {
		return {
			words: [
			 {text: '군청'},
			 {text: '도청'},
			 {text: 'city hall'}
			],
		}
	}
}
</script>

<style>
.refered-word {
	float: left;
	padding-right: 5px;
}
</style>