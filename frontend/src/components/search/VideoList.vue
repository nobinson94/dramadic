<template>
	<div class="row">
		<div class="container">
			<div class="row">
				<video-box v-for="video in videos" :video="video" :wordcode="word.code"/>	
			</div>
		</div>
		<div class="container" v-if="videoNum < videoTotalNum">
			<button class="btn btn-outline-dark float-right" @click="getMoreVideo">More Videos</button>	
		</div>
	</div>	
</template>

<script>
import VideoBox from './VideoBox.vue'

export default {
	data() {
		return {
			loading: false,
		}
	},
	created () {
		this.fetchData();
	},
	watch: {
    	'$route' : 'fetchData'
  	},
  	methods: {
  		fetchData: function() {
  			this.loading = true;
  			this.$store.commit('clearVideoList', {
  				id: this.word.index
  			});
  			let supNo = parseInt(this.word.sup_no)===0 
  			? '' 
  			: this.word.sup_no;
  			this.$store.dispatch('getVideoNum', {
				index: this.word.index,
  				targetWord: this.word.name + supNo 				
  			});
			this.$store.dispatch('getVideoList', {
				index: this.word.index,
  				targetWord: this.word.name + supNo,
  				start: 0
  			});
			this.loading = false;
  		},
  		getMoreVideo: function() {
  			let supNo = parseInt(this.word.sup_no)===0 
  			? '' 
  			: this.word.sup_no;
  			this.$store.dispatch('getVideoList', {
				index: this.word.index,
  				targetWord: this.word.name + supNo,
  				start: this.word.videoNum
  			});
  		}
  	},
	props: {
  		word: {
  			type: Object,
  		}
  	},
	components: {
		VideoBox
	},
	computed: {
		videos() {
  			return this.word.videoList;
  		},
  		videoNum() {
  			return this.videos.length;
  		},
  		videoTotalNum() {
  			return this.word.videoTotalNum;
  		}
	}
}
</script>