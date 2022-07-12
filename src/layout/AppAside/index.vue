<template>
  <el-aside :width="sideWidth">
    <el-menu
      :collapse="$store.getters.Collapse"
      :collapse-transition="false"
      :default-active="$route.path"
      active-text-color="#ffd04b"
      background-color="#222d32"
      router
      text-color="#fff"
    >
      <menu-item
        v-for="item in menuList"
        :key="item.path"
        :item="item"
      ></menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
import MenuItem from './MenuItem'
import { mapGetters } from 'vuex'
import { rmeoveChildren, filterMenus } from '@/utils/rmeoveChildren'

export default {
  components: {
    MenuItem
  },
  computed: {
    ...mapGetters(['menus', 'Collapse']),
    menuList() {
      const data = rmeoveChildren(this.menus)
      return filterMenus(data)
    },
    sideWidth() {
      return this.Collapse ? '64px' : '200px'
    }
  }
}
</script>

<style scoped>
.el-menu {
  border: none;
}
</style>
