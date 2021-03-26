import axios from 'axios'
import { Message } from 'element-ui'
import cookie from 'js-cookie'
// 创建axios实例
const service = axios.create({
  baseURL: 'http://127.0.0.1:9110',
  timeout: 12000 // 请求超时时间
})

// http request 拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
       * code为非20000是抛错 可结合自己业务进行修改
       */
    const res = response.data
    if (res.code === 20000) {
      return response.data
    } else if (res.code === 23004) { // 获取用户信息失败
      // 清除cookie
      // localStorage.removeItem('guli-token')

      cookie.set('guli_token', '', { domain: 'localhost' })
      cookie.set('guli_user', '', { domain: 'localhost' })
      return response.data // 不显示错误信息
    } else if (res.code === 28004) { // 鉴权失败
      cookie.set('guli_token', '', { domain: 'localhost' })
      cookie.set('guli_user', '', { domain: 'localhost' })
      window.location.href = '/login'
      return
    } else if (res.code === 25000) { // 支付中
      return response.data // 不显示错误信息
    } else {
      Message({
        message: res.message || 'error',
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject('error')
    }
  },
  error => {
    console.log('err：' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

// 请求拦截器
service.interceptors.request.use(
  config => {
    // if (localStorage.getItem('guli-token')) { // 如果cookie中包含guli_token
    //   // 则发送后端api请求的时候携带token
    //   config.headers['token'] = localStorage.getItem('guli-token')
    // }
    // debugger
    if (cookie.get('guli_token')) { // 如果cookie中包含guli_token
      // 则发送后端api请求的时候携带token
      config.headers['token'] = cookie.get('guli_token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
