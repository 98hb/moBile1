/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})
// 请求拦截器
// Add a request interceptor
// axios.interceptors.request.use(function (config) {
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 在请求被发送之前做一些事情
  // config : 本次请求的请求配置对象
  // console.log(config)
  // 从 store.state 里面 解构 出来 user
  const { user } = store.state
  // 如果 满足
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // console.log(config)
  return config
}, function (error) {
  // Do something with request error
  // 处理请求错误
  return Promise.reject(error)
})
// 响应拦截器
export default request
