import axios from 'axios'
import router from '../router'

const isDev = process.env.NODE_ENV === 'development'
const request = axios.create({
  baseURL: isDev ? '' : 'http://121.89.205.189/api',
  timeout: 6000
})
request.interceptors.request.use(function (config) {
  config.headers.common.token = localStorage.getItem('token') || ''
  return config
}, function (error) {
  return Promise.reject(error)
})
request.interceptors.response.use(function (response) {
  if (response.data.code === '10119') {
    router.push('/login')
  }
  return response
}, function (error) {
  return Promise.reject(error)
})
export default request
