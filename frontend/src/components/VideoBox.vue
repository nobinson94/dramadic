<template>
	<div class="col-md-3">
		<router-link :to="{ path:'video', query: {videoid: video.id , scriptnum: video.script_num, targetcode: wordcode} }" >
			<video class="video-box">
				<source :src="video.path" type="video/mp4">
			</video>
			<div class="container video-intro">
				<div class="row">
					<div class="col-md-12">
						<strong>{{ video.main_title }}</strong> {{ video.sub_title }}	
					</div>
					<div class="col-md-12">
						{{ video.category }}
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						{{ video.text }}
					</div>
				</div>
			</div>			
		</router-link>

	</div>
</template>

<script>
	
export default {
	props: {
  		video: {
  			type: Object,
  		},
  		wordcode: {
  			type: Number,
  		}
  	}, 
	components: {

	}
}
</script>

<style scoped>
.video-box {
	width: 100%;
	
}
.video-intro {
	color: black;
	font-size: 13px;
	padding-bottom: 14px;
}

</style>
