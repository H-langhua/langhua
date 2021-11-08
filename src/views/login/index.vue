<template>
  <div class="box">
    <div class="header">
       <van-nav-bar
        title="登录"
        left-arrow
        @click-left="$router.back()"
      />
    </div>
    <div class="content">
      <van-field v-model="loginname" label="用户名" placeholder="用户名/手机号/邮箱" />
      <van-field v-model="password" label="密码" type="password" placeholder="请输入密码" />
      <van-button @click="login" :disabled="flag" round type="danger" block >登录</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Field, Button, Dialog, Toast } from 'vant'
import { mapActions } from 'vuex'
Vue.use(NavBar)
Vue.use(Field)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Toast)
export default {
  computed: {
    flag () {
      return this.loginname.trim() === '' || this.password.trim() === ''
    }
  },
  data () {
    return {
      loginname: '',
      password: ''
    }
  },
  methods: {
    ...mapActions({
      loginAction: 'user/loginAction'
    }),
    login () {
      this.loginAction({
        loginname: this.loginname,
        password: this.password
      })
    }
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
  }
  .content{
    background-color: #fff;
    width: 100%;
    .van-cell{
      width: 100%;
      padding: 15px ;
      font-size: 16px;
      .van-field__label{
        text-align: right;
        width: 3rem;
      }
    }
    .van-button{
      width: 80%;
      margin: 35px auto;
    }
  }

</style>
