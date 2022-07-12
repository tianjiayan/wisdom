import layout from '@/layout'

export default {
  path: '/sys',
  name: 'sys:role:list',
  meta: {
    title: '系统管理',
    icon: 'el-icon-s-grid'
  },
  component: layout,
  children: [
    {
      path: '/sys/roles',
      name: 'sysroles',
      meta: {
        title: '角色管理',
        icon: 'el-icon-user-solid'
      },
      component: () => import('@/views/sys/roles')
    }
  ]
}
