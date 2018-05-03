<template>
	<div class="container">
		<div class="row">
			<div class="col-md-12 video-title-container">
				<strong>{{ video.main_title }}</strong> {{ video.sub_title }}
			</div>
			<div class="col-md-7 video-player-container">
				<video-player :path="video.path" :subtle="video.sentence" class="video-player"/>
			</div>
			<div class="col-md-5 word-container">
				<div class="d-flex">
					<h5> {{ word.name }} </h5>
					<div class="sup-no" v-if="word.sup_no!==0">
						{{ word.sup_no }}
					</div>
					<h5><span v-if="word.org_word">({{ word.org_word.lang }})</span></h5>
					<div v-if="word.pron"> [{{ word.pron }}]</div>
					<div class="importance-degree d-flex">
						<div v-for="n in word.grade">
							<img src="../../assets/img/star.png" class="star-img" />	
						</div>
					</div>	
				</div>
				<div class="row" v-for="(sense , n) in word.sense_arr">
					<div class="col-md-12"> 
					{{n+1}}. <span v-if="word.pos!==''">({{ word.pos }})</span> {{ sense.def }} 
					</div>
					<div class="col-md-12">
						<div class="word-def">
							<strong>{{ sense.trans.word }} </strong> <span v-if="sense.trans.word">: </span> {{ sense.trans.dfn }}
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-12 script-container">
				
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
			return this.$store.getters.word
		}
	},
	methods: {
		fetchData : function() {
			let videoid = this.$route.query.videoid;
			let scriptnum = this.$route.query.scriptnum;
			let targetWordCode = this.$route.query.targetcode;
			let videoinfo = { videoid: videoid, scriptnum: scriptnum};
			this.$store.commit('updateVideoInfo', videoinfo);
			this.$store.commit('updateWordCode', targetWordCode);
			this.$store.dispatch('getVideo');
			this.$store.dispatch('getWord');
		}
		
	}

}
	
</script>

<style scoped>
.video-title-container {
	padding-bottom: 10px;
	font-size: 22px;
}
.video-player-container {
	width: 100%;
}
.script-container {

}
.word-container {

}
.video-player {
	width: 100%;
}
.importance-degree {
	padding-left: 10px;
}
.star-img {
	height: 10px;
	width: 12px;
	padding-right: 2px;
}
.word-def {
	padding-bottom: 10px;
}
</style>