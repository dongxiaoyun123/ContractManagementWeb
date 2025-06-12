<template>
  <div style="padding: 8px">
    <el-card>
      <el-form label-width="90px">
        <!-- 合同信息 -->
        <div slot="header" class="clearfix">
          <span>合同信息</span>
        </div>
        <el-row>
          <el-row>
            <collapse>
              <div v-show="isActive">
                <el-row>
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <el-form-item label="领取状态">
                      <el-select
                        v-model="States"
                        class="comentClass"
                        filterable
                        placeholder="领取状态"
                        clearable=""
                        collapse-tags
                      >
                        <el-option
                          v-for="item in PaymentCollectionStateArray"
                          :key="item.Code"
                          :label="item.Name"
                          :value="item.Code"
                        >
                          <template>
                            <!-- <el-tag effect="plain" key="全部"  type="info" v-if="item.Code == 0">全部</el-tag> -->
                            <el-tag
                              v-if="item.Code == 1"
                              key="未领取"
                              effect="plain"
                              type="danger"
                            >未领取（含部分领取）</el-tag>
                            <el-tag
                              v-if="item.Code == 2"
                              key="已领取"
                              effect="plain"
                              type="success"
                            >已领取</el-tag>
                            <!-- <el-tag
                              v-if="item.Code == 3"
                              key="部分领取"
                              effect="plain"
                              type="warning"
                              >部分领取</el-tag
                            > -->
                            <el-tag
                              v-if="item.Code == 4"
                              key="系统领取"
                              effect="plain"
                            >系统领取</el-tag>
                          </template>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <el-form-item label="公司名称">
                      <el-input
                        v-model="Condition"
                        clearable
                        placeholder="公司名称"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <el-form-item label="到账时间">
                      <el-date-picker
                        v-model="PaymentDate"
                        class="comentClass"
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
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <el-form-item label="收款公司" prop="SecondPartyName">
                      <el-select
                        v-model="SecondPartyName"
                        class="comentClass"
                        filterable
                        placeholder="收款公司"
                        clearable=""
                      >
                        <el-option
                          v-for="item in DicCategoryList"
                          :key="item.Id"
                          :label="item.Name"
                          :value="item.Id"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </collapse>
            <!-- <el-col
              :xs="24"
              :sm="6"
              :md="6"
              :lg="6"
              :xl="6"
              v-if="RoleName != '客服'"
            >
              <el-form-item class="comentBottomClass" label="合同类型">
                <el-select
                  v-model="ContractType"
                  class="comentClass"
                  filterable
                  placeholder="合同类型"
                  clearable=""
                  multiple
                  collapse-tags
                  disabled
                >
                  <el-option
                    v-for="item in GetContractTypeArray"
                    :key="item.Code"
                    :label="item.Name"
                    :value="item.Code"
                  />
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item label="收取人" class="comentBottomClass">
                <el-select
                  v-model="CreateUserId"
                  class="comentClass"
                  filterable
                  placeholder="收取人"
                  clearable=""
                >
                  <el-option
                    v-for="item in UserList"
                    :key="item.UserID"
                    :label="item.UserName"
                    :value="item.UserID"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-button-group style="margin-left: 1.3rem">
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  @click="GetAdmin_PermissionSearch"
                >查 询
                </el-button>
                <el-dropdown
                  trigger="click"
                  style="margin-left: 0"
                  @command="
                    (command) => {
                      handleButtonCommand(command);
                    }
                  "
                >
                  <el-button type="success">
                    更 多<i class="el-icon-arrow-down el-icon--right" />
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      :disabled="IfUser"
                      command="a"
                      icon="el-icon-download"
                    >模板下载{{ "\xa0\xa0" }}
                    </el-dropdown-item>
                    <el-dropdown-item
                      :disabled="IfUser"
                      command="b"
                      icon="el-icon-upload2"
                    >上传文件 {{ "\xa0\xa0" }}
                    </el-dropdown-item>
                    <el-dropdown-item
                      :disabled="!StatesShow"
                      command="c"
                      icon="el-icon-document"
                    >导出数据 {{ "\xa0\xa0" }}</el-dropdown-item>
                    <el-dropdown-item
                      :disabled="IfUser"
                      command="e"
                      icon="el-icon-delete"
                    >批量撤回 {{ "\xa0\xa0" }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button
                  type="text"
                  style="margin-left: 10px"
                  :icon="
                    isActiveAll
                      ? 'el-icon-arrow-up el-icon--right'
                      : 'el-icon-arrow-down el-icon--right'
                  "
                  @click="collapseClickAll"
                >{{ isActiveAll ? "收起统计" : "展开统计" }}</el-button>
              </el-button-group>
              <el-popover
                transition="TipTransition"
                placement="left"
                width="400"
                trigger="click"
                style="float: right"
              >
                <div style="margin: 15px">
                  <el-collapse v-model="activeName">
                    <el-collapse-item name="1">
                      <template slot="title">
                        <svg-icon icon-class="Customer" />{{ "\xa0" }}
                        （客服）数据不显示问题：
                      </template>
                      <div class="ContentDes">
                        1.
                        登录客服系统检查自己账号下是否存在该公司（合同方和付款方）（如果没有完全一致的公司名称则需要在客服系统中添加一个新的付款方然后刷新当前页面即可显示）
                      </div>
                      <div class="ContentDes">
                        2.
                        在本系统中（系统管理—关联用户）中查看是否已经关联了所需要的用户，如果没有关联先关联成功后即可看到此账号下关联的合同方
                      </div>
                      <!-- <div class="ContentDes">
                        3. 和合同类型的关联关系默认医疗、意外、雇主险、单工伤
                      </div> -->
                    </el-collapse-item>
                    <el-collapse-item name="2">
                      <template slot="title">
                        <svg-icon icon-class="Hro" />{{ "\xa0" }}
                        （HRO、运营）数据不能回款问题：
                      </template>
                      <div class="ContentDes">
                        1.
                        权限为根据自己绑定的合同类型、下级人员、自己添加的合同得到甲方公司(包括付款方)与导入公司名称进行匹配得到要回款的数据
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </div>
                <svg-icon
                  slot="reference"
                  class="WarningIcon"
                  icon-class="Info"
                />
              </el-popover>
            </el-col>
          </el-row>
          <collapse>
            <div v-show="isActiveAll">
              <el-descriptions
                style="margin-left: 1.3rem; margin-top: 18px"
                class="margin-top"
                :column="descriptionColumn"
                border
              >
                <el-descriptions-item
                  v-for="(item, index) in TotalSecondPartyNameList"
                  :key="index"
                  :label-style="DescriptionStyle"
                >
                  <template slot="label">
                    <i class="el-icon-money" />
                    {{ item.SecondPartyName }}
                  </template>
                  <div>
                    <el-tooltip
                      v-if="item.Sum > 0"
                      class="item"
                      :content="item.SumDetail"
                      placement="bottom"
                    >
                      <span v-format="'¥#,##0.00'" style="font-weight: bold">{{
                        item.Sum
                      }}</span>
                    </el-tooltip>
                    <span
                      v-else
                      v-format="'¥#,##0.00'"
                      style="font-weight: bold"
                    >{{ item.Sum }}</span>
                  </div>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </collapse>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="CardTableClass">
      <el-table
        ref="multipleTable"
        v-loading="loading"
        class="tableCheckClass"
        :data="CollectionList"
        fit
        :cell-style="showBackground"
        @selection-change="TableSelect"
        @row-click="toggleSelection"
      >
        <el-table-column type="selection" width="50" />
        <el-table-column
          prop="EnterPriseName"
          label="公司名称"
          min-width="200"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div v-if="scope.row.LogData.length != 0">
              <span
                v-for="(item, index) in scope.row.getLogTypeData"
                :key="index"
              >
                <el-tag
                  v-if="item == '收款'"
                  :key="item"
                  type="success"
                  style="margin-right: 5px"
                >
                  增
                </el-tag>
                <el-tag
                  v-else-if="item == '退款'"
                  :key="item"
                  type="danger"
                  style="margin-right: 5px"
                >
                  退
                </el-tag>
              </span>
              <el-popover
                transition="companyNameTransition"
                placement="right"
                width="400"
                title="退款&收款（详情）"
              >
                <el-table :data="scope.row.LogData">
                  <el-table-column
                    width="80"
                    prop="MenuDescription"
                    label="退款类型"
                  >
                    <template slot-scope="scopeC">
                      <span
                        v-if="scopeC.row.MenuDescription == '退款'"
                        style="color: #ff4949 !important"
                      >{{ scopeC.row.MenuDescription }}</span>
                      <span
                        v-if="scopeC.row.MenuDescription == '收款'"
                        style="color: #13ce66"
                      >{{ scopeC.row.MenuDescription }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    width="140"
                    prop="Description"
                    label="描述"
                  />
                  <el-table-column
                    width="150"
                    prop="CreateTime"
                    label="添加时间"
                  >
                    <template slot-scope="scopeS">
                      <i class="el-icon-time" />
                      <span style="margin-left: 6px">{{
                        dateTimeFormat(scopeS.row.CreateTime)
                      }}</span>
                    </template>
                  </el-table-column>
                </el-table>
                <el-button
                  slot="reference"
                  style="padding: 0"
                  type="text"
                  size="mini"
                >
                  {{ scope.row.EnterPriseName }}
                </el-button>
              </el-popover>
            </div>
            <div v-else>
              {{ scope.row.EnterPriseName }}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="SecondPartyName"
          label="收款公司"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="{}">
            <span>收款公司</span>
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
                  <span slot="reference" style="margin-right: 10px">
                    <div
                      v-for="(item, index) in companies"
                      :key="index"
                      :style="{
                        marginBottom:
                          index == companies.length - 1 ? '0' : '10px',
                      }"
                    >
                      <i
                        class="dotClass"
                        :style="{ backgroundColor: item.color }"
                      />{{ "\xa0\xa0" }}{{ item.name }}
                    </div>
                  </span>
                </div>
              </div>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <div style="display: flex; align-items: center">
              <template>
                <span slot="reference" style="margin-right: 8px">
                  <i
                    v-for="company in matchedCompanies(
                      scope.row.SecondPartyName
                    )"
                    :key="company.name"
                    class="dotClass"
                    :style="{ backgroundColor: company.color }"
                  />
                </span>
              </template>
              {{ scope.row.SecondPartyName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="AmountMoney"
          label="金额"
          min-width="100"
          sortable=""
        >
          <template slot-scope="scope">
            <span v-format="'¥#,##0.00'">{{ scope.row.AmountMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="RemainingAmount"
          label="余额"
          min-width="100"
          sortable=""
        >
          <template slot-scope="scope">
            <span v-format="'¥#,##0.00'" style="color: #13c2c2">{{
              scope.row.RemainingAmount
            }}</span>
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
        <el-table-column prop="States" label="领取状态" min-width="100">
          <template slot="header" slot-scope="{}">
            <span>领取状态</span>
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
                      <el-tag key="未领取" effect="plain" type="danger">未领取</el-tag>
                    </div>
                    <div>
                      <el-tag key="已领取" effect="plain" type="success">已领取</el-tag>
                    </div>
                    <div>
                      <el-tag key="部分领取" effect="plain" type="warning">部分领取</el-tag>
                    </div>
                    <div style="margin-bottom: 0">
                      <el-tag key="系统领取" effect="plain">系统领取</el-tag>
                    </div>
                  </span>
                </div>
              </div>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.States == 1"
              key="未领取"
              effect="plain"
              type="danger"
            >未领取</el-tag>
            <el-tag
              v-if="scope.row.States == 2"
              key="已领取"
              effect="plain"
              type="success"
            >已领取</el-tag>
            <el-tag
              v-if="scope.row.States == 3"
              key="部分领取"
              effect="plain"
              type="warning"
            >部分领取</el-tag>
            <el-tag v-if="scope.row.States == 4" key="系统领取" effect="plain">系统领取</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="CreateTimeStr"
          label="导入时间"
          sortable
          min-width="170"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.CreateTimeStr">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{
                scope.row.CreateTimeStr
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="User_Name"
          label="收取人"
          min-width="70"
          show-overflow-tooltip
        />
        <el-table-column prop="CollectionTime" label="收取时间" min-width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.CollectionTime">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{
                scope.row.CollectionTime
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="DataSource"
          label="来源说明"
          width="150"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div>
              <el-button
                v-if="RoleName == '超级管理员'"
                icon="el-icon-edit-outline"
                type="text"
                size="mini"
                @click="DataSourceEdit(scope.row)"
              />
              <span>{{ scope.row.DataSource }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="Remark"
          label="备注"
          align="left"
          min-width="250"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div>
              <el-button
                v-if="scope.row.Remark"
                type="text"
                size="mini"
                icon="el-icon-document-copy"
                @click="copyText(scope.row.Remark)"
              />
              <span>{{ scope.row.Remark }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" :width="DynamicColumn">
          <template slot-scope="scope">
            <div v-if="RoleName == '客服'">
              <el-button
                v-if="scope.row.States != 2"
                icon="el-icon-refresh-left"
                type="text"
                size="mini"
                :disabled="!scope.row.DisabledFlag"
                @click="UpdateDialog(scope.row)"
              >回款</el-button>
              <el-button
                icon="el-icon-view"
                type="text"
                size="mini"
                @click="ShowDialog(scope.row)"
              >详情</el-button>
              <el-button
                icon="el-icon-edit"
                type="text"
                size="mini"
                @click="
                  UpdateDetailDialog(
                    scope.row.InsProductPayCode,
                    scope.row.RemainingAmount
                  )
                "
              >修改</el-button>
            </div>
            <div
              v-else-if="
                RoleName == '超级管理员' ||
                  RoleName == '总客服' ||
                  RoleName == '财务'
              "
            >
              <el-button-group>
                <el-dropdown
                  trigger="click"
                  @command="
                    (command) => {
                      handleCommand(command, scope.row);
                    }
                  "
                >
                  <el-button type="text" size="mini">
                    更多操作<i class="el-icon-arrow-down el-icon--right" />
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-if="scope.row.States != 2"
                      :disabled="RoleName == '财务' || !scope.row.DisabledFlag"
                      command="a"
                      icon="el-icon-refresh-left"
                    >回款(客服){{ "\xa0\xa0" }}
                    </el-dropdown-item>
                    <el-dropdown-item command="b" icon="el-icon-view">详情(客服){{ "\xa0\xa0" }}</el-dropdown-item>
                    <el-dropdown-item
                      v-if="scope.row.States != 2"
                      :disabled="RoleName == '财务' || !scope.row.DisabledFlag"
                      command="c"
                      icon="el-icon-refresh-left"
                    >回款(其它){{ "\xa0\xa0" }}
                    </el-dropdown-item>
                    <el-dropdown-item command="d" icon="el-icon-view">详情(其它){{ "\xa0\xa0" }}</el-dropdown-item>
                    <el-dropdown-item
                      v-if="scope.row.States != 2"
                      :disabled="RoleName == '财务'"
                      command="f"
                      icon="el-icon-refresh-left"
                    >回款(供应商){{ "\xa0\xa0" }}
                    </el-dropdown-item>
                    <el-dropdown-item command="g" icon="el-icon-view">详情(供应商){{ "\xa0\xa0" }}</el-dropdown-item>
                    <el-dropdown-item
                      :disabled="RoleName == '财务'"
                      command="e"
                      icon="el-icon-edit"
                    >修改{{ "\xa0\xa0" }}</el-dropdown-item>
                    <el-dropdown-item
                      v-if="RoleName == '财务'"
                      command="h"
                      icon="el-icon-refresh-left"
                    >退款&收款{{ "\xa0\xa0" }}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-button-group>
            </div>
            <div v-else>
              <el-dropdown
                trigger="click"
                @command="
                  (command) => {
                    handleCommand(command, scope.row);
                  }
                "
              >
                <el-button type="text" size="mini">
                  更多操作<i class="el-icon-arrow-down el-icon--right" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-if="scope.row.States != 2"
                    command="c"
                    icon="el-icon-refresh-left"
                    :disabled="!scope.row.DisabledFlag"
                  >回款(其它){{ "\xa0\xa0" }}
                  </el-dropdown-item>
                  <el-dropdown-item command="d" icon="el-icon-view">详情(其它){{ "\xa0\xa0" }}</el-dropdown-item>
                  <el-dropdown-item
                    v-if="scope.row.States != 2"
                    command="f"
                    icon="el-icon-refresh-left"
                  >回款(供应商){{ "\xa0\xa0" }}
                  </el-dropdown-item>
                  <el-dropdown-item command="g" icon="el-icon-view">详情(供应商){{ "\xa0\xa0" }}</el-dropdown-item>
                  <el-dropdown-item command="e" icon="el-icon-edit">修改{{ "\xa0\xa0" }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        background
        :current-page="queryInfo.pagenum"
        :page-sizes="[20, 50, 100, 500]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <el-dialog
      v-dialog-drag-toggle-fullscreen
      :visible.sync="updateDialogVisible"
      fullscreen
      :close-on-click-modal="false"
      @close="CustomerChange"
    >
      <template #title>
        <span>客服回款</span>
        <el-tag
          style="margin-right: 1.5rem; float: right"
          type="info"
          size="mini"
          effect="plain"
        >Esc键可关闭对话框</el-tag>
      </template>
      <el-descriptions v-if="ClickRow" class="margin-top" :column="3" border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building" />
            收款公司
          </template>
          {{ ClickRow.SecondPartyName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building" />
            公司名称
          </template>
          {{ ClickRow.EnterPriseName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-date" />
            到账时间
          </template>
          <el-badge is-dot class="itemClass">{{
            ClickRow.PaymentDate
          }}</el-badge>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-money" />
            总金额
          </template>
          <span style="font-weight: bolder">{{ ClickRow.AmountMoney }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-money" />
            剩余金额
          </template>
          <span style="color: #ff4949; font-weight: bolder">{{
            ClickRow.RemainingAmount
          }}</span>
          <el-tag
            type="success"
            effect="plain"
            size="mini"
            style="margin-left: 20px"
          >输入本次回款金额会自动计算临时剩余金额</el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <div v-if="EnterprisePayCode">
        <el-divider />
        公司名称：
        <el-select
          v-model="EnterprisePayCode"
          style="width: 50%"
          filterable
          placeholder="甲方名称（模糊搜索）"
          remote
          reserve-keyword
          :remote-method="remoteMethod"
          @visible-change="clearselectCorporationDatas"
          @change="changeCompanyId"
        >
          <el-option
            v-for="(item, key) in SelectEnterprisePayData"
            :key="key"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <el-divider />
      <el-table
        ref="filterTable"
        v-loading="CollectionLoading"
        :data="CollectionOrderData"
        border
        :cell-style="showCollection"
        height="calc(100vh - 285px)"
        row-key="ID"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        @cell-click="CollectionOrderClick"
      >
        <el-table-column
          label="通道名称"
          prop="ChName"
          width="120"
          show-overflow-tooltip
        />
        <el-table-column
          label="合同方名称"
          prop="ConName"
          show-overflow-tooltip
          min-width="190"
          :filters="entNameList"
          :filter-method="filterEntNameList"
          filter-placement="bottom-start"
        />
        <el-table-column
          label="付款方名称"
          prop="CorpName"
          show-overflow-tooltip
          min-width="190"
          :filters="childEntNameList"
          :filter-method="filterChildEntName"
          filter-placement="bottom-start"
        />
        <el-table-column
          label="方案名称"
          prop="PlanName"
          show-overflow-tooltip
          min-width="150"
          :filters="planNameList"
          :filter-method="filterPlanName"
          filter-placement="bottom-start"
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
        <el-table-column
          label="账单年月"
          prop="OrderDateStr"
          width="85"
          show-overflow-tooltip
          :filters="yearMonthList"
          :filter-method="filterYearMonth"
          filter-placement="bottom-end"
        />
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
          <template slot="header" slot-scope="{}">
            <span>实际应缴</span>
            <el-tooltip
              class="item"
              effect="dark"
              placement="top"
              style="margin-left: 5px; margin-bottom: 0.2rem"
            >
              <i
                class="el-icon-question"
                style="font-size: 14px; vertical-align: middle"
              />
              <div slot="content">
                <p style="color: #ffba00; font-weight: bolder">
                  便捷操作：点击实际应缴会自动填充 “本次回款金额” 列（ 实际应缴
                  - 回款金额 ）。
                </p>
              </div>
            </el-tooltip>
          </template>
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
        <el-table-column
          label="本次回款金额"
          prop="ServReceiveNew"
          width="100"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.ServReceiveNew"
              size="mini"
              placeholder="金额"
              clearable
              @input="handleChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="回款状态"
          prop="ReceiveState"
          width="100"
          :filters="receiveStateList"
          :filter-method="filterReceiveState"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.ReceiveState == 0"
              effect="plain"
              type="danger"
            >未回款</el-tag>
            <el-tag v-if="scope.row.ReceiveState == 2" effect="plain">部分回款</el-tag>
            <el-tag
              v-if="scope.row.ReceiveState == 5"
              effect="plain"
              type="warning"
            >挂账</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="账单年月"
          prop="XianZhongType"
          width="80"
          show-overflow-tooltip
        /> -->
      </el-table>
      <!-- <el-divider /> -->
      <el-form
        ref="updateRef"
        :model="updateCollectionFrom"
        label-width="40px"
        style="margin-top: 1rem"
      >
        <el-form-item label="备注">
          <el-input
            v-model="updateCollectionFrom.Remark"
            type="textarea"
            :rows="1"
            maxlength="150"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <!-- <el-divider /> -->
      <el-row style="text-align: center">
        <el-col :span="24">
          <el-button
            icon="el-icon-circle-check"
            :loading="LoadingUpdate"
            type="primary"
            @click="saveUpdate"
          >保 存</el-button>
          <el-button
            icon="el-icon-refresh-right"
            type="info"
            @click="clearFilter"
          >清除所有过滤器</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog
      v-dialog-drag-toggle-fullscreen
      :visible.sync="updateDialogOtherVisible"
      fullscreen
      :close-on-click-modal="false"
    >
      <template #title>
        <span>其它角色回款</span>
        <el-tag
          style="margin-right: 1.5rem; float: right"
          type="info"
          size="mini"
          effect="plain"
        >Esc键可关闭对话框</el-tag>
      </template>
      <el-descriptions
        v-if="ClickRowOther"
        class="margin-top"
        :column="3"
        border
      >
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building" />
            收款公司
          </template>
          {{ ClickRowOther.SecondPartyName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building" />
            公司名称
          </template>
          {{ ClickRowOther.EnterPriseName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-date" />
            到账时间
          </template>
          <el-badge is-dot class="itemClass">{{
            ClickRowOther.PaymentDate
          }}</el-badge>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-money" />
            总金额
          </template>
          <span style="font-weight: bolder">{{
            ClickRowOther.AmountMoney
          }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-money" />
            剩余金额
          </template>
          <span style="color: #ff4949; font-weight: bolder">{{
            ClickRowOther.RemainingAmount
          }}</span>
          <el-tag
            type="success"
            effect="plain"
            size="mini"
            style="margin-left: 20px"
          >输入本次回款金额会自动计算临时剩余金额</el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <el-divider />
      <el-table
        v-loading="CollectionOtherLoading"
        :data="CollectionOrderOtherData"
        border
        :span-method="rowSpanMethodOther"
        :cell-style="showCollectionOther"
        height="calc(100vh - 285px)"
        @cell-click="CollectionOrderClickOther"
      >
        <el-table-column type="index" width="50" />
        <el-table-column
          label="账单名称"
          prop="ContractOrderName"
          show-overflow-tooltip
          min-width="200"
        />
        <el-table-column
          label="账单申请日期"
          prop="ApplicationTime"
          show-overflow-tooltip
          width="120"
        >
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span style="margin-left: 6px">{{
              dateFormat(scope.row.ApplicationTime)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="主公司名称"
          prop="CompanyName"
          show-overflow-tooltip
          min-width="200"
        />
        <el-table-column
          label="收款项目"
          prop="CustomAmountName"
          min-width="200"
        />
        <el-table-column
          label="收款金额"
          prop="CustomAmount"
          width="100"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="{}">
            <span>收款金额</span>
            <el-tooltip
              class="item"
              effect="dark"
              placement="top"
              style="margin-left: 5px; margin-bottom: 0.2rem"
            >
              <i
                class="el-icon-question"
                style="font-size: 14px; vertical-align: middle"
              />
              <div slot="content">
                <p style="color: #ffba00; font-weight: bolder">
                  便捷操作：点击收款金额会自动填充 “本次回款金额” 列（ 收款金额
                  - 回款金额 ）。
                </p>
              </div>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <span v-format="'¥#,##0.00'">{{ scope.row.CustomAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="回款金额"
          prop="OrderAmount"
          width="100"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span v-format="'¥#,##0.00'">{{ scope.row.OrderAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="本次回款金额"
          prop="ServReceiveNew"
          width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.ServReceiveNew"
              size="mini"
              placeholder="金额"
              clearable
              @input="handleChangeOther(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="回款状态" prop="OrderState" width="90">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.OrderState == 1"
              effect="plain"
              type="danger"
            >未回款</el-tag>
            <el-tag v-if="scope.row.OrderState == 3" effect="plain">部分回款</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-form
        ref="updateRef"
        :model="updateCollectionFrom"
        label-width="40px"
        style="margin-top: 1rem"
      >
        <el-form-item label="备注">
          <el-input
            v-model="updateCollectionFrom.Remark"
            type="textarea"
            :rows="1"
            maxlength="150"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <el-row style="text-align: center">
        <el-col :span="24">
          <el-button
            icon="el-icon-circle-check"
            :loading="LoadingUpdateOther"
            type="primary"
            @click="saveUpdateOther"
          >保 存</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog title="上传文件" :visible.sync="importDialogVisible" width="30%">
      <el-form ref="importRef" label-width="120px">
        <el-form-item label="重复数据判断" prop="Flag">
          <el-switch
            v-model="Flag"
            active-color="#1E90FF"
            inactive-color="#FFB6C1"
            active-text="是"
            inactive-text="否"
          />
        </el-form-item>
        <el-form-item label="文 件">
          <el-upload
            ref="upload"
            :action="actionUrl"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadFail"
            :on-change="fileChange"
            :file-list="fileList"
            :limit="1"
            :auto-upload="false"
            :headers="header"
            :http-request="UploadFile"
          >
            <el-button
              slot="trigger"
              icon="el-icon-position"
              plain
              type="primary"
              class="buttonM"
            >选取文件</el-button>
          </el-upload>
        </el-form-item>
        <el-divider />
        <el-row style="text-align: center">
          <el-col :span="24">
            <el-button
              icon="el-icon-upload2"
              :loading="uploadLoading"
              type="success"
              @click="submitUpload"
            >开始导入</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog
      title="修改备注"
      :visible.sync="updateDetailDialogVisible"
      width="30%"
    >
      <el-form
        ref="updateRef"
        :model="updateCollectionDetailFrom"
        label-width="80px"
      >
        <el-form-item label="备注">
          <el-input
            v-model="updateCollectionDetailFrom.Remark"
            type="textarea"
            :rows="3"
            placeholder=""
            maxlength="150"
            show-word-limit
          />
        </el-form-item>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button
              v-loading.fullscreen.lock="LoadingDetailUpdate"
              icon="el-icon-circle-check"
              type="primary"
              @click="saveDetailUpdate"
            >保 存</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <Customer
      :visible="dialogVisible"
      :click-row="ClickRow"
      @CloseDialog="CloseComponentsDialog"
      @CloseDialogReflesh="RenovateDataDialog"
    />
    <CustomerOther
      :visible="dialogOtherVisible"
      :click-row="ClickRowOther"
      @CloseDialog="CloseComponentsOtherDialog"
      @CloseDialogReflesh="RenovateDataOtherDialog"
    />
    <CustomerSupplierOther
      :visible="dialogSupplierOtherVisible"
      :click-row="ClickSupplierRowOther"
      @CloseDialog="CloseSComponentsOtherDialog"
      @CloseDialogReflesh="RenovateSDataOtherDialog"
    />
    <!-- 退款 -->
    <el-dialog
      :title="RefundTitle"
      :visible.sync="dialogShowRefundVisible"
      width="35%"
    >
      <el-form label-width="150px">
        <el-form-item label="退款类型">
          <el-switch
            v-model="RefundType"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="收款"
            inactive-text="退款"
            @change="RefundTypeChange"
          />
        </el-form-item>
        <el-form-item label="金额">
          <span v-format="'¥#,##0.00'">{{ SelectTotalMoney }}</span>
        </el-form-item>
        <el-form-item label="余额">
          <span v-format="'¥#,##0.00'">{{ SelectBalanceMoney }}</span>
        </el-form-item>
        <el-form-item :label="RefundMessage">
          <template #label>
            <span v-if="!RefundType" style="color: #ff4949">{{
              RefundMessage
            }}</span>
            <span v-if="RefundType" style="color: #13ce66">{{
              RefundMessage
            }}</span>
          </template>
          <el-input
            v-model="RefundAmount"
            size="mini"
            :placeholder="RefundMessage"
            clearable
            @input="handleRefund()"
          />
        </el-form-item>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button
              icon="el-icon-circle-check"
              type="primary"
              :loading="RefundLoading"
              @click="SaveRefund"
            >确 定
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <div v-if="isShowProgress" class="popContainer">
      <el-progress
        type="circle"
        :percentage="parseInt(fakes.progress * 100)"
        :stroke-width="9"
        :color="customColors"
        style="top: 30%; left: calc(50vw - 58px); color: white"
      />
    </div>
    <!-- 修改来源说明 -->
    <el-dialog
      title="修改来源说明"
      :visible.sync="DataSourceEditVisible"
      width="30%"
    >
      <el-form ref="DataSourceRef" label-width="80px">
        <el-form-item label="来源说明">
          <el-input
            v-model="DataSource"
            type="text"
            placeholder=""
            maxlength="50"
            show-word-limit
          />
        </el-form-item>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button
              :loading="LoadingDataSourceEdit"
              icon="el-icon-circle-check"
              type="primary"
              @click="SaveDataSourceEdit"
            >保 存</el-button>
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
  GetCollectionOrderNyName,
  UpdateDataRemark,
  GetOtherOrder,
  UpdateOtherData,
  GetContractType,
  GetEnterprisePayData,
  GetSupplierOtherOrder,
  GetUserInfo,
  RefundData,
  SaveDataSourceEdit,
  IfCollectionCustomer,
} from "@/api/CollectionMangement";
import { GetDicCategoryC } from "@/api/SystemManagement";
import { cutOutNum } from "@/utils/decimals";
// import { getDateByTimes } from "@/utils"; // 时间日期格式化成字符串
import axios from "axios";
import { showLoading, hideLoading } from "@/common/loading";
import Customer from "./Components/Customer";
import CustomerOther from "./Components/CustomerOther";
import CustomerSupplierOther from "./Components/CustomerSupplierOther";
import moment from "moment";
import FakeProgress from "fake-progress";
import { BigNumber } from "bignumber.js";
import collapse from "../../assets/js/collapse";
import pickerOptions from "@/utils/pickerOptions";
import dayjs from "dayjs";
export default {
  name: "CollectionData",
  components: { Customer, CustomerOther, collapse, CustomerSupplierOther },
  data() {
    return {
      DataSourceEditVisible: false,
      LoadingDataSourceEdit: false,
      DataSource: "",
      companies: [
        { name: "格信诺诚", color: "#eb2f96" },
        { name: "格锐智诚", color: "#1890ff" },
        { name: "格锐商业", color: "#ffba00" },
        { name: "格锐博金", color: "#13c2c2" },
        { name: "南京公司", color: "#f5222d" },
        { name: "安欣智诚", color: "#fa8c16" },
        { name: "安欣诺诚", color: "#11a983" },
        { name: "格锐（河南）人力", color: "#6959cd" },
        { name: "格锐（山东）", color: "#4b4b4b" },
        { name: "安徽方白科技", color: "#212121" },
        { name: "格锐智诚（深圳）", color: "#909399" },
      ],
      activeName: ["1", "2"],
      RefundId: null,
      RefundMessage: "退款金额",
      RefundTitle: "退款",
      dialogShowRefundVisible: false,
      RefundLoading: false,
      RefundType: false,
      SelectTotalMoney: null,
      SelectBalanceMoney: null,
      RefundAmount: null,
      dialogSupplierOtherVisible: false,
      ClickSupplierRowOther: [],
      ContractType: [],
      GetContractTypeArray: [],
      isActive: true,
      isActiveAll: false,
      LoadingUpdateOther: false,
      RoleName: sessionStorage.getItem("RoleName"),
      DynamicColumn: "",
      fixedLeftShow: true,
      fakes: new FakeProgress({
        timeConstant: 10000,
        autoStart: false,
      }),
      customColors: [
        { color: "#ff4949", percentage: 20 },
        { color: "#ffba00", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 },
      ],
      LoadingDetailUpdate: false,
      CollectionLoading: false,
      dialogVisible: false,
      dialogOtherVisible: false,
      CollectionOrderData: [],
      ClickRow: null,
      ClickRowOld: null,
      DescriptionStyle: "width:170px",
      SecondPartyName: null,
      DicCategoryList: [],
      descriptionColumn: 3,
      TotalSecondPartyNameList: [],
      multipleSelection: [],
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
      CreateUserId: "",
      PaymentDateBegin: "",
      PaymentDateEnd: "",
      IfUser: false,
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
      updateDetailDialogVisible: false,
      importDialogVisible: false,
      CollectionList: [],
      updateCollectionFrom: {
        InsProductPayCode: "",
        Remark: "",
      },
      updateCollectionDetailFrom: {
        InsProductPayCode: "",
        Remark: "",
      },
      employeeList: [],
      actionUrl: "",
      fileList: [], // 文件列表
      fileListCopy: [], // 文件列表
      file: null,
      loading: false,
      // 回款状态
      PaymentCollectionStateArray: [
        // { Code: 0, Name: "全部" },
        { Code: 1, Name: "未领取" },
        { Code: 2, Name: "已领取" },
        // { Code: 3, Name: "部分领取" },
        { Code: 4, Name: "系统领取" },
      ],
      // 判断选中的数据回款状态是否都是未回款，只要有一个是已回款，那么这个状态为true
      collectionStateFlag: false,
      pickerOptions: pickerOptions,
      isShowProgress: false,
      ClickRowOther: null,
      ClickRowOldOther: null,
      CollectionOtherLoading: false,
      CollectionOrderOtherData: [],
      updateDialogOtherVisible: false,
      EnterprisePayData: [],
      SelectEnterprisePayData: [],
      EnterprisePayCode: "",
      header: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$store.getters.token,
      },
      UserList: [],
      CustomerInsProductPayCode: "",
      Count_billlistplan: [],
      childEntNameList: [],
      planNameList: [],
      yearMonthList: [],
      receiveStateList: [],
      entNameList: [],
    };
  },
  watch: {
    "$store.getters.clientWidth"(newVal, oldVal) {
      this.fixedShowMethod(newVal);
    },
    Flag(newValue) {
      this.actionUrl =
        process.env.VUE_APP_BASE_API + "CollectionMangement/UploadFiles";
    },
  },
  created() {
    if (sessionStorage.getItem("RoleName") == "客服") {
      this.DynamicColumn = "220";
    } else {
      this.DynamicColumn = "110";
    }
    this.PaymentDate = [
      moment().subtract(1, "months").startOf("month").format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD"),
    ];
  },
  // 加载完成后执行调取回款数据接口
  mounted() {
    this.fixedShowMethod(this.$store.getters.clientWidth);
    switch (sessionStorage.getItem("RoleName")) {
      case "超级管理员":
      case "总客服":
      case "财务":
        this.IfUser = false;
        this.StatesShow = true;
        break;
      default:
        this.IfUser = true;
        this.StatesShow = true;
        break;
    }
    this.GetDicCategoryC();
    this.GetAdmin_Permission();
    this.actionUrl =
      process.env.VUE_APP_BASE_API + "CollectionMangement/UploadFiles";
    // 获取合同类型数据
    this.GetContractTypeList();
    // 获取销售人数据
    this.GetUserInfo();
    const today = dayjs();
    const start = dayjs("2025-03-11");
    const end = dayjs("2025-03-17");
    if (today.isAfter(start) && today.isBefore(end)) {
      this.OpenDialog();
    }
  },
  methods: {
    matchedCompanies(name) {
      return this.companies.filter((c) => c.name === name);
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    filterEntNameList(value, row, column) {
      if (row.children && row.children.some((c) => c.ConName === value)) {
        return true;
      } else {
        row.ConName === value;
      }
    },
    filterChildEntName(value, row, column) {
      if (row.children && row.children.some((c) => c.CorpName === value)) {
        return true;
      } else {
        row.CorpName === value;
      }
    },
    filterPlanName(value, row, column) {
      if (row.children && row.children.some((c) => c.PlanName === value)) {
        return true;
      } else {
        row.PlanName === value;
      }
    },
    filterYearMonth(value, row, column) {
      if (row.children && row.children.some((c) => c.OrderDateStr === value)) {
        return true;
      } else {
        row.OrderDateStr === value;
      }
    },
    filterReceiveState(value, row, column) {
      let ReceiveState = null;
      switch (value) {
        case "未回款":
          ReceiveState = 0;
          break;
        case "部分回款":
          ReceiveState = 2;
          break;
        case "挂账":
          ReceiveState = 5;
          break;
      }
      if (
        row.children &&
        row.children.some((c) => c.ReceiveState === ReceiveState)
      ) {
        return true;
      } else {
        row.ReceiveState === ReceiveState;
      }
    },
    copyText(Remark) {
      const textarea = document.createElement("textarea");
      textarea.value = Remark;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      this.$message.success("复制成功！");
    },
    OpenDialog() {
      this.$notify({
        title: "更新提醒",
        message:
          "客服回款逻辑发生变更，客服详情新增历史撤回功能，未完全回款的数据请先点击历史撤回后才能进行回款",
        duration: 0,
      });
    },
    DataSourceEdit(Item) {
      this.updateCollectionDetailFrom.InsProductPayCode =
        Item.InsProductPayCode;
      this.DataSource = Item.DataSource;
      this.DataSourceEditVisible = true;
    },
    SaveDataSourceEdit() {
      this.LoadingDataSourceEdit = true;
      SaveDataSourceEdit(
        this.updateCollectionDetailFrom.InsProductPayCode,
        this.DataSource
      ).then((res) => {
        if (res.success) {
          this.DataSourceEditVisible = false;
          this.$message.success("操作成功");
          this.GetAdmin_Permission();
        } else {
          this.$message.error(res.resultMessage);
        }
        setTimeout(() => {
          this.LoadingDataSourceEdit = false;
        }, 300);
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
    // collapseClick() {
    //   this.isActive = !this.isActive
    // },
    collapseClickAll() {
      this.isActiveAll = !this.isActiveAll;
    },
    // 列表时间格式化
    dateTimeFormat(row) {
      if (row) {
        return this.$moment(row).format("YYYY-MM-DD HH:mm:ss");
      } else {
        return null;
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
    // 执行列表右侧关联操作
    handleCommand(flag, row) {
      switch (flag) {
        case "a":
          this.UpdateDialog(row);
          break;
        case "b":
          this.ShowDialog(row);
          break;
        case "c":
          this.UpdateOtherDialog(row);
          break;
        case "d":
          this.ShowOtherDialog(row);
          break;
        case "e":
          this.UpdateDetailDialog(row.InsProductPayCode, row.Remark);
          break;
        case "f":
          this.GetSupplierOtherOrderDialog(row);
          break;
        case "g":
          this.ShowSupplierOtherDialog(row);
          break;
        case "h":
          this.ShowRefundDialog(row);
          break;
      }
    },
    RefundTypeChange() {
      if (this.RefundType) {
        this.RefundMessage = "收款金额";
        this.RefundTitle = "收款";
      } else {
        this.RefundMessage = "退款金额";
        this.RefundTitle = "退款";
      }
      this.RefundAmount = null;
    },
    // 展开回款对话框
    ShowRefundDialog(row) {
      this.RefundType = false;
      this.SelectTotalMoney = row.AmountMoney;
      this.SelectBalanceMoney = row.RemainingAmount;
      this.RefundAmount = null;
      this.RefundId = row.InsProductPayCode;
      this.RefundTypeChange();
      this.dialogShowRefundVisible = true;
    },
    handleRefund(row) {
      // 验证输入是否金额，如果不是直接返回
      this.RefundAmount = /^-?\d+\.?\d{0,2}$/.test(this.RefundAmount)
        ? this.RefundAmount
        : this.RefundAmount.indexOf(".") == -1
        ? null
        : cutOutNum(parseFloat(this.RefundAmount));
      // 金额正确并且是退款，不是
      if (this.RefundAmount && !this.RefundType) {
        if (
          parseFloat(this.SelectBalanceMoney) < parseFloat(this.RefundAmount)
        ) {
          this.RefundAmount = null;
          this.$message.warning("金额输入不合理，请重新输入");
        }
      }
      return;
    },
    SaveRefund() {
      if (!this.RefundAmount) {
        this.$message.warning("请输入退款&收款金额！");
        return;
      }
      this.RefundLoading = true;
      RefundData(
        this.RefundType,
        this.RefundId,
        this.SelectTotalMoney,
        this.SelectBalanceMoney,
        this.RefundAmount
      ).then((res) => {
        if (res.success) {
          this.$message.success("操作成功");
          this.GetAdmin_Permission();
        } else {
          this.$message.error(res.resultMessage);
        }
        this.RefundLoading = false;
        this.dialogShowRefundVisible = false;
      });
    },
    ShowSupplierOtherDialog(row) {
      this.ClickSupplierRowOther = Object.assign({}, row); // 创建新的对象副本;
      this.dialogSupplierOtherVisible = true;
    },
    // 除客服之外的人员弹出窗口（供应商）
    GetSupplierOtherOrderDialog(row) {
      if (row.States == 2) {
        this.$message.warning("不能选择已回款的数据！");
        return;
      }
      this.ClickRowOther = Object.assign({}, row); // 创建新的对象副本;
      this.ClickRowOldOther = Object.assign({}, row); // 创建新的对象副本;
      this.CollectionOtherLoading = true;
      var sendEnterPriseName = row.EnterPriseName;
      if (row.EnterPriseName == "祝惟") {
        sendEnterPriseName = "北京天首聚智管理咨询有限公司";
      }
      GetSupplierOtherOrder(sendEnterPriseName).then((res) => {
        if (res.success) {
          this.CollectionOrderOtherData = res.result.map((v) => {
            this.$set(v, "ServReceiveNew", "");
            return v;
          });
        } else {
          this.CollectionOrderOtherData = [];
        }
        this.CollectionOtherLoading = false;
      });
      this.updateCollectionFrom.Remark = "";
      this.updateDialogOtherVisible = true;
    },
    // 除客服之外的人员弹出窗口
    UpdateOtherDialog(row) {
      if (row.States == 2) {
        this.$message.warning("不能选择已回款的数据！");
        return;
      }
      this.ClickRowOther = Object.assign({}, row); // 创建新的对象副本;
      this.ClickRowOldOther = Object.assign({}, row); // 创建新的对象副本;
      this.CollectionOtherLoading = true;
      var sendEnterPriseName = row.EnterPriseName;
      if (row.EnterPriseName == "祝惟") {
        sendEnterPriseName = "北京天首聚智管理咨询有限公司";
      }
      GetOtherOrder(sendEnterPriseName).then((res) => {
        if (res.success) {
          this.CollectionOrderOtherData = res.result.map((v) => {
            this.$set(v, "ServReceiveNew", "");
            return v;
          });
        } else {
          this.CollectionOrderOtherData = [];
        }
        this.CollectionOtherLoading = false;
      });
      this.updateCollectionFrom.Remark = "";
      this.updateDialogOtherVisible = true;
    },
    // 保存修改
    saveDetailUpdate() {
      this.LoadingDetailUpdate = true;
      UpdateDataRemark(
        this.updateCollectionDetailFrom.InsProductPayCode,
        this.updateCollectionDetailFrom.Remark
      ).then((res) => {
        if (res.success) {
          this.updateDetailDialogVisible = false;
          this.$message.success("操作成功");
          this.GetAdmin_Permission();
        } else {
          this.$message.error(res.resultMessage);
        }
        this.LoadingDetailUpdate = false;
      });
    },
    // 绑定填写备注弹出窗口
    UpdateDetailDialog(InsProductPayCode, Remark) {
      this.updateCollectionDetailFrom.InsProductPayCode = InsProductPayCode;
      this.updateCollectionDetailFrom.Remark = Remark;
      this.updateDetailDialogVisible = true;
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
    // 为要复制的单元格填充背景颜色
    showCollectionOther({ row, column }) {
      if (column.label == "收款金额") {
        return {
          backgroundColor: "#E6F7FF",
        };
      } else {
        return {
          backgroundColor: "#FFFFFF",
        };
      }
    },
    // 点击单元格时触发
    CollectionOrderClick(row, column, cell, event) {
      if (column.label == "实际应缴") {
        row.ServReceiveNew = this.minus(row.ServShouldIn, row.ServReceive);
        this.handleChange(row);
      }
    },
    // 输入金额或者点击单元格都触发
    handleChange(row) {
      // 验证输入是否金额，如果不是直接返回
      row.ServReceiveNew = /^\d+\.?\d{0,2}$/.test(row.ServReceiveNew)
        ? row.ServReceiveNew
        : row.ServReceiveNew.indexOf(".") == -1
        ? ""
        : cutOutNum(parseFloat(row.ServReceiveNew));
      if (row.ServReceiveNew === "") row.ServReceiveNew = 0;
      // 判断是否是父级
      if (row.children) {
        this.distributeToChildren(row);
      } else {
        this.updateParent(row);
      }
      // 计算总余额
      this.RecalculateMoney();
      // 回款金额是否大于实际应缴-之前的回款金额
      // 总的剩余金额为负数也不行
      if (
        parseFloat((row.ServShouldIn - row.ServReceive).toFixed(2)) <
          parseFloat(row.ServReceiveNew) ||
        parseFloat(this.ClickRow.RemainingAmount) < 0
      ) {
        row.ServReceiveNew = 0;
        // 父数据为0那么把它下面的子的数据也清空
        if (row.children) {
          row.children.forEach((child) => {
            child.ServReceiveNew = "";
          });
        } else {
          this.updateParent(row);
        }
        this.$message.warning("金额输入不合理，请重新输入");
        // 再次调用一下计算总余额
        this.RecalculateMoney();
      }
      // 如果是一个0或者多个0自动赋空字符串
      row.ServReceiveNew = row.ServReceiveNew == 0 ? "" : row.ServReceiveNew;
      this.updateCollectionFrom.Remark = this.FormattedData();
    },
    // 循环最终数组然后拼接成备注（只能放到最后，中途判断太多，放到最后比较合适）
    FormattedData() {
      const filteredList = this.CollectionOrderData.filter(
        (item) => item.ServReceiveNew !== ""
      );
      // 合并本次输入的金额和历史扣款的金额
      const mergedArray = [
        ...filteredList.flatMap((item) =>
          item.children
            .filter(({ ServReceiveNew }) => ServReceiveNew) // 过滤掉 ServReceiveNew 为空的项
            .map(({ BYear, BMonth, XianZhongType, ServReceiveNew }) => ({
              BYear,
              BMonth,
              XianZhongType,
              ServReceiveNew,
            }))
        ),
        ...this.Count_billlistplan.map(
          ({ BYear, BMonth, XianZhongType, ThisServReceive }) => ({
            BYear,
            BMonth,
            XianZhongType,
            ServReceiveNew: ThisServReceive, // 统一字段
          })
        ),
      ];
      // 使用 Map 按 年-月 进行分组，并同时累加 ServReceiveNew
      const map = new Map();
      mergedArray.forEach(
        ({ BYear, BMonth, XianZhongType, ServReceiveNew }) => {
          if (ServReceiveNew) {
            const key = `${BYear}.${BMonth}`;
            if (!map.has(key)) {
              map.set(key, { types: new Set(), totalAmount: 0 });
            }
            map.get(key).types.add(XianZhongType);
            map.get(key).totalAmount += parseFloat(ServReceiveNew) || 0; // 累加金额
          }
        }
      );
      // **按年月排序**
      return Array.from(map.entries())
        .sort(([a], [b]) => {
          const [yearA, monthA] = a.split(".").map(Number);
          const [yearB, monthB] = b.split(".").map(Number);
          return yearA - yearB || monthA - monthB; // 先按年份升序，再按月份升序
        })
        .map(
          ([yearMonth, { types, totalAmount }]) =>
            `${yearMonth}${Array.from(types).join(
              "、"
            )} ￥${totalAmount.toFixed(2)}`
        )
        .join("；");
    },

    // 父级更新时，自动分配到子级
    distributeToChildren(row) {
      // 上面已经减了回款金额，这里不用减
      let remaining = row.ServReceiveNew;
      // 子集合一次循环依次赋值
      row.children.forEach((child) => {
        // 实际应缴-已经回款的金额
        const thisNew = this.minus(child.ServShouldIn, child.ServReceive);
        // 剩余金额大于实际应缴-已经回款的金额
        if (remaining > thisNew) {
          child.ServReceiveNew = thisNew;
          remaining = this.minus(remaining, thisNew);
        } else {
          child.ServReceiveNew = remaining;
          remaining = 0;
          // 把0去掉，0是无效字符
          child.ServReceiveNew =
            child.ServReceiveNew == 0 ? "" : child.ServReceiveNew;
        }
      });
      // 如果父级数据被清空，子级数据也要清空
      if (row.ServReceiveNew === 0) {
        row.children.forEach((child) => (child.ServReceiveNew = ""));
      }
    },
    // 子级更新时，父级自动累加
    updateParent(row) {
      const parent = this.findParent(this.CollectionOrderData, row);
      if (parent) {
        // 计算总和
        parent.ServReceiveNew = parent.children.reduce(
          (sum, c) => sum + (parseFloat(c.ServReceiveNew) || 0),
          0
        );
        // 如果是一个0或者多个0自动赋空字符串
        parent.ServReceiveNew =
          parent.ServReceiveNew == 0 ? "" : parent.ServReceiveNew;
      }
    },
    // 递归查找父级(其实没必要递归，不过在此处先这么写)
    findParent(list, child) {
      for (const item of list) {
        if (item.children && item.children.some((c) => c.ID === child.ID)) {
          return item; // 找到父级
        } else if (item.children) {
          // 这个条件逻辑应该不会走，先保留
          const found = this.findParent(item.children, child);
          if (found) return found;
        }
      }
      return null;
    },
    // 循环所有编辑的列表，只计算父级数据的总和
    RecalculateMoney() {
      let totalInputMoney = 0;
      this.CollectionOrderData.forEach((item) => {
        if (item.children != null) {
          totalInputMoney += item.ServReceiveNew
            ? parseFloat(item.ServReceiveNew)
            : 0;
        }
      });
      this.ClickRow.RemainingAmount = (
        this.ClickRowOld.RemainingAmount - totalInputMoney
      ).toFixed(2);
    },
    // 点击单元格时触发
    CollectionOrderClickOther(row, column, cell, event) {
      if (column.label == "收款金额") {
        row.ServReceiveNew = this.minus(row.CustomAmount, row.OrderAmount);
        this.handleChangeOther(row);
      }
    },
    handleChangeOther(row) {
      // 验证输入是否金额，如果不是直接返回
      row.ServReceiveNew = /^\d+\.?\d{0,2}$/.test(row.ServReceiveNew)
        ? row.ServReceiveNew
        : row.ServReceiveNew.indexOf(".") == -1
        ? ""
        : cutOutNum(parseFloat(row.ServReceiveNew));

      this.RecalculateMoneyOther();
      // 如果该行的收款金额减去回款金额小于当前输入金额或者临时金额小于零，那么证明输入金额不合法
      if (
        parseFloat((row.CustomAmount - row.OrderAmount).toFixed(2)) <
          parseFloat(row.ServReceiveNew) ||
        parseFloat(this.ClickRowOther.RemainingAmount) < 0
      ) {
        row.ServReceiveNew = "";
        this.$message.warning("金额输入不合理，请重新输入");
      }
      this.RecalculateMoneyOther();
      return;
    },
    RecalculateMoneyOther() {
      let totalInputMoney = 0;
      this.CollectionOrderOtherData.forEach((item) => {
        totalInputMoney += item.ServReceiveNew
          ? parseFloat(item.ServReceiveNew)
          : 0;
      });
      this.ClickRowOther.RemainingAmount = (
        this.ClickRowOldOther.RemainingAmount - totalInputMoney
      ).toFixed(2);
    },
    // 减法（高精度）
    minus(a, b) {
      a = BigNumber(a);
      b = BigNumber(b);
      return a.minus(b).toNumber();
    },
    ShowDialog(row) {
      this.ClickRow = Object.assign({}, row); // 创建新的对象副本;
      this.dialogVisible = true;
    },
    CloseComponentsDialog() {
      this.dialogVisible = false;
    },
    // 撤回操作并刷新页面
    RenovateDataDialog() {
      this.dialogVisible = false;
      this.GetAdmin_Permission();
    },
    ShowOtherDialog(row) {
      this.ClickRowOther = Object.assign({}, row); // 创建新的对象副本;
      this.dialogOtherVisible = true;
    },
    CloseComponentsOtherDialog() {
      this.dialogOtherVisible = false;
    },
    CloseSComponentsOtherDialog() {
      this.dialogSupplierOtherVisible = false;
    },
    // 撤回操作并刷新页面
    RenovateDataOtherDialog() {
      this.dialogOtherVisible = false;
      this.GetAdmin_Permission();
    },
    RenovateSDataOtherDialog() {
      this.dialogSupplierOtherVisible = false;
      this.GetAdmin_Permission();
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
    rowSpanMethodOther({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        // 合并第一列的相同行
        if (
          rowIndex === 0 ||
          row.ContractOrderName !==
            this.CollectionOrderOtherData[rowIndex - 1].ContractOrderName
        ) {
          const rowspan = this.CollectionOrderOtherData.filter(
            (item) => item.ContractOrderName === row.ContractOrderName
          ).length;
          return { rowspan, colspan: 1 };
        } else {
          return { rowspan: 0, colspan: 0 };
        }
      } else if (columnIndex === 2) {
        // 合并第一列的相同行
        if (
          rowIndex === 0 ||
          row.ApplicationTime !==
            this.CollectionOrderOtherData[rowIndex - 1].ApplicationTime ||
          row.ContractOrderName !==
            this.CollectionOrderOtherData[rowIndex - 1].ContractOrderName
        ) {
          const rowspan = this.CollectionOrderOtherData.filter(
            (item) =>
              item.ApplicationTime === row.ApplicationTime &&
              item.ContractOrderName === row.ContractOrderName
          ).length;
          return { rowspan, colspan: 1 };
        } else {
          return { rowspan: 0, colspan: 0 };
        }
      } else if (columnIndex === 3) {
        // 合并第一列的相同行
        if (
          rowIndex === 0 ||
          row.CompanyName !==
            this.CollectionOrderOtherData[rowIndex - 1].CompanyName ||
          row.ApplicationTime !==
            this.CollectionOrderOtherData[rowIndex - 1].ApplicationTime ||
          row.ContractOrderName !==
            this.CollectionOrderOtherData[rowIndex - 1].ContractOrderName
        ) {
          const rowspan = this.CollectionOrderOtherData.filter(
            (item) =>
              item.CompanyName === row.CompanyName &&
              item.ApplicationTime === row.ApplicationTime &&
              item.ContractOrderName === row.ContractOrderName
          ).length;
          return { rowspan, colspan: 1 };
        } else {
          return { rowspan: 0, colspan: 0 };
        }
      } else {
        return { rowspan: 1, colspan: 1 };
      }
    },
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
        case "e":
          this.batchDelete();
          break;
      }
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
          if (element.States == 2) {
            this.collectionStateFlag = true;
          }
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
    // 点击当前行数据进行选中或取消复选框
    toggleSelection(row, column, eventow) {
      // if (column.label != "操作") {
      //   // 通过ref绑定后这里使用$refs.table来操作bom元素
      //   this.$refs.multipleTable.toggleRowSelection(row);
      // }
    },
    // 背景颜色只有撤回用到所以在此处先注释掉
    showBackground({ row }) {
      return {
        backgroundColor: "#FFFFFF",
      };
      // const checkIdList = this.multipleSelection.map(
      //   (item) =>
      //     item.EnterPriseName +
      //     item.AmountMoney +
      //     item.PaymentDate +
      //     item.CreateTimeStr
      // );
      // if (
      //   checkIdList.includes(
      //     row.EnterPriseName +
      //       row.AmountMoney +
      //       row.PaymentDate +
      //       row.CreateTimeStr
      //   )
      // ) {
      //   return {
      //     backgroundColor: "#E6F7FF",
      //   };
      // } else {
      //   return {
      //     backgroundColor: "#FFFFFF",
      //   };
      // }
    },
    // 保存修改回款(客服)
    saveUpdate() {
      if (this.ClickRowOld.RemainingAmount == this.ClickRow.RemainingAmount) {
        this.$message.info("无修改");
        return;
      }
      const changedData = [];
      // 只循环子集合
      this.CollectionOrderData.forEach((item) => {
        item.children.forEach((itemChild) => {
          if (itemChild.ServReceiveNew) {
            changedData.push(itemChild);
          }
        });
      });
      const parameters = {
        InsProductPayCode: this.ClickRow.InsProductPayCode, // 选中的回款编号
        RemainingAmount: this.ClickRow.RemainingAmount, // 剩余金额
        ChangedData: changedData, // 输入金额的数据
        Remark: this.updateCollectionFrom.Remark, // 修改备注
      };
      this.LoadingUpdate = true;
      UpdateData(parameters).then((res) => {
        if (res.success) {
          this.updateDialogVisible = false;
          this.$message.success("操作成功");
          this.GetAdmin_PermissionSearch();
        } else {
          this.$message.error(res.resultMessage);
        }
        setTimeout(() => {
          this.LoadingUpdate = false;
        }, 300); // 延迟 300 毫秒
      });
    },
    // 除客服之外的其它角色保存修改回款
    saveUpdateOther() {
      if (
        this.ClickRowOldOther.RemainingAmount ==
        this.ClickRowOther.RemainingAmount
      ) {
        this.$message.info("无修改");
        return;
      }
      const changedData = [];
      this.CollectionOrderOtherData.forEach((item) => {
        if (item.ServReceiveNew) {
          changedData.push(item);
        }
      });
      const parameters = {
        InsProductPayCode: this.ClickRowOther.InsProductPayCode, // 选中的回款编号
        RemainingAmount: this.ClickRowOther.RemainingAmount, // 剩余金额
        ChangedData: changedData, // 输入金额的数据
        Remark: this.updateCollectionFrom.Remark, // 修改备注
      };
      this.LoadingUpdateOther = true;
      UpdateOtherData(parameters).then((res) => {
        if (res.success) {
          this.updateDialogOtherVisible = false;
          this.$message.success("操作成功");
          this.GetAdmin_PermissionSearch();
        } else {
          this.$message.error(res.resultMessage);
        }
        setTimeout(() => {
          this.LoadingUpdateOther = false;
        }, 300); // 延迟 300 毫秒
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
    // 客服回款弹出窗口
    async UpdateDialog(row) {
      this.CollectionOrderData = [];
      if (row.States == 2) {
        this.$message.warning("不能选择已回款的数据！");
        return;
      }
      this.CustomerInsProductPayCode = row.InsProductPayCode;
      // 如果有老的回款那么给出提示，先撤销再进行新的回款操作
      const resCollectionCustomer = await IfCollectionCustomer(
        row.InsProductPayCode
      );
      if (!resCollectionCustomer.success) {
        this.$message.warning(resCollectionCustomer.resultMessage);
        return;
      }
      this.CollectionLoading = true;
      this.updateDialogVisible = true;
      this.ClickRow = Object.assign({}, row); // 创建新的对象副本;
      this.ClickRowOld = Object.assign({}, row); // 创建新的对象副本;
      var sendEnterPriseName = row.EnterPriseName;
      if (row.EnterPriseName == "祝惟") {
        sendEnterPriseName = "北京天首聚智管理咨询有限公司";
      }
      const resCollectionOrder = await GetCollectionOrderNyName(
        sendEnterPriseName,
        this.CustomerInsProductPayCode
      );
      if (resCollectionOrder.success) {
        this.CollectionOrderData = resCollectionOrder.result.map((v) => {
          this.$set(v, "ServReceiveNew", "");
          return v;
        });
        this.Count_billlistplan = resCollectionOrder.result1;
        this.childEntNameList = resCollectionOrder.result2;
        this.planNameList = resCollectionOrder.result3;
        this.yearMonthList = resCollectionOrder.result4;
        this.receiveStateList = resCollectionOrder.result5;
        this.entNameList = resCollectionOrder.result6;
      } else {
        this.CollectionOrderData = [];
        this.Count_billlistplan = [];
      }
      setTimeout(() => {
        this.CollectionLoading = false;
      }, 200);
      // 选中公司四个字以内的显示公司下拉
      if (row.EnterPriseName.length < 4) {
        // 赋值并获取回款公司下拉数据
        this.EnterprisePayCode = row.EnterPriseName;
        await GetEnterprisePayData().then((res) => {
          if (res.success) {
            // 公司数据格式化
            this.EnterprisePayData = res.result.map((item) => {
              return {
                value: item.EnterPriseCode,
                label: item.EnterPriseName,
              };
            });
          } else {
            this.EnterprisePayData = [];
          }
        });
      }
      this.updateCollectionFrom.Remark = "";
    },
    CustomerChange() {
      this.EnterprisePayCode = "";
      this.clearFilter();
    },
    // 输入过滤
    remoteMethod(query) {
      if (query && query.length > 2) {
        setTimeout(() => {
          // query = query.replace("(", "（");
          // query = query.replace(")", "）");
          this.SelectEnterprisePayData = this.EnterprisePayData.filter(
            (item) => {
              return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
            }
          );
        }, 200);
      } else {
        this.SelectEnterprisePayData = [];
        return this.$message.warning("至少输入3个关键字以上的内容");
      }
    },
    // 关闭远程搜索下拉时需要清空筛选出来的数据进行重新筛选
    clearselectCorporationDatas(e) {
      this.SelectEnterprisePayData = [];
    },
    // 客服公司改变事件
    changeCompanyId(e) {
      var item = this.SelectEnterprisePayData.filter((item) => {
        return item.value == e;
      });
      if (item.length != 0) {
        this.EnterprisePayCode = item[0].value;
      }
      this.CollectionLoading = true;
      GetCollectionOrderNyName(
        this.EnterprisePayCode,
        this.CustomerInsProductPayCode
      ).then((res) => {
        if (res.success) {
          this.ClickRow.RemainingAmount = this.ClickRow.AmountMoney;
          this.CollectionOrderData = res.result.map((v) => {
            this.$set(v, "ServReceiveNew", "");
            return v;
          });
          this.Count_billlistplan = res.result1;
          this.childEntNameList = res.result2;
          this.planNameList = res.result3;
          this.yearMonthList = res.result4;
          this.receiveStateList = res.result5;
          this.entNameList = res.result6;
        } else {
          this.CollectionOrderData = [];
          this.Count_billlistplan = [];
        }
        this.CollectionLoading = false;
      });
    },
    // 批量删除（永久删除）
    async batchDelete() {
      if (!this.updateCollectionFrom.InsProductPayCode) {
        this.$message.warning("请勾选要修改的数据！");
        return;
      }
      if (this.collectionStateFlag) {
        this.$message.warning("不能撤回已回款的数据，请检查");
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
        return this.$message.warning("已取消操作");
      }
      showLoading();
      DeleteCollectionData(this.updateCollectionFrom.InsProductPayCode).then(
        (res) => {
          if (res.success) {
            this.$message.success("操作成功！");
            this.GetAdmin_Permission();
            hideLoading();
          } else {
            hideLoading();
            return this.$message.error(res.resultMessage);
          }
        }
      );
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
        this.PaymentDateBegin = this.$moment(this.PaymentDate[0]).format(
          "YYYY-MM-DD"
        );
        this.PaymentDateEnd = this.$moment(this.PaymentDate[1]).format(
          "YYYY-MM-DD"
        );
      } else {
        this.PaymentDateBegin = "";
        this.PaymentDateEnd = "";
      }
      var parameters = {
        Condition: this.Condition,
        States: this.States || 0,
        PaymentDateBegin: this.PaymentDateBegin,
        PaymentDateEnd: this.PaymentDateEnd,
        CollectionTimeBegin: "",
        CollectionTimeEnd: "",
        SecondPartyName: this.SecondPartyName || null,
        ContractType: this.ContractType,
        CreateUserId: this.CreateUserId,
        PageIndex: this.queryInfo.pagenum,
        PageSize: this.queryInfo.pagesize,
      };
      GetAdmin_Permission(parameters).then((res) => {
        if (res.success) {
          this.CollectionList = res.result.list;
          this.total = res.result.totalNumber;
          this.TotalSecondPartyNameList = res.result1;
        } else {
          this.CollectionList = [];
          this.total = 0;
          this.TotalSecondPartyNameList = [];
        }
        this.updateCollectionFrom.InsProductPayCode = "";
        this.loading = false;
      });
    },
    // 导出数据
    ExportCollection() {
      this.isShowProgress = true;
      this.fakes.start();
      if (this.PaymentDate && this.PaymentDate.length > 0) {
        this.PaymentDateBegin = this.$moment(this.PaymentDate[0]).format(
          "YYYY-MM-DD"
        );
        this.PaymentDateEnd = this.$moment(this.PaymentDate[1]).format(
          "YYYY-MM-DD"
        );
      } else {
        this.PaymentDateBegin = "";
        this.PaymentDateEnd = "";
      }
      var parameters = {
        Condition: this.Condition,
        States: this.States || 0,
        PaymentDateBegin: this.PaymentDateBegin,
        PaymentDateEnd: this.PaymentDateEnd,
        CollectionTimeBegin: "",
        CollectionTimeEnd: "",
        SecondPartyName: this.SecondPartyName || null,
        ContractType: this.ContractType,
        CreateUserId: this.CreateUserId,
        PageIndex: 1,
        PageSize: 100000,
      };
      GetAdmin_PermissionExport(parameters).then((res) => {
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

    // 导入方法
    async submitUpload(param) {
      if (this.fileList.length <= 0) {
        this.$message.warning("请先选择需要上传的文件！");
        return false;
      }
      this.uploadLoading = true;
      // 要传入参数就不需要走action方法了，用下面的重写方法，这个组件的参数先不动
      this.$refs.upload.submit();
    },
    async UploadFile(file) {
      var token = this.$store.getters.token;
      const formData = new FormData();
      formData.append("File", file.file);
      formData.append("Flag", this.Flag);
      await axios({
        // 用axios发送post请求
        method: "post",
        url: process.env.VUE_APP_BASE_API + "CollectionMangement/UploadFiles",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
        data: formData,
      }).then((res) => {
        this.uploadLoading = false;
        if (res.data.success) {
          this.$message.success("回款数据导入成功");
          this.importDialogVisible = false;
          this.GetAdmin_Permission();
        } else {
          this.$message.error(res.data.resultMessage);
        }
        this.fileList = [];
        // 清空已上传的文件列表
        this.$refs.upload.clearFiles();
      });
    },
    // 文件上传服务端失败时的钩子
    fileUploadFail: function (err, file, fileList) {
      this.$message.error(err);
    },
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
      // console.log(file);
    },
    // 模板下载
    downloadTemplate() {
      var token = this.$store.getters.token;
      axios({
        // 用axios发送post请求
        method: "post",
        url:
          process.env.VUE_APP_BASE_API + "CollectionMangement/ExportEmployee", // 请求地址
        responseType: "blob", // 表明返回服务器返回的数据类型
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }).then((res) => {
        // 创建一个Blob对象，并使用URL.createObjectURL创建下载链接
        const blob = new Blob([res.data]);
        const url = window.URL.createObjectURL(blob);
        // 创建一个<a>元素，设置下载链接和文件名，模拟点击触发下载
        const link = document.createElement("a");
        link.href = url;
        link.download = "回款导入模板.xlsx"; // 替换为你想要的下载文件名
        document.body.appendChild(link);
        link.click();
        // 释放URL对象
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
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

    fixedShowMethod(newVal) {
      if (newVal < 768) {
        this.descriptionColumn = 1;
        this.fixedLeftShow = false;
      } else {
        this.descriptionColumn = 3;
        this.fixedLeftShow = true;
      }
    },
  },
};
</script>

<style scoped>
/* 设置外层el-table的悬浮样式并加入过渡效果 */
::v-deep .el-table__body tr {
  transition: background-color 0.3s ease; /* 设置背景色变化的过渡效果 */
}
/* 设置外层el-table的悬浮样式 */
::v-deep .el-table__body tr:hover {
  background-color: #f6f8fa !important;
}
.MiddleClass {
  margin-top: 10px;
}
.displayNoneClass {
  display: none;
}

.comentClass {
  width: 100%;
}
.comentBottomClass {
  width: 100%;
  margin-bottom: 0;
}

.el-divider__text {
  padding: 0 3;
  font-size: 12px;
  color: #ffffff;
  background-color: #303133;
}

.itemClass {
  margin-top: 0.3vh;
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

.el-dropdown {
  float: left;
  font-size: 12px;
  margin-left: 10px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #1890ff;
}

.WarningIcon {
  font-size: 23px;
  vertical-align: middle;
  cursor: pointer;
  color: #ffba00;
}
.ContentDes {
  font-size: 12px;
}
::v-deep .el-collapse-item__content {
  padding-bottom: 18px;
}
</style>
<style>
/* //el-popover弹出层过渡效果 */
.companyNameTransition-enter-active,
.companyNameTransition-leave-active {
  transition: all.3s;
}
.companyNameTransition-enter,
.companyNameTransition-leave-to {
  opacity: 0;
  transform: translate(-30px, 0px) scale(0.3);
}
.TipTransition-enter-active,
.TipTransition-leave-active {
  transition: all.3s;
}
.TipTransition-enter,
.TipTransition-leave-to {
  opacity: 0;
  transform: translate(30px, 0) scale(0.3);
}
</style>
