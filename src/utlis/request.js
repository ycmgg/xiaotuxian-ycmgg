// 1. 创建一个新的axios实例
// 2. 请求拦截器，如果有token进行头部携带
// 3. 响应拦截器：1. 剥离无效数据  2. 处理token失效
// 4. 导出一个函数，调用当前的axsio实例发请求，返回值promise

import axios from 'axios'
import store from '@/store'
import router from '@/router'
const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const Axios = axios.create({
  baseURL,
  timeout: 5000
})

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
  // 获取用户基本信息
  const { profile } = store.state.user
  // 频道用户是否有token
  if (profile.token) {
    // 设置token
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
Axios.interceptors.response.use(function ({ data }) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return data
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  if (error.response && error.response.status === 401) {
    store.commit('user/setUser', {})
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push('/login?redirectUrl=' + fullPath)
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})
// 请求工具函数
export default (url, method, submitData) => {
  // 负责发请求：请求地址，请求方式，提交的数据
  return Axios({
    url,
    method,
    // 1. 如果是get请求  需要使用params来传递submitData   ?a=10&c=10
    // 2. 如果不是get请求  需要使用data来传递submitData   请求体传参
    // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
    // method参数：get,Get,GET  转换成小写再来判断
    // 在对象，['params']:submitData ===== params:submitData 这样理解
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
