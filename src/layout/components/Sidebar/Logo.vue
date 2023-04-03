<template>
  <div class="sidebar-logo-container" :class="{ 'collapse': collapse }">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }}{{ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import yuanfu from '@/assets/i-mages/logo.png';
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: '合同管理系统',
      logo: yuanfu,
      // link: this.$store.getters.MenuPermissions == 2 ? 'InsuranceServices/StatisticsInsuredPersonnel' : 'UserHomePage/UserHomePageList',
    }
  },
  mounted() {

  },
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #001529;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 43px;
      height: 43px;
      vertical-align: middle;
      margin-bottom: 3px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #FFFFFF;
      font-weight: 600;
      line-height: 50px;
      font-size: 17px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
