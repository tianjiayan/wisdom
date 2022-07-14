import request from "@/utils/request"

// 获取列表
export const roleListAPI = (data) => {
  return request({
    url: '/role/list',
    method: 'GET',
    data
  })
}
// 添加
export const roleAddApi = (data) => {
  return request({
    url: '/role/add',
    method: 'POST',
    data
  })
}
// 编辑 修改
export const roleEditAPI = (data) => {
  return request({
    url: '/role/update',
    method: 'PUT',
    data
  })
}
// 获取角色信息
export const roleInfoAPI = (id) => {
  return request({
    url: `/role/info/${id}`,
    method: 'GET'
  })
}
// 分配权限
export const rolePermAPI = (id, roles) => {
  return request({
    url: `/role/perm/${id}`,
    method: 'POST',
    data: roles
  })
}
