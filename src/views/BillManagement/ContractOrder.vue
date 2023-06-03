<template>
  <div style="padding: 8px;">
    <el-card>
      <el-form label-width="90px">
        <!-- 订单列表 -->
        <div slot="header" class="clearfix">
          <span>订单列表</span>
        </div>
        <el-row>
          <collapse>
            <div v-show="isActive">
              <el-row>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item class="whereFormClass" label="合同编号">
                    <el-input v-model="ContractCode" clearable="" placeholder="合同编号" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item class="whereFormClass" label="合同名称">
                    <el-input v-model="ContractName" clearable="" placeholder="合同名称" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item class="whereFormClass" label="公司名称">
                    <el-input v-model="CompanyName" clearable="" placeholder="公司名称" />
                  </el-form-item>
                </el-col>
                <!-- <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item class="whereFormClass" label="发票科目">
                    <el-select v-model="InvoiceAccount" class="timeClass" filterable placeholder="发票科目" clearable="">
                      <el-option v-for="item in InvoiceAccountList" :key="item.InvoiceAccountCode"
                        :label="item.InvoiceAccountName" :value="item.InvoiceAccountCode" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item class="whereFormClass" label="发票种类">
                    <el-select v-model="InvoiceType" class="timeClass" filterable placeholder="发票种类" clearable>
                      <el-option v-for="item in InvoiceTypeList" :key="item.Code" :class="item.Class" :label="item.Name"
                        :value="item.Code">
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
                </el-col> -->
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item label="申请人" prop="SaleId" class="scrollClass">
                    <el-select v-model="Applicant" class="timeClass" filterable placeholder="申请人" clearable="">
                      <el-option v-for="item in UserList" :key="item.UserID" :label="item.UserName"
                        :value="item.UserID" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item class="whereFormClass" label="申请日期">
                    <el-date-picker v-model="ApplicationTime" style="width:100% ;" class="rangeTimeClass" type="daterange"
                      range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"
                      clearable="" @input="datetimeChange" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </collapse>
          <el-row>
            <el-col :span="24">
              <el-button-group :style="formShow" style="margin-left: 1.3rem">
                <el-button type="primary" icon="el-icon-search" @click="GetContractOrderListSearch">
                  查 询
                </el-button>
                <el-button type="info" icon="el-icon-refresh-left" @click="reseatData">重 置
                </el-button>
                <el-button type="success" icon="el-icon-circle-plus-outline" @click="ShowContractAddDialog">增 加
                </el-button>
                <el-button type="warning" icon="el-icon-thumb" @click="auditStatusAction">
                  送审
                </el-button>
                <!-- 超级管理员和财务都能审核 -->
                <el-button v-show="auditStatusCheckFlag" type="danger" icon="el-icon-s-check" @click="auditStatusCheck">审
                  核
                </el-button>
                <el-button type="text" style="margin-left: 10px;"
                  :icon="isActive ? 'el-icon-arrow-up el-icon--right' : 'el-icon-arrow-down el-icon--right'"
                  @click="collapseClick">{{ isActive ? "收起" : "展开" }}</el-button>
              </el-button-group>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="CardTableClass">
      <el-table class="tableCheckClass" ref="multipleTable" v-loading="loading" :data="ContractData" fit
        :cell-style="isRed" @selection-change="TableSelect" @row-click="toggleSelection">
        <el-table-column v-if="fixedLeftShow" key="column" type="selection" width="50" fixed="left" />
        <el-table-column v-else key="columnFalse" type="selection" width="50" />
        <el-table-column v-if="fixedLeftShow" key="SecondContractNumberPrefix" prop="SecondContractNumberPrefix"
          label="乙方合同编号" min-width="160" show-overflow-tooltip fixed="left" />
        <el-table-column v-else key="ContractCodeFalse" prop="SecondContractNumberPrefix" label="乙方合同编号" min-width="160"
          show-overflow-tooltip />
        <!-- <el-table-column v-if="fixedLeftShow" key="ContractNameStr" prop="ContractNameStr" label="合同名称" min-width="120"
          show-overflow-tooltip fixed="left" /> -->
        <!-- <el-table-column v-else key="ContractNameStrFalse" prop="ContractNameStr" label="合同名称" min-width="120"
          show-overflow-tooltip /> -->
        <el-table-column v-if="fixedLeftShow" key="CompanyName" prop="CompanyName" label="公司名称" min-width="200"
          show-overflow-tooltip fixed="left" />
        <el-table-column v-else key="CompanyNameFalse" prop="CompanyName" label="公司名称" min-width="200"
          show-overflow-tooltip />
        <el-table-column v-if="fixedLeftShow" prop="ApplicationTimeStr" label="账单申请日期" min-width="130"
          show-overflow-tooltip fixed="left">
          <template slot-scope="scope">
            <div v-if="scope.row.ApplicationTimeStr">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.ApplicationTimeStr }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-else prop="ApplicationTimeStr" label="账单申请日期" min-width="130" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.ApplicationTimeStr">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.ApplicationTimeStr }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="ContractOrderName" label="账单名称" min-width="250" show-overflow-tooltip />
        <el-table-column prop="AmountReceived" label="账单总金额" min-width="120" sortable="">
          <template slot-scope="scope">
            <span v-format="'¥#,##0.00'">{{ scope.row.AmountReceived }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="AmountTotal" label="回款总金额" min-width="120">
          <template slot-scope="scope">
            <span v-format="'¥#,##0.00'">{{ scope.row.AmountTotal }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="Balance" label="余额" min-width="100">
          <template slot-scope="scope">
            <span v-format="'¥#,##0.00'">{{ scope.row.Balance }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="AmountTotal" label="合计"  min-width="100">
                    </el-table-column> -->
        <!-- <el-table-column prop="InvoiceAccountName" label="发票科目" min-width="100" />
        <el-table-column prop="InvoiceTypeStr" label="发票种类" min-width="140">
          <template slot-scope="{}" slot="header">
            <span>发票种类</span>
            <el-tooltip class="item" effect="light" placement="bottom" style="margin-left: 5px;margin-bottom: 0.2rem">
              <i class="el-icon-question" style="font-size: 14px; vertical-align: middle;"></i>
              <div slot="content">
                <div style="display: flex;  align-items: center;">
                  <span slot="reference" style="margin-right: 10px;" class="SecondPartyNameClass">
                    <div> <i class="dotClass" style="background-color: #13ce66" />{{ "\xa0\xa0" }}增值税专用发票<br /></div>
                    <div><i class="dotClass" style="background-color: #ffba00" />{{ "\xa0\xa0" }}增值税普通发票<br /></div>
                    <div style="margin-bottom: 0;"><i class="dotClass" style="background-color: #ff4949" />{{ "\xa0\xa0"
                    }}增值税电子普通发票<br /></div>
                  </span>
                </div>
              </div>
            </el-tooltip>
          </template>
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
        </el-table-column> -->
        <el-table-column prop="IsUsed" label="账单状态" min-width="100">
          <template slot-scope="scope" class="tableRowClass">
            <span v-if="scope.row.IsUsed == 0">无效</span>
            <span v-if="scope.row.IsUsed == 1">有效</span>
          </template>
        </el-table-column>
        <el-table-column prop="InvoiceStateStr" label="发票状态" min-width="100">
          <template slot-scope="{}" slot="header">
            <span>发票状态</span>
            <el-tooltip class="item" effect="light" placement="bottom" style="margin-left: 5px;margin-bottom: 0.2rem">
              <i class="el-icon-question" style="font-size: 14px; vertical-align: middle;"></i>
              <div slot="content">
                <div style="display: flex;  align-items: center;">
                  <span slot="reference" style="margin: 0 10px 0 6px;" class="SecondPartyNameClass">
                    <div> <el-tag key="未开" effect="plain" type="danger">未开</el-tag></div>
                    <div><el-tag key="已送审" effect="plain">已送审</el-tag></div>
                    <div><el-tag key="已开" effect="plain" type="success">已开</el-tag></div>
                    <div style="margin-bottom: 0;"> <el-tag key="作废" effect="plain" type="info">作废</el-tag></div>
                  </span>
                </div>
              </div>
            </el-tooltip>
          </template>
          <template slot-scope="scope" class="tableRowClass">
            <el-tag v-if="scope.row.InvoiceState == '0'" effect="plain" type="danger">未开</el-tag>
            <el-tag v-if="scope.row.InvoiceState == '1'" effect="plain" type="success">已开</el-tag>
            <el-tag v-if="scope.row.InvoiceState == '5'" effect="plain" type="info">作废</el-tag>
            <el-tag v-if="scope.row.InvoiceState == '6'" effect="plain">已送审</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="CollectionState" label="回款状态" min-width="100">
          <template slot-scope="{}" slot="header">
            <span>回款状态</span>
            <el-tooltip class="item" effect="light" placement="bottom" style="margin-left: 5px;margin-bottom: 0.2rem">
              <i class="el-icon-question" style="font-size: 14px; vertical-align: middle;"></i>
              <div slot="content">
                <div style="display: flex;  align-items: center;">
                  <span slot="reference" style="margin-right: 10px;" class="SecondPartyNameClass">
                    <div><i class="dotClass" style="background-color: #ff4949" />{{ "\xa0\xa0" }}未回款<br /></div>
                    <div> <i class="dotClass" style="background-color: #13ce66" />{{ "\xa0\xa0"
                    }}已回款</div>
                    <div style="margin-bottom: 0;"> <i class="dotClass" style="background-color: #1890ff" />{{ "\xa0\xa0"
                    }}部分回款</div>
                  </span>
                </div>
              </div>
            </el-tooltip>
          </template>
          <template slot-scope="scope" class="tableRowClass">
            <div style="display: flex;  align-items: center;">
              <span slot="reference" style="margin-right: 8px;">
                <i v-if="scope.row.CollectionState == 1" class="dotClass" style="background-color: #ff4949" />
                <i v-if="scope.row.CollectionState == 2" class="dotClass" style="background-color: #13ce66" />
                <i v-if="scope.row.CollectionState == 3" class="dotClass" style="background-color: #1890ff" />
              </span>
              <span v-if="scope.row.CollectionState == 1">未回款</span>
              <span v-if="scope.row.CollectionState == 2">已回款</span>
              <span v-if="scope.row.CollectionState == 3">部分回款</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="ApplicantStr" label="申请人" width="100" show-overflow-tooltip />
        <el-table-column prop="OrderAbstract" label="摘要" show-overflow-tooltip min-width="250" />
        <el-table-column prop="SubmitCensorshipTimeStr" label="送审时间" width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.SubmitCensorshipTimeStr">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.SubmitCensorshipTimeStr }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="ExamineTimeStr" label="审核时间" width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.ExamineTimeStr">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.ExamineTimeStr }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="fixedLeftShow" label="操作" fixed="right" min-width="150">
          <template slot-scope="scope">
            <el-button-group>
              <el-button icon="el-icon-edit" type="text" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
              <el-button icon="el-icon-delete" type="text" size="mini" @click="deleteDialog(scope.row)">删除
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
        <el-table-column v-else label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button-group>
              <el-button icon="el-icon-edit" type="text" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
              <el-button icon="el-icon-delete" type="text" size="mini" @click="deleteDialog(scope.row)">删除
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination background :current-page="queryInfo.pagenum" :page-sizes="[20, 50, 100]"
        :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-card>

    <!-- 添加合同弹出页面 -->
    <el-dialog :visible.sync="addDialogVisible" top="5vh" width="60%" :lock-scroll="false" :append-to-body="true"
      @close="addDialogVisibleClosed">
      <!-- 上面两个属性用来重置滚动条 -->
      <div slot="title" class="dialog-title">
        <span>添加账单</span>
      </div>
      <el-form ref="addContractOrderRef" :model="addContractOrderForm" :rules="addContractOrderRules" label-width="120px"
        class="formClass">
        <el-form-item label="合同信息" prop="ContractCode">
          <el-select v-model="addContractOrderForm.ContractCode" style="width:100% ;" filterable
            placeholder="合同类型 - 公司名称 - 合同期" clearable="" remote reserve-keyword :remote-method="remoteMethod"
            @visible-change="clearselectCorporationDatas">
            <el-option v-for="item in selectCorporationDatas" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="公司名称" prop="CompanyId">
                    <el-select style="width:300px ;" v-model="addContractOrderForm.CompanyId" filterable
                        placeholder="公司名称">
                        <el-option v-for="item in CompanyList" :class="item.Class" :key="item.ComID"
                            :label="item.ShortName" :value="item.ComID">
                        </el-option>
                    </el-select>
                </el-form-item> -->

        <el-form-item label="账单名称" prop="ContractOrderName">
          <el-input v-model="addContractOrderForm.ContractOrderName" placeholder="账单名称" />
        </el-form-item>
        <el-form-item label="摘要" prop="OrderAbstract">
          <el-input v-model="addContractOrderForm.OrderAbstract" placeholder="摘要" />
        </el-form-item>
        <el-form-item label="账单总金额" prop="AmountReceived">
          <el-input v-model="addContractOrderForm.AmountReceived" placeholder="账单总金额" disabled="" />
        </el-form-item>
        <!-- 动态增减表单项 -->
        <el-row v-for="(domain, index) in addContractOrderForm.domains">
          <el-col :span="12">
            <el-form-item :key="domain.key" :label="'收款项目' + (index + 1)" :prop="'domains.' + index + '.CustomAmountName'"
              :rules="{
                required: true, message: '收款项目不能为空', trigger: 'blur'
              }">
              <el-input v-model="domain.CustomAmountName" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :key="domain.key" :label="'金额' + (index + 1)" :prop="'domains.' + index + '.CustomAmount'"
              :rules="{
                required: true,
                pattern:
                  /^([0-9]\d*(\.\d{1,2})?|([0](\.([0][0-9]|[0-9]\d{0,1}))))$/,
                message: '金额输入不合法（不能小于0小数位不超过2位）',
                trigger: 'blur',
              }">
              <el-input v-model="domain.CustomAmount" clearable @input="handleChangeAdd(domain.CustomAmount, index)" />
            </el-form-item>
          </el-col>
          <el-col :span="4" style="line-height:100% ;">
            <el-form-item label-width="0">
              <el-tag style="margin-left:10px ;" v-if="domain.OrderState == 1" :disabled="true" key="未回款" effect="plain"
                type="danger">未回款</el-tag>
              <el-button style="margin-left:10px ;" type="text" icon="el-icon-delete"
                @click.prevent="removeDomain(domain)" />
            </el-form-item>

          </el-col>
        </el-row>
        <el-form-item>
          <el-button size="mini" icon="el-icon-plus" class="addItemClass" @click="addDomain">新增自定义金额</el-button>
        </el-form-item>

        <!-- <el-form-item label="合计" prop="AmountReceived">
                    <el-input placeholder="先添加数据然后再添加自定义金额" v-model="addContractOrderForm.AmountReceived" readonly>
                    </el-input>
                </el-form-item> -->

        <!-- <el-row>
          <el-col :span="12">
            <el-form-item label="发票科目" prop="InvoiceAccount">
              <el-select v-model="addContractOrderForm.InvoiceAccount" filterable placeholder="发票科目">
                <el-option v-for="item in InvoiceAccountList" :key="item.InvoiceAccountCode" :class="item.Class"
                  :label="item.InvoiceAccountName" :value="item.InvoiceAccountCode" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票种类" prop="InvoiceType">
              <el-select v-model="addContractOrderForm.InvoiceType" filterable placeholder="发票种类">
                <el-option v-for="item in InvoiceTypeList" :key="item.Code" :class="item.Class" :label="item.Name"
                  :value="item.Code" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row> -->

        <el-row>
          <el-col :span="12">
            <el-form-item label="申请人" prop="Applicant">
              <el-select v-model="addContractOrderForm.Applicant" filterable placeholder="申请人">
                <el-option v-for="item in UserList" :key="item.UserID" :class="item.Class" :label="item.UserName"
                  :value="item.UserID" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账单申请日期" prop="ApplicationTime">
              <el-date-picker v-model="addContractOrderForm.ApplicationTime" type="date" placeholder="账单申请日期" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="账单使用状态" prop="IsUsed">
              <el-select v-model="addContractOrderForm.IsUsed" filterable placeholder="账单使用状态">
                <el-option v-for="item in OrderStateArray" :key="item.Code" :class="item.Class" :label="item.Name"
                  :value="item.Code" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="回款状态" prop="CollectionState">
              <el-select disabled="" v-model="addContractOrderForm.CollectionState" filterable placeholder="回款状态"
                clearable="">
                <el-option v-for="item in PaymentCollectionStateArray" :key="item.Code" :label="item.Name"
                  :value="item.Code" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-form-item label="发票状态" prop="InvoiceState">
                    <el-select v-model="addContractOrderForm.InvoiceState" filterable placeholder="发票状态" clearable>
                        <el-option v-for="item in InvoiceStatusList" :class="item.Class" :key="item.Code"
                            :label="item.Name" :value="item.Code">
                        </el-option>
                    </el-select>
                </el-form-item> -->
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button type="primary" icon="el-icon-circle-check"  :loading="LoadingAdd" @click="addOrder">保 存
            </el-button>
            <el-button icon="el-icon-refresh"  type="info" @click="addDialogVisibleClosed">重 置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="updateDialogVisible" top="5vh" :lock-scroll="false" :append-to-body="true" width="60%"
      @close="detailUpdateDialogVisibleClosed">
      <div slot="title" class="dialog-title">
        <span>编辑帐单</span>
      </div>
      <el-form ref="updateContractsRef" :model="updateContractOrderForm" :rules="addContractOrderRules"
        label-width="120px" class="formClass">
        <el-form-item label="合同信息" prop="ContractCode">
          <el-select disabled="" v-model="updateContractOrderForm.ContractCode" style="width:100% ;" filterable
            placeholder="合同类型 - 公司名称 - 合同期" clearable="" remote reserve-keyword :remote-method="remoteMethod"
            @visible-change="clearselectCorporationDatas">
            <el-option v-for="item in selectCorporationDatas" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="公司名称" prop="CompanyId">
                    <el-select style="width:300px ;" v-model="updateContractOrderForm.CompanyId" filterable
                        placeholder="公司名称">
                        <el-option v-for="item in CompanyList" :class="item.Class" :key="item.ComID"
                            :label="item.ShortName" :value="item.ComID">
                        </el-option>
                    </el-select>
                </el-form-item> -->
        <el-form-item label="账单名称" prop="ContractOrderName">
          <el-input v-model="updateContractOrderForm.ContractOrderName" :disabled="!updateShow" placeholder="账单名称" />
        </el-form-item>
        <el-form-item label="摘要" prop="OrderAbstract">
          <el-input v-model="updateContractOrderForm.OrderAbstract" :disabled="!updateShow" placeholder="摘要" />
        </el-form-item>
        <el-form-item label="账单总金额" prop="AmountReceived">
          <el-input v-model="updateContractOrderForm.AmountReceived" :disabled="!updateShow" placeholder="账单总金额"
            disabled />
        </el-form-item>
        <el-form-item label="回款总金额" prop="AmountTotal">
          <el-input v-model="updateContractOrderForm.AmountTotal" :disabled="!updateShow" placeholder="回款总金额" disabled />
        </el-form-item>
        <!-- 动态增减表单项 -->
        <el-row v-for="(domain, index) in updateContractOrderForm.domains">
          <el-col :span="8">
            <el-form-item :key="domain.key" :label="'收款项目' + (index + 1)" :prop="'domains.' + index + '.CustomAmountName'"
              :rules="{
                required: true, message: '收款项目不能为空', trigger: 'blur'
              }">
              <el-input v-model="domain.CustomAmountName"
                :disabled="!updateShow || (domain.OrderAmount != 0 && !domain.Flag)" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :key="domain.key" :label="'金额' + (index + 1)" :prop="'domains.' + index + '.CustomAmount'"
              :rules="{
                required: true,
                pattern:
                  /^([0-9]\d*(\.\d{1,2})?|([0](\.([0][0-9]|[0-9]\d{0,1}))))$/,
                message: '金额输入不合法（不能小于0小数位不超过2位）',
                trigger: 'blur',
              }">
              <el-input v-model="domain.CustomAmount" :disabled="!updateShow || (domain.OrderAmount != 0 && !domain.Flag)"
                clearable @input="handleChangeUpdate(domain.CustomAmount, index)" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :key="domain.key" :label="'回款金额' + (index + 1)" :prop="'domains.' + index + '.OrderAmount'">
              <el-input v-model="domain.OrderAmount" :disabled="true" clearable
                @input="handleChangeUpdate(domain.OrderAmount, index)" />
            </el-form-item>
          </el-col>
          <el-col :span="4" style="line-height:100% ;margin:auto">
            <el-form-item label-width="0">
              <el-tag style="margin-left:10px ;" v-if="domain.OrderState == 1" :disabled="true" key="未回款" effect="plain"
                type="danger">未回款</el-tag>
              <el-tag style="margin-left:10px ;" v-if="domain.OrderState == 2" :disabled="true" key="已回款" effect="plain"
                type="success">已回款</el-tag>
              <el-tag style="margin-left:10px ;" v-if="domain.OrderState == 3" :disabled="true" key="部分回款"
                effect="plain">部分回款</el-tag>
              <el-button :disabled="!updateShow || (domain.OrderAmount != 0 && !domain.Flag)" style="margin-left:10px ;"
                type="text" icon="el-icon-delete" @click.prevent="removeDomainUpdate(domain)" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button size="mini" :disabled="!updateShow" icon="el-icon-plus" class="addItemClass"
            @click="addDomainUpdate">新增自定义金额</el-button>
        </el-form-item>
        <!-- <el-form-item label="合计" prop="AmountReceived">
                    <el-input placeholder="先添加数据然后再添加自定义金额" v-model="updateContractOrderForm.AmountReceived" readonly>
                    </el-input>
                </el-form-item> -->
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item label="发票科目" prop="InvoiceAccount">
              <el-select v-model="updateContractOrderForm.InvoiceAccount" :disabled="!updateShow" filterable
                placeholder="发票科目">
                <el-option v-for="item in InvoiceAccountList" :key="item.InvoiceAccountCode" :class="item.Class"
                  :label="item.InvoiceAccountName" :value="item.InvoiceAccountCode" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票种类" prop="InvoiceType">
              <el-select v-model="updateContractOrderForm.InvoiceType" :disabled="!updateShow" filterable
                placeholder="发票种类">
                <el-option v-for="item in InvoiceTypeList" :key="item.Code" :class="item.Class" :label="item.Name"
                  :value="item.Code" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请人" prop="Applicant">
              <el-select v-model="updateContractOrderForm.Applicant" :disabled="!updateShow" filterable placeholder="申请人">
                <el-option v-for="item in UserList" :key="item.UserID" :class="item.Class" :label="item.UserName"
                  :value="item.UserID" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账单申请日期" prop="ApplicationTime">
              <el-date-picker v-model="updateContractOrderForm.ApplicationTime" :disabled="!updateShow" type="date"
                placeholder="账单申请日期" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="账单使用状态" prop="IsUsed">
              <el-select v-model="updateContractOrderForm.IsUsed" :disabled="!updateShow" filterable placeholder="账单使用状态">
                <el-option v-for="item in OrderStateArray" :key="item.Code" :class="item.Class" :label="item.Name"
                  :value="item.Code" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="回款状态" prop="CollectionState">
              <el-select disabled v-model="updateContractOrderForm.CollectionState" filterable placeholder="回款状态"
                clearable="">
                <el-option v-for="item in PaymentCollectionStateArray" :key="item.Code" :label="item.Name"
                  :value="item.Code" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-form-item label="发票状态" prop="InvoiceState">
                    <el-select v-model="updateContractOrderForm.InvoiceState" filterable placeholder="发票状态" clearable>
                        <el-option v-for="item in InvoiceStatusList" :class="item.Class" :key="item.Code"
                            :label="item.Name" :value="item.Code">
                        </el-option>
                    </el-select>
                </el-form-item> -->
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button type="primary" icon="el-icon-circle-check" :loading="LoadingUpdate" @click="saveUpdate">保 存
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 关联销售弹出窗口 -->
    <!-- <el-dialog title="关联销售" :visible.sync="connectSaleDialogVisible" top="5vh" width="60%"
            :before-close="closeSaleLoading">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <el-form :model="addSaleForm" ref="addSaleRef" :rules="addSaleRules" label-width="120px">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="销售人员" prop="SaleId" class="scrollClass">
                                    <el-select v-model="addSaleForm.SaleId" filterable placeholder="销售人员" clearable="">
                                        <el-option v-for="item in UserList" :key="item.UserID" :label="item.UserName"
                                            :value="item.UserID">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="提成占比" prop="Percentage">
                                    <el-input v-model="addSaleForm.Percentage"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item prop="button">
                                    <el-button  type="primary" :loading="LoadingSaleUpdate"
                                        @click="saveSale">提交保存
                                    </el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>

                <el-table v-loading="saleLoading" :data="SaleDataArray" border fit
                    height="calc(100vh - 500px)">
                    <el-table-column prop="User_RealName" label="销售人员"  width="200"></el-table-column>
                    <el-table-column prop="Percentage" label="提成占比"  width="200"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope" class="tableRowClass">
                            <el-button type="text" size="mini" @click="deleteSale(scope.row)"> 删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </el-dialog> -->
    <!-- 修改发票状态弹出窗口 -->
    <el-dialog title="修改发票状态" :visible.sync="auditStatusCheckDialog" width="30%">
      <el-form label-width="150px">
        <el-row>
          <el-col>
            <el-alert title="选中合同条数" type="info" :description="auditStatusdescription" show-icon :closable="false" />
          </el-col>
        </el-row>
        <el-form-item label="发票状态" style="margin-top:20px;">
          <el-select v-model="InvoiceState" filterable placeholder="发票状态" clearable>
            <el-option v-for="item in InvoiceStatusList" :key="item.Code" :class="item.Class" :label="item.Name"
              :value="item.Code">
              <el-tag v-if="item.Code == 5" :key="item.Code" effect="plain" type="info">
                {{ item.Name }}
              </el-tag>
              <el-tag v-if="item.Code == 6" :key="item.Code" effect="plain">
                {{ item.Name }}
              </el-tag>
              <el-tag v-if="item.Code == 0" :key="item.Code" effect="plain" type="danger">
                {{ item.Name }}
              </el-tag>
              <el-tag v-if="item.Code == 1" :key="item.Code" effect="plain" type="success">
                {{ item.Name }}
              </el-tag>
            </el-option>
          </el-select>
        </el-form-item>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button icon="el-icon-circle-check" type="primary" :loading="auditStatusCheckLoading" @click="saveAuditStatusCheck">保 存
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetContractOrder,
  GetCompanyByContract,
  AddContractOrder,
  GetCustomAmountByOrder,
  GetUserInfo,
  GetDicCategory,
  UpdateContractOrder,
  DeleteContractOrder,
  GetContractNameList,
  OrderSubmitForCensorship,
  OrderSaveAuditStatus,
} from "@/api/CollectionMangement";
import {
  GetInvoiceAccount,
} from "@/api/SystemManagement";
import { showLoading, hideLoading } from "@/common/loading";
import { parseTime, getDateByTimes } from "@/utils"; // 时间日期格式化成字符串
import moment from "moment"; // 导入模块
import collapse from '../../assets/js/collapse';
import { cutOutNum } from '@/utils/decimals'
moment.locale("zh-cn"); // 设置语言 或 moment.lang('zh-cn');

