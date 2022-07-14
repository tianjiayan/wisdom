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
    <el-button type="primary" class="button" @click="add" icon="el-icon-edit"
      >新增</el-button
    >
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
    <!-- 分页 -->
    <div class="pagunation">
      <span></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryModel.current"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryModel.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- //弹出框 -->
      <el-dialog
        title="新增用户"
        center
        :visible.sync="dialogFormVisible"
        width="30%"
      >
        <div slot="footer" class="dialog-footer">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="角色" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="编码" prop="code">
              <el-input v-model="ruleForm.code"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="remark">
              <el-input type="textarea" v-model="ruleForm.remark"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-radio v-model="ruleForm.status" label="1">启用</el-radio>
              <el-radio v-model="ruleForm.status" label="2">禁用</el-radio>
            </el-form-item>
          </el-form>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { roleListAPI, roleAddApi } from '@/api/role'
import clos from './clos'
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        code: '',
        status: '',
        remark: ''
      },
      rules: {
        name: [{ required: true, message: '请输入角色', trigger: 'blur' }],
        code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        status: [{ required: true, message: '权限不能为空', trigger: 'blur' }]
      },
      dialogFormVisible: false,
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
  created() {
    this.getRoleList()
  },
  methods: {
    // 添加
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const response = await roleAddApi(this.ruleForm)
          console.log(response)
          this.$message('请求成功')
          this.getRoleList()
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 模态框
    add() {
      this.dialogFormVisible = true
    },
    // 分配权限
    handleEditRole(row) {
      console.log(row)
    },
    // 编辑
    handleEdit(row) {
      console.log(row)
    },
    // 分页
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.queryModel.size = val
      this.getRoleList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.queryModel.current = val
      this.getRoleList()
    },
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

<style scoped>
.pagunation {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}
.button {
  position: relative;
  top: -30px;
  right: -1530px;
}
</style>
