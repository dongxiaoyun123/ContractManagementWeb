<template>
  <div id="app">
    <!-- // 控制router-view的显示或隐藏，从而控制页面的再次加载 -->
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload,
    }
  },
  components: {
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  mounted() {
    this.$store.dispatch('settings/screenWidthSetting', document.body.clientWidth);
    window.onresize = () => {
      return (() => {
        this.$store.dispatch('settings/screenWidthSetting', document.body.clientWidth);
      })()
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      })
    },
  },
}
</script>

