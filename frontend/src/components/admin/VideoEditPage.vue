<template>
	<div>
		<div class="title-box">
			<h5>영상 수정하기</h5>
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
		this.fetchData();
	},
	methods: {
		fetchData: function() {
			let videoid = this.$route.query.videoid;
			this.$store.dispatch('getEditScriptList', {
				videoid: videoid,
				start: 0,
			});
			this.$store.dispatch('getEditVideoInfo', {
				videoid: videoid
			});
		},

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