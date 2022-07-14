<template>
  <div>
    <mySearch v-model="queryModel.username" label="用户名" @search="search">
    </mySearch>
    <el-button type="primary" class="button" @click="add" icon="el-icon-edit"
      >新增</el-button
    >
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
      <template v-slot:action="{ row }">
        <el-button
          plain
          size="mini"
          type="success"
          @click="handleEdit(row.id, row)"
          >编辑</el-button
        >
        <el-button plain size="mini" type="warning">分配角色</el-button>
        <el-button plain size="mini" type="danger">删除</el-button>
      </template>
    </my-table>
    <backTop></backTop>

    <!-- 分页 -->
    <div class="pagunation">
      <span></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryModel.current"
        :page-sizes="[20, 40, 60, 80]"
        :page-size="queryModel.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 弹出框 -->
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible" width="30%">
      <div slot="footer" class="dialog-footer">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="头像" prop="avatar">
            <el-avatar :size="60">
              <img :src="ruleForm.avatar" alt="" />
            </el-avatar>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
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

    <!-- 编辑 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisible1" width="30%">
      <div slot="footer" class="dialog-footer">
        <el-form
          :model="ruleForm1"
          :rules="rules1"
          ref="ruleForm1"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="头像" prop="avatar">
            <el-avatar :size="60">
              <img :src="ruleForm1.avatar" alt="" />
            </el-avatar>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm1.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm1.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm1.email"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio v-model="ruleForm1.status" label="1">启用</el-radio>
            <el-radio v-model="ruleForm1.status" label="2">禁用</el-radio>
          </el-form-item>
        </el-form>
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="submitForm1('ruleForm1')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import backTop from '../../../components/BackTop.vue'
import { userListApi, addUser, getupdate } from '@/api/user'
import clos from './clos'
import { notifyTips } from '@/utils/notify'
export default {
  components: {
    backTop
  },
  data() {
    return {
      dialogFormVisible1: false,
      rules1: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        avatar: [{ required: true, message: '头像不能为空', trigger: 'blur' }],
        status: [{ required: true, message: '权限不能为空', trigger: 'blur' }]
      },
      ruleForm1: {
        avatar:
          'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5a307996-a7f5-483d-a6f1-6ea9944b0d18/94d8e009-b183-4d54-a389-724181af5362.jpg',
        createTime: '',
        email: '',
        password: '',
        username: '',
        status: '',
        id: ''
      },
      total: 0,
      ruleForm: {
        avatar:
          'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5a307996-a7f5-483d-a6f1-6ea9944b0d18/94d8e009-b183-4d54-a389-724181af5362.jpg',
        createTime: '',
        email: '',
        password: '',
        username: '',
        status: '',
        id: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        avatar: [{ required: true, message: '头像不能为空', trigger: 'blur' }],
        status: [{ required: true, message: '权限不能为空', trigger: 'blur' }]
      },
      dialogFormVisible: false,
      value: 1,
      clos,
      queryModel: {
        current: 1,
        size: 20,
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
    // 编辑
    submitForm1(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const response = await getupdate(this.ruleForm1)
          console.log(response)
          notifyTips('提示', '请求成功', 'success')
          this.getUserList()
          this.dialogFormVisible1 = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.dialogFormVisible1 = true
      this.ruleForm1 = row
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.queryModel.size = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.queryModel.current = val
      this.getUserList()
    },
    // 模态框
    add() {
      this.dialogFormVisible = true
    },
    // 添加
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const response = await addUser(this.ruleForm)
          console.log(response)
          this.$message('请求成功')
          this.getUserList()
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    async getUserList() {
      try {
        const { records, total } = await userListApi(this.queryModel)
        this.userLIst = records
        this.total = total
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

<style scoped>
.button {
  position: relative;
  top: -30px;
  right: -1530px;
}
.pagunation {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}
</style>
