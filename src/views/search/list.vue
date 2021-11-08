<template>
  <div class="box">
    <!-- 头部搜索栏 -->
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left" size='24' @click="$router.back()" />
      </div>
      <SearchBox :searchword="$route.params.category"/>
      <div class="right">
        <van-icon name="ellipsis" size='24' />
      </div>
    </div>
    <Sequence/>
    <ProList :proList="proList"/>
  </div>
</template>

<script>
import Vue from 'vue'
import { Search, Divider } from 'vant'
import ProList from './../../components/ProList'
import SearchBox from './../../components/SearchBox'
import Sequence from './../../components/Sequence'
import { getProSearch } from '../../api/pro'
Vue.use(Search)
Vue.use(Divider)
export default {
  components: {
    ProList,
    SearchBox,
    Sequence
  },
  data () {
    return {
      proList: [],
      copyProList: []
    }
  },
  // methods: {
  // },
  mounted () {
    getProSearch({
      keyword: this.$route.params.category
    }).then(res => {
      this.proList = res.data.data
      this.copyProList = JSON.parse(JSON.stringify(res.data.data))
    })
    this.$bus.$on('changePriceList', (value) => {
      if (value === 0) {
        this.proList = JSON.parse(JSON.stringify(this.copyProList))
      } else if (value === 1) {
        this.proList.sort((a, b) => a.originprice - b.originprice)
      } else if (value === 2) {
        this.proList.sort((a, b) => b.originprice - a.originprice)
      }
    })
    this.$bus.$on('changeNumList', (value) => {
      if (value === 'a') {
        this.proList = JSON.parse(JSON.stringify(this.copyProList))
      } else if (value === 'b') {
        this.proList.sort((a, b) => a.sales - b.sales)
      } else if (value === 'c') {
        this.proList.sort((a, b) => b.sales - a.sales)
      }
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
  background-color: #f6f6f6;
  .header{
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: #fff;
  }
  .content{
    width: 100%;
    background-color: #ccc;
  }
  }
</style>
