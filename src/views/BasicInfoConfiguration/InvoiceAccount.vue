<template>
  <div style="padding: 8px;">
    <el-card>
      <el-row>
        <el-col :xs="16" :sm="5" :md="5" :lg="5" :xl="5">
          <el-input v-model="Name" placeholder="发票科目名称" class="input-with-select" clearable="">
            <el-button slot="append" icon="el-icon-search" @click="_GetInvoiceAccountSearch" />
          </el-input>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <el-button type="primary" style="margin-left: 8px" icon="el-icon-circle-plus-outline"
                     @click="_AddInvoiceAccount"
          >添 加</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="CardTableClass">
      <el-table v-loading="loading" highlight-current-row :data="InvoiceAccountList" row-key="id">
        <el-table-column prop="InvoiceAccountCode" label="发票科目编号" width="320" />
        <el-table-column prop="InvoiceAccountName" label="发票科目名称" width="150" />
        <el-table-column prop="Sort" label="排序" width="100" sortable />
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" type="text" size="mini"
                       @click="showEditDialog(scope.row.InvoiceAccountCode)"
            >编辑</el-button>
            <el-button icon="el-icon-delete" type="text" size="mini"
                       @click="deleteDialog(scope.row.InvoiceAccountCode)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination background :current-page="queryInfo.pagenum" :page-sizes="[20, 50, 100]"
                     :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"
                     @size-change="handleSizeChange" @current-change="handleCurrentChange"
      />
    </el-card>
    <el-dialog title="添加发票科目" :visible.sync="addDialogVisible" width="30%" @close="addClosed">
      <el-form ref="addRef" :model="AddInvoiceAccountFrom" :rules="AddInvoiceAccountRules" label-width="120px">
        <el-form-item label="发票科目名称" prop="InvoiceAccountName">
          <el-input v-model="AddInvoiceAccountFrom.InvoiceAccountName" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="AddInvoiceAccountFrom.Sort" precision="0" :min="1" />
        </el-form-item>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button icon="el-icon-circle-check" v-loading.fullscreen.lock="LoadingAdd" type="primary" @click="saveAdd">保 存
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="updateDialogVisible" width="30%" @close="updateClosed">
      <div slot="title" class="dialog-title">
        <span>编辑发票科目</span>
      </div>
      <el-form ref="updateRef" :model="UpdateInvoiceAccountCFrom" :rules="UpdateDicCategoryCRules" label-width="120px">
        <el-form-item label="发票科目名称" prop="InvoiceAccountName">
          <el-input v-model="UpdateInvoiceAccountCFrom.InvoiceAccountName" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="UpdateInvoiceAccountCFrom.Sort" precision="0" :min="1" />
        </el-form-item>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button icon="el-icon-circle-check" v-loading.fullscreen.lock="LoadingUpdate" type="primary" @click="saveUpdate">保 存
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetInvoiceAccount,
  AddInvoiceAccount,
  UpdateInvoiceAccount,
  GetInvoiceAccountFirst,
  DeleteInvoiceAccount,
} from "@/api/SystemManagement";
import { showLoading, hideLoading } from "@/common/loading";
export default {
  name: 'InvoiceAccount',
  data() {
    return {
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
      InvoiceAccountList: [],
      AddInvoiceAccountFrom: {
        InvoiceAccountName: "",
        Sort: "",
      },
      UpdateInvoiceAccountCFrom: {
        InvoiceAccountName: "",
        Sort: "",
        InvoiceAccountCode: "",
      },
      pagenum: 1,
      pagesize: 10,
      AddInvoiceAccountRules: {
        InvoiceAccountName: [
          {
            required: true,
            message: "请输入发票科目名称",
            trigger: "blur",
          },
        ],
      },
      UpdateDicCategoryCRules: {
        InvoiceAccountName: [
          {
            required: true,
            message: "请输入发票科目名称",
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
    this._GetInvoiceAccount();
  },
  methods: {
    addClosed() {
      this.$refs.addRef.resetFields();
    },
    updateClosed() {
      this.$refs.updateRef.resetFields();
    },
    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this._GetInvoiceAccount();
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newSize) {
      this.queryInfo.pagenum = newSize;
      this._GetInvoiceAccount();
    },
    // 添加模块
    _AddInvoiceAccount() {
      this.addDialogVisible = true;
    },
    saveAdd() {
      this.LoadingAdd = true;
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) {
          this.LoadingAdd = false;
          return;
        }
        AddInvoiceAccount(this.AddInvoiceAccountFrom).then((res) => {
          if (res.success) {
            this.addDialogVisible = false;
            this.$message.success("操作成功");
            this._GetInvoiceAccount();
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
        UpdateInvoiceAccount(this.UpdateInvoiceAccountCFrom).then((res) => {
          if (res.success) {
            this.updateDialogVisible = false;
            this.$message.success("操作成功");
            this._GetInvoiceAccount();
          } else {
            this.$message.error(res.resultMessage);
          }
          this.LoadingUpdate = false;
        });
      });
    },
    _GetInvoiceAccountSearch() {
      this.queryInfo.pagenum = 1;
      this.queryInfo.pagesize = 20;
      this._GetInvoiceAccount();
    },
    // 获取数据
    _GetInvoiceAccount() {
      this.loading = true;
      GetInvoiceAccount(
        this.Name,
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      ).then((res) => {
        if (res.success) {
          this.InvoiceAccountList = res.result.list;
          this.total = res.result.totalNumber;
        } else {
          this.InvoiceAccountList = [];
          this.total = 0;
        }
        this.loading = false;
      });
    },

    // 删除信息
    async deleteDialog(InvoiceAccountCode) {
      const confirmResult = await this.$confirm(
        "此操作将删除该条, 是否继续?",
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
      DeleteInvoiceAccount(InvoiceAccountCode).then((res) => {
        if (res.success) {
          this.$message.success("操作成功！");
          this._GetInvoiceAccount();
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
    showEditDialog(InvoiceAccountCode) {
      GetInvoiceAccountFirst(InvoiceAccountCode).then((res) => {
        if (res.success) {
          this.UpdateInvoiceAccountCFrom = res.result;
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
