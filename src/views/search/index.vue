<template>
  <div class="box">
    <!-- 头部搜索栏 -->
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left" size='24' @click="$router.back()" />
      </div>
      <div class="search">
        <van-search
          v-model="value"
          shape="round"
          background='#ffffff00'
          placeholder="请输入搜索关键词"
          autofocus
        />
      </div>
      <div class="right" >
        <input type="button" value="搜索" :disabled="!value.trim()" @click="searchPro">
      </div>
    </div>
    <!-- 搜索历史 -->
    <div class="searchhistory" v-show="showHistoryWord">
      <div class="searchhistory-content">
        <div class="searchhistory-title">
          <p>最近搜索</p>
          <van-icon name="delete-o" size="20" @click='clearSearch'/>
        </div>
        <ul class="searchhistory-list" >
          <li @click="reSearch(item)" v-for="(item, index) in historyWord" :key="index">{{ item }}</li>
        </ul>
      </div>
    </div>
    <!-- 热门搜索 -->
    <div class="hotsearch">
      <div class="hotsearch-content">
        <div class="hotsearch-title">
          <p>热门搜索</p>
        </div>
        <ul class="hotsearch-list" >
          <li @click="reSearch(item.keyword)" v-for="item of hotWord" :key="item.wordid">{{ item.keyword }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Search } from 'vant'
import { getProHotWord } from './../../api/pro'
Vue.use(Search)
export default {
  data () {
    return {
      value: '',
      hotWord: [],
      historyWord: []
    }
  },
  computed: {
    showHistoryWord () {
      return Object.prototype.hasOwnProperty.call(localStorage, 'historyWord')
      // return true
    }
  },
  methods: {
    clearSearch () {
      localStorage.removeItem('historyWord')
      this.historyWord = []
    },
    searchPro () {
      if (localStorage.getItem('historyWord')) {
        const oldArr = JSON.parse(localStorage.getItem('historyWord'))
        const itemIndex = oldArr.indexOf(this.value)
        if (itemIndex === -1) { //
          oldArr.unshift(this.value)
          localStorage.setItem('historyWord', JSON.stringify(oldArr))
        } else {
          oldArr.splice(itemIndex, 1)
          oldArr.unshift(this.value)
          localStorage.setItem('historyWord', JSON.stringify(oldArr))
        }
      } else {
        const arr = [this.value]
        localStorage.setItem('historyWord', JSON.stringify(arr))
      }
      this.$router.push({ name: 'searchlist', params: { category: this.value } })
    },
    reSearch (item) {
      if (localStorage.getItem('historyWord')) {
        const oldArr = JSON.parse(localStorage.getItem('historyWord'))
        const itemIndex = oldArr.indexOf(item)
        if (itemIndex === -1) { //
          oldArr.unshift(item)
          localStorage.setItem('historyWord', JSON.stringify(oldArr))
        } else {
          oldArr.splice(itemIndex, 1)
          oldArr.unshift(item)
          localStorage.setItem('historyWord', JSON.stringify(oldArr))
        }
      } else {
        const arr = [item]
        localStorage.setItem('historyWord', JSON.stringify(arr))
      }
      this.$router.push({ name: 'searchlist', params: { category: item } })
    }
  },
  mounted () {
    getProHotWord().then(res => {
      this.hotWord = res.data.data.filter(v => v.keyword)
    })
    if (this.showHistoryWord) {
      this.historyWord = JSON.parse(localStorage.getItem('historyWord'))
    }
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
    .search{
      width: 76%;
      .van-search{
        padding: 10px 0;
      }
    }
    .right{
      input{
        position: static;
        border: none;
        height: 30px;
        padding: 0 6px;
        box-sizing: border-box;
        background-color: #e93b3d;
        color: #fff;
        border-radius: 4px;
        font-size: 14px;
      }
    }
  }
  .hotsearch{
    width: 100%;
    margin-top: 20px;
    .hotsearch-content{
      width: 100%;
      box-sizing: border-box;
      padding: 0 10px;
      .hotsearch-title{
        font-weight: 500;
        font-size: 18px;
      }
      .hotsearch-list{
        padding-right: 2px;
        font-size: 14px;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        li{
          padding:4px 10px;
          margin: 4px 5px;
          background-color: #f0f2f5;
          border-radius: 3px;
          &:nth-of-type(1), &:nth-of-type(2){
            color: red;
          }
        }
      }
    }
  }
  .searchhistory{
    width: 100%;
    .searchhistory-content{
      width: 100%;
      box-sizing: border-box;
      padding: 0 10px;
      .searchhistory-title{
        font-weight: 500;
        font-size: 18px;
        display: flex;
        justify-content: space-between;
        p{
          margin: 8px 0;
        }
        i{
          margin: 10px;
        }
      }
      .searchhistory-list{
        padding-right: 2px;
        font-size: 14px;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        li{
          padding:4px 10px;
          margin: 4px 5px;
          background-color: #f0f2f5;
          border-radius: 3px;
        }
      }
    }
  }
}
</style>
