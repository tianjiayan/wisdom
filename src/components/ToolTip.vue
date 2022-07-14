<template>
  <div>
    <el-tooltip class='gt' content='全屏'>
      <el-button icon='el-icon-rank' type='text' @click='handleFullScreen'></el-button>
    </el-tooltip>
    <el-tooltip content='清空全部标签'>
      <el-button icon='el-icon-circle-close' type='text' @click='clearTag'></el-button>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'ToolTip',
  data () {
    return {
      fullscreen: false
    }
  },
  methods: {
    clearTag () {
      this.$store.commit('tagsView/clear')
      this.$router.push('/')
    },
    handleFullScreen () {
      const element = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    }
  }
}
</script>

<style lang='scss' scoped>
.el-button {
  font-size: 25px;
  color: #fff;

  &:hover {
    color: #fff;
  }
}

.el-tooltip {
  cursor: pointer;
}

.gt {
  transform: rotate(30deg);
  margin-right: 20px;
}
</style>
