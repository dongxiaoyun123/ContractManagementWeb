import request from "@/utils/request";
// 获取回款数据列表
export function GetAdmin_Permission(parameter) {
  return request({
    url: "/CollectionMangement/GetAdmin_Permission",
    method: "post",
    data: parameter,
  });
}
// 导出回款数据
export function GetAdmin_PermissionExport(parameter) {
  return request({
    url: "/CollectionMangement/GetAdmin_PermissionExport",
    method: "post",
    data: parameter,
  });
}
// 修改回款数据（客服）
export function UpdateData(parameter) {
  return request({
    url: "/CollectionMangement/UpdateData",
    method: "post",
    data: parameter,
  });
}
// 修改回款数据(其它角色)
export function UpdateOtherData(parameter) {
  return request({
    url: "/CollectionMangement/UpdateOtherData",
    method: "post",
    data: parameter,
  });
}

// 修改回款数据
export function UpdateDataRemark(InsProductPayCode, Remark) {
  return request({
    url:
      "/CollectionMangement/UpdateDataRemark?InsProductPayCode=" +
      InsProductPayCode +
      "&Remark=" +
      Remark,
    method: "post",
  });
}

// 根据回款公司名称获取账单(客服)
export function GetCollectionOrderNyName(
  EnterPriseName,
  CustomerInsProductPayCode
) {
  return request({
    url: "/CollectionMangement/GetCollectionOrderNyName",
    method: "post",
    params: { EnterPriseName, CustomerInsProductPayCode },
  });
}

// 根据回款公司名称获取账单（其他人员）
export function GetOtherOrder(EnterPriseName) {
  return request({
    url: "/CollectionMangement/GetOtherOrder?EnterPriseName=" + EnterPriseName,
    method: "post",
  });
}
// 获取所有客服数据
export function GetCustomerServiceManagementList(PageIndex, PageSize) {
  return request({
    url:
      "/CollectionMangement/GetCustomerServiceManagementList?PageIndex=" +
      PageIndex +
      "&PageSize=" +
      PageSize,
    method: "post",
  });
}

// 修改客服数据状态
export function UpdateState(UserId, Flag) {
  return request({
    url: "/CollectionMangement/UpdateState?UserId=" + UserId + "&Flag=" + Flag,
    method: "post",
  });
}

// 获取合同数据列表
export function GetContractData(model) {
  return request({
    url: "/CollectionMangement/GetContractData",
    method: "post",
    data: model,
  });
}

// 合同数据列表导出
export function GetContractDataExport(model) {
  return request({
    url: "/CollectionMangement/GetContractDataExport",
    method: "post",
    data: model,
  });
}
// 获取合同类型
export function GetContractType() {
  return request({
    url: "/CollectionMangement/GetContractType",
    method: "post",
  });
}

// 修改回款数据
export function UpdateContractCode(Id, ContractCode) {
  return request({
    url:
      "/CollectionMangement/UpdateContractCode?Id=" +
      Id +
      "&ContractCode=" +
      ContractCode,
    method: "post",
  });
}

export function GetBindingUserList(UserName, pagenum, pagesize) {
  return request({
    url:
      "/CollectionMangement/GetBindingUserList?UserName=" +
      UserName +
      "&pageIndex=" +
      pagenum +
      "&pageSize=" +
      pagesize,
    method: "post",
  });
}

export function UpdateStates(UserStr, Flag) {
  return request({
    url:
      "/CollectionMangement/UpdateStates?UserStr=" + UserStr + "&Flag=" + Flag,
    method: "post",
  });
}

export function GetCompany(Name) {
  Name = Name || "";
  return request({
    url: "/CollectionMangement/GetCompany?Name=" + Name,
    method: "post",
  });
}

export function GetUserInfo() {
  return request({
    url: "/CollectionMangement/GetUserInfo",
    method: "post",
  });
}

export function GetDicCategory(Module) {
  return request({
    url: "/CollectionMangement/GetDicCategory?Module=" + Module,
    method: "post",
  });
}
export function AddContract(model) {
  return request({
    url: "/CollectionMangement/AddContract",
    method: "post",
    data: model,
  });
}

