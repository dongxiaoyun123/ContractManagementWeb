<template>
  <div style="padding: 8px;">
    <el-card>
      <el-row>
        <el-col :span="4">
          <el-input v-model="Name" placeholder="供应商名称" class="input-with-select" clearable="">
            <el-button slot="append" icon="el-icon-search" @click="GetSupplierSearch" />
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" style="margin-left: 15px" icon="el-icon-circle-plus-outline" @click="AddAdminUser">添 加</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-table v-loading="loading" :data="DepartmentList" border
                  height="calc(100vh - 260px)" row-key="id"
        >
          <el-table-column prop="Id" label="供应商编号" align="center" width="100" />
          <el-table-column prop="Name" label="供应商名称" align="center" width="250" />
          <el-table-column prop="CreateTimeStr" label="创建时间" align="center" width="250" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
              <el-button type="text" size="mini" @click="deleteDialog(scope.row.Id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页区域 -->
        <el-pagination background :current-page="queryInfo.pagenum" :page-sizes="[20, 50, 100]"
                       :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"
                       @size-change="handleSizeChange" @current-change="handleCurrentChange"
        />
      </el-row>
    </el-card>

    <el-dialog title="添加供应商" :visible.sync="addDialogVisible" top="5vh" width="50%" @close="addDialogClosed">
      <el-form ref="addRef" :model="AddSupplierFrom" :rules="AddSupplierRules" label-width="150px">
        <el-form-item label="供应商名称" prop="Name">
          <el-input v-model="AddSupplierFrom.Name" />
        </el-form-item>
        <el-row class="buttonCenter">
          <el-col>
            <el-button v-loading.fullscreen.lock="LoadingAdd" type="primary" @click="saveAdd">确 定</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="updateDialogVisible" top="5vh" width="50%" @close="updateDialogClosed">
      <div slot="title" class="dialog-title">
        <span>编辑供应商</span>&#32;&#32;&#32;&#32;&#32;&#32;&emsp;&emsp;&emsp;
      </div>
      <el-form ref="updateRef" :model="UpdateSupplierFrom" :rules="updateImageTypeFromRules" label-width="150px">
        <el-form-item label="供应商名称" prop="Name">
          <el-input v-model="UpdateSupplierFrom.Name" />
        </el-form-item>

        <el-row class="buttonCenter">
          <el-col>
            <el-button v-loading.fullscreen.lock="LoadingUpdate" type="primary" @click="saveUpdate">确 定</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetSupplier,
  AddSupplier,
  UpdateSupplier,
  DeleteSupplier,
} from "@/api/SystemManagement";
import { showLoading, hideLoading } from "@/common/loading";
const moment = require("moment");
export default {
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
      DepartmentList: [],
      AddSupplierFrom: {
        Name: "",
      },
      UpdateSupplierFrom: {
        Name: "",
        Id: "",
      },
      pagenum: 1,
      pagesize: 10,
      AddSupplierRules: {
        Name: [
          {
            required: true,
            message: "请输入供应商名称",
            trigger: "blur",
          },
        ],
      },
      updateImageTypeFromRules: {
        Name: [
          {
            required: true,
            message: "请输入供应商名称",
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
    this.GetSupplier();
  },
  methods: {
    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.GetSupplier();
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newSize) {
      this.queryInfo.pagenum = newSize;
      this.GetSupplier();
    },
    // 添加模块
    AddAdminUser() {
      this.AddSupplierFrom.Name = "";
      this.addDialogVisible = true;
    },
    saveAdd() {
      this.LoadingAdd = true;
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) {
          this.LoadingAdd = false;
          return;
        }
        AddSupplier(this.AddSupplierFrom).then((res) => {
          if (res.success) {
            this.addDialogVisible = false;
            this.$message.success("操作成功");
            this.GetSupplier();
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
        UpdateSupplier(this.UpdateSupplierFrom).then((res) => {
          if (res.success) {
            this.updateDialogVisible = false;
            this.$message.success("操作成功");
            this.GetSupplier();
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
      this.GetSupplier();
    },
    // 获取数据
    GetSupplier() {
      this.loading = true;
      GetSupplier(
        this.Name,
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
    async deleteDialog(Id) {
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
      DeleteSupplier(Id).then((res) => {
        if (res.success) {
          this.$message.success("操作成功！");
          this.GetSupplier();
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
      this.UpdateSupplierFrom.Id = item.Id;
      this.UpdateSupplierFrom.Name = item.Name;
      this.updateDialogVisible = true;
    },
  },
};
</script>

<style scoped>
</style>
