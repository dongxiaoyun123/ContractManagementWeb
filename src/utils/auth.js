import Cookies from 'js-cookie'

const assessTokenKey = 'assessToken'
const refreshTokenKey = 'refreshToken'
export function getToken() {
  return Cookies.get(assessTokenKey)
}

export function setToken(token) {
  return Cookies.set(assessTokenKey, token)
}

export function removeToken() {
  return Cookies.remove(assessTokenKey)
}

export function getrefreshToken() {
  return Cookies.get(refreshTokenKey)
}

export function setrefreshToken(token) {
  return Cookies.set(refreshTokenKey, token)
}

export function removerefreshToken() {
  return Cookies.remove(refreshTokenKey)
}
