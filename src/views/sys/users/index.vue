<template>
  <div>
    <mySearch
      v-model="queryModel.username"
      label="用户名"
      @search="search"
    >
    </mySearch>
    <my-table :clos="clos" :data="userLIst">
      <template v-slot:avatar="{ row: { avatar } }">
        <el-avatar :size="60" :src="avatar"></el-avatar>
      </template>
      <template v-slot:roles="{ row: { roles } }">
        <el-tag v-for="item in roles" :key="item.id" style="margin-right: 5px">
          {{ item.name }}
        </el-tag>
      </template>
      <template v-slot:status="{ row: { status } }">
        <el-switch
          :active-value="1"
          :inactive-value="0"
          :value="status"
          active-color="#13ce66"
        ></el-switch>
      </template>
      <template v-slot:action>
        <el-button plain size="mini" type="success">编辑</el-button>
        <el-button plain size="mini" type="warning">分配角色</el-button>
        <el-button plain size="mini" type="danger">删除</el-button>
      </template>
    </my-table>
    <backTop></backTop>

    <!-- 弹出框 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import backTop from '../../../components/BackTop.vue'
import { userListApi } from '@/api/user'
import clos from './clos'

export default {
  components: {
    backTop
  },
  data() {
    return {
      dialogFormVisible: false,
      value: 1,
      clos,
      queryModel: {
        current: 1,
        size: 50,
        username: ''
      },
      // 用户列表数据
      userLIst: []
    }
  },
  created() {
    this.getUserList()
  },
  watch: {
    queryModel: {
      deep: true,
      handler(val) {
        if (val.username.length <= 0) {
          this.getUserList()
        }
      }
    }
  },
  methods: {
    async getUserList() {
      try {
        const { records } = await userListApi(this.queryModel)
        this.userLIst = records
      } catch (e) {
        console.log(e)
      }
    },
    search() {
      this.getUserList()
    }
  }
}
</script>

<style scoped></style>
