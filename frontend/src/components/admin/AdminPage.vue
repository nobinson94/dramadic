<template>
	<div class="container">
		<h3>Video Admin Page</h3>
		<div class="d-flex row">
			<div class="col-md-12">
				<div>{{ admin_name }}님 환영합니다.</div>
				<button class="btn btn-outline-dark float-right" @click="showModal">새로운 영상 등록하기</button>
			</div>
		</div>
		<div class="row"></div>
		<div class="row">
			<video-select-page />
		</div>
	</div>
</template>

<script> 
import VideoSelectPage from './VideoSelectPage'
export default {
	data() {
		return {
			
		}
	},
	created() {
	},
	watch : {
		
	},
	computed: {
		admin_name() {
			return this.$store.getters.adminName;
		}
	},
	methods: {
		showModal() {
			this.$store.commit('showNewVideoModal');
		}
	},
	components: {
		VideoSelectPage
	}
}
</script>

<style scoped>
	
</style>