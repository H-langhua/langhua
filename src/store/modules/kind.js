export default {
  namespaced: true,
  state: {
    kindList: []
  },
  mutations: {
    changeKindList (state, payload) {
      state.kindList = payload
    }
  }
}
