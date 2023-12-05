<template>
  <div style="padding: 8px">
    <el-card>
      <el-form label-width="90px">
        <!-- 合同信息 -->
        <div slot="header" class="clearfix">
          <span>发票列表</span>
        </div>
        <el-row>
          <collapse>
            <div v-show="isActive">
              <el-row>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item class="whereFormClass" label="发票种类">
                    <el-select
                      v-model="InvoiceType"
                      class="timeClass"
                      filterable
                      placeholder="发票种类"
                      clearable
                    >
                      <el-option
                        v-for="item in InvoiceTypeList"
                        :key="item.Code"
                        :label="item.Name"
                        :value="item.Code"
                      >
                        <template>
                          <div style="display: flex; align-items: center">
                            <span slot="reference" style="margin-right: 8px">
                              <i
                                v-if="item.Name == '增值税专用发票'"
                                class="dotClass"
                                style="background-color: #13ce66"
                              />
                              <i
                                v-if="item.Name == '增值税普通发票'"
                                class="dotClass"
                                style="background-color: #ffba00"
                              />
                              <i
                                v-if="item.Name == '增值税电子普通发票'"
                                class="dotClass"
                                style="background-color: #ff4949"
                              />
                            </span>
                            {{ item.Name }}
                          </div>
                        </template>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item class="whereFormClass" label="发票状态">
                    <el-select
                      v-model="IvState"
                      class="timeClass"
                      filterable
                      placeholder="发票状态"
                      clearable
                    >
                      <el-option
                        v-for="item in InvoiceStatusList"
                        :key="item.Code"
                        :class="item.Class"
                        :label="item.Name"
                        :value="item.Code"
                      >
                        <el-tag
                          v-if="item.Code == 0"
                          effect="plain"
                          type="danger"
                          >未开</el-tag
                        >
                        <el-tag
                          v-if="item.Code == 1"
                          effect="plain"
                          type="success"
                          >已开</el-tag
                        >
                        <el-tag v-if="item.Code == 5" effect="plain" type="info"
                          >作废</el-tag
                        >
                        <el-tag
                          v-if="item.Code == 7"
                          effect="plain"
                          type="warning"
                          >退回</el-tag
                        >
                        <el-tag v-if="item.Code == 4" effect="plain" type=""
                          >未确认</el-tag
                        >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item class="whereFormClass" label="应收年份">
                    <el-date-picker
                      v-model="SYear"
                      style="width: 100%"
                      class="timeClass"
                      type="year"
                      placeholder="选择年"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item class="whereFormClass" label="应收月份">
                    <el-date-picker
                      v-model="SMonth"
                      style="width: 100%"
                      class="timeClass"
                      type="month"
                      placeholder="选择月"
                      format="MM"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item class="whereFormClass" label="公司名称">
                    <el-input
                      v-model="CompanyId"
                      class="timeClass"
                      clearable=""
                      placeholder="公司名称"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item class="whereFormClass" label="乙方公司">
                    <el-select
                      v-model="SecondPartyName"
                      class="timeClass"
                      filterable
                      placeholder="乙方公司"
                      clearable=""
                    >
                      <el-option
                        v-for="item in DicCategoryListAll"
                        :key="item.Code"
                        :label="item.Name"
                        :value="item.Code"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item class="whereFormClass" label="申开人">
                    <el-select
                      v-model="ApplyPerson"
                      class="timeClass"
                      filterable
                      placeholder="申开人"
                      clearable
                    >
                      <el-option
                        v-for="item in ApplyPersonList"
                        :key="item.Code"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </collapse>
          <!-- 分割----------------- -->
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-button-group style="margin-left: 1.3rem">
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  @click="GetInvoiceDataSearch"
                  >查 询
                </el-button>
                <el-button
                  type="info"
                  icon="el-icon-refresh-left"
                  @click="reseatData"
                  >重 置
                </el-button>
                <el-button
                  :disabled="adminConfirmDis"
                  type="success"
                  icon="el-icon-circle-check"
                  @click="auditStatusAction"
                >
                  确 认
                </el-button>
                <el-button
                  type="warning"
                  icon="el-icon-circle-close"
                  @click="RevokeInvoice"
                  >撤 销
                </el-button>
                <el-button
                  type="text"
                  style="margin-left: 10px"
                  :icon="
                    isActive
                      ? 'el-icon-arrow-up el-icon--right'
                      : 'el-icon-arrow-down el-icon--right'
                  "
                  @click="collapseClick"
                  >{{ isActive ? "收起" : "展开" }}</el-button
                >
              </el-button-group>
              <el-tooltip class="item" :content="MaxMoney" placement="bottom">
                <h5
                  style="
                    width: 350px;
                    color: #ff4949;
                    margin: 0 0 0 15px;
                    display: inline-block;
                  "
                >
                  当前数据发票总金额：<span v-format="'¥#,##0.00'">{{
                    MinMoney
                  }}</span>
                </h5>
              </el-tooltip>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="CardTableClass">
      <el-table
        ref="multipleTable"
        v-loading="loading"
        class="tableCheckClass"
        :data="InvoiceData"
        fit
        :cell-style="isRed"
        @selection-change="TableSelect"
        @row-click="toggleSelection"
      >
        <!-- <el-table-column type="index" label="#" >
          </el-table-column> -->
        <!-- <el-table-column type="selection" width="40"> </el-table-column> -->
        <el-table-column
          v-if="fixedLeftShow"
          key="column"
          type="selection"
          width="50"
          fixed="left"
        />
        <el-table-column v-else key="columnFalse" type="selection" width="50" />
        <el-table-column
          v-if="fixedLeftShow"
          prop="CompanyName"
          label="公司名称"
          min-width="220"
          fixed="left"
          show-overflow-tooltip
        />
        <el-table-column
          v-else
          prop="CompanyName"
          label="公司名称"
          min-width="220"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="fixedLeftShow"
          prop="SecondPartyName"
          label="乙方公司"
          min-width="90"
          fixed="left"
          show-overflow-tooltip
        />
        <el-table-column
          v-else
          prop="SecondPartyName"
          label="乙方公司"
          min-width="90"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="fixedLeftShow"
          prop="InvoiceHeader"
          label="发票抬头"
          min-width="220"
          fixed="left"
          show-overflow-tooltip
        />
        <el-table-column
          v-else
          prop="InvoiceHeader"
          label="发票抬头"
          min-width="220"
          show-overflow-tooltip
        />
        <el-table-column
          prop="InvoiceTypeStr"
          label="发票种类"
          min-width="150"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="{}">
            <span>发票种类</span>
            <el-tooltip
              class="item"
              effect="light"
              placement="bottom"
              style="margin-left: 5px; margin-bottom: 0.2rem"
            >
              <i
                class="el-icon-question"
                style="font-size: 14px; vertical-align: middle"
              />
              <div slot="content">
                <div style="display: flex; align-items: center">
                  <span
                    slot="reference"
                    style="margin-right: 10px"
                    class="SecondPartyNameClass"
                  >
                    <div>
                      <i class="dotClass" style="background-color: #13ce66" />{{
                        "\xa0\xa0"
                      }}增值税专用发票<br />
                    </div>
                    <div>
                      <i class="dotClass" style="background-color: #ffba00" />{{
                        "\xa0\xa0"
                      }}增值税普通发票<br />
                    </div>
                    <div style="margin-bottom: 0">
                      <i class="dotClass" style="background-color: #ff4949" />{{
                        "\xa0\xa0"
                      }}增值税电子普通发票<br />
                    </div>
                  </span>
                </div>
              </div>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <div style="display: flex; align-items: center">
              <span slot="reference" style="margin-right: 8px">
                <i
                  v-if="scope.row.InvoiceTypeStr == '增值税专用发票'"
                  class="dotClass"
                  style="background-color: #13ce66"
                />
                <i
                  v-if="scope.row.InvoiceTypeStr == '增值税普通发票'"
                  class="dotClass"
                  style="background-color: #ffba00"
                />
                <i
                  v-if="scope.row.InvoiceTypeStr == '增值税电子普通发票'"
                  class="dotClass"
                  style="background-color: #ff4949"
                />
              </span>
              {{ scope.row.InvoiceTypeStr }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="InvoiceAmount"
          label="发票金额"
          min-width="100"
          show-overflow-tooltip
          sortable=""
        >
          <template slot-scope="scope">
            <span v-format="'¥#,##0.00'">{{ scope.row.InvoiceAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="IvStateStr" label="发票状态" min-width="100">
          <template slot="header" slot-scope="{}">
            <span>发票状态</span>
            <el-tooltip
              class="item"
              effect="light"
              placement="bottom"
              style="margin-left: 5px; margin-bottom: 0.2rem"
            >
              <i
                class="el-icon-question"
                style="font-size: 14px; vertical-align: middle"
              />
              <div slot="content">
                <div style="display: flex; align-items: center">
                  <span
                    slot="reference"
                    style="margin: 0 10px 0 6px"
                    class="SecondPartyNameClass"
                  >
                    <div>
                      <el-tag key="未开" effect="plain" type="danger"
                        >未开</el-tag
                      >
                    </div>
                    <div>
                      <el-tag key="已开" effect="plain" type="success"
                        >已开</el-tag
                      >
                    </div>
                    <div>
                      <el-tag key="未确认" effect="plain" type=""
                        >未确认</el-tag
                      >
                    </div>
                    <div>
                      <el-tag key="作废" effect="plain" type="info"
                        >作废</el-tag
                      >
                    </div>
                    <div style="margin-bottom: 0">
                      <el-tag key="退回" effect="plain" type="warning"
                        >退回</el-tag
                      >
                    </div>
                  </span>
                </div>
              </div>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-tag v-if="scope.row.IvState == 0" effect="plain" type="danger"
              >未开</el-tag
            >
            <el-tag v-if="scope.row.IvState == 1" effect="plain" type="success"
              >已开</el-tag
            >
            <el-tag v-if="scope.row.IvState == 4" effect="plain" type=""
              >未确认</el-tag
            >
            <el-tag v-if="scope.row.IvState == 5" effect="plain" type="info"
              >作废</el-tag
            >
            <el-tag v-if="scope.row.IvState == 7" effect="plain" type="warning"
              >退回</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="IssuingDateStr"
          label="应收年月"
          min-width="100"
        />
        <el-table-column prop="ApplyPerson" label="申开人" min-width="100" />
        <el-table-column prop="ApplyTime" label="申开时间" min-width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.ApplyTime">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{
                dateFormat(scope.row.ApplyTime)
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="IssuingPerson" label="开票人" min-width="90" />
        <el-table-column
          prop="IssuingTimeStr"
          label="开具时间"
          min-width="120"
          show-overflow-tooltip
        />
        <!-- <el-table-column prop="InvoiceContent" label="发票内容" align="left" min-width="120" show-overflow-tooltip /> -->
        <el-table-column
          prop="InvoiceTypes"
          label="发票类型"
          align="left"
          min-width="100"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.InvoiceTypes == 1">全额</span>
            <span v-else-if="scope.row.InvoiceTypes == 2">差额</span>
            <span v-else />
          </template>
        </el-table-column>
        <el-table-column
          prop="InvoiceAccountName"
          label="发票科目"
          align="left"
          min-width="200"
          show-overflow-tooltip
        />
        <el-table-column
          prop="InvoiceRemark"
          label="发票备注"
          align="left"
          min-width="200"
          show-overflow-tooltip
        />
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
  </div>
</template>

<script>
import {
  GetCompany,
  GetDicCategory,
  GetInvoiceDataMethod,
  GetPersonInfo,
  ConfirmInvoicing,
  RevokeInvoicing,
} from "@/api/CollectionMangement";
import { GetDicCategoryC } from "@/api/SystemManagement";
import { showLoading, hideLoading } from "@/common/loading";
import { parseTime } from "@/utils"; // 时间日期格式化成字符串
import collapse from "../../assets/js/collapse";
export default {
  name: "MyInVoice",
  components: { collapse },
  data() {
    return {
      isActive: true,
      DicCategoryListAll: [],
      SecondPartyName: "",
      fixedLeftShow: true,
      // 公司数据返回列表
      CorporationDatas: [],
      // 获取用户列表查询参数对象
      queryInfo: {
        pagenum: 1,
        pagesize: 20,
      },
      total: 0,

      InvoiceData: [],
      loading: false,
      InvoiceStatusList: [],
      InvoiceTypeList: [],
      CompanyId: null,
      InvoiceType: null,
      IvState: "",
      SYear: null,
      SMonth: null,
      ApplyPerson: "",
      IssuingPerson: "",
      ApplyPersonList: [],
      IssuingPersonList: [],
      MinMoney: "",
      MaxMoney: "",
      multipleSelection: [],
      IdStr: "",
      //超级管理员可以进行确认操作（这个按钮先保留），别的角色不能操作
      // adminConfirmDis:sessionStorage.getItem("RoleName") != "超级管理员",、
      adminConfirmDis: false,
    };
  },
  watch: {
    "$store.getters.clientWidth"(newVal, oldVal) {
      this.fixedShowMethod(newVal);
    },
  },
  created() {},
  // 加载完成后执行获取公司数据接口
  mounted() {
    this.fixedShowMethod(document.body.clientWidth);
    // 获取发票类型数据
    this.GetInvoiceType();
    // 获取销售人数据
    this.GetInvoiceStatus();
    // 获取公司列表
    this.GetCompany();
    // 获取人员数据
    this.GetPersonInfoList();
    // 获取发票数据
    this.GetInvoiceData();
    // 获取乙方公司数据
    this.GetDicCategoryC();
  },
  methods: {
    collapseClick() {
      this.isActive = !this.isActive;
    },
    // 获取乙方公司数据
    GetDicCategoryC() {
      GetDicCategoryC("", 1, 100000).then((res) => {
        if (res.success) {
          this.DicCategoryListAll = res.result.list;
        } else {
          this.DicCategoryListAll = [];
        }
      });
    },
    // 撤销
    async RevokeInvoice() {
      if (!this.IdStr) {
        this.$message.warning("请勾选要撤销开票的数据！");
        return;
      }
      let flagFinlished = false;
      this.multipleSelection.forEach((item) => {
        if (item.IvState == 1) {
          flagFinlished = true;
        }
      });
      if (flagFinlished) {
        this.$message.warning("撤销开票的数据中不能包含已完成的发票！");
        return;
      }
      const confirmResult = await this.$confirm(
        "是否确认撤销开票的数据?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消撤销开票的数据");
      }
      showLoading();
      RevokeInvoicing(this.IdStr).then((res) => {
        if (res.success) {
          this.$message.success("操作成功！");
          this.GetInvoiceDataSearch();
        } else {
          hideLoading();
          return this.$message.error(res.resultMessage);
        }
        hideLoading();
      });
    },

    // 确认开票
    async auditStatusAction() {
      if (!this.IdStr) {
        this.$message.warning("请勾选要确认开票的数据！");
        return;
      }
      const confirmResult = await this.$confirm(
        "是否确认提交开票申请?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消确认开票申请");
      }
      showLoading();
      ConfirmInvoicing(this.IdStr).then((res) => {
        if (res.success) {
          this.$message.success("操作成功！");
          this.GetInvoiceDataSearch();
        } else {
          hideLoading();
          return this.$message.error(res.resultMessage);
        }
        hideLoading();
      });
    },
    // 点击当前行数据进行选中或取消复选框
    toggleSelection(row, column, event) {
      if (column.label != "操作") {
        // 通过ref绑定后这里使用$refs.table来操作bom元素
        this.$refs.multipleTable.toggleRowSelection(row);
      }
    },
    isRed({ row }) {
      const checkIdList = this.multipleSelection.map((item) => item.Id);
      if (checkIdList.includes(row.Id)) {
        return {
          backgroundColor: "#E6F7FF",
        };
      } else {
        return {
          backgroundColor: "#FFFFFF",
        };
      }
    },
    // 复选框选中事件
    TableSelect(selection) {
      this.multipleSelection = selection;
      if (selection.length != 0) {
        this.IdStr = "";
        selection.forEach((element) => {
          // 送审时用到
          this.IdStr += element.Id + ",";
        });
        this.IdStr = this.IdStr.substring(0, this.IdStr.lastIndexOf(","));
      } else {
        this.IdStr = "";
      }
    },
    // 列表时间格式化
    dateFormat(row) {
      if (row) {
        return this.$moment(row).format("YYYY-MM-DD");
      } else {
        return null;
      }
    },
    reseatData() {
      this.SecondPartyName = "";
      this.CompanyId = null;
      this.InvoiceType = null;
      this.IvState = "";
      this.SYear = null;
      this.SMonth = null;
      this.ApplyPerson = "";
      this.IssuingPerson = "";
      this.queryInfo.pagesize = 20;
      this.queryInfo.pagenum = 1;
      this.GetInvoiceData();
    },
    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.GetInvoiceData();
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newSize) {
      this.queryInfo.pagenum = newSize;
      this.GetInvoiceData();
    },

    GetInvoiceDataSearch() {
      this.queryInfo.pagenum = 1;
      this.queryInfo.pagesize = 20;
      this.GetInvoiceData();
    },
    // 获取合同列表数据
    GetInvoiceData() {
      this.loading = true;
      if (this.SYear) {
        this.SYear = parseTime(new Date(this.SYear), "{y}");
      }
      if (this.SMonth) {
        this.SMonth = parseTime(new Date(this.SMonth), "{m}");
      }
      GetInvoiceDataMethod(
        this.CompanyId,
        this.InvoiceType,
        this.IvState,
        this.SYear,
        this.SMonth,
        this.ApplyPerson,
        this.IssuingPerson,
        true,
        this.SecondPartyName,
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      ).then((res) => {
        if (res.success) {
          var wei = res.result.list.filter((item) => {
            return item.IvState == 0;
          });
          var yi = res.result.list.filter((item) => {
            return item.IvState != 0;
          });
          wei = wei.sort((a, b) => a.InvoiceType - b.InvoiceType);
          this.InvoiceData = wei.concat(yi);

          this.total = res.result.totalNumber;
          this.MinMoney = res.result1.MinMoney;
          this.MaxMoney = res.result1.MaxMoney;
        } else {
          this.InvoiceData = [];
          this.total = 0;
          this.MinMoney = "";
          this.MaxMoney = "";
        }
        this.loading = false;
      });
    },
    // 获取公司数据
    GetCompany() {
      GetCompany().then((res) => {
        if (res.success) {
          this.CorporationDatas = [];
          // 公司数据格式化
          this.CorporationDatas = res.result.map((item) => {
            return {
              value: item.ComID,
              label: item.ComName,
            };
          });

          this.companyList = res.result;
        } else {
          this.companyList = [];
        }
      });
    },

    // 获取发票状态数据
    GetInvoiceStatus() {
      GetDicCategory("InvoiceStatus").then((res) => {
        if (res.success) {
          res.result = res.result.filter((item) => {
            return (
              item.Code == "1" ||
              item.Code == "0" ||
              item.Code == "4" ||
              item.Code == "5" ||
              item.Code == "7"
            );
          });
          this.InvoiceStatusList = res.result;
        } else {
          this.InvoiceStatusList = [];
        }
      });
    },
    // 获取发票类型数据
    GetInvoiceType() {
      GetDicCategory("InvoiceType").then((res) => {
        if (res.success) {
          res.result.forEach((element) => {
            const item = {
              Code: element.Code,
              Name: element.Name,
              Class: "",
            };
            switch (element.Code) {
              case "1":
                item.Class = "Closed";
                break;
              case "2":
                item.Class = "info";
                break;
              case "3":
                item.Class = "unknown";
                break;
            }
            this.InvoiceTypeList.push(item);
          });
        } else {
          this.InvoiceTypeList = [];
        }
      });
    },
    // 获取申开人数据
    GetPersonInfoList() {
      GetPersonInfo().then((res) => {
        if (res.success) {
          this.ApplyPersonList = res.result.ApplyPerson;
          this.IssuingPersonList = res.result.IssuingPerson;
        } else {
          this.PersonInfoList = [];
        }
      });
    },
    fixedShowMethod(newVal) {
      // 上方表单距下方间距
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
.formClass {
  width: 100%;
}
.info {
  background-color: #fef0f0;
}

.timeClass {
  width: 100%;
}

.dotClass {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
}

.SecondPartyNameClass div {
  margin-bottom: 10px;
}
</style>
