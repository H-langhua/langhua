import { getCartList } from './../../api/cart'
export default {
  namespaced: true,
  state: {
    cartList: []
  },
  mutations: {
    updatecartListState (state, payload) {
      state.cartList = payload
    }
  },
  actions: {
    getCarListAction (context, params) {
      return new Promise(resolve => {
        getCartList(params).then(res => {
          resolve(res)
        })
      })
    }
  }
}
