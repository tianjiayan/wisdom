<template>
  <div class="login-container">
    <h1>智 慧 服 务 平 台</h1>
    <div class="con">
      <h2>欢迎登录</h2>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <div class="verify">
            <el-input
              v-model.trim="ruleForm.code"
              placeholder="请输入验证码"
            ></el-input>
            <el-image @click.stop="getcode" :src="codeImageUrl" />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-button"
            type="danger"
            :loading="loadingStatus"
            @click="submitForm('ruleForm')"
            >立即登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { getCaptcha } from '../../api/user'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      // loading加载状态
      loadingStatus: false,
      codeImageUrl: '',
      ruleForm: {
        username: 'duck',
        password: 'admin888',
        code: '',
        token: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入图形验证码', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getcode()
  },
  methods: {
    ...mapActions({ login: 'user/login' }),
    // 图形验证码
    async getcode() {
      const response = await getCaptcha()
      console.log(response)
      this.codeImageUrl = response.captchaImg
      this.ruleForm.token = response.token
    },
    // 登录
    submitForm(formName) {
      console.log(123)
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            await this.login(this.ruleForm)
            // console.log(response)
            // if (token) return
            this.$notify({
              title: '提示',
              message: '登录成功',
              type: 'success'
            })
            this.loadingStatus = true
            this.$router.push('/')
          } catch (e) {
            console.log(e)
          } finally {
            this.loadingStatus = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.verify {
  width: 100%;
  display: flex;
  align-items: center;
}
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-family: Verdana;
  /* background-size: 100%; */
  background: url('../../assets/images/bg.jpg') no-repeat fixed center;
  background-size: 100% 100%;
}
h1 {
  color: white;
  text-align: center;
  font-size: 40px;
  font-weight: 100;
  margin-top: 80px;
}
.con {
  box-sizing: border-box;
  width: 500px;
  height: 600px;
  /* border: solid 1px white; */
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  margin-top: 140px;
  padding-right: 60px;
  /* text-align: center; */
}
h2 {
  color: white;
  margin-top: 10px;
}
.demo-ruleForm {
  text-align: center;
  margin-top: 100px;
}
.el-image {
  width: 200px;
  height: 40px;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
}
.login-button {
  width: 100%;
  border-radius: 5px;
}
</style>
