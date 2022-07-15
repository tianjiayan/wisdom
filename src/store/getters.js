const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  authoritys: (state) => state.user.authoritys,
  menus: (state) => state.user.menus,
  Collapse: (state) => state.menu.isCollapse,
  tags: (state) => state.tagsView.tags,
  loading: (state) => state.loading.loading,
  hasPermission: (state) => {
    return (state.user.permission && state.user.menus) || ''
  },
  permission: (state) => state.user.permission
}

export default getters
