import request from "@/utils/request";

// 获取模块管理列表
export function GetAdmin_PermissionSys(PageIndex, PageSize) {
  return request({
    url:
      "/SystemManagement/GetAdmin_PermissionSys?PageIndex=" +
      PageIndex +
      "&PageSize=" +
      PageSize,
    method: "post",
  });
}

// 获取父级模块
export function GetParentAdmin_Permission(flag) {
  return request({
    url: "/SystemManagement/GetParentAdmin_Permission?Flag=" + flag,
    method: "post",
  });
}

// 添加模块
export function AddPermission(model) {
  // model.parent_id = model.parent_id ? 0 : model.parent_id;
  return request({
    url: "/SystemManagement/AddPermission",
    method: "post",
    data: model,
  });
}
// 获取模块(单个)
export function GetPermissionFirst(PermissionCode) {
  return request({
    url:
      "/SystemManagement/GetPermissionFirst?PermissionCode=" + PermissionCode,
    method: "post",
  });
}
// 修改模块
export function UpdatePermission(model) {
  // model.parent_id = model.parent_id ? 0 : model.parent_id;
  return request({
    url: "/SystemManagement/UpdatePermission",
    method: "post",
    data: model,
  });
}
// 删除模块
export function DeletePermission(PermissionCode) {
  return request({
    url: "/SystemManagement/DeletePermission?PermissionCode=" + PermissionCode,
    method: "post",
  });
}
// 获取模块管理列表
export function GetRoleManagement(PageIndex, PageSize) {
  return request({
    url:
      "/SystemManagement/GetRoleManagement?PageIndex=" +
      PageIndex +
      "&PageSize=" +
      PageSize,
    method: "post",
  });
}
// 获取模块树
export function GetAdmin_PermissionByRole() {
  return request({
    url: "/SystemManagement/GetAdmin_PermissionByRole",
    method: "post",
  });
}
// 根据角色id获取所配置的模块编号
export function GetAdmin_PermissionByRoleID(RoleCode) {
  return request({
    url: "/SystemManagement/GetAdmin_PermissionByRoleID?RoleCode=" + RoleCode,
    method: "post",
  });
}

// 角色绑定模块
export function BindRole_Permissions(model) {
  return request({
    url: "/SystemManagement/BindRole_Permissions",
    method: "post",
    data: model,
  });
}

// 获取用户列表
export function GetAdmin_User(
  DepartmentCode,
  PositionStatus,
  User_RealName,
  RoleCode,
  PageIndex,
  PageSize
) {
  return request({
    url:
      "/SystemManagement/GetAdmin_User?DepartmentCode=" +
      DepartmentCode +
      "&PositionStatus=" +
      PositionStatus +
      "&User_RealName=" +
      User_RealName +
      "&RoleCode=" +
      RoleCode +
      "&PageIndex=" +
      PageIndex +
      "&PageSize=" +
      PageSize,
    method: "post",
  });
}

// 添加用户
export function AddAdmin_User(model) {
  return request({
    url: "/SystemManagement/AddAdmin_User",
    method: "post",
    data: model,
  });
}

// 获取用户(单个)
export function GetAdmin_UserFirst(User_ID) {
  return request({
    url: "/SystemManagement/GetAdmin_UserFirst?User_ID=" + User_ID,
    method: "post",
  });
}

// 修改用户
export function UpdateAdmin_User(model) {
  return request({
    url: "/SystemManagement/UpdateAdmin_User",
    method: "post",
    data: model,
  });
}

// 删除用户
export function DeleteAdmin_User(User_ID) {
  return request({
    url: "/SystemManagement/DeleteAdmin_User?User_ID=" + User_ID,
    method: "post",
  });
}
export function UpdatePasswordCommit(model) {
  return request({
    url: "/SystemManagement/UpdatePasswordCommit",
    method: "post",
    data: model,
  });
}

// 获取用户(单个)
export function GetWelfare_Corporation() {
  return request({
    url: "/SystemManagement/GetWelfare_Corporation",
    method: "post",
  });
}

// 添加角色
export function AddAdmin_Role(model) {
  return request({
    url: "/SystemManagement/AddAdmin_Role",
    method: "post",
    data: model,
  });
}

