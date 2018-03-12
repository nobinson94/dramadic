<template>
	<div class="container">
		<div class="row" style="height: 20px;"></div>
		<div class="row">
			<div class="col-md-3"></div>
			<div class="col-md-6">
				<h3 class="text-center"><strong>회원가입</strong></h3>
			</div>
		</div>
		<div class="row">
			<div class="col-md-3"></div>
			<div class="col-md-6 signup-box">
				<form class="form-horizontal">
					<div class="form-group row">
						<label for="id" class="col-md-12 control-label"><strong>아이디</strong></label>
						<div class="col-md-10">
							<input type="text" class="form-control" v-model="user.id" placeholder="id">
	    				</div>
	    				<div class="col-md-2"><button v-on:click="id-check" class="btn btn-dramadic">중복체크</button></div>
					</div>
					<div class="form-group row">
						<label for="password" class="col-md-12 control-label"><strong>비밀번호</strong></label>
						<div class="col-md-10">
							<input type="password" class="form-control" v-model="user.password" placeholder="password">
	    				</div>
					</div>
					<div class="form-group row">
						<label for="password-check" class="col-md-12 control-label"><strong>비밀번호 확인</strong></label>
						<div class="col-md-10">
							<input type="password" class="form-control" v-model="user.passwordcheck" placeholder="password">
	    			</div>
	    			<span class="col-md-12" v-if="user.password !== user.passwordcheck && user.passwordcheck !== '' ">비밀번호가 다릅니다.</span>
					</div>
					<div class="form-group row">
						<label for="name" class="col-md-12 control-label"><strong>이름</strong></label>
						<div class="col-md-10">
							<input type="text" class="form-control" v-model="user.name" placeholder="name">
	    				</div>
					</div>
					<div class="form-group row">
						<label for="inputId" class="col-md-12 control-label"><strong>주소</strong></label>
						<div class="col-md-10">
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
			user : {
				id: '',
				password: '',
				passwordcheck: '',
				name: '',
				address: '',
			}
		}
	},
	methods: {
		signupSubmit() {
			var user_info = this.user;

		},
		cancel() {
			console.log('cancel');
		},

	}
}
</script>

<style>
	
</style>