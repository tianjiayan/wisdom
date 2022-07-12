<template>
  <div>
    <template v-if="!item.children">
      <el-menu-item :index="item.path">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
    </template>
    <template v-else-if="item.children && item.children.length > 0">
      <el-submenu :index="item.id + ''">
        <template slot="title">
          <i :class="'el-icon-' + item.icon"></i>
          <span>{{ item.label }}</span>
        </template>
        <menu-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
        ></menu-item>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'menu-item',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped>
</style>