// 获取角色(单个)
export function GetAdmin_RoleFirst(RoleCode) {
  return request({
    url: "/SystemManagement/GetAdmin_RoleFirst?RoleCode=" + RoleCode,
    method: "post",
  });
}

// 修改角色
export function UpdateAdmin_Role(model) {
  return request({
    url: "/SystemManagement/UpdateAdmin_Role",
    method: "post",
    data: model,
  });
}

// 删除用户
export function DeleteAdmin_Role(RoleCode) {
  return request({
    url: "/SystemManagement/DeleteAdmin_Role?RoleCode=" + RoleCode,
    method: "post",
  });
}

// 获取按钮列表
export function GetMenuManagement(MenuName, PageIndex, PageSize) {
  return request({
    url:
      "/SystemManagement/GetMenuManagement?MenuName=" +
      MenuName +
      "&PageIndex=" +
      PageIndex +
      "&PageSize=" +
      PageSize,
    method: "post",
  });
}

// 添加按钮
export function AddMenuManagement(model) {
  return request({
    url: "/SystemManagement/AddMenuManagement",
    method: "post",
    data: model,
  });
}

// 修改按钮
export function UpdateMenuManagement(model) {
  return request({
    url: "/SystemManagement/UpdateMenuManagement",
    method: "post",
    data: model,
  });
}

// 获取按钮(单个)
export function GetMenuManagementFirst(Menucode) {
  return request({
    url: "/SystemManagement/GetMenuManagementFirst?Menucode=" + Menucode,
    method: "post",
  });
}

// 删除用户
export function DeleteMenuManagement(Menucode) {
  return request({
    url: "/SystemManagement/DeleteMenuManagement?Menucode=" + Menucode,
    method: "post",
  });
}

// 获取团队列表
export function GetTeamManagement(TeamName, PageIndex, PageSize) {
  return request({
    url:
      "/SystemManagement/GetTeamManagement?TeamName=" +
      TeamName +
      "&PageIndex=" +
      PageIndex +
      "&PageSize=" +
      PageSize,
    method: "post",
  });
}

// 添加团队
export function AddTeamManagement(model) {
  return request({
    url: "/SystemManagement/AddTeamManagement",
    method: "post",
    data: model,
  });
}

// 修改团队
export function UpdateTeamManagement(model) {
  return request({
    url: "/SystemManagement/UpdateTeamManagement",
    method: "post",
    data: model,
  });
}

// 获取团队(单个)
export function GetTeamManagementFirst(Teamcode) {
  return request({
    url: "/SystemManagement/GetTeamManagementFirst?Teamcode=" + Teamcode,
    method: "post",
  });
}

// 删除团队
export function DeleteTeamManagement(Teamcode) {
  return request({
    url: "/SystemManagement/DeleteTeamManagement?Teamcode=" + Teamcode,
    method: "post",
  });
}

// 获取部门列表
export function GetDepartment(DepartmentName, PageIndex, PageSize) {
  return request({
    url:
      "/SystemManagement/GetDepartment?DepartmentName=" +
      DepartmentName +
      "&PageIndex=" +
      PageIndex +
      "&PageSize=" +
      PageSize,
    method: "post",
  });
}

// 添加部门
export function AddDepartment(model) {
  return request({
    url: "/SystemManagement/AddDepartment",
    method: "post",
    data: model,
  });
}

// 修改部门
export function UpdateDepartment(model) {
  return request({
    url: "/SystemManagement/UpdateDepartment",
    method: "post",
    data: model,
  });
}

// 获取部门(单个)
export function GetDepartmentFirst(DepartmentCode) {
  return request({
    url:
      "/SystemManagement/GetDepartmentFirst?DepartmentCode=" + DepartmentCode,
    method: "post",
  });
}

// 删除部门
export function DeleteDepartment(DepartmentCode) {
  return request({
    url: "/SystemManagement/DeleteDepartment?DepartmentCode=" + DepartmentCode,
    method: "post",
  });
}

// 获取合同类型列表
export function GetDicCategory(Name, PageIndex, PageSize) {
  return request({
    url:
      "/SystemManagement/GetDicCategorySys?Name=" +
      Name +
      "&PageIndex=" +
      PageIndex +
      "&PageSize=" +
      PageSize,
    method: "post",
  });
}

