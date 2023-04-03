<template>
  <div class="sideClass">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <!-- 根据logo是否显示动态修改滚动条的高度 -->
    <div :class="!showLogo ? 'scrollbar1' : 'scrollbar2'">
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg"
                 :text-color="variables.menuText" :unique-opened="false" :active-text-color="variables.menuActiveText"
                 :collapse-transition="false" mode="vertical" style="color: inherit;"
        >
          <sidebar-item v-for="route in permission_routes" :key="route.path" style="color: inherit;" :item="route"
                        :base-path="route.path"
          />
        </el-menu>
      </el-scrollbar>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style scoped>
.scrollbar1 {
  height: 100%;
}

.scrollbar2 {
  height: calc(100vh - 50px);
}

.sideClass {
  box-shadow: 1px 0 10px #F0F2F5;
}

</style>
