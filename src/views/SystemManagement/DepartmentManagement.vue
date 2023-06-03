<template>
  <div style="padding: 8px;">
    <el-card>
      <el-row>
        <el-col :xs="16" :sm="5" :md="5" :lg="5" :xl="5">
          <el-input v-model="DepartmentName" placeholder="部门名称" class="input-with-select" clearable="">
            <el-button slot="append" icon="el-icon-search" @click="GetDepartmentSearch" />
          </el-input>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <el-button type="primary" style="margin-left: 15px" icon="el-icon-circle-plus-outline" @click="AddAdminUser">添
            加</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="CardTableClass">
      <el-table v-loading="loading" highlight-current-row :data="DepartmentList" row-key="id">
        <el-table-column prop="DepartmentName" label="部门名称" width="200" />
        <el-table-column prop="UpdateUserName" label="修改人" width="200" />
        <el-table-column prop="UpdateTimeStr" label="修改时间" width="250" sortable>
          <template slot-scope="scope">
            <div v-if="scope.row.UpdateTimeStr">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.UpdateTimeStr }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" type="text" size="mini"
                       @click="showEditDialog(scope.row.DepartmentCode)"
            >编辑</el-button>
            <!-- 合同系统会根据这个部门来关联客服人员，所以这个部门不能删除 -->
            <el-button v-if="scope.row.DepartmentName != '保险产品部及福利客服部'" icon="el-icon-delete" type="text" size="mini"
                       @click="deleteDialog(scope.row.DepartmentCode)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination :current-page="queryInfo.pagenum" :page-sizes="[20, 50, 100]"
                     :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"
                     @size-change="handleSizeChange" @current-change="handleCurrentChange"
      />
    </el-card>

    <el-dialog title="添加部门" :visible.sync="addDialogVisible" width="30%">
      <el-form ref="addRef" :model="AddDepartmentFrom" :rules="AddDepartmentRules" label-width="80px">
        <el-form-item label="部门名称" prop="DepartmentName">
          <el-input v-model="AddDepartmentFrom.DepartmentName" />
        </el-form-item>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button icon="el-icon-circle-check" v-loading.fullscreen.lock="LoadingAdd" type="primary" @click="saveAdd">保 存</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="updateDialogVisible" width="30%">
      <div slot="title" class="dialog-title">
        <span>编辑部门</span>&#32;&#32;&#32;&#32;&#32;&#32;&emsp;&emsp;&emsp;
        <!-- <i class="el-icon-info" style="color: #66b1ff"></i>&#12288;&#12288;
        <div style="font-size: 13px; display: inline">
          <span>添加人:{{ CreateUserName }}</span>&#12288;&#12288;&#12288;&#12288;
          <span>添加时间:{{ CreateTime }}</span>&#12288;&#12288;&#12288;&#12288;
          <span>修改人:{{ UpdateUserName }}</span>&#12288;&#12288; <span>修改时间:{{ UpdateTime
          }}</span>&#12288;&#12288;&#12288;&#12288;
        </div> -->
      </div>
      <el-form ref="updateRef" :model="UpdateDepartmentFrom" :rules="updateImageTypeFromRules" label-width="80px">
        <el-form-item label="部门名称" prop="DepartmentName">
          <el-input v-model="UpdateDepartmentFrom.DepartmentName" />
        </el-form-item>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button icon="el-icon-circle-check" v-loading.fullscreen.lock="LoadingUpdate" type="primary" @click="saveUpdate">保 存</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetDepartment,
  AddDepartment,
  GetDepartmentFirst,
  UpdateDepartment,
  DeleteDepartment,
} from "@/api/SystemManagement";
import { showLoading, hideLoading } from "@/common/loading";
const moment = require("moment");
export default {
  name: 'DepartmentManagement',
  data() {
    return {
      DepartmentName: "",
      LoadingUpdate: false,
      LoadingAdd: false,
      // 获取用户列表查询参数对象
      queryInfo: {
        pagenum: 1,
        pagesize: 20,
      },
      total: 0,
      addDialogVisible: false,
      updateDialogVisible: false,
      DepartmentList: [],
      AddDepartmentFrom: {
        DepartmentName: "",
      },
      UpdateDepartmentFrom: {
        DepartmentName: "",
        DepartmentCode: "",
      },
      pagenum: 1,
      pagesize: 10,
      AddDepartmentRules: {
        DepartmentName: [
          {
            required: true,
            message: "请输入部门名称",
            trigger: "blur",
          },
        ],
      },
      updateImageTypeFromRules: {
        DepartmentName: [
          {
            required: true,
            message: "请输入部门名称",
            trigger: "blur",
          },
        ],
      },
      loading: false,
      CreateUserName: "",
      CreateTime: "",
      UpdateUserName: "",
      UpdateTime: "",
    };
  },
  watch: {},
  created() {
    this.GetDepartment();
  },
  methods: {
    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.GetDepartment();
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newSize) {
      this.queryInfo.pagenum = newSize;
      this.GetDepartment();
    },
    // 添加模块
    AddAdminUser() {
      this.AddDepartmentFrom.DepartmentName = "";
      this.addDialogVisible = true;
    },
    saveAdd() {
      this.LoadingAdd = true;
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) {
          this.LoadingAdd = false;
          return;
        }
        AddDepartment(this.AddDepartmentFrom).then((res) => {
          if (res.success) {
            this.addDialogVisible = false;
            this.$message.success("操作成功");
            this.GetDepartment();
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
        UpdateDepartment(this.UpdateDepartmentFrom).then((res) => {
          if (res.success) {
            this.updateDialogVisible = false;
            this.$message.success("操作成功");
            this.GetDepartment();
          } else {
            this.$message.error(res.resultMessage);
          }
          this.LoadingUpdate = false;
        });
      });
    },
    GetDepartmentSearch() {
      this.queryInfo.pagenum = 1;
      this.queryInfo.pagesize = 20;
      this.GetDepartment();
    },
    // 获取数据
    GetDepartment() {
      this.loading = true;
      GetDepartment(
        this.DepartmentName,
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      ).then((res) => {
        if (res.success) {
          this.DepartmentList = res.result.list;
          this.total = res.result.totalNumber;
        } else {
          this.DepartmentList = [];
          this.total = 0;
        }
        this.loading = false;
      });
    },

    // 删除信息
    async deleteDialog(DepartmentCode) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该条, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      showLoading();
      DeleteDepartment(DepartmentCode).then((res) => {
        if (res.success) {
          this.$message.success("操作成功！");
          this.GetDepartment();
        } else {
          hideLoading();
          return this.$message.error(res.resultMessage);
        }
        hideLoading();
      });
    },
    // 关闭弹框事件
    // addDialogClosed() {
    //   this.$refs.addRef.resetFields();
    // },
    // 关闭弹框事件
    // updateDialogClosed() {
    //   this.$refs.updateRef.resetFields();
    // },
    // 编辑用户信息
    showEditDialog(DepartmentCode) {
      GetDepartmentFirst(DepartmentCode).then((res) => {
        if (res.success) {
          this.UpdateDepartmentFrom = res.result;
          this.CreateUserName = res.result.CreateUserName;
          this.CreateTime = moment(res.result.CreateTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          this.UpdateUserName = res.result.UpdateUserName;
          this.UpdateTime = moment(res.result.UpdateTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          this.updateDialogVisible = true;
        } else {
          return this.$message.error("数据获取失败！");
        }
      });
    },
  },
};
</script>

<style scoped></style>
