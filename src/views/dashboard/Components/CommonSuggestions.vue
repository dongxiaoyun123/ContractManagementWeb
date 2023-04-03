<template>
  <el-row style="height: 550px;">
    <el-col :span="24">
      <el-card class="bottom-container" style="height: 530px;overflow-y: scroll;">
        <div slot="header" class="clearfix">
          <h4 style="float: left;margin: 0;">金玉之言</h4>
        </div>
        <div class="infoClass">
          {{ description }}
        </div>
        <el-form ref="addRef" :model="AddMoneyFrom" label-width="100px">
          <el-form-item label="菜单名称" prop="RechargeMoney">
            <el-select v-model="AddMoneyFrom.RechargeMoney" clearable="" placeholder="请选择菜单">
              <el-option-group v-for="group in permissionTree" :key="group.label" :label="group.label">
                <el-option v-for="item in group.children" :key="item.id" :label="item.label"
                           :value="item.id"
                />
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item label="意见与建议" prop="Remark">
            <el-input v-model="AddMoneyFrom.Remark" type="textarea" placeholder="意见与建议"
                      :autosize="{ minRows: 5, maxRows: 8 }"
            />
          </el-form-item>
          <el-divider />
          <el-row class="buttonCenter">
            <el-col>
              <el-button type="primary" :loading="LoadingAdd">
                提 交
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
export default {
    data() {
        return {
            LoadingAdd: false,
            AddMoneyFrom: {
                RechargeMoney: '',
                Remark: '',
            },
            permissionTree: [],
            description: '寄语：感谢公司，感恩相遇，愿世间美好与我们环环相扣，加油！屏幕前的我们，打破桎梏，坚守初心。其实人生改变命运的机会并没有太多，我们并不是不优秀，我们也并不是一无是处，我们也希望驻足山巅被众人仰望，也许我们缺少的只是一个机会，缺少的只是生命中的导师，我希望这个系统帮助到更多的人，希望有一天，以后的我们不再胆怯，希望有一天别人看到的不仅仅是你的努力，还有你的功成名就，出人头地。本系统体验不足之处请您提出宝贵的意见与建议：'
        };
    },
    watch: {},
    created() {
        this.GetRole();
    },
    methods: {
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
    },
}
</script>
<style scoped>
.infoClass {
    background-color: #fff6e8;
    color: #ffa91b;
    padding: 20px;
    font-size: 14px;
    margin-bottom: 30px;
}
</style>