export function UpdateContract(model) {
  return request({
    url: "/CollectionMangement/UpdateContract",
    method: "post",
    data: model,
  });
}
export function UpdateContractData(ContractDetailCode, ConState) {
  return request({
    url:
      "/CollectionMangement/UpdateContractData?ContractDetailCode=" +
      ContractDetailCode +
      "&ConState=" +
      ConState,
    method: "post",
  });
}

// 送审
export function SubmitForCensorship(ContractCode) {
  return request({
    url:
      "/CollectionMangement/SubmitForCensorship?ContractCode=" + ContractCode,
    method: "post",
  });
}

// 审核
export function SaveAuditStatus(ContractCode, AuditStatus) {
  return request({
    url:
      "/CollectionMangement/SaveAuditStatus?ContractCode=" +
      ContractCode +
      "&AuditStatus=" +
      AuditStatus,
    method: "post",
  });
}
export function DeleteContractDetail(Id, FileName) {
  return request({
    url:
      "/CollectionMangement/DeleteContractDetail?Id=" +
      Id +
      "&FileName=" +
      FileName,
    method: "post",
  });
}
export function GetAttachmentFirst(Type, Id) {
  return request({
    url: "/CollectionMangement/GetAttachmentFirst?Type=" + Type + "&Id=" + Id,
    method: "post",
  });
}

// 获取发票列表
export function GetInvoiceDataMethod(model) {
  return request({
    url: "/CollectionMangement/GetInvoiceData",
    method: "post",
    data: model,
  });
}

export function GetPersonInfo() {
  return request({
    url: "/CollectionMangement/GetPersonInfo",
    method: "post",
  });
}

export function UpdateInvoiceInfo(model) {
  return request({
    url: "/CollectionMangement/UpdateInvoiceInfo",
    method: "post",
    data: model,
  });
}

export function DeleteContractInfo(Id) {
  return request({
    url: "/CollectionMangement/DeleteContractInfo?Id=" + Id,
    method: "post",
  });
}
export function GetCompanyABy_Contract(ContractId, type) {
  return request({
    url:
      "/CollectionMangement/GetCompanyABy_Contract?ContractId=" +
      ContractId +
      "&Type=" +
      type,
    method: "post",
  });
}

export function GetCompanyDataByCodes(ContractId) {
  return request({
    url: "/CollectionMangement/GetCompanyDataByCodes?ContractId=" + ContractId,
    method: "post",
  });
}
export function GetCompanyDataByCodesSupplier(Id) {
  return request({
    url: "/CollectionMangement/GetCompanyDataByCodesSupplier?Id=" + Id,
    method: "post",
  });
}

export function BindCompanyABy_Contract(model) {
  return request({
    url: "/CollectionMangement/BindCompanyABy_Contract",
    method: "post",
    data: model,
  });
}

export function BindSale(ContractId, SaleId, Percentage) {
  return request({
    url:
      "/CollectionMangement/BindSale?ContractId=" +
      ContractId +
      "&RelationCode=" +
      SaleId +
      "&Percentage=" +
      Percentage,
    method: "post",
  });
}

export function GetSaleData(ContractId) {
  return request({
    url: "/CollectionMangement/GetSaleData?ContractId=" + ContractId,
    method: "post",
  });
}
export function deleteSaleData(ContractRelationCode) {
  return request({
    url:
      "/CollectionMangement/deleteSaleData?ContractRelationCode=" +
      ContractRelationCode,
    method: "post",
  });
}

// 获取订单数据列表
export function GetContractOrder(model) {
  return request({
    url: "/CollectionMangement/GetContractOrder",
    method: "post",
    data: model,
  });
}

export function GetContractNameList(where, id) {
  return request({
    url:
      "/CollectionMangement/GetContractNameListColl?where=" +
      where +
      "&Id=" +
      id,
    method: "post",
  });
}
export function GetSupplierListSelect(where, SupplierContractCode) {
  return request({
    url:
      "/CollectionMangement/GetSupplierListSelect?where=" +
      where +
      "&Id=" +
      SupplierContractCode,
    method: "post",
  });
}

export function GetCompanyByContract(Id) {
  return request({
    url: "/CollectionMangement/GetCompanyByContract?Id=" + Id,
    method: "post",
  });
}

