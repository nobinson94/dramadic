const state = {
	showLangModal: false,
	showNewVideoModal: false,
}
const getters = {
	showLangModal: state => {
		return state.showLangModal
	},
	showNewVideoModal: state => {
		return state.showNewVideoModal
	}
}
const mutations = {
	showLangModal (state) {
		state.showLangModal = true;
	},
	hideLangModal (state) {
		state.showLangModal = false;
	},
	showNewVideoModal (state) {
		state.showNewVideoModal = true;
	},
	hideNewVideoModal (state) {
		state.showNewVideoModal = false;
	}
}
const actions = {

}

export default {
  state,
  getters,
  actions,
  mutations,
}