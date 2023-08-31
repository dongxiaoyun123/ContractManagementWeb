<template>
  <div style="padding: 16px;">
    <el-card>
      <el-form label-width="90px">
        <!-- 合同信息 -->
        <div slot="header" class="clearfix">
          <span>供应商管理</span>
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
                    <el-input v-model="ComName" clearable="" placeholder="公司名称" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item class="whereFormClass" label="合同类型">
                    <el-select v-model="ContractType" class="timeClass" filterable placeholder="合同类型" clearable="">
                      <el-option v-for="item in GetContractTypeArray" :key="item.Code" :label="item.Name"
                        :value="item.Code" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item class="whereFormClass" label="开始时间">
                    <el-date-picker v-model="BeginTime" class="timeClass" style="width:100% ;" type="date"
                      placeholder="合同开始时间" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item class="whereFormClass" label="结束时间">
                    <el-date-picker v-model="EndTime" class="timeClass" style="width:100% ;" type="date"
                      placeholder="合同结束时间" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item class="whereFormClass" label="添加时间">
                    <el-date-picker v-model="ContractSignTime" style="width:100% ;" class="rangeTimeClass"
                      type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
                      :picker-options="pickerOptions" clearable="" @input="datetimeChange" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item label="添加人员">
                    <el-select v-model="CreateUserId" class="timeClass" filterable placeholder="添加人员" clearable="">
                      <el-option v-for="item in UserList" :key="item.UserID" :label="item.UserName"
                        :value="item.UserID" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item label="审核状态" :style="formShow">
                    <el-select v-model="AuditStatus" class="timeClass" filterable placeholder="审核状态" clearable>
                      <el-option v-for="item in AuditStatusList" :key="item.Code" :label="item.Name" :value="item.Code">
                        <el-tag v-if="item.Code == 1" :key="item.Code" effect="plain" type="danger">
                          {{ item.Name }}
                        </el-tag>
                        <el-tag v-if="item.Code == 2" :key="item.Code" effect="plain">
                          {{ item.Name }}
                        </el-tag>
                        <el-tag v-if="item.Code == 3" :key="item.Code" effect="plain" type="warning">
                          {{ item.Name }}
                        </el-tag>
                        <el-tag v-if="item.Code == 4" :key="item.Code" effect="plain" type="success">
                          {{ item.Name }}
                        </el-tag>
                        <el-tag v-if="item.Code == 5" :key="item.Code" effect="plain" type="info">
                          {{ item.Name }}
                        </el-tag>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item class="whereFormClass" label="归档类型">
                    <el-select v-model="ArchivedType" class="timeClass" filterable placeholder="归档类型" clearable="">
                      <el-option v-for="item in ArchivedTypeList" :key="item.Code" :label="item.Name" :value="item.Code">
                        <el-tag v-if="item.Code == 1" :key="item.Code" effect="plain" type="danger">
                          {{ item.Name }}
                        </el-tag>
                        <el-tag v-if="item.Code == 2" :key="item.Code" effect="plain">
                          {{ item.Name }}
                        </el-tag>
                        <el-tag v-if="item.Code == 3" :key="item.Code" effect="plain" type="success">
                          {{ item.Name }}
                        </el-tag>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item class="whereFormClass" label="乙方公司">
                    <el-input v-model="SupplierCmpanyBCode" clearable="" placeholder="乙方公司名称" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </collapse>
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-button-group style="margin-left: 1.3rem;">
                <el-button type="primary" icon="el-icon-search" @click="_getContractDataSearch">查 询
                </el-button>
                <el-button type="info" icon="el-icon-refresh-left" @click="reseatData">重 置
                </el-button>
                <el-button type="success" icon="el-icon-circle-plus-outline" @click="ShowContractAddDialog">增
                  加
                </el-button>

                <el-button type="warning" icon="el-icon-thumb" @click="auditStatusAction">送 审
                </el-button>
                <!-- 超级管理员和财务都能审核 -->
                <el-button v-show="auditStatusCheckFlag" type="danger" icon="el-icon-s-check" @click="auditStatusCheck">审
                  核
                </el-button>
                <el-button v-if="IfExistsExportUserFlag" type="primary" icon="el-icon-download" @click="exportSupplier">导
                  出
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
      <el-table ref="multipleTable" v-loading="loading" class="tableCheckClass" :data="ContractData" fit
        :cell-style="isRed" @selection-change="TableSelect" @row-click="toggleSelection">
        <el-table-column v-if="fixedLeftShow" key="checked" type="selection" width="50" fixed="left" />
        <el-table-column v-else key="checkedFalse" type="selection" width="50" />
        <el-table-column v-if="fixedLeftShow" key="ContractCode" prop="ContractCode" label="合同编号" width="200" fixed="left"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.ContractCode }}</span>
            <el-button v-if="scope.row.ContractCode" size="mini" style="padding:4px 0 4px 5px" type="text"
              icon="el-icon-document-copy" @click="SecondClick(scope.row.ContractCode)" />
          </template>
        </el-table-column>
        <el-table-column v-else key="ContractCodeFalse" prop="ContractCode" label="合同编号" width="200"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.ContractCode }}</span>
            <el-button v-if="scope.row.ContractCode" size="mini" style="padding:4px 0 4px 5px" type="text"
              icon="el-icon-document-copy" @click="SecondClick(scope.row.ContractCode)" />
          </template>
        </el-table-column>
        <el-table-column v-if="fixedLeftShow" key="AuditStatusName" prop="AuditStatusName" label="审核状态" width="120"
          fixed="left">
          <template slot="header" slot-scope="{}">
            <span>审核状态</span>
            <el-tooltip class="item" effect="light" placement="bottom" style="margin-left: 5px;margin-bottom: 0.2rem">
              <i class="el-icon-question" style="font-size: 14px; vertical-align: middle;" />
              <div slot="content">
                <div style="display: flex;  align-items: center;">
                  <span slot="reference" style="margin: 0 10px 0 6px;" class="SecondPartyNameClass">
                    <div>
                      <el-tag effect="plain" type="danger">
                        录入-未送审
                      </el-tag>
                    </div>
                    <div>
                      <el-tag effect="plain">
                        审核中
                      </el-tag>
                    </div>
                    <div>
                      <el-tag effect="plain" type="warning">
                        审核失败
                      </el-tag>
                    </div>
                    <div>
                      <el-tag effect="plain" type="success">
                        审核成功
                      </el-tag>
                    </div>
                    <div style="margin-bottom: 0;">
                      <el-tag effect="plain" type="info">
                        作废
                      </el-tag>
                    </div>
                  </span>
                </div>
              </div>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <div :style="tableTagClass">
              <el-tag v-if="scope.row.AuditStatus == 1" :key="scope.row.AuditStatus" effect="plain" type="danger">
                {{ scope.row.AuditStatusName }}
              </el-tag>
              <el-tag v-if="scope.row.AuditStatus == 2" :key="scope.row.AuditStatus" effect="plain">
                {{ scope.row.AuditStatusName }}
              </el-tag>
              <el-tag v-if="scope.row.AuditStatus == 3" :key="scope.row.AuditStatus" effect="plain" type="warning">
                {{ scope.row.AuditStatusName }}
              </el-tag>
              <el-tag v-if="scope.row.AuditStatus == 4" :key="scope.row.AuditStatus" effect="plain" type="success">
                {{ scope.row.AuditStatusName }}
              </el-tag>
              <el-tag v-if="scope.row.AuditStatus == 5" :key="scope.row.AuditStatus" effect="plain" type="info">
                {{ scope.row.AuditStatusName }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-else key="AuditStatusNameFalse" prop="AuditStatusName" label="审核状态" width="120" sortable>
          <template slot="header" slot-scope="{}">
            <span>审核状态</span>
            <el-tooltip class="item" effect="light" placement="bottom" style="margin-left: 5px;margin-bottom: 0.2rem">
              <i class="el-icon-question" style="font-size: 14px; vertical-align: middle;" />
              <div slot="content">
                <div style="display: flex;  align-items: center;">
                  <span slot="reference" style="margin: 0 10px 0 6px;" class="SecondPartyNameClass">
                    <div>
                      <el-tag effect="plain" type="danger">
                        录入-未送审
                      </el-tag>
                    </div>
                    <div>
                      <el-tag effect="plain">
                        审核中
                      </el-tag>
                    </div>
                    <div>
                      <el-tag effect="plain" type="warning">
                        审核失败
                      </el-tag>
                    </div>
                    <div>
                      <el-tag effect="plain" type="success">
                        审核成功
                      </el-tag>
                    </div>
                    <div style="margin-bottom: 0;">
                      <el-tag effect="plain" type="info">
                        作废
                      </el-tag>
                    </div>
                  </span>
                </div>
              </div>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-tag v-if="scope.row.AuditStatus == 1" :key="scope.row.AuditStatus" effect="plain" type="danger">
              {{ scope.row.AuditStatusName }}
            </el-tag>
            <el-tag v-if="scope.row.AuditStatus == 2" :key="scope.row.AuditStatus" effect="plain">
              {{ scope.row.AuditStatusName }}
            </el-tag>
            <el-tag v-if="scope.row.AuditStatus == 3" :key="scope.row.AuditStatus" effect="plain" type="warning">
              {{ scope.row.AuditStatusName }}
            </el-tag>
            <el-tag v-if="scope.row.AuditStatus == 4" :key="scope.row.AuditStatus" effect="plain" type="success">
              {{ scope.row.AuditStatusName }}
            </el-tag>
            <el-tag v-if="scope.row.AuditStatus == 5" :key="scope.row.AuditStatus" effect="plain" type="info">
              {{ scope.row.AuditStatusName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column key="ArchivedType" prop="ArchivedType" label="合同归档" small min-width="90">
          <template slot="header" slot-scope="{}">
            <span>合同归档</span>
            <el-tooltip class="item" effect="light" placement="bottom" style="margin-left: 5px;margin-bottom: 0.2rem">
              <i class="el-icon-question" style="font-size: 14px; vertical-align: middle;" />
              <div slot="content">
                <div style="display: flex;  align-items: center;">
                  <span slot="reference" style="margin: 0 10px 0 6px;" class="SecondPartyNameClass">
                    <div>
                      <span style="border-color: #F7C695;color:#FA8C16">
                        待上传
                      </span>
                    </div>
                    <div>
                      <span style="border-color: #A29BC4;color:#6959CD">
                        待归档
                      </span>
                    </div>
                    <div style="margin-bottom: 0;">
                      <span style="border-color: #8BC6C6;color:#11A983">
                        已归档
                      </span>
                    </div>
                  </span>
                </div>
              </div>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <div :style="tableTagClass">
              <span v-if="scope.row.ArchivedType == 1" :key="scope.$index + 'a' + scope.row.ArchivedType"
                style="border-color: #F7C695;color:#FA8C16">
                待上传
              </span>
              <span v-if="scope.row.ArchivedType == 2" :key="scope.$index + 'b' + scope.row.ArchivedType"
                style="border-color: #A29BC4;color:#6959CD">
                待归档
              </span>
              <span v-if="scope.row.ArchivedType == 3" :key="scope.$index + 'c' + scope.row.ArchivedType"
                style="border-color: #8BC6C6;color:#13C2C2">
                已归档
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="ContractName" label="合同名称" width="160" show-overflow-tooltip />
        <el-table-column prop="CompanyName" label="公司名称" width="120" show-overflow-tooltip />
        <el-table-column prop="SupplierCmpanyBName" label="乙方公司名称" width="200" show-overflow-tooltip />
        <el-table-column prop="ContractTypeName" label="合同类型" width="100" />
        <el-table-column prop="BeginTimeStr" label="开始时间" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.BeginTimeStr">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.BeginTimeStr }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="EndTimeStr" label="结束时间" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.EndTimeStr">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.EndTimeStr }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="CreateUserName" label="创建人" width="100" />
        <el-table-column prop="CreationTimeStr" label="创建时间" width="170" sortable>
          <template slot-scope="scope">
            <div v-if="scope.row.CreationTimeStr">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.CreationTimeStr }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column key="SubmitCensorshipTimeStr" prop="SubmitCensorshipTimeStr" label="送审时间" width="180" sortable>
          <template slot-scope="scope">
            <div v-if="scope.row.SubmitCensorshipTimeStr">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.SubmitCensorshipTimeStr }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column key="ExamineTimeStr" prop="ExamineTimeStr" label="审核时间" width="180" sortable>
          <template slot-scope="scope">
            <div v-if="scope.row.ExamineTimeStr">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.ExamineTimeStr }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="fixedLeftShow" label="操作" fixed="right" width="80">
          <template slot-scope="scope" class="tableRowClass">
            <el-button icon="el-icon-edit" type="text" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column v-else label="操作" width="80">
          <template slot-scope="scope" class="tableRowClass">
            <el-button icon="el-icon-edit" type="text" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination background :current-page="queryInfo.pagenum" :page-sizes="[20, 50, 100]"
        :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-card>

    <!-- 添加合同弹出页面 -->
    <el-dialog :visible.sync="detailAddDialogVisible" top="5vh" width="60%" :lock-scroll="false" :append-to-body="true"
      @close="detailAddDialogVisibleClosed">
      <!-- 上面两个属性用来重置滚动条 -->
      <div slot="title" class="dialog-title">
        <span>添加供应商合同</span>
      </div>
      <el-form ref="addContractsRef" :model="addSupplierForm" :rules="addContractsRules" label-width="120px"
        class="formClass">

        <el-row>
          <el-col :span="12">
            <el-form-item label="合同编号" prop="ContractCode" class="scrollClass">
              <el-input v-model="addSupplierForm.ContractCode" placeholder="系统自动生成" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同名称" prop="ContractName">
              <el-input v-model="addSupplierForm.ContractName" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="公司名称" prop="CompanyId">
              <el-select v-model="addSupplierForm.CompanyId" filterable placeholder="合同类型" clearable="">
                <el-option v-for="item in DicCategoryList" :key="item.Id" :label="item.Name" :value="item.Id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同类型" prop="ContractType">
              <el-select v-model="addSupplierForm.ContractType" filterable placeholder="合同类型" clearable="">
                <el-option v-for="item in GetContractTypeArray" :key="item.Code" :label="item.Name" :value="item.Code" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item ref="BeginTime" label="开始日期" prop="BeginTime">
              <el-date-picker v-model="addSupplierForm.BeginTime" type="date" placeholder="选择日期" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束日期" prop="EndTime">
              <el-date-picker v-model="addSupplierForm.EndTime" type="date" placeholder="结束日期" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方公司" prop="SupplierCmpanyBCode">
              <el-select v-model="addSupplierForm.SupplierCmpanyBCode" class="CompanySelectClass" filterable
                placeholder="乙方公司" clearable="">
                <el-option v-for="item in SupplierCmpanyBList" :key="item.SupplierCmpanyBCode"
                  :label="item.SupplierCmpanyBName" :value="item.SupplierCmpanyBCode" />
              </el-select>
              <div class="CompanyClass">
                <el-tooltip class="item" effect="dark" content="添加乙方公司" placement="top-start">
                  <el-button style="font-size: 20px;" type="text" icon="el-icon-circle-plus-outline" circle
                    @click="AddSupplierCmpanyB" />
                </el-tooltip>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经办人" prop="HandledBy">
              <el-input v-model="addSupplierForm.HandledBy" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注" prop="Remark">
                <el-input v-model="addSupplierForm.Remark" type="textarea" :rows="5" maxlength="500" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="附件上传">
                <el-upload ref="upload" class="upload-demo" action="" :headers="header" multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png,.gif,.bmp,.ppt,.pptx,.rtf,.txt" :limit="20"
                  :on-exceed="handleExceedAdd" :on-remove="AttachmentCodeRemove" :auto-upload="false"
                  :file-list="fileList" :on-change="handleChange">
                  <el-button slot="trigger" icon="el-icon-position" size="mini" plain type="primary">选取文件</el-button>
                </el-upload>
                <el-button v-if="UploadServerFlag" icon="el-icon-upload2" size="mini" plain style="margin-top: 0.8rem;"
                  type="success" :loading="uploadServerLoading" @click="submitUpload">上传到服务器</el-button>
                <div class="el-upload__tip">只能上传office文件，且不超过<span
                    style="color:#ff4949 ;">20M</span>，可一次选取多个文件，上传完成请点击上传到服务器。</div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button icon="el-icon-circle-check" type="primary" :loading="LoadingAddSupplier" @click="addContracts">保
              存</el-button>
            <el-button icon="el-icon-refresh" type="info" @click="detailAddDialogVisibleClosed">重 置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="updateDialogVisible" top="5vh" :append-to-body="true" width="60%"
      @close="detailUpdateDialogVisibleClosed">
      <div slot="title" class="dialog-title">
        <span>编辑供应商合同</span>
      </div>
      <el-form ref="updateContractsRef" :model="updateSupplierFrom" :rules="addContractsRules" label-width="120px"
        class="formClass">

        <el-row>
          <el-col :span="12">
            <el-form-item label="合同编号" prop="ContractCode" class="scrollClass">
              <el-input v-model="updateSupplierFrom.ContractCode" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同名称" prop="ContractName">
              <el-input v-model="updateSupplierFrom.ContractName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司名称" prop="CompanyId">
              <el-select v-model="updateSupplierFrom.CompanyId" :disabled="ConCompany" filterable placeholder="合同类型"
                clearable="">
                <el-option v-for="item in DicCategoryList" :key="item.Id" :label="item.Name" :value="item.Id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同类型" prop="ContractType">
              <el-select v-model="updateSupplierFrom.ContractType" filterable placeholder="合同类型" clearable="">
                <el-option v-for="item in GetContractTypeArray" :key="item.Code" :label="item.Name" :value="item.Code" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item ref="BeginTime" label="开始日期" prop="BeginTime">
              <el-date-picker v-model="updateSupplierFrom.BeginTime" type="date" placeholder="选择日期" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束日期" prop="EndTime">
              <el-date-picker v-model="updateSupplierFrom.EndTime" type="date" placeholder="结束日期" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方公司" prop="SupplierCmpanyBCode">
              <el-select v-model="updateSupplierFrom.SupplierCmpanyBCode" class="CompanySelectClass" filterable
                placeholder="乙方公司" clearable="">
                <el-option v-for="item in SupplierCmpanyBList" :key="item.SupplierCmpanyBCode"
                  :label="item.SupplierCmpanyBName" :value="item.SupplierCmpanyBCode" />
              </el-select>
              <div class="CompanyClass">
                <el-tooltip class="item" effect="dark" content="添加乙方公司" placement="top-start">
                  <el-button style="font-size: 20px;" type="text" icon="el-icon-circle-plus-outline" circle
                    @click="AddSupplierCmpanyB" />
                </el-tooltip>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经办人" prop="HandledBy">
              <el-input v-model="updateSupplierFrom.HandledBy" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注" prop="Remark">
                <el-input v-model="updateSupplierFrom.Remark" type="textarea" :rows="5" maxlength="500" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="已上传文件">
                <el-button v-if="updateSupplierFrom.ArchivedType == 2" icon="el-icon-receiving" size="mini"
                  style="margin-bottom:13px" plain :loading="placeFileLoading" type="warning"
                  @click="placeFile">归档</el-button>
                <div v-for="item in updateSupplierFrom.FileLists" :key="item.name" class="bottom clearfix">
                  <!-- <el-link type="primary" class="time" :href="item.url" target="_blank">{{ item.name }}
                    </el-link> -->
                  {{ item.name }}
                  <el-button icon="el-icon-view" type="text" class="button" @click="clickView(item)">在线预览</el-button>
                  <el-button icon="el-icon-download" type="text" class="button" @click="downView(item)">下载</el-button>
                </div>
                <!-- <div v-for="item in updateSupplierFrom.FileLists" style="height:30px ;">
                  <el-link type="primary" :underline="false" :href="item.url" target="_blank">{{ item.name }}
                  </el-link>
                </div> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="附件上传">
                <el-upload ref="upload" class="upload-demo" action="" :headers="header" multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png,.gif,.bmp,.ppt,.pptx,.rtf,.txt" :limit="20"
                  :on-exceed="handleExceedAddUpdate" :on-remove="AttachmentCodeRemoveUpdate" :auto-upload="false"
                  :file-list="fileListUpload" :on-change="handleChangeUpdate">
                  <el-button v-if="updateSupplierFrom.ArchivedType != 3" slot="trigger" icon="el-icon-position"
                    size="mini" plain type="primary">选取文件</el-button>
                </el-upload>
                <el-button v-if="updateSupplierFrom.ArchivedType != 3 && UploadServerFlagUpdate" icon="el-icon-upload2"
                  size="mini" plain style="margin-top: 0.8rem;" type="success" :loading="uploadServerLoading"
                  @click="submitUploadUpdate">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传office文件，且不超过<span
                    style="color:#ff4949 ;">20M</span>，可一次选取多个文件，上传完成请点击上传到服务器。</div>

              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button icon="el-icon-circle-check" type="primary" :loading="LoadingUpdate" @click="saveUpdate">保
              存</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- 修改审核状态弹出窗口 -->
    <el-dialog title="修改审核状态" :visible.sync="auditStatusCheckDialog" width="30%">
      <el-form label-width="150px">
        <el-row>
          <el-col>
            <el-alert title="选中合同条数" type="info" :description="auditStatusdescription" show-icon :closable="false" />
          </el-col>
        </el-row>
        <el-form-item label="审核状态" style="margin-top:20px;">
          <el-select v-model="auditStatusChange" filterable placeholder="审核状态">
            <el-option v-for="item in AuditStatusList" :key="item.Code" :label="item.Name" :value="item.Code">
              <el-tag v-if="item.Code == 1" :key="item.Code" effect="plain">
                {{ item.Name }}
              </el-tag>
              <el-tag v-if="item.Code == 2" :key="item.Code" effect="plain" type="warning">
                {{ item.Name }}
              </el-tag>
              <el-tag v-if="item.Code == 3" :key="item.Code" effect="plain" type="danger">
                {{ item.Name }}
              </el-tag>
              <el-tag v-if="item.Code == 4" :key="item.Code" effect="plain" type="success">
                {{ item.Name }}
              </el-tag>
              <el-tag v-if="item.Code == 5" :key="item.Code" effect="plain" type="info">
                {{ item.Name }}
              </el-tag>
            </el-option>
          </el-select>
        </el-form-item>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button icon="el-icon-circle-check" type="primary" :loading="auditStatusCheckLoading"
              @click="saveAuditStatusCheck">确 定
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog title="添加乙方公司" :visible.sync="addDialogVisible" width="30%" @close="addDialogClosed">
      <el-form ref="addRef" :model="AddSupplierFrom" :rules="AddSupplierRules" label-width="120px">
        <el-form-item label="乙方公司名称" prop="SupplierCmpanyBName">
          <el-input v-model="AddSupplierFrom.SupplierCmpanyBName" />
        </el-form-item>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button v-loading.fullscreen.lock="LoadingAddSupplier" icon="el-icon-circle-check" type="primary"
              @click="saveAdd">确
              定</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <div v-if="isShowProgress" class="popContainer">
      <el-progress type="circle" :percentage="parseInt(fakes.progress * 100)" :stroke-width="9" :color="customColors"
        style="top: 30%; left: calc(50vw - 58px);color:white" />
    </div>
    <el-dialog append-to-body :visible="isshowpdf" width="65%" top="5vh" @close="isshowpdf = false">
      <iframe v-if="isshowpdf" style="width: 100%; height: calc(100vh - 200px);" :src="srcDocx" />
    </el-dialog>
  </div>
