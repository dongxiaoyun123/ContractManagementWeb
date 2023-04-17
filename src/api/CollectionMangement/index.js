import request from '@/utils/request'
// 获取回款数据列表
export function GetAdmin_Permission(Condition, States, PaymentDateBegin, PaymentDateEnd, CollectionTimeBegin, CollectionTimeEnd, SecondPartyName, PageIndex, PageSize) {
  States = States || 0;
  return request({
    url: '/CollectionMangement/GetAdmin_Permission?Condition=' + Condition + '&States=' + States +
      '&PaymentDateBegin=' + PaymentDateBegin + '&PaymentDateEnd=' + PaymentDateEnd + '&CollectionTimeBegin=' + CollectionTimeBegin + '&CollectionTimeEnd=' + CollectionTimeEnd + '&SecondPartyName=' + SecondPartyName + '&PageIndex=' + PageIndex + '&PageSize=' + PageSize,
    method: 'post',
  });
}
// 导出回款数据
export function GetAdmin_PermissionExport(Condition, States, PaymentDateBegin, PaymentDateEnd, CollectionTimeBegin, CollectionTimeEnd, SecondPartyName) {
  States = States || 0;
  return request({
    url: '/CollectionMangement/GetAdmin_PermissionExport?Condition=' + Condition + '&States=' + States +
      '&PaymentDateBegin=' + PaymentDateBegin + '&PaymentDateEnd=' + PaymentDateEnd + '&CollectionTimeBegin=' + CollectionTimeBegin + '&CollectionTimeEnd=' + CollectionTimeEnd + '&SecondPartyName=' + SecondPartyName + '&PageIndex=1' + '&PageSize=100000',
    method: 'post',
  });
}
// 修改回款数据
export function UpdateData(parameter) {
  return request({
    url: '/CollectionMangement/UpdateData',
    method: 'post',
    data: parameter
  });
}

// 修改回款数据
export function UpdateDataRemark(InsProductPayCode, Remark) {
  return request({
    url: '/CollectionMangement/UpdateDataRemark?InsProductPayCode=' + InsProductPayCode + '&Remark=' + Remark,
    method: 'post',
  });
}


// 根据回款公司名称获取账单
export function GetCollectionOrderNyName(EnterPriseName) {
  return request({
    url: '/CollectionMangement/GetCollectionOrderNyName?EnterPriseName=' + EnterPriseName,
    method: 'post',
  });
}

// 获取所有客服数据
export function GetCustomerServiceManagementList(PageIndex, PageSize) {
  return request({
    url: '/CollectionMangement/GetCustomerServiceManagementList?PageIndex=' + PageIndex + '&PageSize=' + PageSize,
    method: 'post',
  });
}

// 修改客服数据状态
export function UpdateState(UserId, Flag) {
  return request({
    url: '/CollectionMangement/UpdateState?UserId=' + UserId + '&Flag=' + Flag,
    method: 'post',
  });
}

// 获取合同数据列表
export function GetContractData(ConMonth, ConState, ContractCode, SecondPartyName, ComName, AuditStatus, ContractType, BeginTime, EndTime, BeginSignTime, EndSignTime, CreateUserId, BeginExamineTime, EndExamineTime, ConnectCompany, ArchivedType, pagenum, pagesize) {
  ConState = ConState || "";
  BeginTime = BeginTime || "";
  EndTime = EndTime || "";
  BeginSignTime = BeginSignTime || "";
  EndSignTime = EndSignTime || "";
  BeginExamineTime = BeginExamineTime || "";
  EndExamineTime = EndExamineTime || "";
  return request({
    url: '/CollectionMangement/GetContractData?ConMonth=' + ConMonth + '&ConState=' + ConState + '&ContractCode=' + ContractCode + '&SecondPartyName=' + SecondPartyName + '&ComName=' + ComName + '&AuditStatus=' + AuditStatus +
      '&ContractType=' + ContractType + '&BeginTime=' + BeginTime + '&EndTime=' + EndTime + '&BeginSignTime=' + BeginSignTime + '&EndSignTime=' + EndSignTime + '&CreateUserId=' + CreateUserId +
      '&BeginExamineTime=' + BeginExamineTime + '&EndExamineTime=' + EndExamineTime + '&ConnectCompany=' + ConnectCompany + '&ArchivedType=' + ArchivedType + '&pageIndex=' + pagenum + '&pageSize=' + pagesize + '&Id=',
    method: 'post',
  });
}

