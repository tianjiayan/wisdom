<template>
  <div>
    <mySearch v-model="queryModel.username" label="用户名" @search="search">
    </mySearch>
    <el-button type="primary" class="button" @click="add">新增</el-button>
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
          <el-form-item label="状态">
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
</template>

<script>
import backTop from '../../../components/BackTop.vue'
import { userListApi, addUser } from '@/api/user'
import clos from './clos'

export default {
  components: {
    backTop
  },
  data() {
    return {
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
        avatar: [{ required: true, message: '头像不能为空', trigger: 'blur' }]
      },
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
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

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

<style scoped>
.button {
  position: relative;
  top: -30px;
  right: -1380px;
}
</style>
