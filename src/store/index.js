import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import permission from './modules/permission'
import menu from './modules/menu'
import tagsView from './modules/tagsview'
import loading from './modules/loading'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    permission,
    menu,
    tagsView,
    loading
  },
  getters
})
