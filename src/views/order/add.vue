<template>
  <div class="box">
    <div class="header">
       <van-nav-bar
        title="添加地址"
        left-arrow
        @click-left="$router.back()"
      />
    </div>
    <div class="content">
      <!-- 地址编辑 -->
      <van-address-edit
        :area-list="areaList"
        show-set-default
        save-button-text="保存并且使用该地址"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, AddressEdit, Toast, Area } from 'vant'
import { areaList } from '@vant/area-data'
import { updateOrderAddress } from '../../api/order'
import { addAddress } from '../../api/address'
Vue.use(AddressEdit)
Vue.use(Toast)
Vue.use(Area)
Vue.use(NavBar)
export default {
  data () {
    return {
      areaList
    }
  },
  methods: {
    onSave (content) {
      content.userid = localStorage.getItem('userid')
      addAddress(content).then(res => {
        content.time = this.$route.params.time
        updateOrderAddress(content).then((res1) => { this.$router.go(-2) })
      })
    }
  }
}
</script>
