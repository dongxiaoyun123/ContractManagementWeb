import CryptoJS from 'crypto-js'
export default {
  // 加密
  encrypt(word) {
    const key = CryptoJS.enc.Utf8.parse('Oeutmnghahdflgfe')
    const iv = CryptoJS.enc.Utf8.parse('Oeutmnghahdflgfe')
    const srcs = CryptoJS.enc.Utf8.parse(word)

    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.toString()
  },
  // 解密
  decrypt(word, keyStr, ivStr) {
    keyStr = keyStr || 'Oeutmnghahdflgfe'
    ivStr = ivStr || 'Oeutmnghahdflgfe'
    var key = CryptoJS.enc.Utf8.parse(keyStr)
    const iv = CryptoJS.enc.Utf8.parse(ivStr)

    var decrypt = CryptoJS.AES.decrypt(word, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    })
    return decrypt.toString(CryptoJS.enc.Utf8)
  }
}
