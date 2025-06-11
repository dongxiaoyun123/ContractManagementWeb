// import { login, logout, getInfo } from '@/api/user'
import { adminLogin, GetUserInfo, Refresh } from "@/api/login";
import {
  getToken,
  getrefreshToken,
  setToken,
  setrefreshToken,
  removeToken,
} from "@/utils/auth";
import router, { resetRouter } from "@/router";
// import Cookies from "js-cookie";
// import md5 from "js-md5";
const state = {
  token: getToken(),
  refreshtoken: getrefreshToken(),
  name: "",
  avatar: "",
  introduction: "",
  roles: [],
  realname: "",
  ParentCode: "",
  MenuPermissions: null,
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_realname: (state, realname) => {
    state.realname = realname;
  },
  SET_User_ID: (state, User_ID) => {
    state.User_ID = User_ID;
  },
  SET_ParentCode: (state, ParentCode) => {
    state.ParentCode = ParentCode;
  },
  SET_MenuPermissions: (state, MenuPermissions) => {
    state.MenuPermissions = MenuPermissions;
  },
};

const actions = {
  // 用户登录
  login({ commit }, obj) {
    return new Promise((resolve, reject) => {
      adminLogin(obj)
        .then((response) => {
          const { result } = response;
          if (response.success) {
            // 登录存储token信息
            commit("SET_TOKEN", result.assessToken);
            commit("SET_REFRESHTOKEN", result.refreshToken);
            setToken(result.assessToken);
            setrefreshToken(result.refreshToken);
            // sessionStorage.setItem("token", result.access_token);
            // // 角色编号，固定就好
            // sessionStorage.setItem("RoleCode", result.RoleCode);
            // sessionStorage.setItem("RoleName", result.RoleName);
            // // sessionStorage.setItem("loginName", result.loginName);
            // sessionStorage.setItem("userid", result.userid);
            // sessionStorage.setItem("User_RealName", result.User_RealName);
          }
          // 返回值
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // 获取登录信息（vuex数据要存储到这里，刷新页面不会调用登录方法，但是会调用下面这个方法）
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      GetUserInfo().then((response) => {
        if (response.result) {
          const {
            RoleCode,
            User_RealName,
            User_ID,
            RoleName,
          } = response.result;
          // const { roles } = result
          // const { roles, name, avatar, introduction } = result
          // roles must be a non-empty array
          // if (!roles || roles.length <= 0) {
          //   reject('getInfo: roles must be a non-null array!')
          // }

          // commit('SET_ParentCode', ParentCode)
          // //这个参数是userId不过现在还没用到，等用到再说
          commit("SET_User_ID", User_ID);
          commit("SET_realname", User_RealName);
          var roleArray = [];
          roleArray.push(RoleCode);
          commit("SET_ROLES", roleArray);
          // 先注释掉，等用到的时候再进行修改
          // commit('SET_NAME', "SET_NAME")
          // commit('SET_AVATAR', "SET_AVATAR")
          // commit('SET_INTRODUCTION', "SET_INTRODUCTION")
          // 重新存储一下token，防止刷新页面token丢失
          // commit("SET_TOKEN", UserAccess_token);
          // commit('SET_MenuPermissions', MenuPermissions)
          if (roleArray.length != 0) {
            resolve(roleArray);
          }
          sessionStorage.setItem("RoleName", RoleName);
          // sessionStorage.setItem("token", UserAccess_token);
          sessionStorage.setItem("RoleCode", RoleCode);
          // sessionStorage.setItem("loginName", result.loginName);
          sessionStorage.setItem("userid", User_ID);
          sessionStorage.setItem("User_RealName", User_RealName);
          // Cookies.set("size", ButtonSize || "mini");
          // this.$store.dispatch('app/setSize', size)
        } else {
          reject("");
        }
      });
    });
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resetRouter();

      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch("tagsView/delAllViews", null, { root: true });

      resolve();
      // }).catch(error => {
      //   reject(error)
      // })
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resetRouter();
      resolve();
    });
  },

  refreshToken({ commit }) {
    return new Promise((resolve) => {
      Refresh(getToken()).then((response) => {
        if ((response.code == "200")) {
          commit("SET_TOKEN", response.data.newAccessToken);
          commit("SET_REFRESHTOKEN", response.data.refreshToken);
          setToken(response.data.newAccessToken);
          setrefreshToken(response.data.refreshToken);
        }
        resolve(response.data.newAccessToken);
      });
    });
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + "-token";

    commit("SET_TOKEN", token);
    setToken(token);
    const { roles } = await dispatch("getInfo");

    resetRouter();

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch("permission/generateRoutes", roles, {
      root: true,
    });
    // dynamically add accessible routes
    router.addRoutes(accessRoutes);

    // reset visited views and cached views
    dispatch("tagsView/delAllViews", null, { root: true });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
