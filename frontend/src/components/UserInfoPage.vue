<template>
	<div class="container">
		<div class="row" style="height: 20px;"></div>
		<div class="row">
			<div class="col-md-3"></div>
			<div class="col-md-6">
				<h3 class="text-center"><strong>회원정보</strong></h3>
			</div>
		</div>
		<div class="row" style="height: 20px;"></div>
		<div>
			<table class="table table-sm">
				<tr>
      				<th scope="row">Email</th>
      				<td> {{ userInfo.id }} </td>
      			</tr>
      			<tr>
      				<th scope="row">Name</th>
      				<td> {{ userInfo.name }} </td>
      			</tr>
      			<tr>
      				<th scope="row">Phone</th>
      				<td> {{ userInfo.phone }} </td>
      			</tr>
      			<tr>
      				<th scope="row">Address</th>
      				<td> {{ userInfo.address }} </td>
      			</tr>
      			<tr>
      				<th scope="row">Language</th>
      				<td> {{ userInfo.lang.kor }} / {{ userInfo.lang.for }}  </td>
      			</tr>
			</table>
		</div>
	</div>
</template>

<script>

export default {
	computed: {
		isLoggedIn() {
			return this.$store.getters.isLoggedIn;
		},
		userInfo() {
			return this.$store.getters.userInfo;
		},
	},
	created() {
		if(!this.isLoggedIn) this.$router.push({path: 'login'});
		else this.$store.dispatch('getUserInfo');
	},
	watch: {
		isLoggedIn: function() {
			if(!this.isLoggedIn)
				this.$router.push({path: 'login'});
		}
	},
	methods: {
	
	}
}
</script>