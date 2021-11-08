import request from '../utils/request'

export function getProDetail (params) {
  return request.get('/pro/detail/' + params)
}
