<template>
  <div>
    <my-search
      v-model="queryModel.name"
      :flag="flag"
      label="角色"
      @add="
        model = {}
        $refs.form.open()
      "
      @search="search"
    ></my-search>
    <!-- 表格 -->
    <my-table :clos="clos" :data="roleList">
      <template v-slot:status="{ row: { status } }">
        <el-switch
          :active-value="1"
          :inactive-value="0"
          :value="status"
          active-color="#13ce66"
        ></el-switch>
      </template>
      <template v-slot:action="{ row }">
        <el-button plain size="mini" type="success" @click="handleEdit(row)"
          >编辑</el-button
        >
        <el-button plain size="mini" type="warning" @click="handleEditRole(row)"
          >分配权限</el-button
        >
        <el-button plain size="mini" type="danger">删除</el-button>
      </template>
    </my-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { roleListAPI } from '@/api/role'
import clos from './clos'
export default {
  data() {
    return {
      clos,
      roleList: [],
      total: 0,
      queryModel: {
        current: 1,
        size: 5,
        name: ''
      }
    }
  },
  methods: {
    // 分配权限
    handleEditRole(row) {},
    // 编辑
    handleEdit(row) {},
    search() {
      this.queryModel.current = 1
      this.getRoleList()
    },
    // 获取数据渲染
    async getRoleList() {
      try {
        const { records, total } = await roleListAPI(this.queryModel)
        this.roleList = records
        this.total = total
      } catch (e) {
        console.log(e)
      }
    }
  },
  computed: {
    ...mapGetters(['authoritys']),
    flag() {
      let f = false
      this.authoritys.forEach((item) => {
        if (item === 'sys:user:add') {
          f = true
        }
      })
      return f
    }
  }
}
</script>

<style scoped></style>
