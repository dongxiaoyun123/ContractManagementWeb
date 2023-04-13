<template>
  <div style="padding: 8px;">
    <el-card>
      <el-row>
        <el-col :span="10">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="AddPermission">添 加
          </el-button>
          <!-- <el-tag style="margin-left:15px ;" type="danger" >添加完成后在角色管理中配置相关模块刷新（F5）即可显示</el-tag> -->
        </el-col>
      </el-row>
    </el-card>
    <el-card class="CardTableClass">
      <el-table v-loading="loading" highlight-current-row :data="imageTypeDatas" default-expand-all:true
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" row-key="PermissionCode"
      >
        <el-table-column prop="PermissionName" label="模块名称" min-width="120" />
        <el-table-column prop="PermissionDescription" label="模块描述" min-width="120" />
        <el-table-column prop="PermissionUrl" show-overflow-tooltip label="模块地址" min-width="150" />
        <el-table-column prop="UpdateUserName" label="修改人" show-overflow-tooltip />
        <el-table-column prop="UpdateTimeStr" label="修改时间" min-width="170">
          <template slot-scope="scope">
            <div v-if="scope.row.UpdateTimeStr">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.UpdateTimeStr }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="OrderBy" label="排序" sortable />
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" type="text" size="mini"
                       @click="showEditDialog(scope.row.PermissionCode)"
            >编辑</el-button>
            <el-button icon="el-icon-delete" type="text" size="mini"
                       @click="deleteDialog(scope.row.PermissionCode)"
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

    <el-dialog title="添加模块" :visible.sync="addDialogVisible" width="50%">
      <el-form ref="addRef" :model="addPermissionFrom" :rules="addPermissionFromRules" label-width="120px">
        <el-form-item label="是否是父级模块">
          <el-switch v-model="addPermissionFrom.IfParentPermission" active-color="#1E90FF" inactive-color="#FFB6C1"
                     active-text="是" inactive-text="否" @change="switchIfParentPermission"
          />
        </el-form-item>
        <el-form-item label="父级模块" prop="ParentCode">
          <el-select v-model="addPermissionFrom.ParentCode" placeholder="请选择" clearable="" filterable
                     :disabled="parentShow"
          >
            <el-option v-for="item in parentList" :key="item.PermissionCode" :label="item.PermissionName"
                       :value="item.PermissionCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="模块名称" prop="PermissionName">
          <el-input v-model="addPermissionFrom.PermissionName" />
        </el-form-item>
        <el-form-item label="模块描述" prop="PermissionDescription">
          <el-input v-model="addPermissionFrom.PermissionDescription" type="textarea" :rows="2" />
        </el-form-item>
        <el-form-item label="模块地址" prop="PermissionUrl">
          <el-input v-model="addPermissionFrom.PermissionUrl" :disabled="parentShow" />
        </el-form-item>
        <el-form-item label="模块图标">
          <el-input v-model="addPermissionFrom.ParentIcon" placeholder="如果有需要管理员添加" />
        </el-form-item>
        <el-form-item label="排序" prop="OrderBy">
          <el-input v-model="addPermissionFrom.OrderBy" />
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
    <el-dialog :visible.sync="updateDialogVisible" width="50%">
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
      <el-form ref="updateRef" :model="updatePermissionFrom" :rules="updateImageTypeFromRules"
               label-width="120px"
      >
        <el-form-item label="是否是父级模块">
          <el-switch v-model="updatePermissionFrom.IfParentPermission" active-color="#1E90FF" inactive-color="#FFB6C1"
                     active-text="是" inactive-text="否" :disabled="true" @change="switchIfParentPermission"
          />
        </el-form-item>
        <el-form-item label="父级模块" prop="ParentCode">
          <el-select v-model="updatePermissionFrom.ParentCode" placeholder="请选择" clearable="" filterable :disabled="true">
            <el-option v-for="item in parentList" :key="item.PermissionCode" :label="item.PermissionName"
                       :value="item.PermissionCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="模块名称" prop="PermissionName">
          <el-input v-model="updatePermissionFrom.PermissionName" />
        </el-form-item>
        <el-form-item label="模块描述" prop="PermissionDescription">
          <el-input v-model="updatePermissionFrom.PermissionDescription" type="textarea" :rows="2" />
        </el-form-item>
        <el-form-item label="模块地址" prop="PermissionUrl">
          <el-input v-model="updatePermissionFrom.PermissionUrl" :disabled="parentShowUpdate" />
        </el-form-item>
        <el-form-item label="模块图标">
          <el-input v-model="updatePermissionFrom.ParentIcon" placeholder="如果有需要管理员添加" />
        </el-form-item>
        <el-form-item label="排序" prop="OrderBy">
          <el-input v-model="updatePermissionFrom.OrderBy" />
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
  GetAdmin_Permission,
  GetParentAdmin_Permission,
  AddPermission,
  GetPermissionFirst,
  UpdatePermission,
  DeletePermission,
} from "@/api/SystemManagement";
import { showLoading, hideLoading } from "@/common/loading";
const moment = require("moment");
export default {
  data() {
    return {
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
      corp_id: "",
      imageTypeDatas: [],
      addPermissionFrom: {
        IfParentPermission: false,
        PermissionName: "",
        PermissionDescription: "",
        PermissionUrl: "",
        ParentIcon: "",
        ParentCode: "",
        OrderBy: "",
      },
      updatePermissionFrom: {
        IfParentPermission: false,
        PermissionCode: "",
        PermissionName: "",
        PermissionDescription: "",
        PermissionUrl: "",
        ParentIcon: "",
        ParentCode: "",
        OrderBy: "",
      },
      pagenum: 1,
      pagesize: 10,
      addPermissionFromRules: {
        PermissionName: [
          {
            required: true,
            message: "请输入模块名称",
            trigger: "blur",
          },
        ],
        OrderBy: [
          {
            required: true,
            pattern: /^((?!0)\d{1,9})$/,
            message: "只能输入正整数",
            trigger: "blur",
          },
        ],
      },
      updateImageTypeFromRules: {
        PermissionName: [
          {
            required: true,
            message: "请输入模块名称",
            trigger: "blur",
          },
        ],
        OrderBy: [
          {
            required: true,
            pattern: /^((?!0)\d{1,9})$/,
            message: "只能输入正整数",
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
      parentShowUpdate: false,
    };
  },
  watch: {
    // corp_id(newValue) {
    //   this.addPermissionFrom.corpid = newValue;
    //   this._getDep(newValue);
    // },
  },
  created() {
    this.GetAdmin_Permission();
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
      this.GetAdmin_Permission();
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newSize) {
      this.queryInfo.pagenum = newSize;
      this.GetAdmin_Permission();
    },
    // 添加模块
    AddPermission() {
      this.addPermissionFrom.IfParentPermission = false;
      this.addPermissionFrom.PermissionName = "";
      this.addPermissionFrom.PermissionDescription = "";
      this.addPermissionFrom.PermissionUrl = "";
      this.addPermissionFrom.ParentIcon = "";
      this.addPermissionFrom.ParentCode = "";
      this.addPermissionFrom.OrderBy = "";
      this.parentShow = false;
      GetParentAdmin_Permission(false).then((res) => {
        if (res.success) {
          this.parentList = res.result;
        } else {
          this.parentList = [];
        }
        this.LoadingAdd = false;
      });
      this.addDialogVisible = true;
    },
    saveAdd() {
      this.LoadingAdd = true;
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) {
          this.LoadingAdd = false;
          return;
        }
        AddPermission(this.addPermissionFrom).then((res) => {
          if (res.success) {
            this.addDialogVisible = false;
            this.$message.success("操作成功");
            this.GetAdmin_Permission();
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
        UpdatePermission(this.updatePermissionFrom).then((res) => {
          if (res.success) {
            this.updateDialogVisible = false;
            this.$message.success("操作成功");
            this.GetAdmin_Permission();
          } else {
            this.$message.error(res.resultMessage);
          }
          this.LoadingUpdate = false;
        });
      });
    },
    // 获取数据
    GetAdmin_Permission() {
      this.loading = true;
      GetAdmin_Permission(this.queryInfo.pagenum, this.queryInfo.pagesize).then(
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
    async deleteDialog(PermissionCode) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该条, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      // 点击确定 返回值为：confirm
      // 点击取消 返回值为： cancel
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      showLoading();
      DeletePermission(PermissionCode).then((res) => {
        if (res.success) {
          this.$message.success("操作成功！");
          this.GetAdmin_Permission();
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
    // 编辑部门信息
    showEditDialog(PermissionCode) {
      GetPermissionFirst(PermissionCode).then((res) => {
        if (res.success) {
          this.updatePermissionFrom = res.result;
          this.CreateUserName = res.result.CreateUserName;
          this.CreateTime = moment(res.result.CreateTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          this.UpdateUserName = res.result.UpdateUserName;
          this.UpdateTime = moment(res.result.modified_time).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          GetParentAdmin_Permission(true).then((res) => {
            if (res.success) {
              this.parentList = res.result;
            } else {
              this.parentList = [];
            }
            this.LoadingAdd = false;
          });

          if (res.result.IfParentPermission) this.parentShowUpdate = true;
          else this.parentShowUpdate = false;

          this.updateDialogVisible = true;
          this.updatePermissionFrom.ConfigID = PermissionCode;
        } else {
          return this.$message.error("数据获取失败！");
        }
      });
    },
  },
};
</script>

<style scoped></style>
