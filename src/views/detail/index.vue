<template>
  <div class="box">
    <!-- 头部功能键 -->
    <div class="header-nav" v-if="top === 0">
      <van-icon name="arrow-left"  size="1rem" @click="$router.back()" />
        <van-popover
          v-model="showPopover"
          theme="dark"
          trigger="click"
          :actions="actions"
          placement="bottom-end"
          :offset="[-8, 0]"
          @select="onSelect"
        >
          <template #reference>
            <van-icon name="ellipsis"  size="1rem"/>
          </template>
        </van-popover>
        <!-- 分享弹出层 -->
      <van-share-sheet
        v-model="showShare"
        :options="options"
        title="立即分享给好友"
        description="帮忙砍一刀！"
      />
    </div>
    <div class="header-nav-else" v-else>
      <van-icon name="arrow-left"  size="1rem" @click="$router.back()" />
        <van-popover
          v-model="showPopover"
          theme="dark"
          trigger="click"
          :actions="actions"
          placement="bottom-end"
          :offset="[-8, 0]"
          @select="onSelect"
        >
          <template #reference>
            <van-icon name="ellipsis"  size="1rem"/>
          </template>
        </van-popover>
        <!-- 分享弹出层 -->
      <van-share-sheet
        v-model="showShare"
        :options="options"
        title="立即分享给好友"
        description="帮忙砍一刀！"
      />
    </div>
    <div class="content" ref="content">
      <!-- 轮播图 -->
      <div class="detail-swipe">
        <van-swipe class="my-swipe" indicator-color="white">
          <van-swipe-item v-for="(item, index) of banners" :key="index" @click="priviewImg(index)">
            <van-image :src="item" fit="cover"/>
          </van-swipe-item>
        </van-swipe>
        <div class="video" @click="show = true">
          <span>1'30"</span>
        </div>
        <van-popup v-model="show">
          <video id="vdo" controls autoplay width="100%" src="https://jvod.300hu.com/vod/product/6cca8ece-73a3-4fa3-b05d-89471ab940d0/81e52ae5eab444db9a4e3f8eb5039d9f.mp4"></video>
        </van-popup>
      </div>
      <!-- 商品信息 -->
      <div class="info">
        <!-- 价格 -->
        <div class="pricetitle">
          <div class="pricec">￥{{originprice}}</div>
          <div class="right">
            <div class="decprice right-ic">
              <van-icon name="refund-o" />
              <p>降价提醒</p>
            </div>
            <div class="collect right-ic">
              <van-icon name="like-o" />
              <p>收藏</p>
            </div>
          </div>
        </div>
        <!-- 商品名称 -->
        <div class="proname">
          <h3>
            <van-tag type="danger">{{ brand }}</van-tag>
            <van-tag type="primary">{{ category }}</van-tag>
            {{ proname }}
          </h3>
        </div>
      </div>
      <!-- 介绍 -->
      <div class="introduce">
        <p>{{desc}}</p>
      </div>
    </div>
    <!-- 底部 -->
    <!-- 下架 -->
    <van-goods-action  v-if="issale === 0">
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o"  @click="$router.push('/cart')" :badge="isLogin && totalNum > 0 ? totalNum : ''"  text="购物车"  />
      <van-goods-action-icon icon="shop-o" text="店铺"  />
      <van-goods-action-button type="danger" disabled text="商品已下架"/>
    </van-goods-action>
    <!-- 售卖中 -->
    <van-goods-action v-else>
        <van-goods-action-icon icon="chat-o"  text="客服" dot />
        <van-goods-action-icon icon="cart-o" v-if="totalNum > 0"  @click="$router.push('/cart')" text="购物车" :badge="isLogin && totalNum > 0 ? totalNum : ''" />
        <van-goods-action-icon icon="cart-o" v-else @click="$router.push('/cart')" text="购物车" />
        <van-goods-action-icon icon="shop-o" text="店铺" />
        <van-goods-action-button type="warning" @click="addCartFn" text="加入购物车" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
  </div>
</template>

