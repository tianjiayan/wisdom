export default {
  namespaced: true,
  state: () => ({
    loading: false
  }),
  mutations: {
    open(state) {
      state.loading = true
    },
    close(state) {
      state.loading = false
    }
  },
  actions: {}
}
