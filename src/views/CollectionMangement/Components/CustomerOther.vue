<template>
    <el-dialog :visible.sync="ChildVisible" title="详情" @close="cancel" top="5vh" width="70%">
        <el-descriptions v-if="ClickRow" class="margin-top" :column="3" border>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-office-building"></i>
                    收款公司
                </template>
                {{ ClickRow.SecondPartyName }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-office-building"></i>
                    公司名称
                </template>
                {{ ClickRow.EnterPriseName }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-date"></i>
                    到账时间
                </template>
                {{ ClickRow.PaymentDate }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-money"></i>
                    总金额
                </template>
                <span style="font-weight:bolder;">{{ ClickRow.AmountMoney }}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-money"></i>
                    剩余金额
                </template>
                <span style="font-weight: bolder;">{{ ClickRow.RemainingAmount }}</span>
            </el-descriptions-item>
        </el-descriptions>
        <el-divider></el-divider>
        <el-tag type="">回款详情只会记录最终结果，对于多次操作回款不需要进行明细展示(同一条数据客服回款和其它回款不冲突)</el-tag>
        <el-divider></el-divider>
        <el-table :data="CollectionOrderData" border :span-method="rowSpanMethod" v-loading="loading">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column label="账单名称" prop="ContractOrderName" show-overflow-tooltip min-width="200"></el-table-column>
            <el-table-column label="账单申请日期" prop="ApplicationTime" show-overflow-tooltip width="120">
                <template slot-scope="scope">
                    <i class="el-icon-time" />
                    <span style="margin-left: 6px">{{ dateFormat(scope.row.ApplicationTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="主公司名称" prop="CompanyName" show-overflow-tooltip min-width="200"></el-table-column>
            <el-table-column label="收款项目" prop="CustomAmountName" min-width="200"></el-table-column>
            <el-table-column label="收款金额" prop="CustomAmount" width="90">
                <template slot-scope="scope">
                    <span v-format="'¥#,##0.00'">{{ scope.row.CustomAmount }}</span>
                </template>
            </el-table-column>
            <el-table-column label="回款金额" prop="OrderAmount" width="90">
                <template slot-scope="scope">
                    <span v-format="'¥#,##0.00'">{{ scope.row.OrderAmount }}</span>
                </template>
            </el-table-column>
            <el-table-column label="回款状态" prop="OrderState" width="90">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.OrderState == 2" effect="plain" type="success">已回款</el-tag>
                    <el-tag v-if="scope.row.OrderState == 3" effect="plain">部分回款</el-tag>
                </template>
            </el-table-column>
        </el-table>
        <el-divider></el-divider>
        <el-form ref="updateRef" label-width="40px">
            <el-form-item label="备注">
                <el-input v-if="ClickRow" disabled="" v-model="ClickRow.Remark" type="textarea" :rows="3" />
                <el-input v-else disabled="" v-model="Remark" type="textarea" :rows="3" />
            </el-form-item>
        </el-form>
        <el-divider />
        <el-row v-if="CancelShow" style="text-align:center;">
            <el-col :span="24">
                <el-button icon="el-icon-refresh-left" :disabled="DisabledShow" :loading="CancelLoading" type="danger"
                    @click="CancelSubmit">全部撤回</el-button>
            </el-col>
        </el-row>
    </el-dialog>
</template>
  
<script>
import {
    GetOtherOrderById,
    UpdateDataOtherCancel
} from "@/api/CollectionMangement";
export default {
    data() {
        return {
            CancelLoading: false,
            ChildVisible: false,
            loading: false,
            CollectionOrderData: [],
            Remark: '',
            CancelShow: false,
            DisabledShow: true,
        }
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        ClickRow: {
            type: Object,
        },
    },
    watch: {
        visible(newVal, oldVal) {
            this.ChildVisible = newVal;
        },
        ClickRow: {
            handler() {
                this.GetOtherOrderById();
            },
            deep: true,  // 可以深度检测到 obj 对象的属性值的变化
        },
    },
    mounted() {
        switch (sessionStorage.getItem("RoleName")) {
            case "超级管理员":
            case "总客服":
                this.CancelShow = true;
                break;
            default:
                this.CancelShow = false;
                break;
        }
    },
    methods: {
        // 列表时间格式化
        dateFormat(row) {
            if (row) {
                return this.$moment(row).format("YYYY-MM-DD");
            } else { return null; }
        },
        //根据回款编号和账单编号获取账单
        GetOtherOrderById() {
            this.loading = true;
            GetOtherOrderById(this.ClickRow.InsProductPayCode).then((res) => {
                this.loading = false;
                if (res.success) {
                    this.CollectionOrderData = res.result;
                    if (this.CollectionOrderData.length != 0)
                        this.DisabledShow = false;
                    else
                        this.DisabledShow = true;
                }
                else {
                    this.CollectionOrderData = [];
                }
            });
        },
        cancel() {
            this.ChildVisible = false;
            this.$emit('CloseDialog');
        },
        cancelRefleshData() {
            this.ChildVisible = false;
            this.$emit('CloseDialogReflesh');
        },
        //全部撤回
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
            UpdateDataOtherCancel(this.ClickRow.InsProductPayCode).then((res) => {
                this.CancelLoading = false;
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
                if (rowIndex === 0 || row.ContractOrderName !== this.CollectionOrderData[rowIndex - 1].ContractOrderName) {
                    const rowspan = this.CollectionOrderData.filter(item => item.ContractOrderName === row.ContractOrderName).length;
                    return { rowspan, colspan: 1 };
                } else {
                    return { rowspan: 0, colspan: 0 };
                }
            } else if (columnIndex === 2) {
                // 合并第一列的相同行
                if (rowIndex === 0 || row.ApplicationTime !== this.CollectionOrderData[rowIndex - 1].ApplicationTime) {
                    const rowspan = this.CollectionOrderData.filter(item => item.ApplicationTime === row.ApplicationTime).length;
                    return { rowspan, colspan: 1 };
                } else {
                    return { rowspan: 0, colspan: 0 };
                }
            }
            else if (columnIndex === 3) {
                // 合并第一列的相同行
                if (rowIndex === 0 || row.CompanyName !== this.CollectionOrderData[rowIndex - 1].CompanyName) {
                    const rowspan = this.CollectionOrderData.filter(item => item.CompanyName === row.CompanyName).length;
                    return { rowspan, colspan: 1 };
                } else {
                    return { rowspan: 0, colspan: 0 };
                }
            }
            else {
                return { rowspan: 1, colspan: 1 };
            }
        },
    }
};
</script>