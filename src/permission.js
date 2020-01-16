import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // getToken from cookie

// NProgress是进度条，百度有配置
NProgress.configure({ showSpinner: false })// NProgress configuration

const whiteList = ['/login'] // 不重定向白名单

// 路由拦截
router.beforeEach((to, from, next) => {
  // 页面每次进来的时候显示控制条
  NProgress.start()
  // console.log(to, from)
  // next()
  // 这堆就是权限拦截
  if (getToken()) { // 有无token等登录信息
    if (to.path === '/login') { // 有且如果要跳登录页就转跳主页
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it  进度条完成
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(() => { // 拉取用户信息
          if (store.getters.userPermission === undefined) { // 判断当前是否已获取用户权限
            store.dispatch('getPermission', getToken()).then(() => {
              // 根据用户权限生成异步路由
              store.dispatch('GeneratePermissionRoutes').then(() => {
                next({ ...to, replace: true })
              })
            })
          } else {
            next()
          }
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
      // if (store.getters.permissionRouter === undefined) { // 判断当前是否已添加模块路由
      //   store.commit('SET_USER_PERMISSION', '*') // 设置用户权限
      //   store.dispatch('GeneratePermissionRoutes') // 根据用户权限生成异步路由
      //   next({ ...to, replace: true })
    }
  } else { // 如果无登录信息
    if (whiteList.indexOf(to.path) !== -1) { // 是否在白名单，是直接进入
      next()
    } else {
      // 相当于
      next({ path: '/login' })
      // next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 完全进入页面后进度条100%
  NProgress.done() // 结束Progress
})
