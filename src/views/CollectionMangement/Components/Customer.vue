<template>
  <el-dialog
    v-dialog-drag-toggle-fullscreen
    :visible.sync="ChildVisible"
    fullscreen
    :close-on-click-modal="false"
    @close="cancel"
  >
    <template #title>
      <span>详情</span>
      <el-tag
        style="margin-right: 1.5rem; float: right"
        type="info"
        size="mini"
        effect="plain"
      >Esc键可关闭对话框</el-tag>
      <el-tag style="margin-left: 1rem" type="" size="mini" effect="plain">回款详情只会记录最终结果，对于多次操作回款不需要进行明细展示(同一条数据客服回款和其它回款不冲突)</el-tag>
    </template>
    <el-descriptions v-if="clickRow" class="margin-top" :column="3" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building" />
          收款公司
        </template>
        {{ clickRow.SecondPartyName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building" />
          公司名称
        </template>
        {{ clickRow.EnterPriseName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date" />
          到账时间
        </template>
        {{ clickRow.PaymentDate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-money" />
          总金额
        </template>
        <span style="font-weight: bolder">{{ clickRow.AmountMoney }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-money" />
          剩余金额
        </template>
        <span style="font-weight: bolder">{{ clickRow.RemainingAmount }}</span>
      </el-descriptions-item>
    </el-descriptions>
    <el-divider />
    <el-table
      v-loading="loading"
      :data="CollectionOrderData"
      border
      :cell-style="showCollection"
      height="calc(100vh - 285px)"
      row-key="ID"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      default-expand-all
    >
      <el-table-column label="通道名称" prop="ChName" width="120" />
      <el-table-column
        label="合同方名称"
        prop="ConName"
        show-overflow-tooltip
        min-width="190"
      />
      <el-table-column
        label="付款方名称"
        prop="CorpName"
        show-overflow-tooltip
        min-width="190"
      />
      <el-table-column
        label="方案名称"
        prop="PlanName"
        show-overflow-tooltip
        min-width="150"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.PlanName == '......'">
            <svg-icon
              style="color: inherit; font-size: 11px"
              icon-class="ExpandDetail"
            />
          </span>
          <span v-else>{{ scope.row.PlanName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账单年月" prop="OrderDateStr" width="85" />
      <el-table-column
        label="账单应收"
        prop="ShouldInAmt"
        width="100"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-format="'¥#,##0.00'">{{ scope.row.ShouldInAmt }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="实际应缴"
        prop="ServShouldIn"
        width="100"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-format="'¥#,##0.00'">{{ scope.row.ServShouldIn }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="回款金额"
        prop="ServReceive"
        width="100"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-format="'¥#,##0.00'">{{ scope.row.ServReceive }}</span>
        </template>
      </el-table-column>
      <el-table-column label="回款状态" prop="ReceiveState" width="90">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.ReceiveState == 2" effect="plain">部分回款</el-tag>
          <el-tag
            v-if="scope.row.ReceiveState == 3"
            type="success"
            effect="plain"
          >全额回款</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-form ref="updateRef" label-width="40px" style="margin-top: 1rem">
      <el-form-item label="备注">
        <el-input
          v-if="clickRow"
          v-model="clickRow.Remark"
          disabled=""
          :rows="1"
        >
          <el-button
            slot="append"
            icon="el-icon-document-copy"
            @click="copyText"
          />
        </el-input>
      </el-form-item>
    </el-form>
    <el-row v-if="CancelShow" style="text-align: center">
      <el-col :span="24">
        <el-button
          icon="el-icon-refresh-left"
          :disabled="DisabledShow"
          :loading="CancelLoading"
          type="danger"
          @click="CancelSubmit"
        >全部撤回</el-button>
        <el-button
          v-if="ifShowHistoryData"
          icon="el-icon-refresh-left"
          :disabled="DisabledShowOld"
          :loading="CancelLoadingOld"
          type="warning"
          @click="CancelSubmitOld"
        >全部撤回(历史)</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import {
  GetCollectionOrderNyId,
  GetCollectionOrderNyIdOld,
  UpdateDataCancelColl,
  UpdateDataCancelCollOld,
} from "@/api/CollectionMangement";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    clickRow: {
      type: [Object, Array], // 允许 Object 或 Array
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      CancelLoading: false,
      CancelLoadingOld: false,
      ChildVisible: false,
      loading: false,
      CollectionOrderData: [],
      Remark: "",
      CancelShow: true,
      DisabledShow: true,
      DisabledShowOld: true,
      ifShowHistoryData: false,
    };
  },
  watch: {
    visible(newVal, oldVal) {
      this.ChildVisible = newVal;
    },
    clickRow: {
      handler() {
        this.GetCollectionOrderNyId();
        this.GetCollectionOrderNyIdOld();
      },
      deep: true, // 可以深度检测到 obj 对象的属性值的变化
    },
  },
  mounted() {
    // console.log(this.$store.getters.roles[0]);
    this.ifShowHistoryData = sessionStorage.getItem("RoleName") == "超级管理员";
  },
  methods: {
    copyText() {
      const textarea = document.createElement("textarea");
      textarea.value = this.clickRow.Remark || this.Remark;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      this.$message.success("复制成功！");
    },
    // 为要复制的单元格填充背景颜色
    showCollection({ row, column }) {
      if (column.label == "实际应缴") {
        // 这里根据 group 的值来设置不同的边框颜色，比如取模得到两种颜色
        const borderColor = row.GroupIndex % 2 === 0 ? "#FFEA83" : "#83E0FF"; // 金色 vs. 深天蓝
        const backgroundColors =
          row.GroupIndex % 2 === 0 ? "#FFFCE5" : "#E5FAFF"; // 金色 vs. 深天蓝
        return {
          borderLeft: `5px solid ${borderColor}`,
          paddingLeft: "5px", // 保证文本不挨边框
          backgroundColor: `${backgroundColors}`,
          // backgroundColor: "#FFFFFF",
        };
      } else {
        return {
          backgroundColor: "#FFFFFF",
        };
      }
    },
    // 根据回款编号和账单编号获取账单
    GetCollectionOrderNyId() {
      this.loading = true;
      GetCollectionOrderNyId(this.clickRow.InsProductPayCode).then((res) => {
        this.loading = false;
        if (res.success) {
          this.CollectionOrderData = res.result;
          if (this.CollectionOrderData.length != 0) {
            this.DisabledShow = false;
          } else {
            this.DisabledShow = true;
          }
        } else {
          this.CollectionOrderData = [];
        }
      });
    },
    // 根据回款编号和账单编号获取账单
    GetCollectionOrderNyIdOld() {
      GetCollectionOrderNyIdOld(this.clickRow.InsProductPayCode).then((res) => {
        if (res.success) {
          if (res.result.length != 0) {
            this.DisabledShowOld = false;
          } else {
            this.DisabledShowOld = true;
          }
        }
      });
    },
    cancel() {
      this.ChildVisible = false;
      this.$emit("CloseDialog");
    },
    cancelRefleshData() {
      this.ChildVisible = false;
      this.$emit("CloseDialogReflesh");
    },
    // 全部撤回
    async CancelSubmit() {
      const confirmResult = await this.$confirm(
        "此操作将撤回此条数据的全部账单回款数据, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.warning("已取消操作");
      }
      this.CancelLoading = true;
      UpdateDataCancelColl(this.clickRow.InsProductPayCode).then((res) => {
        this.CancelLoading = false;
        if (res.success) {
          this.$message.success("操作成功！");
          this.cancelRefleshData();
        } else {
          return this.$message.error(res.resultMessage);
        }
      });
    },

    // 全部撤回(历史)
    async CancelSubmitOld() {
      const confirmResult = await this.$confirm(
        "此操作将撤回此条数据的全部账单回款数据, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.warning("已取消操作");
      }
      this.CancelLoadingOld = true;
      UpdateDataCancelCollOld(this.clickRow.InsProductPayCode).then((res) => {
        this.CancelLoadingOld = false;
        if (res.success) {
          this.$message.success("操作成功！");
          this.cancelRefleshData();
        } else {
          return this.$message.error(res.resultMessage);
        }
      });
    },
    rowSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        // 合并第一列的相同行
        if (
          rowIndex === 0 ||
          row.ChanID !== this.CollectionOrderData[rowIndex - 1].ChanID
        ) {
          const rowspan = this.CollectionOrderData.filter(
            (item) => item.ChanID === row.ChanID
          ).length;
          return { rowspan, colspan: 1 };
        } else {
          return { rowspan: 0, colspan: 0 };
        }
      } else if (columnIndex === 2) {
        // 合并第一列的相同行
        if (
          rowIndex === 0 ||
          row.ConID !== this.CollectionOrderData[rowIndex - 1].ConID ||
          row.ChanID !== this.CollectionOrderData[rowIndex - 1].ChanID
        ) {
          const rowspan = this.CollectionOrderData.filter(
            (item) => item.ConID === row.ConID && item.ChanID === row.ChanID
          ).length;
          return { rowspan, colspan: 1 };
        } else {
          return { rowspan: 0, colspan: 0 };
        }
      } else if (columnIndex === 3) {
        // 合并第一列的相同行
        if (
          rowIndex === 0 ||
          row.CorpID !== this.CollectionOrderData[rowIndex - 1].CorpID ||
          row.ConID !== this.CollectionOrderData[rowIndex - 1].ConID ||
          row.ChanID !== this.CollectionOrderData[rowIndex - 1].ChanID
        ) {
          const rowspan = this.CollectionOrderData.filter(
            (item) =>
              item.CorpID === row.CorpID &&
              item.ConID === row.ConID &&
              item.ChanID === row.ChanID
          ).length;
          return { rowspan, colspan: 1 };
        } else {
          return { rowspan: 0, colspan: 0 };
        }
      } else if (columnIndex === 4) {
        // 合并第一列的相同行
        if (
          rowIndex === 0 ||
          row.IPlanID !== this.CollectionOrderData[rowIndex - 1].IPlanID ||
          row.CorpID !== this.CollectionOrderData[rowIndex - 1].CorpID ||
          row.ConID !== this.CollectionOrderData[rowIndex - 1].ConID ||
          row.ChanID !== this.CollectionOrderData[rowIndex - 1].ChanID
        ) {
          const rowspan = this.CollectionOrderData.filter(
            (item) =>
              item.IPlanID === row.IPlanID &&
              item.CorpID === row.CorpID &&
              item.ConID === row.ConID &&
              item.ChanID === row.ChanID
          ).length;
          return { rowspan, colspan: 1 };
        } else {
          return { rowspan: 0, colspan: 0 };
        }
      } else {
        return { rowspan: 1, colspan: 1 };
      }
    },
  },
};
</script>