// 合同数据列表导出
export function GetContractDataExport(ConMonth, ConState, ContractCode, SecondPartyName, ComName, AuditStatus, ContractType, BeginTime, EndTime, BeginSignTime, EndSignTime, CreateUserId, BeginExamineTime, EndExamineTime, ConnectCompany, ArchivedType, pagenum, pagesize) {
  ConState = ConState || "";
  BeginTime = BeginTime || "";
  EndTime = EndTime || "";
  BeginSignTime = BeginSignTime || "";
  EndSignTime = EndSignTime || "";
  return request({
    url: '/CollectionMangement/GetContractDataExport?ConMonth=' + ConMonth + '&ConState=' + ConState + '&ContractCode=' + ContractCode + '&SecondPartyName=' + SecondPartyName + '&ComName=' + ComName + '&AuditStatus=' + AuditStatus +
      '&ContractType=' + ContractType + '&BeginTime=' + BeginTime + '&EndTime=' + EndTime + '&BeginSignTime=' + BeginSignTime + '&EndSignTime=' + EndSignTime + '&CreateUserId=' + CreateUserId +
      '&BeginExamineTime=' + BeginExamineTime + '&EndExamineTime=' + EndExamineTime + '&ConnectCompany=' + ConnectCompany + '&ArchivedType=' + ArchivedType + '&pageIndex=' + pagenum + '&pageSize=' + pagesize + '&Id=',
    method: 'post',
  });
}
// 获取合同类型
export function GetContractType() {
  return request({
    url: '/CollectionMangement/GetContractType',
    method: 'post',
  });
}

// 修改回款数据
export function UpdateContractCode(Id, ContractCode) {
  return request({
    url: '/CollectionMangement/UpdateContractCode?Id=' + Id + '&ContractCode=' + ContractCode,
    method: 'post',
  });
}

export function GetBindingUserList(UserName, pagenum, pagesize) {
  return request({
    url: '/CollectionMangement/GetBindingUserList?UserName=' + UserName + '&pageIndex=' + pagenum + '&pageSize=' + pagesize,
    method: 'post',
  });
}

export function UpdateStates(UserStr, Flag) {
  return request({
    url: '/CollectionMangement/UpdateStates?UserStr=' + UserStr + '&Flag=' + Flag,
    method: 'post',
  });
}

export function GetCompany() {
  return request({
    url: '/CollectionMangement/GetCompany',
    method: 'post',
  });
}

export function GetUserInfo() {
  return request({
    url: '/CollectionMangement/GetUserInfo',
    method: 'post',
  });
}

export function GetDicCategory(Module) {
  return request({
    url: '/CollectionMangement/GetDicCategory?Module=' + Module,
    method: 'post',
  });
}
export function AddContract(model) {
  return request({
    url: '/CollectionMangement/AddContract',
    method: 'post',
    data: model
  });
}

export function UpdateContract(model) {
  return request({
    url: '/CollectionMangement/UpdateContract',
    method: 'post',
    data: model
  });
}
export function UpdateContractData(ContractDetailCode, ConState) {
  return request({
    url: '/CollectionMangement/UpdateContractData?ContractDetailCode=' + ContractDetailCode + '&ConState=' + ConState,
    method: 'post',
  });
}

// 送审
export function SubmitForCensorship(ContractCode) {
  return request({
    url: '/CollectionMangement/SubmitForCensorship?ContractCode=' + ContractCode,
    method: 'post',
  });
}

// 审核
export function SaveAuditStatus(ContractCode, AuditStatus) {
  return request({
    url: '/CollectionMangement/SaveAuditStatus?ContractCode=' + ContractCode + '&AuditStatus=' + AuditStatus,
    method: 'post',
  });
}
export function DeleteContractDetail(Id, FileName) {
  return request({
    url: '/CollectionMangement/DeleteContractDetail?Id=' + Id + '&FileName=' + FileName,
    method: 'post',
  });
}
export function GetAttachmentFirst(Type, Id) {
  return request({
    url: '/CollectionMangement/GetAttachmentFirst?Type=' + Type + '&Id=' + Id,
    method: 'post',
  });
}

