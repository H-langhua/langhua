import request from './../utils/request'
/* 添加订单 */
export function addOrder (params) {
  return request.post('/order/addOrder', params)
}
/* 获取确认订单信息 */
export function confirmOrder (params) {
  return request.get('/order/confirmOrder', { params })
}
/* 修改订单地址 */
export function updateOrderAddress (params) {
  return request.post('/order/updateOrderAddress', params)
}
/* 删除订单 */
export function deleteCartItem (params) {
  return request.get('/order/deleteCartItem', { params })
}
