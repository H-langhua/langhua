<template>
  <div class="stepbox">
    <van-field
      v-model="telCode"
      center
      clearable
      label="短信验证码"
      placeholder="请输入短信验证码"
    >
      <template #button>
        <van-button @click="sendCode" :disabled="btnFlag" size="small" type="default">{{ text }}</van-button>
      </template>
    </van-field>
    <van-button @click="step" :disabled="flag" round type="danger" block >下一步</van-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { Field, Button, Toast } from 'vant'
import { dosendmsgcode, docheckcode } from './../../api/user'
Vue.use(Toast)
Vue.use(Button)
Vue.use(Field)
export default {
  data () {
    return {
      tel: '',
      telCode: '',
      time: 10,
      text: '发送验证码',
      timer: null
    }
  },
  computed: {
    btnFlag () {
      return this.time > 0 && this.time < 10
    },
    flag () {
      return this.telCode.trim() === ''
    }
  },
  mounted () {
    this.sendCode()
  },
  methods: {
    sendCode () {
      this.timer = setInterval(() => {
        this.text = '重新发送(' + this.time + ')'
        this.time--
        if (this.time === 0) {
          clearInterval(this.timer)
          this.text = '发送验证码'
          this.time = 10
        }
      }, 1000)
      // 发送短信验证码
      dosendmsgcode({ tel: localStorage.getItem('tel') })
        .then(res => {
          console.log(res.data)
        })
    },
    async step () {
      const res = await docheckcode({
        tel: localStorage.getItem('tel'),
        telcode: this.telCode
      })
      if (res.data.code === '10007') {
        Toast('验证码输入有误')
      } else {
        this.$router.push('/register/step3')
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
    .van-button.van-button--danger{
      width: 80%;
      margin: 35px auto;
    }
  }
</style>
