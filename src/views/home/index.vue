<template>
  <div class="box">
    <!-- 头部搜索栏 -->
    <div class="header">
      <div class="left">
        <van-icon name="wap-nav" size='24' />
      </div>
      <SearchBox/>
      <div v-if="isLogin" class="right">我的</div>
      <div v-else class="right" @click="toLogin">登录</div>
    </div>
    <!-- 主要内容区 -->
    <div class="content" ref="content">
      <!-- 下拉刷新 -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 轮播图 -->
      <div class="floor">
        <div class="floor-bg"></div>
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item of bannerList" :key="item.bannerid">
              <van-image fit='contain' :src="item.img"/>
            </van-swipe-item>
          </van-swipe>
      </div>
      <!-- 推荐商品 -->
      <div class="actpro">
        <a href="#">
          <img src="../../assets/20210907103015.png" alt="">
        </a>
      </div>
      <!-- 分类导航 -->
      <van-grid icon-size='40' :column-num="5" :border="false">
        <van-grid-item v-for="item in navList" :key="item.navid" :icon="item.imgurl" :text="item.title" />
      </van-grid>
      <!-- 秒杀列表 -->
      <div class="floor-the-container">
        <div class="floor-container">
          <div class="sec_kill_floor">
            <div class="title_wrap">
              <div class="left">
                <div class="seckill-tit-img">京东秒杀</div>
                <div class="seckill-timer-wrap">
                  <div class="seckill-nth">{{ h }}</div>
                  <div class="seckill_time">
                    <van-count-down :time="time">
                      <template #default="timeData">
                        <span class="block">{{ timeData.hours }}</span>
                        <span class="colon">:</span>
                        <span class="block">{{ timeData.minutes }}</span>
                        <span class="colon">:</span>
                        <span class="block">{{ timeData.seconds }}</span>
                      </template>
                    </van-count-down>
                  </div>
                </div>
              </div>
              <div class="right">
                <a href="#">更多秒杀
                  <van-icon name="arrow" />
                </a>
              </div>
            </div>
          </div>
          <ul class="seckillList">
            <router-link :to="{ name: 'detail', params: { proid: item.proid }}" class="seckillItem" v-for="item of seckillList" :key="item.proid">
              <van-image :src="item.img1" />
              <p class="price">¥{{ (item.originprice * item.discount / 10).toFixed(0) }}</p>
              <p class="delPrice"><del>¥{{ item.originprice }}</del></p>
            </router-link>
          </ul>
        </div>
      </div>
      <!-- 产品列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <ProList :proList="proList"/>
      </van-list>
      </van-pull-refresh>
      <!-- 返回顶部 -->
      <div class="backtop" @click="backTop" v-if="top > 500">
        <van-icon name="back-top" size="36"/>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem, Search, Image as VanImage, Grid, GridItem, CountDown, List, PullRefresh } from 'vant'
import { getBannerList, getProList, getSeckillList } from './../../api/home'
import ProList from './../../components/ProList'
import SearchBox from './../../components/SearchBox'
import { mapState } from 'vuex'