// 获取发票列表
export function GetInvoiceDataMethod(CompanyId, InvoiceType, IvState, SYear, SMonth, ApplyPerson, IssuingPerson, pagenum, pagesize) {
  CompanyId = CompanyId || "";
  InvoiceType = InvoiceType || "";
  IvState = IvState || "";
  SYear = SYear || "";
  SMonth = SMonth || "";
  ApplyPerson = ApplyPerson || "";
  IssuingPerson = IssuingPerson || "";
  return request({
    url: '/CollectionMangement/GetInvoiceData?CompanyId=' + CompanyId + '&InvoiceType=' + InvoiceType + '&IvState=' + IvState + '&SYear=' + SYear + '&SMonth=' + SMonth +
      '&ApplyPerson=' + ApplyPerson + '&IssuingPerson=' + IssuingPerson + '&pageIndex=' + pagenum + '&pageSize=' + pagesize + '&Id=',
    method: 'post',
  });
}

export function GetPersonInfo() {
  return request({
    url: '/CollectionMangement/GetPersonInfo',
    method: 'post',
  });
}

export function UpdateInvoiceInfo(model) {
  return request({
    url: '/CollectionMangement/UpdateInvoiceInfo',
    method: 'post',
    data: model
  });
}

export function DeleteContractInfo(Id) {
  return request({
    url: '/CollectionMangement/DeleteContractInfo?Id=' + Id,
    method: 'post',
  });
}
export function GetCompanyABy_Contract(ContractId, type) {
  return request({
    url: '/CollectionMangement/GetCompanyABy_Contract?ContractId=' + ContractId + '&Type=' + type,
    method: 'post',
  });
}

export function BindCompanyABy_Contract(model) {
  return request({
    url: '/CollectionMangement/BindCompanyABy_Contract',
    method: 'post',
    data: model
  });
}

export function BindSale(ContractId, SaleId, Percentage) {
  return request({
    url: '/CollectionMangement/BindSale?ContractId=' + ContractId + '&RelationCode=' + SaleId + '&Percentage=' + Percentage,
    method: 'post',
  });
}

export function GetSaleData(ContractId) {
  return request({
    url: '/CollectionMangement/GetSaleData?ContractId=' + ContractId,
    method: 'post',
  });
}
export function deleteSaleData(ContractRelationCode) {
  return request({
    url: '/CollectionMangement/deleteSaleData?ContractRelationCode=' + ContractRelationCode,
    method: 'post',
  });
}

// 获取订单数据列表
export function GetContractOrder(ContractCode, ContractName, CompanyName, InvoiceAccount, InvoiceType, Applicant, ApplicationTimeBegin, ApplicationTimeEnd, pagenum, pagesize) {
  return request({
    url: '/CollectionMangement/GetContractOrder?ContractCode=' + ContractCode + '&ContractName=' + ContractName + '&CompanyName=' + CompanyName + '&InvoiceAccount=' + InvoiceAccount +
      '&InvoiceType=' + InvoiceType + '&Applicant=' + Applicant + '&ApplicationTimeBegin=' + ApplicationTimeBegin + '&ApplicationTimeEnd=' + ApplicationTimeEnd +
      '&PageIndex=' + pagenum + '&PageSize=' + pagesize + '&OrderCode=',
    method: 'post',
  });
}

export function GetContractNameList(where, id) {
  return request({
    url: '/CollectionMangement/GetContractNameList?where=' + where + "&Id=" + id,
    method: 'post'
  });
}

export function GetCompanyByContract(Id) {
  return request({
    url: '/CollectionMangement/GetCompanyByContract?Id=' + Id,
    method: 'post',
  });
}

export function AddContractOrder(model) {
  return request({
    url: '/CollectionMangement/AddContractOrder',
    method: 'post',
    data: model
  });
}
export function UpdateContractOrder(model) {
  return request({
    url: '/CollectionMangement/UpdateContractOrder',
    method: 'post',
    data: model
  });
}
export function DeleteContractOrder(OrderCode) {
  return request({
    url: '/CollectionMangement/DeleteContractOrder?OrderCode=' + OrderCode,
    method: 'post',
  });
}

export function GetCustomAmountByOrder(OrderCode) {
  return request({
    url: '/CollectionMangement/GetCustomAmountByOrder?OrderCode=' + OrderCode,
    method: 'post',
  });
}

