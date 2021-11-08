import request from './../utils/request'

// 加入购物车
export function addCart (params) {
  return request.post('/cart/add', params)
}
// 获取购物车数据（以用户为单位）
export function getCartList (params) {
  return request.post('/cart/list', params)
}

// 更新购物车数量
export function updateNum (params) {
  return request.post('/cart/updatenum', params)
}

// 更新购物车单条数据选中状态
export function selectone (params) {
  return request.post('/cart/selectone', params)
}

// 更新购物车所有数据选中状态
export function selectall (params) {
  return request.post('/cart/selectall', params)
}

// 删除购物车单条数据
export function remove (params) {
  return request.post('/cart/remove', params)
}

// 删除当前用户的所有的数据
export function removeall (params) {
  return request.post('/cart/removeall', params)
}

// 获取某分类下某品牌的产品列表
export function getRecommendList (params) {
  return request.get('/pro/recommendlist', params)
}
