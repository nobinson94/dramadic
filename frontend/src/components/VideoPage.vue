<template>
	<div class="container">

		<div class="content">
			<div class="row video-title-container">
				<strong>{{ video.main_title }}</strong> {{ video.sub_title }}
			</div>			
			<video-player :path="video.path" :starttime="video.starttime" :endtime="video.endtime" />
			<div class="row script-container">
				{{ video.text }}
			</div>			
		</div>

	</div>
</template>

<script>
import VideoPlayer from './VideoPlayer.vue'

export default {
	components: {
		VideoPlayer
	},
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