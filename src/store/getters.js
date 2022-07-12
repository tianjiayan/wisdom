const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  authoritys: (state) => state.user.authoritys,
  menus: (state) => state.user.menus,
  Collapse: (state) => state.menu.isCollapse,
  tags: (state) => state.tagsView.tags,
  loading: (state) => state.loading.loading
}

export default getters
