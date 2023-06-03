<template>
  <div style="padding: 8px;">
    <el-card>
      <el-row>
        <el-col :span="5">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="AddAdmin_Role">添 加
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="CardTableClass">
      <el-table v-loading="loading" highlight-current-row :data="imageTypeDatas" default-expand-all:true
                row-key="RoleCode"
      >
        <el-table-column prop="RoleName" label="角色名称" width="170" />
        <el-table-column prop="RoleDesciption" label="角色描述" width="170" />
        <el-table-column prop="UpdateUserName" label="修改人" width="170" />
        <el-table-column prop="UpdateTimeStr" label="修改时间" width="250" sortable>
          <template slot-scope="scope">
            <div v-if="scope.row.UpdateTimeStr">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.UpdateTimeStr }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="240">
          <template slot-scope="scope">
            <el-button v-if="scope.row.RoleName !== '超级管理员'" icon="el-icon-menu" type="text" size="mini"
                       @click="showManagementEditDialog(scope.row.RoleCode)"
            >模块管理</el-button>
            <el-button v-if="
              scope.row.RoleName !== '超级管理员' &&
                scope.row.RoleName !== '客服' &&
                scope.row.RoleName !== '财务' &&
                scope.row.RoleName !== '总客服' &&
                scope.row.RoleName !== '销售' &&
                scope.row.RoleName !== 'HRO' &&
                scope.row.RoleName !== '运营' &&
                scope.row.RoleName !== 'HRO管理员'
            " icon="el-icon-edit" type="text" size="mini" @click="showEditDialog(scope.row.RoleCode)"
            >编辑</el-button>
            <el-button v-if="
              scope.row.RoleName !== '超级管理员' &&
                scope.row.RoleName !== '客服' &&
                scope.row.RoleName !== '财务' &&
                scope.row.RoleName !== '总客服' &&
                scope.row.RoleName !== '销售' &&
                scope.row.RoleName !== 'HRO' &&
                scope.row.RoleName !== '运营' &&
                scope.row.RoleName !== 'HRO管理员'
            " icon="el-icon-delete" type="text" size="mini" @click="deleteDialog(scope.row.RoleCode)"
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

    <el-dialog title="添加角色" :visible.sync="addDialogVisible" width="30%">
      <el-form ref="addRef" :model="addAdmin_RoleFrom" :rules="addPermissionFromRules" label-width="80px">
        <el-form-item label="角色名称" prop="RoleName">
          <el-input v-model="addAdmin_RoleFrom.RoleName" />
        </el-form-item>
        <el-form-item label="角色描述" prop="RoleDesciption">
          <el-input v-model="addAdmin_RoleFrom.RoleDesciption" type="textarea" :rows="2" />
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
    <el-dialog :visible.sync="updateDialogVisible" width="30%">
      <div slot="title" class="dialog-title">
        <span>编辑角色</span>&#32;&#32;&#32;&#32;&#32;&#32;&emsp;&emsp;&emsp;
        <!-- <i class="el-icon-info" style="color: #66b1ff"></i>&#12288;&#12288;
        <div style="font-size: 13px; display: inline">
          <span>添加人:{{ CreateUserName }}</span>&#12288;&#12288;&#12288;&#12288;
          <span>添加时间:{{ CreateTime }}</span>&#12288;&#12288;&#12288;&#12288;
          <span>修改人:{{ UpdateUserName }}</span>&#12288;&#12288; <span>修改时间:{{ UpdateTime
          }}</span>&#12288;&#12288;&#12288;&#12288;
        </div> -->
      </div>
      <el-form ref="updateRef" :model="updateAdmin_RoleFrom" :rules="updateImageTypeFromRules"
               label-width="80px"
      >
        <el-form-item label="角色名称" prop="RoleName">
          <el-input v-model="updateAdmin_RoleFrom.RoleName" />
        </el-form-item>
        <el-form-item label="角色描述" prop="RoleDesciption">
          <el-input v-model="updateAdmin_RoleFrom.RoleDesciption" type="textarea" :rows="2" />
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

    <el-dialog :visible.sync="updateRoleDialogVisible" top="5vh" width="50%">
      <div slot="title" class="dialog-title">
        <span>模块管理</span>
      </div>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>选择模块进行关联</span>
          <el-button icon="el-icon-link" v-loading.fullscreen.lock="LoadingRoleUpdate" style="float: right;" type="primary"
                     @click="saveRoleUpdate"
          >绑 定</el-button>
        </div>
        <el-tree ref="tree" style="height: calc(100vh - 350px); overflow-y: scroll" :data="permissionTree"
                 show-checkbox:true show-checkbox default-expand-all:true node-key="id" highlight-current
        />
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetRoleManagement,
  GetAdmin_PermissionByRole,
  GetAdmin_PermissionByRoleID,
  BindRole_Permissions,
  AddAdmin_Role,
  GetAdmin_RoleFirst,
  UpdateAdmin_Role,
  DeleteAdmin_Role,
} from "@/api/SystemManagement";
import { showLoading, hideLoading } from "@/common/loading";
const moment = require("moment");
export default {
  name: 'RoleManagement',
  data() {
    return {
      LoadingUpdate: false,
      LoadingRoleUpdate: false,
      LoadingAdd: false,
      // 获取用户列表查询参数对象
      queryInfo: {
        pagenum: 1,
        pagesize: 20,
      },
      total: 0,
      addDialogVisible: false,
      updateDialogVisible: false,
      updateRoleDialogVisible: false,
      corp_id: "",
      imageTypeDatas: [],
      addAdmin_RoleFrom: {
        RoleName: "",
        RoleDesciption: "",
      },
      updateAdmin_RoleFrom: {
        RoleName: "",
        RoleDesciption: "",
        RoleCode: "",
      },
      pagenum: 1,
      pagesize: 10,
      addPermissionFromRules: {
        RoleName: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur",
          },
        ],
      },
      updateImageTypeFromRules: {
        RoleName: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur",
          },
        ],
      },
      loading: false,
      CreateUserName: "",
      CreateTime: "",
      UpdateUserName: "",
      UpdateTime: "",
      parentList: [],
      parentShow: false,
      permissionTree: [],
      bingdArray: {
        RoleCode: null,
        PermissionsArray: [],
      },
    };
  },
  watch: {
    // corp_id(newValue) {
    //   this.addAdmin_RoleFrom.corpid = newValue;
    //   this._getDep(newValue);
    // },
  },
  created() {
    this.GetRoleManagement();
  },
  methods: {
    // 父子级切换事件
    switchIfParentPermission(e) {
      if (e) this.parentShow = true;
      else this.parentShow = false;
    },
    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.GetRoleManagement();
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newSize) {
      this.queryInfo.pagenum = newSize;
      this.GetRoleManagement();
    },
    // 添加模块
    AddAdmin_Role() {
      this.addAdmin_RoleFrom.RoleName = "";
      this.addAdmin_RoleFrom.RoleDesciption = "";
      this.addDialogVisible = true;
    },
    saveAdd() {
      this.LoadingAdd = true;
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) {
          this.LoadingAdd = false;
          return;
        }
        AddAdmin_Role(this.addAdmin_RoleFrom).then((res) => {
          if (res.success) {
            this.addDialogVisible = false;
            this.$message.success("操作成功");
            this.GetRoleManagement();
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
        UpdateAdmin_Role(this.updateAdmin_RoleFrom).then((res) => {
          if (res.success) {
            this.updateDialogVisible = false;
            this.$message.success("操作成功");
            this.GetRoleManagement();
          } else {
            this.$message.error(res.resultMessage);
          }
          this.LoadingUpdate = false;
        });
      });
    },
    // 绑定模块操作
    saveRoleUpdate() {
      this.LoadingRoleUpdate = true;
      this.bingdArray.PermissionsArray = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
      console.log(this.bingdArray.PermissionsArray);
      BindRole_Permissions(this.bingdArray).then((res) => {
        if (res.success) {
          this.updateRoleDialogVisible = false;
          this.$message.success("操作成功，请刷新页面后查看");
          this.GetRoleManagement();
        } else {
          this.$message.error(res.resultMessage);
        }
        this.LoadingRoleUpdate = false;
      });
    },
    // 获取数据
    GetRoleManagement() {
      this.loading = true;
      GetRoleManagement(this.queryInfo.pagenum, this.queryInfo.pagesize).then(
        (res) => {
          if (res.success) {
            this.imageTypeDatas = res.result.list;
            this.total = res.result.totalNumber;
          } else {
            this.imageTypeDatas = [];
            this.total = 0;
          }
          this.loading = false;
        }
      );
    },

    // 删除信息
    async deleteDialog(RoleCode) {
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
      DeleteAdmin_Role(RoleCode).then((res) => {
        if (res.success) {
          this.$message.success("操作成功！");
          hideLoading();
          this.GetRoleManagement();
        } else {
          hideLoading();
          return this.$message.error(res.resultMessage);
        }
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
    // 编辑部门信息
    showEditDialog(RoleCode) {
      GetAdmin_RoleFirst(RoleCode).then((res) => {
        if (res.success) {
          this.updateAdmin_RoleFrom = res.result;
          this.CreateUserName = res.result.CreateUserName;
          this.CreateTime = moment(res.result.CreateTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          this.UpdateUserName = res.result.UpdateUserName;
          this.UpdateTime = moment(res.result.modified_time).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          this.updateDialogVisible = true;
        } else {
          return this.$message.error("数据获取失败！");
        }
      });
    },

    // 模块管理反填数据
    showManagementEditDialog(RoleCode) {
      this.bingdArray.RoleCode = RoleCode;
      GetAdmin_PermissionByRole().then((res) => {
        if (res.success) {
          this.permissionTree = res.result;
          GetAdmin_PermissionByRoleID(RoleCode).then((res) => {
            if (res.success) {
              this.$refs.tree.setCheckedKeys(res.result);
            } else {
            }
          });
          if (res.result.IfParentPermission) this.parentShowUpdate = true;
          else this.parentShowUpdate = false;

          this.updateRoleDialogVisible = true;
          this.updateAdmin_RoleFrom.ConfigID = RoleCode;
        } else {
          return this.$message.error("数据获取失败！");
        }
      });
    },
  },
};
</script>

<style scoped></style>
