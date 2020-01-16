const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  // 模块路由
  // permissionRouter: state => state.promise.permissionRouter
  // 根据用户权限生成的权限路由
  permissionRouter: state => state.promise.permissionRouter,
  // 用户权限
  userPermission: state => state.promise.userPermission
}
export default getters