export function AddContractOrder(model) {
  return request({
    url: "/CollectionMangement/AddContractOrder",
    method: "post",
    data: model,
  });
}
export function UpdateContractOrder(model) {
  return request({
    url: "/CollectionMangement/UpdateContractOrder",
    method: "post",
    data: model,
  });
}
export function DeleteContractOrder(OrderCode) {
  return request({
    url: "/CollectionMangement/DeleteContractOrder?OrderCode=" + OrderCode,
    method: "post",
  });
}

export function GetCustomAmountByOrder(OrderCode) {
  return request({
    url: "/CollectionMangement/GetCustomAmountByOrder?OrderCode=" + OrderCode,
    method: "post",
  });
}

// 获取供应商列表
export function GetSupplierData(model) {
  return request({
    url: "/CollectionMangement/GetSupplierData",
    method: "post",
    data: model,
  });
}
// 导出供应商
export function GetSupplierDataExport(model) {
  return request({
    url: "/CollectionMangement/GetSupplierDataExport",
    method: "post",
    data: model,
  });
}
// 添加供应商
export function AddSupplier(model) {
  return request({
    url: "/CollectionMangement/AddSupplier",
    method: "post",
    data: model,
  });
}

// 修改供应商
export function UpdateSupplier(model) {
  return request({
    url: "/CollectionMangement/UpdateSupplier",
    method: "post",
    data: model,
  });
}

// 账单送审
export function OrderSubmitForCensorship(OrderCode) {
  return request({
    url: "/CollectionMangement/OrderSubmitForCensorship?OrderCode=" + OrderCode,
    method: "post",
  });
}
// /账单审核
export function OrderSaveAuditStatus(OrderCodeStr, InvoiceState) {
  return request({
    url:
      "/CollectionMangement/OrderSaveAuditStatus?OrderCode=" +
      OrderCodeStr +
      "&InvoiceState=" +
      InvoiceState,
    method: "post",
  });
}
export function GetColumnByUser(ColumnTitle) {
  return request({
    url: "/CollectionMangement/GetColumnByUser?ColumnTitle=" + ColumnTitle,
    method: "post",
  });
}

export function ColumnTitleSubmit(model) {
  return request({
    url: "/CollectionMangement/ColumnTitleSubmit",
    method: "post",
    data: model,
  });
}

// 送审
export function SubmitForCensorshipSupplier(Id) {
  return request({
    url: "/CollectionMangement/SubmitForCensorshipSupplier?Id=" + Id,
    method: "post",
  });
}

// 审核
export function SaveAuditStatusSupplier(Id, AuditStatus) {
  return request({
    url:
      "/CollectionMangement/SaveAuditStatusSupplier?Id=" +
      Id +
      "&AuditStatus=" +
      AuditStatus,
    method: "post",
  });
}

export function DeleteCollectionData(InsProductPayCode) {
  return request({
    url:
      "/CollectionMangement/DeleteCollectionData?InsProductPayCode=" +
      InsProductPayCode,
    method: "post",
  });
}
export function PlaceFileMethod(ContractDetailCode) {
  return request({
    url:
      "/CollectionMangement/PlaceFileMethod?ContractDetailCode=" +
      ContractDetailCode,
    method: "post",
  });
}
export function GetCollectionOrderNyId(InsProductPayCode) {
  return request({
    url:
      "/CollectionMangement/GetCollectionOrderNyId?InsProductPayCode=" +
      InsProductPayCode,
    method: "post",
  });
}
export function GetCollectionOrderNyIdOld(InsProductPayCode) {
  return request({
    url:
      "/CollectionMangement/GetCollectionOrderNyIdOld?InsProductPayCode=" +
      InsProductPayCode,
    method: "post",
  });
}

export function GetOtherOrderById(InsProductPayCode) {
  return request({
    url:
      "/CollectionMangement/GetOtherOrderById?InsProductPayCode=" +
      InsProductPayCode,
    method: "post",
  });
}
export function UpdateDataCancelColl(InsProductPayCode) {
  return request({
    url:
      "/CollectionMangement/UpdateDataCancelColl?InsProductPayCode=" +
      InsProductPayCode,
    method: "post",
  });
}
export function UpdateDataCancelCollOld(InsProductPayCode) {
  return request({
    url:
      "/CollectionMangement/UpdateDataCancelCollOld?InsProductPayCode=" +
      InsProductPayCode,
    method: "post",
  });
}
export function IfCollectionCustomer(InsProductPayCode) {
  return request({
    url:
      "/CollectionMangement/IfCollectionCustomer?InsProductPayCode=" +
      InsProductPayCode,
    method: "post",
  });
}

