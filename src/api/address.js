import request from './../utils/request'
/* 查询地址列表 */
export function getAddresslist (params) {
  return request.get('/address/list', { params })
}
/* 查询默认地址 */
export function defaultAddress (params) {
  return request.post('/address/defaultAddress', params)
}
/* 更新地址 */
export function updateAddress (params) {
  return request.post('/address/update', params)
}
/* 删除地址 */
export function deleteAddress (params) {
  return request.post('/address/delete', params)
}
/* 添加订单地址 */
export function addAddress (params) {
  return request.post('/address/add', params)
}