<script>
import { getProDetail } from './../../api/detail'
import Vue from 'vue'
import { Popup, Tag, GoodsAction, GoodsActionIcon, GoodsActionButton, ShareSheet, Toast, NavBar, Swipe, SwipeItem, Image as VanImage, ImagePreview, Icon, Popover } from 'vant'
import { addCart } from '../../api/cart'
// import { addCart, getCartList } from '../../api/cart'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
Vue.use(Swipe)
Vue.use(GoodsAction)
Vue.use(GoodsActionIcon)
Vue.use(GoodsActionButton)
Vue.use(SwipeItem)
Vue.use(VanImage)
Vue.use(Icon)
Vue.use(ImagePreview)
Vue.use(Popover)
Vue.use(NavBar)
Vue.use(Toast)
Vue.use(ShareSheet)
Vue.use(Tag)
Vue.use(Popup)
export default {
  watch: {
    show (newVal) {
      const vdo = document.getElementById('vdo')
      if (!newVal) {
        vdo.pasue()
      }
    }
  },
  data () {
    return {
      proid: '',
      banners: [], // 轮播图
      brand: '', // 品牌
      category: '', // 分类
      desc: '', // 详情
      discount: 0, // 折扣
      isrecommend: 1, // 是否被推荐
      issale: 0, // 是不是上架状态
      isseckill: 0, // 是否被秒杀
      originprice: 0, // 商品原价
      proname: '', // 产品名称
      sales: 0, // 销量
      stock: 0, // 库存
      show: false, // 视频显示
      showPopover: false,
      top: 0, // 监听滚动条的距离
      actions: [
        { index: 1, text: '首页', icon: 'wap-home-o' },
        { index: 2, text: '分类搜索', icon: 'search' },
        { index: 3, text: '我的嗨购', icon: 'user-circle-o' },
        { index: 4, text: '浏览记录', icon: 'records' },
        { index: 5, text: '分享', icon: 'share-o' }
      ],
      showShare: false, // 分享
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
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
    }),
    getCartListData () {
      // 调用vuex中的action
      this.getCarListAction({
        userid: localStorage.getItem('userid')
      }).then(res => {
        if (res.data.code === '10020') {
          this.updatecartListState([])
        } else {
          this.updatecartListState(res.data.data)
        }
      })
    },
    addCartFn () {
      // 1.前端判断用户的登录状态
      if (localStorage.getItem('isLogin') === 'true') {
        // 2.后端校验登录--拦截器
        addCart({
          userid: localStorage.getItem('userid'),
          num: 1,
          proid: this.proid
        }).then(res => {
          console.log(res.data)
          // 点击加入购物车时，获取购物车列表的数据，以改变totalNum的值
          this.getCartListData()
          Toast('加入购物车成功')
        })
      } else {
        Toast('请登录')
        console.log(111)
        this.$router.push('/login')
      }
    },
    priviewImg (index) { // 图片放大
      ImagePreview({
        images: this.banners,
        startPosition: index
      })
    },
    onSelect (action) {
      console.log(action)
      switch (action.index) {
        case 1:
          this.$router.push('/home')
          break
        case 2:
          this.$router.push('/kind')
          break
        case 3:
          this.$router.push('/user')
          break
        case 4:
          Toast('暂未开放')
          break
        case 5:
          this.showShare = true
          break
      }
    }
  },
  async mounted () {
    this.proid = this.$route.params.proid
    const res = await getProDetail(this.proid)
    this.banners = res.data.data.banners[0].split(',')
    this.brand = res.data.data.brand
    this.category = res.data.data.category
    this.desc = res.data.data.desc
    this.discount = res.data.data.discount
    this.isrecommend = res.data.data.isrecommend
    this.issale = res.data.data.issale
    this.isseckill = res.data.data.isseckill
    this.originprice = res.data.data.originprice
    this.proname = res.data.data.proname
    this.sales = res.data.data.sales
    this.stock = res.data.data.stock
    // 监听滚动条的滚动
    this.$refs.content.addEventListener('scroll', () => {
      this.top = this.$refs.content.scrollTop
      // console.log('top', this.top)
    })
  }
}
</script>

