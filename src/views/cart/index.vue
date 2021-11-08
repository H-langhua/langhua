<template>
  <div class="box">
    <div class="header">
       <van-nav-bar
        :title="totalNum > 0 ? `购物车(${totalNum})` : `购物车`"
        left-arrow
        @click-left="$router.back()"
      />
    </div>
    <div class="content">
      <div class="noShop" v-if="empty">
        <van-empty description="购物车空空如也">
          <van-button round type="danger" @click="$router.push('/kind')" class="bottom-button">去购物</van-button>
        </van-empty>
      </div>
      <div class="hasShop" v-else>
        <van-swipe-cell v-for="item of cartList" :key="item.cartid">
          <van-row>
            <van-col span="2" class="checkBox">
              <van-checkbox @change="updateFlag(item.cartid, item.flag)" v-model="item.flag"/>
            </van-col>
            <van-col span="22">
              <van-card
                :price="item.originprice"
                :title="item.proname"
                :thumb="item.img1">
                <template #num>
                  <van-stepper @change="updateNumFn(item.cartid, item.num)" v-model="item.num" theme="round" button-size="22" disable-input />
                </template>
              </van-card>
            </van-col>
          </van-row>
          <template #right>
            <van-button square @click='deleteItem(item.cartid)' text="删除" type="danger" class="delete-button" />
          </template>
        </van-swipe-cell>
        <van-submit-bar id="submit-bar" :disabled="totalNum === 0" :price="totalPrice" button-text="提交订单" @submit="onSubmit">
          <van-checkbox @click="selectAllFn" v-model="checked">全选</van-checkbox>
        </van-submit-bar>
      </div>
      <van-divider>猜你喜欢</van-divider>
      <ProList :proList="recommendList"/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Divider, Row, Col, Empty, Button, NavBar, Card, SwipeCell, Stepper, SubmitBar, Checkbox } from 'vant'
import { remove, selectall, selectone, updateNum, getRecommendList } from './../../api/cart'
// import { getCartList, remove, selectall, selectone, getRecommendList } from './../../api/cart'
import ProList from './../../components/ProList'
import { addOrder } from '../../api/order'
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
Vue.use(Divider)
Vue.use(Empty)
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Card)
Vue.use(SwipeCell)
Vue.use(Stepper)
Vue.use(SubmitBar)
Vue.use(Checkbox)
Vue.use(Col)
Vue.use(Row)
export default {
  data () {
    return {
      empty: false,
      // cartList: [],
      checked: false,
      recommendList: []
    }
  },
  components: {
    ProList
  },
  computed: {
    // totalPrice () {
    //   return this.cartList.reduce((sum, item) => {
    //     return item.flag ? sum + item.originprice * item.num : sum + 0
    //   }, 0) * 100
    // },
    // totalNum () {
    //   return this.cartList.reduce((sum, item) => {
    //     return item.flag ? sum + item.num : sum + 0
    //   }, 0)
    // },
    ...mapState({
      isLogin: state => state.user.isLogin,
      cartList: state => state.cart.cartList
    }),
    ...mapGetters({
      totalNum: 'totalNum',
      totalPrice: 'totalPrice'
    }),
    flag () {
      return this.totalNum <= 0
    }
  },
  mounted () {
    if (this.isLogin) {
      this.getCartListData()
    } else {
      this.$router.push('/login')
    }
    // if (localStorage.getItem('isLogin') === 'true') {
    //   this.getCartListData()
    // } else {
    //   this.$router.replace('/login')
    // }
    getRecommendList().then(res => {
      this.recommendList = res.data.data
    })
  },
  methods: {
    ...mapActions({
      getCarListAction: 'cart/getCarListAction'
    }),
    ...mapMutations({
      updatecartListState: 'cart/updatecartListState'
    }),
    updateFlag (cartid, flag) {
      selectone({ cartid, flag }).then(() => { this.getCartListData() })
    },
    selectAllFn () {
      selectall({
        userid: localStorage.getItem('userid'),
        type: this.checked
      }).then(() => {
        this.getCartListData()
      })
    },
    updateNumFn (cartid, num) {
      updateNum({ cartid, num }).then(() => { this.getCartListData() })
    },
    /* updateNumFn () {
      this.updatecartNumAction({
        cartid: this.cartid,
        num: this.num
      }) */
    onSubmit () {
      // 点击跳转确认订单的页面
      // console.log('确认订单')
      addOrder({
        userid: localStorage.getItem('userid')
      }).then(res => {
        // console.log(res.data)
        this.$router.push('/order/' + res.data.time)
      })
    },
    getCartListData () {
      // 调用vuex中的action
      this.getCarListAction({
        userid: localStorage.getItem('userid')
      }).then(res => {
        if (res.data.code === '10020') {
          this.empty = true
          this.updatecartListState([])
        } else {
          this.empty = false
          this.updatecartListState(res.data.data)
          this.checked = res.data.data.every(item => item.flag)
        }
      })
      // getCartList({
      //   userid: localStorage.getItem('userid')
      // }).then(res => {
      //   if (res.data.code === '10020') {
      //     this.empty = true
      //   } else {
      //     this.empty = false
      //     this.cartList = res.data.data
      //     this.checked = this.cartList.every(item => item.flag)
      //   }
      // })
    },
    deleteItem (cartid) {
      remove({ cartid }).then(res => {
        this.getCartListData()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/* 滑动删除 */
  .goods-card {
    margin: 0;
    background-color: #fff;
  }
  .delete-button {
    height: 100%;
  }
  /* 空状态按钮 */
  .bottom-button {
    width: 160px;
    height: 40px;
  }
  /* box */
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
  #submit-bar{
    position: fixed;
    bottom: 50px;
  }
</style>
