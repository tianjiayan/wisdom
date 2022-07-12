import layout from '@/layout'

export default {
  path: '/sys',
  name: 'sys:menu:list',
  meta: {
    title: '系统管理',
    icon: 'el-icon-s-grid'
  },
  component: layout,
  children: [
    {
      path: '/sys/menus',
      name: 'sysMenus',
      meta: {
        title: '菜单管理',
        icon: 'el-icon-menu'
      },
      component: () => import('@/views/sys/menus')
    }
  ]
}
