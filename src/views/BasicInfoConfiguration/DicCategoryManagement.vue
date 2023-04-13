<template>
  <div style="padding: 8px;">
    <el-card>
      <el-row>
        <el-col :xs="16" :sm="5" :md="5" :lg="5" :xl="5">
          <el-input v-model="Name" placeholder="合同类型名称" class="input-with-select" clearable="">
            <el-button slot="append" icon="el-icon-search" @click="GetDicCategorySearch" />
          </el-input>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <el-button type="primary" style="margin-left: 15px" icon="el-icon-circle-plus-outline"
                     @click="AddDicCategory"
          >添 加</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="CardTableClass">
      <el-table v-loading="loading" highlight-current-row :data="DicCategoryList" row-key="id">
        <el-table-column prop="Code" label="合同类型编号" width="140" />
        <el-table-column prop="Name" label="合同类型名称" width="140" />
        <el-table-column prop="Sort" label="排序" width="140" sortable />
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" type="text" size="mini" @click="showEditDialog(scope.row.Code)">编辑
            </el-button>
            <el-button icon="el-icon-delete" type="text" size="mini" @click="deleteDialog(scope.row.Code)">删除
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

    <el-dialog title="添加合同类型" :visible.sync="addDialogVisible" width="30%">
      <el-form ref="addRef" :model="AddDicCategoryFrom" :rules="AddDicCategoryRules" label-width="120px">
        <el-form-item label="合同类型名称" prop="Name">
          <el-input v-model="AddDicCategoryFrom.Name" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="AddDicCategoryFrom.Sort" precision="0" :min="1" />
        </el-form-item>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button v-loading.fullscreen.lock="LoadingAdd" type="primary" @click="saveAdd">确 定
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="updateDialogVisible" width="30%">
      <div slot="title" class="dialog-title">
        <span>编辑合同类型</span>
      </div>
      <el-form ref="updateRef" :model="UpdateDicCategoryFrom" :rules="updateDicCategoryRules"
               label-width="120px"
      >
        <el-form-item label="合同类型名称" prop="Name">
          <el-input v-model="UpdateDicCategoryFrom.Name" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="UpdateDicCategoryFrom.Sort" precision="0" :min="1" />
        </el-form-item>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button v-loading.fullscreen.lock="LoadingUpdate" type="primary" @click="saveUpdate">确 定
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetDicCategory,
  AddDicCategory,
  GetDicCategoryFirst,
  UpdateDicCategory,
  DeleteDicCategory,
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
      DicCategoryList: [],
      AddDicCategoryFrom: {
        Name: "",
        Sort: "",
      },
      UpdateDicCategoryFrom: {
        Name: "",
        Sort: "",
        Code: "",
      },
      pagenum: 1,
      pagesize: 10,
      AddDicCategoryRules: {
        Name: [
          {
            required: true,
            message: "请输入合同类型名称",
            trigger: "blur",
          },
        ],
      },
      updateDicCategoryRules: {
        Name: [
          {
            required: true,
            message: "请输入合同类型名称",
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
    this.GetDicCategory();
  },
  methods: {
    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.GetDicCategory();
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newSize) {
      this.queryInfo.pagenum = newSize;
      this.GetDicCategory();
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
            this.GetDicCategory();
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
            this.GetDicCategory();
          } else {
            this.$message.error(res.resultMessage);
          }
          this.LoadingUpdate = false;
        });
      });
    },
    GetDicCategorySearch() {
      this.queryInfo.pagenum = 1;
      this.queryInfo.pagesize = 20;
      this.GetDicCategory();
    },
    // 获取数据
    GetDicCategory() {
      this.loading = true;
      GetDicCategory(
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
      DeleteDicCategory(Code).then((res) => {
        if (res.success) {
          this.$message.success("操作成功！");
          this.GetDicCategory();
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
      GetDicCategoryFirst(Code).then((res) => {
        if (res.success) {
          this.UpdateDicCategoryFrom = res.result;
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
