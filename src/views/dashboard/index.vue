<template>
  <div class="dashboardCalss">
    <el-card>
      <el-form label-width="0">
        <!-- 合同信息 -->
        <div slot="header" class="clearfix">
          <span>合同信息</span>
        </div>
        <el-row>
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item style="margin-bottom: 0">
                <el-radio-group v-model="ContractsOption">
                  <el-radio-button label="客户合同录入" />
                  <el-radio-button label="供应商合同录入" />
                </el-radio-group>
                <el-divider v-if="RoleName != '财务'" direction="vertical" />
                <el-cascader
                  v-if="RoleName != '财务'"
                  v-model="UserArray"
                  :options="permissionTree"
                  :props="props"
                  collapse-tags
                  clearable
                  get-checked-nodes
                  :show-all-levels="false"
                  placeholder="选择员工"
                >
                  <template slot-scope="{ node, data }">
                    <span style="float: left">{{ data.label }}</span>
                    <span
                      v-if="data.PositionStatus == 0"
                      style="float: right; color: #13ce66"
                      >在职</span
                    >
                    <span
                      v-if="data.PositionStatus == 1"
                      style="float: right; color: #909399"
                      >离职</span
                    >
                  </template>
                </el-cascader>
                <el-divider v-if="RoleName != '财务'" direction="vertical" />
                <el-checkbox
                  v-if="RoleName != '财务'"
                  v-model="PositionStatus"
                  @change="PositionStatusChange"
                  >在职</el-checkbox
                >
                <el-divider direction="vertical" />
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  @click="GetAdmin_UserSearch"
                  >查 询
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
    </el-card>
    <!-- 审核状态组件 -->
    <panel-group :where-parameter="WhereParameter" />
    <!-- 销售统计分析图表 -->
    <el-row :gutter="16">
      <el-col
        v-if="ContractsOptionCatch == '客户合同录入'"
        :xs="24"
        :sm="24"
        :lg="24"
        :xl="8"
      >
        <div class="chart-wrapper">
          <CollectionCountChart
            :key="datekey"
            :where-parameter="WhereParameter"
            title="近一年合同录入统计"
          />
        </div>
      </el-col>
      <el-col
        v-if="ContractsOptionCatch == '供应商合同录入'"
        :xs="24"
        :sm="24"
        :lg="24"
      >
        <div class="chart-wrapper">
          <CollectionCountChart
            :key="datekey"
            :where-parameter="WhereParameter"
            title="近一年供应商合同录入统计"
          />
        </div>
      </el-col>
      <el-col
        v-show="ContractsOptionCatch == '客户合同录入'"
        :xs="24"
        :sm="24"
        :lg="24"
        :xl="8"
      >
        <div class="chart-wrapper">
          <CollectionMoneyChart :where-parameter="WhereParameter" />
        </div>
      </el-col>
      <el-col
        v-show="ContractsOptionCatch == '客户合同录入'"
        :xs="24"
        :sm="24"
        :lg="24"
        :xl="8"
      >
        <div class="chart-wrapper">
          <CollectionStateChart :where-parameter="WhereParameter" />
        </div>
      </el-col>
    </el-row>
    <!-- 客服统计分析图表 -->
    <!-- <el-row :gutter="16">
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper">
          <CollectionDataChart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <CollectionDataTable />
        </div>
      </el-col>
    </el-row> -->
    <!-- 财务统计分析图表 -->
    <!-- <el-row>
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chart-wrapper">
          <InvoiceListChart />
        </div>
      </el-col>
    </el-row> -->

    <!-- 只有财务角色能看到这两个统计 -->
    <el-row v-if="RoleName == '财务' || RoleName == '超级管理员'" :gutter="16">
      <el-col :xs="24" :sm="24" :lg="24" :xl="12">
        <div class="chart-wrapper">
          <CollectionDatastatisticsChart
            :key="datekey"
            :where-parameter="WhereParameter"
          />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="24" :xl="12">
        <div class="chart-wrapper">
          <InvoiceListDatastatisticsChart
            :key="datekey"
            :where-parameter="WhereParameter"
          />
        </div>
      </el-col>
    </el-row>

    <!-- 综合哪个角色都能看到 -->
    <el-row :gutter="16">
      <el-col :xs="24" :sm="24" :lg="24" :xl="12">
          <CommonSuggestions />
      </el-col>
      <el-col :xs="24" :sm="24" :lg="24" :xl="12">
          <CommonOperationLog
            :key="datekey"
            :where-parameter="WhereParameter"
          />
      </el-col>
    </el-row>
    <el-backtop target=".dashboardCalss" :bottom="45">
      <el-tooltip placement="top" content="回到顶部">
        <svg-icon
          style="color: #1890ff; font-size: medium"
          icon-class="BackToTop"
        />
      </el-tooltip>
    </el-backtop>
  </div>
