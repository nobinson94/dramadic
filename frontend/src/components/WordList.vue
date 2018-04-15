<template>
	<div class="row">
		<div class="col-md-12" >
			<word-box v-for="word in words" v-bind:word="word" v-bind:key="word.key" />
		</div>
	</div>	
</template>

<script>
import WordBox from './WordBox.vue'

export default {
	props: {
  		words: {
  			type: Array,
  		}
  	},
	components: {
		WordBox
	},
}
</script>