export default {
  name: 'ContractOrder',
  components: {
    collapse
  },
  data() {
    return {
      fixedLeftShow: true,
      formShow: '',
      multipleSelection: [],
      isActive: false,
      auditStatusCheckFlag: false,
      InvoiceState: '',
      auditStatusCheckLoading: false,
      updateShow: true,
      PriseName: '',
      PriseMoney: '',
      InvoiceType: '',
      Applicant: '',
      InvoiceAccount: '',
      InvoiceStatusList: [],
      CompanyList: [],
      ContractDatas: [],
      InvoiceAccountList: [],
      total: 0,
      InvoiceTypeList: [],
      connectSaleDialogVisible: false,
      addSaleForm: {
        ContractId: null,
        SaleId: "",
        Percentage: "",
      },
      ApplicationTimeBegin: "",
      ApplicationTimeEnd: "",
      addSaleRules: {
        SaleId: [
          { required: true, message: "请选择销售人员", trigger: "change" },
        ],
        Percentage: [
          {
            required: true,
            pattern:
              /^([0-9]\d*(\.\d{1,2})?|([0](\.([0][0-9]|[0-9]\d{0,1}))))$/,
            message: "提成比例输入不合法（不能小于0小数位不超过2位）",
            trigger: "blur",
          },
        ],
      },
      SaleDataArray: [],
      LoadingSaleUpdate: false,
      connecttitles: ['未关联公司', '已关联公司'],
      buttonTexts: ['取关', '关联'],
      filterPlaceholder: '请输入公司名称',
      transferProps: { key: 'ComID', label: 'ComName' },
      connectTitle: "关联公司",
      LoadingAdd: false,
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
      ContractCode: "",
      ContractName: "",
      CompanyName: "",
      ContractType: "",
      BeginTime: "",
      EndTime: "",
      BeginSignTime: "",
      EndSignTime: "",
      ApplicationTime: [],
      entLoading: false,
      // 公司数据返回列表
      CorporationDatas: [],
      // 公司列表下拉数据结果列表
      selectCorporationDatas: [],
      LoadingUpdate: false,
      LoadingAdd: false,
      Corpid: "",
      // 获取用户列表查询参数对象
      queryInfo: {
        pagenum: 1,
        pagesize: 20,
      },
      total: 0,
      detailDialogVisible: false,
      addDialogVisible: false,
      updateDialogVisible: false,
      ContractData: [],
      corp_id: "",
      updateContractOrderForm: {
        OrderCode: '',
        ContractCode: '',
        // CompanyId: '',
        OrderAbstract: '',
        InvoiceAccount: '',
        InvoiceType: '',
        Applicant: '',
        ApplicationTime: '',
        IsUsed: '',
        // InvoiceState: '',
        CollectionState: '',
        domains: [],
        AmountReceived: '',
        ContractOrderName: '',
        AmountTotal: '',
      },
      addFilePlatformImage: "",
      updateFilePlatformImage: "",
      loading: false,
      CreateUserName: "",
      CreateTime: "",
      UpdateUserName: "",
      UpdateTime: "",
      getPaymentMethodArray: [],
      ConState: "1",
      CorporationDatas: [],
      UserList: [],
      addContractOrderForm: {
        ContractCode: '',
        // CompanyId: '',
        OrderAbstract: '',
        InvoiceAccount: '',
        InvoiceType: '',
        Applicant: sessionStorage.getItem("userid"),
        ApplicationTime: new Date(),
        IsUsed: 1,
        // InvoiceState: '',
        CollectionState: '',
        domains: [],
        AmountReceived: '',
        ContractOrderName: '',
      },
      // 回款状态
      PaymentCollectionStateArray: [
        { Code: 1, Name: "未回款" },
        { Code: 2, Name: "已回款" },
        { Code: 3, Name: "部分回款" },
      ],
      // 账单使用状态
      OrderStateArray: [
        { Code: 1, Name: "有效" },
        { Code: 0, Name: "无效" },

      ],
      // 添加合同正则验证
      addContractOrderRules: {
        ContractCode: [
          { required: true, message: "请选择合同", trigger: "change" },
        ],
        // CompanyId: [
        //     { required: true, message: "请选择公司名称", trigger: "change" },
        // ],
        ContractOrderName: [
          { required: true, message: "请输入账单名称", trigger: "blur" },
        ],
        AmountReceived: [
          {
            required: true,
            pattern:
              /^([0-9]\d*(\.\d{1,2})?|([0](\.([0][0-9]|[0-9]\d{0,1}))))$/,
            message: "账单总金额输入不合法（不能为负数小数位不超过2位），请点击新增自定义金额按钮输入金额",
            trigger: "blur",
          },
        ],
        // AmountTotal: [
        //   {
        //     required: true,
        //     pattern:
        //       /^([0-9]\d*(\.\d{1,2})?|([0](\.([0][0-9]|[0-9]\d{0,1}))))$/,
        //     message: "合计输入不合法（不能为负数小数位不超过2位）",
        //     trigger: "blur",
        //   },
        // ],
        InvoiceAccount: [
          { required: false, message: "请选择发票科目", trigger: "change" },
        ],
        InvoiceType: [
          { required: false, message: "请选择发票类型", trigger: "change" },
        ],
        Applicant: [
          { required: true, message: "请选择申请人", trigger: "change" },
        ],
        ApplicationTime: [
          { required: true, message: "请选择申请时间", trigger: "change" },
        ],
        IsUsed: [
          { required: true, message: "请选择订单使用状态", trigger: "change" },
        ],
        // InvoiceState: [
        //     { required: true, message: "请选择发票状态", trigger: "change" },
        // ],
        CollectionState: [
          { required: true, message: "请选择回款状态", trigger: "change" },
        ],
      },
      updateContractsRules: {},
      auditStatusdescription: '',
      auditStatusCheckDialog: false,
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
    switch (sessionStorage.getItem("RoleName")) {
      case "超级管理员":
      case "财务":
        this.auditStatusCheckFlag = true;
        break;
    }
    // 获取销售人数据
    this.GetUserInfo();
    // 获取账单数据
    this.GetContractOrderList();
    // 获取发票科目数据
    this.GetInvoiceAccountList();
    // 获取发票类型数据
    this.GetInvoiceType();
    // // 获取所有合同数据
    // this.GetContractName();
    // 获取发票状态
    this.GetInvoiceStatus();
  },
  methods: {
    handleChangeAdd(CustomAmount, index) {
      //验证输入是否金额，如果不是直接返回
      this.addContractOrderForm.domains[index].CustomAmount = /^\d+\.?\d{0,2}$/.test(CustomAmount) ?
        CustomAmount :
        (CustomAmount.indexOf('.') == -1 ?
          "" :
          cutOutNum(parseFloat(CustomAmount)));
      this.AmountReceivedAddChanged();
      return;
    },
    AmountReceivedAddChanged() {
      let totalInputMoney = 0;
      this.addContractOrderForm.domains.forEach((item) => {
        totalInputMoney += item.CustomAmount ? parseFloat(item.CustomAmount) : 0;
      })
      this.addContractOrderForm.AmountReceived = this.addContractOrderForm.domains.length == 0 ? "" : totalInputMoney;
    },
    handleChangeUpdate(CustomAmount, index) {
      //验证输入是否金额，如果不是直接返回
      this.updateContractOrderForm.domains[index].CustomAmount = /^\d+\.?\d{0,2}$/.test(CustomAmount) ?
        CustomAmount :
        (CustomAmount.indexOf('.') == -1 ?
          "" :
          cutOutNum(parseFloat(CustomAmount)));
      this.AmountReceivedUpdateChanged();
      return;
    },
    AmountReceivedUpdateChanged() {
      let totalInputMoney = 0;
      this.updateContractOrderForm.domains.forEach((item) => {
        totalInputMoney += item.CustomAmount ? parseFloat(item.CustomAmount) : 0;
      })
      this.updateContractOrderForm.AmountReceived = this.updateContractOrderForm.domains.length == 0 ? "" : totalInputMoney;
    },
    // 点击当前行数据进行选中或取消复选框
    toggleSelection(row, column, event) {
      if (column.label != "操作")
      // 通过ref绑定后这里使用$refs.table来操作bom元素
      { this.$refs.multipleTable.toggleRowSelection(row); }
    },
    collapseClick() {
      this.isActive = !this.isActive;
      if (document.body.clientWidth < 1200) {
        if (this.isActive) { this.formShow = 'margin-top: 18px;'; } else { this.formShow = 'margin-top: 0;'; }
      } else {
        this.formShow = 'margin-top: 0;';
      }
    },
    // InvoiceTypeStyle({ row, column, rowIndex, columnIndex }) {
    //     if (column.label == "账单状态") {
    //         switch (row.IsUsed) {
    //             case 1:
    //                 return 'background:#f0f9eb;'
    //             case 0:
    //                 return 'background:oldlace;'
    //         }
    //     }
    // },
    // 保存修改状态
    saveAuditStatusCheck() {
      this.auditStatusCheckLoading = true;
      OrderSaveAuditStatus(
        this.OrderCodeStr,
        this.InvoiceState
      ).then((res) => {
        if (res.success) {
          this.auditStatusCheckDialog = false;
          this.$message.success("操作成功");
          this.GetContractOrderList();
        } else {
          this.$message.error(res.resultMessage);
        }
        this.auditStatusCheckLoading = false;
      });
    },
    // 弹出修改发票状态窗口
    auditStatusCheck() {
      if (!this.OrderCodeStr) {
        this.$message.warning("请勾选要审核的数据！");
        return;
      }
      // 默认一个发票状态吧，录入-未送审
      this.InvoiceState = '1';
      this.auditStatusCheckDialog = true;
    },
    // 送审
    async auditStatusAction() {
      if (!this.OrderCodeStr) {
        this.$message.warning("请勾选要送审的数据！");
        return;
      }
      const confirmResult = await this.$confirm(
        "是否提交开票申请?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消开票申请");
      }
      showLoading();
      OrderSubmitForCensorship(this.OrderCodeStr).then((res) => {
        if (res.success) {
          this.$message.success("操作成功！");
          this.GetContractOrderList();
        } else {
          hideLoading();
          return this.$message.error(res.resultMessage);
        }
        hideLoading();
      });
    },

    // 复选框选中事件
    TableSelect(selection) {
      this.multipleSelection = selection;
      var oneCount = 0; var twoCount = 0; var threeCount = 0; var fourCount = 0;
      if (selection.length != 0) {
        this.OrderCodeStr = "";
        selection.forEach((element) => {
          // 送审时用到
          this.OrderCodeStr += element.OrderCode + ",";

          // 财务审核时用到
          switch (element.InvoiceState) {
            case 0:
              oneCount = oneCount + 1;
              break;
            case 1:
              twoCount = twoCount + 1;
              break;
            case 5:
              threeCount = threeCount + 1;
              break;
            case 6:
              fourCount = fourCount + 1;
              break;
          }
        });
        this.OrderCodeStr =
          this.OrderCodeStr.substring(0, this.OrderCodeStr.lastIndexOf(",")
          );
        this.auditStatusdescription = "选中账单中" +
          (oneCount == 0 ? "" : "发票状态为未开的有" + oneCount + "个；") +
          (twoCount == 0 ? "" : "发票状态为已开的有" + twoCount + "个；") +
          (threeCount == 0 ? "" : "发票状态为作废的有" + threeCount + "个；") +
          (fourCount == 0 ? "" : "发票状态为审核成功的有" + fourCount + "个。")
      } else {
        this.OrderCodeStr = "";
        this.auditStatusdescription = "";
      }
    },
    isRed({ row }) {
      const checkIdList = this.multipleSelection.map((item) => item.CompanyName + item.AmountReceived + item.ApplicationTimeStr);
      if (checkIdList.includes(row.CompanyName + row.AmountReceived + row.ApplicationTimeStr)) {
        return {
          backgroundColor: "#E6F7FF",
        };
      } else {
        return {
          backgroundColor: "#FFFFFF",
        };
      }
    },
    addDomain() {
      this.addContractOrderForm.domains.push({
        CustomAmountName: '',
        CustomAmount: '',
        OrderAmount: 0,
        key: Date.now(),
        OrderState: 1
      });
    },
    removeDomain(item) {
      if (this.addContractOrderForm.domains.length != 0) {
        var index = this.addContractOrderForm.domains.indexOf(item)
        if (index !== -1) {
          this.addContractOrderForm.domains.splice(index, 1)
        }
      };
      this.AmountReceivedAddChanged();
    },
    addDomainUpdate() {
      this.updateContractOrderForm.domains.push({
        CustomAmountName: '',
        CustomAmount: '',
        OrderAmount: 0,
        Flag: true,
        key: Date.now(),
        OrderState: 1
      });
    },
    removeDomainUpdate(item) {
      if (this.updateContractOrderForm.domains.length != 0) {
        var index = this.updateContractOrderForm.domains.indexOf(item)
        if (index !== -1) {
          this.updateContractOrderForm.domains.splice(index, 1)
        }
      };
      this.AmountReceivedUpdateChanged();
    },
    // 重置数据
    reseatData() {
      this.ContractCode = '';
      this.ContractName = '';
      this.CompanyName = '';
      this.InvoiceAccount = '';
      this.InvoiceType = '';
      this.Applicant = '';
      this.ApplicationTime = [];

      this.queryInfo.pagesize = 20;
      this.queryInfo.pagenum = 1;
      this.GetContractOrderList();
    },
    // 之前是选择合同时自动获取公司，现在不需要这么获取了，直接全部吧合同编号、名称、公司名称1全部展示出来
    // changeCompanyId(e) {
    //     var item = this.selectCorporationDatas.filter((item) => {
    //         return item.value == e;
    //     });
    //     this.addContractOrderForm.FirstPartyName = item[0].label;
    //     this.addContractOrderForm.CompanyId = '';
    //     this.CompanyList = [];
    //     //根据合同编号获取公司数据
    //     this.GetCompanyByContractList(item[0].value);
    // },
    // clearCompany() {
    //     this.addContractOrderForm.CompanyId = '';
    //     this.CompanyList = [];
    // },
    addDialogVisibleClosed() {
      this.$refs.addContractOrderRef.resetFields();
      this.addContractOrderForm.domains = [];
    },
    detailUpdateDialogVisibleClosed() {
      this.$refs.updateContractsRef.resetFields();
    },
    addOrder() {
      this.LoadingAdd = true;
      // 提交请求前，表单预验证
      this.$refs.addContractOrderRef.validate(async (valid, object) => {
        // 表单预校验失败
        if (!valid) {
          this.LoadingAdd = false;
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
          if (this.addContractOrderForm.domains == undefined || this.addContractOrderForm.domains.length <= 0) {
            this.$message.error("自定义金额必须要有一项");
            this.LoadingAdd = false;
            return;
          }
          AddContractOrder(this.addContractOrderForm).then((res) => {
            if (res.success) {
              this.$message.success("操作成功");
              this.addDialogVisible = false;
              this.GetContractOrderList();
            } else {
              this.$message.error(res.resultMessage);
            }
            this.LoadingAdd = false;
          });
        }
      });
    },
    // 关闭远程搜索下拉时需要清空筛选出来的数据进行重新筛选
    clearselectCorporationDatas(e) {
      this.selectCorporationDatas = [];
    },
    // 弹出添加窗口
    ShowContractAddDialog() {
      this.CompanyList = [];
      this.addContractOrderForm.CollectionState = 1;
      this.addDialogVisible = true;
      const isError = document.getElementsByClassName("scrollClass");
      if (isError.length != 0) {
        isError[0].scrollIntoView({
          // 滚动到指定节点
          // 值有start,center,end，nearest，当前显示在视图区域中间
          block: "center",
          // 值有auto、instant,smooth，缓动动画（当前是慢速的）
          behavior: "smooth",
        });
      }
    },
    datetimeChange(time) {
      // 强制刷新
      this.$forceUpdate();
    },
    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.GetContractOrderList();
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newSize) {
      this.queryInfo.pagenum = newSize;
      this.GetContractOrderList();
    },

    // 保存修改
    saveUpdate() {
      this.LoadingUpdate = true;
      // 提交请求前，表单预验证
      this.$refs.updateContractsRef.validate(async (valid, object) => {
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
          if (this.updateContractOrderForm.domains == undefined || this.updateContractOrderForm.domains.length <= 0) {
            this.$message.error("自定义金额必须要有一项");
            this.LoadingUpdate = false;
            return;
          }
          UpdateContractOrder(this.updateContractOrderForm).then((res) => {
            if (res.success) {
              this.$message.success("操作成功");
              this.updateDialogVisible = false;
              this.GetContractOrderList();
            } else {
              this.$message.error(res.resultMessage);
            }
            this.LoadingUpdate = false;
          });
        }
      });
    },
    GetContractOrderListSearch() {
      this.queryInfo.pagenum = 1;
      this.queryInfo.pagesize = 20;
      this.GetContractOrderList();
    },
    // 获取合同列表数据
    GetContractOrderList() {
      this.loading = true;
      if (this.ApplicationTime && this.ApplicationTime.length > 0) {
        this.ApplicationTimeBegin = this.$moment(this.ApplicationTime[0]).format("YYYY-MM-DD");
        this.ApplicationTimeEnd = this.$moment(this.ApplicationTime[1]).format("YYYY-MM-DD");
      } else {
        this.BeginSignTime = '';
        this.EndSignTime = '';
      }
      GetContractOrder(
        this.ContractCode,
        this.ContractName,
        this.CompanyName,
        this.InvoiceAccount,
        this.InvoiceType,
        this.Applicant,
        this.ApplicationTimeBegin,
        this.ApplicationTimeEnd,
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      ).then((res) => {
        if (res.success) {
          this.ContractData = res.result.list;
          this.total = res.result.totalNumber;
        } else {
          this.ContractData = [];
          this.total = 0;
        }
        this.loading = false;
      });
    },
    // 编辑获取反填信息
    showEditDialog(item) {
      this.remoteMethodShow(item.Id);
      this.updateContractOrderForm.OrderCode = item.OrderCode;
      this.updateContractOrderForm.ContractCode = item.Id;
      this.updateContractOrderForm.CompanyId = item.CompanyId;
      this.GetCompanyByContractList(item.Id);
      this.updateContractOrderForm.OrderAbstract = item.OrderAbstract;
      this.updateContractOrderForm.InvoiceAccount = item.InvoiceAccount;
      this.updateContractOrderForm.AmountReceived = item.AmountReceived;
      this.updateContractOrderForm.InvoiceType = item.InvoiceType + "";
      this.updateContractOrderForm.Applicant = item.Applicant;
      this.updateContractOrderForm.ApplicationTime = item.ApplicationTime;
      this.updateContractOrderForm.IsUsed = item.IsUsed;
      this.updateContractOrderForm.InvoiceState = item.InvoiceState + "";
      this.updateContractOrderForm.ContractOrderName = item.ContractOrderName;
      this.updateContractOrderForm.AmountTotal = item.AmountTotal;
      //只有未审核并且是未回款时候才可以进行修改
      if (item.InvoiceState == 0 && item.CollectionState == 1) { this.updateShow = true; } else { this.updateShow = false; }
      this.updateContractOrderForm.CollectionState = item.CollectionState;

      // 根据合同查询关联自定义金额数据
      GetCustomAmountByOrder(item.OrderCode).then((res) => {
        if (res.success) {
          this.updateContractOrderForm.domains = res.result;
        } else {
          this.updateContractOrderForm.domains = [];
        }
      })
      this.updateDialogVisible = true;
    },
    // 删除信息
    async deleteDialog(item) {
      debugger
      if (item.CollectionState != 1) {
        return this.$message.info("只能删除未回款的数据，对于已经扣款的数据不能做删除操作");
      }
      if (item.AmountReceived != item.Balance) {
        return this.$message.info("对于已经开发票的账单不能进行删除操作");
      }
      const confirmResult = await this.$confirm(
        "此操作将删除该条, 是否继续?",
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
      DeleteContractOrder(item.OrderCode).then((res) => {
        if (res.success) {
          this.$message.success("操作成功！");
          this.GetContractOrderList();
          hideLoading();
        } else {
          hideLoading();
          return this.$message.error(res.resultMessage);
        }
      });
    },
    // 获取销售人数据
    GetUserInfo() {
      GetUserInfo().then((res) => {
        if (res.success) {
          this.UserList = res.result;
        } else {
          this.UserList = [];
        }
      });
    },
    // 获取发票状态数据
    GetInvoiceStatus() {
      GetDicCategory("InvoiceStatus").then((res) => {
        if (res.success) {
          res.result = res.result.filter((item) => {
            return item.Code == "1" || item.Code == "0" || item.Code == "5" || item.Code == "6"
          })
          this.InvoiceStatusList = res.result;
        } else {
          this.InvoiceStatusList = [];
        }
      });
    },
    // // 获取合同数据
    // GetContractName() {
    //   GetContractNameList().then((res) => {
    //     if (res.success) {
    //       this.CorporationDatas = [];
    //       // 公司数据格式化
    //       this.CorporationDatas = res.result.map((item) => {
    //         return {
    //           value: item.Id,
    //           label: item.ContractName,
    //         };
    //       });
    //     } else {
    //       this.CorporationDatas = [];
    //     }
    //   });
    // },
    // 输入过滤
    remoteMethod(query) {
      if (query !== "") {
        this.entLoading = true;
        setTimeout(() => {
          GetContractNameList(query, null).then((res) => {
            this.entLoading = false;
            if (res.success) {
              this.CorporationDatas = [];
              // 公司数据格式化
              this.CorporationDatas = res.result.map((item) => {
                return {
                  value: item.Id,
                  label: item.ContractName,
                };
              });
              this.selectCorporationDatas = this.CorporationDatas.filter((item) => {
                return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
              });

            } else {
              this.CorporationDatas = [];
            }
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
          GetContractNameList("", query).then((res) => {
            this.entLoading = false;
            if (res.success) {
              this.CorporationDatas = [];
              // 公司数据格式化
              this.CorporationDatas = res.result.map((item) => {
                return {
                  value: item.Id,
                  label: item.ContractName,
                };
              });
              this.selectCorporationDatas = this.CorporationDatas.filter((item) => {
                return item.value == query;
              });
            } else {
              this.CorporationDatas = [];
            }
          });
        }, 200);
      } else {
        this.selectCorporationDatas = [];
      }
    },
    // 获取发票科目数据
    GetInvoiceAccountList() {
      GetInvoiceAccount(
        "",
        1,
        100000
      ).then((res) => {
        if (res.success) {
          this.InvoiceAccountList = res.result.list;
          this.total = res.result.totalNumber;
        } else {
          this.InvoiceAccountList = [];
          this.total = 0;
        }
      });
    },
    // 获取发票类型数据
    GetInvoiceType() {
      GetDicCategory("InvoiceType").then((res) => {
        if (res.success) {
          this.InvoiceTypeList = res.result;
        } else {
          this.InvoiceTypeList = [];
        }
      });
    },
    // 根据合同编号获取公司数据
    GetCompanyByContractList(item) {
      GetCompanyByContract(item).then((res) => {
        if (res.success) {
          this.CompanyList = res.result;
        } else {
          this.CompanyList = [];
        }
      });
    },
    fixedShowMethod(newVal) {
      // 上方表单距下方间距
      if (newVal < 1200) {
        if (this.isActive) { this.formShow = 'margin-top: 18px;'; } else { this.formShow = 'margin-top: 0;'; }
      } else {
        this.formShow = 'margin-top: 0;';
      }
      if (newVal < 768) {
        this.fixedLeftShow = false;
      } else {
        this.fixedLeftShow = true;
      }
    }
  },
};
</script>

<style scoped>
.buttonCenter {
  text-align: center;
  margin-top: 20px;
}

.formClass {
  width: 100%;
}

.rangeTimeClass {
  width: 100%;
}

.timeClass {
  width: 100%;
}

.whereFormClass {
  margin-bottom: 18px;
}

.addItemClass {
  color: #000000d9;
  border-color: #d9d9d9;
  background: #fff;
  border-style: dashed;
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
