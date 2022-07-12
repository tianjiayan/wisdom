<template>
  <el-container>
    <app-aside></app-aside>
    <el-container>
      <el-header>
        <app-header></app-header>
      </el-header>
      <el-main>
        <bread-crumbs></bread-crumbs>
        <app-main></app-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from '@/layout/AppAside'
import AppHeader from '@/layout/AppHeader'
import AppMain from '@/layout/AppMain'
import BreadCrumbs from '@/components/BreadCrumbs'

export default {
  name: 'layout',
  components: {
    BreadCrumbs,
    AppAside,
    AppHeader,
    AppMain
  }
}
</script>

<style lang='scss' scoped>
.el-header {
  background-color: #18bc9c;
  color: #333;
}

.el-aside {
  background-color: #222d32;
  color: #fff;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

.el-container {
  margin-bottom: 40px;
  height: 100%;
}
</style>
