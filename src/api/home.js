import request from './../utils/request'
/* 获取轮播图数据 */
export function getBannerList () {
  return request.get('/banner/list')
}
/* 获取秒杀列表数据 */
export function getSeckillList (params) {
  return request.get('/pro/seckilllist', { params })
}
/* 获取商品列表数据 */
export function getProList (params) {
  return request.get('/pro/list', { params })
}
