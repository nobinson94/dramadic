<template>
	<div class="header-bar container-fluid">
		<div class="row guide-bar">
			<div class="col-md-12 text-center">search the words through the videos</div>
		</div>
		<div class="row search-bar">
			<div class="col-md-12 d-flex">
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
img {
	max-width: 100%;
}
.header-bar {
  background: #00013e;
  height: 120px;
}
.login-btn {
  color: #FCEFBD;
  font-size: 20px;
  text-align: right;
}
.login-btn a {
	color: #FCEFBD;
}
.guide-bar {
  color: #f2de7d;
  font-style: italic;
  font-size: 20px;
  padding-top: 20px;
  height: 30px;
}
.search-bar {
	height: 90px;
}
.logo-container {
	padding-bottom: 5px;
	padding-left: 20px;
	width: 270px;
	min-width: 270px;
	height: 90px;
}
.user-info-container {
	text-align: right;
	padding-top: 27px;
	padding-right: 20px;
	padding-left: 20px;
	width: 250px;
	min-width: 250px;
	height: 90px;
	float: right;
	font-size: 24px;
	color: white;
}
.user-info-container a {
	color: #f2de7d;
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
	border: 3px solid #f2de7d;
    border-radius: 5px;
    background-color: #00013e;
    color: #f2de7d;
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
	border: 3px solid #f2de7d;
	vertical-align: middle;
}
</style>