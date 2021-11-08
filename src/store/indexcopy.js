import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import { doLogin } from './../api/user'
import { Dialog, Toast } from 'vant'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: localStorage.getItem('isLogin') === 'true' || false
  },
  mutations: {
    changeLoginState (state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
    async loginAction (context, params) {
      const res = await doLogin({
        loginname: params.loginname,
        password: params.password
      })
      if (res.data.code === '10010') {
        Dialog.confirm({
          message: '您还未注册，是否去注册',
          confirmButtonText: '注册',
          cancelButtonText: '取消'
        })
          .then(() => {
            // on confirm
            router.push({ name: 'regStep1', params: { loginname: this.loginname } })
          })
          .catch(() => {
            // on cancel
          })
      } else if (res.data.code === '10011') {
        Toast('密码错误')
      } else {
        Toast('登录成功')
        localStorage.setItem('userid', res.data.data.userid)
        localStorage.setItem('token', res.data.data.token)
        localStorage.setItem('isLogin', true)
        context.commit('changeLoginState', true)
        router.back()
      }
    }
  },
  modules: {
  }
})
