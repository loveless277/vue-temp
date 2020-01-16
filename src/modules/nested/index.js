import { asyncRouter } from '@/router'
import store from '@/store'

// 引入分模块
import routerModule from './router'
import storeModule from './store'

// 添加模块路由到待分配路由变量
asyncRouter.push(routerModule)

// 注册新的vuex模块
store.registerModule('nested', storeModule)
