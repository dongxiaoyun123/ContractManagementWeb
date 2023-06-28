<template>
  <div style="padding: 16px;">
    <el-card>
      <el-row>
        <el-col :span="24">
          <el-button-group>
            <el-button type="success" icon="el-icon-circle-check" :loading="ExportLoading2"
              @click="UpdateStatesData(true)">批量开启</el-button>
            <el-button type="danger" icon="el-icon-circle-close" :loading="ExportLoading1"
              @click="UpdateStatesData(false)">批量关闭</el-button>
            <!-- <el-button
              type="primary"
              @click="AddUser"
              icon="el-icon-circle-plus-outline"
              >添加客服</el-button
            > -->
          </el-button-group>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="CardTableClass">
      <el-table class="tableCheckClass" ref="multipleTable" v-loading="loading" :data="CollectionList" fit
        :cell-style="isRed" @selection-change="TableSelect" @row-click="toggleSelection">
        <!-- :row-class-name="tableRowClassName" -->
        <el-table-column type="selection" width="50" />
        <el-table-column prop="User_Account" label="客服账号" width="250" />
        <el-table-column prop="User_RealName" label="客服真实姓名" width="250" />
        <el-table-column prop="IsDel" label="状态" align="left" sortable>
          <template slot-scope="scope">
            <el-tag v-if="scope.row.IsDel == 1" effect="plain" type="danger">已关闭</el-tag>
            <el-tag v-if="scope.row.IsDel == 0" effect="plain" type="success">使用中</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination background :current-page="queryInfo.pagenum" :page-sizes="[20, 50, 100]"
        :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-card>
  </div>
</template>

<script>
import {
  GetCustomerServiceManagementList,
  UpdateState,
} from "@/api/CollectionMangement";
export default {
  name: 'CustomerManagement',
  components: {},
  data() {
    return {
      ExportLoading1: false,
      ExportLoading2: false,
      uploadLoading: false,
      accessKeyId: "",
      accessKeySecret: "",
      stsToken: "",
      expiration: "",
      accessid: null,
      accesskey: null,
      osstoken: null,
      expire: null,
      Flag: false,
      StatesShow: false,
      States: 1, // 回款状态
      Condition: "", // 公司名称查询字段
      IfUser: "",
      LoadingUpdate: false,
      CustomerName: "",
      mobile_phone: "",
      certificate_no: "",
      Corpid: "",
      // 获取用户列表查询参数对象
      queryInfo: {
        pagenum: 1,
        pagesize: 20,
      },
      total: 0,
      importDialogVisible: false,
      CollectionList: [],
      addUserFrom: {
        UserAccounts: "",
        RealName: "",
        UserPwd: "",
      },
      employeeList: [],
      RoleName: sessionStorage.getItem("RoleName"),
      file: null,
      loading: false,
      UserStr: "",
      // 添加客服验证
      addRules: {
        UserAccounts: [
          { required: true, message: "请输入客服账号", trigger: "blur" },
        ],
        RealName: [
          { required: true, message: "请输入客服真实姓名", trigger: "blur" },
        ],
        UserPwd: [
          { required: true, message: "请输入客服密码", trigger: "blur" },
        ],
      },
      multipleSelection: [],
    };
  },
  watch: {},
  created() { },
  // 加载完成后执行调取回款数据接口
  mounted() {
    this.GetCustomerServiceManagementList();
  },
  methods: {
    // tableRowClassName({ row, rowIndex }) {
    //   if (row.IsDel === 1) {
    //     return "warning-row";
    //   }
    //   return "";
    // },
    // 点击当前行数据进行选中或取消复选框
    toggleSelection(row, column, event) {
      if (column.label != "操作")
      // 通过ref绑定后这里使用$refs.table来操作bom元素
      { this.$refs.multipleTable.toggleRowSelection(row); }
    },
    TableSelect(selection) {
      this.multipleSelection = selection;
      if (selection.length != 0) {
        this.UserStr = "";
        selection.forEach((element) => {
          this.UserStr += element.User_ID + ",";
        });
        this.UserStr = this.UserStr.substring(0, this.UserStr.lastIndexOf(","));
      } else {
        this.UserStr = "";
      }
    },
    isRed({ row }) {
      const checkIdList = this.multipleSelection.map((item) => item.User_Account);
      if (checkIdList.includes(row.User_Account)) {
        return {
          backgroundColor: "#E6F7FF",
        };
      } else {
        return {
          backgroundColor: "#FFFFFF",
        };
      }
    },
    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.GetCustomerServiceManagementList();
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newSize) {
      this.queryInfo.pagenum = newSize;
      this.GetCustomerServiceManagementList();
    },
    // 绑定填写备注弹出窗口
    async UpdateStatesData(flag) {
      if (!flag) this.ExportLoading1 = true;
      else this.ExportLoading2 = true;
      // false关闭 true开启
      if (!this.UserStr) {
        if (!flag) this.ExportLoading1 = false;
        else this.ExportLoading2 = false;
        this.$message.warning("请勾选要修改的数据！");
        return;
      }
      let message = "";
      if (!flag) message = "是否批量关闭客服账号？";
      else message = "是否批量开启客服账号？";
      const confirmResult = await this.$confirm(message, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch((err) => err);
      if (confirmResult !== "confirm") {
        if (!flag) this.ExportLoading1 = false;
        else this.ExportLoading2 = false;
        return this.$message.info("已取消");
      }
      UpdateState(this.UserStr, flag).then((res) => {
        if (res.success) {
          this.$message.success("操作成功！");
          this.GetCustomerServiceManagementList();
        } else {
          return this.$message.error(res.resultMessage);
        }
        if (!flag) this.ExportLoading1 = false;
        else this.ExportLoading2 = false;
      });
    },
    // 获取员工方案列表数据
    GetCustomerServiceManagementList() {
      this.loading = true;
      GetCustomerServiceManagementList(
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      ).then((res) => {
        if (res.success) {
          this.CollectionList = res.result.list;
          this.total = res.result.totalNumber;
        } else {
          this.CollectionList = [];
          this.total = 0;
        }
        this.UserStr = "";
        this.loading = false;
      });
    },
  },
};
</script>

<style>
/* .el-table .warning-row {
  background: oldlace;
} */
</style>