// 获取供应商列表
export function GetSupplierData(ContractCode, ContractName, ComName, ContractType, BeginTime, EndTime, BeginSignTime, EndSignTime, CreateUserId, AuditStatus, PageIndex, PageSize) {
  BeginTime = !BeginTime ? "" : BeginTime;
  EndTime = !EndTime ? "" : EndTime;
  return request({
    url: '/CollectionMangement/GetSupplierData?ContractCode=' + ContractCode + '&ContractName=' + ContractName + '&ComName=' + ComName +
      '&ContractType=' + ContractType + '&BeginTime=' + BeginTime + '&EndTime=' + EndTime + '&BeginSignTime=' + BeginSignTime + '&EndSignTime=' + EndSignTime +
      '&CreateUserId=' + CreateUserId + '&AuditStatus=' + AuditStatus + '&PageIndex=' + PageIndex + '&PageSize=' + PageSize,
    method: 'post',
  });
}
// 导出供应商
export function GetSupplierDataExport(ContractCode, ContractName, ComName, ContractType, BeginSignTime, EndSignTime, CreateUserId, AuditStatus, BeginTime, EndTime) {
  BeginTime = !BeginTime ? "" : BeginTime;
  EndTime = !EndTime ? "" : EndTime;
  return request({
    url: '/CollectionMangement/GetSupplierDataExport?ContractCode=' + ContractCode + '&ContractName=' + ContractName + '&ComName=' + ComName +
      '&ContractType=' + ContractType + '&BeginTime=' + BeginTime + '&EndTime=' + EndTime + '&BeginSignTime=' + BeginSignTime + '&EndSignTime=' + EndSignTime +
      '&CreateUserId=' + CreateUserId + '&AuditStatus=' + AuditStatus + '&PageIndex=1' + '&PageSize=100000',
    method: 'post',
  });
}
// 添加供应商
export function AddSupplier(model) {
  return request({
    url: '/CollectionMangement/AddSupplier',
    method: 'post',
    data: model
  });
}

// 修改供应商
export function UpdateSupplier(model) {
  return request({
    url: '/CollectionMangement/UpdateSupplier',
    method: 'post',
    data: model
  });
}

// 账单送审
export function OrderSubmitForCensorship(OrderCode) {
  return request({
    url: '/CollectionMangement/OrderSubmitForCensorship?OrderCode=' + OrderCode,
    method: 'post',
  });
}
// /账单审核
export function OrderSaveAuditStatus(OrderCodeStr, InvoiceState) {
  return request({
    url: '/CollectionMangement/OrderSaveAuditStatus?OrderCode=' + OrderCodeStr + '&InvoiceState=' + InvoiceState,
    method: 'post',
  });
}
export function GetColumnByUser(ColumnTitle) {
  return request({
    url: '/CollectionMangement/GetColumnByUser?ColumnTitle=' + ColumnTitle,
    method: 'post',
  });
}

export function ColumnTitleSubmit(model) {
  return request({
    url: '/CollectionMangement/ColumnTitleSubmit',
    method: 'post',
    data: model
  });
}

// 送审
export function SubmitForCensorshipSupplier(Id) {
  return request({
    url: '/CollectionMangement/SubmitForCensorshipSupplier?Id=' + Id,
    method: 'post',
  });
}

// 审核
export function SaveAuditStatusSupplier(Id, AuditStatus) {
  return request({
    url: '/CollectionMangement/SaveAuditStatusSupplier?Id=' + Id + '&AuditStatus=' + AuditStatus,
    method: 'post',
  });
}

export function DeleteCollectionData(InsProductPayCode) {
  return request({
    url: '/CollectionMangement/DeleteCollectionData?InsProductPayCode=' + InsProductPayCode,
    method: 'post',
  });
}
export function PlaceFileMethod(ContractDetailCode) {
  return request({
    url: '/CollectionMangement/PlaceFileMethod?ContractDetailCode=' + ContractDetailCode,
    method: 'post',
  });
}
export function GetCollectionOrderNyId(InsProductPayCode) {
  return request({
    url: '/CollectionMangement/GetCollectionOrderNyId?InsProductPayCode=' + InsProductPayCode,
    method: 'post',
  });
}

export function UpdateDataCancel(InsProductPayCode) {
  return request({
    url: '/CollectionMangement/UpdateDataCancel?InsProductPayCode=' + InsProductPayCode,
    method: 'post',
  });
}