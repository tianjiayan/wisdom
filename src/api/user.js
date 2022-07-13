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
export const addUser = (data) => {
  return request({ url: '/user/add', method: 'POST', data })
}
