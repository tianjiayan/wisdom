import { login, userInfo, MenuNav, logout } from '@/api/user'
import { setItem, getItem, removeItem } from '@/utils/storage'
import { TOKEN } from '@/utils/const'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {},
    menus: [],
    authoritys: []
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setNav(state, nav) {
      state.menus = nav.menus
      state.authoritys = nav.authoritys
    }
  },
  actions: {
    async login({ commit }, data) {
      const response = await login(data)
      commit('setToken', response)
    },
    async userInfo({ commit }) {
      const response = await userInfo()
      commit('setUserInfo', response)
      console.log(response, 'usrInfo')
    },
    async userNav({ commit }) {
      const response = await MenuNav()
      commit('setNav', response)
      return response
    },
    async userLogout({ commit }) {
      await logout()
      commit('setToken', '')
      removeItem(TOKEN)
    }
  }
}
