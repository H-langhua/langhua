<template>
  <div class="box">
    <!-- 头部搜索栏 -->
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left" size='24' @click="$router.back()" />
      </div>
      <SearchBox/>
      <div class="right">
        <van-icon name="ellipsis" size='24' />
      </div>
    </div>
    <div class="content">
      <van-row>
        <van-col span="6">
          <van-sidebar v-model="activeKey" @change="onChange">
            <van-sidebar-item
              v-for="item, index of categoryList"
              :key="index"
              :title="item" />
          </van-sidebar>
        </van-col>
        <van-col span="18">
          <div class="gird">
            <div class="pro-brand" v-for="item,index of brandList" :key="index" @click="toBrandList(item)">
              <img src="https://img01.yzcdn.cn/vant/cat.jpeg" alt="品牌LOGO">
              <p class="brand-title">{{ item.brand }}</p>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Search, Icon, Col, Row, Sidebar, SidebarItem } from 'vant'
import { getCategoryList, getCategoryBrandList } from '../../api/pro'
import SearchBox from './../../components/SearchBox'
Vue.use(Search)
Vue.use(Icon)
Vue.use(Col)
Vue.use(Row)
Vue.use(Sidebar)
Vue.use(SidebarItem)
export default {
  data () {
    return {
      value: '',
      activeKey: 0,
      categoryList: [],
      brandList: []
    }
  },
  components: {
    SearchBox
  },
  methods: {
    onChange (index) {
      console.log(this.categoryList[index])
      getCategoryBrandList({
        category: this.categoryList[index]
      }).then(res => {
        this.brandList = res.data.data
      })
    },
    toBrandList (params) {
      console.log(params, this.categoryList[this.activeKey])
      this.$router.push(`/categorybrandlist/${this.categoryList[this.activeKey]}/${params.brand}`)
    },
    toSearch () {
      this.$router.push('/search')
    }
  },
  mounted () {
    getCategoryList().then(res => {
      this.categoryList = res.data.data
      getCategoryBrandList({
        category: this.categoryList[0]
      }).then(res => {
        this.brandList = res.data.data
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.box{
  display: flex;
  overflow: auto;
  flex-direction: column;
  width: 100%;
  .header{
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .content{
    overflow: auto;
    flex: 1;
    .van-row{
      height: 100%;
      .van-col{
        height: 100%;
        overflow: auto;
        .van-sidebar{
          width: 90px;
          .van-sidebar-item{
            padding: 0px 12px;
            height: 40px;
            line-height: 40px;
          }
        }
      }
      .van-col--18{
        position: fixed;
        right: 0;
        .gird{
          display: flex;
          flex-wrap:wrap;
          .pro-brand{
            width: 33%;
            text-align: center;
            margin-bottom: 20px;
            img{
              width: 80%;
            }
            p{
              font-size: 14px;
              text-align: center;
              padding: 0 10px;
              margin: 0;
              color: #666;
            }
          }
        }
      }
    }
  }
}
</style>
