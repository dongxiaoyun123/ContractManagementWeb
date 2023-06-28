import request from '@/utils/request'

export function GetContractStatisticsCount(model) {
  return request({
    url: '/Dashboard/GetContractStatisticsCount',
    method: 'post',
    data: model
  });
}

export function GetContractEnterCount(model) {
  return request({
    url: '/Dashboard/GetContractEnterCount',
    method: 'post',
    data: model
  });
}

export function GetContractMoneyCount(model) {
  return request({
    url: '/Dashboard/GetContractMoneyCount',
    method: 'post',
    data: model
  });
}

export function GetContractStateCount(model) {
  return request({
    url: '/Dashboard/GetContractStateCount',
    method: 'post',
    data: model
  });
}

export function GetSystemLog(model) {
  return request({
    url: '/Dashboard/GetSystemLog',
    method: 'post',
    data: model
  });
}

export function AddMessageLog(model) {
  return request({
    url: '/CollectionMangement/AddMessageLog',
    method: 'post',
    data: model
  });
}
export function GetMessageLog() {
  return request({
    url: '/CollectionMangement/GetMessageLog',
    method: 'post',
  });
}
export function GetCollectionDatastatistics() {
  return request({
    url: '/Dashboard/GetCollectionDatastatistics',
    method: 'post',
  });
}
export function GetInvoiceListDatastatistics() {
  return request({
    url: '/Dashboard/GetInvoiceListDatastatistics',
    method: 'post',
  });
}
