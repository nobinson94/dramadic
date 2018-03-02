<template>
	<div class="container">
		<div class="row" style="height: 20px;"></div>
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
						<label for="inputEmail" class="col-md-12 control-label"><strong>아이디</strong></label>
						<div class="col-md-12">
							<input type="email" class="form-control" id="inputEmail3" placeholder="Email">
	    				</div>
	  				</div>
	  				<div class="form-group">
	    				<label for="inputPassword" class="col-md-12 control-label"><strong>비밀번호</strong></label>
	    				<div class="col-md-12">
	      					<input type="password" class="form-control" id="inputPassword3" placeholder="Password">
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
					      	<button type="submit" class="btn btn-default btn-block">로그인</button>
					      	<p class="text-center">아직 계정이 없으신가요?</p>
					      	<a href="/signup" class="btn btn-default btn-block">가입하기</a>
					    </div>
					</div>
				</form>
			</div>
			<div class="col-md-3"></div>
		</div>
	</div>
</template>

<style>
.login-box {
	color: black;
}
img {
	max-width: 100%;
}
</style>