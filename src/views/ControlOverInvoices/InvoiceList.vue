<template>
  <div style="padding: 8px;">
    <el-card>
      <el-form label-width="90px">
        <!-- 合同信息 -->
        <div slot="header" class="clearfix">
          <span>发票列表</span>
        </div>
        <el-row>
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item class="whereFormClass" label="发票类型">
                <el-select v-model="InvoiceType" class="timeClass" filterable placeholder="发票类型" clearable>
                  <el-option v-for="item in InvoiceTypeList" :key="item.Code" :label="item.Name" :value="item.Code">
                    <template slot-scope="scope">
                      <div style="display: flex;  align-items: center;">
                        <span slot="reference" style="margin-right: 8px;">
                          <i v-if="item.Name == '增值税专用发票'" class="dotClass" style="background-color: #13ce66" />
                          <i v-if="item.Name == '增值税普通发票'" class="dotClass" style="background-color: #ffba00" />
                          <i v-if="item.Name == '增值税电子普通发票'" class="dotClass" style="background-color: #ff4949" />
                        </span>
                        {{ item.Name }}
                      </div>
                    </template>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item class="whereFormClass" label="应收年份">
                <el-date-picker v-model="SYear" style="width:100% ;" class="timeClass" type="year" placeholder="选择年" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item class="whereFormClass" label="申开人">
                <el-select v-model="ApplyPerson" class="timeClass" filterable placeholder="申开人" clearable>
                  <el-option v-for="item in ApplyPersonList" :key="item.Code" :label="item" :value="item" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item class="whereFormClass" label="公司名称">
                <!-- <el-select v-model="CompanyId" filterable placeholder="公司名称" clearable="" remote reserve-keyword
                  :remote-method="remoteMethod" @visible-change="clearselectCorporationDatas" @change="changeCompanyId">
                  <el-option v-for="item in selectCorporationDatas" :key="item.value" :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select> -->
                <el-input v-model="CompanyId" class="timeClass" clearable="" placeholder="公司名称" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 分割----------------- -->
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item class="whereFormClass" label="发票状态">
                <el-select v-model="IvState" class="timeClass" filterable placeholder="发票状态" clearable>
                  <el-option v-for="item in InvoiceStatusList" :key="item.Code" :class="item.Class" :label="item.Name"
                             :value="item.Code"
                  >
                    <el-tag v-if="item.Code == 0" effect="plain" type="danger">未开</el-tag>
                    <el-tag v-if="item.Code == 1" effect="plain" type="success">已开</el-tag>
                    <el-tag v-if="item.Code == 5" effect="plain" type="info">作废</el-tag>
                    <el-tag v-if="item.Code == 7" effect="plain" type="warning">退回</el-tag>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item class="whereFormClass" label="应收月份">
                <el-date-picker v-model="SMonth" style="width:100% ;" class="timeClass" type="month" placeholder="选择月"
                                format="MM"
                />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item class="whereFormClass" label="开票人">
                <el-select v-model="IssuingPerson" class="timeClass" filterable placeholder="开票人" clearable>
                  <el-option v-for="item in IssuingPersonList" :key="item.Code" :label="item" :value="item" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-button-group style="margin-left: 1.3rem;">
                <el-button type="primary" icon="el-icon-search" @click="GetInvoiceDataSearch">查 询
                </el-button>
                <el-button type="info" icon="el-icon-refresh-left" @click="reseatData">重 置
                </el-button>
              </el-button-group>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
      <div :style="formShow" style="margin-left: 1.3rem;">
        <el-tooltip class="item" :content="MaxMoney" placement="bottom">
          <h5 style="width: 350px;color: #FF4949;margin: 1px 0px;">当前数据发票总金额：<span v-format="'¥#,##0.00'">{{
            MinMoney
          }}</span></h5>
        </el-tooltip>
      </div>
    </el-card>
    <el-card class="CardTableClass">
      <el-table v-loading="loading" highlight-current-row :data="InvoiceData" fit>
        <!-- <el-table-column type="index" label="#" >
          </el-table-column> -->
        <!-- <el-table-column type="selection" width="40"> </el-table-column> -->
        <el-table-column v-if="fixedLeftShow" prop="CompanyName" label="公司名称" min-width="220" fixed="left"
                         show-overflow-tooltip
        />
        <el-table-column v-else prop="CompanyName" label="公司名称" min-width="220"
                         show-overflow-tooltip
        />
        <el-table-column v-if="fixedLeftShow" prop="InvoiceHeader" label="发票抬头" min-width="220" fixed="left"
                         show-overflow-tooltip
        />
        <el-table-column v-else prop="InvoiceHeader" label="发票抬头" min-width="220"
                         show-overflow-tooltip
        />
        <el-table-column v-if="fixedLeftShow" prop="InvoiceAmount" label="发票金额" fixed="left" min-width="100" show-overflow-tooltip sortable="">
          <template slot-scope="scope">
            <span v-format="'¥#,##0.00'">{{ scope.row.InvoiceAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column v-else prop="InvoiceAmount" label="发票金额" min-width="100" show-overflow-tooltip sortable="">
          <template slot-scope="scope">
            <span v-format="'¥#,##0.00'">{{ scope.row.InvoiceAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="InvoiceTypeStr" label="发票类型" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <div style="display: flex;  align-items: center;">
              <span slot="reference" style="margin-right: 8px;">
                <i v-if="scope.row.InvoiceTypeStr == '增值税专用发票'" class="dotClass" style="background-color: #13ce66" />
                <i v-if="scope.row.InvoiceTypeStr == '增值税普通发票'" class="dotClass" style="background-color: #ffba00" />
                <i v-if="scope.row.InvoiceTypeStr == '增值税电子普通发票'" class="dotClass" style="background-color: #ff4949" />
              </span>
              {{ scope.row.InvoiceTypeStr }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="IvStateStr" label="发票状态" min-width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.IvState == 0" effect="plain" type="danger">未开</el-tag>
            <el-tag v-if="scope.row.IvState == 1" effect="plain" type="success">已开</el-tag>
            <el-tag v-if="scope.row.IvState == 5" effect="plain" type="info">作废</el-tag>
            <el-tag v-if="scope.row.IvState == 7" effect="plain" type="warning">退回</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="ApplyPerson" label="申开人" min-width="100" />
        <el-table-column prop="IssuingDateStr" label="应收日期" min-width="100" />
        <el-table-column prop="IssuingTimeStr" label="开具时间" min-width="120" show-overflow-tooltip />
        <el-table-column prop="IssuingPerson" label="开票人" min-width="0" />
        <el-table-column prop="InvoiceRemark" label="备注" align="left" min-width="200" show-overflow-tooltip />
        <el-table-column v-if="fixedLeftShow" label="操作" fixed="right" min-width="80">
          <template slot-scope="scope" class="tableRowClass">
            <el-button icon="el-icon-edit" type="text" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column v-else label="操作" min-width="80">
          <template slot-scope="scope" class="tableRowClass">
            <el-button icon="el-icon-edit" type="text" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination :current-page="queryInfo.pagenum" :page-sizes="[20, 50, 100]"
                     :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"
                     @size-change="handleSizeChange" @current-change="handleCurrentChange"
      />
    </el-card>

    <el-dialog :visible.sync="updateDialogVisible" :lock-scroll="false" width="60%"
               @close="detailUpdateDialogVisibleClosed"
    >
      <div slot="title" class="dialog-title">
        <span>编辑发票信息</span>
      </div>
      <el-form ref="updateInvoiceRef" :model="updateInvoiceFrom" :rules="updateContractsRules" label-width="100px"
               class="formClass"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司" prop="CompanyId">
              <el-select v-model="updateInvoiceFrom.CompanyId" style="width:100% ;" filterable placeholder="公司名称" remote
                         reserve-keyword :remote-method="remoteMethod" disabled
                         @visible-change="clearselectCorporationDatas" @change="changeCompanyId"
              >
                <el-option v-for="item in selectCorporationDatas" :key="item.value" :label="item.label"
                           :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票抬头" prop="InvoiceHeader">
              <el-input v-model="updateInvoiceFrom.InvoiceHeader" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="发票金额" prop="InvoiceAmount">
              <el-input v-model="updateInvoiceFrom.InvoiceAmount" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票类型" prop="InvoiceType">
              <el-select v-model="updateInvoiceFrom.InvoiceType" class="timeClass" filterable placeholder="发票类型" disabled>
                <el-option v-for="item in InvoiceTypeList" :key="item.Code" :class="item.Class" :label="item.Name"
                           :value="item.Code"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="应收年份" prop="SYear">
              <el-input v-model="updateInvoiceFrom.SYear" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="应收月份" prop="SMonth">
              <el-input v-model="updateInvoiceFrom.SMonth" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开具时间" prop="IssuingTime">
              <el-date-picker v-model="updateInvoiceFrom.IssuingTime" type="date" placeholder="开具时间" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申开时间" prop="ApplyTime">
              <el-date-picker v-model="updateInvoiceFrom.ApplyTime" type="date" placeholder="申开时间" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="申开人" prop="ApplyPerson">
              <el-select v-model="updateInvoiceFrom.ApplyPerson" filterable allow-create default-first-option
                         placeholder="申开人" disabled
              >
                <el-option v-for="item in ApplyPersonList" :key="item.Code" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开票人" prop="IssuingPerson">
              <el-select v-model="updateInvoiceFrom.IssuingPerson" filterable allow-create default-first-option
                         placeholder="开票人" disabled
              >
                <el-option v-for="item in IssuingPersonList" :key="item.Code" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="发票状态" prop="IvState">
              <el-select v-model="updateInvoiceFrom.IvState" :disabled="disabledFlag" filterable placeholder="发票状态"
                         @change="ivStateChange"
              >
                <el-option v-for="item in InvoiceStatusList" :key="item.Code" :class="item.Class" :label="item.Name"
                           :value="item.Code"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票内容" prop="InvoiceContent">
              <el-input v-model="updateInvoiceFrom.InvoiceContent" placeholder="请输入发票内容" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注" prop="InvoiceRemark">
          <el-input v-model="updateInvoiceFrom.InvoiceRemark" type="textarea" :rows="3" placeholder="请输入备注" />
        </el-form-item>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button type="primary" :loading="LoadingUpdate" @click="saveUpdate">修 改</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetCompany,
  GetDicCategory,
  GetInvoiceDataMethod,
  UpdateInvoiceInfo,
  GetPersonInfo,
} from "@/api/CollectionMangement";
import { showLoading, hideLoading } from "@/common/loading";
import { parseTime, getDateByTimes } from "@/utils"; // 时间日期格式化成字符串
export default {
  data() {
    return {
      fixedLeftShow: true,
      formShow: '',
      GetContractTypeArray: [],
      ContractCode: "",
      ContractName: "",
      ComName: "",
      ContractType: "",
      BeginTime: "",
      EndTime: "",
      BeginSignTime: "",
      EndSignTime: "",
      // ContractRangeTime: [],
      ContractSignTime: [],
      entLoading: false,
      // 公司数据返回列表
      CorporationDatas: [],
      // 公司列表下拉数据结果列表
      selectCorporationDatas: [],
      LoadingUpdate: false,
      // 获取用户列表查询参数对象
      queryInfo: {
        pagenum: 1,
        pagesize: 20,
      },
      total: 0,
      detailDialogVisible: false,
      detailAddDialogVisible: false,
      updateDialogVisible: false,
      InvoiceData: [],
      corp_id: "",
      updateInvoiceFrom: {
        Id: "",
        CompanyId: "",
        InvoiceHeader: "",
        InvoiceAmount: "",
        InvoiceType: "",
        IvState: "",
        SYear: "",
        SMonth: "",
        IssuingTime: "",
        ApplyTime: "",
        ApplyPerson: "",
        IssuingPerson: "",
        InvoiceContent: "",
        InvoiceRemark: "",
      },
      loading: false,
      CorporationDatas: [],
      selectCorporationDatas: [],
      UserList: [],
      PaymentMethodList: [],
      DicCategoryList: [],
      updateContractsRules: {
        // CompanyId: [
        //   { required: true, message: "请选择公司", trigger: "change" },
        // ],
        // InvoiceHeader: [
        //   { required: true, message: "请输入发票抬头", trigger: "blur" },
        //   {
        //     min: 1,
        //     max: 50,
        //     message: "长度在 1 到 50 个字符内",
        //     trigger: "blur",
        //   },
        // ],
        // InvoiceAmount: [
        //   {
        //     required: false,
        //     pattern:
        //       /^([0-9]\d*(\.\d{1,2})?|([0](\.([0][0-9]|[0-9]\d{0,1}))))$/,
        //     message: "发票金额输入不合法（不能小于0小数位不超过2位）",
        //     trigger: "blur",
        //   },
        // ],
        // InvoiceType: [
        //   { required: true, message: "请选择发票类型", trigger: "change" },
        // ],
        // IvState: [
        //   { required: true, message: "请选择发票状态", trigger: "change" },
        // ],
        // SYear: [
        //   { required: true, message: "请选择应收年份", trigger: "change" },
        // ],
        // SMonth: [
        //   { required: true, message: "请选择应收月份", trigger: "change" },
        // ],
        // IssuingTime: [
        //   { required: true, message: "请选择开具时间", trigger: "change" },
        // ],
        // ApplyTime: [
        //   { required: true, message: "请选择申开时间", trigger: "change" },
        // ],
        // ApplyPerson: [
        //   { required: true, message: "请选择/输入申开人", trigger: "blur" },
        // ],
        // IssuingPerson: [
        //   { required: true, message: "请选择/输入开票人", trigger: "blur" },
        // ],
      },
      LoadingUpdateState: false,
      InvoiceStatusList: [],
      InvoiceTypeList: [],
      CompanyId: null,
      InvoiceType: null,
      IvState: null,
      SYear: null,
      SMonth: null,
      ApplyPerson: '',
      IssuingPerson: '',
      ApplyPersonList: [],
      IssuingPersonList: [],
      disabledFlag: false,
      MinMoney: '',
      MaxMoney: '',
    };
  },
  watch: {
    '$store.getters.clientWidth'(newVal, oldVal) {
      this.fixedShowMethod(newVal);
    },
  },
  created() { },
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
  },
  methods: {
    // InvoiceTypeStyle({ row, column, rowIndex, columnIndex }) {
    //   if (columnIndex === 3) {      // 表格的第4列做处理

    //     switch (row.InvoiceTypeStr) {
    //       case "增值税专用发票":
    //         return 'background:#f0f9eb;'
    //       case "增值税普通发票":
    //         return 'background:#FEF0F0;'
    //       case "增值税电子普通发票":
    //         return 'background:oldlace;'
    //     }
    //   }

    // },

    reseatData() {
      this.CompanyId = null;
      this.InvoiceType = null;
      this.IvState = null;
      this.SYear = null;
      this.SMonth = null;
      this.ApplyPerson = '';
      this.IssuingPerson = '';
      this.queryInfo.pagesize = 20;
      this.queryInfo.pagenum = 1;
      this.GetInvoiceData();
    },
    ivStateChange(val) {
      if (val == "1") {
        const nowDate = new Date()
        this.updateInvoiceFrom.IssuingTime = parseTime(nowDate, "{y}-{m}-{d}");
        this.updateInvoiceFrom.IssuingPerson = sessionStorage.getItem("User_RealName");
      }
    },
    changeCompanyId(e) {
      var item = this.selectCorporationDatas.filter((item) => {
        return item.value == e;
      });
      this.addContractsForm.FirstPartyName = item[0].label;
    },
    changeCompanyIdUpdate(e) {
      var item = this.selectCorporationDatas.filter((item) => {
        return item.value == e;
      });
      this.updateInvoiceFrom.FirstPartyName = item[0].label;
    },
    detailUpdateDialogVisibleClosed() {
      this.$refs.updateInvoiceRef.resetFields();
    },
    // 关闭远程搜索下拉时需要清空筛选出来的数据进行重新筛选
    clearselectCorporationDatas(e) {
      this.selectCorporationDatas = [];
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
    // 编辑获取反填信息
    showEditDialog(item) {
      this.remoteMethodShow(item.CompanyId);
      // this.updateInvoiceFrom = item;
      this.disabledFlag = item.IvState != 0;
      this.updateInvoiceFrom.InvoiceType = item.InvoiceType + "";
      this.updateInvoiceFrom.IvState = item.IvState + "";
      this.updateInvoiceFrom.IssuingTime = item.IssuingTime ? parseTime(new Date(item.IssuingTime), "{y}-{m}-{d}") : null;
      this.updateInvoiceFrom.ApplyTime = item.ApplyTime ? parseTime(new Date(item.ApplyTime), "{y}-{m}-{d}") : null;
      this.updateInvoiceFrom.Id = item.Id;
      this.updateInvoiceFrom.CompanyId = item.CompanyId;
      this.updateInvoiceFrom.InvoiceHeader = item.InvoiceHeader;
      this.updateInvoiceFrom.InvoiceAmount = item.InvoiceAmount;
      this.updateInvoiceFrom.SYear = item.SYear + "";
      this.updateInvoiceFrom.SMonth = item.SMonth + "";
      this.updateInvoiceFrom.ApplyPerson = item.ApplyPerson;
      this.updateInvoiceFrom.IssuingPerson = item.IssuingPerson;
      this.updateInvoiceFrom.InvoiceContent = item.InvoiceContent;
      this.updateInvoiceFrom.InvoiceRemark = item.InvoiceRemark;
      this.updateDialogVisible = true;
    },
    // 保存修改
    saveUpdate() {
      this.LoadingUpdate = true;
      // 提交请求前，表单预验证
      this.$refs.updateInvoiceRef.validate(async (valid, object) => {
        // 表单预校验失败
        if (!valid) {
          this.LoadingUpdate = false;
          // 滚到验证失败的位置
          this.$nextTick(() => {
            const isError = document.getElementsByClassName("is-error");
            if (isError.length != 0) {
 isError[0].scrollIntoView({
                // 滚动到指定节点
                // 值有start,center,end，nearest，当前显示在视图区域中间
                block: "center",
                // 值有auto、instant,smooth，缓动动画（当前是慢速的）
                behavior: "smooth",
              });
}
            return;
          });
          return;
        } else {
          UpdateInvoiceInfo(this.updateInvoiceFrom).then((res) => {
            if (res.success) {
              this.$message.success("操作成功");
              this.updateDialogVisible = false;
              this.GetInvoiceData();
            } else {
              this.$message.error(res.resultMessage);
            }
            this.LoadingUpdate = false;
          });
        }
      });
    },
    GetInvoiceDataSearch() {
      this.queryInfo.pagenum = 1;
      this.queryInfo.pagesize = 20;
      this.GetInvoiceData();
    },
    // 获取合同列表数据
    GetInvoiceData() {
      this.loading = true;
      if (this.SYear) { this.SYear = parseTime(new Date(this.SYear), "{y}") }
      if (this.SMonth) { this.SMonth = parseTime(new Date(this.SMonth), "{m}") }

      GetInvoiceDataMethod(
        this.CompanyId,
        this.InvoiceType,
        this.IvState,
        this.SYear,
        this.SMonth,
        this.ApplyPerson,
        this.IssuingPerson,
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      ).then((res) => {
        if (res.success) {
          var wei = res.result.list.filter((item) => {
            return item.IvState == 0
          })
          var yi = res.result.list.filter((item) => {
            return item.IvState != 0
          })
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
            return item.Code == "1" || item.Code == "0" || item.Code == "5" || item.Code == "7"
          })
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
          res.result.forEach(element => {
            const item = {
              Code: element.Code,
              Name: element.Name,
              Class: "",
            }
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
          console.log(this.InvoiceTypeList);

          // this.InvoiceTypeList = res.result;
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

    // 输入过滤
    remoteMethod(query) {
      if (query !== "") {
        this.entLoading = true;
        setTimeout(() => {
          this.entLoading = false;
          this.selectCorporationDatas = this.CorporationDatas.filter((item) => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.selectCorporationDatas = [];
      }
    },
    // 反填只显示选中的公司名称
    remoteMethodShow(query) {
      if (query !== "") {
        this.entLoading = true;
        setTimeout(() => {
          this.entLoading = false;
          this.selectCorporationDatas = this.CorporationDatas.filter((item) => {
            return item.value == query;
          });
        }, 200);
      } else {
        this.selectCorporationDatas = [];
      }
    },
    fixedShowMethod(newVal) {
      // 上方表单距下方间距
      if (newVal < 768) {
        this.formShow = 'margin-top: 18px;';
        this.fixedLeftShow = false;
      } else {
        this.formShow = 'margin-top: 0;';
        this.fixedLeftShow = true;
      }
    }
  },
};
</script>

<style scoped>
.formClass {
  width: 100%;
}

.moneyClass {
  color: #67C23A;
}

.Executing {
  background-color: #f0f9eb;
}

.Closed {
  background-color: #f0f9eb;
}

.unknown {
  background-color: oldlace;
}

.DueOutstanding {
  background-color: #FEF0F0;
}

.info {
  background-color: #FEF0F0;
}

.timeClass {
  width: 100%;
}

.dotClass {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: block;
}
</style>

