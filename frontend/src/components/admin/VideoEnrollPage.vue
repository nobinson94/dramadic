<template>
	<div>
		<div class="title-box">
			<h5>영상 등록하기</h5>
		</div>
		<video-player />
		<edit-form />
	</div>
</template>

<script>
import EditForm from './EditForm.vue';
import VideoPlayer from './VideoPlayer.vue';

export default {
	data() {
		return {
		}
	},
	created() {
		
	},
	methods: {
		

	},
	components: { 
		EditForm, VideoPlayer,
 	},
};
</script>

<style scoped>
.title-box {
	height: 50px;
	margin-top:20px;
}
</style>