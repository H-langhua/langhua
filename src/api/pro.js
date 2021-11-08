import request from '../utils/request'
/* 产品分类下品牌列表 */
export function getCategoryBrandList (params) {
  return request.get('/pro/categorybrandlist', { params })
}
/* 产品的分类列表 */
export function getCategoryList () {
  return request.get('/pro/categorylist')
}
/* 搜索列表 */
export function getProSearch (params) {
  return request.get('/pro/search', { params })
}
/* 热门搜索 */
export function getProHotWord (params) {
  return request.get('/pro/hotword', { params })
}
/* 获取某分类下某品牌的产品列表 */
export function getCategoryBrandProList (params) {
  return request.get('/pro/categorybrandprolist', { params })
}
/* 获取产品的详情数据 */
/* detail-------------------------- */
/* 获取商品分页列表数据 */
/* home-------------------------- */
/* 获取推荐产品列表的数据 */
/* cart-------------------------- */
/* 获取秒杀产品列表的数据 */
/* home-------------------------- */
