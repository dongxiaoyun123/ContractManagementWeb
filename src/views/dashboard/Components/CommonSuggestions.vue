<template>
  <el-row style="height: 600px;">
    <el-col :span="24">
      <el-card class="bottom-container" style="height: 580px;overflow-y: scroll;">
        <div slot="header" class="clearfix">
          <h4 style="float: left;margin: 0;">操作建议</h4>
        </div>
        <div class="infoClass">
         <span class="messageClass">
          {{ description }}
         </span> 
        </div>
        <el-form ref="addRef" :model="AddMoneyFrom" label-width="100px">
          <el-form-item label="菜单名称" prop="MenuCode">
            <el-select v-model="AddMoneyFrom.MenuCode" clearable="" placeholder="请选择菜单">
              <el-option-group v-for="group in permissionTree" :key="group.label" :label="group.label">
                <el-option v-for="item in group.children" :key="item.id" :label="item.label" :value="item.id" @click.native="labelOn(item.label)" />
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item label="意见与建议" prop="ProblemDescription">
            <el-input v-model="AddMoneyFrom.ProblemDescription" type="textarea"
              placeholder="珍贵而稀少的东西只会留给用心去寻觅它们的人 o(≧▽≦)o " :autosize="{ minRows: 5, maxRows: 8 }" />
          </el-form-item>
          <el-divider />
          <el-row class="buttonCenter">
            <el-col>
              <el-button icon="el-icon-circle-check" type="primary" :loading="LoadingAdd" @click="SaveMessage">
                保 存
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import {
  GetAdmin_PermissionByRole,
} from "@/api/SystemManagement";
import {
  AddMessageLog,
} from "@/api/Dashboards";
import { Message } from "element-ui";
const optionUnitClick = async (data) => {
   formData.unitDesc = data;
};
export default {
  data() {

    return {
      LoadingAdd: false,
      AddMoneyFrom: {
        MenuCode: '',
        MenuName: '',
        ProblemDescription: '',
      },
      permissionTree: [],
      description: '寄语：感谢公司，感恩相遇，愿世间美好与我们环环相扣，加油！屏幕前的我们，打破桎梏，坚守初心。其实人生改变命运的机会并没有太多，我们并不是不优秀，我们也并不是一无是处，我们也希望驻足山巅被众人仰望，也许我们缺少的只是一个机会，缺少的只是生命中的伯乐，我希望这个系统帮助到更多的同事，希望有一天，以后的我们不再颓废，希望有一天别人看到的不仅仅是我们的努力，还有我们的功成名就。本系统使用不足之处请您提出宝贵的意见与建议：'
    };
  },
  watch: {},
  created() {
    this.GetRole();
  },
  methods: {
    //通过点击事件获取label的值
    labelOn(e) {
      this.AddMoneyFrom.MenuName = e;
    },
    // 获取模块树
    GetRole() {
      GetAdmin_PermissionByRole().then((res) => {
        if (res.success) {
          this.permissionTree = res.result;
        } else {
          this.permissionTree = [];
        }
      });
    },
    //提交意见与建议
    SaveMessage(value) {
      if (!this.AddMoneyFrom.MenuCode) {
        this.$message.warning("请选择菜单");
        return;
      }
      if (!this.AddMoneyFrom.ProblemDescription) {
        this.$message.warning("请填写意见与建议");
        return;
      }
      this.LoadingAdd = true;
        AddMessageLog(this.AddMoneyFrom).then((res) => {
          if (res.success) {
            //重置data的数据
            Object.assign({}, this.AddMoneyFrom);
            this.$message.success("已收到反馈");
          } else {
            this.$message.error("提交失败，请联系管理员");
          }
          this.LoadingAdd = false;
        });
    },
  },
}
</script>
<style scoped>
.infoClass {
  background-color: #fff6e8;
  color: #ffa91b;
  padding: 20px;
  font-size: 14px;
  margin-bottom: 25px;
}
.messageClass{
  line-height: 160%;
}
</style>

