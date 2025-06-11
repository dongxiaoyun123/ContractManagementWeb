<template>
  <div style="padding: 8px">
    <el-card>
      <el-form label-width="60px">
        <!-- 合同信息 -->
        <div slot="header" class="clearfix">
          <span>合同信息</span>
        </div>
        <el-row>
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item :style="formShow" label="姓名">
                <el-input
                  v-model="User_RealName"
                  class="FormClass"
                  placeholder="真实姓名"
                  clearable=""
                />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item label="角色">
                <el-select
                  v-model="RoleCode"
                  class="FormClass"
                  filterable
                  placeholder="请选择"
                  clearable=""
                >
                  <el-option
                    v-for="item in RoleDatas"
                    :key="item.RoleCode"
                    :label="item.RoleName"
                    :value="item.RoleCode"
                    :disabled="item.Disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item :style="formShow" label="部门">
                <el-select
                  v-model="DepartmentCode"
                  class="FormClass"
                  filterable
                  placeholder="部门名称"
                  clearable=""
                >
                  <el-option
                    v-for="item in DepartmentList"
                    :key="item.DepartmentCode"
                    :label="item.DepartmentName"
                    :value="item.DepartmentCode"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item :style="formShow" label="状态">
                <el-select
                  v-model="PositionStatus"
                  class="FormClass"
                  filterable
                  placeholder="状态"
                  clearable=""
                >
                  <el-option key="0" label="在职" value="0" />
                  <el-option key="1" label="离职" value="1" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-button-group style="margin-left: 1rem">
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  @click="GetAdmin_UserSearch"
                >查 询
                </el-button>
                <el-button
                  type="success"
                  icon="el-icon-circle-plus-outline"
                  @click="AddAdminUser"
                >添 加
                </el-button>
                <el-button
                  type="warning"
                  icon="el-icon-download"
                  @click="showManagementExportDialog(1)"
                >合同导出权限
                </el-button>
                <el-button
                  type="danger"
                  icon="el-icon-circle-check"
                  @click="showManagementExportDialog(2)"
                >业务渠道权限
                </el-button>
              </el-button-group>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="CardTableClass">
      <el-table
        v-loading="loading"
        highlight-current-row
        :data="Admin_UserDatas"
        default-expand-all:true
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        row-key="User_ID"
      >
        <el-table-column
          sortable
          prop="User_Account"
          label="登录名"
          show-overflow-tooltip
          min-width="120"
        />
        <el-table-column
          prop="User_RealName"
          label="真实姓名"
          min-width="120"
        />
        <el-table-column
          sortable
          prop="RoleName"
          label="角色名称"
          min-width="120"
        />
        <el-table-column
          sortable
          prop="DepartmentName"
          label="部门名称"
          min-width="180"
          show-overflow-tooltip
        />
        <el-table-column
          sortable
          prop="User_Post"
          label="职务"
          min-width="120"
          show-overflow-tooltip
        />
        <el-table-column sortable prop="Phone" label="电话" min-width="120" />
        <el-table-column
          sortable
          prop="PositionStatusName"
          label="状态"
          min-width="100"
        />
        <el-table-column
          prop="UpdateUserName"
          label="修改人"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          prop="modified_timeStr"
          label="修改时间"
          min-width="170"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.modified_timeStr">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{
                scope.row.modified_timeStr
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="fixedLeftShow"
          label="操作"
          width="250"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit"
              type="text"
              size="mini"
              @click="showEditDialog(scope.row.User_ID)"
            >编辑</el-button>
            <el-button
              icon="el-icon-delete"
              type="text"
              size="mini"
              @click="deleteDialog(scope.row.User_ID)"
            >删除</el-button>
            <el-dropdown
              @command="
                (command) => {
                  handleCommand(command, scope.row.User_ID);
                }
              "
            >
              <el-button type="text" size="mini">
                更多操作<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a" icon="el-icon-document-copy">绑定合同类型</el-dropdown-item>
                <el-dropdown-item command="b" icon="el-icon-user">下级人员绑定</el-dropdown-item>
                <el-dropdown-item command="c" icon="el-icon-unlock">修改密码</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column v-else label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit"
              type="text"
              size="mini"
              @click="showEditDialog(scope.row.User_ID)"
            >编辑</el-button>
            <el-button
              icon="el-icon-delete"
              type="text"
              size="mini"
              @click="deleteDialog(scope.row.User_ID)"
            >删除</el-button>
            <el-dropdown
              @command="
                (command) => {
                  handleCommand(command, scope.row.User_ID);
                }
              "
            >
              <el-button type="text" size="mini">
                更多操作<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a" icon="el-icon-document-copy">绑定合同类型</el-dropdown-item>
                <el-dropdown-item command="b" icon="el-icon-user">下级人员绑定</el-dropdown-item>
                <el-dropdown-item command="c" icon="el-icon-unlock">修改密码</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        background
        :current-page="queryInfo.pagenum"
        :page-sizes="[20, 50, 100]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>

    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%">
      <el-form
        ref="addRef"
        :model="AddAdmin_UserFrom"
        :rules="AddAdmin_UserFromRules"
        label-width="120px"
      >
        <el-form-item label="登录名" prop="User_Account">
          <el-input v-model="AddAdmin_UserFrom.User_Account" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="User_RealName">
          <el-input v-model="AddAdmin_UserFrom.User_RealName" />
        </el-form-item>

        <el-form-item label="密码" prop="User_Pwd">
          <el-input v-model="AddAdmin_UserFrom.User_Pwd" show-password />
        </el-form-item>
        <el-form-item label="角色" prop="RoleCode">
          <el-select
            v-model="AddAdmin_UserFrom.RoleCode"
            filterable
            placeholder="请选择"
            clearable=""
            style="width: 50%"
          >
            <el-option
              v-for="item in RoleDatas"
              :key="item.RoleCode"
              :label="item.RoleName"
              :value="item.RoleCode"
              :disabled="item.Disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="DepartmentCode">
          <el-select
            v-model="AddAdmin_UserFrom.DepartmentCode"
            filterable
            placeholder="请选择"
            clearable=""
            style="width: 50%"
          >
            <el-option
              v-for="item in DepartmentList"
              :key="item.DepartmentCode"
              :label="item.DepartmentName"
              :value="item.DepartmentCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="职务">
          <el-input v-model="AddAdmin_UserFrom.User_Post" />
        </el-form-item>
        <el-form-item label="手机" prop="Phone">
          <el-input v-model="AddAdmin_UserFrom.Phone" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="AddAdmin_UserFrom.PositionStatus">
            <el-radio :label="0">在职</el-radio>
            <el-radio :label="1">离职</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button
              v-loading.fullscreen.lock="LoadingAdd"
              icon="el-icon-circle-check"
              type="primary"
              @click="saveAdd"
            >保 存
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="updateDialogVisible" width="50%">
      <div slot="title" class="dialog-title">
        <span>编辑用户</span>&#32;&#32;&#32;&#32;&#32;&#32;&emsp;&emsp;&emsp;
        <i class="el-icon-info" style="color: #66b1ff" />&#12288;&#12288;
        <div style="font-size: 13px; display: inline">
          <span>添加人:{{ CreateUserName }}</span>&#12288;&#12288;&#12288;&#12288;
          <span>添加时间:{{ CreateTime }}</span>&#12288;&#12288;&#12288;&#12288;
          <span>修改人:{{ UpdateUserName }}</span>&#12288;&#12288; <span>修改时间:{{ UpdateTime }}</span>&#12288;&#12288;&#12288;&#12288;
        </div>
      </div>
      <el-form
        ref="updateRef"
        :model="UpdateAdmin_UserFrom"
        :rules="updateImageTypeFromRules"
        label-width="120px"
      >
        <el-form-item label="登录名" prop="User_Account">
          <el-input v-model="UpdateAdmin_UserFrom.User_Account" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="User_RealName">
          <el-input v-model="UpdateAdmin_UserFrom.User_RealName" />
        </el-form-item>
        <el-form-item label="角色" prop="RoleCode">
          <el-select
            v-model="UpdateAdmin_UserFrom.RoleCode"
            filterable
            placeholder="请选择"
            clearable=""
            style="width: 50%"
          >
            <el-option
              v-for="item in RoleDatas"
              :key="item.RoleCode"
              :label="item.RoleName"
              :value="item.RoleCode"
              :disabled="item.Disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="DepartmentCode">
          <el-select
            v-model="UpdateAdmin_UserFrom.DepartmentCode"
            filterable
            placeholder="请选择"
            clearable=""
            style="width: 50%"
          >
            <el-option
              v-for="item in DepartmentList"
              :key="item.DepartmentCode"
              :label="item.DepartmentName"
              :value="item.DepartmentCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="职务">
          <el-input v-model="UpdateAdmin_UserFrom.User_Post" />
        </el-form-item>
        <el-form-item label="手机" prop="Phone">
          <el-input v-model="UpdateAdmin_UserFrom.Phone" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="UpdateAdmin_UserFrom.PositionStatus">
            <el-radio :label="0">在职</el-radio>
            <el-radio :label="1">离职</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button
              v-loading.fullscreen.lock="LoadingUpdate"
              icon="el-icon-circle-check"
              type="primary"
              @click="saveUpdate"
            >保 存
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 修改密码对话框 -->
    <el-dialog
      title="修改密码"
      :visible.sync="updatePasswordVisible"
      width="30%"
    >
      <!-- 内容主体 -->
      <el-form
        ref="updatePasswordRef"
        :model="updatePassword"
        :rules="updatePasswordRules"
        label-width="100px"
      >
        <el-form-item label="新密码" prop="User_Pwd">
          <el-input v-model="updatePassword.User_Pwd" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmLogin_password">
          <el-input
            v-model="updatePassword.confirmLogin_password"
            show-password
          />
        </el-form-item>
      </el-form>
      <el-divider />
      <el-row class="buttonCenter">
        <el-col>
          <el-button
            v-loading.fullscreen.lock="UpdatePasswordLoading"
            icon="el-icon-circle-check"
            type="primary"
            @click="updatePasswordCommitClick"
          >保 存
          </el-button>
        </el-col>
      </el-row>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="updatePasswordVisible = false" >取 消</el-button>
        <el-button type="primary" v-loading.fullscreen.lock="UpdatePasswordLoading" @click="updatePasswordCommitClick"
          >确 定
        </el-button>
      </span> -->
    </el-dialog>
    <!-- 绑定合同类型 -->
    <el-dialog :visible.sync="updateRoleDialogVisible" top="5vh" width="50%">
      <div slot="title" class="dialog-title">
        <span>合同类型管理</span>
      </div>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>选择合同类型进行关联</span>
          <el-button
            icon="el-icon-link"
            style="float: right"
            type="primary"
            :loading="LoadingRoleUpdate"
            @click="saveUserUpdate"
          >关 联
          </el-button>
        </div>
        <el-tree
          ref="tree1"
          style="height: calc(100vh - 350px); overflow-y: scroll"
          :data="permissionTree"
          show-checkbox:true
          show-checkbox
          default-expand-all
          node-key="id"
          highlight-current
        />
      </el-card>
    </el-dialog>
    <!-- 绑定用户 -->
    <el-dialog :visible.sync="updateRoleDialogVisible1" top="5vh" width="50%">
      <div slot="title" class="dialog-title">
        <span>下级人员绑定</span>
      </div>
      <el-card class="box-card">
        <el-row>
          <el-col :span="16">
            <el-input
              v-model="filterText"
              placeholder="输入用户进行过滤"
              clearable=""
            />
          </el-col>
          <el-col :span="8" style="text-align: right">
            <!-- <el-switch v-model="PositionStatusFlag" style="margin-top: 7px;margin-right: 40px;" active-color="#13ce66"
              inactive-color="#ff4949" active-text="在职" inactive-text="离职" @change="changePositionStatus" /> -->
            <el-checkbox
              v-model="PositionStatusFlag"
              style="margin-top: 7px; margin-right: 40px"
              @change="changePositionStatus"
            >在职</el-checkbox>
            <el-button
              icon="el-icon-link"
              style="float: right"
              type="primary"
              :loading="LoadingRoleUpdate1"
              @click="saveUserUpdate1"
            >关 联
            </el-button>
          </el-col>
        </el-row>
        <el-tree
          ref="tree2"
          style="
            height: calc(100vh - 300px);
            overflow-y: scroll;
            margin-top: 20px;
          "
          :data="permissionTree"
          show-checkbox:true
          show-checkbox
          node-key="id"
          highlight-current
          :filter-node-method="filterNode"
          accordion
        />
      </el-card>
    </el-dialog>
    <!-- 绑定导出权限 -->
    <el-dialog :visible.sync="updateRoleDialogVisible2" top="5vh" width="50%">
      <div slot="title" class="dialog-title">
        <span>{{ DialogTitle }}</span>
      </div>
      <el-card class="box-card">
        <el-row>
          <el-col :span="16">
            <el-input
              v-model="filterTextExport"
              placeholder="输入用户进行过滤"
              clearable=""
            />
          </el-col>
          <el-col :span="8" style="text-align: right">
            <!-- <el-switch v-model="PositionStatusFlag" style="margin-top: 7px;margin-right: 40px;" active-color="#13ce66"
              inactive-color="#ff4949" active-text="在职" inactive-text="离职" @change="changePositionStatusExport" /> -->

            <el-checkbox
              v-model="PositionStatusFlag"
              style="margin-top: 7px; margin-right: 40px"
              @change="changePositionStatusExport"
            >在职</el-checkbox>

            <el-button
              icon="el-icon-link"
              style="float: right"
              type="primary"
              :loading="LoadingRoleUpdate2"
              @click="saveUserUpdateExport"
            >关 联
            </el-button>
          </el-col>
        </el-row>
        <el-tree
          ref="treeExport"
          style="
            height: calc(100vh - 300px);
            overflow-y: scroll;
            margin-top: 20px;
          "
          :data="permissionTreeExport"
          show-checkbox:true
          show-checkbox
          node-key="id"
          highlight-current
          :filter-node-method="filterNode"
          accordion
        />
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetAdmin_User,
  AddAdmin_User,
  GetAdmin_UserFirst,
  UpdateAdmin_User,
  DeleteAdmin_User,
  UpdatePasswordCommit,
  GetDepartment,
  GetDicCategoryByContractType,
  GetRoleManagement,
  GetDicCategoryByUser_ID,
  BindContractType,
  GetUserAllList,
  GetBindUser,
  BindUser,
  GetExportUser,
  BindUserExport,
} from "@/api/SystemManagement";
import { showLoading, hideLoading } from "@/common/loading";
const moment = require("moment");
export default {
  name: "UserManagement",
  data() {
    // 自定义手机号规则
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^1[34578]\d{9}$/;
      if (regMobile.test(value)) {
        return callback();
      }
      // 返回一个错误提示
      callback(new Error("请输入合法的手机号码"));
    };
    return {
      filterTextExport: "",
      formShow: "",
      fixedLeftShow: true,
      UserAllListExport: [],
      PositionStatusFlag: true,
      DepartmentCode: "",
      PositionStatus: "0",
      User_RealName: "",
      RoleCode: "",
      entLoading: false,
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
      Admin_UserDatas: [],
      AddAdmin_UserFrom: {
        User_Account: "",
        User_RealName: "",
        RoleCode: "",
        User_Pwd: "",
        PositionStatus: 0,
        DepartmentCode: "",
        Phone: "",
        User_Post: "",
      },
      UpdateAdmin_UserFrom: {
        User_ID: "",
        User_Account: "",
        User_RealName: "",
        RoleCode: "",
        PositionStatus: 0,
        DepartmentCode: "",
        Phone: "",
        User_Post: "",
      },
      pagenum: 1,
      pagesize: 10,
      AddAdmin_UserFromRules: {
        User_Account: [
          {
            required: true,
            message: "请输入登陆名称",
            trigger: "blur",
          },
        ],
        User_RealName: [
          {
            required: true,
            message: "请输入真实姓名",
            trigger: "blur",
          },
        ],
        User_Pwd: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            message:
              "密码格式不正确,应包含大小写字母、数字、特殊符号(包含!@#$%^&*)、8-16位",
            trigger: "blur",
            pattern:
              /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[!@#$%^&*.])[a-zA-Z\d!@#$%^&*.]{8,16}$/,
          },
        ],
        RoleCode: [
          {
            required: true,
            message: "请选择角色",
            trigger: "change",
          },
        ],
        DepartmentCode: [
          {
            required: true,
            message: "请选择部门",
            trigger: "change",
          },
        ],
        Phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },
      updateImageTypeFromRules: {
        User_Account: [
          {
            required: true,
            message: "请输入登陆名称",
            trigger: "blur",
          },
        ],
        User_RealName: [
          {
            required: true,
            message: "请输入真实姓名",
            trigger: "blur",
          },
        ],
        User_Pwd: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            message:
              "密码格式不正确,应包含大小写字母、数字、特殊符号(包含!@#$%^&*)、8-16位",
            trigger: "blur",
            pattern:
              /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[!@#$%^&*.])[a-zA-Z\d!@#$%^&*.]{8,16}$/,
          },
        ],
        RoleCode: [
          {
            required: true,
            message: "请选择角色",
            trigger: "change",
          },
        ],
        DepartmentCode: [
          {
            required: true,
            message: "请选择部门",
            trigger: "change",
          },
        ],
        Phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },
      updatePasswordRules: {
        User_Pwd: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            message:
              "密码格式不正确,应包含大小写字母、数字、特殊符号(包含!@#$%^&*)、8-16位",
            trigger: "blur",
            pattern:
              /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[!@#$%^&*.])[a-zA-Z\d!@#$%^&*.]{8,16}$/,
          },
        ],
        confirmLogin_password: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          {
            message:
              "密码格式不正确,应包含大小写字母、数字、特殊符号(包含!@#$%^&*)、8-16位",
            trigger: "blur",
            pattern:
              /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[!@#$%^&*.])[a-zA-Z\d!@#$%^&*.]{8,16}$/,
          },
        ],
      },
      loading: false,
      CreateUserName: "",
      CreateTime: "",
      UpdateUserName: "",
      UpdateTime: "",
      parentList: [],
      updatePassword: {
        User_ID: "",
        User_Pwd: "",
        confirmLogin_password: "",
      },
      updatePasswordVisible: false,
      UpdatePasswordLoading: false,
      RoleDatas: [],
      DepartmentList: [],
      permissionTree: [],
      permissionTreeExport: [],
      updateRoleDialogVisible: false,
      LoadingRoleUpdate: false,
      updateRoleDialogVisible1: false,
      LoadingRoleUpdate1: false,
      LoadingRoleUpdate2: false,
      bingdArray: {
        RoleCode: null,
        PermissionsArray: [],
      },
      bingdArray1: {
        RoleCode: null,
        PermissionsArray: [],
      },
      filterText: "",
      updateRoleDialogVisible2: false,
      ButtonVal: null,
      DialogTitle: "",
    };
  },
  watch: {
    // corp_id(newValue) {
    //   this.AddAdmin_UserFrom.corpid = newValue;
    //   this._getDep(newValue);
    // },

    filterText(val) {
      this.$refs.tree2.filter(val);
    },
    filterTextExport(val) {
      this.$refs.treeExport.filter(val);
    },
    "$store.getters.clientWidth"(newVal, oldVal) {
      this.fixedShowMethod(newVal);
    },
  },
  created() {
    this.fixedShowMethod(document.body.clientWidth);
  },
  // 加载完成后执行获取公司数据接口
  mounted() {
    this.GetAdmin_User();
    this.GetDepartment();
    this.GetRoleManagement();
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 绑定模块操作
    saveUserUpdate() {
      this.LoadingRoleUpdate = true;
      this.bingdArray.PermissionsArray = this.$refs.tree1.getCheckedKeys();

      BindContractType(this.bingdArray).then((res) => {
        if (res.success) {
          this.updateRoleDialogVisible = false;
          this.$message.success("操作成功");
          this.GetAdmin_User();
        } else {
          this.$message.error(res.resultMessage);
        }
        this.LoadingRoleUpdate = false;
      });
    },
    // 绑定合同类型反填数据
    showManagementEditDialog(User_ID) {
      this.bingdArray.RoleCode = User_ID;
      GetDicCategoryByContractType().then((res) => {
        if (res.success) {
          this.permissionTree = res.result;
          GetDicCategoryByUser_ID(User_ID).then((res) => {
            if (res.success) {
              this.$refs.tree1.setCheckedKeys(res.result);
            }
          });
          this.updateRoleDialogVisible = true;
        } else {
          return this.$message.error("数据获取失败！");
        }
      });
    },
    // 绑定员工操作
    saveUserUpdate1() {
      this.LoadingRoleUpdate1 = true;
      this.bingdArray1.PermissionsArray = this.$refs.tree2.getCheckedKeys();
      BindUser(this.bingdArray1).then((res) => {
        if (res.success) {
          this.updateRoleDialogVisible1 = false;
          this.$message.success("操作成功");
          this.GetAdmin_User();
        } else {
          this.$message.error(res.resultMessage);
        }
        this.LoadingRoleUpdate1 = false;
      });
    },
    // 绑定合同导出权限
    saveUserUpdateExport() {
      this.LoadingRoleUpdate2 = true;
      this.bingdArray1.PermissionsArray =
        this.$refs.treeExport.getCheckedKeys();
      var parameter = {
        RoleCode: this.bingdArray1.RoleCode,
        PermissionsArray: this.bingdArray1.PermissionsArray,
        RelationType: this.ButtonVal,
      };
      BindUserExport(parameter).then((res) => {
        if (res.success) {
          this.PositionStatusFlag = false;
          this.updateRoleDialogVisible2 = false;
          this.$message.success("操作成功");
          this.GetAdmin_User();
        } else {
          this.$message.error(res.resultMessage);
        }
        this.LoadingRoleUpdate2 = false;
      });
    },
    // 绑定人员
    showManagementBindDialog(User_ID) {
      this.bingdArray1.RoleCode = User_ID;
      GetUserAllList(0).then((res) => {
        if (res.success) {
          this.permissionTree = res.result.data;
          GetBindUser(User_ID).then((res) => {
            if (res.success) {
              this.$refs.tree2.setCheckedKeys(res.result);
            }
          });
          this.filterText = "";
          this.PositionStatusFlag = true;
          this.updateRoleDialogVisible1 = true;
        } else {
          return this.$message.error("数据获取失败！");
        }
      });
    },
    // 绑定导出权限
    showManagementExportDialog(val) {
      this.DialogTitle = val == 1 ? "合同导出权限" : "业务渠道权限";
      this.ButtonVal = val;
      GetUserAllList(0).then((res) => {
        if (res.success) {
          this.permissionTreeExport = res.result.data;
          this.UserAllListExport = res.result.getDataList;
          GetExportUser(val).then((res) => {
            if (res.success) {
              this.$refs.treeExport.setCheckedKeys(res.result);
            }
          });
          this.filterTextExport = "";
          this.PositionStatusFlag = true;
          this.updateRoleDialogVisible2 = true;
        } else {
          return this.$message.error("数据获取失败！");
        }
      });
    },
    handleCommand(flag, User_ID) {
      switch (flag) {
        case "a":
          this.showManagementEditDialog(User_ID);
          break;
        case "b":
          this.showManagementBindDialog(User_ID);
          break;
        case "c":
          this.updatePasswordClick(User_ID);
          break;
      }
    },
    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.GetAdmin_User();
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newSize) {
      this.queryInfo.pagenum = newSize;
      this.GetAdmin_User();
    },
    // 添加模块
    AddAdminUser() {
      this.AddAdmin_UserFrom.User_Account = "";
      this.AddAdmin_UserFrom.User_RealName = "";
      this.AddAdmin_UserFrom.RoleCode = "";
      this.AddAdmin_UserFrom.User_Pwd = "";
      this.AddAdmin_UserFrom.DepartmentCode = "";
      this.AddAdmin_UserFrom.PositionStatus = 0;
      this.AddAdmin_UserFrom.Phone = "";
      this.AddAdmin_UserFrom.User_Post = "";
      this.GetDepartment();
      this.addDialogVisible = true;
    },
    saveAdd() {
      this.LoadingAdd = true;
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) {
          this.LoadingAdd = false;
          return;
        }
        AddAdmin_User(this.AddAdmin_UserFrom).then((res) => {
          if (res.success) {
            this.addDialogVisible = false;
            this.$message.success("操作成功");
            this.GetAdmin_User();
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
        UpdateAdmin_User(this.UpdateAdmin_UserFrom).then((res) => {
          if (res.success) {
            this.updateDialogVisible = false;
            this.$message.success("操作成功");
            this.GetAdmin_User();
          } else {
            this.$message.error(res.resultMessage);
          }
          this.LoadingUpdate = false;
        });
      });
    },
    GetAdmin_UserSearch() {
      this.queryInfo.pagenum = 1;
      this.queryInfo.pagesize = 20;
      this.GetAdmin_User();
    },
    // 获取数据
    GetAdmin_User() {
      this.loading = true;
      GetAdmin_User(
        this.DepartmentCode,
        this.PositionStatus,
        this.User_RealName,
        this.RoleCode,
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      ).then((res) => {
        if (res.success) {
          this.Admin_UserDatas = res.result.list;
          this.total = res.result.totalNumber;
        } else {
          this.Admin_UserDatas = [];
          this.total = 0;
        }
        this.loading = false;
      });
    },

    // 删除信息
    async deleteDialog(User_ID) {
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
      DeleteAdmin_User(User_ID).then((res) => {
        if (res.success) {
          this.$message.success("操作成功！");
          this.GetAdmin_User();
        } else {
          hideLoading();
          return this.$message.error(res.resultMessage);
        }
        hideLoading();
      });
    },
    // 编辑用户信息
    showEditDialog(User_ID) {
      this.GetDepartment();
      GetAdmin_UserFirst(User_ID).then((res) => {
        if (res.success) {
          this.UpdateAdmin_UserFrom = res.result;
          this.CreateUserName = res.result.CreateUserName;
          this.CreateTime = moment(res.result.create_time).format(
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
    // 修改密码
    updatePasswordClick(User_ID) {
      this.updatePassword.User_ID = User_ID;
      this.updatePasswordVisible = true;
    },
    // 修改密码提交验证
    updatePasswordCommitClick() {
      this.UpdatePasswordLoading = true;
      // 提交请求前，表单预验证
      this.$refs.updatePasswordRef.validate(async (valid) => {
        // 表单预校验失败
        if (!valid) {
          this.UpdatePasswordLoading = false;
          return;
        }
        // this.addLive();
        UpdatePasswordCommit(this.updatePassword).then((res) => {
          if (res.success) {
            this.$message.success("密码修改成功！");
            // 隐藏添加用户对话框
            this.updatePasswordVisible = false;
          } else {
            this.$message.error(res.resultMessage);
          }
          this.UpdatePasswordLoading = false;
        });
      });
    },
    // 获取角色数据
    GetRoleManagement() {
      GetRoleManagement(1, 10000).then((res) => {
        if (res.success) {
          this.RoleDatas = res.result.list;
        } else {
          this.RoleDatas = [];
        }
      });
    },
    // 获取部门数据
    GetDepartment() {
      GetDepartment("", 1, 100000).then((res) => {
        if (res.success) {
          this.DepartmentList = res.result.list;
        } else {
          this.DepartmentList = [];
        }
      });
    },
    // 筛选部门信息
    changePositionStatus() {
      this.filterText = "";
      GetUserAllList(this.PositionStatusFlag == true ? 0 : 1).then((res) => {
        if (res.success) {
          this.permissionTree = res.result.data;
          this.updateRoleDialogVisible1 = true;
        } else {
          return this.$message.error("数据获取失败！");
        }
      });
    },
    // 筛选部门信息
    changePositionStatusExport() {
      this.filterTextExport = "";
      GetUserAllList(this.PositionStatusFlag == true ? 0 : 1).then((res) => {
        if (res.success) {
          this.permissionTreeExport = res.result.data;
          this.UserAllListExport = res.result.getDataList;
          this.updateRoleDialogVisible2 = true;
        } else {
          return this.$message.error("数据获取失败！");
        }
      });
    },
    fixedShowMethod(newVal) {
      // 上方表单距下方间距
      if (newVal < 1200) {
        this.formShow = "margin-bottom: 18px;";
      } else {
        this.formShow = "margin-bottom: 0;";
      }
      if (newVal < 768) {
        this.fixedLeftShow = false;
      } else {
        this.fixedLeftShow = true;
      }
    },
  },
};
</script>

<style scoped>
.el-dropdown {
  font-size: 12px;
  margin-left: 10px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #1890ff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.whereFormClass {
  margin-bottom: 0;
}

.FormClass {
  width: 100%;
}
</style>
