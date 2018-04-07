<template>
	<div class="wrapper">
		<header-bar/>
		<main-content-box class="content-box"/>
		<footer-box/>

		<lang-modal-box v-if="showModal"/>
	</div>
</template>

<script>
import HeaderBar from './HeaderBar.vue'
import MainContentBox from './MainContentBox.vue'
import FooterBox from './FooterBox.vue'
import LangModalBox from './LangModalBox.vue'

export default {
	components: {
			HeaderBar,MainContentBox,FooterBox,LangModalBox
	},
	computed: {
		showModal() {
			return this.$store.getters.showModal;
    	},
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