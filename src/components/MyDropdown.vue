<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <el-tooltip
      class="item"
      effect="dark"
      content="点击全屏"
      placement="bottom"
    >
      <i class="el-icon-rank" @click.prevent="fullScreen"></i>
    </el-tooltip>
    <el-tooltip
      class="item"
      effect="dark"
      content="关闭全部标签"
      placement="bottom"
    >
      <i class="el-icon-circle-close"></i>
    </el-tooltip>
    <span class="el-dropdown-link">
      <el-avatar :src="$store.getters.userInfo.avatar"></el-avatar>
      <span class="user-name">
        {{ $store.getters.userInfo.username }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="profile">个人设置</el-dropdown-item>
      <el-dropdown-item command="logout">安全退出</el-dropdown-item>
    </el-dropdown-menu>
    <el-dialog
      :visible="dialogVisible"
      center
      close-on-press-escape
      title="编辑个人信息"
      width="500px"
    >
      <el-form label-width="60px">
        <el-form-item label="头像">
          <el-avatar
            :size="60"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
        </el-form-item>
        <el-form-item label="账号">
          <el-input :value="$store.getters.userInfo.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" value="112312312323" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input value="51318492321@qq.com" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </el-dropdown>
</template>

<script>
import { notifyTips } from '@/utils/notify'
import { mapActions } from 'vuex'
import screenfull from 'screenfull'

export default {
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    fullScreen() {
      if (screenfull.isEnabled && !screenfull.isFullscreen) {
        screenfull.request()
      }
    },
    ...mapActions({
      userLogout: 'user/userLogout'
    }),
    handleCommand(command) {
      switch (command) {
        case 'logout':
          this.logout()
          break
        case 'profile':
          this.person()
          break
      }
    },
    // 退出
    async logout() {
      try {
        await this.$confirm('确定要退出吗？', '提示', { type: 'warning' })
        notifyTips('提示', '正在退出中...', 'success')
        await this.userLogout()
        this.$router.push('/login')
      } catch (e) {
        console.log(e)
      }
    },
    // 个人设置
    async person() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom {
  clear: both;
  text-align: center;
}
.el-icon-circle-close {
  margin-right: 20px;
  font-size: 25px;
  color: white;
  cursor: pointer;
}
.el-icon-rank {
  margin-right: 20px;
  font-size: 25px;
  color: white;
  cursor: pointer;
}
.el-dropdown {
  height: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;

  .el-dropdown-link {
    display: flex;
    align-items: center;

    .el-avatar {
      margin-right: 10px;
    }

    .user-name {
      cursor: pointer;
      font-size: 18px;
      color: white;
      font-weight: bold;
    }
  }
}

::v-deep(.el-dialog__body) {
  padding: 25px 25px 0 25px !important;
}
</style>
