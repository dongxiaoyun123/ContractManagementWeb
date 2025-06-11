import axios from 'axios'
import {  Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 1200000 // 请求超时时间,两分钟（因为会添加同步功能）
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (getToken()) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      const getMyToken = getToken();  // 获取新 token，不依赖旧值
      config.headers["Authorization"] = "Bearer " + getMyToken;
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => responsi
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
   async response => {
    const res = response.data;

    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // }
    // if (res.resultMessage == "登陆超时" || res.resultMessage == "token不可为空") {
    //   store.dispatch('user/resetToken');
    // }
    if (res.code == "401") {
      // const newAccessToken = await store.dispatch("user/refreshToken");
      // response.config.headers.Authorization = `Bearer ${newAccessToken}`;
      // return service(response.config);
      const originalConfig = {
        ...response.config, // 拷贝原配置
        headers: {
          ...response.config.headers // 拷贝 headers
        }
      };
      const newAccessToken = await store.dispatch("user/refreshToken");
      originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;
      return service(originalConfig); // 用干净的 config 发请求
    }
    return res
    // 这里的所有抛出异常先关闭在各个页面抛出异常（因为要更新实体，所以在此注释）
    // if (!res.success) {
    //   Message({
    //     message: res.resultMessage || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    // }
    // else {
    //   return res
    // }
  },
  error => {
    // 超时机制，十秒自动抛出异常
    Message({
      message: "请求超时，请重新刷新页面",
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
