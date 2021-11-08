<template>
  <div class="stepbox">
    <van-field v-model="tel" type="tel" label="手机号" />
    <van-button @click="step" :disabled="flag" round type="danger" block >下一步</van-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { Field, Button, Dialog } from 'vant'
import { docheckphone } from './../../api/user'

Vue.use(Button)
Vue.use(Dialog)
Vue.use(Field)
export default {
  data () {
    return {
      tel: ''
    }
  },
  computed: {
    flag () {
      return !/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(this.tel)
    }
  },
  mounted () {
    console.log(this.$route.params)
    this.tel = this.$route.params.loginname
  },
  methods: {
    async step () {
      const res = await docheckphone({ tel: this.tel })
      console.log(res.data)
      if (res.data.code === '10005') {
        Dialog.confirm({
          message: '该用户已注册，是否直接登录',
          confirmButtonText: '登录',
          cancelButtonText: '取消',
          confirmButtonColor: '#C82519'
        })
          .then(() => {
            // on confirm
            this.$router.push('/login')
          })
          .catch(() => {
            // on cancel
          })
      } else {
        localStorage.setItem('tel', this.tel)
        Dialog.confirm({
          message: '我们将发送短信验证码至<br/>' + this.tel,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => {
            // on confirm
            this.$router.push('/register/step2')
          })
          .catch(() => {
            // on cancel
          })
      }
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
