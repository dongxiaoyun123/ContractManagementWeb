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
      src: '/static/合同管理系统操作手册v1.0.pdf',
      isshowpdf: false
    }
  },
  methods: {
    openpdf() {
      this.isshowpdf = true
    }
  }
}
</script>
<style scoped></style>

