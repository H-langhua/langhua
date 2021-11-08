<template>
  <div class="box">
    <div class="header">
       <van-nav-bar
        title="注册"
        left-arrow
        @click-left="$router.back()"
      />
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar } from 'vant'
Vue.use(NavBar)
export default {

}
</script>

<style lang="scss" scoped>
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
  .content{
    background-color: #fff;
  }
</style>
