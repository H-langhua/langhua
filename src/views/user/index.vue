<template>
  <div class="box">
    <div class="header">
       <van-nav-bar
        title="个人中心"
        left-arrow
        @click-left="$router.back()"
      />
    </div>
    <div class="userimg">
      <van-image
        round
        fit="cover"
        width="100px"
        height="100px"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
    </div>
    <van-cell-group title="信息管理">
      <van-cell title="个人信息" is-link  />
      <van-cell title="管理地址列表" is-link />
    </van-cell-group>
    <van-cell-group title="我的某东">
      <van-cell title="购物车" is-link />
      <van-cell title="我的订单" is-link />
    </van-cell-group>
    <div class="content" v-if="isLogin">
      <van-button @click="logout" round type="danger">退出</van-button>
    </div>
    <div class="content" v-else>
      个人中心
      <van-button @click="login" round type="danger">登录</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button, Cell, CellGroup, NavBar, Image as VanImage } from 'vant'
import { mapMutations, mapState } from 'vuex'
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(VanImage)
export default {
  methods: {
    ...mapMutations({
      changeLoginState: 'user/changeLoginState'
    }),
    logout () {
      localStorage.removeItem('userid')
      localStorage.removeItem('token')
      localStorage.removeItem('isLogin')
      this.changeLoginState(false)
      this.$router.replace('/login')
    },
    login () {
      this.$router.replace('/login')
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin
    })
  }
}
</script>

<style lang="scss" scoped>
  .box{
    .header{
      display: block;
      height: 70px;
      .van-nav-bar{
        box-sizing: border-box;
        height: 100%;
        padding: 10px 0;
      }
    }
    .userimg{
      display: flex;
      justify-content: center;
    }
  }
  .content{
    background-color: #fff;
    box-sizing: border-box;
    width: 100%;
    padding: 15px ;
    font-size: 16px;
    .van-button.van-button--danger{
      width: 80%;
      margin: 35px auto;
      display: block;
    }
  }
</style>
