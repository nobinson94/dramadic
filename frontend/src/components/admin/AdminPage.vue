<template>
	<div class="container" >
		<div v-if="isAdmin">
			<h3>Video Admin Page</h3>
			<div class="d-flex row">
				<div class="col-md-12">
					<div>{{ admin_name }}님 환영합니다.</div>		
				</div>
			</div>
			<router-view />
		</div>
		<div v-else>
			
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
		if(!this.isAdmin) {
			alert("관리자만 접근 가능합니다!")
			this.$router.go(-1);
		}
	},
	watch : {
		
	},
	computed: {
		admin_name() {
			return this.$store.getters.adminName;
		},
		isAdmin() {
			return this.$store.getters.isAdmin;
		}
	},
	methods: {
		
	}
}
</script>

<style scoped>
	
</style>