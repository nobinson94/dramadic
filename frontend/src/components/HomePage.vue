<template>
	<div class="main-content">
		<div class="container">
			<div style="height: 70px;"></div>
			<div class="row">
				<div class="col-md-12 text-center"><img src="../assets/img/logo.png"></div>
			</div>
			<div class="row">
				<div class="col-md-12 guide text-center">search the words through the videos</div>
			</div>
			<div class="row" style="height: 20px;"></div>
			<div class="row">
				<div class="col-md-2"></div>
				<div class="col-md-8 form-box">
					<form>
						<div class="form-group search-form text-center">
							<input type="search" class="form-control" id="wordToSearch" placeholder="Search word">
						</div>
						<div class="form-group search-form text-center">
							<button class="btn btn-dramadic" v-on:click="searchWord">검색</button>
						</div>
					</form>
				</div>
				<div class="col-md-2"></div>
			</div>
			<div class="row">
				<div class="col-md-12 lang text-center">
						language
						<a href="/">한국어</a>
						<a href="/">English</a>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: function() {
		return {
			word: [] 
		}
	},
	methods: {
		searchWord: function () {
			const url ='/api';
			this.$http.get(`${url}/users`)
			.then((result) => {
				console.log(result);
			})
		}
	}
}
</script>

<style>
body {
	height: 100%;
	background: #00013e;
}
.lang {
  color: #FFFFFF;
}
a {
	color: #FFFFFF;
}
a:hover, a:focus {
	color: #FFFFFF;
}
.guide {
  color: #f2de7d;
  font-style: italic;
  font-size: 20px;
}
</style>