Vue.use(VanImage)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Search)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(CountDown)
Vue.use(List)
Vue.use(PullRefresh)
export default {
  name: 'home',
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin
    })
  },
  components: {
    ProList,
    SearchBox
  },
  data () {
    return {
      value: '',
      bannerList: [],
      navList: [
        { navid: 1, title: '嗨购超市', imgurl: 'https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/125678/35/5947/4868/5efbf28cEbf04a25a/e2bcc411170524f0.png' },
        { navid: 2, title: '数码电器', imgurl: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/178015/31/13828/6862/60ec0c04Ee2fd63ac/ccf74d805a059a44.png!q70.jpg' },
        { navid: 3, title: '嗨购服饰', imgurl: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/41867/2/15966/7116/60ec0e0dE9f50d596/758babcb4f911bf4.png!q70.jpg' },
        { navid: 4, title: '嗨购生鲜', imgurl: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/177902/16/13776/5658/60ec0e71E801087f2/a0d5a68bf1461e6d.png!q70.jpg.dpg' },
        { navid: 5, title: '嗨购到家', imgurl: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/196472/7/12807/7127/60ec0ea3Efe11835b/37c65625d94cae75.png!q70.jpg.dpg' },
        { navid: 6, title: '充值缴费', imgurl: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/185733/21/13527/6648/60ec0f31E0fea3e0a/d86d463521140bb6.png!q70.jpg.dpg' },
        { navid: 7, title: '9.9元拼', imgurl: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/36069/14/16068/6465/60ec0f67E155f9488/595ff3e606a53f02.png!q70.jpg.dpg' },
        { navid: 8, title: '领券', imgurl: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/186080/16/13681/8175/60ec0fcdE032af6cf/c5acd2f8454c40e1.png!q70.jpg.dpg' },
        { navid: 9, title: '领金贴', imgurl: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/196711/35/12751/6996/60ec1000E21b5bab4/38077313cb9eac4b.png!q70.jpg.dpg' },
        { navid: 10, title: 'plus会员', imgurl: '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/37709/6/15279/6118/60ec1046E4b5592c6/a7d6b66354efb141.png!q70.jpg.dpg' }
      ],
      time: 0,
      h: 0,
      seckillList: [],
      // 上拉加载
      proList: [],
      loading: false,
      finished: false,
      count: 2, // 页码
      // 返回顶部
      top: 0,
      // 下拉刷新
      isLoading: false
    }
  },
  mounted () {
    getBannerList().then(res => {
      this.bannerList = res.data.data
    })
    getSeckillList().then(res => {
      this.seckillList = res.data.data
    })
    getProList().then(res => {
      this.proList = res.data.data
    })
    // 监听滚动条的滚动
    this.$refs.content.addEventListener('scroll', () => {
      this.top = this.$refs.content.scrollTop
    })
    this.getSeckillTime()
  },

  methods: {
    toLogin () {
      this.$router.push('/login')
    },
    getSeckillTime () {
      var times = new Date()
      var nowHour = times.getHours()
      var nowMin = times.getMinutes()
      var nowSec = times.getSeconds()
      this.h = nowHour % 2 === 0 ? nowHour : nowHour - 1
      this.time = this.h * 1000 * 3600 + 2 * 3600 * 1000 - nowHour * 3600 * 1000 - nowMin * 60 * 1000 - nowSec * 1000
    },
    onLoad () {
      this.loading = true
      // 异步更新数据
      getProList({ count: this.count }).then(res => {
        this.loading = false
        this.count++
        if (res.data.data.length === 0) {
          this.finished = true
        } else {
          this.proList = [...this.proList, ...res.data.data]
        }
      })
      // 加载状态结束
      this.loading = false
    },
    backTop () {
      this.$refs.content.scrollTop = 0
    },
    onRefresh () {
      this.isLoading = true
      getProList().then(res => {
        this.isLoading = false
        this.proList = res.data.data
        this.count = 2
        this.finished = false
      })
    }
  }
}

</script>

<style lang='scss' scoped>
.box{
  flex: 1;
  display: flex;
  overflow: auto;
  flex-direction: column;
  background-color: #f6f6f6;
  .header{
    display: flex;
    justify-content: space-evenly;
    background-color: #C82519;
    color: #fff;
    height: 44px;
    font-size: 14px;
    .right, .left{
      display: inline-block;
      margin: 10px 0;
      color: #fff;
      font-size: 14px;
    }
  }
  .content{
    flex: 1;
    overflow: auto;

    .floor{
      position: relative;
      width: 100%;
      .floor-bg{
        background-color: #C82519;
        height: 100px;
        width: 100%;
        position: absolute;
        z-index: 0;
        border-radius: 0 0 20px 20px;
      }
      .my-swipe {
        border-radius: 10px;
        width: 90%;
        height: 140px;
        margin: 0 5%;
        .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
        .van-image{
          width: 100%;
          .van-image__img{
            width: 100%;
          }
        }
      }
    }
  }
    .actpro {
      width: 100%;
      a{
        display: inline-block;
        width: 100%;
        img{
          width: 100%;
        }
      }
    }
    .van-grid{
      background-color: #f6f6f6;
      .van-grid-item{
        background-color: #f6f6f6;
        .van-grid-item__content{
          background-color: #f6f6f6;
        }
      }
    }
    .floor-the-container{
      position: relative;
      margin-left: .5rem;
      margin-right: .5rem;
      .floor-container{
        width: 100%;
        overflow: hidden;
        background: #fff;
        padding-bottom: 0.3rem;
        border-radius: .6rem;
        .sec_kill_floor{
          .title_wrap{
            display: flex;
            justify-content: space-between;
            box-shadow: 0 1px 1px #f2f2f2;
            border-radius: .6rem;
            overflow: hidden;
            background: url('./../../assets/seckill.png');
            background-size: contain;
            height: 1.7rem;
            line-height: 1.7rem;
            vertical-align: middle;
            .left{
              float: left;
              .seckill-tit-img{
                float: left;
                display: inline-block;
                height: 1.35rem;
                margin-top: .4rem;
                margin-right: .25rem;
                margin-left: .5rem;
                font-family: '微软雅黑';
                font-size: .7rem;
                color: #333;
                letter-spacing: 0;
                line-height: 1.2;
              }
              .seckill-timer-wrap{
                display: inline-block;
                border-radius: .4rem;
                height: .9rem;
                line-height: .9rem;
                float: left;
                margin-top: .4rem;
                vertical-align: middle;
                .seckill-nth {
                  height: 100%;
                  border-radius: .4rem;
                  font-size: .85rem;
                  color: #ff2727;
                  letter-spacing: 0;
                  padding-right: .25rem;
                  padding-left: .25rem;
                  float: left;
                  position: relative;
                  left: -1px;
                  margin-right: .2rem;
                  line-height: 1rem;
                  &:after {
                    height: .875rem;
                    width: 1.025rem;
                    content: "";
                    display: inline-block;
                    vertical-align: middle;
                    background-image: url('../../assets/seckill-time-to_1de70c91.png');
                    background-repeat: no-repeat;
                    background-position: 50%;
                    background-size: contain;
                }
                }
                .seckill_time{
                  margin-right: .2rem;
                  height: 100%;
                  float: right;
                  .van-count-down{
                    span{
                      width: 0.85rem;
                      font-size: 0.6rem;
                    }
                    .block{
                      background-color: #fa2c19;
                      border-radius: .2rem;
                      text-align: center;
                      font-weight: 400;
                    }
                    .colon{
                      width: 0.3rem;
                      font-size: 16px;
                      text-align: center;
                    }
                  }
                }
              }
            }
            .right{
              padding-right: 0.5rem;
              height: 100%;
              font-size: 0.6rem;
              a{
                color:#fa2c19 ;
                .van-icon-arrow{
                  padding: 0.05rem;
                  color: #fff;
                  background-color: #fa2c19;
                  border-radius: 50%;
                  text-align: center;
                  line-height: 0.6rem;
                }
              }
            }
          }
        }
        .seckillList{
          display: flex;
          justify-content: space-evenly;
          .seckillItem{
            flex: 1;
            text-align: center;
            .van-image{
              height: 50px;
              overflow: hidden;
              img{
                width: 100%;
              }
            }
            p{
              padding: 0.1rem;
              margin: 0;
              color: #fa2c19;
              font-size: 14px;
            }
            .delPrice{
              color: #666;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}

 .colon {
    display: inline-block;
    margin: 0 4px;
    color: #ee0a24;
  }
  .block {
    display: inline-block;
    width: 22px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background-color: #ee0a24;
  }

/* 返回顶部 */
.backtop {
  position: fixed;
  bottom: 52px;
  right: 15px;
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.1rem solid #ccc;
  border-radius: 50%;
  background-color: #ffffffab;
  color:#999;
}
</style>
