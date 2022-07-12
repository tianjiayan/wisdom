export default {
  namespaced: true,
  state: () => ({
    isCollapse: false
  }),
  mutations: {
    changeCollapse(state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {}
}
