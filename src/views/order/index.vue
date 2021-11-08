<template>
  <div class="box">
    <div class="header">
       <van-nav-bar
        title="我的订单"
        left-arrow
        @click-left="$router.back()"
      />
    </div>
    <div class="content">
      <!-- 地址信息 -->
      <van-cell @click="onEdit" v-if="flag" :title="name + ' ' + tel"  size="large" is-link :label="showAddress" />
      <van-cell @click="onEdit" v-else title="请添加收获人信息"  size="large" is-link />
      <!-- 待支付商品 -->
      <van-card
        v-for="item of orderList"
        :key="item.orderid"
        :num="item.num"
        :price="item.originprice.toFixed(2)"
        :title="item.proname"
        :thumb="item.img1"
      />
      <!-- 优惠券单元格 -->
      <van-coupon-cell
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        @click="showList = true"
      />
      <!-- 优惠券列表 -->
      <van-popup
        v-model="showList"
        round
        position="bottom"
        style="height: 90%; padding-top: 4px;"
      >
        <van-coupon-list
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          :disabled-coupons="disabledCoupons"
          @change="onChange"
          @exchange="onExchange"
        />
      </van-popup>
    </div>
    <van-submit-bar
      id="submit-bar"
      :price="orderprice"
      button-text="提交订单"
      tip-icon="info-o"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Toast, Cell, CouponCell, CouponList, Popup, SubmitBar, ContactCard, Card, Dialog } from 'vant'
import { confirmOrder, deleteCartItem } from './../../api/order'
// import { defaultAddress } from '../../api/address'
Vue.use(NavBar)
Vue.use(Toast)
Vue.use(CouponCell)
Vue.use(CouponList)
Vue.use(Popup)
Vue.use(SubmitBar)
Vue.use(ContactCard)
Vue.use(Card)
Vue.use(Cell)
Vue.use(Dialog)
const coupon = {
  available: 1,
  condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '1.5',
  unitDesc: '元'
}
export default {
  computed: {
    orderprice () {
      return this.orderList.reduce((sum, item) => {
        return sum + item.originprice * item.num
      }, 0) * 100
    },
    showAddress () {
      let str = ''
      this.province === this.city
        ? str = this.province + this.county + this.addressDetail
        : str = this.province + this.city + this.county + this.addressDetail
      return str
    }
  },
  data () {
    return {
      // 优惠券
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      showList: false,
      // 订单信息
      orderList: [],
      flag: false, // 判断有没有订单的地址信息
      name: '',
      tel: '',
      province: '',
      city: '',
      county: '',
      addressDetail: ''
    }
  },
  methods: {
    // 优惠券
    onChange (index) {
      this.showList = false
      this.chosenCoupon = index
    },
    onExchange (code) {
      this.coupons.push(coupon)
    },
    onEdit () {
      this.$router.push('/orderaddresslist/' + this.$route.params.time)
    },
    onSubmit () {
      Dialog.confirm({
        message: '确认提交订单？'
      })
        .then(() => {
          // on confirm
          return false
        })
        .catch(() => {
          // on cancel
          Dialog.confirm({
            message: '是否取消订单'
          })
            .then(() => {
              // on confirm
              deleteCartItem({
                userid: localStorage.getItem('userid')
              }).then(res => {
                this.$router.push('/cart')
              })
            })
            .catch(() => {
              // on cancel
              return false
            })
        })
    }
  },
  // mounted () {
  //   confirmOrder({
  //     userid: localStorage.getItem('userid'),
  //     time: this.$route.params.time
  //   }).then(res => {
  //     console.log(res.data)
  //     if (res.data.flag) {
  //       this.orderList = res.data.data
  //       this.flag = res.data.flag
  //       // 收货人信息
  //       this.name = res.data.address.name
  //       this.tel = res.data.address.tel
  //       this.province = res.data.address.province
  //       this.city = res.data.address.city
  //       this.county = res.data.address.county
  //       this.addressDetail = res.data.address.addressDetail
  //     } else {
  //       this.orderList = res.data.data
  //       this.flag = res.data.flag
  //       defaultAddress({
  //         userid: localStorage.getItem('userid')
  //       }).then(res => {
  //         if (res.data.data.length > 0) {
  //           // 收货人信息
  //           this.flag = true
  //           this.name = res.data.address.name
  //           this.tel = res.data.address.tel
  //           this.province = res.data.address.province
  //           this.city = res.data.address.city
  //           this.county = res.data.address.county
  //           this.addressDetail = res.data.address.addressDetail
  //         }
  //       })
  //     }
  //   })
  // }
  mounted () {
    confirmOrder({
      userid: localStorage.getItem('userid'),
      time: this.$route.params.time
    }).then(res => {
      console.log(res.data)
      this.orderList = res.data.data
      this.flag = res.data.flag
      if (res.data.flag) {
        // 收货人信息
        this.name = res.data.address.name
        this.tel = res.data.address.tel
        this.province = res.data.address.province
        this.city = res.data.address.city
        this.county = res.data.address.county
        this.addressDetail = res.data.address.addressDetail
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  #submit-bar{
    position: fixed;
    bottom: 50px;
  }
</style>
