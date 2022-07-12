import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/layout'
import users from './modules/users'
import roles from './modules/roles'
import menus from './modules/menus'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
// 公有
export const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    name: 'layout',
    component: layout,
    redirect: '/system',
    children: [
      {
        path: '/system',
        name: 'system',
        component: () => import('@/views/console'),
        meta: {
          title: '控制台',
          icon: 'el-icon-s-home'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/other/404')
      }
    ]
  }
]
// 私有
export const privateRoutes = [users, roles, menus]
const router = new VueRouter({
  routes: publicRoutes
})

export default router
