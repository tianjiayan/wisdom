<template>
  <div>
    <div class="block">
      <span class="demonstration">默认</span>
      <el-slider v-model="value1"></el-slider>
    </div>
    <div class="block">
      <span class="demonstration">自定义初始值</span>
      <el-slider v-model="value2"></el-slider>
    </div>
    <div class="block">
      <span class="demonstration">隐藏 Tooltip</span>
      <el-slider v-model="value3" :show-tooltip="false"></el-slider>
    </div>
    <div class="block">
      <span class="demonstration">格式化 Tooltip</span>
      <el-slider v-model="value4" :format-tooltip="formatTooltip"></el-slider>
    </div>
    <div class="block">
      <span class="demonstration">禁用</span>
      <el-slider v-model="value5" disabled></el-slider>
    </div>
    <el-progress :percentage="0" type="circle"></el-progress>
    <el-progress :percentage="25" type="circle"></el-progress>
    <el-progress :percentage="100" status="success" type="circle"></el-progress>
    <el-progress :percentage="70" status="warning" type="circle"></el-progress>
    <el-progress
      :percentage="50"
      status="exception"
      type="circle"
    ></el-progress>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: 0,
      value2: 50,
      value3: 36,
      value4: 48,
      value5: 42
    }
  },
  methods: {
    formatTooltip(val) {
      return val / 100
    }
  }
}
</script>
