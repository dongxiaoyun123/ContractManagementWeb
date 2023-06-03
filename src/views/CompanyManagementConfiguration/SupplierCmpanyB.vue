<template>
  <div style="padding: 8px;">
    <el-card>
      <el-row>
        <el-col :xs="16" :sm="5" :md="5" :lg="5" :xl="5">
          <el-input v-model="SupplierCmpanyBName" placeholder="乙方公司名称" class="input-with-select" clearable="">
            <el-button slot="append" icon="el-icon-search" @click="GetSupplierSearch" />
          </el-input>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <el-button type="primary" style="margin-left: 15px" icon="el-icon-circle-plus-outline"
                     @click="AddSupplierCmpanyB"
          >添 加</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="CardTableClass">
      <el-table v-loading="loading" highlight-current-row :data="SupplierCmpanyBList"
                row-key="SupplierCmpanyBCode"
      >
        <el-table-column prop="SupplierCmpanyBCode" label="乙方公司编号" width="350" />
        <el-table-column prop="SupplierCmpanyBName" label="乙方公司名称" width="300" show-overflow-tooltip />
        <el-table-column prop="SupplierCmpanyBNumber" label="自定义编号" width="200" sortable />
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" type="text" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
            <el-button icon="el-icon-delete" type="text" size="mini"
                       @click="deleteDialog(scope.row.SupplierCmpanyBCode)"
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

    <el-dialog title="添加乙方公司" :visible.sync="addDialogVisible" width="30%" @close="addDialogClosed">
      <el-form ref="addRef" :model="AddSupplierFrom" :rules="AddSupplierRules" label-width="120px">
        <el-form-item label="乙方公司名称" prop="SupplierCmpanyBName">
          <el-input v-model="AddSupplierFrom.SupplierCmpanyBName" />
        </el-form-item>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button icon="el-icon-circle-check" v-loading.fullscreen.lock="LoadingAdd" type="primary" @click="saveAdd">保 存</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="updateDialogVisible" width="30%" @close="updateDialogClosed">
      <div slot="title" class="dialog-title">
        <span>编辑乙方公司</span>&#32;&#32;&#32;&#32;&#32;&#32;&emsp;&emsp;&emsp;
      </div>
      <el-form ref="updateRef" :model="UpdateSupplierFrom" :rules="updateImageTypeFromRules"
               label-width="120px"
      >
        <el-form-item label="乙方公司名称" prop="SupplierCmpanyBName">
          <el-input v-model="UpdateSupplierFrom.SupplierCmpanyBName" />
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
  GetSupplierCmpanyB,
  AddSupplierCmpanyB,
  UpdateSupplierCmpanyB,
  DeleteSupplierCmpanyB,
} from "@/api/SystemManagement";
import { showLoading, hideLoading } from "@/common/loading";
const moment = require("moment");
export default {
  name: 'SupplierCmpanyB',
  data() {
    return {
      SupplierCmpanyBName: "",
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
      SupplierCmpanyBList: [],
      AddSupplierFrom: {
        SupplierCmpanyBName: "",
      },
      UpdateSupplierFrom: {
        SupplierCmpanyBName: "",
        SupplierCmpanyBCode: "",
      },
      pagenum: 1,
      pagesize: 10,
      AddSupplierRules: {
        SupplierCmpanyBName: [
          {
            required: true,
            message: "请输入乙方公司名称",
            trigger: "blur",
          },
        ],
      },
      updateImageTypeFromRules: {
        SupplierCmpanyBName: [
          {
            required: true,
            message: "请输入乙方公司名称",
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
    this.GetSupplierCmpanyB();
  },
  methods: {
    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.GetSupplierCmpanyB();
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newSize) {
      this.queryInfo.pagenum = newSize;
      this.GetSupplierCmpanyB();
    },
    // 添加
    AddSupplierCmpanyB() {
      this.addDialogVisible = true;
    },
    saveAdd() {
      this.LoadingAdd = true;
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) {
          this.LoadingAdd = false;
          return;
        }
        AddSupplierCmpanyB(this.AddSupplierFrom).then((res) => {
          if (res.success) {
            this.addDialogVisible = false;
            this.$message.success("操作成功");
            this.GetSupplierCmpanyB();
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
        UpdateSupplierCmpanyB(this.UpdateSupplierFrom).then((res) => {
          if (res.success) {
            this.updateDialogVisible = false;
            this.$message.success("操作成功");
            this.GetSupplierCmpanyB();
          } else {
            this.$message.error(res.resultMessage);
          }
          this.LoadingUpdate = false;
        });
      });
    },
    GetSupplierSearch() {
      this.queryInfo.pagenum = 1;
      this.queryInfo.pagesize = 20;
      this.GetSupplierCmpanyB();
    },
    // 获取数据
    GetSupplierCmpanyB() {
      this.loading = true;
      GetSupplierCmpanyB(
        this.SupplierCmpanyBName,
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      ).then((res) => {
        if (res.success) {
          this.SupplierCmpanyBList = res.result.list;
          this.total = res.result.totalNumber;
        } else {
          this.SupplierCmpanyBList = [];
          this.total = 0;
        }
        this.loading = false;
      });
    },

    // 删除信息
    async deleteDialog(SupplierCmpanyBCode) {
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
      DeleteSupplierCmpanyB(SupplierCmpanyBCode).then((res) => {
        if (res.success) {
          this.$message.success("操作成功！");
          this.GetSupplierCmpanyB();
        } else {
          hideLoading();
          return this.$message.error(res.resultMessage);
        }
        hideLoading();
      });
    },
    // 关闭弹框事件
    addDialogClosed() {
      this.$refs.addRef.resetFields();
    },
    // 关闭弹框事件
    updateDialogClosed() {
      this.$refs.updateRef.resetFields();
    },
    // 编辑用户信息
    showEditDialog(item) {
      this.UpdateSupplierFrom.SupplierCmpanyBCode = item.SupplierCmpanyBCode;
      this.UpdateSupplierFrom.SupplierCmpanyBName = item.SupplierCmpanyBName;
      this.updateDialogVisible = true;
    },
  },
};
</script>

<style scoped></style>
