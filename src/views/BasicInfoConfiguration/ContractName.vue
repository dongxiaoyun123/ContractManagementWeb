<template>
  <div style="padding: 8px;">
    <el-card>
      <el-row>
        <el-col :xs="16" :sm="5" :md="5" :lg="5" :xl="5">
          <el-input v-model="ContractName" placeholder="合同名称" class="input-with-select" clearable="">
            <el-button slot="append" icon="el-icon-search" @click="GetContractNameconfigSearch" />
          </el-input>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <el-button type="primary" style="margin-left: 8px" icon="el-icon-circle-plus-outline"
                     @click="AddContractNameconfig"
          >添 加</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="CardTableClass">
      <el-table v-loading="loading" highlight-current-row :data="ContractNameconfigList" row-key="id">
        <el-table-column prop="ContractCode" label="合同编号" width="320" />
        <el-table-column prop="ContractName" label="合同名称" width="200" />
        <el-table-column prop="Sort" label="排序" width="100" sortable />
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" type="text" size="mini" @click="showEditDialog(scope.row.ContractCode)">编辑
            </el-button>
            <el-button icon="el-icon-delete" type="text" size="mini" @click="deleteDialog(scope.row.ContractCode)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination background :current-page="queryInfo.pagenum" :page-sizes="[20, 50, 100]"
                     :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"
                     @size-change="handleSizeChange" @current-change="handleCurrentChange"
      />
    </el-card>

    <el-dialog title="添加合同名称" :visible.sync="addDialogVisible" width="30%">
      <el-form ref="addRef" :model="AddContractNameconfigFrom" :rules="AddContractNameconfigRules" label-width="100px">
        <el-form-item label="合同名称" prop="ContractName">
          <el-input v-model="AddContractNameconfigFrom.ContractName" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="AddContractNameconfigFrom.Sort" :min="1" />
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
        <span>编辑合同名称</span>
      </div>
      <el-form ref="updateRef" :model="UpdateContractNameconfigFrom" :rules="updateContractNameconfigRules"
               label-width="100px"
      >
        <el-form-item label="合同名称" prop="ContractName">
          <el-input v-model="UpdateContractNameconfigFrom.ContractName" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="UpdateContractNameconfigFrom.Sort" :min="1" />
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
  GetContractNameconfig,
  AddContractNameconfig,
  GetContractNameconfigFirst,
  UpdateContractNameconfig,
  DeleteContractNameconfig,
} from "@/api/SystemManagement";
import { showLoading, hideLoading } from "@/common/loading";
// const moment = require("moment");
export default {
  name: 'ContractName',
  data() {
    return {
      ContractName: "",
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
      ContractNameconfigList: [],
      AddContractNameconfigFrom: {
        ContractName: "",
        Sort: "",
      },
      UpdateContractNameconfigFrom: {
        ContractName: "",
        Sort: "",
        Code: "",
      },
      pagenum: 1,
      pagesize: 10,
      AddContractNameconfigRules: {
        ContractName: [
          {
            required: true,
            message: "请输入合同名称",
            trigger: "blur",
          },
        ],
      },
      updateContractNameconfigRules: {
        ContractName: [
          {
            required: true,
            message: "请输入合同名称",
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
    this.GetContractNameconfig();
  },
  methods: {
    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.GetContractNameconfig();
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newSize) {
      this.queryInfo.pagenum = newSize;
      this.GetContractNameconfig();
    },
    // 添加模块
    AddContractNameconfig() {
      this.AddContractNameconfigFrom.ContractName = "";
      this.AddContractNameconfigFrom.Sort = "";
      this.addDialogVisible = true;
    },
    saveAdd() {
      this.LoadingAdd = true;
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) {
          this.LoadingAdd = false;
          return;
        }
        AddContractNameconfig(this.AddContractNameconfigFrom).then((res) => {
          if (res.success) {
            this.addDialogVisible = false;
            this.$message.success("操作成功");
            this.GetContractNameconfig();
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
        UpdateContractNameconfig(this.UpdateContractNameconfigFrom).then((res) => {
          if (res.success) {
            this.updateDialogVisible = false;
            this.$message.success("操作成功");
            this.GetContractNameconfig();
          } else {
            this.$message.error(res.resultMessage);
          }
          this.LoadingUpdate = false;
        });
      });
    },
    GetContractNameconfigSearch() {
      this.queryInfo.pagenum = 1;
      this.queryInfo.pagesize = 20;
      this.GetContractNameconfig();
    },
    // 获取数据
    GetContractNameconfig() {
      this.loading = true;
      GetContractNameconfig(
        this.ContractName,
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      ).then((res) => {
        if (res.success) {
          this.ContractNameconfigList = res.result.list;
          this.total = res.result.totalNumber;
        } else {
          this.ContractNameconfigList = [];
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
      DeleteContractNameconfig(Code).then((res) => {
        if (res.success) {
          this.$message.success("操作成功！");
          this.GetContractNameconfig();
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
      GetContractNameconfigFirst(Code).then((res) => {
        if (res.success) {
          this.UpdateContractNameconfigFrom = res.result;
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
