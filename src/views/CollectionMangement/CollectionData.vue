<template>
  <div style="padding: 8px;">
    <el-card>
      <el-form label-width="90px">
        <!-- 合同信息 -->
        <div slot="header" class="clearfix">
          <span>合同信息</span>
        </div>
        <el-row>
          <el-row>
            <el-col v-if="IfUser == '3'" :xs="24" :sm="12" :md="12" :lg="5" :xl="5">
              <el-form-item label="回款状态">
                <el-select v-model="States" class="comentClass" filterable placeholder="回款状态" clearable="" collapse-tags>
                  <el-option v-for="item in PaymentCollectionStateArray" :key="item.Code" :label="item.Name"
                             :value="item.Code"
                  >
                    <template slot-scope="scope">
                      <!-- <el-tag effect="plain" key="全部"  type="info" v-if="item.Code == 0">全部</el-tag> -->
                      <el-tag v-if="item.Code == 1" key="未回款" effect="plain" type="danger">未回款</el-tag>
                      <el-tag v-if="item.Code == 2" key="已回款" effect="plain" type="success">已回款</el-tag>
                    </template>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="5" :xl="5">
              <el-form-item label="公司名称">
                <el-input v-model="Condition" clearable placeholder="公司名称" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="5" :xl="5">
              <el-form-item label="到账时间">
                <el-date-picker v-model="PaymentDate" style="width:100% ;" class="comentClass" type="daterange"
                                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"
                                clearable="" @input="datetimeChange"
                />
              </el-form-item>
            </el-col>
            <el-col :span="colRight">
              <el-button-group style="margin-left: 1.3rem;">
                <el-button type="primary" icon="el-icon-search" @click="GetAdmin_PermissionSearch">查 询
                </el-button>
                <el-button v-if="StatesShow" type="success" icon="el-icon-edit" @click="UpdateDialog">
                  回 款</el-button>
                <el-dropdown trigger="click" style="margin-left: 0;" @command="
                  (command) => {
                    handleButtonCommand(command);
                  }
                "
                >
                  <el-button type="warning">
                    更 多<i class="el-icon-arrow-down el-icon--right" />
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-if="IfUser == '3'" command="a" icon="el-icon-download">模板下载{{ "\xa0" }}
                    </el-dropdown-item>
                    <el-dropdown-item v-if="IfUser == '3'" command="b" icon="el-icon-upload2">上传文件 {{ "\xa0" }}
                    </el-dropdown-item>
                    <el-dropdown-item v-if="StatesShow" command="c" icon="el-icon-document" :loading="ExportLoading">导出数据
                      {{ "\xa0" }}</el-dropdown-item>
                    <!-- <el-dropdown-item command="d" v-if="StatesShow" icon="el-icon-edit">改为已回款
                    </el-dropdown-item> -->
                    <el-dropdown-item v-if="IfUser == '3'" command="e" icon="el-icon-delete">批量撤回 {{ "\xa0" }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-button-group>
            </el-col>
            <el-col :span="tipWidth" style="text-align: right;">
              <el-tooltip placement="left">
                <div slot="content" style="line-height: 20px;font-size: 13px;width: 300px;">
                  <span style="font-weight: bold;font-size: 14px;">公司数据不显示问题：</span>
                  <el-divider content-position="left">解决方案如下</el-divider>
                  <div style="margin-bottom:15px ; color: #ffba00;">1. 检查保险管理后台系统查看是否存在该公司</div>
                  <div style="margin-bottom:15px ;color: #67C23A;">
                    2. 在回款系统中回款管理——关联用户中查看是否已经关联了所需要的用户(只针对客服角色)</div>
                  <div style="color: #ff4949; ;">
                    3. 如果前两项没有问题则需要联系管理员检查一下导入的公司名称是否和保险管理后台系统的公司名称是否完全一致（很重要）！
                  </div>
                </div>
                <el-badge value="hot" class="item">
                  <el-button>提示</el-button>
                </el-badge>
              </el-tooltip>
            </el-col>
          </el-row>
          <div style="margin-left: 1.3rem;">
            <el-tooltip v-if="totalMoney > 0" class="item" :content="descriptionMoney" placement="bottom">
              <h5 :style="formShow" style="width: 350px;color: #ff4949;margin: 1px 0px;">当前查询数据总金额：<span
                v-format="'¥#,##0.00'"
              >{{
                totalMoney
              }}</span></h5>
            </el-tooltip>
            <h5 v-else :style="formShow" style="width: 350px;color: #ff4949;margin: 1px 0px;">当前查询数据总金额：<span
              v-format="'¥#,##0.00'"
            >{{
              totalMoney
            }}</span></h5>
          </div>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="CardTableClass">
      <el-table ref="multipleTable" v-loading="loading" :data="CollectionList" fit
                :cell-style="showBackground" @selection-change="TableSelect" @row-click="toggleSelection"
      >
        <el-table-column type="selection" width="50" />
        <el-table-column prop="EnterPriseName" label="公司名称" min-width="200" show-overflow-tooltip />
        <el-table-column prop="SecondPartyName" label="收款公司" min-width="100" show-overflow-tooltip />
        <el-table-column prop="AmountMoney" label="金额" min-width="100" sortable="">
          <template slot-scope="scope">
            <span v-format="'¥#,##0.00'">{{ scope.row.AmountMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="PaymentDate" label="到账时间" min-width="110">
          <template slot-scope="scope">
            <div v-if="scope.row.PaymentDate">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.PaymentDate }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="States" label="回款状态" min-width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.States == 1" key="未回款" effect="plain" type="danger">未回款</el-tag>
            <el-tag v-if="scope.row.States == 2" key="已回款" effect="plain" type="success">已回款</el-tag>
            <el-tag v-if="scope.row.States == 3" key="有余额" effect="plain">有余额</el-tag>
            <!-- <el-tag  type="danger" v-if="scope.row.States == 1">未回款</el-tag>
              <el-tag  type="success" v-if="scope.row.States == 2">已回款</el-tag>
              <el-tag v-if="scope.row.States == 3">有余额</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column prop="CreateTimeStr" label="导入时间" sortable min-width="170">
          <template slot-scope="scope">
            <div v-if="scope.row.CreateTimeStr">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.CreateTimeStr }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="IfUser == '3'" prop="User_Name" label="收取人" min-width="100" />
        <el-table-column v-if="IfUser == '3'" prop="CollectionTime" label="收取时间" min-width="170">
          <template slot-scope="scope">
            <div v-if="scope.row.CollectionTime">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.CollectionTime }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination :current-page="queryInfo.pagenum" :page-sizes="[20, 50, 100]"
                     :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"
                     @size-change="handleSizeChange" @current-change="handleCurrentChange"
      />
    </el-card>

    <el-dialog title="修改回款状态" :visible.sync="updateDialogVisible" width="30%">
      <el-form ref="updateRef" :model="updateCollectionFrom" label-width="80px">
        <el-form-item label="备注">
          <el-input v-model="updateCollectionFrom.Remark" type="textarea" :rows="3" placeholder="例如：2022年6月补充医疗" />
        </el-form-item>
      </el-form>
      <el-divider />
      <el-row style="text-align:center;">
        <el-col :span="24">
          <el-button v-loading.fullscreen.lock="LoadingUpdate" type="primary" @click="saveUpdate">确
            定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog title="上传文件" :visible.sync="importDialogVisible" width="30%">
      <el-form ref="importRef" label-width="120px">
        <el-form-item label="重复数据判断" prop="Flag">
          <el-switch v-model="Flag" active-color="#1E90FF" inactive-color="#FFB6C1" active-text="是" inactive-text="否" />
        </el-form-item>
        <el-form-item label="文 件">
          <el-upload ref="upload" :action="actionUrl" :on-preview="handlePreview" :on-remove="handleRemove"
                     :on-success="fileUploadSuccess" :on-error="fileUploadFail" :on-change="fileChange" :file-list="fileList"
                     :limit="1" :auto-upload="false" :headers="myHeaders"
          >
            <el-button slot="trigger" type="primary" class="buttonM">选取文件</el-button>
          </el-upload>
        </el-form-item>
        <el-divider />
        <el-row style="text-align:center;">
          <el-col :span="24">
            <el-button :loading="uploadLoading" type="success" @click="submitUpload">开始导入</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetAdmin_Permission,
  UpdateData,
  GetAdmin_PermissionExport,
  DeleteCollectionData,
} from "@/api/CollectionMangement";
import axios from "axios";
import { showLoading, hideLoading } from "@/common/loading";
export default {
  components: {},
  data() {
    return {
      formShow: '',
      totalMoney: 0,
      descriptionMoney: '',
      multipleSelection: [],
      colRight: 12,
      tipWidth: 2,
      ExportLoading: false,
      uploadLoading: false,
      accessKeyId: "",
      accessKeySecret: "",
      stsToken: "",
      expiration: "",
      accessid: null,
      accesskey: null,
      osstoken: null,
      expire: null,
      Flag: false,
      StatesShow: false,
      States: 1, // 回款状态,默认都为未回款
      Condition: "", // 公司名称查询字段
      PaymentDate: [], // 到账时间查询字段
      PaymentDateBegin: "",
      PaymentDateEnd: "",
      IfUser: "",
      LoadingUpdate: false,
      CustomerName: "",
      mobile_phone: "",
      certificate_no: "",
      Corpid: "",
      // 获取用户列表查询参数对象
      queryInfo: {
        pagenum: 1,
        pagesize: 20,
      },
      total: 0,
      updateDialogVisible: false,
      importDialogVisible: false,
      CollectionList: [],
      updateCollectionFrom: {
        InsProductPayCode: "",
        Remark: "",
      },
      employeeList: [],
      myHeaders: { 'X-Token': sessionStorage.getItem("token") },
      RoleName: sessionStorage.getItem("RoleName"),
      actionUrl: "",
      fileList: [], // 文件列表
      fileListCopy: [], // 文件列表
      file: null,
      loading: false,
      // 回款状态
      PaymentCollectionStateArray: [
        // { Code: 0, Name: "全部" },
        { Code: 1, Name: "未回款" },
        { Code: 2, Name: "已回款" },
        // { Code: 3, Name: "有余额" },
      ],
      // 判断选中的数据回款状态是否都是未回款，只要有一个是已回款，那么这个状态为true
      collectionStateFlag: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "本月",
            onClick(picker) {
              const end = new Date();
              const start = new Date(new Date().setTime(new Date().setDate(1)));
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "上月",
            onClick(picker) {
              var range = getDateByTimes()
              const start = range[0];
              const end = range[1];
              picker.$emit("pick", [new Date(start), new Date(end)]);
            },
          },
          {
            text: "本年",
            onClick(picker) {
              const end = new Date();
              var y = end.getFullYear(); // 年

              var startStr = y + "-01-01";

              const start = new Date(startStr);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近半年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 360);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  watch: {
    '$store.getters.clientWidth'(newVal, oldVal) {
      this.fixedShowMethod(newVal);
    },
    Flag(newValue) {
      this.actionUrl =
        process.env.VUE_APP_BASE_API + "/CollectionMangement/UploadFiles?Flag=" + newValue;
    },
  },
  created() { },
  // 加载完成后执行调取回款数据接口
  mounted() {
    switch (sessionStorage.getItem("RoleName")) {
      case "超级管理员":
        this.IfUser = "3";
        this.StatesShow = true;
        if (document.body.clientWidth >= 1200) {
          this.colRight = 7;
          this.tipWidth = 2;
        } else if (document.body.clientWidth >= 768) {
          this.colRight = 9;
          this.tipWidth = 3;
        } else {
          this.colRight = 20;
          this.tipWidth = 4;
        }
        // 上方表单距下方间距
        if (document.body.clientWidth < 768) {
          this.formShow = 'margin-top: 18px;';
        } else {
          this.formShow = 'margin-top: 0;';
        }
        break;
      case "总客服":
      case "财务":
        this.IfUser = "3";
        this.StatesShow = false;
        if (document.body.clientWidth >= 1200) {
          this.colRight = 7;
          this.tipWidth = 2;
        } else if (document.body.clientWidth >= 768) {
          this.colRight = 9;
          this.tipWidth = 3;
        } else {
          this.colRight = 20;
          this.tipWidth = 4;
        }
        // 上方表单距下方间距
        if (document.body.clientWidth < 768) {
          this.formShow = 'margin-top: 18px;';
        } else {
          this.formShow = 'margin-top: 0;';
        }
        break;
      case "HRO":
      case "客服":
        this.IfUser = "1";
        this.StatesShow = true;
        if (document.body.clientWidth >= 1200) {
          this.colRight = 11;
          this.tipWidth = 3;
        } else if (document.body.clientWidth >= 768) {
          this.colRight = 21;
          this.tipWidth = 3;
        } else {
          this.colRight = 20;
          this.tipWidth = 4;
        }
        // 上方表单距下方间距
        if (document.body.clientWidth < 1200) {
          this.formShow = 'margin-top: 18px;';
        } else {
          this.formShow = 'margin-top: 0;';
        }
        break;
      default:
        this.IfUser = "1";
        this.StatesShow = true;
        if (document.body.clientWidth >= 1200) {
          this.colRight = 11;
          this.tipWidth = 3;
        } else if (document.body.clientWidth >= 768) {
          this.colRight = 21;
          this.tipWidth = 3;
        } else {
          this.colRight = 20;
          this.tipWidth = 4;
        }
        // 上方表单距下方间距
        if (document.body.clientWidth < 1200) {
          this.formShow = 'margin-top: 18px;';
        } else {
          this.formShow = 'margin-top: 0;';
        }
        break;
    }

    this.GetAdmin_Permission();
    this.actionUrl =
      process.env.VUE_APP_BASE_API + "/CollectionMangement/UploadFiles?Flag=" + this.Flag;
  },
  methods: {
    datetimeChange(time) {
      // 强制刷新
      this.$forceUpdate();
    },
    // 执行上方按钮更多操作
    handleButtonCommand(flag) {
      switch (flag) {
        case "a":
          this.downloadTemplate();
          break;
        case "b":
          this.ImportEnterpriseAnnouncement();
          break;
        case "c":
          this.ExportCollection();
          break;
        // case "d":
        //   this.UpdateDialog();
        //   break;
        case "e":
          this.batchDelete();
          break;
      }
    },

    // 点击当前行数据进行选中或取消复选框
    toggleSelection(row) {
      // 通过ref绑定后这里使用$refs.table来操作bom元素
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    Options() {
      this.$notify({
        title: "解决方案",
        duration: 0,
      });
    },
    TableSelect(selection) {
      this.multipleSelection = selection;
      this.collectionStateFlag = false;
      if (selection.length != 0) {
        this.updateCollectionFrom.InsProductPayCode = "";
        selection.forEach((element) => {
          this.updateCollectionFrom.InsProductPayCode +=
            element.InsProductPayCode + ",";
          if (element.States == 2) { this.collectionStateFlag = true; }
        });
        this.updateCollectionFrom.InsProductPayCode =
          this.updateCollectionFrom.InsProductPayCode.substring(
            0,
            this.updateCollectionFrom.InsProductPayCode.lastIndexOf(",")
          );
      } else {
        this.updateCollectionFrom.InsProductPayCode = "";
      }
    },
    showBackground({ row }) {
      const checkIdList = this.multipleSelection.map((item) => item.EnterPriseName + item.AmountMoney + item.PaymentDate + item.CreateTimeStr);
      if (checkIdList.includes(row.EnterPriseName + row.AmountMoney + row.PaymentDate + row.CreateTimeStr)) {
        return {
          backgroundColor: "#E6F7FF",
        };
      } else {
        return {
          backgroundColor: "#FFFFFF",
        };
      }
    },
    // 保存修改
    saveUpdate() {
      this.LoadingUpdate = true;
      UpdateData(
        this.updateCollectionFrom.InsProductPayCode,
        this.updateCollectionFrom.Remark
      ).then((res) => {
        if (res.success) {
          this.updateDialogVisible = false;
          this.$message.success("操作成功");
          this.updateCollectionFrom.InsProductPayCode = "";
          this.GetAdmin_Permission();
        } else {
          this.$message.error(res.resultMessage);
        }
        this.LoadingUpdate = false;
      });
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
    // 弹出上传文件窗口
    ImportEnterpriseAnnouncement() {
      this.Flag = false;
      this.importDialogVisible = true;
    },
    // 绑定填写备注弹出窗口
    UpdateDialog() {
      if (!this.updateCollectionFrom.InsProductPayCode) {
        this.$message.info("请勾选要修改的数据！");
        return;
      }
      this.updateCollectionFrom.Remark = "";
      this.updateDialogVisible = true;
    },
    // 批量删除（永久删除）
    async batchDelete() {
      if (!this.updateCollectionFrom.InsProductPayCode) {
        this.$message.info("请勾选要修改的数据！");
        return;
      }
      if (this.collectionStateFlag) {
        this.$message.info("不能撤回已回款的数据，请检查");
        return;
      }
      const confirmResult = await this.$confirm(
        "此操作将永久删除选中数据, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消操作");
      }
      showLoading();
      DeleteCollectionData(this.updateCollectionFrom.InsProductPayCode).then((res) => {
        if (res.success) {
          this.$message.success("操作成功！");
          this.GetAdmin_Permission();
          hideLoading();
        } else {
          hideLoading();
          return this.$message.error(res.resultMessage);
        }
      });
    },
    radioGroupChange(value) {
      this.States = value;
      this.GetAdmin_Permission();
    },
    GetAdmin_PermissionSearch() {
      this.queryInfo.pagenum = 1;
      this.queryInfo.pagesize = 20;
      this.GetAdmin_Permission();
    },
    // 获取员工方案列表数据
    GetAdmin_Permission() {
      this.loading = true;
      if (this.PaymentDate && this.PaymentDate.length > 0) {
        this.PaymentDateBegin = this.$moment(this.PaymentDate[0]).format("YYYY-MM-DD");
        this.PaymentDateEnd = this.$moment(this.PaymentDate[1]).format("YYYY-MM-DD");
      } else {
        this.PaymentDateBegin = '';
        this.PaymentDateEnd = '';
      }
      GetAdmin_Permission(
        this.IfUser,
        this.Condition,
        this.States,
        this.PaymentDateBegin,
        this.PaymentDateEnd,
        '', '',
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      ).then((res) => {
        if (res.success) {
          this.CollectionList = res.result.list;
          this.total = res.result.totalNumber;
          this.totalMoney = res.result1 ? res.result1 : 0;
          this.descriptionMoney = res.result2;
        } else {
          this.CollectionList = [];
          this.total = 0;
          this.totalMoney = 0;
          this.descriptionMoney = '';
        }
        this.updateCollectionFrom.InsProductPayCode = "";
        this.loading = false;
      });
    },
    // 导出数据
    ExportCollection() {
      this.ExportLoading = true;
      if (this.PaymentDate && this.PaymentDate.length > 0) {
        this.PaymentDateBegin = this.$moment(this.PaymentDate[0]).format("YYYY-MM-DD");
        this.PaymentDateEnd = this.$moment(this.PaymentDate[1]).format("YYYY-MM-DD");
      } else {
        this.PaymentDateBegin = '';
        this.PaymentDateEnd = '';
      }
      GetAdmin_PermissionExport(
        this.IfUser,
        this.Condition,
        this.States,
        this.PaymentDateBegin,
        this.PaymentDateEnd,
        '', ''
      ).then(
        (res) => {
          if (res.success) {
            window.location.href = res.result;
          } else {
            this.CollectionList = [];
            this.total = 0;
          }
          this.ExportLoading = false;
        }
      );
    },
    // 导入方法
    async submitUpload(param) {
      if (this.fileList.length <= 0) {
        this.$message.warning("请先选择需要上传的文件！");
        return false;
      }
      this.uploadLoading = true;
      this.$refs.upload.submit();
    },
    // 文件上传服务端失败时的钩子
    fileUploadFail: function (err, file, fileList) { },
    // 文件上传服务端成功时的钩子
    fileUploadSuccess: async function (response, file, fileList) {
      this.uploadLoading = false;
      if (response.success) {
        this.$message.success("回款数据导入成功");
        this.file = file;
        this.importDialogVisible = false;
        this.GetAdmin_Permission();
      } else {
        this.$message.error(response.resultMessage);
      }
      this.fileList = [];
      // 清空已上传的文件列表
      this.$refs.upload.clearFiles();
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    fileChange(file, fileList) {
      // 解决无法判断el-upload是否上传过文件问题
      this.fileList = fileList;
      this.fileListCopy = fileList;
      this.file = file;
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      this.fileList = [];
      this.file = null;
      // return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePreview(file) {
      console.log(file);
    },
    // 模板下载
    downloadTemplate() {
      axios({
        // 用axios发送post请求
        method: "post",
        url: process.env.VUE_APP_BASE_API + "/CollectionMangement/ExportEmployee", // 请求地址
        responseType: "blob", // 表明返回服务器返回的数据类型
        headers: {
          "Content-Type": "application/json",
          'X-Token': sessionStorage.getItem("token"),
        },
      }).then((res) => {
        // 处理返回的文件流
        const blob = new Blob([res.data]); // new Blob([res])中不加data就会返回下图中[objece objece]内容（少取一层）
        const fileName = "回款导入模板.xlsx"; // 下载文件名称
        const elink = document.createElement("a");
        elink.download = fileName;
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      });
    },
    fixedShowMethod(newVal) {
      switch (sessionStorage.getItem("RoleName")) {
        case "超级管理员":
          if (newVal >= 1200) {
            this.colRight = 7;
            this.tipWidth = 2;
          } else if (newVal >= 768) {
            this.colRight = 9;
            this.tipWidth = 3;
          } else {
            this.colRight = 20;
            this.tipWidth = 4;
          }
          // 上方表单距下方间距
          if (newVal < 768) {
            this.formShow = 'margin-top: 18px;';
          } else {
            this.formShow = 'margin-top: 0;';
          }
          break;
        case "总客服":
        case "财务":
          if (newVal >= 1200) {
            this.colRight = 7;
            this.tipWidth = 2;
          } else if (newVal >= 768) {
            this.colRight = 9;
            this.tipWidth = 3;
          } else {
            this.colRight = 20;
            this.tipWidth = 4;
          }
          // 上方表单距下方间距
          if (newVal < 768) {
            this.formShow = 'margin-top: 18px;';
          } else {
            this.formShow = 'margin-top: 0;';
          }
          break;
        case "HRO":
        case "客服":
          if (newVal >= 1200) {
            this.colRight = 11;
            this.tipWidth = 3;
          } else if (newVal >= 768) {
            this.colRight = 21;
            this.tipWidth = 3;
          } else {
            this.colRight = 20;
            this.tipWidth = 4;
          }
          // 上方表单距下方间距
          if (newVal < 1200) {
            this.formShow = 'margin-top: 18px;';
          } else {
            this.formShow = 'margin-top: 0;';
          }
          break;
        default:
          if (newVal >= 1200) {
            this.colRight = 11;
            this.tipWidth = 3;
          } else if (newVal >= 768) {
            this.colRight = 21;
            this.tipWidth = 3;
          } else {
            this.colRight = 20;
            this.tipWidth = 4;
          }
          // 上方表单距下方间距
          if (newVal < 1200) {
            this.formShow = 'margin-top: 18px;';
          } else {
            this.formShow = 'margin-top: 0;';
          }
          break;
      }
    }
  },
};
</script>

<style scoped>
.MiddleClass {
  margin-top: 10px;
}

.displayNoneClass {
  display: none;
}

.comentClass {
  width: 100%;
}

.el-divider__text {
  padding: 0 3;
  font-size: 12px;
  color: #FFFFFF;
  background-color: #303133;
}
</style>
