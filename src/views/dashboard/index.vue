<template>
  <div class="dashboardCalss">
    <el-radio-group v-model="ContractsOption" size="medium">
      <el-radio-button label="客户合同录入" />
      <el-radio-button label="供应商合同录入" />
    </el-radio-group>
    <!-- 审核状态组件 -->
    <panel-group />
    <!-- 销售统计分析图表 -->
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <CollectionCountChart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <CollectionMoneyChart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <CollectionStateChart />
        </div>
      </el-col>
    </el-row>
    <!-- 客服统计分析图表 -->
    <el-row :gutter="20">
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
    </el-row>
    <!-- 财务统计分析图表 -->
    <el-row>
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chart-wrapper">
          <InvoiceListChart />
        </div>
      </el-col>
    </el-row>
    <!-- 综合哪个角色都能看到 -->
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <CommonSuggestions />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <CommonOperationLog />
        </div>
      </el-col>
    </el-row>
    <el-backtop target=".dashboardCalss" :bottom="45">
      <el-tooltip placement="top" content="回到顶部">
        <svg-icon style="color: #1890FF;font-size:medium;" icon-class="BackToTop" />
      </el-tooltip>
    </el-backtop>
  </div>
</template>
<script>

import PanelGroup from './Components/PanelGroup'
import CollectionCountChart from './Components/CollectionCountChart'
import CollectionMoneyChart from './Components/CollectionMoneyChart'
import CollectionStateChart from './Components/CollectionStateChart'
import CollectionDataChart from './Components/CollectionDataChart'
import CollectionDataTable from './Components/CollectionDataTable'
import InvoiceListChart from './Components/InvoiceListChart'
import CommonSuggestions from './Components/CommonSuggestions'
import CommonOperationLog from './Components/CommonOperationLog'
export default {
  name: '首页',
  components: {
    PanelGroup,
    CollectionCountChart,
    CollectionMoneyChart,
    CollectionStateChart,
    CollectionDataChart,
    CollectionDataTable,
    InvoiceListChart,
    CommonSuggestions,
    CommonOperationLog
  },
  data() {
    return {
      ContractsOption: '客户合同录入',
    }
  },

  created() {

  }
}
</script>
<style lang="scss"  >
.dashboardCalss {
  background-color: #EFF1F4;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 102px 20px 0 20px;
  position: absolute;
  left: 0;
  top: 0;
  right: -8px;
  bottom: 0;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 20px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
