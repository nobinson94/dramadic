<template>
	<div class="row">
		<div class="container">
			<div class="row">
				<video-box v-for="video in videos.slice(0,numOfDisplayVideo)" :video="video" />
			</div>
			
			<template v-if="this.videos.length >= 5" class="row">
				<div class="col-md-12">
					<button v-if="showAll" v-on:click="hideSomeVideo" class="btn btn-outline-dark float-right">Hide Videos</button>
					<button v-else v-on:click="showAllVideo" class="btn btn-outline-dark float-right">More Videos</button>
				</div>
			</template>
			<template v-else class="col-md-12">
				<br>
			</template>
		</div>	
	</div>	
</template>

<script>
import VideoBox from './VideoBox.vue'

export default {
	props: {
  		videos: {
  			type: Array,
  		}
  	},
	components: {
		VideoBox
	},
	methods: {
		showAllVideo() {
			this.numOfDisplayVideo = this.videos.length;
			this.showAll = true;
		},
		hideSomeVideo() {
			this.numOfDisplayVideo = 4;
			this.showAll = false;
		}
	},
	data () {
		return {
			numOfDisplayVideo : 4,
			showAll: false,
		}
	}
}
</script>