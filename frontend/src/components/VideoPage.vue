<template>
	<div class="container">

		<div class="content">
			<div class="row video-title-container">
				<strong>{{ video.main_title }}</strong> {{ video.sub_title }}
			</div>
			<div class="row video-player-container">
				{{ video.starttime }}
				<video width="800" height="600" controls="controls">
					<source v-bind:src="video.path" type="video/mp4">
				</video>

			</div>
			<div class="row script-container">
				{{ video.text }}
			</div>			
		</div>

	</div>
</template>

<script>

export default {
	created () {
		var videoid = this.$route.query.videoid;
		var scriptnum = this.$route.query.scriptnum;
		var targetWordCode = this.$route.query.targetcode;

		var videoinfo = { videoid: videoid, scriptnum: scriptnum};
		this.$store.commit('updateVideoInfo', videoinfo);
		this.$store.commit('updateWordCode', targetWordCode);
		this.$store.dispatch('getVideo');
		this.$store.dispatch('getWord');
	},
	watch: {
    	$route : function() {
    		var videoid = this.$route.query.videoid;
			var scriptnum = this.$route.query.scriptnum;
			var targetWordCode = this.$route.query.targetcode;

			var videoinfo = { videoid: videoid, scriptnum: scriptnum};
			this.$store.commit('updateVideo', videoinfo);
			this.$store.commit('updateWordCode', targetcode);
			this.$store.dispatch('getVideo');
			this.$store.dispatch('getWord');
    	}
  	},
	computed : {
		video() {
			return this.$store.getters.video
		},
		word() {
			return this.$store.getters.word
		}
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