const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  // 记录真实姓名缓存
  realname: state => state.user.realname,
  // // 只存储客服角色的编号，如果是企业用户，那么此字段为空
  User_ID: state => state.user.User_ID,
  // / 如果为空证明是合同方用户，不为空那么就是付款方用户
  ParentCode: state => state.user.ParentCode,
  MenuPermissions: state => state.user.MenuPermissions,
  // 屏幕分辨率
  clientWidth: state => state.settings.clientWidth,
}
export default getters
