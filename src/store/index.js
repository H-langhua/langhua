import Vue from 'vue'
import Vuex from 'vuex'
import kind from './modules/kind'
import user from './modules/user'
import cart from './modules/cart'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    kind,
    user,
    cart
  },
  getters: {
    showNum (state) {
      return state.user.isLogin
    },
    totalNum (state) {
      return state.cart.cartList && state.cart.cartList.reduce((sum, item) => {
        return item.flag ? sum + item.num : sum + 0
      }, 0)
    },
    totalPrice (state) {
      return state.cart.cartList && state.cart.cartList.reduce((sum, item) => {
        return item.flag ? sum + item.num * item.originprice : sum + 0
      }, 0) * 100
    }
  }
})
