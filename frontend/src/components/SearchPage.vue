<template>
	<div class="container content-box">
		<refered-word-list/>
		<word-list/>
	</div>
</template>


<script>
import ReferedWordList from './ReferedWordList.vue'
import WordList from './WordList.vue'

export default {
	components: {
			ReferedWordList, WordList
	},
}
</script>