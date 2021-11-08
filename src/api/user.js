import request from './../utils/request'
/**
 * 验证手机号码是否被注册过
 * @param {*} params
 */
export function docheckphone (params) {
  return request.post('/user/docheckphone', params)
}

/**
 * 发送短信验证码
 * @param {*} params
 */
export function dosendmsgcode (params) {
  return request.post('/user/dosendmsgcode', params)
}
/**
 * 验证验证码是否正确
 * @param {*} params
 */
export function docheckcode (params) {
  return request.post('/user/docheckcode', params)
}
/**
 * 注册
 * @param {*} params
 */
export function dofinishregister (params) {
  return request.post('/user/dofinishregister', params)
}
/**
 * 登录
 */
export function doLogin (params) {
  return request.post('/user/login', params)
}
