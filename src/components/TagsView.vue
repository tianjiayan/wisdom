<template>
  <div class="tags">
    <el-tag
      v-for="(item, i) in tags"
      :key="i"
      :closable="item.path !== '/system'"
      :type="$route.path === item.path ? 'danger' : 'warning'"
      @click="routingHop(item)"
      @close="closeTag(item, i)"
    >
      {{ item.title }}
    </el-tag>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters(['tags'])
  },
  methods: {
    ...mapMutations({
      setTags: 'tagsView/setTags',
      deleteTags: 'tagsView/deleteTags'
    }),
    routingHop(item) {
      if (item.path === this.$route.path) return
      this.$router.push(item.path)
    },
    closeTag(item, i) {
      const tags = this.tags
      if (item.path === this.$route.path) {
        this.$router.push(tags[i - 1].path)
      }
      this.deleteTags(i)
    }
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler(val) {
        const {
          path,
          meta: { title }
        } = val
        this.setTags({
          path,
          title
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.tags {
  display: flex;
  align-items: center;

  .el-tag {
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
