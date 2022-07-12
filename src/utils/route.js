// 获取一级路由
export const removeChildrenRoutes = (routes) => {
  console.log(routes)
  // const result = []
  routes.forEach((item) => {
    console.log(item.components.default.name)
  })
}
