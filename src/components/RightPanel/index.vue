<template>
  <div ref="rightPanel" :class="{ show: show }" class="rightPanel-container">
    <div class="rightPanel-background" />
    <div class="rightPanel">
      <div
        v-if="show"
        class="handle-button"
        :style="{ top: buttonTop + 'px', 'background-color': theme }"
        @click="show = !show"
      >
        <i :class="show ? 'el-icon-close' : 'el-icon-setting'" />
      </div>
      <div class="rightPanel-items">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { addClass, removeClass } from "@/utils";

export default {
  name: "RightPanel",
  props: {
    clickNotClose: {
      default: false,
      type: Boolean,
    },
    buttonTop: {
      default: 250,
      type: Number,
    },
    valueFromParent: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    theme() {
      return this.$store.state.settings.theme;
    },
  },
  watch: {
    show(value) {
      if (value && !this.clickNotClose) {
        this.addEventClick();
      }
      if (value) {
        addClass(document.body, "showRightPanel");
      } else {
        removeClass(document.body, "showRightPanel");
        // 点击按钮时，将新值发送给父组件
        this.$emit("valueChanged", value);
      }
    },
    valueFromParent(value) {
      this.show = value;
    },
  },
  mounted() {
    this.insertToBody();
  },
  beforeDestroy() {
    const elx = this.$refs.rightPanel;
    elx.remove();
  },
  methods: {
    addEventClick() {
      window.addEventListener("click", this.closeSidebar);
    },
    closeSidebar(evt) {
      const parent = evt.target.closest(".rightPanel");
      if (!parent) {
        this.show = false;
        window.removeEventListener("click", this.closeSidebar);
      }
    },
    insertToBody() {
      const elx = this.$refs.rightPanel;
      const body = document.querySelector("body");
      body.insertBefore(elx, body.firstChild);
    },
  },
};
</script>

<style>
.showRightPanel {
  overflow: hidden;
  position: relative;
  width: calc(100% - 15px);
}
</style>

<style lang="scss" scoped>
.rightPanel-background {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  background: rgba(0, 0, 0, 0.2);
  z-index: -1;
}

.rightPanel {
  width: 100%;
  max-width: 260px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translate(100%);
  background: #fff;
  z-index: 40000;
}

.show {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

  .rightPanel-background {
    z-index: 20000;
    opacity: 1;
    width: 100%;
    height: 100%;
  }

  .rightPanel {
    transform: translate(0);
  }
}

.handle-button {
  width: 40px;
  height: 40px;
  position: absolute;
  left: -40px;
  text-align: center;
  font-size: 20px;
  border-radius: 6px 0 0 6px !important;
  z-index: 0;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  line-height: 40px;
  i {
    font-size: 20px;
    line-height: 40px;
  }
}
</style>
