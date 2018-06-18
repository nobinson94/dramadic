<template>
	<div class="container">
		<div class="row" style="height: 20px;"></div>
		<template v-if="!isLoggedIn">
			<div class="row">
				<div class="col-md-3"></div>
				<div class="col-md-6">
					<h3 class="text-center"><strong>로그인</strong></h3>
				</div>
			</div>
			<div class="row">
				<div class="col-md-3"></div>
				<div class="col-md-6 login-box">
					<form class="form-horizontal" @submit.prevent="login({ email, password })">
						<div class="form-group">
							<label for="email" class="col-md-12 control-label"><strong>아이디</strong></label>
							<div class="col-md-12">
								<input type="text" class="form-control" v-model="email" name="email" placeholder="Email">
		    				</div>
		  				</div>
		  				<div class="form-group">
		    				<label for="password" class="col-md-12 control-label"><strong>비밀번호</strong></label>
		    				<div class="col-md-12">
		      					<input type="password" class="form-control" v-model="password" name="password" placeholder="Password">
		    				</div>
		  				</div>
						<div class="form-group">
						    <div class="col-sm-offset-2 col-md-12">
							    <div class="checkbox">
						    		<label><input type="checkbox">아이디 저장하기</label>
						        </div>
						    </div>
						</div>
						<div class="form-group">
							<div class="col-sm-offset-2 col-md-12">
						      	<button class="btn btn-dramadic btn-block">로그인</button>
						      	<br>
						      	<p class="text-center">아직 계정이 없으신가요?</p>
						      	<a href="/#/signup" class="btn btn-dramadic btn-block">가입하기</a>
						    </div>
						</div>
					</form>
				</div>
				<div class="col-md-3"></div>
			</div>			
		</template>		
	</div>
</template>

<script>

export default {
	data: function() {
		return {
			email: '',
			password: '',
		}
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.isLoggedIn;
		}
	},
	created() {
		if(this.isLoggedIn) this.$router.push({path: 'userinfo'});
	},
	methods: {
		login() {
			this.$store.dispatch("login", {email: this.email, password: this.password});
		}
	},
	watch: {
		isLoggedIn: function() {
			this.$router.go(this.$router.currentRoute);
		}
	}
};

</script>

<style scoped>
.login-box {
	color: black;
}
img {
	max-width: 100%;
}

</style>
