import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
// import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

import VueParticles from 'vue-particles'
Vue.use(VueParticles)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'small', // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

import format from 'vue-text-format';// 金额格式化插件
Vue.use(format);

import getBankcardinfo from 'bankcardinfo'// 根据输入账号找到银行名称
Vue.prototype.$getBankcardinfo = getBankcardinfo

import moment from "moment"
Vue.prototype.$moment = moment;

import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'eRCv7o5j4Rmj4U2GsODMb71V2r4t4FIt'  //  百度地图ak
})

import { RecycleScroller } from 'vue-virtual-scroller';// 穿梭框提高效率
import ElVirtualTransfer from '../src/layout/components/transfer';// 穿梭框提高效率

import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';// 穿梭框样式
Vue.component('RecycleScroller', RecycleScroller);
Vue.use(ElVirtualTransfer);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