</template>

<script>
import {
  GetSupplierData,
  GetContractType,
  AddSupplier,
  UpdateSupplier,
  GetAttachmentFirst,
  GetSupplierDataExport,
  SubmitForCensorshipSupplier,
  SaveAuditStatusSupplier,
  GetDicCategory,
  GetUserInfo,
  PlaceFileMethodSupplier,
} from "@/api/CollectionMangement";
import {
  GetDicCategoryC,
  GetSupplierCmpanyB,
  Uploads,
  IfExistsExportUser,
  AddSupplierCmpanyB,
} from "@/api/SystemManagement";
import { parseTime, getDateByTimes } from "@/utils"; // 时间日期格式化成字符串
import moment from "moment"; // 导入模块
moment.locale("zh-cn"); // 设置语言 或 moment.lang('zh-cn');
import { showLoading, hideLoading } from "@/common/loading";
import collapse from '../../assets/js/collapse'
import FakeProgress from 'fake-progress';
export default {
  name: 'SupplierManagement',
  components: {
    collapse
  },
  data() {
    return {
      UploadServerFlag: false,
      UploadServerFlagUpdate: false,
      SupplierCmpanyBCode: '',
      ArchivedTypeList: [],
      placeFileLoading: false,
      ArchivedType: '',
      isShowProgress: false,
      fakes: new FakeProgress({
        timeConstant: 10000,
        autoStart: false
      }),
      customColors: [
        { color: '#ff4949', percentage: 20 },
        { color: '#ffba00', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ],
      formShow: 'margin-bottom:"0"',
      fixedLeftShow: false,
      fixedRightShow: 'right',
      multipleSelection: [],
      isActive: false,
      UserList: [],
      header: { Authorization: sessionStorage.getItem("token") },
      SupplierCmpanyBList: [],
      ComName: "",
      ExportLoading: false,
      GetContractTypeArray: [],
      ContractCode: "",
      ContractName: "",
      ContractType: "",
      BeginTime: "",
      EndTime: "",
      // ContractRangeTime: [],
      ContractSignTime: [],
      BeginSignTime: "",
      EndSignTime: "",
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
      detailAddDialogVisible: false,
      updateDialogVisible: false,
      ContractData: [],
      loading: false,
      DicCategoryList: [],
      addSupplierForm: {
        ContractCode: "",
        ContractName: "",
        CompanyId: "",
        ContractType: "",
        BeginTime: "",
        EndTime: "",
        SupplierCmpanyBCode: "",
        HandledBy: "",
        Remark: "",
        FileList: [],
      },
      updateSupplierFrom: {
        Id: '',
        ContractCode: "",
        ContractName: "",
        CompanyId: "",
        ContractType: "",
        BeginTime: "",
        EndTime: "",
        SupplierCmpanyBCode: "",
        HandledBy: "",
        Remark: "",
        FileList: [],
        FileLists: [],
        ArchivedType: '',
      },
      // 添加合同正则验证
      addContractsRules: {
        // ContractCode: [
        //   { required: true, message: "请输入合同编号", trigger: "blur" },
        //   {
        //     min: 1,
        //     max: 50,
        //     message: "长度在 1 到 50 个字符内",
        //     trigger: "blur",
        //   },
        // ],
        ContractName: [
          { required: true, message: "请输入合同名称", trigger: "blur" },
        ],
        CompanyId: [
          { required: true, message: "请选择公司名称", trigger: "change" },
        ],
        ContractType: [
          { required: true, message: "请选择合同类型", trigger: "change" },
        ],
        SupplierCmpanyBCode: [
          { required: true, message: "请选择乙方公司名称", trigger: "change" },
        ],
        BeginTime: [
          { required: true, message: "请选择开始日期", trigger: "change" },
        ],
        EndTime: [
          { required: true, message: "请选择结束日期", trigger: "change" },
        ],
      },
      uploadServerLoading: false,
      fileList: [],
      fileListUpload: [],
      IfExistsExportUserFlag: false,
      Id: '',
      auditStatusChange: '',
      auditStatusdescription: '',
      auditStatusCheckDialog: false,
      AuditStatusList: [],
      auditStatusCheckLoading: false,
      auditStatusCheckFlag: false,
      CreateUserId: '',
      AuditStatus: '',
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
      addDialogVisible: false,
      AddSupplierFrom: {
        SupplierCmpanyBName: "",
      },
      AddSupplierRules: {
        SupplierCmpanyBName: [
          {
            required: true,
            message: "请输入乙方公司名称",
            trigger: "blur",
          },
        ],
      },
      LoadingAddSupplier: false,
      ConCompany: true, // 甲方合同名称、乙方合同名称只有超级管理员可以修改
      isshowpdf: false,
      srcDocx: '',
    };
  },
  computed: {
    // el-tag 嵌套在table中会出现初次加载没有高度问题，在此直接根据空间尺寸赋值默认高度
    tableTagClass() {
      var tableTagHeight = '';
      switch (this.$store.getters.size) {
        case 'small':
          tableTagHeight = '24px';
          break;
        case 'default':
          tableTagHeight = '32px';
          break;
        case 'medium':
          tableTagHeight = '28px';
          break;
        case 'mini':
          tableTagHeight = '21px';
          break;
      }
      return {
        height: tableTagHeight,
      }
    }
  },
  watch: {
    '$store.getters.clientWidth'(newVal, oldVal) {
      this.fixedShowMethod(newVal);
    }
  },
  created() {
    this.fixedShowMethod(document.body.clientWidth);
    switch (sessionStorage.getItem("RoleName")) {
      case "超级管理员":
      case "财务":
        this.auditStatusCheckFlag = true;
        break;
    }
  },
  // 加载完成后执行获取公司数据接口
  mounted() {
    if (sessionStorage.getItem("RoleName") == "超级管理员") { this.ConCompany = false; }
    // 获取乙方公司数据
    this.GetDicCategoryC();
    // 获取合同类型数据
    this.GetContractTypeList();
    // 获取合同数据
    this._getContractData();
    // 获取乙方公司数据
    this.GetSupplierCmpanyB();
    // 是否有导出按钮
    this.IfExistsExportUserMethod();
    // 获取审核状态数据
    this.GetAuditStatus();
    // 获取销售人数据
    this.GetUserInfo();
    // 获取归档类型数据
    this.GetArchivedType();
  },
  methods: {
    clickView(src) {
      this.srcDocx = src.url;
      this.isshowpdf = true
    },
    downView(src) {
      window.location.href = src.urlDown;
    },
    SecondClick(ContractCode) {
      this.copys("合同编号", ContractCode);
    },
    // 复制通用方法
    copys(title, option) {
      var input = document.createElement("input"); // 创建input对象
      input.value = option; // 设置复制内容
      document.body.appendChild(input); // 添加临时实例
      input.select(); // 选择实例内容
      document.execCommand("Copy"); // 执行复制
      document.body.removeChild(input); // 删除临时实例
      this.$message.success("已成功复制" + title + "：" + option);
    },

    // 点击当前行数据进行选中或取消复选框
    toggleSelection(row, column, event) {
      if (column.label != "操作" && column.label != "合同编号") {
        // 通过ref绑定后这里使用$refs.table来操作bom元素
        this.$refs.multipleTable.toggleRowSelection(row);
      }
    },
    // 添加
    AddSupplierCmpanyB() {
      this.addDialogVisible = true;
    },
    // 关闭弹框事件
    addDialogClosed() {
      this.$refs.addRef.resetFields();
    },
    saveAdd() {
      this.LoadingAddSupplier = true;
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) {
          this.LoadingAddSupplier = false;
          return;
        }
        AddSupplierCmpanyB(this.AddSupplierFrom).then((res) => {
          if (res.success) {
            this.addDialogVisible = false;
            this.$message.success("操作成功");
            this.GetSupplierCmpanyB();
          } else {
            this.$message.error(res.resultMessage);
          }
          this.LoadingAddSupplier = false;
        });
      });
    },
    collapseClick() {
      this.isActive = !this.isActive
    },
    datetimeChange(time) {
      // 强制刷新
      this.$forceUpdate();
    },
    // 保存修改状态
    saveAuditStatusCheck() {
      this.auditStatusCheckLoading = true;
      SaveAuditStatusSupplier(
        this.Id,
        this.auditStatusChange
      ).then((res) => {
        if (res.success) {
          this.auditStatusCheckDialog = false;
          this.$message.success("操作成功");
          this._getContractData();
        } else {
          this.$message.error(res.resultMessage);
        }
        this.auditStatusCheckLoading = false;
      });
    },
    // 获取审核状态数据
    GetAuditStatus() {
      GetDicCategory("AuditStatus").then((res) => {
        if (res.success) {
          this.AuditStatusList = res.result;
        } else {
          this.AuditStatusList = [];
        }
      });
    },
    // 弹出修改审核状态窗口
    auditStatusCheck() {
      if (!this.Id) {
        this.$message.warning("请勾选要审核的供应商合同数据！");
        return;
      }
      // 默认一个审核状态吧，录入-未送审
      this.auditStatusChange = '4';
      this.auditStatusCheckDialog = true;
    },
    // 送审
    async auditStatusAction() {
      if (!this.Id) {
        this.$message.warning("请勾选要送审的数据！");
        return;
      }
      const confirmResult = await this.$confirm(
        "是否将选中供应商合同送审?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消送审");
      }
      showLoading();
      SubmitForCensorshipSupplier(this.Id).then((res) => {
        if (res.success) {
          this.$message.success("操作成功！");
          this._getContractData();
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
      // auditStatusdescription
      var oneCount = 0; var twoCount = 0; var threeCount = 0; var fourCount = 0; var fiveCount = 0;
      if (selection.length != 0) {
        this.Id = "";
        selection.forEach((element) => {
          // 修改合同状态时用到
          this.Id +=
            element.Id + ",";
          // 财务审核时用到
          switch (element.AuditStatus) {
            case 1:
              oneCount = oneCount + 1;
              break;
            case 2:
              twoCount = twoCount + 1;
              break;
            case 3:
              threeCount = threeCount + 1;
              break;
            case 4:
              fourCount = fourCount + 1;
              break;
            case 5:
              fiveCount = fiveCount + 1;
              break;
          }
        });
        this.Id =
          this.Id.substring(
            0,
            this.Id.lastIndexOf(",")
          );
        this.auditStatusdescription = "选中合同中" +
          (oneCount == 0 ? "" : "审核状态为录入-未送审的有" + oneCount + "个；") +
          (twoCount == 0 ? "" : "审核状态为审核中的有" + twoCount + "个；") +
          (threeCount == 0 ? "" : "审核状态为审核失败的有" + threeCount + "个；") +
          (fourCount == 0 ? "" : "审核状态为审核成功的有" + fourCount + "个；") +
          (fiveCount == 0 ? "" : "审核状态为作废的有" + fiveCount + "个。")
      } else {
        this.Id = "";
        this.auditStatusdescription = "";
      }
    },
    isRed({ row }) {
      const checkIdList = this.multipleSelection.map((item) => item.CreationTimeStr);
      if (checkIdList.includes(row.CreationTimeStr)) {
        return {
          backgroundColor: "#E6F7FF",
        };
      } else {
        return {
          backgroundColor: "#FFFFFF",
        };
      }
    },
    // 添加-上传文件
    handleChange(file, fileList) {
      this.fileList = fileList;
      this.addIfShowUploadButton();
    },
    addIfShowUploadButton() {
      this.UploadServerFlag = false;
      // 正向对比
      if (this.fileList.length != 0 || this.addSupplierForm.FileList.length != 0) {
        for (const index in this.fileList) {
          var flagz = this.addSupplierForm.FileList.filter((item) => {
            return item.FileName == this.fileList[index].name;
          });
          if (flagz.length == 0)
            return this.UploadServerFlag = true;
        }
      }
      // 反向对比
      if (this.fileList.length != 0 || this.addSupplierForm.FileList.length != 0) {
        for (const index in this.addSupplierForm.FileList) {
          var flagf = this.fileList.filter((item) => {
            return item.name == this.addSupplierForm.FileList[index].FileName;
          });
          if (flagf.length == 0)
            return this.UploadServerFlag = true;
        }
      }
    },
    handleExceedAdd(files, fileList) {
      this.$message.warning('当前文件数量超过限制');
    },
    submitUpload() {
      const formData = new FormData()
      this.fileList.forEach(item => {
        formData.append('files', item.raw)
      })
      if (this.fileList == 0) {
        this.$message.warning("请选择要上传到服务器的文件");
        return
      }
      this.uploadServerLoading = true;
      this.addSupplierForm.FileList = [];
      Uploads(formData).then(response => {
        if (response.success) {
          for (const index in response.result) {
            var addForm = {
              AttachmentName: response.result[index].AttachmentName,
              FileName: response.result[index].FileName,
            };
            // 给添加表单的列表赋值
            this.addSupplierForm.FileList.push(addForm);
          }
          this.UploadServerFlag = false;
          this.$message.success("上传成功");
        } else {
          this.$message.error(response.resultMessage);
        }
        this.uploadServerLoading = false;
      })
        .catch((err) => {
          this.uploadServerLoading = false;
          this.$message.error(err);
        })
    },
    AttachmentCodeRemove(file, fileList) {
      this.fileList = fileList;
      let addNew = [];
      fileList.map((item) => {
        addNew.push(item.name);
      });
      this.addSupplierForm.FileList = this.addSupplierForm.FileList.filter((f) => {
        return addNew.includes(f.FileName)
      })
      this.addIfShowUploadButton();
    },
    // AttachmentCodePreview(file) {
    //   window.open(file.url);
    // },
    // 修改-上传文件
    handleChangeUpdate(file, fileList) {
      this.fileListUpload = fileList;
      this.updateIfShowUploadButton();
    },
    updateIfShowUploadButton(){
      this.UploadServerFlagUpdate=false;
          // 正向对比
          if (this.fileListUpload.length != 0 || this.updateSupplierFrom.FileList.length != 0) {
            for (const index in this.fileListUpload) {
              var flagz = this.updateSupplierFrom.FileList.filter((item) => {
                return item.FileName == this.fileListUpload[index].name;
              });
              if (flagz.length == 0) 
              return this.UploadServerFlagUpdate=true;
            }
          }
          // 反向对比
          if (this.fileListUpload.length != 0 || this.updateSupplierFrom.FileList.length != 0) {
            for (const index in this.updateSupplierFrom.FileList) {
              var flagf = this.fileListUpload.filter((item) => {
                return item.name == this.updateSupplierFrom.FileList[index].FileName;
              });
              if (flagf.length == 0) 
              return this.UploadServerFlagUpdate=true;
            }
          }
    },
    handleExceedAddUpdate(files, fileList) {
      this.$message.warning('当前文件数量超过限制');
    },
    submitUploadUpdate() {
      const formData = new FormData()
      this.fileListUpload.forEach(item => {
        formData.append('files', item.raw)
      })
      if (this.fileListUpload == 0) {
        this.$message.warning("请选择要上传到服务器的文件");
        return
      }
      this.uploadServerLoading = true;
      this.updateSupplierFrom.FileList = [];
      Uploads(formData).then(response => {
        if (response.success) {
          for (const index in response.result) {
            var addForm = {
              AttachmentName: response.result[index].AttachmentName,
              FileName: response.result[index].FileName,
            };
            // 给添加表单的列表赋值
            this.updateSupplierFrom.FileList.push(addForm);
          }
          this.UploadServerFlagUpdate=false;
          this.$message.success("上传成功");
        } else {
          this.$message.error(response.resultMessage);
        }
        this.uploadServerLoading = false;
      })
        .catch(err => {
          this.uploadServerLoading = false;
          this.$message.error(err);
        })
    },
    AttachmentCodeRemoveUpdate(file, fileList) {
      this.fileListUpload = fileList;
      let addNew=[];
      fileList.map((item)=>{
        addNew.push(item.name);
      });
      this.updateSupplierFrom.FileList= this.updateSupplierFrom.FileList.filter((f)=>{
       return addNew.includes(f.FileName)
       })
       this.updateIfShowUploadButton();
    },
    // 重置数据
    reseatData() {
      this.SupplierCmpanyBCode = '';
      this.ArchivedType = '';
      this.ContractCode = '';
      this.ContractName = '';
      this.ComName = '';
      this.ContractType = '';
      this.BeginTime = '';
      this.EndTime = '';
      this.AuditStatus = '';
      this.CreateUserId = '';
      this.ContractSignTime = [];
      this.BeginSignTime = "";
      this.EndSignTime = "";
      this.queryInfo.pagesize = 20;
      this.queryInfo.pagenum = 1;
      this._getContractData();
    },

    // 归档
    async placeFile() {
      const confirmResult = await this.$confirm(
        "是否归档?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消归档");
      }
      this.placeFileLoading = true;
      PlaceFileMethodSupplier(this.updateSupplierFrom.Id).then((res) => {
        if (res.success) {
          this.$message.success("操作成功！");
          this.updateSupplierFrom.ArchivedType = 3;
          this._getContractData();
        } else {
          this.placeFileLoading = false;
          return this.$message.error(res.resultMessage);
        }
        this.placeFileLoading = false;
      });
    },
    detailAddDialogVisibleClosed() {
      this.$refs.addContractsRef.resetFields();
    },
    detailUpdateDialogVisibleClosed() {
      this.$refs.updateContractsRef.resetFields();
    },
    addContracts() {
      this.LoadingAdd = true;
      // 提交请求前，表单预验证
      this.$refs.addContractsRef.validate(async (valid, object) => {
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
          // 正向对比
          if (this.fileList.length != 0 || this.addSupplierForm.FileList.length != 0) {
            for (const index in this.fileList) {
              var flagz = this.addSupplierForm.FileList.filter((item) => {
                return item.FileName == this.fileList[index].name;
              });
              if (flagz.length == 0) {
                this.LoadingAdd = false;
                this.$message.warning("文件上传完成或者修改需要点击一下上传服务器");
                return;
              }
            }
          }
          // 反向对比
          if (this.fileList.length != 0 || this.addSupplierForm.FileList.length != 0) {
            for (const index in this.addSupplierForm.FileList) {
              var flagf = this.fileList.filter((item) => {
                return item.name == this.addSupplierForm.FileList[index].FileName;
              });

              if (flagf.length == 0) {
                this.LoadingAdd = false;
                this.$message.warning("文件上传完成或者修改需要点击一下上传服务器");
                return;
              }
            }
          }

          if (this.addSupplierForm.BeginTime >= this.addSupplierForm.EndTime) {
            this.$message.warning("开始时间不能大于等于结束时间，请检查");
            this.LoadingAdd = false;
            return;
          }
          // 日期格式化
          this.addSupplierForm.BeginTime = this.addSupplierForm.BeginTime
            ? parseTime(this.addSupplierForm.BeginTime, "{y}-{m}-{d}")
            : "";
          this.addSupplierForm.EndTime = this.addSupplierForm.EndTime
            ? parseTime(this.addSupplierForm.EndTime, "{y}-{m}-{d}")
            : "";
          AddSupplier(this.addSupplierForm).then((res) => {
            if (res.success) {
              this.$message.success("操作成功");
              this.detailAddDialogVisible = false;
              this._getContractData();
            } else {
              this.$message.error(res.resultMessage);
            }
            this.LoadingAdd = false;
          });
        }
      });
    },
    // 弹出添加窗口
    ShowContractAddDialog() {
      this.UploadServerFlag=false,
      this.fileList = [];
      this.addSupplierForm.FileList = [];
      this.detailAddDialogVisible = true;
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
    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this._getContractData();
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newSize) {
      this.queryInfo.pagenum = newSize;
      this._getContractData();
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
          // 正向对比
          if (this.fileListUpload.length != 0 || this.updateSupplierFrom.FileList.length != 0) {
            for (const index in this.fileListUpload) {
              var flagz = this.updateSupplierFrom.FileList.filter((item) => {
                return item.FileName == this.fileListUpload[index].name;
              });

              if (flagz.length == 0) {
                this.LoadingUpdate = false;
                this.$message.warning("文件上传完成或者修改需要点击一下上传服务器");
                return;
              }
            }
          }
          // 反向对比
          if (this.fileListUpload.length != 0 || this.updateSupplierFrom.FileList.length != 0) {
            for (const index in this.updateSupplierFrom.FileList) {
              var flagf = this.fileListUpload.filter((item) => {
                return item.name == this.updateSupplierFrom.FileList[index].FileName;
              });

              if (flagf.length == 0) {
                this.LoadingUpdate = false;
                this.$message.warning("文件上传完成或者修改需要点击一下上传服务器");
                return;
              }
            }
          }
          if (this.updateSupplierFrom.BeginTime >= this.updateSupplierFrom.EndTime) {
            this.LoadingUpdate = false;
            this.$message.warning("开始时间不能大于等于结束时间，请检查");
            return;
          }
          // 日期格式化
          this.updateSupplierFrom.BeginTime = this.updateSupplierFrom.BeginTime
            ? parseTime(this.updateSupplierFrom.BeginTime, "{y}-{m}-{d}")
            : "";
          this.updateSupplierFrom.EndTime = this.updateSupplierFrom.EndTime
            ? parseTime(this.updateSupplierFrom.EndTime, "{y}-{m}-{d}")
            : "";

          UpdateSupplier(this.updateSupplierFrom).then((res) => {
            if (res.success) {
              this.$message.success("操作成功");
              this.updateDialogVisible = false;
              this._getContractData();
            } else {
              this.$message.error(res.resultMessage);
            }
            this.LoadingUpdate = false;
          });
        }
      });
    },
    _getContractDataSearch() {
      this.queryInfo.pagenum = 1;
      this.queryInfo.pagesize = 20;
      this._getContractData();
    },
    // 获取合同列表数据
    _getContractData() {
      this.loading = true;
      if (this.ContractSignTime && this.ContractSignTime.length > 0) {
        this.BeginSignTime = this.$moment(this.ContractSignTime[0]).format("YYYY-MM-DD");
        this.EndSignTime = this.$moment(this.ContractSignTime[1]).format("YYYY-MM-DD");
      } else {
        this.BeginSignTime = '';
        this.EndSignTime = '';
      }
      if (this.BeginTime) { this.BeginTime = this.$moment(this.BeginTime).format("YYYY-MM-DD"); }
      if (this.EndTime) { this.EndTime = this.$moment(this.EndTime).format("YYYY-MM-DD"); }
      GetSupplierData(
        this.ContractCode,
        this.ContractName,
        this.ComName,
        this.ContractType,
        this.BeginTime,
        this.EndTime,
        this.BeginSignTime,
        this.EndSignTime,
        this.CreateUserId,
        this.AuditStatus,
        this.ArchivedType,
        this.SupplierCmpanyBCode,
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
    // 导出数据
    exportSupplier() {
      this.ExportLoading = true;
      this.isShowProgress = true;
      this.fakes.start();
      if (this.ContractSignTime && this.ContractSignTime.length > 0) {
        this.BeginSignTime = this.$moment(this.ContractSignTime[0]).format("YYYY-MM-DD");
        this.EndSignTime = this.$moment(this.ContractSignTime[1]).format("YYYY-MM-DD");
      } else {
        this.BeginSignTime = '';
        this.EndSignTime = '';
      }
      if (this.BeginTime) { this.BeginTime = this.$moment(this.BeginTime).format("YYYY-MM-DD"); }
      if (this.EndTime) { this.EndTime = this.$moment(this.EndTime).format("YYYY-MM-DD"); }
      GetSupplierDataExport(
        this.ContractCode,
        this.ContractName,
        this.ComName,
        this.ContractType,
        this.BeginSignTime,
        this.EndSignTime,
        this.CreateUserId,
        this.AuditStatus,
        this.BeginTime,
        this.EndTime,
        this.ArchivedType,
        this.SupplierCmpanyBCode,
      ).then((res) => {
        this.fakes.end();
        // 初始化进度条
        setTimeout(() => {
          this.fakes = new FakeProgress({
            timeConstant: 10000,
            autoStart: false
          });
          this.isShowProgress = false;
        }, 800)
        if (res.success) {
          window.location.href = res.result;
        } else {
          this.$message.error("导出失败！");
        }
        this.ExportLoading = false;
      });
    },
    // 编辑获取反填信息
    showEditDialog(item) {
      this.UploadServerFlagUpdate=false;
      this.updateSupplierFrom.Id = item.Id;
      this.updateSupplierFrom.ContractCode = item.ContractCode;
      this.updateSupplierFrom.ContractName = item.ContractName;
      this.updateSupplierFrom.CompanyId = parseInt(item.CompanyId);
      this.updateSupplierFrom.ContractType = item.ContractType;
      this.updateSupplierFrom.BeginTime = new Date(item.BeginTime);
      this.updateSupplierFrom.EndTime = new Date(item.EndTime);
      this.updateSupplierFrom.SupplierCmpanyBCode = item.SupplierCmpanyBCode;
      this.updateSupplierFrom.HandledBy = item.HandledBy;
      this.updateSupplierFrom.Remark = item.Remark;
      this.updateSupplierFrom.ArchivedType = item.ArchivedType;
      this.fileListUpload = [];

      this.updateDialogVisible = true;
      // 根据合同编号反填附件
      GetAttachmentFirst(3, item.Id).then((res) => {
        if (res.success) {
          this.updateSupplierFrom.FileLists = res.result;
          this.fullscreenLoading = false;
        } else {
          this.updateSupplierFrom.FileLists = [];
        }
      });
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

    // 获取乙方公司数据
    GetSupplierCmpanyB() {
      GetSupplierCmpanyB('', 1, 100000
      ).then((res) => {
        if (res.success) {
          this.SupplierCmpanyBList = res.result.list;
        } else {
          this.SupplierCmpanyBList = [];
        }
      });
    },
    // 查询是否有导出权限true 有 false没有
    IfExistsExportUserMethod() {
      IfExistsExportUser().then((res) => {
        if (res.success) { this.IfExistsExportUserFlag = true; } else { this.IfExistsExportUserFlag = false; }
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
    fixedShowMethod(newVal) {
      // 冻结列
      if (newVal < 768) {
        this.fixedLeftShow = false;
      } else {
        this.fixedLeftShow = true;
      }
      // 上方表单距下方间距
      if (newVal < 1200) {
        this.formShow = 'margin-bottom: 18px;';
      } else {
        this.formShow = 'margin-bottom: 0;';
      }
    },
    // 获取归档类型数据
    GetArchivedType() {
      GetDicCategory("ArchivedType").then((res) => {
        if (res.success) {
          this.ArchivedTypeList = res.result;
        } else {
          this.ArchivedTypeList = [];
        }
      });
    },
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

.timeClass {
  width: 100%;
}

.demonstration {
  font-size: small;
  margin-left: 10px;
}

.whereFormClass {
  margin-bottom: 15px;
  width: 100%;
}

.rangeTimeClass {
  width: 100%;
}

.CompanyClass {
  width: 60px;
  height: 40px;
  float: left
}

.CompanySelectClass {
  float: left;
  width: calc(100% - 60px)
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

.SecondPartyNameClass div {
  margin-bottom: 10px;
}

.button {
  margin-left: 1rem;
}
</style>

