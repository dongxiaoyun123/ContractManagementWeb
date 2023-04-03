<template>
  <div class="login-container">
    <vue-particles color="#ffffff" :particle-opacity="0.7" lines-color="#ffffff" :particles-number="80" shape-type="circle"
                   :particle-size="5" :lines-width="2" :line-linked="true" :line-opacity="0.4" :lines-distance="150" :move-speed="3"
                   :hover-effect="true" hover-mode="grab" :click-effect="true" click-mode="push"
    />
    <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left"
             :rules="loginFormRules"
    >
      <div class="title-container">
        <h3 class="title">合同管理系统</h3>
        <div class="login_header">
          <a :class="{ active: cur == true }" @click="switchClick(true)">密码登录</a>
          <a :class="{ active: cur == false }" @click="switchClick(false)">短信登录</a>
        </div>
      </div>
      <div class="login_content">
        <!-- 在cur==0时此板块显示 其他时候此板块不显示 -->
        <div v-show="cur == true" class="Cbody_item">
          <el-form-item prop="username">
            <span class="svg-container">
              <i class="el-icon-user" />
            </span>
            <el-input ref="username" v-model="loginForm.username" placeholder="请输入用户名" name="username"
                      type="text" tabindex="1" auto-complete="on" clearable @clear="clearAll"
            />
          </el-form-item>

          <el-form-item prop="password">
            <span class="svg-container">
              <i class="el-icon-unlock" />
            </span>
            <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
                      placeholder="请输入密码" name="password" tabindex="2" auto-complete="on" show-password clearable
            />
            <span class="show-pwd" @click="showPwd">
              <!-- <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /> -->
            </span>
          </el-form-item>
        </div>
        <!-- 在cur==1时此板块显示 其他时候此板块不显示 -->
        <div v-show="cur == false" class="Cbody_item">
          <el-form-item prop="mobile">
            <span class="svg-container">
              <i class="el-icon-phone-outline" />
            </span>
            <el-input ref="mobile" v-model="loginForm.mobile" placeholder="请输入手机号" name="mobile" type="text"
                      tabindex="1" auto-complete="on" clearable
            />
          </el-form-item>
          <el-form-item prop="code">
            <span class="svg-container">
              <i class="el-icon-key" />
            </span>
            <el-input ref="code" v-model="loginForm.code" type="text" placeholder="请输入验证码" name="code"
                      abindex="2" maxlength="6" auto-complete="on" onkeyup="this.value=this.value.replace(/\D/g,'')"
                      onafterpaste="this.value=this.value.replace(/\D/g,'')" clearable style="width:205px"
            />
            <span class="show-pwd">
              <el-button :loading="sending" :disabled="sendDisabled" @click="onSendSms">{{ sendButtonText
              }}</el-button>
            </span>
          </el-form-item>
        </div>
      </div>

      <el-button :loading="loading" type="primary" style="width: 100%"
                 @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script>
