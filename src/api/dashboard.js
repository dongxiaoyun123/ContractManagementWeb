import request from '@/utils/request'

export function GetDataBriefs(parameter) {
  return request({
    url: '/HrDashBoard/GetDataBriefs',
    method: 'post',
    data: parameter
  })
}

export function GetStaffCount(parameter) {
  return request({
    url: '/HrDashBoard/GetStaffCount',
    method: 'post',
    data: parameter
  })
}

export function GetMonthStaffStatistics(parameter) {
  return request({
    url: '/HrDashBoard/GetMonthStaffStatistics',
    method: 'post',
    data: parameter
  })
}
export function GetProgramInfoAll(parameter) {
  return request({
    url: '/HrDashBoard/GetProgramInfoAll',
    method: 'post',
    data: parameter
  })
}

export function GetAmountDue(parameter) {
  return request({
    url: '/HrDashBoard/GetAmountDue',
    method: 'post',
    data: parameter
  })
}
export function GetChartData(parameter) {
  return request({
    url: '/HrDashBoard/GetChartData',
    method: 'post',
    data: parameter
  })
}

