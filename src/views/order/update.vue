<template>
  <div class="box">
    <div class="header">
       <van-nav-bar
        title="修改地址"
        left-arrow
        @click-left="$router.back()"
      />
    </div>
    <div class="content">
      <!-- 地址编辑 -->
      <van-address-edit
        :area-list="areaList"
        :address-info="initaddress"
        show-delete
        show-set-default
        save-button-text="保存该地址"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, AddressEdit, Toast, Area } from 'vant'
import { areaList } from '@vant/area-data'
import { updateAddress, deleteAddress } from '../../api/address'
Vue.use(AddressEdit)
Vue.use(Toast)
Vue.use(Area)
Vue.use(NavBar)
export default {
  data () {
    return {
      areaList,
      initaddress: {}
    }
  },
  mounted () {
    this.initaddress = {
      name: this.$route.params.item.name,
      tel: this.$route.params.item.tel,
      province: this.$route.params.item.province,
      city: this.$route.params.item.city,
      county: this.$route.params.item.county,
      addressDetail: this.$route.params.item.addressDetail,
      isDefault: this.$route.params.item.isDefault
    }
  },
  methods: {
    onSave (content) {
      updateAddress({
        addressid: this.$route.params.item.addressid,
        userid: localStorage.getItem('userid'),
        name: content.name,
        tel: content.tel,
        province: content.province,
        city: content.city,
        county: content.county,
        addressDetail: content.addressDetail,
        isDefault: content.isDefault
      }).then(res => {
        this.$router.back()
      })
    },
    onDelete () {
      if (this.isUpdateaddress) {
        deleteAddress({
          addressid: this.$route.params.item.addressid
        }).then(res => {
          this.$router.back()
        })
      } else {
        this.$router.back()
      }
    }
  }
}
</script>
