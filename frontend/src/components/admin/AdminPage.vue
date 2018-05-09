<template>
	<div class="container">
		<h3>Video Admin Page</h3>
		<div class="d-flex row">
			<div class="col-md-12">
				<div>{{ admin_name }}님 환영합니다.</div>		
			</div>
		</div>
		<router-view />
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
		
	}
}
</script>

<style scoped>
	
</style>