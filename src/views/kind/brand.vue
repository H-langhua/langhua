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
import { getCategoryBrandProList } from '../../api/pro'
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
      value: ''
    }
  },
  mounted () {
    getCategoryBrandProList({
      category: this.$route.params.category,
      brand: this.$route.params.brand
    }).then(res => {
      console.log(res.data.data)
      this.proList = res.data.data
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
