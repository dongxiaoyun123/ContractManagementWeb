<template>
  <div style="width:100% ;height:450px">
    <el-card>
      <div slot="header" class="clearfix">
        <h4 style="float: left;margin: 0;line-height: 2.2rem;">月到账金额统计</h4>
      </div>
      <el-date-picker v-model="SelectMonthValue" style="padding: 5px 0" type="month"
                      placeholder="选择月"
      />
      <el-table highlight-current-row :data="LogPaymentList" border height="320px">
        <el-table-column prop="PermissionName" label="客服人员" />
        <el-table-column prop="MenuDescription" label="当月到账金额" sortable />
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      SelectMonthValue: '2023-01',
      LogPaymentList: [
        {
          PermissionName: "袁建亚",
          MenuDescription: "¥92589",
        },
        {
          PermissionName: "韩璐瞳",
          MenuDescription: "¥85749",
        },
        {
          PermissionName: "李彩凤",
          MenuDescription: "¥75986",
        },
        {
          PermissionName: "王金博",
          MenuDescription: "¥68589",
        },
        {
          PermissionName: "石金华",
          MenuDescription: "¥62358",
        },
        {
          PermissionName: "李阳",
          MenuDescription: "¥52369",
        },
        {
          PermissionName: "岳素轻",
          MenuDescription: "¥42159",
        },
      ],
    };
  },
  watch: {},
  created() {

  },
  methods: {

  },
};
</script>

<style  scoped>
::v-deep .el-card__header {
  padding: 10px 20px
}

::v-deep .el-card__body {
  padding: 0 20px 20px 20px;
}

::v-deep .el-table {
  margin-top: 0
}
</style>
