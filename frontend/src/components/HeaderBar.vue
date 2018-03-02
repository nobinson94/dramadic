<template>
	<div class="header-bar">
		<div class="container-fluid">
			<div class="row" style="height: 10px;"></div>
			<div class="row">
				<div class="col-md-12 guide text-center"><h4>search the words through the videos</h4></div>
			</div>
			<div class="d-flex">
				<div class="logo-container">
					<a href="/"><img src="../assets/img/logo.png"></a>
				</div>
				<div class="search-form-container">
					<form class="d-flex search-form">
						<input type="search" id="searchWord" placeholder="Search word">
						<button class="search-btn">
							<img src="../assets/img/search.png">
						</button>
					</form>
				</div>
				<div class="user-info-container">
					<a href="/#/signup">Sign Up</a>
					or
					<a href="/#/login">Log In</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	
</script>
<style>
.header-bar {
  background: #00013e;
  height: 140px;
}
.login-btn {
  color: #FCEFBD;
  font-size: 20px;
  text-align: right;
}
.login-btn a {
	color: #FCEFBD;
}
.guide {

}
.logo-container {
	padding-bottom: 5px;
	padding-left: 20px;
	width: 270px;
	min-width: 270px;
	height: 60px;
}
.user-info-container {
	text-align: right;
	padding-top: 27px;
	padding-right: 20px;
	padding-left: 20px;
	width: 250px;
	min-width: 250px;
	height: 50px;
	float: right;
	font-size: 24px;
	color: white;
}
.user-info-container a {
	color: white;
}
.search-form-container {
	padding-top: 15px;
	width: 1000px;
	min-width: 200px;
	vertical-align: middle;
	font-size: 22px;
}
.search-form > input {
	width: 100%;
	height: 56px;
	border: 0.5px solid white;
    border-radius: 5px;
    background-color: #00013e;
    color: white;
    margin-right: 8px;
    margin-top: 8px;
    padding-left: 10px;
}
.search-btn {
	margin-top: 8px;
	padding-bottom: 5px;
	width: 56px;
	height: 56px;
	border-radius: 5px;
	background-color: #00013e;
	color: white;
	border: 0.5px solid white;
	vertical-align: middle;
}
</style>