export function UpdateDataOtherCancel(InsProductPayCode) {
  return request({
    url:
      "/CollectionMangement/UpdateDataOtherCancel?InsProductPayCode=" +
      InsProductPayCode,
    method: "post",
  });
}
export function PlaceFileMethodSupplier(SupplierId) {
  return request({
    url:
      "/CollectionMangement/PlaceFileMethodSupplier?SupplierId=" + SupplierId,
    method: "post",
  });
}

export function InvoicingData(model) {
  return request({
    url: "/CollectionMangement/InvoicingData",
    method: "post",
    data: model,
  });
}

export function ConfirmInvoicing(IdStr) {
  return request({
    url: "/CollectionMangement/ConfirmInvoicing?IdStr=" + IdStr,
    method: "post",
  });
}
export function RevokeInvoicing(IdStr) {
  return request({
    url: "/CollectionMangement/RevokeInvoicing?IdStr=" + IdStr,
    method: "post",
  });
}
export function UpdateYearBatch(Id, YearBatch) {
  return request({
    url:
      "/CollectionMangement/UpdateYearBatch?Id=" +
      Id +
      "&YearBatch=" +
      YearBatch,
    method: "post",
  });
}
export function CustomerServiceExists(CompanyId, SecondPartyName) {
  return request({
    url:
      "/CollectionMangement/CustomerServiceExists?CompanyId=" +
      CompanyId +
      "&SecondPartyName=" +
      SecondPartyName,
    method: "post",
  });
}
export function DoAddContract(Id, CompanyId, SecondPartyName) {
  return request({
    url:
      "/CollectionMangement/DoAddContract?Id=" +
      Id +
      "&CompanyId=" +
      CompanyId +
      "&SecondPartyName=" +
      SecondPartyName,
    method: "post",
  });
}

export function GetEnterprisePayData() {
  return request({
    url: "/CollectionMangement/GetEnterprisePayData",
    method: "post",
  });
}
export function DeleteContractOrderMoneyFlag(OrderCode) {
  return request({
    url:
      "/CollectionMangement/DeleteContractOrderMoneyFlag?OrderCode=" +
      OrderCode,
    method: "post",
  });
}
export function GetSupplierOtherOrder(EnterPriseName) {
  return request({
    url:
      "/CollectionMangement/GetSupplierOtherOrder?EnterPriseName=" +
      EnterPriseName,
    method: "post",
  });
}
export function GetSupplierOtherOrderById(InsProductPayCode) {
  return request({
    url:
      "/CollectionMangement/GetSupplierOtherOrderById?InsProductPayCode=" +
      InsProductPayCode,
    method: "post",
  });
}

export function RefundData(
  RefundType,
  RefundId,
  SelectTotalMoney,
  SelectBalanceMoney,
  RefundAmount
) {
  return request({
    url:
      "/CollectionMangement/RefundData?RefundType=" +
      RefundType +
      "&RefundId=" +
      RefundId +
      "&SelectTotalMoney=" +
      SelectTotalMoney +
      "&SelectBalanceMoney=" +
      SelectBalanceMoney +
      "&RefundAmount=" +
      RefundAmount,
    method: "post",
  });
}
// 修改来源说明
export function SaveDataSourceEdit(InsProductPayCode, DataSource) {
  return request({
    url: "/CollectionMangement/SaveDataSourceEdit",
    method: "post",
    params: { InsProductPayCode, DataSource },
  });
}
export function BatchUpdateCommit(model) {
  return request({
    url: "/CollectionMangement/BatchUpdate",
    method: "post",
    data: model,
  });
}
export function GetCustomerCollectionData(model) {
  return request({
    url: "/CollectionMangement/GetCustomerCollectionData",
    method: "post",
    data: model,
  });
}
export function ExportCustomerCollectionData(model) {
  return request({
    url: "/CollectionMangement/ExportCustomerCollectionData",
    method: "post",
    data: model,
  });
}
