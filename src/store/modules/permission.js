import { constantRoutes } from "@/router";
import Layout from "@/layout";
// import { fetchUserMenuList } from '@/api/user'
import { getUserPermissionsNew } from "@/api/login";
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];

  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

const state = {
  routes: [],
  addRoutes: [],
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },
};

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise((resolve, reject) => {
      let accessedRoutes;
      getUserPermissionsNew()
        .then((response) => {
          const { result } = response;
          if (response.success) {
            accessedRoutes = filterAsyncRouter(result);
            commit("SET_ROUTES", accessedRoutes);
            resolve(accessedRoutes);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter((route) => {
    if (route.component) {
      // Layout组件特殊处理
      if (route.component === "Layout") {
        route.component = Layout;
      } else {
        route.component = loadView(route.component);
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children);
    }
    return true;
  });
}

// export const loadView = view => {
//
//   return () => import(`@/views/${view}`);
// };

export const loadView = (view) => {
  // 路由懒加载
  return (resolve) => require(["@/views/" + view], resolve);
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
