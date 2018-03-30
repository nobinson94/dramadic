<template>
	<div class="container">
		<div class="row" style="height: 20px;"></div>
		<div class="row">
			<div class="col-md-3"></div>
			<div class="col-md-6">
				<h3 class="text-center"><strong>회원가입</strong></h3>
			</div>
		</div>
		<div v-if="signupType===0" class="row">
			<div class="container">
				<div class="row" style="height: 20px;"></div>
				<div class="row">
					<div class="col-md-4"></div>
					<div class="col-md-4 text-center signupTypeBox">
						<button class="btn btn-kakao">
							<span>카카오톡으로 가입하기</span>
						</button>
					</div>
				</div>
				<div class="row">
					<div class="col-md-4"></div>
					<div class="col-md-4 text-center signupTypeBox">
						<button class="btn btn-fb">페이스북으로 가입하기</button>
					</div>
				</div>
				<div class="row">
					<div class="col-md-4"></div>
					<div class="col-md-4 text-center signupTypeBox">
						<button class="btn btn-naver">네이버로 가입하기</button>
					</div>
				</div>
				<div class="row">
					<div class="col-md-4"></div>
					<div class="col-md-4 text-center signupTypeBox">
						<button class="btn btn-dramadic" v-on:click="signupType=1">이메일로 가입하기</button>
					</div>
				</div>

			</div>
		</div>
		<div v-if="signupType===1" class="row">
			<div class="col-md-3"></div>
			<div class="col-md-6 signup-box">
				<form class="form-horizontal">
					<div class="form-group row">
						<label for="id" class="col-md-12 control-label"><strong>아이디</strong></label>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="user.email" placeholder="email" v-on:blur="isEmail" v-on:change="makeIDFlag0">
	    				</div>
	    				<div class="col-md-2"><button v-on:click="checkDuplicate" class="btn btn-dramadic">중복체크</button></div>
	    				<span class="col-md-12" v-if="checkID===1">이메일형식에 맞게 적어주세요.</span>
	    				<span class="col-md-12" v-if="noEmail===1 && user.email===''">아이디를 입력해주세요.</span>
					</div>
					<div class="form-group row">
						<label for="password" class="col-md-12 control-label"><strong>비밀번호</strong></label>
						<div class="col-md-8">
							<input type="password" class="form-control" v-model="user.password" placeholder="password" v-on:blur="isPassword">
	    				</div>
	    				<span class="col-md-12" v-if="checkPassword===1">비밀번호 길이가 너무 짧습니다. (최소 8글자) </span>
		    			<span class="col-md-12" v-if="noPassword===1 && user.password===''" >비밀번호를 입력해주세요. </span>
					</div>
					<div class="form-group row">
						<label for="passwordcheck" class="col-md-12 control-label"><strong>비밀번호 확인</strong></label>
						<div class="col-md-8">
							<input type="password" class="form-control" v-model="user.passwordcheck" placeholder="password">
		    			</div>
		    			<span class="col-md-12" v-if="checkPasswordDouble===1">비밀번호가 다릅니다.</span>
					</div>
					<div class="form-group row">
						<label for="name" class="col-md-12 control-label"><strong>이름</strong></label>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="user.name" placeholder="name" v-on:blur="isName">
	    				</div>
		    			<span class="col-md-12" v-if="noName===1 && user.name===''">이름을 입력해주세요.</span>
					</div>
					<div class="form-group row">
						<label for="address" class="col-md-12 control-label"><strong>주소</strong></label>
						<div class="col-md-12">
							<input type="text" class="form-control" v-model="user.address" placeholder="address">
	    				</div>
					</div>

					<div class="row">
						<div class="col-md-3"></div>
						<div class="col-md-6 text-center">
							<button v-on:click="signupSubmit" class="btn btn-dramadic">확인</button>
							<button v-on:click="cancel" class="btn btn-default">취소</button>
						</div>
					</div>
					
				</form> 
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: function () {
		return {
			signupType: 0,
			user : {
				email: '',
				password: '',
				passwordcheck: '',
				name: '',
				address: '',
			},
			emailCheck: 0,
			noName: 0,
			noEmail: 0,
			noPassword: 0,
		}
	},
	
	computed: {
		checkPassword: function() {
			var user_info = this.user;
			var pw = user_info.password;

			if (pw === '') return 0;
			else if (pw.length <= 7) return 1; // 길이가 너무 짧습니다.
			else return 2;
		},
		checkPasswordDouble: function() {
			var user_info = this.user;
			var pw = user_info.password;
			var pw_check = user_info.passwordcheck;

			if (pw !== pw_check) return 1;
			else return 2;
		},
		checkEmail: function() {
			var user_info = this.user;
			var email = user_info.email;

			if (email === '') return 0;
			else if (email.length <= 5) return 1; //이메일 형식에 맞지 않습니다.
			else return 2;
		},
		checkName: function() {
			var user_info = this.user;
			var name = user_info.name;

			if (name === '') return 0; 
			else return 1;
		}
	},
	methods: {
		checkDuplicate() {
			var user_info = this.user;
			var email = user_info.email;

			if (email === '') alert("이메일을 입력하세요.");
			else if (email.length <= 5) alert("이메일 형식에 맞게 입력하세요.");
			else {
				this.$http.post('/api/auth/checkduplicate', {id: email})
				.then((response) => {
					if (response.data.length === 0) {
						alert("사용가능합니다.");
						this.emailCheck = 1;
					} else {
						alert("이미 사용중인 아이디입니다.");
						this.emailCheck = 0;
					}
				})
			}
		},
		isEmail() {
			var user_info = this.user;
			var id = user_info.email;

			if(id === '') this.noEmail = 1;
		},
		isPassword() {
			var user_info = this.user;
			var pw = user_info.password;

			if(pw === '') this.noPassword = 1;
		},
		isName() {
			var user_info = this.user;
			var name = user_info.name;

			if(name === '') this.noName = 1;
		},
		makeIDFlag0() {
			this.emailCheck = 0;
		},
		signupSubmit() {
			var user_info = this.user;

			if (user_info.email === '') alert("이메일을 입력하세요.");
			else if (user_info.email.length <= 5) alert("이메일 형식이 맞지 않습니다.");
			else if (this.emailCheck === 0) alert("이메일 중복체크를 해주세요.");
			else if (user_info.password === '') alert("비밀번호를 입력하세요.");
			else if (user_info.password.length <= 7) alert("비밀번호가 너무 짧습니다.");
			else if (user_info.password !== user_info.passwordcheck) alert("비밀번호 확인이 일치하지 않습니다.");
			else if (user_info.name === '') alert("이름을 입력하세요.");
			else {
				this.$http.post('/api/auth/signup', {user_info: user_info})
				.then((response) => {
					if (parseInt(response.data) == 0) {
						alert('Dramadic의 회원이 되신 것을 축하합니다!');
						this.$router.replace('/');
					} 
				})
			}

		},
		cancel() {
			router.go(-1);
		},
	}
}
</script>

<style scoped>
.signupTypeBox {
	height: 50px;
}
.signupTypeBox button{
	width: 100%;
}
.btn-kakao {
	background-color: #FFDE00;
	color: #432F2E;
	font-weight: bold;
}
.btn-fb {
	background-color: #3b5998;
	color: white;
	font-weight: bold;
}
.btn-naver {
	background-color: #1ec800;
	color: white;
	font-weight: bold;
}
.btn-dramadic {
	font-weight: bold;
}
</style>