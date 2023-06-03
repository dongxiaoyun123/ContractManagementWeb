<template>
  <div style="padding: 8px;">
    <el-card>
      <el-row>
        <el-col :xs="8" :sm="5" :md="4" :lg="3" :xl="3">
          <el-select v-model="PermissionCode" clearable="" placeholder="请选择菜单">
            <el-option-group v-for="group in permissionTree" :key="group.label" :label="group.label">
              <el-option v-for="item in group.children" :key="item.id" :label="item.label" :value="item.id" />
            </el-option-group>
          </el-select>
        </el-col>
        <el-col :xs="8" :sm="5" :md="4" :lg="3" :xl="3">
          <el-select v-model="MenuDescription" filterable placeholder="操作类型" clearable="">
            <el-option v-for="item in MenuDescriptionArray" :key="item.Code" :label="item.Name" :value="item.Code">
              <!-- <span style="float: left">{{ item.Name }}</span>
              <span style="float: right; font-size: 13px">
                <i :class="item.tab" :style="{ color: item.color }"></i>
              </span> -->

              <el-tag v-if="item.Name == '添加数据'" effect="plain" type="default">添加数据</el-tag>
              <el-tag v-if="item.Name == '修改数据'" effect="plain" type="warning">修改数据</el-tag>
              <el-tag v-if="item.Name == '删除数据'" effect="plain" type="danger">删除数据</el-tag>
              <el-tag v-if="item.Name == '导入数据'" effect="plain" type="success">导入数据</el-tag>
              <el-tag v-if="item.Name == '导出数据'" effect="plain" type="info"
                style="border-color: #8BC6C6;color: #13C2C2;">导出数据</el-tag>
              <el-tag v-if="item.Name == '错误数据'" effect="plain" style="border-color: #A29BC4;color:#6959CD">错误数据</el-tag>
              <el-tag v-if="item.Name == '撤回数据'" effect="plain" style="border-color: #D6D8DB;color:#909399">撤回数据</el-tag>
            </el-option>
          </el-select>
        </el-col>
        <el-col :xs="8" :sm="5" :md="4" :lg="3" :xl="3">
          <el-input v-model="Description" clearable="" placeholder="描述" />
        </el-col>
        <el-col :xs="24" :sm="5" :md="4" :lg="3" :xl="3">
          <el-button :style="buttonStyle" type="primary" icon="el-icon-search" @click="GetSystemLogSearch">
            查 询</el-button>
          <!-- <el-button
            type="primary"
            @click="exportContracts"
            icon="el-icon-download"
            :loading="ExportLoading"
            >导出</el-button
          > -->
        </el-col>
      </el-row>
    </el-card>
    <el-card class="CardTableClass">
      <el-table v-loading="loading" highlight-current-row :data="LogPaymentList" row-key="id">
        <!-- :row-class-name="tableRowClassName" -->
        <el-table-column prop="PermissionName" label="操作菜单" width="150" />
        <el-table-column prop="MenuDescription" label="操作类型" width="150" sortable>
          <template slot-scope="scope">
            <el-tag v-if="scope.row.MenuDescription == '添加数据'" effect="plain">添加数据</el-tag>
            <el-tag v-if="scope.row.MenuDescription == '修改数据'" effect="plain" type="warning">修改数据</el-tag>
            <el-tag v-if="scope.row.MenuDescription == '删除数据'" effect="plain" type="danger">删除数据</el-tag>
            <el-tag v-if="scope.row.MenuDescription == '导入数据'" effect="plain" type="success">导入数据</el-tag>
            <el-tag v-if="scope.row.MenuDescription == '导出数据'" effect="plain" type="info"
              style="border-color: #8BC6C6;color: #13C2C2;">导出数据</el-tag>
            <el-tag v-if="scope.row.MenuDescription == '错误数据'" effect="plain"
              style="border-color: #A29BC4;color:#6959CD">错误数据</el-tag>
              <el-tag v-if="scope.row.MenuDescription == '撤回数据'" effect="plain"
              style="border-color: #D6D8DB;color:#909399">撤回数据</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="CreateUserName" label="操作人" width="120" />
        <el-table-column prop="CreateTimeStr" label="创建时间" width="200">
          <template slot-scope="scope">
            <div v-if="scope.row.CreateTimeStr">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.CreateTimeStr }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="Description" label="描述" />
      </el-table>
      <!-- 分页区域 -->
      <el-pagination background :current-page="queryInfo.pagenum" :page-sizes="[20, 50, 100]" :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </el-card>
  </div>
</template>

