<template>
  <div>
    <svg-icon style="font-size:16px ;" icon-class="pdf" @click="openpdf" />
    <el-dialog append-to-body :visible="isshowpdf" width="80%" top="5vh" @close="isshowpdf = false">
      <iframe style="width: 100%; height: calc(100vh - 200px);" :src="src" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      src: '/static/HR保险管理系统操作手册2023v1.0.pdf',
      isshowpdf: false
    }
  },
  methods: {
    openpdf() {
      // this.isshowpdf = true
      this.$message.info("待完善")
    }
  }
}
</script>
<style scoped>
</style>