// 添加合同类型
export function AddDicCategory(model) {
  return request({
    url: "/SystemManagement/AddDicCategory",
    method: "post",
    data: model,
  });
}

// 修改合同类型
export function UpdateDicCategory(model) {
  return request({
    url: "/SystemManagement/UpdateDicCategory",
    method: "post",
    data: model,
  });
}

// 获取合同类型(单个)
export function GetDicCategoryFirst(Code) {
  return request({
    url: "/SystemManagement/GetDicCategoryFirst?Code=" + Code,
    method: "post",
  });
}

// 删除合同类型
export function DeleteDicCategory(Code) {
  return request({
    url: "/SystemManagement/DeleteDicCategory?Code=" + Code,
    method: "post",
  });
}

// 获取系统日志列表
export function GetSystemLog(
  PermissionCode,
  MenuDescription,
  Description,
  PageIndex,
  PageSize
) {
  return request({
    url:
      "/SystemManagement/GetSystemLogSys?PermissionCode=" +
      PermissionCode +
      "&MenuDescription=" +
      MenuDescription +
      "&Description=" +
      Description +
      "&PageIndex=" +
      PageIndex +
      "&PageSize=" +
      PageSize,
    method: "post",
  });
}

// 获取合同名称列表
export function GetContractNameconfig(ContractName, PageIndex, PageSize) {
  return request({
    url:
      "/SystemManagement/GetContractNameconfig?ContractName=" +
      ContractName +
      "&PageIndex=" +
      PageIndex +
      "&PageSize=" +
      PageSize,
    method: "post",
  });
}

// 添加合同名称
export function AddContractNameconfig(model) {
  return request({
    url: "/SystemManagement/AddContractNameconfig",
    method: "post",
    data: model,
  });
}

// 修改合同名称
export function UpdateContractNameconfig(model) {
  return request({
    url: "/SystemManagement/UpdateContractNameconfig",
    method: "post",
    data: model,
  });
}

// 获取合同名称(单个)
export function GetContractNameconfigFirst(ContractCode) {
  return request({
    url:
      "/SystemManagement/GetContractNameconfigFirst?ContractCode=" +
      ContractCode,
    method: "post",
  });
}

// 删除合同名称
export function DeleteContractNameconfig(ContractCode) {
  return request({
    url:
      "/SystemManagement/DeleteContractNameconfig?ContractCode=" + ContractCode,
    method: "post",
  });
}

// 获取合同类型列表
export function GetDicCategoryC(Name, PageIndex, PageSize) {
  return request({
    url:
      "/SystemManagement/GetDicCategoryC?Name=" +
      Name +
      "&PageIndex=" +
      PageIndex +
      "&PageSize=" +
      PageSize,
    method: "post",
  });
}

// 添加合同类型
export function AddDicCategoryC(model) {
  return request({
    url: "/SystemManagement/AddDicCategoryC",
    method: "post",
    data: model,
  });
}

// 修改合同类型
export function UpdateDicCategoryC(model) {
  return request({
    url: "/SystemManagement/UpdateDicCategoryC",
    method: "post",
    data: model,
  });
}

// 获取合同类型(单个)
export function GetDicCategoryFirstC(Code) {
  return request({
    url: "/SystemManagement/GetDicCategoryFirstC?Code=" + Code,
    method: "post",
  });
}

// 删除合同类型
export function DeleteDicCategoryC(Code) {
  return request({
    url: "/SystemManagement/DeleteDicCategoryC?Code=" + Code,
    method: "post",
  });
}

// 获取合同类型
export function GetDicCategoryByContractType() {
  return request({
    url: "/SystemManagement/GetDicCategoryByContractType",
    method: "post",
  });
}

// 获取绑定合同类型的编号
export function GetDicCategoryByUser_ID(User_ID) {
  return request({
    url: "/SystemManagement/GetDicCategoryByUser_ID?User_ID=" + User_ID,
    method: "post",
  });
}

// 绑定合同类型
export function BindContractType(model) {
  return request({
    url: "/SystemManagement/BindContractType",
    method: "post",
    data: model,
  });
}

