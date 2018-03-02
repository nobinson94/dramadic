<template>
	<div class="refered-word">
		<p> {{ word.text }} </p>
	</div>
</template>

<script>
export default {
  props: {
  	word: {
  		type: Object,
  	}
  }, 
}
</script>
