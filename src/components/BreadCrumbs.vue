<template>
  <el-card>
    <el-breadcrumb
      v-if="$route.path !== '/system'"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/sys' }"
        ><a>系统管理</a></el-breadcrumb-item
      >
      <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <h2 v-else style="font-weight: bold">控制台</h2>
  </el-card>
</template>

<script>
export default {
  name: 'BreadCrumbs'
}
</script>

<style scoped>
</style>
