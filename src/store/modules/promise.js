
import { asyncRouter, constantRouterMap } from '@/router'
import router from '@/router'

import * as loginApi from '@/api/login'

// 递归过滤异步路由表，返回符合用户角色权限的路由表
// 括号里形参  :异步路由表，用户拥有权限路由名
function filterRouter(asyncRouterMap, permission) {
  const accessedRouters = [] // 存返回的路由
  asyncRouterMap.forEach(route => {
    // 判断权限表里是否有该路由模块
    const flag = permission.findIndex(item => item === route.name)
    // 如果权限表里有这个模块则添加
    if (flag !== -1) {
      if (route.children && route.children.length) {
        route.children = filterRouter(route.children, permission)
      } else {
        route.children = []
      }
      accessedRouters.push(route)
    } else {
      // 如果没有这个模块, 判断有没有子模块，有则遍历
      if (route.children && route.children.length) {
        const children = filterRouter(route.children, permission)
        if (children.length !== 0) {
          route.children = children
          accessedRouters.push(route)
        }
      }
    }
  })
  // 测试先返回所有路由
  // return asyncRouterMap
  // console.log(accessedRouters)
  return accessedRouters
}

const promise = {
  state: {
    // 获取的用户权限存到这里 []
    userPermission: undefined,
    // 允许访问的路由
    permissionRouter: undefined
  },
  mutations: {
    SET_USER_PERMISSION: (state, permission) => {
      state.userPermission = permission
    },
    SET_PERMISSION_ROUTER: (state, router) => {
      state.permissionRouter = constantRouterMap.concat(router)
    }
  },
  actions: {
    // 获取权限
    getPermission({ commit }, token) {
      return loginApi.getPermission(token).then(res => {
        if (res.code === 20000) commit('SET_USER_PERMISSION', res.data)
        else commit('SET_USER_PERMISSION', [])
      })
    },
    // 生成页面可访问路由 默认都可以访问（*）
    GeneratePermissionRoutes({ commit, state }) {
      return new Promise(resolve => {
        // console.log(router)
        const userPermission = state.userPermission
        let permissionRouter = [] // 根据权限加载的路由表
        if (userPermission === '*') permissionRouter = asyncRouter
        else permissionRouter = filterRouter(asyncRouter, userPermission)
        console.log(permissionRouter)
        router.addRoutes(permissionRouter) // 动态添加可访问路由表
        router.addRoutes([{ path: '*', redirect: '/404', hidden: true }])
        commit('SET_PERMISSION_ROUTER', permissionRouter)
        resolve()
      })
    }
  }
}

export default promise
