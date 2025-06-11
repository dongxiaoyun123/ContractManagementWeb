<template>
  <div style="padding: 8px">
    <el-card>
      <el-form label-width="90px">
        <el-row>
          <collapse>
            <div v-show="isActive">
              <el-row>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item label="回款状态">
                    <el-select
                      v-model="QueryInfo.Isdel"
                      filterable
                      placeholder="回款状态"
                      clearable
                      class="WhereClass"
                    >
                      <el-option label="正常" value="0">
                        <el-tag effect="plain" type="success">正常</el-tag>
                      </el-option>
                      <el-option label="撤回" value="1">
                        <el-tag effect="plain" type="info">撤回</el-tag>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item label="通道名称">
                    <el-input
                      v-model="QueryInfo.ChanName"
                      class="WhereClass"
                      clearable=""
                      placeholder="通道名称"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item label="合同方">
                    <el-input
                      v-model="QueryInfo.ConName"
                      class="WhereClass"
                      clearable=""
                      placeholder="合同方"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item label="付款方">
                    <el-input
                      v-model="QueryInfo.CorpName"
                      class="WhereClass"
                      clearable=""
                      placeholder="付款方"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item label="方案名称">
                    <el-input
                      v-model="QueryInfo.PlanName"
                      class="WhereClass"
                      clearable=""
                      placeholder="方案名称"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item label="合同类型">
                    <el-select
                      v-model="QueryInfo.ContractType"
                      class="WhereClass"
                      filterable
                      placeholder="合同类型"
                      clearable=""
                    >
                      <el-option
                        v-for="item in GetContractTypeArray"
                        :key="item.Code"
                        :label="item.Name"
                        :value="item.Code"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item label="方案险种">
                    <el-input
                      v-model="QueryInfo.XianZhongType"
                      class="WhereClass"
                      clearable=""
                      placeholder="方案险种"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item label="账单年月">
                    <el-date-picker
                      v-model="QueryInfo.OrderDate"
                      type="month"
                      style="width: 100%"
                      class="WhereClass"
                      placeholder="选择年月"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item label="客服">
                    <el-input
                      v-model="QueryInfo.CustomerService"
                      class="WhereClass"
                      clearable=""
                      placeholder="客服"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item label="销售">
                    <el-input
                      v-model="QueryInfo.Sale"
                      class="WhereClass"
                      clearable=""
                      placeholder="销售"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item label="初次回款">
                    <el-date-picker
                      v-model="QueryInfo.FirstReceiveTime"
                      class="WhereClass"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions"
                      clearable=""
                      @input="datetimeChange"
                    />
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
                  @click="GetSearch"
                >查 询
                </el-button>
                <el-button
                  type="info"
                  icon="el-icon-refresh-left"
                  @click="ReseatData"
                >重 置
                </el-button>
                <el-button
                  type="success"
                  icon="el-icon-download"
                  @click="ExportData"
                >导出数据
                </el-button>
                <el-button
                  type="text"
                  style="margin-left: 10px"
                  :icon="
                    isActive
                      ? 'el-icon-arrow-up el-icon--right'
                      : 'el-icon-arrow-down el-icon--right'
                  "
                  @click="CollapseClick"
                >{{ isActive ? "收起" : "展开" }}</el-button>
              </el-button-group>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="CardTableClass">
      <el-table
        v-loading="DataLoading"
        :data="CollectionData"
        highlight-current-row
      >
        <el-table-column prop="IsDel" label="状态" width="100">
          <template slot="header" slot-scope="{}">
            <span>回款状态</span>
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
                      <el-tag key="正常" effect="plain" type="success">正常</el-tag>
                    </div>
                    <div style="margin-bottom: 0">
                      <el-tag key="撤回" effect="plain" type="info">撤回</el-tag>
                    </div>
                  </span>
                </div>
              </div>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-tag v-if="scope.row.IsDel == 0" effect="plain" type="success">正常</el-tag>
            <el-tag v-if="scope.row.IsDel == 1" effect="plain" type="info">撤回</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="通道名称" prop="ChanName" width="100" />
        <el-table-column
          label="合同方名称"
          prop="ConName"
          show-overflow-tooltip
          min-width="200"
        />
        <el-table-column
          label="回款付款公司"
          prop="EnterpriseName"
          show-overflow-tooltip
          min-width="200"
        />
        <el-table-column
          label="到账时间"
          prop="PaymentDate"
          show-overflow-tooltip
          width="110"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.PaymentDate">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{
                dateFormatDate(scope.row.PaymentDate)
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="付款方名称"
          prop="CorpName"
          show-overflow-tooltip
          min-width="200"
        />
        <el-table-column width="110" property="FirstContract" label="首次合同">
          <template slot-scope="scope">
            <div v-if="scope.row.FirstContract">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{
                dateFormatDate(scope.row.FirstContract)
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="110" property="BeginTime" label="开始日期">
          <template slot-scope="scope">
            <div v-if="scope.row.BeginTime">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{
                dateFormatDate(scope.row.BeginTime)
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="110" property="EndTime" label="结束日期">
          <template slot-scope="scope">
            <div v-if="scope.row.EndTime">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{
                dateFormatDate(scope.row.EndTime)
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="方案名称"
          prop="PlanName"
          show-overflow-tooltip
          min-width="150"
        />
        <el-table-column label="合同类型" prop="ContractName" width="100" />
        <el-table-column
          label="方案险种类型"
          prop="XianZhongType"
          width="100"
        />
        <el-table-column label="账单年月" prop="OrderDateStr" width="80" />
        <el-table-column
          label="账单应收"
          prop="ShouldInAmt"
          width="100"
          sortable
        >
          <template slot-scope="scope">
            <span v-format="'¥#,##0.00'">{{ scope.row.ShouldInAmt }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="实际应缴"
          prop="ServShouldIn"
          width="100"
          sortable
        >
          <template slot-scope="scope">
            <span v-format="'¥#,##0.00'">{{ scope.row.ServShouldIn }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="累计回款金额"
          prop="ServReceive"
          width="120"
          sortable
        >
          <template slot-scope="scope">
            <span v-format="'¥#,##0.00'">{{ scope.row.ServReceive }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="本次回款金额"
          prop="ThisServReceive"
          width="120"
          sortable
        >
          <template slot-scope="scope">
            <span v-format="'¥#,##0.00'">{{ scope.row.ThisServReceive }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="客服"
          prop="UserName"
          width="100"
          show-overflow-tooltip
        />
        <el-table-column
          label="销售"
          prop="SaleName"
          width="80"
          show-overflow-tooltip
        />
        <el-table-column label="部门" prop="DepName" width="100" />
        <el-table-column label="小组" prop="GroupName" width="100" />
        <el-table-column
          width="160"
          property="FirstReceiveTime"
          label="初次回款时间"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.FirstReceiveTime">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{
                dateFormat(scope.row.FirstReceiveTime)
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="160"
          property="LastReceiveTime"
          label="最后修改时间"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.LastReceiveTime">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{
                dateFormat(scope.row.LastReceiveTime)
              }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        background
        :current-page="QueryInfo.PageIndex"
        :page-sizes="[20, 50, 100]"
        :page-size="QueryInfo.PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="Total"
        @size-change="HandleSizeChange"
        @current-change="HandleCurrentChange"
      />
    </el-card>
    <div v-if="isShowProgress" class="popContainer">
      <el-progress
        type="circle"
        :percentage="parseInt(fakes.progress * 100)"
        :stroke-width="9"
        :color="customColors"
        style="top: 30%; left: calc(50vw - 58px); color: white"
      />
    </div>
  </div>
</template>
<script>
import {
  GetCustomerCollectionData,
  GetContractType,
  ExportCustomerCollectionData,
} from "@/api/CollectionMangement";
// import moment from "moment";
import pickerOptions from "@/utils/pickerOptions";
import collapse from "../../assets/js/collapse";
import { checkValue } from "@/utils/decimals";
import { parseTime } from "@/utils"; // 时间日期格式化成字符串
import FakeProgress from "fake-progress";
export default {
  name: "CustomerCollectionData",
  components: { collapse },
  props: {},
  data() {
    return {
      DataLoading: false,
      CollectionData: [],
      pickerOptions: pickerOptions,
      GetContractTypeArray: [],
      QueryInfo: {
        Isdel: "0",
        ChanName: "",
        ConName: "",
        CorpName: "",
        PlanName: "",
        ContractType: null,
        XianZhongType: "",
        OrderDate: "",
        CustomerService: "",
        Sale: "",
        FirstReceiveTime: [],
        FirstReceiveBegin: "",
        FirstReceiveEnd: "",
        PageIndex: 1,
        PageSize: 20,
      },
      Total: 0,
      isActive: false,
      fakes: new FakeProgress({
        timeConstant: 10000,
        autoStart: false,
      }),
      isShowProgress: false,
      customColors: [
        { color: "#ff4949", percentage: 20 },
        { color: "#ffba00", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 },
      ],
    };
  },
  watch: {},
  mounted() {
    this.DefaultFirstReceiveTime();
    this.GetContractTypeList();
    this.GetCustomerCollectionData();
  },
  methods: {
    // 赋默认值
    DefaultFirstReceiveTime() {
      var now = new Date();
      var year = now.getFullYear(); // 得到年份
      var month = now.getMonth() + 1;
      this.QueryInfo.FirstReceiveTime = [new Date(`${year}-${month}-01`), now];
    },
    datetimeChange(time) {
      // 强制刷新
      this.$forceUpdate();
    },
    CollapseClick() {
      this.isActive = !this.isActive;
    },
    // 获取全部合同类型
    GetContractTypeList() {
      GetContractType().then((res) => {
        if (res.success) {
          this.GetContractTypeArray = res.result;
        } else {
          this.GetContractTypeArray = [];
        }
      });
    },
    // 列表时间格式化
    dateFormat(row) {
      if (row) {
        return this.$moment(row).format("YYYY-MM-DD HH:mm:ss");
      } else {
        return null;
      }
    },
    // 列表时间格式化
    dateFormatDate(row) {
      if (row) {
        return this.$moment(row).format("YYYY-MM-DD");
      } else {
        return null;
      }
    },
    ReseatData() {
      this.QueryInfo.Isdel = "0";
      this.QueryInfo.ChanName = "";
      this.QueryInfo.ConName = "";
      this.QueryInfo.CorpName = "";
      this.QueryInfo.PlanName = "";
      this.QueryInfo.ContractType = null;
      this.QueryInfo.XianZhongType = "";
      this.QueryInfo.OrderDate = "";
      this.QueryInfo.CustomerService = "";
      this.QueryInfo.Sale = "";
      this.QueryInfo.FirstReceiveTime = [];
      this.QueryInfo.FirstReceiveBegin = "";
      this.QueryInfo.FirstReceiveEnd = "";
      this.QueryInfo.PageIndex = 1;
      this.QueryInfo.PageSize = 20;
      this.DefaultFirstReceiveTime();
      this.GetCustomerCollectionData();
    },
    GetSearch() {
      this.QueryInfo.PageIndex = 1;
      this.QueryInfo.PageSize = 20;
      this.GetCustomerCollectionData();
    },
    // 监听 pagesize改变的事件
    HandleSizeChange(newSize) {
      this.QueryInfo.PageSize = newSize;
      this.GetCustomerCollectionData();
    },
    // 监听 页码值 改变事件
    HandleCurrentChange(newIndex) {
      this.QueryInfo.PageIndex = newIndex;
      this.GetCustomerCollectionData();
    },
    // 根据回款编号和账单编号获取账单
    GetCustomerCollectionData() {
      this.DataLoading = true;
      if (this.QueryInfo.OrderDate) {
        this.QueryInfo.OrderDate = parseTime(
          new Date(this.QueryInfo.OrderDate),
          "{y}-{m}"
        );
      }
      if (
        this.QueryInfo.FirstReceiveTime &&
        this.QueryInfo.FirstReceiveTime.length > 0
      ) {
        this.QueryInfo.FirstReceiveBegin = this.$moment(
          this.QueryInfo.FirstReceiveTime[0]
        ).format("YYYY-MM-DD");
        this.QueryInfo.FirstReceiveEnd = this.$moment(
          this.QueryInfo.FirstReceiveTime[1]
        ).format("YYYY-MM-DD");
      } else {
        this.QueryInfo.FirstReceiveBegin = "";
        this.QueryInfo.FirstReceiveEnd = "";
      }
      const parameter = {
        PageIndex: this.QueryInfo.PageIndex,
        PageSize: this.QueryInfo.PageSize,
        Isdel: checkValue(this.QueryInfo.Isdel),
        ChanName: this.QueryInfo.ChanName,
        ConName: this.QueryInfo.ConName,
        CorpName: this.QueryInfo.CorpName,
        PlanName: this.QueryInfo.PlanName,
        ContractType: this.QueryInfo.ContractType || null,
        XianZhongType: this.QueryInfo.XianZhongType,
        OrderDate: this.QueryInfo.OrderDate,
        CustomerService: this.QueryInfo.CustomerService,
        Sale: this.QueryInfo.Sale,
        FirstReceiveTime: this.QueryInfo.FirstReceiveTime,
        FirstReceiveBegin: this.QueryInfo.FirstReceiveBegin,
        FirstReceiveEnd: this.QueryInfo.FirstReceiveEnd,
      };
      GetCustomerCollectionData(parameter).then((res) => {
        this.DataLoading = false;
        if (res.success) {
          this.CollectionData = res.result.list;
          this.Total = res.result.totalNumber;
        } else {
          this.CollectionData = [];
          this.Total = 0;
        }
      });
    },

    // 导出数据
    ExportData() {
      this.isShowProgress = true;
      this.fakes.start();
      if (this.QueryInfo.OrderDate) {
        this.QueryInfo.OrderDate = parseTime(
          new Date(this.QueryInfo.OrderDate),
          "{y}-{m}"
        );
      }
      if (
        this.QueryInfo.FirstReceiveTime &&
        this.QueryInfo.FirstReceiveTime.length > 0
      ) {
        this.QueryInfo.FirstReceiveBegin = this.$moment(
          this.QueryInfo.FirstReceiveTime[0]
        ).format("YYYY-MM-DD");
        this.QueryInfo.FirstReceiveEnd = this.$moment(
          this.QueryInfo.FirstReceiveTime[1]
        ).format("YYYY-MM-DD");
      } else {
        this.QueryInfo.FirstReceiveBegin = "";
        this.QueryInfo.FirstReceiveEnd = "";
      }
      const parameter = {
        PageIndex: this.QueryInfo.PageIndex,
        PageSize: this.QueryInfo.PageSize,
        Isdel: checkValue(this.QueryInfo.Isdel),
        ChanName: this.QueryInfo.ChanName,
        ConName: this.QueryInfo.ConName,
        CorpName: this.QueryInfo.CorpName,
        PlanName: this.QueryInfo.PlanName,
        ContractType: this.QueryInfo.ContractType || null,
        XianZhongType: this.QueryInfo.XianZhongType,
        OrderDate: this.QueryInfo.OrderDate,
        CustomerService: this.QueryInfo.CustomerService,
        Sale: this.QueryInfo.Sale,
        FirstReceiveTime: this.QueryInfo.FirstReceiveTime,
        FirstReceiveBegin: this.QueryInfo.FirstReceiveBegin,
        FirstReceiveEnd: this.QueryInfo.FirstReceiveEnd,
      };
      ExportCustomerCollectionData(parameter).then((res) => {
        this.fakes.end();
        // 初始化进度条
        setTimeout(() => {
          this.fakes = new FakeProgress({
            timeConstant: 10000,
            autoStart: false,
          });
          this.isShowProgress = false;
        }, 800);
        if (res.success) {
          window.location.href = res.result;
        } else {
          this.CollectionList = [];
          this.total = 0;
        }
      });
    },
  },
};
</script>
<style scoped>
.SecondPartyNameClass div {
  margin-bottom: 10px;
}
.WhereClass {
  width: 100%;
}
/*遮罩层*/
.popContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999999;
  background: rgba(0, 0, 0, 0.6);
}

::v-deep .el-progress__text {
  color: white !important;
}
</style>
