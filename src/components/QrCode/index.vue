<template>
  <div>
    <svg-icon style="font-size:16px ;" icon-class="QrCode" @click="openpdf" />
    <el-dialog append-to-body :visible="isshowpdf" width="30%" top="5vh" @close="isshowpdf = false">
      <div style="text-align: center;width: 100%;">
        <!-- <div class="qrcode" ref="qrCodeUrl"></div> -->
        <div> <el-tag type="success">手机直接访问该网站地址即可或者直接扫描下方二维码</el-tag></div>
        <el-divider />
        <vue-qr style="margin-bottom: 18px;" :logo-src="imageUrl" text="https://kefuconins.ebm360.com/#/login" :size="200" />
      </div>
    </el-dialog>

  </div>
</template>

<script>
// import QRCode from "qrcodejs2";
import vueQr from "vue-qr";
import yuanfu from '@/assets/i-mages/logo.png';
export default {
    components: {
        vueQr,
    },
    data() {
        return {
            imageUrl: yuanfu,
            isshowpdf: false
        };
    },
    mounted() {
    },
    methods: {
        openpdf() {
            this.isshowpdf = true;
            // this.$nextTick(() => {
            //     var qrcode = new QRCode(this.$refs.qrCodeUrl, {
            //         text: "https://kefuconins.ebm360.com/#/login", // 需要转换为二维码的内容
            //         width: 100,
            //         height: 100,
            //         colorDark: "#000000",
            //         colorLight: "#ffffff",
            //         correctLevel: QRCode.CorrectLevel.H,
            //     });
            // })
        },
    },
};
</script>

<style scoped>
.qrcode {
    display: inline-block;
    width: 132px;
    height: 132px;
    background-color: #fff;
    padding: 6px;
    box-sizing: border-box;
}
</style>
