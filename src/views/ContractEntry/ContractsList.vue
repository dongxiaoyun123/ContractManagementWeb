<template>
  <div style="padding: 8px;">
    <el-card>
      <el-form label-width="90px">
        <!-- 合同信息 -->
        <div slot="header" class="clearfix">
          <span>合同信息</span>
        </div>
        <el-row>
          <collapse>
            <div v-show="isActive">
              <el-row>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item class="whereFormClass" label="合同状态">
                    <el-select v-model="ConState" class="timeHalfClass" filterable placeholder="合同状态" clearable>
                      <el-option v-for="item in ConStateArray" :key="item.Code" :label="item.Name" :value="item.Code">
                        <template slot-scope="scope">
                          <div style="display: flex;  align-items: center;">
                            <span slot="reference" style="margin-right: 8px;">
                              <i v-if="item.Name == '正在执行'" class="dotClass" style="background-color: #1890ff" />
                              <!-- <i v-if="item.Name == '到期,未结款'" class="dotClass" style="background-color: #ffba00"></i> -->
                              <i v-if="item.Name == '已完结'" class="dotClass" style="background-color: #13ce66" />
                              <i v-if="item.Name == '未知'" class="dotClass" style="background-color: #ffba00" />
                            </span>
                            {{ item.Name }}
                          </div>
                        </template>
                      </el-option>
                    </el-select>
                    <el-date-picker v-model="ConMonth" class="timeHalfClass" format="yyyy-MM" type="month"
                      placeholder="选择月份" :clearable="false" />
                    <!-- <el-select class="timeClass" v-model="ConState" filterable placeholder="合同状态" clearable>
                      <el-option v-for="item in ConStateArray" :class="item.Class" :key="item.Code" :label="item.Name"
                        :value="item.Code">
                      </el-option>
                    </el-select> -->
                  </el-form-item>

                </el-col>
                <!-- <el-col :span="6">
              <el-form-item class="whereFormClass" label="合同编号">
                <el-input clearable="" placeholder="合同编号" v-model="ContractCode"></el-input>
              </el-form-item>
            </el-col> -->
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item class="whereFormClass" label="乙方名称">
                    <!-- <el-input clearable="" placeholder="合同名称" v-model="ContractName"></el-input> -->
                    <el-select v-model="SecondPartyName" class="timeClass" filterable placeholder="乙方名称" clearable="">
                      <el-option v-for="item in DicCategoryList" :key="item.Code" :label="item.Name" :value="item.Code" />
                    </el-select>
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
                  <!-- <el-form-item class="whereFormClass" label="签订时间">
                <el-date-picker class="rangeTimeClass" @input="datetimeChange" v-model="ContractSignTime"
                  type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                  :picker-options="pickerOptions" clearable="">
                </el-date-picker>
              </el-form-item> -->
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
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item label="审核状态">
                    <el-select v-model="AuditStatus" class="timeClass" filterable placeholder="审核状态" clearable>
                      <el-option v-for="item in AuditStatusList" :key="item.Code" :label="item.Name" :value="item.Code">
                        <el-tag v-if="item.Code == 1" :key="item.Code" type="danger">
                          {{ item.Name }}
                        </el-tag>
                        <el-tag v-if="item.Code == 2" :key="item.Code">
                          {{ item.Name }}
                        </el-tag>
                        <el-tag v-if="item.Code == 3" :key="item.Code" type="warning">
                          {{ item.Name }}
                        </el-tag>
                        <el-tag v-if="item.Code == 4" :key="item.Code" type="success">
                          {{ item.Name }}
                        </el-tag>
                        <el-tag v-if="item.Code == 5" :key="item.Code" type="info">
                          {{ item.Name }}
                        </el-tag>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item class="whereFormClass" label="审核时间">
                    <el-date-picker v-model="ExamineTime" style="width:100% ;" class="rangeTimeClass" type="daterange"
                      range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="pickerOptions"
                      clearable="" @input="datetimeChange" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                  <el-form-item class="whereFormClass" label="关联公司">
                    <el-input v-model="ConnectCompany" clearable="" placeholder="关联公司名称" />
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
              </el-row>
            </div>
          </collapse>
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="21" :xl="21">
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

                <el-dropdown trigger="click" style="margin-left: 0;" @command="(command) => {
                  handleButtonCommand(command);
                }
                  ">
                  <el-button type="primary">
                    更 多<i class="el-icon-arrow-down el-icon--right" />
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a" icon="el-icon-location-information">地 图 {{ "\xa0\xa0" }}
                    </el-dropdown-item>
                    <!-- <el-dropdown-item command="b" v-if="editButtonShow" icon="el-icon-edit">修 改 {{ "\xa0" }}
                    </el-dropdown-item> -->
                    <el-dropdown-item v-if="IfExistsExportUserFlag" command="c" icon="el-icon-download"
                      :loading="ExportLoading">导 出 {{ "\xa0\xa0" }}</el-dropdown-item>

                    <el-dropdown-item command="d" icon="el-icon-setting">表头设置 {{ "\xa0\xa0" }}
                    </el-dropdown-item>
                    <!-- <el-button  icon="el-icon-setting" @click="columnTitleSet">表头设置</el-button> -->
                  </el-dropdown-menu>
                </el-dropdown>
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
        :cell-style="showBackground" @selection-change="TableSelect" @row-click="toggleSelection">
        <!-- :row-class-name="tableRowClassName"
          :cell-style="InvoiceTypeStyle" -->
        <!-- @row-click="clickRow" ref="tableRef" -->
        <!-- <el-table-column type="index" label="#" small>
          </el-table-column> -->
        <el-table-column class="checkClass" v-if="fixedLeftShow" key="checked" type="selection" width="50" fixed="left" />
        <el-table-column v-else key="checkedFalse" type="selection" width="50" />
        <el-table-column v-if="ifSecondContractNumberPrefix && fixedLeftShow" key="SecondContractNumberPrefix"
          fixed="left" prop="SecondContractNumberPrefix" label="乙方合同编号" small width="160" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.SecondContractNumberPrefix }}</span>
            <el-button v-if="scope.row.SecondContractNumberPrefix" size="mini" style="padding:4px 0 4px 5px" type="text"
              icon="el-icon-document-copy" @click="SecondClick(scope.row.SecondContractNumberPrefix)"></el-button>
          </template>
        </el-table-column>
        <el-table-column v-else-if="ifSecondContractNumberPrefix && !fixedLeftShow" key="SecondContractNumberPrefixFalse"
          prop="SecondContractNumberPrefix" label="乙方合同编号" small width="160" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.SecondContractNumberPrefix }}</span>
            <el-button v-if="scope.row.SecondContractNumberPrefix" size="mini" style="padding:4px 0 4px 5px" type="text"
              icon="el-icon-document-copy" @click="SecondClick(scope.row.SecondContractNumberPrefix)"></el-button>
          </template>
        </el-table-column>
        <el-table-column v-if="ifAuditStatusName && fixedLeftShow" key="AuditStatusName" prop="AuditStatusName"
          label="审核状态" small min-width="120" fixed="left">
          <template slot-scope="{}" slot="header">
            <span>审核状态</span>
            <el-tooltip class="item" effect="light" placement="bottom" style="margin-left: 5px;margin-bottom: 0.2rem">
              <i class="el-icon-question" style="font-size: 14px; vertical-align: middle;"></i>
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
              <el-tag v-if="scope.row.AuditStatus == 1" :key="scope.$index + 'a' + scope.row.AuditStatus" type="danger"
                effect="plain">
                {{ scope.row.AuditStatusName }}
              </el-tag>
              <el-tag v-if="scope.row.AuditStatus == 2" :key="scope.$index + 'b' + scope.row.AuditStatus" effect="plain">
                {{ scope.row.AuditStatusName }}
              </el-tag>
              <el-tag v-if="scope.row.AuditStatus == 3" :key="scope.$index + 'c' + scope.row.AuditStatus" type="warning"
                effect="plain">
                {{ scope.row.AuditStatusName }}
              </el-tag>
              <el-tag v-if="scope.row.AuditStatus == 4" :key="scope.$index + 'd' + scope.row.AuditStatus" type="success"
                effect="plain">
                {{ scope.row.AuditStatusName }}
              </el-tag>
              <el-tag v-if="scope.row.AuditStatus == 5" :key="scope.$index + 'e' + scope.row.AuditStatus" type="info"
                effect="plain">
                {{ scope.row.AuditStatusName }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-else-if="ifAuditStatusName && !fixedLeftShow" key="AuditStatusNameFalse" prop="AuditStatusName"
          label="审核状态" small min-width="120">
          <template slot-scope="{}" slot="header">
            <span>审核状态</span>
            <el-tooltip class="item" effect="light" placement="bottom" style="margin-left: 5px;margin-bottom: 0.2rem">
              <i class="el-icon-question" style="font-size: 14px; vertical-align: middle;"></i>
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
              <el-tag v-if="scope.row.AuditStatus == 1" :key="scope.$index + 'a' + scope.row.AuditStatus" type="danger"
                effect="plain">
                {{ scope.row.AuditStatusName }}
              </el-tag>
              <el-tag v-if="scope.row.AuditStatus == 2" :key="scope.$index + 'b' + scope.row.AuditStatus" effect="plain">
                {{ scope.row.AuditStatusName }}
              </el-tag>
              <el-tag v-if="scope.row.AuditStatus == 3" :key="scope.$index + 'c' + scope.row.AuditStatus" type="warning"
                effect="plain">
                {{ scope.row.AuditStatusName }}
              </el-tag>
              <el-tag v-if="scope.row.AuditStatus == 4" :key="scope.$index + 'd' + scope.row.AuditStatus" type="success"
                effect="plain">
                {{ scope.row.AuditStatusName }}
              </el-tag>
              <el-tag v-if="scope.row.AuditStatus == 5" :key="scope.$index + 'e' + scope.row.AuditStatus" type="info"
                effect="plain">
                {{ scope.row.AuditStatusName }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="ifArchivedType" key="ArchivedType" prop="ArchivedType" label="合同归档" small min-width="90">
          <template slot-scope="{}" slot="header">
            <span>合同归档</span>
            <el-tooltip class="item" effect="light" placement="bottom" style="margin-left: 5px;margin-bottom: 0.2rem">
              <i class="el-icon-question" style="font-size: 14px; vertical-align: middle;"></i>
              <div slot="content">
                <div style="display: flex;  align-items: center;">
                  <span slot="reference" style="margin: 0 10px 0 6px;" class="SecondPartyNameClass">
                    <div>
                      <span style="border-color: #F7C695;color:#FA8C16">
                        待上传
                      </span>
                    </div>
                    <div>
                      <span  style="border-color: #A29BC4;color:#6959CD">
                        待归档
                      </span>
                    </div>
                    <div style="margin-bottom: 0;">
                      <span   style="border-color: #8BC6C6;color:#11A983">
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
        <!-- <el-table-column key="ContractNameStr" v-if="ifContractNameStr" prop="ContractNameStr" label="合同名称" small
          min-width="180" show-overflow-tooltip>
        </el-table-column> -->
        <el-table-column v-if="ifCompanyName" key="CompanyName" prop="CompanyName" label="公司名称" small min-width="250"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.CompanyRelationList.length != 0">
              <el-popover transition="companyNameTransition" placement="right" width="470" trigger="click"
                :title="scope.row.CompanyName + ' - 曾用名'">
                <el-table :data="scope.row.CompanyRelationList">
                  <el-table-column width="280" property="CompanyrelationName" label="曾用名" />
                  <el-table-column width="150" property="CreateTime" label="添加时间">
                    <template slot-scope="scope">
                      <i class="el-icon-time" />
                      <span style="margin-left: 6px">{{ dateFormat(scope.row.CreateTime) }}</span>
                    </template>
                  </el-table-column>
                </el-table>
                <el-button slot="reference" style="padding:4px 0 ;" type="text" size="mini">{{ scope.row.CompanyName
                }}</el-button>
                <!-- <el-link slot="reference">{{scope.row.CompanyName}}</el-link> -->
              </el-popover>
            </div>
            <div v-else>{{ scope.row.CompanyName }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="ifSecondPartyName" key="SecondPartyName" prop="SecondPartyName" label="乙方名称" small
          min-width="120" />
        <el-table-column v-if="ifName" key="Name" prop="Name" label="合同类型" small min-width="100" />
        <el-table-column v-if="ifConStateName" key="ConStateName" prop="ConStateName" label="合同状态" small min-width="100">
          <template slot-scope="{}" slot="header">
            <span>合同状态</span>
            <el-tooltip class="item" effect="light" placement="bottom" style="margin-left: 5px;margin-bottom: 0.2rem">
              <i class="el-icon-question" style="font-size: 14px; vertical-align: middle;"></i>
              <div slot="content">
                <div style="display: flex;  align-items: center;">
                  <span slot="reference" style="margin-right: 10px;" class="SecondPartyNameClass">
                    <div> <i class="dotClass" style="background-color: #1890ff" />{{ "\xa0\xa0" }}正在执行<br /></div>
                    <div><i class="dotClass" style="background-color: #13ce66" />{{ "\xa0\xa0" }}已完结<br /></div>
                    <div style="margin-bottom: 0;"> <i class="dotClass" style="background-color: #ffba00" />{{ "\xa0\xa0"
                    }}未知</div>
                  </span>
                </div>
              </div>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <div style="display: flex;  align-items: center;">
              <span slot="reference" style="margin-right: 8px;">
                <i v-if="scope.row.ConStateName == '正在执行'" class="dotClass" style="background-color: #1890ff" />
                <!-- <i v-if="scope.row.ConStateName == '到期,未结款'" class="dotClass" style="background-color: #ffba00"></i> -->
                <i v-if="scope.row.ConStateName == '已完结'" class="dotClass" style="background-color: #13ce66" />
                <i v-if="scope.row.ConStateName == '未知'" class="dotClass" style="background-color: #ffba00" />
              </span>
              {{ scope.row.ConStateName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="ifParentContractCode" key="ParentContractCode" prop="ParentContractCode" label="有无关联合同"
          small min-width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.ParentContractCode">
              有
            </div>
            <div v-else>
              无
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="ifBeginTimeString" key="BeginTimeString" prop="BeginTimeString" label="开始时间" small
          min-width="115" sortable>
          <template slot-scope="scope">
            <div v-if="scope.row.BeginTimeString">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.BeginTimeString }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="ifEndTimeString" key="EndTimeString" prop="EndTimeString" label="结束时间" small
          min-width="115" sortable>
          <template slot-scope="scope">
            <div v-if="scope.row.EndTimeString">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.EndTimeString }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="ifPercentage" key="Percentage" prop="Percentage" label="提成占比(%)" small min-width="95">
          <!-- <template slot-scope="scope">
              <el-progress :percentage="scope.row.Percentage" :color="customColors"></el-progress>
            </template> -->
        </el-table-column>
        <el-table-column v-if="ifSaleName" key="SaleName" prop="SaleName" label="销售人员" small min-width="150"
          show-overflow-tooltip />
        <!-- <el-table-column v-if="ifUnitPrice" key="UnitPrice" prop="UnitPrice" label="单价" small width="100"
          show-overflow-tooltip />
        <el-table-column v-if="ifQuantity" key="Quantity" prop="Quantity" label="数量" small width="100"
          show-overflow-tooltip /> -->
        <el-table-column v-if="ifPaymentMethodString" key="PaymentMethodString" prop="PaymentMethodString" label="缴费方式"
          small width="100" show-overflow-tooltip />
        <el-table-column v-if="ifContractAmount" key="ContractAmount" prop="ContractAmount" label="合同金额" min-width="100"
          sortable="">
          <template slot-scope="scope">
            <span v-format="'¥#,##0.00'">{{ scope.row.ContractAmount }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="SignTimeString" label="签订时间" small min-width="100"></el-table-column> -->
        <el-table-column v-if="ifFirstPartyName" key="FirstPartyName" prop="FirstPartyName" label="甲方名称" small
          min-width="250" show-overflow-tooltip />
        <el-table-column v-if="ifCreateUserName" key="CreateUserName" prop="CreateUserName" label="添加人" small
          min-width="100" />
        <el-table-column v-if="ifCreationTimeString" key="CreationTimeString" prop="CreationTimeString" label="添加时间" small
          min-width="180" sortable>
          <template slot-scope="scope">
            <div v-if="scope.row.CreationTimeString">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.CreationTimeString }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="ifSubmitCensorshipTimeStr" key="SubmitCensorshipTimeStr" prop="SubmitCensorshipTimeStr"
          label="送审时间" small min-width="180" sortable>
          <template slot-scope="scope">
            <div v-if="scope.row.SubmitCensorshipTimeStr">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.SubmitCensorshipTimeStr }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="ifExamineTimeStr" key="ExamineTimeStr" prop="ExamineTimeStr" label="审核时间" small
          min-width="180" sortable>
          <template slot-scope="scope">
            <div v-if="scope.row.ExamineTimeStr">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.ExamineTimeStr }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="fixedLeftShow" key="operation" label="操作" small width="170" fixed="right">
          <template slot-scope="scope" class="tableRowClass">
            <!-- <el-button
                type="text"
                @click="showDetailDialog(scope.row)"
                >详情</el-button
              > -->
            <el-button-group>
              <el-button icon="el-icon-edit" type="text" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
              <el-dropdown trigger="click" @command="(command) => {
                handleCommand(command, scope.row);
              }
                ">
                <el-button type="text" size="mini">
                  更多操作<i class="el-icon-arrow-down el-icon--right" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <!-- <el-dropdown-item command="a" icon="el-icon-office-building">关联公司
                  </el-dropdown-item> -->
                  <el-dropdown-item command="b" icon="el-icon-user">关联销售{{ "\xa0\xa0" }}</el-dropdown-item>
                  <el-dropdown-item command="c" icon="el-icon-service">关联客服{{ "\xa0\xa0" }}</el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.AuditStatus == 1" command="d" icon="el-icon-delete">删除{{ "\xa0\xa0" }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-button-group>
          </template>
        </el-table-column>
        <el-table-column v-else key="operationFalse" label="操作" small width="170">
          <template slot-scope="scope" class="tableRowClass">
            <!-- <el-button
                type="text"
                @click="showDetailDialog(scope.row)"
                >详情</el-button
              > -->
            <el-button-group>
              <el-button icon="el-icon-edit" type="text" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
              <el-dropdown trigger="click" @command="(command) => {
                handleCommand(command, scope.row);
              }
                ">
                <el-button type="text" size="mini">
                  更多操作<i class="el-icon-arrow-down el-icon--right" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a" icon="el-icon-office-building">关联公司
                  </el-dropdown-item>
                  <el-dropdown-item command="b" icon="el-icon-user">关联销售</el-dropdown-item>
                  <el-dropdown-item command="c" icon="el-icon-service">关联客服</el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.AuditStatus == 1" command="d" icon="el-icon-delete">删除
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination background size="mini" :current-page="queryInfo.pagenum" :page-sizes="[20, 50, 100]"
        :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-card>

    <!-- 添加合同弹出页面 -->
    <el-dialog :visible.sync="detailAddDialogVisible" top="5vh" width="65%" :lock-scroll="false" :append-to-body="true"
      @close="detailAddDialogVisibleClosed">
      <!-- 上面两个属性用来重置滚动条 -->
      <div slot="title" class="dialog-title">
        <span>添加合同</span>
      </div>
      <el-form ref="addContractsRef" :model="addContractsForm" :rules="addContractsRules" label-width="120px"
        class="formClass">
        <!-- 合同信息 -->
        <el-card>
          <div slot="header" class="clearfix">
            <span>合同信息</span>
          </div>
          <el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="合同名称" prop="ContractName">
                  <el-select v-model="addContractsForm.ContractName" class="CompanySelectClassCopy" filterable
                    placeholder="合同名称" clearable="">
                    <el-option v-for="item in ContractNameconfigList" :key="item.ContractCode" :label="item.ContractName"
                      :value="item.ContractCode" />
                  </el-select>
                  <div>
                    <el-tooltip class="item" effect="dark" content="复制历史合同信息" placement="top-start">
                      <el-button style="margin-left:10px ;font-size:15px" type="text" icon="el-icon-document-copy"
                        @click="CopyContractName" />
                    </el-tooltip>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="公司名称" prop="CompanyId">
                  <el-select v-model="addContractsForm.CompanyId" class="CompanySelectClass" filterable
                    placeholder="输入公司名称远程搜索" clearable="" remote reserve-keyword :remote-method="remoteMethod"
                    @visible-change="clearselectCorporationDatas" @change="changeCompanyId">
                    <el-option v-for="item in selectCorporationDatas" :key="item.value" :label="item.label"
                      :value="item.value" />
                  </el-select>
                  <div>
                    <el-tooltip class="item" effect="dark" content="添加公司" placement="top-start">
                      <el-button style="margin-left:10px ;font-size:15px" type="text" icon="el-icon-circle-plus-outline"
                        @click="AddDialog" />
                    </el-tooltip>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="合同类型" prop="ContractType">
                  <el-select v-model="addContractsForm.ContractType" filterable placeholder="合同类型" clearable="">
                    <el-option v-for="item in GetContractTypeArray" :key="item.Code" :label="item.Name"
                      :value="item.Code" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="甲方合同编号" prop="ContractCode" class="scrollClass">
                  <el-input v-model="addContractsForm.ContractCode" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="主合同" prop="ParentContractCode">
                  <el-select v-model="addContractsForm.ParentContractCode" style="width:100% ;" filterable
                    placeholder="合同类型 - 公司名称 - 合同期" clearable="" remote reserve-keyword
                    :remote-method="remoteMethodParent" @visible-change="clearselectCorporationDatasParent">
                    <el-option v-for="item in selectCorporationDatasParent" :key="item.value" :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="付款方">
                  <el-tag  :closable="addContractsForm.CompanyId + '' != item.Code + ''" @close="handleClose(item.Code)"
                    v-for="item in PayerArray" :key="item.Code" style="margin-right: 18px;"
                    :type="item.Type">{{ item.Name }}</el-tag>
                    <el-divider v-if="PayerArray.length!=0" />
                  <el-button plain  size="mini" @click="showCollectionDialog(true)"> + 关联付款方</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
        </el-card>
        <!-- 合同明细 -->
        <el-card style="margin-top: 20px">
          <div slot="header" class="clearfix">
            <span>合同明细</span>
          </div>
          <el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item ref="BeginTime" label="开始日期" prop="BeginTime">
                  <el-date-picker v-model="addContractsForm.BeginTime" type="date" placeholder="选择日期" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="结束日期" prop="EndTime">
                  <el-date-picker v-model="addContractsForm.EndTime" type="date" placeholder="结束日期" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="实际开始日期" prop="ActualBeginTime">
                  <el-date-picker v-model="addContractsForm.ActualBeginTime" type="date" placeholder="结束日期" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="实际结束日期" prop="ActualEndTime">
                  <el-date-picker v-model="addContractsForm.ActualEndTime" type="date" placeholder="结束日期" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="利润率" prop="ProfitMargin">
                  <el-input v-model="addContractsForm.ProfitMargin" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="提成占比" prop="Percentage">
                  <!-- <el-slider size="mini" v-model="addContractsForm.Percentage" show-input>
                  </el-slider> -->
                  <el-input v-model="addContractsForm.Percentage">
                    <template slot="append">%</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item style="margin-bottom:0 ;" label="销售人员" prop="SaleId">
                  <el-select v-model="addContractsForm.SaleId" filterable placeholder="销售人员" clearable="">
                    <el-option v-for="item in UserList" :key="item.UserID" :label="item.UserName" :value="item.UserID" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item style="margin-bottom:0 ;" label="签订时间" prop="SignTime">
                  <el-date-picker v-model="addContractsForm.SignTime" type="date" placeholder="签订时间" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-divider />

            <!-- 动态增减表单项 -->
            <el-row v-for="(domain, index) in addContractsForm.domains">
              <el-col style="width:35px">
                <el-form-item v-if="addContractsForm.domains.length>1 && index==0" label-width="0">
                  <span style="font-size:14px; font-weight:500;display: block;text-align: right;">（（</span>
                </el-form-item>
                <el-form-item v-else label-width="0">
                  <span style="font-size:14px; font-weight:500;display: block;text-align: right;">（</span>
                </el-form-item>
              </el-col>
                <el-col :span="5">
                  <el-form-item label-width="85px" :key="domain.key" :label="'单价' + (index + 1)" :prop="'domains.' + index + '.UnitPrice'"
                    :rules="{
                      required: true,
                      message: '合同单价不能为空',
                      trigger: 'blur',
                    }">
                    <el-input v-model="domain.UnitPrice" clearable @input="handleChangeAdd" />
                  </el-form-item>
                </el-col>
                <el-col :span="1">
                  <el-form-item label-width="0">
                    <span style="font-size:18px; font-weight:500;display: block;text-align: center;">×</span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label-width="85px" :key="domain.key" :label="'数量' + (index + 1)" :prop="'domains.' + index + '.Quantity'"
                    :rules="{
                      required: true,
                      message: '合同数量不能为空',
                      trigger: 'blur',
                    }">
                    <el-input v-model="domain.Quantity" clearable @input="handleChangeAdd" />
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="备注" prop="Remark" label-width="85px">
                    <el-input v-model="domain.Remark" />
                  </el-form-item>
                </el-col>
                <el-col :span="1" style="line-height:100% ;text-align:center">
                  <el-button style="margin-left:10px ;font-size:14px" type="text" icon="el-icon-delete"
                    @click.prevent="removeDomain(domain)" />
                </el-col>
                <el-col :span="1">
                  <el-form-item v-if="addContractsForm.domains.length>1 && index==addContractsForm.domains.length-1" label-width="0">
                    <span style="font-size:14px; font-weight:500;display: block;text-align: left;">））</span>
                  </el-form-item>
                  <el-form-item v-else label-width="0">
                    <span style="font-size:14px; font-weight:500;display: block;text-align: left;">）</span>
                  </el-form-item>
                </el-col>
                <el-col :span="1">
                <el-form-item label-width="0" v-if="addContractsForm.domains.length-1!=index">
                  <span style="font-size:14px; font-weight:500;display: block;text-align: left;">+</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item >
              <el-button size="mini" icon="el-icon-plus" class="addItemClass" @click="addDomain">新增条目</el-button>
            </el-form-item>
            <el-row>
              <el-col style="width:35px;">
                <el-form-item label-width="0">
                  <span style="font-size:14px; font-weight:500;display: block;text-align: right;">×</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="缴费方式" prop="PaymentMethod" label-width="85px">
                  <el-select v-model="addContractsForm.PaymentMethod" filterable placeholder="缴费方式" clearable=""
                    @change="handleChangeAdd">
                    <el-option v-for="item in PaymentMethodList" :key="item.Code" :label="item.Name + ' ' + item.Fee"
                      :value="item.Code">
                      <span style="float: left">{{ item.Name }}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.Fee }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-form-item label-width="0">
                  <span style="font-size:15px; font-weight:500;display: block;text-align: center;"> = </span>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="合同金额" prop="ContractAmount" label-width="85px">
                  <el-input v-model="addContractsForm.ContractAmount"><template slot="append">/年</template></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label-width="120px">
                  <el-tag effect="plain"  type="">（（合同单价 x 合同数量）+...）x 缴费方式（年缴 x 1、月缴 x 12
                    、次缴 x 1、半年缴 x 2、季缴 x 4） = 合同金额 </el-tag>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label-width="120px">
                  <el-tag effect="plain"  type="">如果单价中有一项或者多项为保留四位小数，那么合同金额（参与计算）只保留前两位小数（不进行四舍五入）</el-tag>
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
        </el-card>
        <!-- 合同主体 -->
        <el-card style="margin-top: 20px">
          <div slot="header" class="clearfix">
            <span>合同主体</span>
          </div>
          <!-- 甲方信息 -->
          <el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="甲方名称" prop="FirstPartyName">
                  <el-input v-model="addContractsForm.FirstPartyName" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="甲方地址" prop="FirstPartyAddress">
                  <el-input v-model="addContractsForm.FirstPartyAddress" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="甲方联系人" prop="FirstPartyContacts">
                  <el-input v-model="addContractsForm.FirstPartyContacts" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="甲方联系电话" prop="FirstPartyPhone">
                  <el-input v-model="addContractsForm.FirstPartyPhone" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="甲方工作邮箱" prop="FirstPartyEmail">
                  <el-input v-model="addContractsForm.FirstPartyEmail" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="甲方开户行" prop="FirstPartyBank">
                  <el-input v-model="addContractsForm.FirstPartyBank" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="甲方银行账号" prop="FirstPartyBankNum">
                  <el-input v-model="addContractsForm.FirstPartyBankNum" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
          <el-divider />
          <!-- 乙方信息 -->
          <el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="乙方名称" prop="SecondPartyName">
                  <el-select v-model="addContractsForm.SecondPartyName" filterable placeholder="乙方名称" clearable="">
                    <el-option v-for="item in DicCategoryList" :key="item.Code" :label="item.Name" :value="item.Code" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="乙方地址" prop="SecondPartyAddress">
                  <el-input v-model="addContractsForm.SecondPartyAddress" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="乙方联系人" prop="SecondPartyContacts">
                  <el-input v-model="addContractsForm.SecondPartyContacts" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="乙方联系电话" prop="SecondPartyPhone">
                  <el-input v-model="addContractsForm.SecondPartyPhone" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="乙方工作邮箱" prop="SecondPartyEmail">
                  <el-input v-model="addContractsForm.SecondPartyEmail" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="乙方开户行" prop="SecondPartyBank">
                  <el-input v-model="addContractsForm.SecondPartyBank" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="乙方银行账号" prop="SecondPartyBankNum">
                  <el-input v-model="addContractsForm.SecondPartyBankNum" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
          <el-divider />
          <!-- 丙方信息 -->
          <el-row>
            <!-- <el-row>
              <el-col :span="12">
                <el-form-item label="丙方名称" prop="ThirdPartyName">
                  <el-input v-model="addContractsForm.ThirdPartyName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="丙方地址" prop="ThirdPartyAddress">
                  <el-input v-model="addContractsForm.ThirdPartyAddress"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="丙方联系人" prop="ThirdPartyContacts">
                  <el-input v-model="addContractsForm.ThirdPartyContacts"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="丙方联系电话" prop="ThirdPartyPhone">
                  <el-input v-model="addContractsForm.ThirdPartyPhone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="丙方工作邮箱" prop="ThirdPartyEmail">
                  <el-input v-model="addContractsForm.ThirdPartyEmail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="丙方开户行" prop="ThirdPartyBank">
                  <el-input v-model="addContractsForm.ThirdPartyBank"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="丙方银行账号" prop="ThirdPartyBankNum">
                  <el-input v-model="addContractsForm.ThirdPartyBankNum"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-divider></el-divider> -->
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注" prop="Remark">
                  <el-input v-model="addContractsForm.Remark" type="textarea" :rows="5" maxlength="500" />
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
                    <el-button size="mini" plain slot="trigger" type="primary">选取文件</el-button>
                    <el-button size="mini" plain style="margin-left: 10px;margin-bottom: 7px;" type="success" :loading="uploadServerLoading"
                      @click="submitUpload">上传到服务器</el-button>
                    <h3 style="margin:14px 0 10px 0 ;">注：合同或协议{{ "\xa0\xa0" }}<span
                        style="color:#ff4949 ;">双方盖章完成后</span>{{ "\xa0\xa0" }}，请上传电子版扫描件
                    </h3>
                    <div slot="tip" class="uploadClass">只能上传文档和图片格式文件，且不超过<span style="color:#ff4949 ;">20M</span>
                    </div>
                    <div slot="tip" class="uploadClass">可一次选取多个文件，上传完成请点击上传到服务器，否则文档不能保存。</div>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
        </el-card>
      </el-form>
      <el-divider />
      <el-row class="buttonCenter">
        <el-col>
          <el-button type="primary" :loading="LoadingAdd || uploadServerLoading" @click="addContracts">保 存</el-button>
          <el-button type="info" @click="detailAddDialogVisibleClosed">重 置</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog :visible.sync="detailDialogVisible" top="5vh" width="60%">
      <div slot="title" class="dialog-title">
        <span>合同详情</span>
      </div>
      <el-descriptions class="margin-top" :column="2" border>
        <el-descriptions-item label="合同编号">{{
          detailFrom.ContractCode
        }}</el-descriptions-item>
        <el-descriptions-item label="合同名称">{{
          detailFrom.ContractName
        }}</el-descriptions-item>
        <el-descriptions-item label="合同类型">{{
          detailFrom.Name
        }}</el-descriptions-item>
        <el-descriptions-item label="公司名称">{{
          detailFrom.CompanyName
        }}</el-descriptions-item>
        <el-descriptions-item label="开始时间">{{
          detailFrom.BeginTimeString
        }}</el-descriptions-item>
        <el-descriptions-item label="结束时间">{{
          detailFrom.EndTimeString
        }}</el-descriptions-item>

        <el-descriptions-item label="合同金额">{{
          detailFrom.ContractAmountString
        }}</el-descriptions-item>
        <el-descriptions-item label="签订时间">{{
          detailFrom.SignTimeString
        }}</el-descriptions-item>

        <el-descriptions-item label="利润率">{{
          detailFrom.ProfitMarginString
        }}</el-descriptions-item>
        <el-descriptions-item label="提成占比">{{
          detailFrom.Percentage
        }}</el-descriptions-item>

        <el-descriptions-item label="支付方式">{{
          detailFrom.PaymentMethodString
        }}</el-descriptions-item>
        <el-descriptions-item label="销售人员">{{
          detailFrom.UserName
        }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
    <el-dialog :visible.sync="updateDialogVisible" top="5vh" :append-to-body="true" width="65%"
      @close="detailUpdateDialogVisibleClosed">
      <div slot="title" class="dialog-title">
        <span>编辑合同</span>
      </div>
      <el-form ref="updateContractsRef" v-loading="fullscreenLoading" :model="updateDepFrom" :rules="updateContractsRules"
        label-width="120px" class="formClass">
        <!-- 合同信息 -->
        <el-card>
          <div slot="header" class="clearfix">
            <span>合同信息</span>
          </div>
          <el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="乙方合同编号" prop="SecondContractNumberPrefix">
                  <el-input v-model="updateDepFrom.SecondContractNumberPrefix" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label-width="0">
                  <el-tag effect="plain" style="margin-left:20px ;" type="success">合同打印用此编号</el-tag>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="合同名称" prop="ContractName">
                  <el-select v-model="updateDepFrom.ContractName" filterable placeholder="合同名称" clearable=""
                    :disabled="updateShowFlag">
                    <el-option v-for="item in ContractNameconfigList" :key="item.ContractCode" :label="item.ContractName"
                      :value="item.ContractCode" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="公司名称" prop="CompanyId">
                  <el-select v-model="updateDepFrom.CompanyId" class="CompanySelectClass" filterable
                    placeholder="输入公司名称远程搜索" clearable="" remote reserve-keyword :remote-method="remoteMethod"
                    :disabled="updateShowFlag" @visible-change="clearselectCorporationDatas"
                    @change="changeCompanyIdUpdate">
                    <el-option v-for="item in selectCorporationDatas" :key="item.value" :label="item.label"
                      :value="item.value" />
                  </el-select>
                  <div>
                    <el-tooltip class="item" effect="dark" content="添加公司" placement="top-start">
                      <el-button title="添加公司" style="margin-left:10px ;font-size:15px" type="text"
                        icon="el-icon-circle-plus-outline" @click="AddDialog" />
                    </el-tooltip>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="合同类型" prop="ContractType">
                  <el-select v-model="updateDepFrom.ContractType" filterable placeholder="合同类型" clearable=""
                    :disabled="updateShowFlag">
                    <el-option v-for="item in GetContractTypeArray" :key="item.Code" :label="item.Name"
                      :value="item.Code" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="甲方合同编号" prop="ContractCode" class="scrollClass">
                  <el-input v-model="updateDepFrom.ContractCode" :disabled="updateShowFlag" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="主合同" prop="ParentContractCode">
                  <el-select v-model="updateDepFrom.ParentContractCode" style="width:100% ;" filterable
                    placeholder="合同类型 - 公司名称 - 合同期" clearable="" remote reserve-keyword
                    :remote-method="remoteMethodParent" :disabled="updateShowFlag"
                    @visible-change="clearselectCorporationDatasParent">
                    <el-option v-for="item in selectCorporationDatasParent" :key="item.value" :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="年签批次" prop="YearBatch">
                  第 <el-input-number v-model="updateDepFrom.YearBatch" controls-position="right" :min="1"
                    :disabled="updateShowFlag"></el-input-number> 年签
                  {{ "\xa0\xa0" }}<el-tag effect="plain" type="warning">为空默认设置1</el-tag>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="CompanyRelationList.length != 0">
              <el-col :span="24">
                <el-form-item label="曾用名">
                  <el-row>
                    <el-col v-for="item in CompanyRelationList" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
                      <el-tag type="primary">
                        {{ item.CompanyrelationName }}
                      </el-tag>
                    </el-col>
                  </el-row>

                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="付款方">
                  <el-tag :closable="updateDepFrom.CompanyId + '' != item.Code + ''" @close="handleClose(item.Code)"
                    v-for="item in PayerArray" :key="item.Code" style="margin-right: 18px;"
                    :type="item.Type">{{ item.Name }}</el-tag>
                    <el-divider />
                  <el-button plain  size="mini" @click="showCollectionDialog(false)" :disabled="updateShowFlag"> +
                    关联付款方</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
        </el-card>
        <!-- 合同明细 -->
        <el-card style="margin-top: 20px">
          <div slot="header" class="clearfix">
            <span>合同明细</span>
          </div>
          <el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item ref="BeginTime" label="开始日期" prop="BeginTime">
                  <el-date-picker v-model="updateDepFrom.BeginTime" type="date" placeholder="选择日期"
                    :disabled="updateShowFlag" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="结束日期" prop="EndTime">
                  <el-date-picker v-model="updateDepFrom.EndTime" type="date" placeholder="结束日期"
                    :disabled="updateShowFlag" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="实际开始日期" prop="ActualBeginTime">
                  <el-date-picker v-model="updateDepFrom.ActualBeginTime" type="date" placeholder="结束日期"
                    :disabled="updateShowFlag" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="实际结束日期" prop="ActualEndTime">
                  <el-date-picker v-model="updateDepFrom.ActualEndTime" type="date" placeholder="结束日期"
                    :disabled="updateShowFlag" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="利润率" prop="ProfitMargin">
                  <el-input v-model="updateDepFrom.ProfitMargin" :disabled="updateShowFlag" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="提成占比" prop="Percentage">
                  <el-input v-model="updateDepFrom.Percentage" :disabled="updateShowFlag"> <template
                      slot="append">%</template>
                  </el-input>

                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="销售人员" prop="SaleId">
                  <el-select v-model="updateDepFrom.SaleId" filterable placeholder="销售人员" clearable=""
                    :disabled="updateShowFlag">
                    <el-option v-for="item in UserList" :key="item.UserID" :label="item.UserName" :value="item.UserID" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="签订时间" prop="SignTime">
                  <el-date-picker v-model="updateDepFrom.SignTime" type="date" placeholder="签订时间"
                    :disabled="updateShowFlag" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-divider />
            <!-- 动态增减表单项 -->
            <el-row v-for="(domain, index) in updateDepFrom.domains">
              <el-col style="width:35px">
                <el-form-item v-if="updateDepFrom.domains.length>1 && index==0" label-width="0">
                  <span style="font-size:14px; font-weight:500;display: block;text-align: right;">（（</span>
                </el-form-item>
                <el-form-item v-else label-width="0">
                  <span style="font-size:14px; font-weight:500;display: block;text-align: right;">（</span>
                </el-form-item>
              </el-col>
                <el-col :span="5">
                  <el-form-item label-width="85px" :key="domain.key" :label="'单价' + (index + 1)" :prop="'domains.' + index + '.UnitPrice'"
                    :rules="{
                      required: true,
                      message: '合同单价不能为空',
                      trigger: 'blur',
                    }">
                    <el-input v-model="domain.UnitPrice" clearable @input="handleChangeUpt" :disabled="UnitPriceFlag" />
                  </el-form-item>
                </el-col>
                <el-col :span="1">
                  <el-form-item label-width="0">
                    <span style="font-size:18px; font-weight:500;display: block;text-align: center;">×</span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label-width="85px" :key="domain.key" :label="'数量' + (index + 1)" :prop="'domains.' + index + '.Quantity'"
                    :rules="{
                      required: true,
                      message: '合同数量不能为空',
                      trigger: 'blur',
                    }">
                    <el-input v-model="domain.Quantity" clearable @input="handleChangeUpt" :disabled="UnitPriceFlag" />
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label-width="85px" label="备注" prop="Remark">
                    <el-input v-model="domain.Remark" :disabled="UnitPriceFlag" />
                  </el-form-item>
                </el-col>
                <el-col :span="1" style="line-height:100% ;text-align:center">
                  <el-button style="margin-left:10px ;font-size:14px" type="text" icon="el-icon-delete"
                    @click.prevent="removeDomainUpt(domain)" :disabled="UnitPriceFlag" />
                </el-col>
                <el-col :span="1">
                  <el-form-item v-if="updateDepFrom.domains.length>1 && index==updateDepFrom.domains.length-1" label-width="0">
                    <span style="font-size:14px; font-weight:500;display: block;text-align: left;">））</span>
                  </el-form-item>
                  <el-form-item v-else label-width="0">
                    <span style="font-size:14px; font-weight:500;display: block;text-align: left;">）</span>
                  </el-form-item>
                </el-col>
                <el-col :span="1">
                <el-form-item label-width="0" v-if="updateDepFrom.domains.length-1!=index">
                  <span style="font-size:14px; font-weight:500;display: block;text-align: left;">+</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button size="mini" icon="el-icon-plus" class="addItemClass" @click="addDomainUpt"
                :disabled="UnitPriceFlag">新增条目</el-button>
            </el-form-item>
            <el-row>
              <el-col style="width:35px;">
                <el-form-item label-width="0">
                  <span style="font-size:14px; font-weight:500;display: block;text-align: right;">×</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label-width="85px" label="缴费方式" prop="PaymentMethod">
                  <el-select v-model="updateDepFrom.PaymentMethod" filterable placeholder="缴费方式" clearable=""
                    :disabled="updateShowFlag" @change="handleChangeUpt">
                    <el-option v-for="item in PaymentMethodList" :key="item.Code" :label="item.Name + ' ' + item.Fee"
                      :value="item.Code">
                      <span style="float: left">{{ item.Name }}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.Fee }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-form-item label-width="0">
                  <span style="font-size:15px; font-weight:500;display: block;text-align: center;"> = </span>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label-width="85px" label="合同金额" prop="ContractAmount">
                  <el-input v-model="updateDepFrom.ContractAmount" :disabled="updateShowFlag">
                    <template slot="append">/年</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label-width="120px">
                  <el-tag effect="plain"  type="">（（合同单价 x 合同数量）+...）x 缴费方式（年缴 x 1、月缴 x 12
                    、次缴 x 1、半年缴 x 2、季缴 x 4） = 合同金额 </el-tag>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label-width="120px">
                  <el-tag effect="plain"  type="">如果单价中有一项或者多项为保留四位小数，那么合同金额（参与计算）只保留前两位小数（不进行四舍五入）</el-tag>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="金额备注" prop="ContractAmountDetail">
                  <el-input v-model="updateDepFrom.ContractAmountDetail" type="textarea" :rows="5" maxlength="500"
                    :disabled="UnitPriceFlag" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
        </el-card>
        <!-- 合同主体 -->
        <el-card style="margin-top: 20px">
          <div slot="header" class="clearfix">
            <span>合同主体</span>
          </div>
          <!-- 甲方信息 -->
          <el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="甲方名称" prop="FirstPartyName">
                  <el-input v-model="updateDepFrom.FirstPartyName" :disabled="ConCompany" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="甲方地址" prop="FirstPartyAddress">
                  <el-input v-model="updateDepFrom.FirstPartyAddress" :disabled="updateShowFlag" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="甲方联系人" prop="FirstPartyContacts">
                  <el-input v-model="updateDepFrom.FirstPartyContacts" :disabled="updateShowFlag" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="甲方联系电话" prop="FirstPartyPhone">
                  <el-input v-model="updateDepFrom.FirstPartyPhone" :disabled="updateShowFlag" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="甲方工作邮箱" prop="FirstPartyEmail">
                  <el-input v-model="updateDepFrom.FirstPartyEmail" :disabled="updateShowFlag" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="甲方开户行" prop="FirstPartyBank">
                  <el-input v-model="updateDepFrom.FirstPartyBank" :disabled="updateShowFlag" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="甲方银行账号" prop="FirstPartyBankNum">
                  <el-input v-model="updateDepFrom.FirstPartyBankNum" :disabled="updateShowFlag" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
          <el-divider />
          <!-- 乙方信息 -->
          <el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="乙方名称" prop="SecondPartyName">
                  <el-select v-model="updateDepFrom.SecondPartyName" filterable placeholder="乙方名称" clearable=""
                    :disabled="ConCompany">
                    <el-option v-for="item in DicCategoryList" :key="item.Code" :label="item.Name" :value="item.Code" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="乙方地址" prop="SecondPartyAddress">
                  <el-input v-model="updateDepFrom.SecondPartyAddress" :disabled="updateShowFlag" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="乙方联系人" prop="SecondPartyContacts">
                  <el-input v-model="updateDepFrom.SecondPartyContacts" :disabled="updateShowFlag" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="乙方联系电话" prop="SecondPartyPhone">
                  <el-input v-model="updateDepFrom.SecondPartyPhone" :disabled="updateShowFlag" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="乙方工作邮箱" prop="SecondPartyEmail">
                  <el-input v-model="updateDepFrom.SecondPartyEmail" :disabled="updateShowFlag" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="乙方开户行" prop="SecondPartyBank">
                  <el-input v-model="updateDepFrom.SecondPartyBank" :disabled="updateShowFlag" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="乙方银行账号" prop="SecondPartyBankNum">
                  <el-input v-model="updateDepFrom.SecondPartyBankNum" :disabled="updateShowFlag" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
          <el-divider />
          <!-- 丙方信息 -->
          <el-row>
            <!-- <el-row>
              <el-col :span="12">
                <el-form-item label="丙方名称" prop="ThirdPartyName">
                  <el-input v-model="updateDepFrom.ThirdPartyName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="丙方地址" prop="ThirdPartyAddress">
                  <el-input v-model="updateDepFrom.ThirdPartyAddress"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="丙方联系人" prop="ThirdPartyContacts">
                  <el-input v-model="updateDepFrom.ThirdPartyContacts"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="丙方联系电话" prop="ThirdPartyPhone">
                  <el-input v-model="updateDepFrom.ThirdPartyPhone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="丙方工作邮箱" prop="ThirdPartyEmail">
                  <el-input v-model="updateDepFrom.ThirdPartyEmail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="丙方开户行" prop="ThirdPartyBank">
                  <el-input v-model="updateDepFrom.ThirdPartyBank"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="丙方银行账号" prop="ThirdPartyBankNum">
                  <el-input v-model="updateDepFrom.ThirdPartyBankNum"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-divider></el-divider> -->
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注" prop="Remark">
                  <el-input v-model="updateDepFrom.Remark" type="textarea" :rows="5" maxlength="500" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="已上传文件">
                  <el-button size="mini" style="margin-bottom:13px" plain v-if="updateDepFrom.ArchivedType == 2" :loading="placeFileLoading" type="warning"
                    @click="placeFile">归档</el-button>
                  <div class="bottom clearfix" v-for="item in updateDepFrom.FileLists">
                    <!-- <el-link type="primary" class="time" :href="item.url" target="_blank">{{ item.name }}
                    </el-link> -->
                    {{ item.name }}
                    <el-button type="text" class="button" @click="clickView(item)">在线预览</el-button>
                    <el-button type="text" class="button" @click="downView(item)">下载</el-button>
                  </div>
                  <!-- <el-upload ref="upload" class="upload-demo" action="" :headers="header" multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png,.gif,.bmp,.ppt,.pptx,.rtf,.txt"
                    :before-remove="beforeRemove" :on-remove="handleRemove" :file-list="updateDepFrom.FileLists"
                    :on-preview="AttachmentCodePreview">
                    <div slot="tip" class="uploadClass">之前上传的文件，可对其进行删除操作（执行确定会立马删除）</div>
                  </el-upload> -->
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
                    <el-button size="mini" plain v-if="updateDepFrom.ArchivedType != 3" slot="trigger" type="primary">选取文件</el-button>
                    <el-button size="mini" plain v-if="updateDepFrom.ArchivedType != 3" style="margin-left: 10px;margin-bottom: 7px;"
                      type="success" :loading="uploadServerLoading" @click="submitUploadUpdate">上传到服务器</el-button>
                    <h3 style="margin:14px 0 10px 0 ;">注：合同或协议{{ "\xa0\xa0" }}<span
                        style="color:#ff4949 ;">双方盖章完成后</span>{{ "\xa0\xa0" }}，请上传电子版扫描件
                    </h3>
                    <div slot="tip" class="uploadClass">只能上传文档和图片格式文件，且不超过<span style="color:#ff4949 ;">20M</span>
                    </div>
                    <div slot="tip" class="uploadClass">可一次选取多个文件，上传完成请点击上传到服务器，否则文档不能保存。</div>
                    <div slot="tip" class="uploadClass">下面为新上传的文件</div>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
        </el-card>
      </el-form>
      <el-divider />
      <el-row class="buttonCenter">
        <el-col>
          <el-button type="primary" :loading="LoadingUpdate || uploadServerLoading" @click="saveUpdate">保 存</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog append-to-body :visible="isshowpdf" width="65%" top="5vh" @close="isshowpdf = false">
      <iframe v-if="isshowpdf" style="width: 100%; height: calc(100vh - 200px);" :src="srcDocx" />
    </el-dialog>
    <el-dialog title="修改合同状态" :visible.sync="updateConStateDialog" width="30%">
      <el-form ref="updateRef" :model="updateConStateFrom" label-width="150px">
        <el-form-item label="合同状态">
          <el-select v-model="updateConStateFrom.ConState" filterable placeholder="合同状态">
            <el-option v-for="item in ConStateArray" :key="item.Code" :label="item.Name" :value="item.Code" />
          </el-select>
        </el-form-item>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button type="primary" :loading="LoadingUpdateState" @click="saveUpdateState">确 定
            </el-button>
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
              <el-tag v-if="item.Code == 1" :key="item.Code" type="danger">
                {{ item.Name }}
              </el-tag>
              <el-tag v-if="item.Code == 2" :key="item.Code">
                {{ item.Name }}
              </el-tag>
              <el-tag v-if="item.Code == 3" :key="item.Code" type="warning">
                {{ item.Name }}
              </el-tag>
              <el-tag v-if="item.Code == 4" :key="item.Code" type="success">
                {{ item.Name }}
              </el-tag>
              <el-tag v-if="item.Code == 5" :key="item.Code" type="info">
                {{ item.Name }}
              </el-tag>
            </el-option>
          </el-select>
        </el-form-item>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button type="primary" :loading="auditStatusCheckLoading" @click="saveAuditStatusCheck">确 定
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 关联公司、关联客服弹出窗口 -->
    <el-dialog :title="connectTitle" :visible.sync="connectDialogVisible" top="5vh" width="1100px"
      :before-close="closeLoading">
      <el-card v-loading="connectLoading" class="box-card">
        <div slot="header" class="clearfix">
          <span>选择公司进行关联</span>
          <el-button-group style="float: right;">
            <el-button type="success" icon="el-icon-circle-plus-outline" @click="AddDialog">添加新公司
            </el-button>
            <el-button type="primary" icon="el-icon-circle-check" :loading="LoadingRoleUpdate"
              @click="saveConnectUpdate">提交保存</el-button>
          </el-button-group>
        </div>
        <!-- <el-transfer v-model="value" :data="data"></el-transfer> -->
        <el-virtual-transfer ref="transferCom" v-model="BindCompanyA.ComAArray"
          style="width:943px;margin: auto; height: calc(100vh - 300px);" :data="CompanyNameAList" :titles="connecttitles"
          :button-texts="buttonTexts" filterable :filter-placeholder="filterPlaceholder" :props="transferProps" />
      </el-card>
    </el-dialog>

    <!-- （添加修改）关联公司、关联客服弹出窗口 -->
    <el-dialog :title="connectTitle" :visible.sync="conDialogVisible" top="5vh" width="1100px" :before-close="cloLoading">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>选择公司进行关联</span>
          <el-button-group style="float: right;">
            <el-button type="primary" icon="el-icon-circle-check" @click="saveConnectPayUpdate">确定</el-button>
          </el-button-group>
        </div>
        <!-- <el-transfer v-model="value" :data="data"></el-transfer> -->
        <el-virtual-transfer ref="transferCom" v-model="BindCompanyA.ComAArray"
          style="width:943px;margin: auto; height: calc(100vh - 300px);" :data="CompanyNameAList" :titles="connecttitles"
          :button-texts="buttonTexts" filterable :filter-placeholder="filterPlaceholder" :props="transferProps" />
      </el-card>
    </el-dialog>

    <!-- 关联销售弹出窗口 -->
    <el-dialog title="关联销售" :visible.sync="connectSaleDialogVisible" top="5vh" width="60%"
      :before-close="closeSaleLoading">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-form ref="addSaleRef" :model="addSaleForm" :rules="addSaleRules" label-width="120px" class="SaleClass">
            <el-row>
              <el-col :span="8">
                <el-form-item label="销售人员" prop="SaleId">
                  <el-select v-model="addSaleForm.SaleId" filterable placeholder="销售人员" clearable="">
                    <el-option v-for="item in UserList" :key="item.UserID" :label="item.UserName" :value="item.UserID" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="提成占比" prop="Percentage">
                  <el-input v-model="addSaleForm.Percentage">
                    <template slot="append">%</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="button">
                  <el-button type="primary" :loading="LoadingSaleUpdate" @click="saveSale">提交保存
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <el-table v-loading="saleLoading" :data="SaleDataArray" border fit height="calc(100vh - 500px)">
          <el-table-column prop="UserName" label="销售人员" small width="200" />
          <el-table-column prop="Percentage" label="提成占比" small width="200" />
          <el-table-column label="操作">
            <template slot-scope="scope" class="tableRowClass">
              <el-button icon="el-icon-delete" type="text" size="mini" @click="deleteSale(scope.row)"> 删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-dialog>
    <!-- 添加公司弹出框 -->
    <el-dialog title="添加公司" :visible.sync="addDialogVisible" width="50%" top="5vh" append-to-body
      @close="addDialogClosed">
      <el-form ref="addRef" :model="AddCompanyForm" label-width="90px" :rules="AddCompanyRules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司名称" prop="ComName">
              <el-input v-model="AddCompanyForm.ComName" placeholder="公司名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司简称" prop="ShortName">
              <el-input v-model="AddCompanyForm.ShortName" placeholder="公司名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="信用代码" prop="TaxpayerIdentificationNumber">
          <el-input v-model="AddCompanyForm.TaxpayerIdentificationNumber" placeholder="统一信用代码/税号" />
        </el-form-item>
        <el-form-item label="公司地址" prop="ComAddress">
          <el-input v-model="AddCompanyForm.ComAddress" readonly placeholder="选取地图后自动获取" />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司经度" prop="lng">
              <el-input v-model="AddCompanyForm.lng" readonly placeholder="选取地图后自动获取" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司纬度" prop="lat">
              <el-input v-model="AddCompanyForm.lat" readonly placeholder="选取地图后自动获取" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="公司地图">
          <baidu-map class="bm-view" scroll-wheel-zoom :center="location" :zoom="zoom"
            ak="eRCv7o5j4Rmj4U2GsODMb71V2r4t4FIt" @ready="mapReady">
            <bm-control :offset="{ width: '50px', height: '10px' }">
              <!-- 自动填充 -->
              <bm-auto-complete :sug-style="{ zIndex: 999999 }">
                <el-input v-model="inputValue" placeholder="输入关键字进行模糊查询" @change="confirmAddress" />
              </bm-auto-complete>
            </bm-control>

            <!-- 手动放大缩小到省市街道 位置：右下方-->
            <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" />

          </baidu-map>
        </el-form-item>
        <el-row class="buttonCenter">
          <el-col>
            <el-button type="primary" :loading="LoadingAddCompany" @click="saveAdd">确 定</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 列表设置弹出窗口 -->
    <!-- <el-drawer title="表头设置" :visible.sync="titleDialogVisible" size="730px">
      <el-button-group style="margin-left: 3.3rem;">
        <el-button  type="primary" @click="_getContractDataSearch" icon="el-icon-search">添加全部
        </el-button>
        <el-button  type="info" @click="reseatData" icon="el-icon-refresh-left">重 置
        </el-button>
        <el-button  type="success" @click="ShowContractAddDialog" icon="el-icon-circle-plus-outline">保 存
        </el-button>
      </el-button-group>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="9" style="margin-left:50px ;">
          <Kanban :key="1" :list="showTitleArray" :group="group" class="kanban" header-text="表头显示" />
        </el-col>
        <el-col :span="9" style="margin-left:50px ;">
          <Kanban :key="2" :list="hideTitleArray" :group="group" class="kanban" header-text="表头隐藏" />
        </el-col>
      </el-row>
    </el-drawer> -->
    <el-dialog title="表头设置" :visible.sync="titleDialogVisible" width="750px">
      <el-row>
        <draggable v-model="showTitleArray" group="people" @start="drag = true" @end="drag = false">
          <el-col v-for="item in showTitleArray" style="height:50px ;line-height:50px;width: 140px;">
            <el-button :disabled="item == '乙方合同编号' || item == '审核状态'" type="danger" plain style="margin-left: 10px;"
              @click="hideClick(item)">{{ item }}<i v-if="item != '乙方合同编号' && item != '审核状态'"
                class="el-icon-close el-icon--right" /></el-button>
          </el-col>
        </draggable>
      </el-row>
      <el-divider>上方列为显示，下方列为隐藏</el-divider>
      <el-row>
        <draggable v-model="hideTitleArray" group="people" @start="drag = true" @end="drag = false">
          <el-col v-for="item in hideTitleArray" style="height:50px ;line-height:50px;width: 140px">
            <el-button type="info" plain style="margin-left: 10px;" @click="showClick(item)">{{ item }}<i
                class="el-icon-plus el-icon--right" /></el-button>
          </el-col>
        </draggable>
      </el-row>
      <el-divider />
      <el-row>
        <el-col :span="12">
          <el-button type="text" @click="addAll">添加全部</el-button>
          <el-button type="text" @click="resetColumn">重置</el-button>
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <el-button @click="titleDialogClosed">取消</el-button>
          <el-button type="primary" :loading="ColumnSubmitLoading" @click="ColumnSubmit">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 复制合同信息弹出窗口 -->
    <el-dialog :title="CopyContractTitle" :visible.sync="CopyContractNameVisible" top="5vh" width="60%"
      @close="CopyContractNameClose">
      <el-table v-loading="CopyContractNameLoading" :data="CopyContractData" border fit class="formClassTable"
        height="calc(100vh - 250px)">
        <el-table-column prop="ContractNameStr" label="合同名称" small min-width="180" show-overflow-tooltip />
        <el-table-column prop="Name" label="合同类型" small min-width="100" />
        <el-table-column prop="SaleName" label="销售人员" small width="150" show-overflow-tooltip />
        <el-table-column prop="BeginTimeString" label="开始时间" small min-width="110" sortable />
        <el-table-column prop="EndTimeString" label="结束时间" small min-width="110" sortable />
        <el-table-column label="操作">
          <template slot-scope="scope" class="tableRowClass">
            <el-button icon="el-icon-document-copy" type="text" size="mini"
              @click="CopyContractNameCloseClick(scope.row)">复制合同信息</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <div v-if="isShowProgress" class="popContainer">
      <el-progress type="circle" :percentage="parseInt(fakes.progress * 100)" :stroke-width="9" :color="customColors"
        style="top: 30%; left: calc(50vw - 58px);color:white"></el-progress>
    </div>
  </div>