<style lang="scss" scoped>
  .box{
    width: 100%;
    height: 100%;
    position: relative;
    .header-nav{
      width: 100%;
      position: absolute;
      z-index: 2;
      display: flex;
      height: 50px;
      justify-content: space-between;
      i{
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: #666;
        color:#fff;
        margin: 0.5rem;
      }
    }
    .header-nav-else{
      background-color: #ffffffd0;
      border-bottom: 1px solid #ccc;
      width: 100%;
      position: absolute;
      z-index: 2;
      display: flex;
      height: 50px;
      justify-content: space-between;
      i{
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: #666;
        color:#fff;
        margin: 0.5rem;
      }
    }
    .content{
      padding-bottom: 50px;
      .detail-swipe{
        position: relative;
        .my-swipe{
          width: 100%;
          .van-swipe__track{
            width: 100%;
            .van-swipe-item{
              width: 100%;
              height: 20rem;
              .van-image{
                width: 100%;
                height: 20rem;
                overflow: hidden;
                img{
                  width: 100%;
                }
              }
            }
          }
        }
        .video{
          width: 85px;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 20px;
          margin: auto;
          font-size: 16px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          background: no-repeat url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKYAAAA8CAMAAADbqzFgAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABOUExURUdwTJqamvDw8M/Pz/1vav39/f6Qi////wgICAAAAPv7++Tk5P/Lyv+8u/f39//v7/T09P5OUP1fU/9FTv1XUvxmVf////6sqv7s6/7My/JlC+UAAAARdFJOUwAshEv5xezMEwi4Z9neoNCW4Fs5AwAAAw1JREFUaN7VmtuWqyAMhlulFHV6QEDt+7/oBuWQIN179g3R2MtZa771/0kIh8ulHF3Xieph/+nlP8IStkPz7PvbvVrc+v7ZDK1l/T3juyJfRvv+FWknrg0Zoydtrv8CtZD3A4QF/auUw+1+iLgN3wXtrs/7YeJ57b5R9uDPfjhnzBjGOP8h4ezLnKJNhj+4JXQx2jCj4Q8K49tCgoohQXpGS+m+NRgF6LDj7NrodoSMjKMetWYE3rddnpfBcW6M2Ymp14/X9x3nZ6yeFzclLa2YLviLto6E70QvVtLSUa6gklXnfIp9+UBKlJdeTQrOVEYxMZHjETRCWkzJ6dJTNPvqCVpCMaXFrM/ZiCCm70SFvNRATLl91fuSlzOImZUPKp4gpv0xIjnFlpmPEiXW0pkuZe316Cbg+lOoco3KZ4OUciRZi8Q7F3Ms1I8MnhPI+RbJc55Tsnk2uHx8KE7gesnzFXSZpmUOUgItlZQErncD7kZxcptcLAwWuVezek8aLGaDPI8L+YY5TR8WxPSQqr7rTRemDp4XecCcpjmzXKnardPOH6KHqZlaUcKcFi6T4YoAs8eYqRNBNZ3zY5TSUipJgLn1o5iXxi+RCHOao5jrr35HSph4WseYn2C4E1MpAsyS6TozfWEpMYlMj5h42ICYs0aUJCUUGhLeRmqTDGdb9YTMJGlIob3nUxHLu5EKWiqK9h4WyxFMRY7TQL+h4zYoFks/eph8wlyc3wa1dQ9KMXrEQS7fRvLPmpSwrRN5vo7vYSyOO584vGmtQV4mUpKxOA6crq0DNSUMKCaJ52nLNqZ9D9igSZiVJGLeBN4Ao2MYDaWElFQb4HicAPdnaVrfZiI6McNxQjqc0aUNGk5MRXY4A466wAZNlxOzuuXgJDYdHOaJmWtJeXAIj2GzXWSmpSQ9hoWH2pmYxFr2+eF7vCLQoMaxmORXBPjCRRbFPMKFS3Z9tYfUx7i+yi8DNaqf41wG7q9WGXM1z9ixrlbPclF9lmv/szyiOM2TlFXREzzwOc1zKcLHZ+Lr47M/c6RItxWG3+oAAAAASUVORK5CYII=');
          background-size: contain;
          span{
            margin-left: 20px;
          }
        }
        .van-popup{
          width: 100%;
          #vdo{
            width: 100%;
          }
        }
      }
      .info{
        width: 100%;
        margin-bottom: 0.5rem;
        background-color: #fff;
        border-radius: 0 0 0.6rem 0.6rem;
        .pricetitle{
          display: flex;
          justify-content: space-between;
          height: 2.8rem;
          line-height: 2.8rem;
          .pricec{
            color: #ff2727;
            padding-left: 10px;
          }
          .right{
            display: flex;
            padding-right: 10px;
            justify-content: space-evenly;
            .right-ic{
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              margin: 0.1rem 0.6rem;
              p{
                margin: 0;
                font-size: 12px;
                line-height: 12px;
              }
            }
          }
        }
        .proname{
          font-size: 16px;
          font-weight: 400;
          h3{
            margin: 0;
            padding: 0 15px 10px;
            .van-tag{
              margin: 0 5px;
              height: 16px;
            }
          }
        }
      }
      .introduce{
        background-color: #fff;
        width: 100%;
        margin-top: 10px;
        border-radius: 0.6rem;
        p{
          padding: 0.5rem;
          line-height: 30px;
          margin: 0;
        }
      }
    }
  }
</style>
