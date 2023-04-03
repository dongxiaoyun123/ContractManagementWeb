import request from '@/utils/request'
import CBC from '../common/CBC'

// 账号登录
export function adminLogin(userModel) {
  const jsonStr = JSON.stringify(userModel)
  const strParam = CBC.encrypt(jsonStr)
  const obj = {}
  obj.login = strParam
  obj.device = 2; // pc
  return request({
    url: '/Login/adminLogin',
    method: 'post',
    data: obj
  });
}

export function SendPhoneMessage(Phone) {
  return request({
    url: '/Login/SendPhoneMessage?Phone=' + Phone,
    method: 'post',
  });
}

export function getUserPermissionsNew() {
  return request({
    url: '/Admin/getUserPermissionsNew',
    method: 'post',
  });
}
export function GetUserInfo() {
  return request({
    url: '/Admin/GetUserInfo',
    method: 'post',
  });
}

