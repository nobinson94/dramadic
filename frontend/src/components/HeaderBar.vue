<template>
	<div class="header-bar">
			<div class="container-fluid flex-xs-column d-sm-inline-flex d-md-inline-flex d-lg-inline-flex d-xl-inline-flex"> 
				<div class="logo-container d-block">
					<router-link :to="{path: '/'}"><img src="../assets/img/logo.png"></router-link>
				</div>
				<div class="search-form-container d-block">
					<form class="d-flex search-form" @submit.prevent="searchWord">
						<input type="search" placeholder="Search Word" v-model="targetWord">
						<button class="search-btn">
							<img src="../assets/img/search.png">
						</button>
					</form>
				</div>
				<div class="info-container d-none d-sm-block">
					<div class="user-info-container">
						<template v-if="isLoggedIn">
							 {{ username }}님 반갑습니다!
							<router-link :to="{path: '/userinfo'}" class="font-dramadic">회원정보</router-link>
							<a href="" @click.prevent="logout">로그아웃</a>
						</template>
						<template v-else>
							<router-link :to="{path: '/signup'}">Sign Up</router-link>
							or
							<router-link :to="{path: '/login'}">Log In</router-link>
						</template>
					</div>
					<div class="lang-select-container">
						<button class="btn btn-outline-light" @click="showModal">{{lang.kor}} / {{lang.for}}</button>
						<button class="btn btn-outline-light">검색 옵션</button>
					</div>
				</div>
			</div>	
	</div>
</template>

<script>
import SearchPage from './SearchPage.vue'

export default {
	methods: {
		logout() {
			this.$store.dispatch('logout');
		},
		searchWord() {
			if(this.targetWord.trim() === '') alert('검색할 단어를 입력하세요');
			else this.$router.push({path: 'search', query: {word: this.targetWord}});
		},
		showModal() {
			this.$store.commit('showModal');
		}
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
			return this.$store.getters.userName;
		},
		lang() {
			if(localStorage.getItem("lang")) return this.$store.getters.lang;
			var langObj = {kor : '영어', for: 'Eng', id: '1',name: 'lang-en',active:true};
			localStorage.setItem("lang", JSON.stringify(langObj));
			return langObj;
		}
	},
	watch: {
		isLoggedIn: function() {
			this.$router.go(this.$router.currentRoute);
		}
	}
}
	
</script>

<style scoped>

@media (min-width: 768px) {
	img {
		max-width: 100%;
	}
	.header-bar {
		padding-top: 10px;
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
	  width: 800px;
	  min-width: 200px;
	}
	.logo-container {
		width: 250px;
		min-width: 250px;
		height: 90px;
	}
	.info-container {
		text-align: right;
		padding-top: 0px;
		width: 1000px;
		min-width: 200px;
		height: 90px;
		float: right;
		font-size: 18px;
		color: white;
	}
	.info-container a {
		font-size: 20px;
		color: #f2de7d;
	}
	.user-info-container {
		height: 50px;
	}
	.search-form-container {
		padding-top: 15px;
		width: 600px;
		min-width: 600px;
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
}
@media (max-width: 768px) {
	img {
		max-width: 100%;
		max-height: 100%;
	}
	.header-bar {
	  background: #00013e;
	  padding-bottom: 10px;
	}
	.logo-container {
		padding-top: 10px;
		height: 100px;
		text-align: center;
		width: 100%;
	}
	.info-container {
		display: none;
	}
	.user-info-container {
		height: 50px;
	}
	.search-form-container {
		width: 100%;
		font-size: 22px;
	}
	.search-form > input {
		width: 80%;
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
}
</style>