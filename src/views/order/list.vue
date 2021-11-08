<template>
  <div class="box">
    <div class="header">
       <van-nav-bar
        title="地址列表"
        left-arrow
        @click-left="$router.back()"
      />
    </div>
    <div class="content">
      <!-- 地址列表 -->
      <van-address-list
        v-model="chosenAddressId"
        :list="addresslist1"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="updateAddress"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, AddressList, Toast } from 'vant'
import { updateOrderAddress } from '../../api/order'
import { getAddresslist } from '../../api/address'
Vue.use(NavBar)
Vue.use(AddressList)
Vue.use(Toast)
export default {
  data () {
    return {
      chosenAddressId: '',
      addresslist1: []
    }
  },
  methods: {
    onAdd () {
      this.$router.push('/addorderaddress/' + this.$route.params.time)
    },
    onEdit (item, index) {
      console.log(item, index)
      this.$router.push({
        name: 'updateorderaddress',
        params: { item }
      })
    },
    updateAddress (item) {
      // console.log(item)
      item.time = this.$route.params.time
      updateOrderAddress(item).then(() => {
        this.$router.back()
      })
    }
  },
  mounted () {
    getAddresslist({
      userid: localStorage.getItem('userid')
    }).then(res => {
      // console.log(res.data)
      res.data.data.map((item, index) => {
        let str = ''
        item.province === item.city
          ? str = item.province + item.county + item.addressDetail
          : str = item.province + item.city + item.county + item.addressDetail
        item.address = str
        item.id = index + 1
      })
      this.addresslist1 = res.data.data
    })
  }
}
</script>
