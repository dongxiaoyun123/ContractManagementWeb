<template>
  <div style="padding: 8px;">
    <el-card>
      <el-row>
        <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
          <el-input v-model="Name" placeholder="乙方公司名称" class="input-with-select" clearable="">
            <el-button slot="append" icon="el-icon-search" @click="GetDicCategoryCSearch" />
          </el-input>
        </el-col>
        <el-col :xs="24" :sm="19" :md="19" :lg="19" :xl="19">
          <el-button style="margin-left: 18px;" type="primary" icon="el-icon-circle-plus-outline"
                     @click="AddDicCategoryC"
          >添 加</el-button> <el-tag style="margin-left:15px"
                                   type="danger"
          >乙方公司名称请勿随意更改，如果修改请联系管理员！！！</el-tag>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="CardTableClass">
      <el-table v-loading="loading" highlight-current-row :data="DicCategoryList" row-key="id">
        <el-table-column prop="Name" label="乙方公司名称" width="150" />
        <el-table-column prop="Sort" label="排序" width="100" sortable />
        <el-table-column prop="Remarks" label="合同编号前缀" width="150" />
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" type="text" size="mini" @click="showEditDialog(scope.row.Code)">编辑</el-button>
            <el-button icon="el-icon-delete" type="text" size="mini" @click="deleteDialog(scope.row.Code)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination background :current-page="queryInfo.pagenum" :page-sizes="[20, 50, 100]"
                     :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"
                     @size-change="handleSizeChange" @current-change="handleCurrentChange"
      />
    </el-card>
    <el-dialog title="添加乙方公司" :visible.sync="addDialogVisible" width="30%">
      <el-form ref="addRef" :model="AddDicCategoryCFrom" :rules="AddDicCategoryCRules" label-width="120px">
        <el-form-item label="乙方公司名称" prop="Name">
          <el-input v-model="AddDicCategoryCFrom.Name" />
        </el-form-item>
        <el-form-item label="合同编号前缀" prop="Remarks">
          <el-input v-model="AddDicCategoryCFrom.Remarks" maxlength="4" minlength="4" @input="completeAdd" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="AddDicCategoryCFrom.Sort" :min="1" />
        </el-form-item>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button v-loading.fullscreen.lock="LoadingAdd" icon="el-icon-circle-check" type="primary"
                       @click="saveAdd"
            >保 存
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="updateDialogVisible" width="30%">
      <div slot="title" class="dialog-title">
        <span>编辑乙方公司</span>
      </div>
      <el-form ref="updateRef" :model="UpdateDicCategoryCFrom" :rules="UpdateDicCategoryCRules" label-width="120px">
        <el-form-item label="乙方公司名称" prop="Name">
          <el-input v-model="UpdateDicCategoryCFrom.Name" :disabled="RoleName != '超级管理员'" />
        </el-form-item>
        <el-form-item label="合同编号前缀" prop="Remarks">
          <el-input v-model="UpdateDicCategoryCFrom.Remarks" disabled="" maxlength="4" minlength="4"
                    @input="completeUpdate"
          />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="UpdateDicCategoryCFrom.Sort" :min="1" />
        </el-form-item>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button v-loading.fullscreen.lock="LoadingUpdate" icon="el-icon-circle-check" type="primary"
                       @click="saveUpdate"
            >保 存
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetDicCategoryC,
  AddDicCategoryC,
  GetDicCategoryFirstC,
  UpdateDicCategoryC,
  DeleteDicCategoryC,
} from "@/api/SystemManagement";
import { showLoading, hideLoading } from "@/common/loading";
// const moment = require("moment");
export default {
  name: 'CompanyNameB',
  data() {
    return {
      RoleName: sessionStorage.getItem("RoleName"),
      formShow: "",
      Name: "",
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
      DicCategoryList: [],
      AddDicCategoryCFrom: {
        Name: "",
        Sort: "",
        Remarks: "",
      },
      UpdateDicCategoryCFrom: {
        Name: "",
        Sort: "",
        Code: "",
        Remarks: "",
      },
      pagenum: 1,
      pagesize: 10,
      AddDicCategoryCRules: {
        Name: [
          {
            required: true,
            message: "请输入乙方公司名称",
            trigger: "blur",
          },
        ],
        Remarks: [
          {
            required: true,
            message: "合同编号必须为四位字母",
            trigger: "blur",
            pattern: /^([A-Za-z]+\s?)*[A-Za-z]$/,
          },
        ],
      },
      UpdateDicCategoryCRules: {
        Name: [
          {
            required: true,
            message: "请输入乙方公司名称",
            trigger: "blur",
          },
        ],
        Remarks: [
          {
            required: true,
            message: "合同编号必须为四位字母",
            trigger: "blur",
            pattern: /^([A-Za-z]+\s?)*[A-Za-z]$/,
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
  created() {
    this.GetDicCategoryC();
  },
  methods: {
    completeAdd(e) {
      this.AddDicCategoryCFrom.Remarks = e.toUpperCase();
    },
    completeUpdate(e) {
      this.UpdateDicCategoryCFrom.Remarks = e.toUpperCase();
    },
    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.GetDicCategoryC();
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newSize) {
      this.queryInfo.pagenum = newSize;
      this.GetDicCategoryC();
    },
    // 添加模块
    AddDicCategoryC() {
      this.AddDicCategoryCFrom.Name = "";
      this.AddDicCategoryCFrom.Remarks = "";
      this.AddDicCategoryCFrom.Sort = "";
      this.addDialogVisible = true;
    },
    saveAdd() {
      this.LoadingAdd = true;
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) {
          this.LoadingAdd = false;
          return;
        }
        AddDicCategoryC(this.AddDicCategoryCFrom).then((res) => {
          if (res.success) {
            this.addDialogVisible = false;
            this.$message.success("操作成功");
            this.GetDicCategoryC();
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
        console.log(this.UpdateDicCategoryCFrom);
        debugger
        UpdateDicCategoryC(this.UpdateDicCategoryCFrom).then((res) => {
          if (res.success) {
            this.updateDialogVisible = false;
            this.$message.success("操作成功");
            this.GetDicCategoryC();
          } else {
            this.$message.error(res.resultMessage);
          }
          this.LoadingUpdate = false;
        });
      });
    },
    GetDicCategoryCSearch() {
      this.queryInfo.pagenum = 1;
      this.queryInfo.pagesize = 20;
      this.GetDicCategoryC();
    },
    // 获取数据
    GetDicCategoryC() {
      this.loading = true;
      GetDicCategoryC(
        this.Name,
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      ).then((res) => {
        if (res.success) {
          this.DicCategoryList = res.result.list;
          this.total = res.result.totalNumber;
        } else {
          this.DicCategoryList = [];
          this.total = 0;
        }
        this.loading = false;
      });
    },

    // 删除信息
    async deleteDialog(Code) {
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
      DeleteDicCategoryC(Code).then((res) => {
        if (res.success) {
          this.$message.success("操作成功！");
          this.GetDicCategoryC();
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
    showEditDialog(Code) {
      GetDicCategoryFirstC(Code).then((res) => {
        if (res.success) {
          this.UpdateDicCategoryCFrom = res.result;
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
