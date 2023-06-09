import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  theme: variables.theme,
  themesuccess: variables.themesuccess,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  clientWidth: null
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    debugger
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
    state['themesuccess'] = "#6959CD";
  },
  // vuex更新当前屏幕分辨率
  SET_ScreenWidth: (state, data) => {
    state.clientWidth = data
  },
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  screenWidthSetting({ commit }, data) {
    commit('SET_ScreenWidth', data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

