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
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item label="到账时间">
                <el-date-picker v-model="PaymentDate" style="width:100% ;" class="comentClass" type="daterange"
                                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"
                                clearable="" @input="datetimeChange"
                />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item label="收取时间">
                <el-date-picker v-model="CollectionTime" style="width:100% ;" class="comentClass" type="daterange"
                                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"
                                clearable="" @input="datetimeChange"
                />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item label="公司名称">
                <el-input v-model="Condition" clearable placeholder="公司名称" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item label="收款公司" prop="SecondPartyName">
                <el-select v-model="SecondPartyName" class="comentClass" filterable placeholder="收款公司" clearable="">
                  <el-option v-for="item in DicCategoryList" :key="item.Id" :label="item.Name" :value="item.Id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-button-group style="margin-left: 1.3rem;margin-bottom: 18px;">
                <el-button type="primary" icon="el-icon-search" @click="GetAdmin_PermissionSearch">查
                  询</el-button>
                <el-button type="success" icon="el-icon-download" :loading="ExportLoading" @click="ExportCollection">导出数据
                </el-button>
              </el-button-group>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
      <el-descriptions style="margin-left: 1.3rem;" class="margin-top" :column="descriptionColumn" border>
        <el-descriptions-item v-for="item in TotalSecondPartyNameList" :key="item" label-style="width:170px">
          <template slot="label">
            <i class="el-icon-money" />
            {{ item.SecondPartyName }}
          </template>
          <div>
            <el-tooltip v-if="item.Sum > 0" class="item" :content="item.SumDetail" placement="bottom">
              <span v-format="'¥#,##0.00'" style="color: #ff4949;">{{
                item.Sum
              }}</span>
            </el-tooltip>
            <span v-else v-format="'¥#,##0.00'" style="color: #ff4949;">{{
              item.Sum
            }}</span>
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="CardTableClass">
      <el-table v-loading="loading" highlight-current-row :data="CollectionList" fit>
        <el-table-column prop="EnterPriseName" label="公司名称" min-width="250" show-overflow-tooltip />
        <el-table-column prop="SecondPartyName" label="收款公司" min-width="100" show-overflow-tooltip />
        <el-table-column prop="AmountMoney" label="金额" min-width="100" sortable="">
          <template slot-scope="scope">
            <span v-format="'¥#,##0.00'">{{ scope.row.AmountMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="PaymentDate" label="到账时间" sortable="" min-width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.PaymentDate">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.PaymentDate }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="States" label="回款状态" min-width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.States == 1" effect="plain" type="danger">未回款</el-tag>
            <el-tag v-if="scope.row.States == 2" effect="plain" type="success">已回款</el-tag>
            <el-tag v-if="scope.row.States == 3" effect="plain">有余额</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="User_Name" label="收取人" min-width="100" />
        <el-table-column prop="CollectionTime" label="收取时间" min-width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.CollectionTime">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.CollectionTime }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="Remark" label="备注" align="left" min-width="250" show-overflow-tooltip />
        <el-table-column v-if="StatesShow && fixedLeftShow" label="操作" fixed="right" width="150">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" type="text" size="mini" @click="
              UpdateDialog(scope.row.InsProductPayCode, scope.row.Remark)
            "
            >修改</el-button>
            <el-button icon="el-icon-view" type="text" size="mini" @click="
              ShowDialog(scope.row)
            "
            >详情</el-button>
          </template>
        </el-table-column>
        <el-table-column v-else-if="StatesShow && !fixedLeftShow" label="操作" width="150">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" type="text" size="mini" @click="
              UpdateDialog(scope.row.InsProductPayCode, scope.row.Remark)
            "
            >修改</el-button>
            <el-button icon="el-icon-view" type="text" size="mini" @click="
              ShowDialog(scope.row)
            "
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination background :current-page="queryInfo.pagenum" :page-sizes="[20, 50, 100]" :page-size="queryInfo.pagesize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
      />
    </el-card>

    <el-dialog title="修改备注" :visible.sync="updateDialogVisible" width="30%">
      <el-form ref="updateRef" :model="updateCollectionFrom" label-width="80px">
        <el-form-item label="备注">
          <el-input v-model="updateCollectionFrom.Remark" type="textarea" :rows="3" placeholder="2022年6月补充医疗" />
        </el-form-item>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button v-loading.fullscreen.lock="LoadingUpdate" type="primary" @click="saveUpdate">确
              定</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- <ComponentsDialog :visible="dialogVisible" :ClickRow="ClickRow" @CloseDialog="CloseComponentsDialog">
    </ComponentsDialog> -->
  </div>
</template>

<script>
import { getDateByTimes } from "@/utils"; // 时间日期格式化成字符串
import {
  GetAdmin_Permission,
  UpdateDataRemark,
  GetAdmin_PermissionExport,
} from "@/api/CollectionMangement";
import {
  GetDicCategoryC,
} from "@/api/SystemManagement";
// import ComponentsDialog from "./Components"
import moment from "moment"; // 导入模块
moment.locale("zh-cn"); // 设置语言 或 moment.lang('zh-cn');
export default {
  name: 'ReceivedList',
  // components: { ComponentsDialog },
  data() {
    return {
      DicCategoryList: [],
      ClickRow: null,
      dialogVisible: false,
      SecondPartyName: '',
      descriptionColumn: 3,
      TotalSecondPartyNameList: [],
      fixedLeftShow: true,
      formShow: '',
      totalMoney: 0,
      PaymentDate: [],
      PaymentDateBegin: "",
      PaymentDateEnd: "",
      CollectionTime: [],
      CollectionTimeBegin: "",
      CollectionTimeEnd: "",
      ExportLoading: false,
      StatesShow: false,
      States: 0, // 回款状态
      Condition: "", // 公司名称查询字段
      IfUser: "2",
      LoadingUpdate: false,
      // 获取用户列表查询参数对象
      queryInfo: {
        pagenum: 1,
        pagesize: 20,
      },
      total: 0,
      updateDialogVisible: false,
      CollectionList: [],
      updateCollectionFrom: {
        InsProductPayCode: "",
        Remark: "",
      },
      employeeList: [],
      myHeaders: { 'X-Token': sessionStorage.getItem("token") },
      RoleName: sessionStorage.getItem("RoleName"),
      fileList: [], // 文件列表
      fileListCopy: [], // 文件列表
      file: null,
      loading: false,
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
  },
  created() {
    this.PaymentDate = [moment().subtract(1, 'months').startOf('month').format("YYYY-MM-DD"), moment().format('YYYY-MM-DD')];
  },
  // 加载完成后执行调取回款数据接口
  mounted() {
    this.GetDicCategoryC();
    this.fixedShowMethod(document.body.clientWidth);
    switch (sessionStorage.getItem("RoleCode")) {
      case "25302854-7FBE-F189-3AF2-784BBADE7F15":
        this.StatesShow = false;
        break;
      default:
        this.StatesShow = true;
        break;
    }
    this.GetAdmin_Permission();
  },
  methods: {
    ShowDialog(row) {
      this.ClickRow = Object.assign({}, row); // 创建新的对象副本;
      this.dialogVisible = true;
    },
    CloseComponentsDialog() {
      this.dialogVisible = false;
    },
    // 获取乙方公司数据
    GetDicCategoryC() {
      GetDicCategoryC("", 1, 100000).then((res) => {
        if (res.success) {
          this.DicCategoryList = res.result.list;
        } else {
          this.DicCategoryList = [];
        }
      });
    },
    datetimeChange(time) {
      // 强制刷新
      this.$forceUpdate();
    },
    // 保存修改
    saveUpdate() {
      this.LoadingUpdate = true;
      UpdateDataRemark(
        this.updateCollectionFrom.InsProductPayCode,
        this.updateCollectionFrom.Remark
      ).then((res) => {
        if (res.success) {
          this.updateDialogVisible = false;
          this.$message.success("操作成功");
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
    // 绑定填写备注弹出窗口
    UpdateDialog(InsProductPayCode, Remark) {
      this.updateCollectionFrom.InsProductPayCode = InsProductPayCode;
      this.updateCollectionFrom.Remark = Remark;
      this.updateDialogVisible = true;
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
      if (this.CollectionTime && this.CollectionTime.length > 0) {
        this.CollectionTimeBegin = this.$moment(this.CollectionTime[0]).format("YYYY-MM-DD");
        this.CollectionTimeEnd = this.$moment(this.CollectionTime[1]).format("YYYY-MM-DD");
      } else {
        this.CollectionTimeBegin = '';
        this.CollectionTimeEnd = '';
      }
      GetAdmin_Permission(
        this.IfUser,
        this.Condition,
        this.States,
        this.PaymentDateBegin,
        this.PaymentDateEnd,
        this.CollectionTimeBegin,
        this.CollectionTimeEnd,
        this.SecondPartyName,
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      ).then((res) => {
        if (res.success) {
          this.CollectionList = res.result.list;
          this.total = res.result.totalNumber;
          this.TotalSecondPartyNameList = res.result1;
        } else {
          this.CollectionList = [];
          this.total = 0;
          this.TotalSecondPartyNameList = [];
        }
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
      if (this.CollectionTime && this.CollectionTime.length > 0) {
        this.CollectionTimeBegin = this.$moment(this.CollectionTime[0]).format("YYYY-MM-DD");
        this.CollectionTimeEnd = this.$moment(this.CollectionTime[1]).format("YYYY-MM-DD");
      } else {
        this.CollectionTimeBegin = '';
        this.CollectionTimeEnd = '';
      }
      GetAdmin_PermissionExport(
        this.IfUser,
        this.Condition,
        this.States,
        this.PaymentDateBegin,
        this.PaymentDateEnd,
        this.CollectionTimeBegin,
        this.CollectionTimeEnd,
        this.SecondPartyName
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
    fixedShowMethod(newVal) {
      // 上方表单距下方间距
      if (newVal < 768) {
        this.descriptionColumn = 1;

        this.formShow = 'margin-top: 18px;';
        this.fixedLeftShow = false;
      } else {
        this.descriptionColumn = 3;

        this.formShow = 'margin-top: 0;';
        this.fixedLeftShow = true;
      }
    }
  },
};
</script>

<style scoped>
.displayNoneClass {
  display: none;
}

/* 如果在行中存在按钮（标签除外），可能会导致行高不一致问题，那么需要在页面中加上这一句 */
/* .el-button--small,
.el-button--small.is-round {
  padding: 4px 15px;
} */

.buttonCenter {
  text-align: center;
  margin-top: 20px;
}

.comentClass {
  width: 100%;
}
</style>
