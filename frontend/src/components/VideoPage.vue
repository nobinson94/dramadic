<template>
	<div class="container">
		<div class="video-content">		
			<video-player :path="video.path"/>
			<div class="row video-title-container">
				<div class="col-md-12">
					<strong>{{ video.main_title }}</strong> {{ video.sub_title }}
				</div>
			</div>	
			<div class="row script-container">
				{{ video.text }}
			</div>			
		</div>
		<div class="word-content">
			<h4> {{ word.name }} </h4>
			<div class="sup-no" v-if="word.sup_no!==0">
				{{ word.sup_no }}
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
		this.fetchData();
	},
	watch: {
    	'$route': 'fetchData'
	},
	computed : {
		video() {
			return this.$store.getters.video
		},
		word() {
			return this.$store.getters.focusWord
		}
	},
	methods: {
		fetchData : function() {
			var videoid = this.$route.query.videoid;
			var scriptnum = this.$route.query.scriptnum;
			var targetWordCode = this.$route.query.targetcode;
			var videoinfo = { videoid: videoid, scriptnum: scriptnum};
			this.$store.commit('updateVideoInfo', videoinfo);
			this.$store.commit('updateFocusWordCode', targetWordCode);
			this.$store.dispatch('getVideo');
			this.$store.dispatch('getFocusWord');
		}
		
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