import request from '@/utils/request'
// 菜单列表
export const menuListApi = (data = {}) => {
  return request({
    url: '/menu/list',
    method: 'GET',
    data
  })
}
// 添加
export const menuAddAPI = (data) => {
  return request({
    url: '/menu/add',
    method: 'POST',
    data
  })
}
// 修改
export const menuUpdateAPI = (data) => {
  return request({
    url: '/menu/update',
    method: 'PUT',
    data
  })
}
