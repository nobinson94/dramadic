const state = {
	showModal: false,
}
const getters = {
	showModal: state => {
		return state.showModal
	}
}
const mutations = {
	showModal (state) {
		state.showModal = true;
	},
	hideModal (state) {
		state.showModal = false;
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