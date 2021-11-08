<template>
  <div class="search">
    <van-search
      disabled
      shape="round"
      background='#ffffff00'
      :placeholder="searchword"
      @click="toSearch"
    />
  </div>
</template>

<script>
export default {
  props: {
    searchword: {
      type: String,
      default: '花裤衩'
    }
  },
  name: 'SearchBox',
  methods: {
    toSearch () {
      this.$router.push('/search')
    }
  },
  mounted () {
    // console.log(this.searchword)
  }
}
</script>

<style lang="scss" scoped>
.search{
  .van-search{
    padding: 6px;
    width: 280px;
    height: 44px;
    .van-search__content{
      height: 100%;
    }
  }
}
</style>
