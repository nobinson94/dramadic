<template>
	<div class="wrapper">
		<header-bar/>
		<main-content-box class="content-box"/>
		<footer-box/>

		<lang-modal-box v-if="showLangModal"/>
		<new-video-modal-box v-if="showNewVideoModal" />
	</div>
</template>

<script>
import HeaderBar from './HeaderBar.vue'
import MainContentBox from './MainContentBox.vue'
import FooterBox from './FooterBox.vue'
import LangModalBox from './modalBox/LangModalBox.vue'
import NewVideoModalBox from './modalBox/NewVideoModalBox.vue'

export default {
	components: {
			HeaderBar,MainContentBox,FooterBox,LangModalBox,NewVideoModalBox
	},
	computed: {
		showLangModal() {
			return this.$store.getters.showLangModal;
    	},
    	showNewVideoModal() {
    		return this.$store.getters.showNewVideoModal;
    	}
	}
}
</script>

<style>

.content-box {
  background-color: white;
  height: 100%;
  min-height: 400px;
  width: 100%;
  padding: 10px;

}
</style>