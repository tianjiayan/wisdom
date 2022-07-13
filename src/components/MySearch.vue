<template>
  <div>
    {{ label }}
    <el-input v-model.trim="search" :placeholder="'请输入' + label"></el-input>
    <el-button icon="el-icon-search" type="success" @click="$emit('search')"
      >查询</el-button
    >
  </div>
</template>

<script>
export default {
  name: 'mySearch',
  props: {
    label: String,
    value: String
  },
  data() {
    return {
      search: '',
      dialogFormVisible: false
    }
  },
  watch: {
    search(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped>
.el-input {
  width: 200px;
  margin: 0 10px;
}

</style>
