<template>
	<div class="row">
		<div class="col-md-12">
			<word-box v-for="word in words" :word="word" />
		</div>
	</div>	
</template>

<script>
import WordBox from './WordBox.vue'

export default {
	components: {
		WordBox
	},
	data () {
		return {
			words: [
			 {
			 	name: '시청',
			  	def: '[noun] the municipal building, the city hall'
			 },
			 {
			 	name: '시청하다',
			 	def: '[verb] watch'
			 },
			],
		}
	}
}
</script>
