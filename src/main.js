import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { Icon, Image as VanImage } from 'vant'

Vue.config.productionTip = false
Vue.use(Icon)
Vue.use(VanImage)

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate () { Vue.prototype.$bus = this }
}).$mount('#app')