// 获取用户信息
export function GetUserAllList(Flag) {
  return request({
    url: "/SystemManagement/GetUserAllList?Flag=" + Flag,
    method: "post",
  });
}

// 获取绑定用户信息的编号
export function GetBindUser(User_ID) {
  return request({
    url: "/SystemManagement/GetBindUser?User_ID=" + User_ID,
    method: "post",
  });
}
// 获取有导出权限用户的编号
export function GetExportUser() {
  return request({
    url: "/SystemManagement/GetExportUser",
    method: "post",
  });
}
// 绑定用户信息
export function BindUser(model) {
  return request({
    url: "/SystemManagement/BindUser",
    method: "post",
    data: model,
  });
}
// 绑定用户信息
export function BindUserExport(model) {
  return request({
    url: "/SystemManagement/BindUserExport",
    method: "post",
    data: model,
  });
}
// 上传文件
export function Uploads(param) {
  return request({
    url: "/SystemManagement/Uploads",
    method: "post",
    headers: { "Content-type": "multipart/form-data" },
    data: param,
  });
}
// 获取甲方公司数据格式化
export function GetCompanyNameAData() {
  return request({
    url: "/SystemManagement/GetCompanyNameAData",
    method: "post",
  });
}
// 根据甲方公司编号获取公司详情
export function GetCompanyNameAFirst(ComID) {
  return request({
    url: "/SystemManagement/GetCompanyNameAFirst?ComID=" + ComID,
    method: "post",
  });
}

export function DeleteAttachment(BillingCode, FileName) {
  return request({
    url:
      "/SystemManagement/DeleteAttachment?BillingCode=" +
      BillingCode +
      "&FileName=" +
      FileName,
    method: "post",
  });
}
export function DeleteInvoiceAttachment(AttachmentRelationCode, FileName) {
  return request({
    url:
      "/SystemManagement/DeleteInvoiceAttachment?AttachmentRelationCode=" +
      AttachmentRelationCode +
      "&FileName=" +
      FileName,
    method: "post",
  });
}
// 添加甲方公司
export function UpdateCompanyNameA(model) {
  return request({
    url: "/SystemManagement/UpdateCompanyNameA",
    method: "post",
    data: model,
  });
}

export function UpdateTicket(model) {
  return request({
    url: "/SystemManagement/UpdateTicket",
    method: "post",
    data: model,
  });
}
// 获取公司
export function GetCompanySystem(CompanyId, CompanyName, PageIndex, PageSize) {
  return request({
    url:
      "/SystemManagement/GetCompanyById?CompanyId=" +
      CompanyId +
      "&CompanyName=" +
      CompanyName +
      "&PageIndex=" +
      PageIndex +
      "&PageSize=" +
      PageSize,
    method: "post",
  });
}
// 获取公司(客户管理)
export function GetCompanySystemList(
  CompanyId,
  CompanyName,
  PageIndex,
  PageSize
) {
  return request({
    url:
      "/SystemManagement/GetCompanyList?CompanyId=" +
      CompanyId +
      "&CompanyName=" +
      CompanyName +
      "&PageIndex=" +
      PageIndex +
      "&PageSize=" +
      PageSize,
    method: "post",
  });
}
// 添加公司
export function AddCompany(model) {
  return request({
    url: "/SystemManagement/AddCompany",
    method: "post",
    data: model,
  });
}
// 修改公司
export function UpdateCompany(model) {
  return request({
    url: "/SystemManagement/UpdateCompany",
    method: "post",
    data: model,
  });
}
export function GetCompanyAddress() {
  return request({
    url: "/SystemManagement/GetCompanyAddress",
    method: "post",
  });
}

export function GetInvoiceAccount(InvoiceAccountName, PageIndex, PageSize) {
  return request({
    url:
      "/SystemManagement/GetInvoiceAccount?InvoiceAccountName=" +
      InvoiceAccountName +
      "&PageIndex=" +
      PageIndex +
      "&PageSize=" +
      PageSize,
    method: "post",
  });
}

export function AddInvoiceAccount(model) {
  return request({
    url: "/SystemManagement/AddInvoiceAccount",
    method: "post",
    data: model,
  });
}

