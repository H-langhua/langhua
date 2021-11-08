<template>
    <van-tabbar v-model="active" class="footer" active-color="#fa2c19" v-if="!$route.meta.hidden" >
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/kind" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="cart-o">购物车{{ isLogin ? '(' + totalNum + ')' : ''}}</van-tabbar-item>
      <van-tabbar-item to="/user" v-if="isLogin" icon="contact">我的</van-tabbar-item>
      <van-tabbar-item to="/user" v-else icon="contact">未登录</van-tabbar-item>
    </van-tabbar>
</template>

<script>
import Vue from 'vue'
import { Tabbar, TabbarItem } from 'vant'
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
Vue.use(Tabbar)
Vue.use(TabbarItem)
export default {
  name: 'JDFooter',
  data () {
    return {
      active: 0
    }
  },
  computed: {
    ...mapGetters({
      totalNum: 'totalNum'
    }),
    ...mapState({
      isLogin: state => state.user.isLogin
    })
  },
  methods: {
    ...mapActions({
      getCarListAction: 'cart/getCarListAction'
    }),
    ...mapMutations({
      updatecartListState: 'cart/updatecartListState'
    })
  },
  mounted () {
    if (this.isLogin) {
      this.getCarListAction({
        userid: localStorage.getItem('userid')
      }).then(res => {
        if (res.data.code === '10020') {
          this.updatecartListState([])
        } else {
          this.updatecartListState(res.data.data)
        }
      })
    }
  }
}
</script>

<style>
  .footer {
  background-color: #f7f7f7;
  border-top: 1px solid #ccc;
  height: 50px;
}
</style>
