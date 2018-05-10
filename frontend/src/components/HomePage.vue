<template>
	<div class="main-content">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="user-info">
						<template v-if="isLoggedIn">
							<div>
								{{ username }}님 반갑습니다!
							</div>
							<div>
							 	<router-link :to="{path: '/userinfo'}" class="font-dramadic">회원정보</router-link>
								<a href="" @click.prevent="logout" class="font-dramadic">로그아웃</a>
								<router-link :to="{path: '/admin'}" v-if="isAdminUser" class="font-dramadic">비디오 관리하기</router-link>
							</div>
						</template>
						<template v-else>
							<router-link :to="{path: '/signup'}" class="font-dramadic">Sign Up</router-link>
							or
							<router-link :to="{path: '/login'}" class="font-dramadic">Log In</router-link>
						</template>
					</div>
				</div>
			</div>
			<div style="height: 70px;"></div>
			<div class="row">
				<div class="col-md-12 text-center"><img src="../assets/img/logo.png" class="logo-img"></div>
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
							<button class="btn btn-outline-dramadic" @click.prevent="searchWord">검색</button>
							<button class="btn btn-outline-dramadic" @click.prevent="showModal">언어 설정</button>
						</div>
					</form>
				</div>
				<div class="col-md-2"></div>
			</div>
		</div>
		<lang-modal-box v-if="showModalState"/>
	</div>
</template>

<script>
import LangModalBox from './modalBox/LangModalBox.vue'

export default {
	created () {
		this.$store.commit('updateTargetWord', '');
	},
	methods: {
		searchWord() {
			if(this.targetWord.trim() === '') alert('검색할 단어를 입력하세요');
			else this.$router.push({path: 'search', query: {word: this.targetWord}});
		},
		logout() {
			this.$store.dispatch('logout');
		},
		showModal() {
			this.$store.commit('showLangModal');
		}
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.isLoggedIn;
    	},
    	isAdminUser() {
    		return this.$store.getters.isAdmin;
    	},
		targetWord: {
			set (val) {
				this.$store.commit('updateTargetWord', val);
			},
			get () {
				return this.$store.state.searchResults.targetWord;
			}
		},
		username() {
			return this.$store.getters.userName;
		},
		showModalState() {
			return this.$store.getters.showLangModal;
    	},
	},
	components: {
		LangModalBox
	},
}
</script>

<style scoped>
body {
		height: 100%;
		background: #00013e;
}

@media (min-width: 560px) {
	a:hover, a:focus {
		text-decoration: underline;
		color: #f2de7d;
	}
	.guide {
	  color: #f2de7d;
	  font-style: italic;
	  font-size: 20px;
	}
	.user-info {
		padding-top: 20px;
		color: white;
		font-size: 16px;
		text-align: right;
	}
}

@media (max-width: 560px) {
	.logo-img {
		width: 100%;
	}
	.user-info {
		padding-top: 20px;
		color: white;
		font-size: 15px;
		text-align: center;
	}
}

</style>