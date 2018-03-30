<template>
	<div class="container">

		<div class="content" v-if="script">
			<div class="row video-title-container">
				<strong>{{ video.main_title }}</strong> 
				{{ video.sub_title }}
			</div>
			<div class="row video-player-container">
								
			</div>
			<div class="row script-container">
				
			</div>			
		</div>

	</div>
</template>

<script>

export default {
	data () {
		
	},
	created () {
		
	},
	computed : {
		video() {
			return this.$store.getters
		}
	},
	watch: {
		
	},
	methods: {
		
	}

}
	
</script>

<style scoped>
.video-title-container {

}
.video-player-container {

}
.script-container {

}
</style>