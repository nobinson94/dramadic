<template>
	<div class="main-content">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="user-info float-right">
						<template v-if="isLoggedIn">
							{{ username }}님 반갑습니다. <a href="/#/user_info">회원정보</a> <a href="" @click.prevent="logout">로그아웃</a>
						</template>
						<template v-else>
							<a href="/#/signup">Sign Up</a>
							or
							<a href="/#/login">Log In</a>
						</template>
					</div>
				</div>
			</div>
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
					<form @submit.prevent="searchWord">
						<div class="form-group search-form text-center">
							<input type="search" v-model="targetWord" class="form-control" id="wordToSearch" placeholder="Search word">
						</div>
						<div class="form-group search-form text-center">
							<button class="btn btn-dramadic">검색</button>
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
	methods: {
		searchWord() {
			this.$store.dispatch('getWordList');
			this.$router.push( {path:'search'} );
		},
		logout() {
			this.$store.dispatch('logout');
		},
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.isLoggedIn;
    	},
		targetWord: {
			set (val) {
				this.$store.commit('updateTargetWord', val);
			},
			get () {
				return this.$store.state.words.targetWord;
			}
		},
		username() {
			return this.$store.state.user.name;
		}
	}
}
</script>

<style scoped>
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
	text-decoration: underline;
}
.guide {
  color: #f2de7d;
  font-style: italic;
  font-size: 20px;
}
.user-info {
	padding-top: 20px;
	color: white;
}
</style>