</template>

<script>
import {
  UpdateContractCode,
  GetContractData,
  GetContractType,
  GetContractDataExport,
  GetCompany,
  GetUserInfo,
  GetDicCategory,
  AddContract,
  UpdateContract,
  UpdateContractData,
  SubmitForCensorship,
  SaveAuditStatus,
  DeleteContractDetail,
  GetAttachmentFirst,
  GetCompanyABy_Contract,
  BindCompanyABy_Contract,
  BindSale,
  GetSaleData,
  deleteSaleData,
  DeleteContractInfo,
  GetColumnByUser,
  ColumnTitleSubmit,
  GetContractNameList,
  PlaceFileMethod,
  GetParameter,
} from "@/api/CollectionMangement";

import {
  Uploads,
  GetContractNameconfig,
  GetDicCategoryC,
  GetCompanyNameAData,
  AddCompany,
  IfExistsExportUser,
} from "@/api/SystemManagement";
import { showLoading, hideLoading } from "@/common/loading";
import { parseTime, getDateByTimes, getNowDate } from "@/utils"; // 时间日期格式化成字符串
import { cutOutNum } from '@/utils/decimals'
import moment from "moment"; // 导入模块
moment.locale("zh-cn"); // 设置语言 或 moment.lang('zh-cn');
import draggable from 'vuedraggable'
import collapse from '../../assets/js/collapse'
import FakeProgress from 'fake-progress';
import { scrollTo } from '@/utils/scroll-to'
let geocoder;
export default {
  name: '客户合同录入',
  inject: ['reload'],
  components: {
    draggable,
    collapse,
  },
  data() {
    // 自定义手机号规则
    var checkMobile = (rule, value, callback) => {
      if (value) {
        const regMobile = /^1[34578]\d{9}$/;
        if (regMobile.test(value)) {
          return callback();
        }
        // 返回一个错误提示
        callback(new Error("请输入正确的手机号码"));
      } else {
        return callback();
      }
    };
    // 自定义邮箱规则
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/;
      if (!value) {
        return callback();
      } else if (regEmail.test(value)) {
        // 合法邮箱
        return callback();
      }
      callback(new Error("请输入正确的邮箱"));
    };

    // 银行卡校验规则
    var checkCard = (rule, value, callback) => {
      if (value) {
        const regMobile = /^([1-9]{1})(\d{15}|\d{18})$/;
        if (regMobile.test(value)) {
          return callback();
        }
        // 返回一个错误提示
        callback(new Error("请输入正确的银行卡号"));
      } else {
        return callback();
      }
    };
    // 自定义金额规则
    var ContractAmountAdd = (rule, value, callback) => {
      if (this.addContractsForm.ContractAmount) {
        const regContractAmount = /^([0-9]\d*(\.\d{1,2})?|([0](\.([0][0-9]|[0-9]\d{0,1}))))$/;
        if (regContractAmount.test(value)) {
          return callback();
        }
        // 返回一个错误提示
        callback(new Error("合同金额输入不合法（不能小于0小数位不超过2位）"));
      } else {
        callback(new Error("合同金额不能为空"));
      }
    };
    // 合同金额规则（修改时如果修改了合同金额，那么这个备注要必填，不填返回提示）
    var checkContractAmountDetail = (rule, value, callback) => {
      if (this.updateDepFrom) {
        if (this.updateDepFrom.ContractAmount != this.OldContractAmount && !this.updateDepFrom.ContractAmountDetail) {
          // 返回一个错误提示
          callback(new Error("如果修改了合同金额，那么此备注要必填"));
        } else {
          return callback();
        }
      }
      else
        return callback();
    };
    return {
      typeArray: [
        '',
        'success',
        'info',
        'warning',
        'danger',
      ],
      conDialogVisible: false,
      PayerArray: [],
      AddCompanyRules: {
        ComName: [
          {
            required: true,
            message: "请输入公司名称",
            trigger: "blur",
          },
        ],
        ShortName: [
          {
            required: true,
            message: "请输入公司简称",
            trigger: "blur",
          },
        ],
        TaxpayerIdentificationNumber: [
          {
            required: true,
            message: "统一信用代码/税号",
            trigger: "blur",
          },
        ],
      },
      previewFile: {}, // 传递的参数 
      previewFileShow: false, // 默认预览框是关闭状态
      isShowProgress: false,
      fakes: new FakeProgress({
        timeConstant: 10000,
        autoStart: false
      }),
      size: 'small',
      ArchivedType: '',
      ArchivedTypeList: [],
      placeFileLoading: false,
      CompanyRelationList: [],
      OldContractAmount: null,
      CorporationDatasParent: [],
      selectCorporationDatasParent: [],
      fixedLeftShow: false,
      CopyContractNameVisible: false,
      CopyContractData: [],
      isActive: false,
      ColumnSubmitLoading: false,
      // 拖拽缓存
      group: 'mission',
      showTitleArray: [],
      hideTitleArray: [],
      showTitleArrayOld: [],
      hideTitleArrayOld: [],
      TitleArray: [
        '乙方合同编号',
        '审核状态',
        '归档类型',
        // '合同名称',
        '公司名称',
        '乙方名称',
        '合同类型',
        '合同状态',
        '有无关联合同',
        '开始时间',
        '结束时间',
        '提成占比',
        '销售人员',
        '单价',
        '数量',
        '缴费方式',
        '合同金额',
        '甲方名称',
        '添加人',
        '添加时间',
        '送审时间',
        '审核时间'
      ],
      ifSecondContractNumberPrefix: true,
      ifAuditStatusName: true,
      ifContractNameStr: true,
      ifArchivedType: true,
      ifCompanyName: true,
      ifName: true,
      ifConStateName: true,
      ifBeginTimeString: true,
      ifEndTimeString: true,
      ifPercentage: true,
      ifContractAmount: true,
      ifSaleName: true,
      ifPaymentMethodString: true,
      ifUnitPrice: true,
      ifQuantity: true,
      ifFirstPartyName: true,
      ifSecondPartyName: true,
      ifCreateUserName: true,
      ifCreationTimeString: true,
      ifSubmitCensorshipTimeStr: true,
      ifExamineTimeStr: true,
      ifParentContractCode: true,
      titleDialogVisible: false,
      customColors: [
        { color: '#ff4949', percentage: 20 },
        { color: '#ffba00', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ],
      IfExistsExportUserFlag: false,
      fullscreenLoading: false,
      // 百度地图参数
      model: {},
      BMap: {},
      map: {},
      location: {
        lng: 116.40,
        lat: 39.92
      },
      zoom: 12,
      inputValue: "",
      keyword: '',
      // --------
      AddCompanyForm: {
        ComName: "",
        ShortName: "",
        ComAddress: "",
        lat: null,
        lng: null,
        TaxpayerIdentificationNumber: "",
      },
      addDialogVisible: false,
      connectSaleDialogVisible: false,
      addSaleForm: {
        AuditStatus: "", // 审核状态
        ContractId: null, // 合同编号
        SaleId: "", // 销售人员编号
        Percentage: "", // 提成占比
      },
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
      header: { Authorization: sessionStorage.getItem("token") },
      fileList: [],
      fileListUpload: [],
      uploadServerLoading: false,
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
      ExportLoading: false,
      GetContractTypeArray: [],
      ContractCode: "",
      ContractName: "",
      SecondPartyName: '',
      ComName: "",
      ContractType: "",
      BeginTime: "",
      EndTime: "",
      BeginSignTime: "",
      EndSignTime: "",
      // ContractRangeTime: [],
      ContractSignTime: [],
      ExamineTime: [],
      ConnectCompany: '',
      BeginExamineTime: "",
      EndExamineTime: "",
      entLoading: false,
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
      detailAddDialogVisible: false,
      updateDialogVisible: false,
      ContractData: [],
      corp_id: "",
      detailFrom: {
        ContractCode: "",
        CompanyName: "",
        BeginTimeString: "",
        ContractAmountString: "",
        ProfitMarginString: "",
        PaymentMethodString: "",
        ContractName: "",
        Name: "",
        EndTimeString: "",
        SignTimeString: "",
        Percentage: "",
        UserName: "",
      },
      updateDepFrom: {
        domains: [],
        PayerArray: [],
        ArchivedType: '',
        ParentContractCode: '',
        UnitPrice: '',
        Quantity: '',
        SecondContractNumberPrefix: "",
        Id: "",
        ContractCode: "",
        ContractName: "",
        CompanyId: "",
        ContractType: "",

        BeginTime: "",
        EndTime: "",
        ActualBeginTime: "",
        ActualEndTime: "",
        ProfitMargin: "",
        ContractAmount: "",
        ContractAmountDetail: '',
        SaleId: "",
        Percentage: "",
        SignTime: "",
        PaymentMethod: "",

        FirstPartyName: "",
        FirstPartyAddress: "",
        FirstPartyContacts: "",
        FirstPartyPhone: "",
        FirstPartyEmail: "",
        FirstPartyBank: "",
        FirstPartyBankNum: "",

        SecondPartyName: "",
        SecondPartyAddress: "",
        SecondPartyContacts: "",
        SecondPartyPhone: "",
        SecondPartyEmail: "",
        SecondPartyBank: "",
        SecondPartyBankNum: "",
        ThirdPartyName: "",
        ThirdPartyAddress: "",
        ThirdPartyContacts: "",
        ThirdPartyPhone: "",
        ThirdPartyEmail: "",
        ThirdPartyBank: "",
        ThirdPartyBankNum: "",

        Remark: "",
        ContractSubjectId: '',
        FileList: [],
        FileLists: [],
        YearBatch: "",//第*年签（只有修改有，添加会根据公司编号和类型判断是第几年/次，并且只根据住公司判断，不考虑关联公司）
      },
      BackgroundImage: "",
      BackgroundImageEn: "",
      BackgroundImageFan: "",
      updateBackgroundImage: "",
      updateBackgroundImageEn: "",
      updateBackgroundImageFan: "",
      addFilePlatformImage: "",
      updateFilePlatformImage: "",
      // 添加公告正则验证
      addRules: {
        Corpid: [{ required: true, message: "请选择公司", trigger: "blur" }],
      },
      updateRules: {
        ContractCode: [
          { required: true, message: "请填写合同编号", trigger: "blur" },
        ],
      },
      loading: false,
      CreateUserName: "",
      CreateTime: "",
      UpdateUserName: "",
      UpdateTime: "",
      getPaymentMethodArray: [],
      // 合同状态
      ConStateArray: [
        // { Code: "4", Name: "全部" },
        { Code: "1", Name: "正在执行", Class: "Executing" },
        // { Code: "2", Name: "到期,未结款", Class: "DueOutstanding" },
        { Code: "3", Name: "已完结", Class: "Closed" },
        { Code: "0", Name: "未知", Class: "unknown" },
      ],
      ConState: "",
      ConMonth: "",
      ContractNameconfigList: [],
      CorporationDatas: [],
      UserList: [],
      PaymentMethodList: [],
      DicCategoryList: [],
      addContractsForm: {
        domains: [],
        PayerArray: [],
        ParentContractCode: '',
        UnitPrice: '',
        Quantity: '',
        ContractCode: "",
        ContractName: "",
        CompanyId: "",
        ContractType: "",

        BeginTime: "",
        EndTime: "",
        ActualBeginTime: "",
        ActualEndTime: "",
        ProfitMargin: "",
        ContractAmount: "",
        SaleId: sessionStorage.getItem("RoleName") == "销售" ? sessionStorage.getItem("userid") : '',
        Percentage: "",
        SignTime: "",
        PaymentMethod: "",

        FirstPartyName: "",
        FirstPartyAddress: "",
        FirstPartyContacts: "",
        FirstPartyPhone: "",
        FirstPartyEmail: "",
        FirstPartyBank: "",
        FirstPartyBankNum: "",

        SecondPartyName: "",
        SecondPartyAddress: "",
        SecondPartyContacts: "",
        SecondPartyPhone: "",
        SecondPartyEmail: "",
        SecondPartyBank: "",
        SecondPartyBankNum: "",
        ThirdPartyName: "",
        ThirdPartyAddress: "",
        ThirdPartyContacts: "",
        ThirdPartyPhone: "",
        ThirdPartyEmail: "",
        ThirdPartyBank: "",
        ThirdPartyBankNum: "",

        Remark: "",
        FileList: [],
      },
      // 添加合同正则验证
      addContractsRules: {
        ContractCode: [
          { required: false, message: "请输入合同编号", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符内",
            trigger: "blur",
          },
        ],
        ContractName: [
          { required: true, message: "请输入合同名称", trigger: "change" },
        ],
        CompanyId: [
          { required: true, message: "请输入公司名称", trigger: "change" },
        ],
        ContractType: [
          { required: true, message: "请输入合同类型", trigger: "change" },
        ],
        PaymentMethod: [
          { required: true, message: "请选择缴费方式", trigger: "change" },
        ],
        BeginTime: [
          {
            required: true,
            message: "请选择开始日期",
            trigger: "change",
          },
        ],
        EndTime: [
          {
            required: true,
            message: "请选择开始日期",
            trigger: "change",
          },
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
        ProfitMargin: [
          {
            required: false,
            pattern:
              /^([0-9]\d*(\.\d{1,2})?|([0](\.([0][0-9]|[0-9]\d{0,1}))))$/,
            message: "利润率输入不合法（不能小于0小数位不超过2位）",
            trigger: "blur",
          },
        ],
        UnitPrice: [
          {
            required: true,
            message: "请输入单价",
            trigger: "blur",
          },
        ],
        Quantity: [
          {
            required: true,
            message: "请输入数量",
            trigger: "blur",
          },
        ],
        ContractAmount:
          // [
          //   {
          //     required: true,
          //     pattern:
          //       /^([0-9]\d*(\.\d{1,2})?|([0](\.([0][0-9]|[0-9]\d{0,1}))))$/,
          //     message: "合同金额输入不合法（不能小于0小数位不超过2位）",
          //     trigger: "blur",
          //   },
          // ],
          [
            {
              required: true,
              message: "合同金额输入不合法（不能小于0小数位不超过2位）",
              trigger: "blur",
              validator: ContractAmountAdd,
            },
          ],
        SaleId: [
          { required: true, message: "请选择销售人员", trigger: "change" },
        ],
        FirstPartyName: [
          { required: true, message: "请输入甲方名称", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "甲方名称长度在 1 到 50 个字符内",
            trigger: "blur",
          },
        ],
        FirstPartyAddress: [
          { required: false },
          {
            min: 1,
            max: 100,
            message: "甲方地址长度在 1 到 100 个字符内",
            trigger: "blur",
          },
        ],
        FirstPartyContacts: [
          { required: false },
          {
            min: 1,
            max: 10,
            message: "甲方联系人长度在 1 到 10 个字符内",
            trigger: "blur",
          },
        ],
        FirstPartyPhone: [
          { required: false },
          {
            message: "甲方联系电话输入不合法",
            trigger: "blur",
            validator: checkMobile,
          },
        ],
        FirstPartyEmail: [
          { required: false },
          {
            message: "甲方工作邮箱输入不合法",
            trigger: "blur",
            validator: checkEmail,
          },
        ],
        FirstPartyBank: [
          { required: false },
          {
            min: 1,
            max: 50,
            message: "甲方开户行长度在 1 到 50 个字符内",
            trigger: "blur",
          },
        ],
        FirstPartyBankNum: [
          { required: false },
          {
            message: "甲方银行账号输入不合法",
            trigger: "blur",
            validator: checkCard,
          },
        ],
        SecondPartyName: [
          { required: true, message: "请选择乙方名称", trigger: "change" },
        ],
        SecondPartyAddress: [
          { required: false },
          {
            min: 1,
            max: 100,
            message: "乙方地址长度在 1 到 100 个字符内",
            trigger: "blur",
          },
        ],
        SecondPartyContacts: [
          { required: false },
          {
            min: 1,
            max: 10,
            message: "乙方联系人长度在 1 到 10 个字符内",
            trigger: "blur",
          },
        ],
        SecondPartyPhone: [
          { required: false },
          {
            message: "乙方联系电话输入不合法",
            trigger: "blur",
            validator: checkMobile,
          },
        ],
        SecondPartyEmail: [
          { required: false },
          {
            message: "乙方工作邮箱输入不合法",
            trigger: "blur",
            validator: checkEmail,
          },
        ],
        SecondPartyBank: [
          { required: false },
          {
            min: 1,
            max: 50,
            message: "乙方开户行长度在 1 到 50 个字符内",
            trigger: "blur",
          },
        ],
        SecondPartyBankNum: [
          { required: false },
          {
            message: "乙方银行账号输入不合法",
            trigger: "blur",
            validator: checkCard,
          },
        ],
        ThirdPartyName: [
          { required: false },
          {
            min: 1,
            max: 50,
            message: "丙方名称行长度在 1 到 50 个字符内",
            trigger: "blur",
          },
        ],
        ThirdPartyAddress: [
          { required: false },
          {
            min: 1,
            max: 100,
            message: "丙方地址长度在 1 到 100 个字符内",
            trigger: "blur",
          },
        ],
        ThirdPartyContacts: [
          { required: false },
          {
            min: 1,
            max: 10,
            message: "丙方联系人长度在 1 到 10 个字符内",
            trigger: "blur",
          },
        ],
        ThirdPartyPhone: [
          { required: false },
          {
            message: "丙方联系电话输入不合法",
            trigger: "blur",
            validator: checkMobile,
          },
        ],
        ThirdPartyEmail: [
          { required: false },
          {
            message: "丙方工作邮箱输入不合法",
            trigger: "blur",
            validator: checkEmail,
          },
        ],
        ThirdPartyBank: [
          { required: false },
          {
            min: 1,
            max: 50,
            message: "丙方开户行长度在 1 到 50 个字符内",
            trigger: "blur",
          },
        ],
        ThirdPartyBankNum: [
          { required: false },
          {
            message: "丙方银行账号输入不合法",
            trigger: "blur",
            validator: checkCard,
          },
        ],
      },
      updateContractsRules: {
        ContractCode: [
          { required: false, message: "请输入合同编号", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符内",
            trigger: "blur",
          },
        ],
        SecondContractNumberPrefix: [
          { required: false, message: "请输入乙方合同编号", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符内",
            trigger: "blur",
          },
        ],

        ContractName: [
          { required: true, message: "请输入合同名称", trigger: "change" },
        ],
        CompanyId: [
          { required: true, message: "请输入公司名称", trigger: "change" },
        ],
        ContractType: [
          { required: true, message: "请输入合同类型", trigger: "change" },
        ],
        PaymentMethod: [
          { required: true, message: "请选择缴费方式", trigger: "change" },
        ],
        BeginTime: [
          {
            required: true,
            message: "请选择开始日期",
            trigger: "change",
          },
        ],
        EndTime: [
          {
            required: true,
            message: "请选择开始日期",
            trigger: "change",
          },
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
        ProfitMargin: [
          {
            required: false,
            pattern:
              /^([0-9]\d*(\.\d{1,2})?|([0](\.([0][0-9]|[0-9]\d{0,1}))))$/,
            message: "利润率输入不合法（不能小于0小数位不超过2位）",
            trigger: "blur",
          },
        ],
        UnitPrice: [
          {
            required: true,
            message: "请输入单价",
            trigger: "blur",
          },
        ],
        Quantity: [
          {
            required: true,
            message: "请输入数量",
            trigger: "blur",
          },
        ],
        ContractAmount: [
          {
            required: true,
            pattern:
              /^([0-9]\d*(\.\d{1,2})?|([0](\.([0][0-9]|[0-9]\d{0,1}))))$/,
            message: "合同金额输入不合法（不能小于0小数位不超过2位）",
            trigger: "blur",
          },
        ],
        ContractAmountDetail: [
          { required: false },
          {
            message: "如果修改了合同金额，那么此备注要必填",
            trigger: "blur",
            validator: checkContractAmountDetail,
          },
        ],
        SaleId: [
          { required: true, message: "请选择销售人员", trigger: "change" },
        ],
        FirstPartyName: [
          { required: true, message: "请输入甲方名称", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "甲方名称长度在 1 到 50 个字符内",
            trigger: "blur",
          },
        ],
        FirstPartyAddress: [
          { required: false },
          {
            min: 1,
            max: 100,
            message: "甲方地址长度在 1 到 100 个字符内",
            trigger: "blur",
          },
        ],
        FirstPartyContacts: [
          { required: false },
          {
            min: 1,
            max: 10,
            message: "甲方联系人长度在 1 到 10 个字符内",
            trigger: "blur",
          },
        ],
        FirstPartyPhone: [
          { required: false },
          {
            message: "甲方联系电话输入不合法",
            trigger: "blur",
            validator: checkMobile,
          },
        ],
        FirstPartyEmail: [
          { required: false },
          {
            message: "甲方工作邮箱输入不合法",
            trigger: "blur",
            validator: checkEmail,
          },
        ],
        FirstPartyBank: [
          { required: false },
          {
            min: 1,
            max: 50,
            message: "甲方开户行长度在 1 到 50 个字符内",
            trigger: "blur",
          },
        ],
        FirstPartyBankNum: [
          { required: false },
          {
            message: "甲方银行账号输入不合法",
            trigger: "blur",
            validator: checkCard,
          },
        ],
        SecondPartyName: [
          { required: true, message: "请选择乙方名称", trigger: "change" },
        ],
        SecondPartyAddress: [
          { required: false },
          {
            min: 1,
            max: 100,
            message: "乙方地址长度在 1 到 100 个字符内",
            trigger: "blur",
          },
        ],
        SecondPartyContacts: [
          { required: false },
          {
            min: 1,
            max: 10,
            message: "乙方联系人长度在 1 到 10 个字符内",
            trigger: "blur",
          },
        ],
        SecondPartyPhone: [
          { required: false },
          {
            message: "乙方联系电话输入不合法",
            trigger: "blur",
            validator: checkMobile,
          },
        ],
        SecondPartyEmail: [
          { required: false },
          {
            message: "乙方工作邮箱输入不合法",
            trigger: "blur",
            validator: checkEmail,
          },
        ],
        SecondPartyBank: [
          { required: false },
          {
            min: 1,
            max: 50,
            message: "乙方开户行长度在 1 到 50 个字符内",
            trigger: "blur",
          },
        ],
        SecondPartyBankNum: [
          { required: false },
          {
            message: "乙方银行账号输入不合法",
            trigger: "blur",
            validator: checkCard,
          },
        ],
        ThirdPartyName: [
          { required: false },
          {
            min: 1,
            max: 50,
            message: "丙方名称行长度在 1 到 50 个字符内",
            trigger: "blur",
          },
        ],
        ThirdPartyAddress: [
          { required: false },
          {
            min: 1,
            max: 100,
            message: "丙方地址长度在 1 到 100 个字符内",
            trigger: "blur",
          },
        ],
        ThirdPartyContacts: [
          { required: false },
          {
            min: 1,
            max: 10,
            message: "丙方联系人长度在 1 到 10 个字符内",
            trigger: "blur",
          },
        ],
        ThirdPartyPhone: [
          { required: false },
          {
            message: "丙方联系电话输入不合法",
            trigger: "blur",
            validator: checkMobile,
          },
        ],
        ThirdPartyEmail: [
          { required: false },
          {
            message: "丙方工作邮箱输入不合法",
            trigger: "blur",
            validator: checkEmail,
          },
        ],
        ThirdPartyBank: [
          { required: false },
          {
            min: 1,
            max: 50,
            message: "丙方开户行长度在 1 到 50 个字符内",
            trigger: "blur",
          },
        ],
        ThirdPartyBankNum: [
          { required: false },
          {
            message: "丙方银行账号输入不合法",
            trigger: "blur",
            validator: checkCard,
          },
        ],
      },
      updateConStateDialog: false,
      updateConStateFrom: {
        ContractDetailCode: "", // 合同详情表主键
        ConState: "", // 合同状态
        ContractCode: "", // 合同主键送审时要用
      },
      LoadingUpdateState: false,
      AuditStatusList: [],
      AuditStatus: '',
      CreateUserId: '',
      auditStatusCheckFlag: false,
      auditStatusChange: '',
      auditStatusdescription: '',
      auditStatusCheckLoading: false,
      auditStatusCheckDialog: false,
      connectDialogVisible: false,
      CopyContractNameLoading: false,
      CompanyNameAList: [],
      BindCompanyA: {
        ContractId: null,
        ComAArray: [],
        ConnectType: 1,
      },
      connectLoading: false,
      LoadingRoleUpdate: false,
      saleLoading: false,
      LoadingAddCompany: false,
      updateShowFlag: false, // 控制编辑页面禁用启用 除了财务 审核中和审核成功 部分编辑 只能编辑文件和备注
      editButtonShow: false, // 控制销售 如果是,没有修改功能
      // editWidth: 220,
      // PercentageFlag: false,
      // ContractAmountFlag: false,
      //ContractAmountDetailFlag: true, // 只有超级管理员和财务可以改，不管审核状态是什么，都可以改，别的人不管什么状态都不能修改
      // ParentContractCodeFlag: false,
      // SaleIdFlag: false,
      // PaymentMethodFlag: false,
      UnitPriceFlag: false,
      ColumnByUserList: [], // 用户所绑定的列集合
      ConCompany: true, // 甲方合同名称、乙方合同名称只有超级管理员可以修改
      multipleSelection: [], // 储存选中的Selection
      CopyContractTitle: '',
      isshowpdf: false,
      srcDocx: '',
      LastValue: null,//添加或者编辑时上一次选中的值（编辑时默认赋值）
      AddOrUpdateDialog: true,
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
    debugger
    this.fixedShowMethod(document.body.clientWidth);
    // 销售不能看到修改合同状态
    if (sessionStorage.getItem("RoleName") == "销售") {
      this.editButtonShow = false;
    } else {
      this.editButtonShow = true;
    }

    // 获取审核状态数据
    this.GetAuditStatus();
    // 获取乙方公司数据
    this.GetDicCategoryC();
    // 支付方式数据
    this.GetPaymentMethod();
    // 获取销售人数据
    this.GetUserInfo();
    // 获取合同名称配置数据
    this.GetContractNameconfig();
    // 获取公司列表
    this.GetCompany();
    // 获取合同类型数据
    this.GetContractTypeList();
    // 是否有导出按钮
    this.IfExistsExportUserMethod();
    // 根据登录用户和菜单名称获取所分配的列名称
    this.GetColumnByUserMethod();
    // // 获取所有合同数据，在添加和修改关联合同时用
    // this.GetContractName();
    // 获取归档类型数据
    this.GetArchivedType();
  },
  // 加载完成后执行获取公司数据接口
  mounted() {
    // 给合同状态的默认值赋当前月份
    this.ConMonth = getNowDate('month');
    switch (sessionStorage.getItem("RoleName")) {
      case "超级管理员":
      case "财务":
        this.auditStatusCheckFlag = true;
        break;
    }
    if (sessionStorage.getItem("RoleName") == "超级管理员") { this.ConCompany = false; }

    // 默认取当月有效时间
    // this.ContractRangeTime = [
    //   this.$moment(new Date()).format("YYYY-MM-01"),
    //   this.$moment(new Date()).format("YYYY-MM-DD"),
    // ];
    // this.ContractSignTime= [
    //   this.$moment(new Date()).format("YYYY-MM-01"),
    //   this.$moment(new Date()).format("YYYY-MM-DD"),
    // ];
    // 获取合同数据
    this._getContractData();
  },
  methods: {
    //添加条目
    addDomain() {
      this.addContractsForm.domains.push({
        UnitPrice: '',
        Quantity: '',
        Remark: '',
        key: Date.now()
      });
    },
    //删除条目
    removeDomain(item) {
      if (this.addContractsForm.domains.length != 0) {
        var index = this.addContractsForm.domains.indexOf(item)
        if (index !== -1) {
          this.addContractsForm.domains.splice(index, 1)
        }
      };
      this.handleChangeAdd();
    },
    //条目 数量和价格改变事件
    handleChangeAdd() {
      let totalInputMoney = 0;
      this.addContractsForm.domains.forEach((item) => {
        item.UnitPrice = /^\d+\.?\d{0,4}$/.test(item.UnitPrice) ? item.UnitPrice
          : (item.UnitPrice.indexOf('.') == -1 ? '' : cutOutNum(parseFloat(item.UnitPrice), 4));
        if (item.Quantity.length === 1) {
          item.Quantity = item.Quantity.toString().replace(/[^0-9]/g, '');
        } else {
          item.Quantity = item.Quantity.toString().replace(/[^\d]/g, '');
        }
        if (item.UnitPrice && item.Quantity && this.addContractsForm.PaymentMethod) {
          let fee = null;
          switch (this.addContractsForm.PaymentMethod) {
            case '0':
            case '12':
              fee = 1;
              break;
            case '1':
              fee = 12;
              break;
            case '3':
              fee = 4;
              break;
            case '6':
              fee = 2;
              break;
          }
          totalInputMoney += parseFloat(cutOutNum(item.UnitPrice * item.Quantity * fee));
        }
      })
      this.addContractsForm.ContractAmount = totalInputMoney == 0 ? "" : totalInputMoney;
    },
    //修改添加条目条目
    addDomainUpt() {
      this.updateDepFrom.domains.push({
        UnitPrice: '',
        Quantity: '',
        Remark: '',
        key: Date.now()
      });
    },
    //删除条目
    removeDomainUpt(item) {
      if (this.updateDepFrom.domains.length != 0) {
        var index = this.updateDepFrom.domains.indexOf(item)
        if (index !== -1) {
          this.updateDepFrom.domains.splice(index, 1)
        }
      };
      this.handleChangeUpt();
    },
    //条目 数量和价格改变事件
    handleChangeUpt() {
      let totalInputMoney = 0;
      this.updateDepFrom.domains.forEach((item) => {
        item.UnitPrice = /^\d+\.?\d{0,4}$/.test(item.UnitPrice) ? item.UnitPrice
          : (item.UnitPrice.indexOf('.') == -1 ? '' : cutOutNum(parseFloat(item.UnitPrice), 4));
        if (item.Quantity.length === 1) {
          item.Quantity = item.Quantity.toString().replace(/[^0-9]/g, '');
        } else {
          item.Quantity = item.Quantity.toString().replace(/[^\d]/g, '');
        }
        if (item.UnitPrice && item.Quantity && this.updateDepFrom.PaymentMethod) {
          let fee = null;
          switch (this.updateDepFrom.PaymentMethod) {
            case '0':
            case '12':
              fee = 1;
              break;
            case '1':
              fee = 12;
              break;
            case '3':
              fee = 4;
              break;
            case '6':
              fee = 2;
              break;
          }
          totalInputMoney += parseFloat(cutOutNum(item.UnitPrice * item.Quantity * fee));
        }
      })
      this.updateDepFrom.ContractAmount = totalInputMoney == 0 ? "" : totalInputMoney;
    },

    handleClose(code) {
      this.PayerArray = this.PayerArray.filter((o) => {
        return o.Code + "" !== code + ""
      })
    },
    //flag 为true 过滤掉添加主公司 false过滤掉修改主公司
    showCollectionDialog(flags) {
      this.conDialogVisible = true;
      this.connecttitles = ['未关联公司', '已关联公司'];
      this.buttonTexts = ['取关', '关联'];
      this.filterPlaceholder = '请输入公司名称';
      this.transferProps = { key: 'ComID', label: 'ComName', disabled: 'disabled' };
      this.connectTitle = "关联公司";
      let codeArray = [];
      this.PayerArray.forEach((item) => {
        codeArray.push(item.Code)
      });
      if (flags) {
        this.CompanyNameAList = this.companyList.filter((item) => { return item.ComID + "" != this.addContractsForm.CompanyId + ""; });
      }
      else {
        this.CompanyNameAList = this.companyList.filter((item) => { return item.ComID + "" != this.updateDepFrom.CompanyId + ""; });
      }
      //过滤掉主公司编号
      codeArray = codeArray.filter((item) => { return item + "" != this.addContractsForm.CompanyId + ""; });
      this.BindCompanyA.ComAArray = codeArray;
    },

    saveConnectPayUpdate() {
      this.PayerArray = [];
      this.BindCompanyA.ComAArray.forEach((item) => {
        let datas = this.companyList.filter((Company) => { return Company.ComID == item; });
        let items = {
          Code: datas[0].ComID,
          Name: datas[0].ComName,
          Type: this.typeArray[Math.floor(Math.random() * 5)], //进行计算随机
        };
        this.PayerArray.push(items);
      });
      if (this.AddOrUpdateDialog) {
        if (this.addContractsForm.CompanyId) {
          let mainDatas = this.companyList.filter((item) => { return item.ComID == this.addContractsForm.CompanyId; });
          let mainItems = {
            Code: mainDatas[0].ComID,
            Name: mainDatas[0].ComName,
            Type: this.typeArray[Math.floor(Math.random() * 5)], //进行计算随机
          };
          this.PayerArray.push(mainItems);
        }
      }
      // else {
      //   if (this.updateDepFrom.CompanyId) {
      //     let mainDatas = this.companyList.filter((item) => { return item.ComID == this.updateDepFrom.CompanyId; });
      //     let mainItems = {
      //       Code: mainDatas[0].ComID,
      //       Name: mainDatas[0].ComName,
      //       Type: this.typeArray[Math.floor(Math.random() * 5)], //进行计算随机
      //     };
      //     this.PayerArray.push(mainItems);
      //   }

      // }
      this.cloLoading();
    },
    clickView(src) {
      this.srcDocx = src.url;
      this.isshowpdf = true
    },
    downView(src) {
      window.location.href = src.urlDown;
    },
    SecondClick(SecondContractNumberPrefix) {
      this.copys("乙方合同编号", SecondContractNumberPrefix);
    },
    //复制通用方法
    copys(title, option) {
      var input = document.createElement("input"); // 创建input对象
      input.value = option; // 设置复制内容
      document.body.appendChild(input); // 添加临时实例
      input.select(); // 选择实例内容
      document.execCommand("Copy"); // 执行复制
      document.body.removeChild(input); // 删除临时实例
      this.$message.success("已成功复制" + title + "：" + option);
    },
    // 列表时间格式化
    dateFormat(row) {
      if (row) {
        return this.$moment(row).format("YYYY-MM-DD HH:mm:ss");
      } else { return null; }
    },
    // // 获取合同数据
    // GetContractName() {
    //   GetContractNameList().then((res) => {
    //     if (res.success) {
    //       this.CorporationDatasParent = [];
    //       // 公司数据格式化
    //       this.CorporationDatasParent = res.result.map((item) => {
    //         return {
    //           value: item.Id,
    //           label: item.ContractName,
    //         };
    //       });
    //     } else {
    //       this.CorporationDatasParent = [];
    //     }
    //   });
    // },
    // 输入过滤
    remoteMethodParent(query) {
      if (query !== "") {
        setTimeout(() => {
          GetContractNameList(query, null).then((res) => {
            if (res.success) {
              this.CorporationDatasParent = [];
              // 公司数据格式化
              this.CorporationDatasParent = res.result.map((item) => {
                return {
                  value: item.Id,
                  label: item.ContractName,
                };
              });
              this.selectCorporationDatasParent = this.CorporationDatasParent.filter((item) => {
                return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
              });
            } else {
              this.CorporationDatasParent = [];
            }
          });
        }, 200);
      } else {
        this.selectCorporationDatasParent = [];
      }
    },
    // 关闭远程搜索下拉时需要清空筛选出来的数据进行重新筛选
    clearselectCorporationDatasParent(e) {
      this.selectCorporationDatasParent = [];
    },
    // 反填只显示选中的公司名称
    remoteMethodShowParent(query) {
      if (query !== "") {
        setTimeout(() => {
          GetContractNameList('', query).then((res) => {
            if (res.success) {
              this.CorporationDatasParent = [];
              // 公司数据格式化
              this.CorporationDatasParent = res.result.map((item) => {
                return {
                  value: item.Id,
                  label: item.ContractName,
                };
              });
              this.selectCorporationDatasParent = this.CorporationDatasParent.filter((item) => {
                return item.value == query;
              });
            } else {
              this.CorporationDatasParent = [];
            }
          });


        }, 200);
      } else {
        this.selectCorporationDatasParent = [];
      }
    },
    // 点击当前行数据进行选中或取消复选框
    toggleSelection(row, column, event) {
      if (column.label != "操作" && column.label != "公司名称" && column.label != "乙方合同编号")
      // 通过ref绑定后这里使用$refs.table来操作bom元素
      { this.$refs.multipleTable.toggleRowSelection(row); }
    },
    // 复制历史合同信息
    CopyContractName() {
      if (!this.addContractsForm.CompanyId) { return this.$message.warning("请先选择右侧公司名称"); }

      const itemCompany = this.CorporationDatas.filter((item) => {
        return item.value == this.addContractsForm.CompanyId;
      });
      if (itemCompany.length > 0) {
        this.CopyContractTitle = itemCompany[0].label;
        this.CopyContractNameVisible = true;
        this.CopyContractNameLoading = true;
        GetContractData("", "", "", itemCompany[0].label, "", "", "", "", "", "", "", 1, 100000
        ).then((res) => {
          if (res.success) {
            this.CopyContractData = res.result.list;
          } else {
            this.CopyContractData = [];
          }
          this.CopyContractNameLoading = false;
        });
      }
    },
    // 关闭复制合同信息窗口并重置数据
    CopyContractNameClose() {
      this.CopyContractData = [];
      this.CopyContractNameVisible = false;
    },
    CopyContractNameCloseClick(item) {
      // this.addContractsForm.BeginTime = item.BeginTimeString;
      // this.addContractsForm.EndTime = item.EndTimeString;
      this.addContractsForm.ContractAmount = item.ContractAmountString;
      this.addContractsForm.SignTime = item.SignTimeString;
      this.addContractsForm.PaymentMethod = !item.PaymentMethod
        ? null
        : item.PaymentMethod + "";
      // this.addContractsForm.ActualBeginTime = item.ActualBeginTimeString;
      // this.addContractsForm.ActualEndTime = item.ActualEndTimeString;
      this.addContractsForm.SaleId = item.SaleId ? item.SaleId.toUpperCase() : '';
      this.addContractsForm.ContractName = item.ContractName;
      this.addContractsForm.ContractType = item.ContractType;
      // this.addContractsForm.ContractCode = item.ContractCode;
      this.addContractsForm.ProfitMargin = item.ProfitMargin;
      this.addContractsForm.Percentage = item.Percentage;
      this.addContractsForm.FirstPartyName = item.FirstPartyName;
      this.addContractsForm.FirstPartyAddress = item.FirstPartyAddress;
      this.addContractsForm.FirstPartyContacts = item.FirstPartyContacts;
      this.addContractsForm.FirstPartyPhone = item.FirstPartyPhone;
      this.addContractsForm.FirstPartyEmail = item.FirstPartyEmail;
      this.addContractsForm.FirstPartyBank = item.FirstPartyBank;
      this.addContractsForm.FirstPartyBankNum = item.FirstPartyBankNum;
      this.addContractsForm.SecondPartyName = item.SecondPartyName;
      this.addContractsForm.SecondPartyAddress = item.SecondPartyAddress;
      this.addContractsForm.SecondPartyContacts = item.SecondPartyContacts;
      this.addContractsForm.SecondPartyPhone = item.SecondPartyPhone;
      this.addContractsForm.SecondPartyEmail = item.SecondPartyEmail;
      this.addContractsForm.SecondPartyBank = item.SecondPartyBank;
      this.addContractsForm.SecondPartyBankNum = item.SecondPartyBankNum;
      this.addContractsForm.Remark = item.Remark;
      this.CopyContractNameVisible = false;
    },

    collapseClick() {
      this.isActive = !this.isActive
    },
    // 点击置为不显示
    hideClick(item) {
      this.showTitleArray.forEach((items, key) => {
        if (items == item) {
          this.showTitleArray.splice(key, 1);
        }
      })
      this.hideTitleArray.push(item);
    },
    // 点击置为显示
    showClick(item) {
      this.hideTitleArray.forEach((items, key) => {
        if (items == item) {
          this.hideTitleArray.splice(key, 1);
        }
      })
      this.showTitleArray.push(item);
    },
    // 提交自定义动态列
    ColumnSubmit() {
      var wheres = {
        showTitleArray: this.showTitleArray
      }
      this.ColumnSubmitLoading = true;
      ColumnTitleSubmit(wheres).then((res) => {
        if (res.success) {
          this.$message.success("操作成功");
          this.showTitleArray = [];
          this.hideTitleArray = [];
          // 通过路由重新加载页面
          this.reload();
        } else {
          this.$message.error(res.resultMessage);
        }
        this.titleDialogVisible = false;
        this.ColumnSubmitLoading = false;
      });
    },
    // 添加全部列
    addAll() {
      this.hideTitleArray.forEach((item) => {
        this.showTitleArray.push(item);
      });
      this.hideTitleArray = [];
    },
    // 重置数据
    resetColumn() {
      this.showTitleArray = [];
      this.hideTitleArray = [];
      this.showTitleArrayOld.forEach((item) => {
        this.showTitleArray.push(item)
      })
      this.hideTitleArrayOld.forEach((item) => {
        this.hideTitleArray.push(item)
      })
    },
    columnTitleSet() {
      this.titleDialogVisible = true;
    },
    titleDialogClosed() {
      this.titleDialogVisible = false;
    },
    // 执行列表右侧关联操作
    handleCommand(flag, row) {
      switch (flag) {
        case "a":
          this.showConnectDialog(row, 1);
          break;
        case "b":
          this.showConnectSaleDialog(row);
          break;
        case "c":
          this.showConnectDialog(row, 3);
          break;
        case "d":
          this.deleteDialog(row.Id);
          break
      }
    },
    // 执行上方按钮更多操作
    handleButtonCommand(flag) {
      switch (flag) {
        case "a":
          this.MapClick();
          break;
        case "b":
          this.updateConState();
          break;
        case "c":
          this.exportContracts();
          break;
        case "d":
          this.columnTitleSet();
          break;
      }
    },
    // 添加模块
    AddDialog() {
      this.AddCompanyForm.ComName = "";
      this.AddCompanyForm.ShortName = "";
      this.AddCompanyForm.ComAddress = "";
      this.AddCompanyForm.TaxpayerIdentificationNumber = "";
      this.inputValue = '';
      this.addDialogVisible = true;
    },
    // 搜索框的搜索事件
    confirmAddress(e) {
      // console.log("this.model.address:",this.model.address)
      if (this.inputValue != '') {
        // console.log("搜索字段为:" + this.inputValue)
        this.keyword = this.inputValue
      }

      // 为啥使用延时？？
      // 因为上面搜索框是change事件，变化的太快了看起来效果不好所以添加了延时
      // setTimeout(() => {
      // 搜索时把需要标点的地址传入local.search中
      var local = new BMap.LocalSearch(this.map, {
        renderOptions: { map: this.map }
      });
      local.search(this.keyword);
      // }, 600)
    },
    // baidu-map组件的ready事件
    mapReady({ BMap, map }) {
      this.BMap = BMap;
      this.map = map;

      geocoder = new BMap.Geocoder(); // 创建地址解析器的实例
      if (this.model.hasOwnProperty('address')) { // 如果当前model中包含address 则证明是修改弹框里面的地址数据（地址存在，打开弹框显示地址标点）
        this.keyword = this.model.address
        this.inputValue = this.model.address
      } else { // 否则显示默认标点（这里的经纬度代表成都）
        // 第二个参数  10 代表地图缩 放级别,最大为19,最小为0

        setTimeout(() => {
          this.map.centerAndZoom(new BMap.Point(116.40, 39.92), 12);
        }, 1000);
        this.keyword = ''
        this.inputValue = ''
      }
      // 点击百度地图上的搜索出来的红色标记点
      map.addEventListener("click", ({ point }) => {
        this.location.lng = point.lng;
        this.location.lat = point.lat;
        geocoder.getLocation(point, res => {
          this.inputValue = res.address;
          this.model.address = res.address;
          this.model.storeLongitude = point.lng
          this.model.storeLatitude = point.lat
          this.AddCompanyForm.ComAddress = res.address;
          this.AddCompanyForm.lng = point.lng;
          this.AddCompanyForm.lat = point.lat;

          this.$forceUpdate();
        });
      });
    },
    saveAdd() {
      this.LoadingAddCompany = true;
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) {
          this.LoadingAddCompany = false;
          return;
        }
        AddCompany(this.AddCompanyForm).then((res) => {
          if (res.success) {
            this.addDialogVisible = false;
            this.$message.success("操作成功");
            this.GetCompany();
          } else {
            this.$message.error(res.resultMessage);
          }
          this.LoadingAddCompany = false;
        });
      });
    },

    addDialogClosed() {
      this.$refs.addRef.resetFields();
    },
    MapClick() {
      this.$router.push({
        path: `/ContractEntry/ContractsMap?type=` + 2,
      });
    },
    // 添加-上传文件
    handleChange(file, fileList) {
      this.fileList = fileList
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
      this.addContractsForm.FileList = [];
      Uploads(formData).then(response => {
        if (response.success) {
          for (const index in response.result) {
            var addForm = {
              AttachmentName: response.result[index].AttachmentName,
              FileName: response.result[index].FileName,
            };
            // 给添加表单的列表赋值
            this.addContractsForm.FileList.push(addForm);
          }
          this.$message.success("上传成功");
        } else {
          this.$message.error(response.resultMessage);
        }
        this.uploadServerLoading = false;
      })
        .catch(err => {
          this.uploadServerLoading = false;
          this.$message.error("上传失败");
        })
    },
    AttachmentCodeRemove(file, fileList) {
      this.fileList = fileList
    },
    // AttachmentCodePreview(file) {
    //   window.open(file.url);
    // },
    // 修改-上传文件
    handleChangeUpdate(file, fileList) {
      this.fileListUpload = fileList
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
      this.updateDepFrom.FileList = [];
      Uploads(formData).then(response => {
        if (response.success) {
          for (const index in response.result) {
            var addForm = {
              AttachmentName: response.result[index].AttachmentName,
              FileName: response.result[index].FileName,
            };
            // 给添加表单的列表赋值
            this.updateDepFrom.FileList.push(addForm);
          }
          this.$message.success("上传成功");
        } else {
          this.$message.error(response.resultMessage);
        }
        this.uploadServerLoading = false;
      })
        .catch(err => {
          this.uploadServerLoading = false;
          this.$message.error("上传失败");
        })
    },
    AttachmentCodeRemoveUpdate(file, fileList) {
      this.fileListUpload = fileList
    },

    // 修改中对以前的文件进行编辑操作
    // beforeRemove(file, fileList) {
    //   return this.$confirm(`确定移除 ${file.name}？`);
    // },
    // handleRemove(file, fileList) {
    //   DeleteContractDetail(this.updateDepFrom.Id, file.name).then((res) => {
    //     if (res.success) {
    //       this.$message.success("操作成功！");
    //     } else {
    //       return this.$message.error(res.resultMessage);
    //     }
    //   });
    // },

    // 保存修改状态
    saveAuditStatusCheck() {
      this.auditStatusCheckLoading = true;
      SaveAuditStatus(
        this.updateConStateFrom.ContractCode,
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
    // 弹出修改审核状态窗口
    auditStatusCheck() {
      if (!this.updateConStateFrom.ContractCode) {
        this.$message.warning("请勾选要审核的数据！");
        return;
      }
      // 默认一个审核状态吧，录入-未送审
      this.auditStatusChange = '4';
      this.auditStatusCheckDialog = true;
    },

    // 根据不同状态渲染表格
    // tableRowClassName({ row, rowIndex }) {
    //   switch (row.ConState) {
    //     case "0":
    //       return "unknown";
    //     case "1":
    //       return "Executing";
    //     case "2":
    //       return "DueOutstanding";
    //     case "3":
    //       return "Closed";
    //   }
    //   return "";
    // },
    // InvoiceTypeStyle({ row, column, rowIndex, columnIndex }) {
    //   if (column.label === "合同状态") {      // 表格的第4列做处理
    //     switch (row.ConState) {
    //       case "0":
    //         return 'background:oldlace;'
    //       case "1":
    //         return 'background:#f0f9eb;'
    //       case "2":
    //         return 'background:#FEF0F0;'
    //       case "3":
    //         return 'background:#ECF5FF;'
    //     }
    //   }
    // },
    // 重置数据
    reseatData() {
      this.ArchivedType = '';
      this.ConMonth = getNowDate('month');
      this.ConState = '';
      this.ContractCode = '';
      this.ContractName = '';
      this.SecondPartyName = '';
      this.ComName = '';
      this.ContractType = '';
      this.BeginTime = '';
      this.EndTime = '';
      this.ContractSignTime = [];
      this.ConnectCompany = '';
      this.ExamineTime = [];
      this.AuditStatus = '';
      this.CreateUserId = '';
      this.queryInfo.pagesize = 20;
      this.queryInfo.pagenum = 1;
      this._getContractData();
    },

    // 保存修改状态
    saveUpdateState() {
      this.LoadingUpdateState = true;
      UpdateContractData(
        this.updateConStateFrom.ContractDetailCode,
        this.updateConStateFrom.ConState
      ).then((res) => {
        if (res.success) {
          this.updateConStateDialog = false;
          this.$message.success("操作成功");
          this.updateConStateFrom.ContractDetailCode = "";
          this._getContractData();
        } else {
          this.$message.error(res.resultMessage);
        }
        this.LoadingUpdateState = false;
      });
    },
    // 弹出修改合同状态窗口
    updateConState() {
      if (!this.updateConStateFrom.ContractDetailCode) {
        this.$message.warning("请勾选要修改合同状态的数据！");
        return;
      }
      // 默认一个状态吧，正在执行状态
      this.updateConStateFrom.ConState = "1";
      this.updateConStateDialog = true;
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
      PlaceFileMethod(this.updateDepFrom.ContractDetailCode).then((res) => {
        if (res.success) {
          this.$message.success("操作成功！");
          this.updateDepFrom.ArchivedType = 3;
          this._getContractData();
        } else {
          this.placeFileLoading = false;
          return this.$message.error(res.resultMessage);
        }
        this.placeFileLoading = false;
      });
    },
    // 送审
    async auditStatusAction(Code) {
      if (!this.updateConStateFrom.ContractCode) {
        this.$message.warning("请勾选要送审的数据！");
        return;
      }
      const confirmResult = await this.$confirm(
        "是否将选中合同送审?",
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
      SubmitForCensorship(this.updateConStateFrom.ContractCode).then((res) => {
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
    changeCompanyId(e) {
      var item = this.selectCorporationDatas.filter((item) => {
        return item.value == e;
      });
      if (item.length != 0)
        this.addContractsForm.FirstPartyName = item[0].label;
      this.changeCompany(item);
    },
    changeCompanyIdUpdate(e) {
      var item = this.selectCorporationDatas.filter((item) => {
        return item.value == e;
      });
      if (item.length != 0)
        this.updateDepFrom.FirstPartyName = item[0].label;
      this.changeCompany(item);
    },
    changeCompany(item) {
      let flags = this.LastValue;
      //如果有值证明已经选中过数据，那么需要先删除数据
      if (flags) {
        this.PayerArray = this.PayerArray.filter((o) => {
          return o.Code + "" !== this.LastValue + ""
        })
      }
      //下拉清空时查询不到数据需要做一下判断防止清空也会进入此方法
      if (item.length != 0) {
        let items = {
          Code: item[0].value,
          Name: item[0].label,
          Type: this.typeArray[Math.floor(Math.random() * 5)], //进行计算随机
        };
        //如果是先选择下面的关联关系后选择主公司的话可能会导致重复数据，需要查询一下，如果添加了，那么不需要再次添加了
        let ifExists = this.PayerArray.filter((o) => {
          return o.Code + "" == items.Code + ""
        })
        if (ifExists.length == 0)
          this.PayerArray.push(items);
        this.LastValue = item[0].value;
      }
      else {
        this.LastValue = null;
      }
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
          if (this.addContractsForm.domains.length == 0) {
            this.LoadingAdd = false;
            this.$message.warning("合同金额中请至少新增一个详细新增条目");
            return;
          }
          // 正向对比
          if (this.fileList.length != 0 || this.addContractsForm.FileList.length != 0) {
            for (const index in this.fileList) {
              var flag = this.addContractsForm.FileList.filter((item) => {
                return item.FileName == this.fileList[index].name;
              });
              if (flag.length == 0) {
                this.LoadingAdd = false;
                this.$message.warning("文件上传完成或者修改需要点击一下上传服务器");
                return;
              }
            }
          }
          // 反向对比
          if (this.fileList.length != 0 || this.addContractsForm.FileList.length != 0) {
            for (const index in this.addContractsForm.FileList) {
              var flag = this.fileList.filter((item) => {
                return item.name == this.addContractsForm.FileList[index].FileName;
              });

              if (flag.length == 0) {
                this.LoadingAdd = false;
                this.$message.warning("文件上传完成或者修改需要点击一下上传服务器");
                return;
              }
            }
          }
          if (this.addContractsForm.BeginTime >= this.addContractsForm.EndTime) {
            this.$message.warning("开始时间不能大于等于结束时间，请检查");
            this.LoadingAdd = false;
            return;
          }
          // 日期格式化
          this.addContractsForm.BeginTime = this.addContractsForm.BeginTime
            ? parseTime(this.addContractsForm.BeginTime, "{y}-{m}-{d}")
            : "";
          this.addContractsForm.EndTime = this.addContractsForm.EndTime
            ? parseTime(this.addContractsForm.EndTime, "{y}-{m}-{d}")
            : "";
          this.addContractsForm.ActualBeginTime = this.addContractsForm
            .ActualBeginTime
            ? parseTime(this.addContractsForm.ActualBeginTime, "{y}-{m}-{d}")
            : "";
          this.addContractsForm.ActualEndTime = this.addContractsForm
            .ActualEndTime
            ? parseTime(this.addContractsForm.ActualEndTime, "{y}-{m}-{d}")
            : "";
          this.addContractsForm.SignTime = this.addContractsForm.SignTime
            ? parseTime(this.addContractsForm.SignTime, "{y}-{m}-{d}")
            : "";
          this.addContractsForm.PayerArray = this.PayerArray;
          AddContract(this.addContractsForm).then((res) => {
            if (res.success) {
              this.$message.success("保存成功，乙方合同编号已生成");
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
    // 关闭远程搜索下拉时需要清空筛选出来的数据进行重新筛选
    clearselectCorporationDatas(e) {
      this.selectCorporationDatas = [];
    },
    // 弹出添加窗口
    ShowContractAddDialog() {
      //标识，判断是否时添加或者修改
      this.AddOrUpdateDialog = true;
      this.fileList = [];
      this.PayerArray = [];
      this.addContractsForm.FileList = [];
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
    // 复选框选中事件
    TableSelect(selection) {
      this.multipleSelection = [];
      // auditStatusdescription
      var oneCount = 0; var twoCount = 0; var threeCount = 0; var fourCount = 0; var fiveCount = 0;
      if (selection.length != 0) {
        this.updateConStateFrom.ContractDetailCode = "";
        this.updateConStateFrom.ContractCode = "";

        selection.forEach((element) => {
          // 修改合同状态时用到
          this.updateConStateFrom.ContractDetailCode +=
            element.ContractDetailCode + ",";
          // 送审时用到
          this.updateConStateFrom.ContractCode +=
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
        this.updateConStateFrom.ContractDetailCode =
          this.updateConStateFrom.ContractDetailCode.substring(
            0,
            this.updateConStateFrom.ContractDetailCode.lastIndexOf(",")
          );

        this.updateConStateFrom.ContractCode =
          this.updateConStateFrom.ContractCode.substring(
            0,
            this.updateConStateFrom.ContractCode.lastIndexOf(",")
          );
        this.auditStatusdescription = "选中合同中" +
          (oneCount == 0 ? "" : "审核状态为录入-未送审的有" + oneCount + "个；") +
          (twoCount == 0 ? "" : "审核状态为审核中的有" + twoCount + "个；") +
          (threeCount == 0 ? "" : "审核状态为审核失败的有" + threeCount + "个；") +
          (fourCount == 0 ? "" : "审核状态为审核成功的有" + fourCount + "个；") +
          (fiveCount == 0 ? "" : "审核状态为作废的有" + fiveCount + "个。")
      } else {
        this.updateConStateFrom.ContractDetailCode = "";
        this.updateConStateFrom.ContractCode = "";
        this.auditStatusdescription = "";
      }
      this.multipleSelection = selection;
    },
    showBackground({ row }) {
      const checkIdList = this.multipleSelection.map((item) => item.SecondContractNumberPrefix + item.CompanyName + item.CreationTimeString);
      if (checkIdList.includes(row.SecondContractNumberPrefix + row.CompanyName + row.CreationTimeString)) {
        return {
          backgroundColor: "#E6F7FF",
        };
      } else {
        return {
          backgroundColor: "#FFFFFF",
        };
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
    datetimeChange(time) {
      // 强制刷新
      this.$forceUpdate();
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
      scrollTo(0, 800)
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
          if (this.updateDepFrom.domains.length == 0) {
            this.LoadingUpdate = false;
            this.$message.warning("合同金额中请至少存在一个详细新增条目");
            return;
          }
          // 正向对比
          if (this.fileListUpload.length != 0 || this.updateDepFrom.FileList.length != 0) {
            for (const index in this.fileListUpload) {
              var flag = this.updateDepFrom.FileList.filter((item) => {
                return item.FileName == this.fileListUpload[index].name;
              });

              if (flag.length == 0) {
                this.LoadingUpdate = false;
                this.$message.warning("文件上传完成或者修改需要点击一下上传服务器");
                return;
              }
            }
          }
          // 反向对比
          if (this.fileListUpload.length != 0 || this.updateDepFrom.FileList.length != 0) {
            for (const index in this.updateDepFrom.FileList) {
              var flag = this.fileListUpload.filter((item) => {
                return item.name == this.updateDepFrom.FileList[index].FileName;
              });

              if (flag.length == 0) {
                this.LoadingUpdate = false;
                this.$message.warning("文件上传完成或者修改需要点击一下上传服务器");
                return;
              }
            }
          }
          if (this.updateDepFrom.BeginTime >= this.updateDepFrom.EndTime) {
            this.LoadingUpdate = false;
            this.$message.warning("开始时间不能大于等于结束时间，请检查");
            return;
          }
          // 日期格式化
          this.updateDepFrom.BeginTime = this.updateDepFrom.BeginTime
            ? parseTime(this.updateDepFrom.BeginTime, "{y}-{m}-{d}")
            : "";
          this.updateDepFrom.EndTime = this.updateDepFrom.EndTime
            ? parseTime(this.updateDepFrom.EndTime, "{y}-{m}-{d}")
            : "";
          this.updateDepFrom.ActualBeginTime = this.updateDepFrom
            .ActualBeginTime
            ? parseTime(this.updateDepFrom.ActualBeginTime, "{y}-{m}-{d}")
            : "";
          this.updateDepFrom.ActualEndTime = this.updateDepFrom.ActualEndTime
            ? parseTime(this.updateDepFrom.ActualEndTime, "{y}-{m}-{d}")
            : "";
          this.updateDepFrom.SignTime = this.updateDepFrom.SignTime
            ? parseTime(this.updateDepFrom.SignTime, "{y}-{m}-{d}")
            : "";
          this.updateDepFrom.PayerArray = this.PayerArray;
          UpdateContract(this.updateDepFrom).then((res) => {
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
      // let begin = "";
      // let end = "";
      // if (this.ContractRangeTime && this.ContractRangeTime.length > 0) {
      //   begin = this.$moment(this.ContractRangeTime[0]).format("YYYY-MM-DD");
      //   end = this.$moment(this.ContractRangeTime[1]).format("YYYY-MM-DD");
      // }
      if (this.ContractSignTime && this.ContractSignTime.length > 0) {
        this.BeginSignTime = this.$moment(this.ContractSignTime[0]).format("YYYY-MM-DD");
        this.EndSignTime = this.$moment(this.ContractSignTime[1]).format("YYYY-MM-DD");
      } else {
        this.BeginSignTime = '';
        this.EndSignTime = '';
      }

      if (this.ExamineTime && this.ExamineTime.length > 0) {
        this.BeginExamineTime = this.$moment(this.ExamineTime[0]).format("YYYY-MM-DD");
        this.EndExamineTime = this.$moment(this.ExamineTime[1]).format("YYYY-MM-DD");
      } else {
        this.BeginExamineTime = '';
        this.EndExamineTime = '';
      }
      if (this.BeginTime) { this.BeginTime = this.$moment(this.BeginTime).format("YYYY-MM-DD"); }
      if (this.EndTime) { this.EndTime = this.$moment(this.EndTime).format("YYYY-MM-DD"); }
      // if (this.BeginSignTime)
      //   this.BeginSignTime = this.$moment(this.BeginSignTime).format("YYYY-MM-DD");
      // if (this.EndSignTime)
      //   this.EndSignTime = this.$moment(this.EndSignTime).format("YYYY-MM-DD");
      const ConMonth = parseTime(this.ConMonth, "{y}-{m}");
      GetContractData(
        ConMonth,
        this.ConState,
        this.ContractCode,
        this.SecondPartyName,
        this.ComName,
        this.AuditStatus,
        this.ContractType,
        this.BeginTime,
        this.EndTime,
        this.BeginSignTime,
        this.EndSignTime,
        this.CreateUserId,
        this.BeginExamineTime,
        this.EndExamineTime,
        this.ConnectCompany,
        this.ArchivedType,
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
    exportContracts() {
      this.ExportLoading = true;
      this.isShowProgress = true;
      this.fakes.start();
      // let begin = "";
      // let end = "";
      // if (this.ContractRangeTime && this.ContractRangeTime.length > 0) {
      //   begin = this.$moment(this.ContractRangeTime[0]).format("YYYY-MM-DD");
      //   end = this.$moment(this.ContractRangeTime[1]).format("YYYY-MM-DD");
      // }
      if (this.ContractSignTime && this.ContractSignTime.length > 0) {
        this.BeginSignTime = this.$moment(this.ContractSignTime[0]).format("YYYY-MM-DD");
        this.EndSignTime = this.$moment(this.ContractSignTime[1]).format("YYYY-MM-DD");
      } else {
        this.BeginSignTime = '';
        this.EndSignTime = '';
      }
      if (this.ExamineTime && this.ExamineTime.length > 0) {
        this.BeginExamineTime = this.$moment(this.ExamineTime[0]).format("YYYY-MM-DD");
        this.EndExamineTime = this.$moment(this.ExamineTime[1]).format("YYYY-MM-DD");
      } else {
        this.BeginExamineTime = '';
        this.EndExamineTime = '';
      }
      if (this.BeginTime) { this.BeginTime = this.$moment(this.BeginTime).format("YYYY-MM-DD"); }
      if (this.EndTime) { this.EndTime = this.$moment(this.EndTime).format("YYYY-MM-DD"); }
      // if (this.BeginSignTime)
      //   this.BeginSignTime = this.$moment(this.BeginSignTime).format("YYYY-MM-DD");
      // if (this.EndSignTime)
      //   this.EndSignTime = this.$moment(this.EndSignTime).format("YYYY-MM-DD");
      const ConMonth = parseTime(this.ConMonth, "{y}-{m}");
      GetContractDataExport(
        ConMonth,
        this.ConState,
        this.ContractCode,
        this.SecondPartyName,
        this.ComName,
        this.AuditStatus,
        this.ContractType,
        this.BeginTime,
        this.EndTime,
        this.BeginSignTime,
        this.EndSignTime,
        this.CreateUserId,
        this.BeginExamineTime,
        this.EndExamineTime,
        this.ConnectCompany,
        this.ArchivedType,
        1,
        100000
      ).then((res) => {
        this.fakes.end();
        //初始化进度条
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
      //标识，判断是否时添加或者修改
      this.AddOrUpdateDialog = false;
      this.PayerArray = [];
      this.LastValue = item.CompanyId;
      item.PayerCodeArray.forEach((payerItem) => {
        let getItem = this.companyList.filter((itemCom) => {
          return itemCom.ComID == payerItem;
        });
        let items = {
          Code: getItem[0].ComID,
          Name: getItem[0].ComName,
          Type: this.typeArray[Math.floor(Math.random() * 5)], //进行计算随机
        };
        this.PayerArray.push(items);
      })

      this.fullscreenLoading = true;
      this.CompanyRelationList = item.CompanyRelationList;
      this.updateDepFrom.CompanyId = item.CompanyId;
      this.remoteMethodShow(item.CompanyId);
      this.remoteMethodShowParent(item.ParentContractCode);
      // this.updateDepFrom = item;
      // 存储历史合同总金额以便对备注做判断
      this.OldContractAmount = item.ContractAmount;
      this.updateDepFrom.ArchivedType = item.ArchivedType;
      this.updateDepFrom.ContractDetailCode = item.ContractDetailCode;
      this.updateDepFrom.domains = item.domains;
      this.updateDepFrom.BeginTime = item.BeginTimeString;
      this.updateDepFrom.EndTime = item.EndTimeString;
      this.updateDepFrom.ContractAmount = item.ContractAmountString;
      this.updateDepFrom.SignTime = item.SignTimeString;
      this.updateDepFrom.PaymentMethod = !item.PaymentMethod && item.PaymentMethod != 0
        ? null
        : item.PaymentMethod + "";
      this.updateDepFrom.ActualBeginTime = item.ActualBeginTimeString;
      this.updateDepFrom.ActualEndTime = item.ActualEndTimeString;
      this.updateDepFrom.SaleId = item.SaleId ? item.SaleId.toUpperCase() : '';
      this.fileListUpload = [];
      this.updateDepFrom.FileList = [];
      this.updateDepFrom.SecondContractNumberPrefix = item.SecondContractNumberPrefix;
      this.updateDepFrom.ContractName = item.ContractName;
      this.updateDepFrom.ContractType = item.ContractType;
      this.updateDepFrom.ContractCode = item.ContractCode;
      this.updateDepFrom.ProfitMargin = item.ProfitMargin;
      this.updateDepFrom.Percentage = item.Percentage;
      this.updateDepFrom.FirstPartyName = item.FirstPartyName;
      this.updateDepFrom.FirstPartyAddress = item.FirstPartyAddress;
      this.updateDepFrom.FirstPartyContacts = item.FirstPartyContacts;
      this.updateDepFrom.FirstPartyPhone = item.FirstPartyPhone;
      this.updateDepFrom.FirstPartyEmail = item.FirstPartyEmail;
      this.updateDepFrom.FirstPartyBank = item.FirstPartyBank;
      this.updateDepFrom.FirstPartyBankNum = item.FirstPartyBankNum;
      this.updateDepFrom.SecondPartyName = item.SecondPartyName;
      this.updateDepFrom.SecondPartyAddress = item.SecondPartyAddress;
      this.updateDepFrom.SecondPartyContacts = item.SecondPartyContacts;
      this.updateDepFrom.SecondPartyPhone = item.SecondPartyPhone;
      this.updateDepFrom.SecondPartyEmail = item.SecondPartyEmail;
      this.updateDepFrom.SecondPartyBank = item.SecondPartyBank;
      this.updateDepFrom.SecondPartyBankNum = item.SecondPartyBankNum;
      this.updateDepFrom.Id = item.Id;
      this.updateDepFrom.Remark = item.Remark;
      this.updateDepFrom.YearBatch = item.YearBatch;
      this.updateDepFrom.ContractSubjectId = item.ContractSubjectId;
      this.updateDepFrom.UnitPrice = item.UnitPrice ? item.UnitPrice.toString() : item.UnitPrice == 0 ? '0' : '';
      this.updateDepFrom.Quantity = item.Quantity ? item.Quantity.toString() : item.Quantity == 0 ? '0' : '';
      this.updateDepFrom.ParentContractCode = item.ParentContractCode;
      this.updateDepFrom.ContractAmountDetail = item.ContractAmountDetail;
      this.updateDialogVisible = true;
      // 除了财务 审核成功能修改   
      if (sessionStorage.getItem("RoleName") != "超级管理员" && sessionStorage.getItem("RoleName") != "财务"
        && sessionStorage.getItem("RoleName") != "总客服" && sessionStorage.getItem("RoleName") != "HRO管理员") {
        if (item.AuditStatus == 4) { this.updateShowFlag = true; } else { this.updateShowFlag = false; }
      } else {
        this.updateShowFlag = false;
      }
      //  <!-- 是否禁用规则现在变成了如果有值就做判断是否隐藏与显示，如果没有值那么所有人都能修改 -->
      // this.PercentageFlag = this.updateDepFrom.Percentage ? this.updateShowFlag : false;
      // this.ContractAmountFlag = this.updateDepFrom.ContractAmount ? this.updateShowFlag : false;
      // this.SaleIdFlag = this.updateDepFrom.SaleId ? this.updateShowFlag : false;
      // this.PaymentMethodFlag = this.updateDepFrom.PaymentMethod ? this.updateShowFlag : false;
      this.UnitPriceFlag = this.updateDepFrom.domains.length.length == 0 ? false : this.updateShowFlag;
      // this.ParentContractCodeFlag = this.updateDepFrom.ParentContractCode ? this.updateShowFlag : false;
      // this.ContractAmountDetailFlag = this.updateShowFlag;
      // 根据合同编号反填附件
      GetAttachmentFirst(2, item.Id).then((res) => {
        if (res.success) {
          this.updateDepFrom.FileLists = res.result;
          this.fullscreenLoading = false;
        } else {
          this.updateDepFrom.FileLists = [];
        }
      });
    },
    // 只有未送审的有删除功能
    async deleteDialog(Id) {
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
      DeleteContractInfo(Id).then((res) => {
        if (res.success) {
          this.$message.success("操作成功！");
          this._getContractData();
          hideLoading();
        } else {
          hideLoading();
          return this.$message.error(res.resultMessage);
        }
      });
    },
    // 弹出关联公司窗口
    showConnectDialog(item, type) {
      // 加载数据的loading
      this.connectLoading = true;
      // 合同编号
      this.BindCompanyA.ContractId = item.Id;
      // 弹窗是否显示
      this.connectDialogVisible = true;
      // 绑定弹出时的类型（1公司2销售人员3客服）
      this.BindCompanyA.ConnectType = type;
      switch (type) {
        case 1:
          this.connecttitles = ['未关联公司', '已关联公司'];
          this.buttonTexts = ['取关', '关联'];
          this.filterPlaceholder = '请输入公司名称';
          this.transferProps = { key: 'ComID', label: 'ComName', disabled: 'disabled' };
          this.connectTitle = "关联公司";
          // 加载所有公司列表（和之前的不一样，需要重新加载，就重新加载吧，其实也没必要重新加载）
          // this.GetCompanyNameAData();
          this.CompanyNameAList = this.companyList;
          break;
        case 2:
          this.connecttitles = ['未关联销售人员', '已关联销售人员'];
          this.buttonTexts = ['取关', '关联'];
          this.filterPlaceholder = '请输入销售人员名称';
          this.transferProps = { key: 'UserID', label: 'UserName', disabled: 'disabled' };
          this.connectTitle = "关联销售";
          this.CompanyNameAList = this.UserList;
          break;
        case 3:
          this.connecttitles = ['未关联客服', '已关联客服'];
          this.buttonTexts = ['取关', '关联'];
          this.filterPlaceholder = '请输入客服名称';
          this.transferProps = { key: 'UserID', label: 'UserName', disabled: 'disabled' };
          this.connectTitle = "关联客服";
          // if (!this.editButtonShow) {
          //   this.CompanyNameAList = [];
          //   this.UserList.forEach(element => {

          //     this.CompanyNameAList.push({
          //       UserID: element.UserID,
          //       UserName: element.UserName,
          //       disabled: true,
          //     })
          //   });
          // }
          // else {

          //   this.CompanyNameAList = this.UserList;
          // }
          this.CompanyNameAList = this.UserList;
          break;
      }
      // 根据合同编号获取绑定公司数组
      this.GetCompanyABy_Contract(item.Id, type);
    },
    // 获取甲方公司列表数据
    // GetCompanyNameAData() {
    //   GetCompanyNameAData().then((res) => {
    //     if (res.success) {
    //       this.CompanyNameAList = res.result;
    //       //    for (let i = 1; i <= 50000; i++) {
    //       //     this.CompanyNameAList.push({
    //       //         key: i,
    //       //         label: `备选项备选项备选项备选项 ${i}`
    //       //     });
    //       // }
    //     } else {
    //       this.CompanyNameAList = [];
    //     }
    //     this.connectLoading = false;
    //   });
    // },
    closeLoading() {
      // 清楚穿梭框查询条件
      const { transferCom } = this.$refs;
      if (transferCom) {
        // 清空左边搜索
        transferCom.$children['0']._data.query = '';
        // 清空右边搜索
        transferCom.$children['3']._data.query = '';
      }
      // 清空选中项
      transferCom.$refs.leftPanel.checked = [];
      transferCom.$refs.rightPanel.checked = [];

      this.connectLoading = false;
      this.connectDialogVisible = false;
    },
    cloLoading() {
      // 清楚穿梭框查询条件
      const { transferCom } = this.$refs;
      if (transferCom) {
        // 清空左边搜索
        transferCom.$children['0']._data.query = '';
        // 清空右边搜索
        transferCom.$children['3']._data.query = '';
      }
      // 清空选中项
      transferCom.$refs.leftPanel.checked = [];
      transferCom.$refs.rightPanel.checked = [];
      this.conDialogVisible = false;
    },
    // 弹出销售人员窗口
    showConnectSaleDialog(item) {
      // 合同编号
      this.addSaleForm.ContractId = item.Id;
      this.addSaleForm.AuditStatus = item.AuditStatus;
      this.connectSaleDialogVisible = true;
      this.GetSaleDatas(item.Id);
    },
    // 获取绑定的销售人员数据
    GetSaleDatas(ContractId) {
      this.saleLoading = true;

      GetSaleData(ContractId).then((res) => {
        if (res.success) {
          this.SaleDataArray = res.result;
        } else {
          this.$message.error("获取绑定数据失败！");
        }
        this.saleLoading = false;
      });
    },
    // 删除绑定数据
    deleteSale(item) {
      this.saleLoading = true;
      // 除了财务 审核中和审核成功   部分编辑 只能编辑文件和备注
      if (sessionStorage.getItem("RoleName") != "超级管理员" && sessionStorage.getItem("RoleName") != "财务") {
        if (this.addSaleForm.AuditStatus == 2 || this.addSaleForm.AuditStatus == 4) {
          this.$message.warning("已送审或审核成功后不可删除销售人员");
          this.saleLoading = false;
          return;
        }
      }
      deleteSaleData(item.ContractRelationCode).then((res) => {
        if (res.success) {
          this.GetSaleDatas(this.addSaleForm.ContractId);
          this.$message.success("取消绑定成功");
        } else {
          this.$message.error(res.resultMessage);
        }
        this.saleLoading = false;
      });
    },
    // 关闭前重置数据
    closeSaleLoading() {
      this.$refs.addSaleRef.resetFields();
      this.LoadingSaleUpdate = false;
      this.connectSaleDialogVisible = false;
    },
    // 提交销售人员数据
    saveSale() {
      this.LoadingSaleUpdate = true;

      // 除了财务 审核中和审核成功   部分编辑 只能编辑文件和备注
      if (sessionStorage.getItem("RoleName") != "超级管理员" && sessionStorage.getItem("RoleName") != "财务") {
        if (this.addSaleForm.AuditStatus == 2 || this.addSaleForm.AuditStatus == 4) {
          this.$message.warning("已送审或审核成功后不可添加销售人员");
          this.LoadingSaleUpdate = false;
          return;
        }
      }

      this.$refs.addSaleRef.validate(async (valid) => {
        if (!valid) {
          this.LoadingSaleUpdate = false;
          return;
        }
        BindSale(this.addSaleForm.ContractId, this.addSaleForm.SaleId, this.addSaleForm.Percentage).then((res) => {
          if (res.success) {
            this.GetSaleDatas(this.addSaleForm.ContractId);
            this.$refs.addSaleRef.resetFields();
            this.$message.success("绑定成功");
          } else {
            this.$message.error(res.resultMessage);
          }
          this.LoadingSaleUpdate = false;
        });
      });
    },
    // 获取绑定的公司编号数据
    GetCompanyABy_Contract(ContractId, type) {
      GetCompanyABy_Contract(ContractId, type).then((res) => {
        if (res.success) {
          this.BindCompanyA.ComAArray = res.result;
        } else {
          this.BindCompanyA.ComAArray = [];
        }
        this.connectLoading = false;
      });
    },
    // 绑定公司数据
    saveConnectUpdate() {
      this.LoadingRoleUpdate = true;
      BindCompanyABy_Contract(this.BindCompanyA).then((res) => {
        if (res.success) {
          this.$message.success("绑定成功");
        } else {
          this.$message.error(res.resultMessage);
        }
        this.LoadingRoleUpdate = false;
      });
    },
    // 获取合同名称下拉数据
    GetContractNameconfig() {
      GetContractNameconfig("", 1, 100000).then((res) => {
        if (res.success) {
          this.ContractNameconfigList = res.result.list;
        } else {
          this.ContractNameconfigList = [];
        }
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

          this.companyList = res.result.map((item) => {
            return {
              ComID: item.ComID + "",
              ComName: item.ComName,
            };
          });
          this.CompanyNameAList = this.companyList;
        } else {
          this.companyList = [];
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
    // 获取支付方式数据
    GetPaymentMethod() {
      GetDicCategory("PaymentMethod").then((res) => {
        if (res.success) {
          res.result.forEach((item) => {
            let fee = '';
            switch (item.Code) {
              case '0':
              case '12':
                fee = 'x 1';
                break;
              case '1':
                fee = 'x 12';
                break;
              case '3':
                fee = 'x 4';
                break;
              case '6':
                fee = 'x 2';
                break;
            }
            this.PaymentMethodList.push({
              Id: item.Id,
              Module: item.Module,
              Code: item.Code,
              Name: item.Name,
              Sort: item.Sort,
              Fee: fee,
            });
          });
        } else {
          this.PaymentMethodList = [];
        }
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
    GetColumnByUserMethod() {
      GetColumnByUser("客户合同录入").then((res) => {
        if (res.success) {
          this.ColumnByUserList = res.result;
          // 证明已经绑定了动态列，没绑定默认展示全部
          if (res.result.length != 0) {
            // 给显示、隐藏的标签数组赋值
            this.TitleArray.forEach((item) => {
              if (res.result.indexOf(item) == -1) {
                this.hideTitleArray.push(item);
                this.hideTitleArrayOld.push(item);
              } else {
                this.showTitleArray.push(item);
                this.showTitleArrayOld.push(item);
              }
            })
            this.ifSecondContractNumberPrefix = false;
            this.ifAuditStatusName = false;
            this.ifContractNameStr = false;
            this.ifArchivedType = false;
            this.ifCompanyName = false;
            this.ifName = false;
            this.ifConStateName = false;
            this.ifParentContractCode = false;
            this.ifBeginTimeString = false;
            this.ifEndTimeString = false;
            this.ifPercentage = false;
            this.ifContractAmount = false;
            this.ifUnitPrice = false;
            this.ifQuantity = false;
            this.ifSaleName = false;
            this.ifPaymentMethodString = false;
            this.ifFirstPartyName = false;
            this.ifSecondPartyName = false;
            this.ifCreateUserName = false;
            this.ifCreationTimeString = false;
            this.ifSubmitCensorshipTimeStr = false;
            this.ifExamineTimeStr = false;
            res.result.forEach((item) => {
              this.ShowColumn(item)
            })
          } else {
            this.TitleArray.forEach((item) => {
              this.showTitleArray.push(item);
              this.showTitleArrayOld.push(item);
            })
          }
        } else {
          this.ColumnByUserList = [];
        }
      });
    },
    ShowColumn(MenuName) {
      switch (MenuName) {
        case "乙方合同编号":
          this.ifSecondContractNumberPrefix = true;
          break;
        case "审核状态":
          this.ifAuditStatusName = true;
          break;
        case "归档类型":
          this.ifArchivedType = true;
          break;
        case "合同名称":
          this.ifContractNameStr = true;
          break;
        case "公司名称":
          this.ifCompanyName = true;
          break;
        case "合同类型":
          this.ifName = true;
          break;
        case "合同状态":
          this.ifConStateName = true;
          break;
        case "有无关联合同":
          this.ifParentContractCode = true;
          break;
        case "开始时间":
          this.ifBeginTimeString = true;
          break;
        case "结束时间":
          this.ifEndTimeString = true;
          break;
        case "提成占比":
          this.ifPercentage = true;
          break;
        case "销售人员":
          this.ifSaleName = true;
          break;
        case "单价":
          this.ifUnitPrice = true;
          break;
        case "数量":
          this.ifQuantity = true;
          break;
        case "缴费方式":
          this.ifPaymentMethodString = true;
          break;
        case "合同金额":
          this.ifContractAmount = true;
          break;
        case "甲方名称":
          this.ifFirstPartyName = true;
          break;
        case "乙方名称":
          this.ifSecondPartyName = true;
          break;
        case "添加人":
          this.ifCreateUserName = true;
          break;
        case "添加时间":
          this.ifCreationTimeString = true;
          break;
        case "送审时间":
          this.ifSubmitCensorshipTimeStr = true;
          break;
        case "审核时间":
          this.ifExamineTimeStr = true;
          break;
      }
    },
    HideColumn(MenuName) {
      switch (MenuName) {
        case "乙方合同编号":
          this.ifSecondContractNumberPrefix = false;
          break;
        case "审核状态":
          this.ifAuditStatusName = false;
          break;
        case "归档类型":
          this.ifArchivedType = false;
          break;
        case "合同名称":
          this.ifContractNameStr = false;
          break;
        case "公司名称":
          this.ifCompanyName = false;
          break;
        case "合同类型":
          this.ifName = false;
          break;
        case "合同状态":
          this.ifConStateName = false;
          break;
        case "有无关联合同":
          this.ifParentContractCode = false;
          break;
        case "开始时间":
          this.ifBeginTimeString = false;
          break;
        case "结束时间":
          this.ifEndTimeString = false;
          break;
        case "提成占比":
          this.ifPercentage = false;
          break;
        case "销售人员":
          this.ifSaleName = false;
          break;
        case "单价":
          this.ifUnitPrice = false;
          break;
        case "数量":
          this.ifQuantity = false;
          break;
        case "缴费方式":
          this.ifPaymentMethodString = false;
          break;
        case "合同金额":
          this.ifContractAmount = false;
          break;
        case "甲方名称":
          this.ifFirstPartyName = false;
          break;
        case "乙方名称":
          this.ifSecondPartyName = false;
          break;
        case "添加人":
          this.ifCreateUserName = false;
          break;
        case "添加时间":
          this.ifCreationTimeString = false;
          break;
        case "送审时间":
          this.ifSubmitCensorshipTimeStr = false;
          break;
        case "审核时间":
          this.ifExamineTimeStr = false;
          break;
      }
    },
    // 查询是否有导出权限true 有 false没有
    IfExistsExportUserMethod() {
      IfExistsExportUser().then((res) => {
        if (res.success) { this.IfExistsExportUserFlag = true; } else { this.IfExistsExportUserFlag = false; }
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
    // 输入过滤
    remoteMethod(query) {
      if (query !== "") {
        setTimeout(() => {
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
        setTimeout(() => {
          this.selectCorporationDatas = this.CorporationDatas.filter((item) => {
            return item.value == query;
          });
        }, 200);
      } else {
        this.selectCorporationDatas = [];
      }
    },
    fixedShowMethod(newVal) {
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
/* 如果在行中存在按钮（标签除外），可能会导致行高不一致问题，那么需要在页面中加上这一句 */
/* .el-button--small,
.el-button--small.is-round {
  padding: 4px 15px;
} */
::v-deep .hoverClass {
  cursor: pointer;
}

::v-deep .hoverClass:hover {
  color: #409EFF;
}

.MiddleClass {
  margin-top: 10px;
}

.buttonCenter {
  text-align: center;
  margin-top: 20px;
}

.formClass {
  overflow-y: scroll;
  height: calc(100vh - 250px);
  width: 100%;
}

.formClassTable {
  overflow-y: scroll;
  width: 100%;
}

.rangeTimeClass {
  width: 100%;
}

.timeClass {
  width: 100%;
}

.timeHalfClass {
  width: 50%;
}

.demonstration {
  font-size: small;
  margin-left: 10px;
}

.whereFormClass {
  margin-bottom: 15px;
  width: 100%;
}

.Executing {
  background-color: #f0f9eb;
}

.Closed {
  background-color: #ECF5FF;
}

.unknown {
  background-color: oldlace;
}

.DueOutstanding {
  background-color: #FEF0F0;
}

/* .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
    background-color: #F5F7FA;
} */
.el-dropdown {
  float: left;
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
.addItemClass {
  color: #000000d9;
  border-color: #d9d9d9;
  background: #fff;
  border-style: dashed;
}
</style>
<style>
.el-table .Executing {
  background: #f0f9eb;
}

.el-table .Closed {
  background: #ECF5FF;
}

.el-table .unknown {
  background: oldlace;
}

.el-table .DueOutstanding {
  background: #FEF0F0;
}

/* 修改穿梭框的样式，如果不加!important 那么修改主题颜色时样式会有问题 */
.el-transfer-panel {
  width: 350px !important;
  height: calc(100vh - 300px) !important;
}

.el-transfer-panel__list.is-filterable {
  height: calc(100vh - 400px) !important;
}

.bm-view {
  display: block;
  width: 100%;
  height: calc(100vh - 560px);
}

.BMap_noprint.anchorTL {
  width: 35%;
  top: 10px !important;
  left: 10px !important;
}

.el-button.is-circle {
  padding-left: 14px;
  padding-top: 4px;

}

.CompanySelectClass {
  float: left;
  width: calc(100% - 45px)
}

.CompanySelectClassCopy {
  float: left;

}



.el-transfer__buttons .el-button {
  padding: 9px 15px;
}

.clearfix {
  padding: 0;

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

.SaleClass .el-form-item--small.el-form-item {
  margin-bottom: 0;
}

/* //el-popover弹出层过渡效果 */
.companyNameTransition-enter-active,
.companyNameTransition-leave-active {
  transition: all.3s;
}

.companyNameTransition-enter,
.companyNameTransition-leave-to {
  opacity: 0;
  transform: translate(-50px, 50px) scale(0.3);
}

/* 下面是编辑中文档预览样式 */
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  /* margin-top: 13px; */
  line-height: 12px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.button {
  margin-left: 1rem;
}

.uploadClass {
  font-size: 12px;
  color: #606266;
  margin-top: 7px;
}

</style>