export function GetInvoiceAccountFirst(InvoiceAccountCode) {
  return request({
    url:
      "/SystemManagement/GetInvoiceAccountFirst?InvoiceAccountCode=" +
      InvoiceAccountCode,
    method: "post",
  });
}

export function UpdateInvoiceAccount(model) {
  return request({
    url: "/SystemManagement/UpdateInvoiceAccount",
    method: "post",
    data: model,
  });
}

export function DeleteInvoiceAccount(InvoiceAccountCode) {
  return request({
    url:
      "/SystemManagement/DeleteInvoiceAccount?InvoiceAccountCode=" +
      InvoiceAccountCode,
    method: "post",
  });
}
// //获取供应商列表
// export function GetSupplier(Name, PageIndex, PageSize) {

//   return request({
//     url: '/SystemManagement/GetSupplier?Name=' + Name + '&PageIndex=' + PageIndex + '&PageSize=' + PageSize,
//     method: 'post',
//   });
// }

// //添加供应商
// export function AddSupplier(model) {
//   return request({
//     url: '/SystemManagement/AddSupplier',
//     method: 'post',
//     data: model
//   });
// }

// //修改供应商
// export function UpdateSupplier(model) {
//   return request({
//     url: '/SystemManagement/UpdateSupplier',
//     method: 'post',
//     data: model
//   });
// }

// //删除供应商
// export function DeleteSupplier(Id) {
//   return request({
//     url: '/SystemManagement/DeleteSupplier?Id=' + Id,
//     method: 'post',
//   });
// }

// 获取供应商列表
export function GetSupplierCmpanyB(SupplierCmpanyBName, PageIndex, PageSize) {
  return request({
    url:
      "/SystemManagement/GetSupplierCmpanyB?SupplierCmpanyBName=" +
      SupplierCmpanyBName +
      "&PageIndex=" +
      PageIndex +
      "&PageSize=" +
      PageSize,
    method: "post",
  });
}

// 添加供应商
export function AddSupplierCmpanyB(model) {
  return request({
    url: "/SystemManagement/AddSupplierCmpanyB",
    method: "post",
    data: model,
  });
}

// 修改供应商
export function UpdateSupplierCmpanyB(model) {
  return request({
    url: "/SystemManagement/UpdateSupplierCmpanyB",
    method: "post",
    data: model,
  });
}

// 删除供应商
export function DeleteSupplierCmpanyB(SupplierCmpanyBCode) {
  return request({
    url:
      "/SystemManagement/DeleteSupplierCmpanyB?SupplierCmpanyBCode=" +
      SupplierCmpanyBCode,
    method: "post",
  });
}

export function IfExistsExportUser() {
  return request({
    url: "/SystemManagement/IfExistsExportUser",
    method: "post",
  });
}

// 添加客户曾用名
export function AddCompanyRelation(ComID, CompanyrelationName) {
  return request({
    url:
      "/SystemManagement/AddCompanyRelation?ComID=" +
      ComID +
      "&CompanyrelationName=" +
      CompanyrelationName,
    method: "post",
  });
}
// 删除客户曾用名
export function DeleteCompanyRelation(CompanyrelationName, ComID) {
  return request({
    url:
      "/SystemManagement/DeleteCompanyRelation?CompanyrelationName=" +
      CompanyrelationName +
      "&ComID=" +
      ComID,
    method: "post",
  });
}
export function GetUserAllChildList(flag) {
  return request({
    url: "/SystemManagement/GetUserAllChildList?Flag=" + flag,
    method: "post",
  });
}
export function UserButttonSet(ButtonSize) {
  return request({
    url: "/SystemManagement/UserButttonSet?ButtonSize=" + ButtonSize,
    method: "post",
  });
}
export function CheckUserLoginStatus() {
  return request({
    url: "/SystemManagement/CheckUserLoginStatus",
    method: "post",
  });
}
export function UpdateUserLoginStatus() {
  return request({
    url: "/SystemManagement/UpdateUserLoginStatus",
    method: "post",
  });
}

export function GetSupplierCmpanyById(SupplierCmpanyBCode) {
  return request({
    url: "/SystemManagement/GetSupplierCmpanyById?SupplierCmpanyBCode=" + SupplierCmpanyBCode,
    method: "post",
  });
}
