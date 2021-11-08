<template>
  <van-dropdown-menu>
    <van-dropdown-item @change="changePriceList" v-model="value1" :options="option1" />
    <van-dropdown-item @change="changeNumList" v-model="value2" :options="option2" />
  </van-dropdown-menu>
</template>

<script>
import Vue from 'vue'
import { DropdownMenu, DropdownItem } from 'vant'
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
export default {
  name: 'Sequence',
  data () {
    return {
      value1: 0,
      value2: 'a',
      option1: [
        { text: '默认排序', value: 0 },
        { text: '价格升序', value: 1 },
        { text: '价格降序', value: 2 }
      ],
      option2: [
        { text: '销量排序', value: 'a' },
        { text: '销量升序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ]
    }
  },
  methods: {
    changePriceList (value) {
      this.$bus.$emit('changePriceList', value)
    },
    changeNumList (value) {
      this.$bus.$emit('changeNumList', value)
    }
  }
}
</script>

<style>

</style>
