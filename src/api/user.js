import request from '@/utils/request'

// 验证码接口
export const getCaptcha = () => {
  return request({
    url: '/captcha',
    method: 'GET'
  })
}
// 登录接口
export const login = (data) => {
  return request({
    url:
      '/login?username=' +
      data.username +
      '&password=' +
      data.password +
      '&code=' +
      data.code +
      '&token=' +
      data.token,
    method: 'POST',
    data
  })
}

// 用户信息接口
export const userInfo = () => {
  return request({
    url: '/user/info',
    method: 'GET'
  })
}
// 导航接口
export const MenuNav = () => {
  // eslint-disable-line no-unused-vars
  return request({ url: '/menu/nav', method: 'GET' })
}

// 退出接口
export const logout = () => {
  return request({
    url: '/logout',
    method: 'POST'
  })
}
// 用户页面接口
export const userListApi = (data) => {
  return request({
    url: '/user/list',
    data,
    method: 'GET'
  })
}
// 添加
export const addUser = (data) => {
  return request({ url: '/user/add', method: 'POST', data })
}
// 编辑
export const getupdate = (data) => {
  return request({ url: '/user/update', method: 'PUT', data })
}

// 分配角色
export const userRoleApi = (id, data) => {
  return request({
    url: `/user/assign/${id}`,
    method: 'POST',
    data
  })
}
// 删除
export const userDelApi = (integer) => {
  return request({
    url: `/sys/user/del`,
    method: 'POST',
    data: integer
  })
}

export const userInfoIdAPI = (id) => {
  return request({
    url: `/user/userInfo/${id}`,
    method: 'GET'
  })
}
export const getRoleList = (data) => {
  return request({
    url: '/role/list',
    method: 'GET',
    data
  })
}
// 获取用户权限接口
export const getPermissionList = () => {
  return request({
    url: '/menu/nav',
    method: 'GET'
  })
}
