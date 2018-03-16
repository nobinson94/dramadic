<template>
	<div class="container">
		<div class="row" style="height: 20px;"></div>
		<template v-if="!logInState">
			<div class="row">
				<div class="col-md-3"></div>
				<div class="col-md-6">
					<h3 class="text-center"><strong>로그인</strong></h3>
				</div>
			</div>
			<div class="row">
				<div class="col-md-3"></div>
				<div class="col-md-6 login-box">
					<form class="form-horizontal">
						<div class="form-group">
							<label for="user_email" class="col-md-12 control-label"><strong>아이디</strong></label>
							<div class="col-md-12">
								<input type="text" class="form-control" v-model="user_login.email" placeholder="Email">
		    				</div>
		  				</div>
		  				<div class="form-group">
		    				<label for="user_password" class="col-md-12 control-label"><strong>비밀번호</strong></label>
		    				<div class="col-md-12">
		      					<input type="password" class="form-control" v-model="user_login.password" placeholder="Password">
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
						      	<button v-on:click="loginSubmit" class="btn btn-dramadic btn-block">로그인</button>
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
		<template v-else>
			환영합니다.
		</template>
		
	</div>
</template>

<script>
export default {
	data: function() {
		return {
			user_login: {
				email: '',
				password: ''
			}
		}
	},
	computed: {
		logInState() {
			return this.$store.getters.getLogInState;
		},
		username() {
			return this.$store.getters.getName;
		},
		userid() {
			return this.$store.getters.getId;
		}
	},
	methods: {
		loginSubmit() {
			var user_info = this.user_login;
			this.$http.post('/api/auth/login', {email: user_info.email, password: user_info.password})
				.then((res) => {
					localStorage.setItem('user_id',res.data.USER_ID);
					localStorage.setItem('user_name',res.data.USER_NAME);
					localStorage.setItem('is_logged_in', true);
					alert("로그인 성공");
					location.reload();
					
			})
		}
	}
}
</script>

<style>
.login-box {
	color: black;
}
img {
	max-width: 100%;
}

</style>
