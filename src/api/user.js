import request from '@/utils/request'

// 验证码接口
const getCaptcha = () => {
  return request({
    url: '/captcha',
    method: 'GET'
  })
}
// 登录接口
const login = (data) => {
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
const getUserInfo = () => {
  return request({ url: '/user/info', method: 'GET' })
}
// 导航接口
const getMenuList = () => {
  return request({ url: '/menu/nav', method: 'GET' })
}
export default {
  getCaptcha,
  login,
  getUserInfo,
  getMenuList
}
