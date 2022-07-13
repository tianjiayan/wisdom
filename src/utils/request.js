import axios from 'axios'
import { Message } from 'element-ui'
import exceptionMessage from './exception-message'
import store from '../store'
import loading from './loading'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
  //   headers: { 'X-Custom-Header': 'foobar' }
})
// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    loading.open()
    const token = store.getters.token
    if (token) config.headers.token = token
    // console.log(config);
    return config
  },
  function (error) {
    loading.close()
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    loading.close()
    if (response.data.code === 200) {
      return response.data.data
    }

    // console.log(response);
    _showErrorMessage(response.data.code, response.data.msg)
  },
  function (error) {
    // console.log('2')
    loading.close()
    return Promise.reject(error)
  }
)

// 错误消息提示
const _showErrorMessage = (code, msg) => {
  const message = exceptionMessage[code] || msg || '未知错误'
  Message({ message, type: 'error' })
}

// 处理get传参
const request = (options) => {
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data || {}
  }
  return service(options)
}

export default request
