<template>
  <ul class="proList" :class="flag ? 'col_2' : 'col_1'">
    <li class="proItem" v-for="item, index of proList" :key='index'  @click="toDetail(item.proid)">
      <div class="itemImage">
        <img :src="item.img1" alt="">
      </div>
      <div class="itemInfo">
        <div class="itemTitle van-multi-ellipsis--l2">{{ item.proname }}</div>
        <div class="itemPrice">￥ {{ item.originprice }}</div>
        <div class="itemDesc van-multi-ellipsis--l2">{{ item.desc }}</div>
      </div>
    </li>
    <div class="proListShow" @click="flag = !flag">
      <van-icon v-if="flag" size="30" name="bars" />
      <van-icon v-else size="30" name="apps-o" />
    </div>
  </ul>
</template>

<script>
export default {
  props: {
    proList: Array
  },
  data () {
    return {
      flag: true
    }
  },
  methods: {
    toDetail (proid) {
      this.$router.push({ name: 'detail', params: { proid } })
      // this.$router.push({ name: 'detail', params: { proid } })
    }
  }
}
</script>

<style lang="scss">
/* 样式一列表展示 */
  .proList.col_1{
    .proItem{
      display: flex;
      height: 130px;
      padding: 10px 0 5px 10px;
      border-bottom: 1px solid #e0e0e0;
      .itemImage{
        img{
          padding: 5px;
          height: 120px;
          width: 120px;
        }
      }
      .itemInfo{
        box-sizing: border-box;
        flex: 1;
        padding: 0 10px;
        padding-top: 8px;
        .itemTitle{
          font-size: 16px;
          line-height: 20px;
        }
        .itemPrice{
          font-size: 18px;
          font-weight: 600;
          margin-top: 8px;
          color:#e4393c;
        }
        .itemDesc{
          font-size: 16px;
          margin-top: 8px;
        }
      }
    }
  }
  /* 样式二列表展示 */
   .proList.col_2{
     display: flex;
     flex-wrap: wrap;
     padding: 0.5rem;
     justify-content: space-between;
    .proItem{
      width: 48%;
      margin: 2% 0;
      height: 15.5rem;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 0.5rem;
      overflow: hidden;
      .itemImage{
        height:9rem;
        overflow: hidden;
        img{
          width: 100%;
        }
      }
      .itemInfo{
        box-sizing: border-box;
        flex: 1;
        padding: 0 0.5rem;
        padding-top: 0.4px;
        .itemTitle{
          font-size: 16px;
          line-height: 20px;
          height: 38px;
          margin-top: 0.5rem;
        }
        .itemPrice{
          font-size: 18px;
          font-weight: 600;
          margin-top: 8px;
          color:#e4393c;
        }
        .itemDesc{
          font-size: 16px;
          margin-top: 8px;
        }
      }
    }
  }

  .proListShow{
    position: fixed;
    bottom: 100px;
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
