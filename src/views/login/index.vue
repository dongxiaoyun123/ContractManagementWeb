<template>
  <div class="containerClass">
    <vue-particles style="background: rgba(0,0,0,.4);position: absolute;min-width: 100%; min-height: 100%;"
      color="#dedede" :particle-opacity="0.9" lines-color="#ffffff" :particles-number="80" shape-type="circle"
      :particle-size="1" :lines-width="1" :line-linked="true" :line-opacity="1" :lines-distance="80" :move-speed="1"
      :hover-effect="true" hover-mode="grab" :click-effect="true" click-mode="push" />

    <div class="box">
      <div class="login-box">
        <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left"
          :rules="loginFormRules">
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
                <el-input ref="username" v-model="loginForm.username" placeholder="请输入用户名" name="username" type="text"
                  tabindex="1" auto-complete="on" clearable @clear="clearAll" />
              </el-form-item>

              <el-form-item prop="password">
                <span class="svg-container">
                  <i class="el-icon-unlock" />
                </span>
                <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
                  placeholder="请输入密码" name="password" tabindex="2" auto-complete="on" show-password clearable />
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
                  tabindex="1" auto-complete="on" clearable />
              </el-form-item>
              <el-form-item prop="code">
                <span class="svg-container">
                  <i class="el-icon-key" />
                </span>
                <el-input ref="code" v-model="loginForm.code" type="text" placeholder="请输入验证码" name="code" abindex="2"
                  maxlength="6" auto-complete="on" onkeyup="this.value=this.value.replace(/\D/g,'')"
                  onafterpaste="this.value=this.value.replace(/\D/g,'')" clearable style="width:205px" />
                <span class="show-pwd">
                  <el-button type="success" :loading="sending" :disabled="sendDisabled" @click="onSendSms">{{
                    sendButtonText
                  }}</el-button>
                </span>
              </el-form-item>
            </div>
          </div>
          <el-button size="medium" :loading="loading" type="primary" style="width: 100%"
            @click.native.prevent="handleLogin">登 录</el-button>
        </el-form>

      </div>
    </div>


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
            if (sessionStorage.getItem("RoleCode") === "01F70224-6886-38A2-DA3F-7073E49E4359") {
              this.$router.push("CollectionMangement/CollectionData");
            }
            else {
              this.$router.push("ContractEntry/ContractsList");
            }
          } else {
            this.$message.error(data.resultMessage);
          }
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
$bg: #ffffff;

@supports (-webkit-mask: none) and (not (cater-color: $bg)) {
  .containerClass .el-input input {
    border: 0;
    height: 40px;
  }
}

/* reset element-ui css */
.containerClass {
  min-width: 100%;
  min-height: 100%;
  background-image: url("../../assets/img/xingkong.jpg");
  overflow: hidden;
  position: absolute;
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .el-input {
    display: inline-block;
    width: 89%;
    background: transparent;
    color: #fff;
    border-bottom: 1px solid #fff;

    input {
      background: transparent !important;
      -webkit-appearance: none;
      border-radius: 0px;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        // -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #DCDFE6;
    border-radius: 5px;
  }

  .login-form {
    position: absolute;
    width: 444px;
    height: 330px;
    margin: auto;
    overflow: hidden;
    padding: 57px 50px 0 50px;
    border-radius: 12px;
    opacity: 0.92;
    z-index: 100000;
  }

  .login-box {
    width: 444px;
    height: 330px;
    left: 3px;
    top: 3px;
    background: #fff;
    border-radius: 12px;
    position: absolute;
    // overflow: hidden;
    z-index: 100001;
  }

  .tips {
    font-size: 14px;
    color: $bg;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 0 5px 0 15px;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 20px;
      color: #000;
      margin: -18px auto 32px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 2px;
    top: 4px;
    color: $bg;
    cursor: pointer;
    user-select: none;
  }
}

.box {
  box-sizing: border-box;
  position: absolute;
  width: 450px;
  max-width: 100%;
  height: 336px;
  left: 0;
  right: 0;
  top: 180px;
  margin: auto;
  overflow: hidden;
  background-color: #ffffff;
  padding: 2px;
  border-radius: 12px;
  opacity: 0.92;
  z-index: 100000;
}

.box::before,
.box::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  z-index: 0;
  width: 450px;
  height: 336px;
  background: linear-gradient(0deg,
      transparent, transparent, #13ce66, #13ce66, #13ce66);
  transform-origin: bottom right;
  animation: login 5.4s linear infinite;
}

.box::after {
  background: linear-gradient(0deg, transparent, transparent, #ff4949, #ff4949, #ff4949);
  animation-delay: -2.7s;
}

@keyframes login {
  0% {
    transform: rotate(0deg)
  }

  100% {
    transform: rotate(360deg)
  }
}
</style>

<style lang="scss" scoped>
a {
  color: #000;
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
  background-color: #fff;
}

.active {
  color: #1890ff;
  padding-bottom: 10px;
  border-bottom: 3px solid #1890ff;
}
</style>
