import Vue from 'vue'
import store from '@/store'
Vue.directive('permission', {
  inserted: function (el, binding, vnode) {
    // 获取后台所返回的按钮权限列表
    const permissionList = store.getters.permission
    // 获取当前按钮所绑定的权限
    const value = binding.value
    // 判断按钮所绑定的权限是否在后台所返回的按钮权限列表中
    if (!permissionList.includes(value)) {
      el.style = 'display:none'
      setTimeout(() => {
        el.parentNode && el.parentNode.removeChild(el)
      }, 0)
    }
  }
})