// import { sendSms } from "@/api/user";
import { getToken, setToken, removeToken } from '@/utils/auth'
import Cookie from "js-cookie";
import moment from "moment";
import { SendPhoneMessage, adminLogin } from '@/api/login'
import md5 from "js-md5";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "", // 登录名
        mobile: "", // 手机号
        code: "", // 验证码
        password: "", // 密码
      },
      cur: true, // true代表密码, false代表短信
      sending: false,
      sendDisabled: false,
      loading: false,
      timer: 0,
      passwordType: "password",
      // 表单验证
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 16,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            message: "请输入正确的手机号码",
            trigger: "blur",
            pattern: /^1[34578]\d{9}$/,
          },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  computed: {
    sendButtonText() {
      if (this.timer === 0) {
        return "发送验证码";
      } else {
        return `${this.timer}秒后重发`;
      }
    },
  },
  watch: {
    timer(num) {
      if (num > 0) {
        setTimeout(() => {
          this.timer = --num;
        }, 1000);
        this.sendDisabled = true;
      } else {
        this.sendDisabled = false;
      }
    },
  },
  created() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("Menu");
    sessionStorage.removeItem("activePath");
    const lastSendTime = Cookie.get("last-send-time");
    if (lastSendTime) {
      const timer = 60 - moment().diff(moment(lastSendTime), "seconds");
      this.timer = timer > 0 ? timer : 0;
    }
    const that = this;
    document.onkeydown = function (e) {
      const key = window.event.keyCode;
      if (key == "13") {
        that.handleLogin();
      }
    };
  },

  methods: {
    clearAll() {
      this.loginForm.username = '';
      this.loginForm.password = '';
    },
    switchClick(flag) {
      this.cur = flag;
      this.$refs.loginForm.resetFields();
    },
    // 发送短信验证码
    onSendSms() {
      this.loginWay = false;
      this.$refs.loginForm.validateField("mobile", (err) => {
        if (!err) {
          this.sending = true;
          const { mobile } = this.loginForm;
          SendPhoneMessage(mobile).then((res) => {
            if (res.success) {
              this.$message.success("短信发送成功，请注意查收");
              Cookie.set("last-send-time", new Date());
              this.timer = 60;
            } else {
              return this.$message.error(res.resultMessage);
            }
            this.sending = false;
          });
        } else {
          // this.$message.warning("请输入手机号码！");
        }
      });
    },
    showPwd() {
      this.loginWay = true;
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.loading = true;
      if (!this.cur) {
        this.$refs.loginForm.validateField("mobile", (err) => {
          if (!err) {
            this.$refs.loginForm.validateField("code", (err) => {
              if (!err) {
                this.requestForm();
              } else this.loading = false;
            });
          } else this.loading = false;
        });
      } else {
        this.$refs.loginForm.validateField("username", (err) => {
          if (!err) {
            this.$refs.loginForm.validateField("password", (err) => {
              if (!err) {
                this.requestForm();
              } else this.loading = false;
            });
          } else this.loading = false;
        });
      }
    },
    requestForm() {
      const md5Pwd = md5(this.loginForm.password);
      const obj = {};
      obj.loginName = this.loginForm.username;
      obj.password = md5Pwd;
      obj.deviceType = 2;
      const t = new Date(); // 你已知的时间
      const t_s = t.getTime(); // 转化为时间戳毫秒数
      const nt = new Date(); // 定义一个新时间
      nt.setTime(t_s + 5000 * 60); // 设置新时间比旧时间多5分钟
      const refresh_expires = nt.getTime();
      obj.refresh_expires = refresh_expires;
      obj.Phone = this.loginForm.mobile;
      obj.Code = this.loginForm.code;
      obj.Flag = this.cur;
      this.$store.dispatch('user/login', obj)
        .then((data) => {
          this.loading = false;
          if (data.success) {
            // //延时0.1秒
            // setTimeout(() => {
            //   this.$message({
            //     message: "登录成功",
            //     type: "success",
            //     duration: 800, //0.8秒后关闭
            //   });
            // }, 100)
            if (sessionStorage.getItem("RoleCode") === "01F70224-6886-38A2-DA3F-7073E49E4359") { this.$router.push("CollectionMangement/CollectionData"); } else { this.$router.push("ContractEntry/ContractsList"); }
          } else { this.$message.error(data.resultMessage); }
        })
        .catch((data) => {
          this.loading = false;
        })
    },
  },
};
</script>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #01172c;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor !important;
    border: 0;
    height: 40px;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url("../../assets/img/xingkong.jpg");
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .el-input {
    display: inline-block;
    width: 89%;

    input {
      background: transparent !important;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      color: $light_gray;
      caret-color: $cursor !important;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1) !important;
    border-radius: 5px;
    color: #454545;

  }

}
</style>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-width: 100%;
  min-height: 100%;
  .login-form {
    position: absolute;
    width: 450px;
    max-width: 100%;
    height: 325px;
    left: 0;
    right: 0;
    top: 180px;
    margin: auto;
    overflow: hidden;
    background-color: #01172c;
    padding: 57px 50px 0 50px;
    border-radius: 12px;
    opacity: 0.92;
    z-index: 100000;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 0 5px 0 15px;
    color: $dark_gray;
    // vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    margin-top: -20px;

    .title {
      font-size: 20px;
      color: $light_gray;
      margin: 0px auto 30px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 2px;
    top: 3px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

a {
  color: #fff;
  margin: 45px;
}

.login_header {
  margin-bottom: 30px;
  text-align: center;
  font-size: 13px;
}

.Cbody_item {
  border: 0px solid #999;
  overflow: hidden;
}

.active {
  color: #ffba00;
  padding-bottom: 10px;
  border-bottom: 3px solid #ffba00;
}
</style>
