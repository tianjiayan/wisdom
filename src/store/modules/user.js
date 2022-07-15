import { login, userInfo, MenuNav, logout, getPermissionList } from '@/api/user'
import { setItem, getItem, removeItem } from '@/utils/storage'
import { TOKEN } from '@/utils/const'
export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {},
    menus: [],
    authoritys: [],
    permission: ''
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setPermission(state, permission) {
      state.permission = permission
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setMenus(state, menus) {
      state.menus = menus
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
    },
    async getPermission({ commit }) {
      const { authoritys, menus } = await getPermissionList()
      if (authoritys.length > 0 && menus.length > 0) {
        commit('setPermission', authoritys)
        commit('setMenus', menus)
        return { authoritys, menus }
      } else {
        return false
      }
    }
  }
}
