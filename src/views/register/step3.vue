<template>
  <div class="stepbox">
    <van-field v-model="password" label="密码" type="password" placeholder="请设置密码" />
    <van-button @click="register" :disabled="flag" round type="danger" block >完成</van-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { Field, Button, Dialog } from 'vant'
import { dofinishregister } from '../../api/user'
// import { dofinishregister } from './../../api/user'
Vue.use(Field)
Vue.use(Button)
Vue.use(Dialog)
export default {
  data () {
    return {
      tel: '',
      password: ''
    }
  },
  computed: {
    flag () {
      return this.password.length < 6
    }
  },
  methods: {
    register () {
      dofinishregister({
        tel: localStorage.getItem('tel'),
        password: this.password
      }).then(res => {
        Dialog.confirm({
          message: '注册成功，继续登录'
        })
          .then(() => {
            // on confirm
            // this.$router.push('/login')
            this.$router.go(-3)
          })
          .catch(() => {
            // on cancel
          })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .stepbox{
    width: 100%;
    .van-cell{
      width: 100%;
      padding: 15px ;
      font-size: 16px;
    }
    .van-button{
      width: 80%;
      margin: 35px auto;
    }
  }
</style>
