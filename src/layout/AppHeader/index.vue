<template>
  <div class="header-container">
    <div class="left-container">
      <div class="left-icon" @click="changeCollapse">
        <i class="el-icon-s-fold"></i>
      </div>
      <div class="tags-view-container">
        <tags-view></tags-view>
      </div>
    </div>
    <MyDropdown></MyDropdown>
  </div>
</template>

<script>
import MyDropdown from '@/components/MyDropdown'
import { mapMutations } from 'vuex'
import TagsView from '@/components/TagsView'

export default {
  components: {
    TagsView,
    MyDropdown
  },
  methods: {
    ...mapMutations({
      changeCollapse: 'menu/changeCollapse'
    })
  }
}
</script>

<style lang="scss" scoped>
.header-container {
  height: 100%;
  position: relative;

  .left-container {
    position: absolute;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;

    .left-icon {
      color: #fff;
      font-size: 30px;
      height: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .tags-view-container {
      margin-left: 10px;
    }
  }
}
</style>