</template>
<script>
import {
  GetUserAllChildList,
  CheckUserLoginStatus,
  UpdateUserLoginStatus,
} from "@/api/SystemManagement";
import PanelGroup from "./Components/PanelGroup";
import CollectionCountChart from "./Components/CollectionCountChart";
import CollectionMoneyChart from "./Components/CollectionMoneyChart";
import CollectionStateChart from "./Components/CollectionStateChart";
// import CollectionDataChart from './Components/CollectionDataChart'
// import CollectionDataTable from './Components/CollectionDataTable'
// import InvoiceListChart from './Components/InvoiceListChart'
import CommonSuggestions from "./Components/CommonSuggestions";
import CommonOperationLog from "./Components/CommonOperationLog";
import CollectionDatastatisticsChart from "./Components/CollectionDatastatisticsChart";
import InvoiceListDatastatisticsChart from "./Components/InvoiceListDatastatisticsChart";

export default {
  name: "Dashboard",
  components: {
    PanelGroup,
    CollectionCountChart,
    CollectionMoneyChart,
    CollectionStateChart,
    // CollectionDataChart,
    // CollectionDataTable,
    // InvoiceListChart,
    CommonSuggestions,
    CommonOperationLog,
    CollectionDatastatisticsChart,
    InvoiceListDatastatisticsChart,
  },
  data() {
    return {
      RoleName: sessionStorage.getItem("RoleName"),
      ContractsOption: "客户合同录入",
      ContractsOptionCatch: "客户合同录入",
      props: { multiple: true, emitPath: false },
      permissionTree: [],
      PositionStatus: true,
      UserArray: [],
      datekey: Date.now(),
      WhereParameter: {
        ContractsOption: "",
        UserArray: [],
        PositionStatus: null,
      },
    };
  },
  created() {
    this.GetPermissionTreeData();
    this.GetData(); // 这个是为了渲染合同录入统计（组件要刷新，所以这个要再写一遍，不会导致重复加载数据的）
  },
  mounted() {
    this.CheckUserLogin();
    this.GetData(); // 这个是为了渲染除了合同录入统计其它的
  },
  methods: {
    // //浅对比（这里不需要深对比）
    // //参考地址http://wiki.i-fanr.com/2021/05/05/%E4%B8%A4%E4%B8%AA%E5%AF%B9%E8%B1%A1%E6%AF%94%E8%BE%83%E6%9C%89%E5%93%AA%E5%87%A0%E7%A7%8D%E6%96%B9%E5%BC%8F/
    // shallowEqual(object1, object2) {
    //   const keys1 = Object.keys(object1);
    //   const keys2 = Object.keys(object2);

    //   if (keys1.length !== keys2.length) {
    //     return false;
    //   }

    //   for (let key of keys1) {
    //     if (object1[key] !== object2[key]) {
    //       return false;
    //     }
    //   }
    //   return true;
    // },
    //如果用户初次登陆，那么提示一下新增信息
    CheckUserLogin() {
      CheckUserLoginStatus().then((res) => {
        if (res.success) {
          if (res.result == 0) {
            this.$notify.info({
              title: "新增功能",
              message: "因为登录显示器分辨率的大小不同，现新增用户自定义空间尺寸的功能，操作方法：关闭此提示后点击项目右上角控件尺寸图标并选择合适的控件大小即可保存",
              duration: 0,
            });
            UpdateUserLoginStatus();
          }
        }
      });
    },
    GetData() {
      const WhereParameter = {
        ContractsOption: this.ContractsOption,
        UserArray: this.UserArray, // 选择人员集合
        PositionStatus: this.PositionStatus,
      };
      // if (!this.shallowEqual(this.WhereParameter, WhereParameter))
      this.WhereParameter = WhereParameter;
    },
    // 查询事件并更新组件
    GetAdmin_UserSearch() {
      this.ContractsOptionCatch = this.ContractsOption;
      // 这里更新了datekey ，组件就会刷新
      this.datekey = Date.now();
      this.GetData();
    },
    // //切换合同和供应商合同来更新子组件（不更新会导致合同录入统计不能独占一行）
    // ContractsChange() {

    // },
    // 获取当前登录人绑定的下级人员（包括他自己，超级管理员获取所有）
    GetPermissionTreeData() {
      GetUserAllChildList(this.PositionStatus).then((res) => {
        if (res.success) {
          this.permissionTree = res.result;
        } else {
          this.permissionTree = [];
        }
      });
    },
    // 复选框在职按钮跟更改事件
    PositionStatusChange(val) {
      this.PositionStatus = val;
      // 清空一下选中的值并重新加载数据
      this.UserArray = [];
      this.GetPermissionTreeData();
    },
  },
};
</script>
<style lang="scss">
.dashboardCalss {
  background-color: #f0f2f5;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 102px 16px 0 16px;
  position: absolute;
  left: 0;
  top: 0;
  right: -8px;
  bottom: 0;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 16px;
    // background:url("https://www.toptal.com/designers/subtlepatterns/uploads/dot-grid.png");
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
    //background:url("https://www.toptal.com/designers/subtlepatterns/uploads/double-bubble-outline.png");
  }
}

.el-cascader-menu__wrap {
  height: 300px;
}

.el-divider--vertical {
  margin: 0 1rem;
}
</style>