<script>
import {
  GetSystemLog,
  GetAdmin_PermissionByRole,
} from "@/api/SystemManagement";
import { showLoading, hideLoading } from "@/common/loading";
const moment = require("moment");
export default {
  name: 'SystemLog',
  data() {
    return {
      buttonStyle: '',
      permissionTree: [],
      LogPaymentList: [],
      PermissionCode: "",
      MenuDescription: "",
      Description: "",
      Name: "",
      LoadingUpdate: false,
      LoadingAdd: false,
      // 获取用户列表查询参数对象
      queryInfo: {
        pagenum: 1,
        pagesize: 20,
      },
      total: 0,
      loading: false,
      // 操作类型

      MenuDescriptionArray: [
        {
          Code: "添加数据",
          Name: "添加数据",
          tab: "el-icon-circle-plus",
          color: "#47A1FF",
        },
        {
          Code: "修改数据",
          Name: "修改数据",
          tab: "el-icon-edit",
          color: "#EBB563",
        },
        {
          Code: "删除数据",
          Name: "删除数据",
          tab: "el-icon-delete",
          color: "#F78989",
        },
        {
          Code: "导入数据",
          Name: "导入数据",
          tab: "el-icon-upload",
          color: "#13ce66",
        },
        {
          Code: "导出数据",
          Name: "导出数据",
          tab: "el-icon-download",
          color: "#909399",
        },
        {
          Code: "错误数据",
          Name: "错误数据",
          tab: "el-icon-error",
          color: "#6959CD",
        },
        {
          Code: "撤回数据",
          Name: "撤回数据",
          tab: "el-icon-error",
          color: "#909399",
        },
      ],
    };
  },
  watch: {
    '$store.getters.clientWidth'(newVal, oldVal) {
      this.fixedShowMethod(newVal);
    },
  },
  created() {
    this.fixedShowMethod(document.body.clientWidth);
    this.GetSystemLog();
    this.GetRole();
  },
  methods: {
    // tableRowClassName({ row, rowIndex }) {
    //   switch (row.MenuDescription) {
    //     case "添加数据":
    //       return "add";
    //     case "修改数据":
    //       return "edit";
    //     case "删除数据":
    //       return "delete";
    //     case "导入数据":
    //       return "import";
    //   }
    //   return "";
    // },
    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.GetSystemLog();
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newSize) {
      this.queryInfo.pagenum = newSize;
      this.GetSystemLog();
    },
    // 添加模块
    AddDicCategory() {
      this.AddDicCategoryFrom.Name = "";
      this.AddDicCategoryFrom.Sort = "";
      this.addDialogVisible = true;
    },
    saveAdd() {
      this.LoadingAdd = true;
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) {
          this.LoadingAdd = false;
          return;
        }
        AddDicCategory(this.AddDicCategoryFrom).then((res) => {
          if (res.success) {
            this.addDialogVisible = false;
            this.$message.success("操作成功");
            this.GetSystemLog();
          } else {
            this.$message.error(res.resultMessage);
          }
          this.LoadingAdd = false;
        });
      });
    },
    saveUpdate() {
      this.LoadingUpdate = true;
      this.$refs.updateRef.validate(async (valid) => {
        if (!valid) {
          this.LoadingUpdate = false;
          return;
        }
        UpdateDicCategory(this.UpdateDicCategoryFrom).then((res) => {
          if (res.success) {
            this.updateDialogVisible = false;
            this.$message.success("操作成功");
            this.GetSystemLog();
          } else {
            this.$message.error(res.resultMessage);
          }
          this.LoadingUpdate = false;
        });
      });
    },
    GetSystemLogSearch() {
      this.queryInfo.pagenum = 1;
      this.queryInfo.pagesize = 20;
      this.GetSystemLog();
    },
    // 获取数据
    GetSystemLog() {
      this.loading = true;
      GetSystemLog(
        this.PermissionCode,
        this.MenuDescription,
        this.Description,
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      ).then((res) => {
        if (res.success) {
          this.LogPaymentList = res.result.list;
          this.total = res.result.totalNumber;
        } else {
          this.LogPaymentList = [];
          this.total = 0;
        }
        this.loading = false;
      });
    },
    // 编辑用户信息
    showEditDialog(Code) {
      GetSystemLogFirst(Code).then((res) => {
        if (res.success) {
          this.UpdateDicCategoryFrom = res.result;
          this.updateDialogVisible = true;
        } else {
          return this.$message.error("数据获取失败！");
        }
      });
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

    fixedShowMethod(newVal) {
      // 上方表单距下方间距
      if (newVal < 768) {
        this.buttonStyle = 'margin-top: 18px;margin-left:0';
      } else {
        this.buttonStyle = 'margin-left:18px';
      }
    }
  },
};
</script>

<style>
.el-table .add {
  background: #ECF5FF;
}

.el-table .edit {
  background: oldlace;
}

.el-table .delete {
  background: #FEF0F0;
}

.el-table .import {
  background: #f0f9eb;
}</style>
