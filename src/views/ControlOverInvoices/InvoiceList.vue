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
                  <el-form-item class="whereFormClass" label="发票抬头">
                    <el-input
                      v-model="InvoiceHeader"
                      class="timeClass"
                      clearable=""
                      placeholder="发票抬头"
                    />
                  </el-form-item>
                  <!-- <el-form-item class="whereFormClass" label="应收月份">
                    <el-date-picker v-model="SMonth" style="width:100% ;" class="timeClass" type="month" placeholder="选择月"
                      format="MM" />
                  </el-form-item> -->
                </el-col>
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
                        >未开</el-tag>
                        <el-tag
                          v-if="item.Code == 1"
                          effect="plain"
                          type="success"
                        >已开</el-tag>
                        <el-tag v-if="item.Code == 5" effect="plain" type="info">作废</el-tag>
                        <el-tag
                          v-if="item.Code == 7"
                          effect="plain"
                          type="warning"
                        >退回</el-tag>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item class="whereFormClass" label="应收年月">
                    <el-date-picker
                      v-model="SYearSMonth"
                      type="month"
                      style="width: 100%"
                      class="timeClass"
                      placeholder="选择年月"
                    />
                  </el-form-item>
                  <!-- <el-form-item class="whereFormClass" label="应收年份">
                    <el-date-picker v-model="SYear" style="width:100% ;" class="timeClass" type="year"
                      placeholder="选择年" />
                  </el-form-item> -->
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
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item class="whereFormClass" label="开票人">
                    <el-select
                      v-model="IssuingPerson"
                      class="timeClass"
                      filterable
                      placeholder="开票人"
                      clearable
                    >
                      <el-option
                        v-for="item in IssuingPersonList"
                        :key="item.Code"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <el-form-item label="开具时间">
                    <el-date-picker
                      v-model="IssuingTime"
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
                  <el-form-item label="发票类型">
                    <el-select
                      v-model="InvoiceTypes"
                      class="comentClass"
                      filterable
                      placeholder="发票类型"
                      clearable
                    >
                      <el-option
                        v-for="item in InvoiceTypesList"
                        :key="item.Code"
                        :class="item.Class"
                        :label="item.Name"
                        :value="item.Code"
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
                  v-if="UpdateShow"
                  type="success"
                  icon="el-icon-edit"
                  @click="BatchUpdateDialog"
                >批量修改
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
                >{{ isActive ? "收起" : "展开" }}</el-button>
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
        <el-table-column
          key="column"
          type="selection"
          width="50"
          fixed="left"
        />
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
                      }}增值税专用发票<br>
                    </div>
                    <div>
                      <i class="dotClass" style="background-color: #ffba00" />{{
                        "\xa0\xa0"
                      }}增值税普通发票<br>
                    </div>
                    <div style="margin-bottom: 0">
                      <i class="dotClass" style="background-color: #ff4949" />{{
                        "\xa0\xa0"
                      }}增值税电子普通发票<br>
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
                      <el-tag key="未开" effect="plain" type="danger">未开</el-tag>
                    </div>
                    <div>
                      <el-tag key="已开" effect="plain" type="success">已开</el-tag>
                    </div>
                    <div>
                      <el-tag key="作废" effect="plain" type="info">作废</el-tag>
                    </div>
                    <div style="margin-bottom: 0">
                      <el-tag key="退回" effect="plain" type="warning">退回</el-tag>
                    </div>
                  </span>
                </div>
              </div>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-tag v-if="scope.row.IvState == 0" effect="plain" type="danger">未开</el-tag>
            <el-tag v-if="scope.row.IvState == 1" effect="plain" type="success">已开</el-tag>
            <el-tag v-if="scope.row.IvState == 5" effect="plain" type="info">作废</el-tag>
            <el-tag v-if="scope.row.IvState == 7" effect="plain" type="warning">退回</el-tag>
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
          label="备注"
          align="left"
          min-width="200"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="fixedLeftShow"
          label="操作"
          fixed="right"
          min-width="80"
        >
          <template slot-scope="scope" class="tableRowClass">
            <el-button
              icon="el-icon-edit"
              type="text"
              size="mini"
              @click="showEditDialog(scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column v-else label="操作" min-width="80">
          <template slot-scope="scope" class="tableRowClass">
            <el-button
              icon="el-icon-edit"
              type="text"
              size="mini"
              @click="showEditDialog(scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>
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

    <el-dialog
      :visible.sync="updateDialogVisible"
      :lock-scroll="false"
      width="70%"
      top="5vh"
      @close="detailUpdateDialogVisibleClosed"
    >
      <div slot="title" class="dialog-title">
        <span>编辑发票信息</span>
      </div>
      <el-form
        ref="updateInvoiceRef"
        :model="updateInvoiceFrom"
        :rules="updateContractsRules"
        label-width="100px"
        class="formClass"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司名称" prop="CompanyId">
              <el-select
                v-model="updateInvoiceFrom.CompanyId"
                style="width: 100%"
                filterable
                placeholder="公司名称"
                disabled
              >
                <el-option
                  v-for="item in selectCorporationDatas"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方公司" prop="SecondPartyName">
              <el-input v-model="updateInvoiceFrom.SecondPartyName" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票抬头" prop="InvoiceHeader">
              <el-input v-model="updateInvoiceFrom.InvoiceHeader" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票种类" prop="InvoiceType">
              <el-select
                v-model="updateInvoiceFrom.InvoiceType"
                class="timeClass"
                filterable
                placeholder="发票种类"
                disabled
              >
                <el-option
                  v-for="item in InvoiceTypeList"
                  :key="item.Code"
                  :class="item.Class"
                  :label="item.Name"
                  :value="item.Code"
                />
              </el-select>
            </el-form-item>
          </el-col>
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
          <el-col :span="12">
            <el-form-item label="申开人" prop="ApplyPerson">
              <el-select
                v-model="updateInvoiceFrom.ApplyPerson"
                filterable
                allow-create
                default-first-option
                placeholder="申开人"
                disabled
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
          <el-col :span="12">
            <el-form-item label="申开时间" prop="ApplyTime">
              <el-date-picker
                v-model="updateInvoiceFrom.ApplyTime"
                type="date"
                placeholder="申开时间"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开票人" prop="IssuingPerson">
              <el-select
                v-model="updateInvoiceFrom.IssuingPerson"
                filterable
                allow-create
                default-first-option
                placeholder="开票人"
                disabled
              >
                <el-option
                  v-for="item in IssuingPersonList"
                  :key="item.Code"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开具时间" prop="IssuingTime">
              <el-date-picker
                v-model="updateInvoiceFrom.IssuingTime"
                type="date"
                placeholder="开具时间"
                disabled
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="发票内容" prop="InvoiceContent">
              <el-input v-model="updateInvoiceFrom.InvoiceContent" placeholder="请输入发票内容" disabled />
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="发票科目" prop="InvoiceAccount">
              <el-select
                v-model="updateInvoiceFrom.InvoiceAccount"
                filterable
                placeholder="发票科目"
                disabled
              >
                <el-option
                  v-for="item in InvoiceAccountList"
                  :key="item.InvoiceAccountCode"
                  :class="item.Class"
                  :label="item.InvoiceAccountName"
                  :value="item.InvoiceAccountCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票类型" prop="InvoiceTypes">
              <el-select
                v-model="updateInvoiceFrom.InvoiceTypes"
                filterable
                placeholder="发票类型"
                disabled
              >
                <el-option
                  v-for="item in InvoiceTypesList"
                  :key="item.Code"
                  :class="item.Class"
                  :label="item.Name"
                  :value="item.Code"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票状态" prop="IvState">
              <el-select
                v-model="updateInvoiceFrom.IvState"
                :disabled="disabledFlag"
                filterable
                placeholder="发票状态"
                @change="ivStateChange"
              >
                <el-option
                  v-for="item in InvoiceStatusList"
                  :key="item.Code"
                  :class="item.Class"
                  :label="item.Name"
                  :value="item.Code"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票金额" prop="InvoiceAmount">
              <el-input v-model="updateInvoiceFrom.InvoiceAmount" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="发票备注" prop="InvoiceRemark">
          <el-input
            v-model="updateInvoiceFrom.InvoiceRemark"
            type="textarea"
            :rows="3"
            placeholder="请输入发票备注"
          />
        </el-form-item>
        <el-form-item label="已上传文件">
          <div v-if="updateInvoiceFrom.IvState == 1">
            <div
              v-for="item in updateInvoiceFrom.FileLists"
              :key="item"
              class="bottom clearfix"
            >
              {{ item.name }}
              <el-button
                icon="el-icon-view"
                type="text"
                class="button"
                @click="clickView(item)"
              >在线预览</el-button>
              <el-button
                icon="el-icon-download"
                type="text"
                class="button"
                @click="downView(item)"
              >下载</el-button>
            </div>
          </div>
          <div v-else>
            <el-upload
              ref="upload"
              class="upload-demo"
              action=""
              :headers="header"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png,.gif,.bmp,.ppt,.pptx,.rtf,.txt"
              :before-remove="beforeRemove"
              :on-remove="handleRemove"
              :file-list="updateInvoiceFrom.FileLists"
              :on-preview="AttachmentCodePreview"
            >
              <div slot="tip" style="margin-top: -30px" class="el-upload__tip">
                之前上传的文件，可对其进行删除操作（执行确定会立马删除）
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="附件上传">
          <el-upload
            ref="upload"
            class="upload-demo"
            action=""
            :headers="header"
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png,.gif,.bmp,.ppt,.pptx,.rtf,.txt"
            :limit="20"
            :on-exceed="handleExceedAddUpdate"
            :on-remove="AttachmentCodeRemoveUpdate"
            :auto-upload="false"
            :file-list="fileListUpload"
            :on-change="handleChangeAddUpload"
          >
            <el-button
              slot="trigger"
              icon="el-icon-position"
              plain
              type="primary"
            >选取文件</el-button>
            <el-button
              icon="el-icon-upload2"
              plain
              style="margin-left: 10px"
              type="success"
              :loading="uploadServerLoading"
              @click="submitUploadUpdate"
            >上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传office文件，且不超过<span style="color: #ff4949">20M</span>，可一次选取多个文件，上传完成请点击上传到服务器。
            </div>
          </el-upload>
        </el-form-item>
        <el-divider />
        <!-- <el-tag effect="plain"
          style="border-color: #A29BC4;color:#6959CD;margin-bottom:20px">合同系统帐单列表的回款下面会显示账单详情（客服系统生成的不显示）</el-tag> -->
        <el-descriptions
          v-if="DicCategoryList != null"
          title="公司开票信息"
          class="margin-top"
          :column="2"
          border
        >
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building" />
              公司名称
            </template>
            {{ DicCategoryList.ComName }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-s-ticket" />
              统一信用代码/税号
            </template>
            {{ DicCategoryList.TaxpayerIdentificationNumber }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-information" />
              注册地址
            </template>
            {{ DicCategoryList.RegisteredAddress }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-phone" />
              联系电话
            </template>
            {{ DicCategoryList.Phone }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-school" />
              开户银行
            </template>
            {{ DicCategoryList.DepositBank }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user-solid" />
              银行账号
            </template>
            {{ DicCategoryList.Account }}
          </el-descriptions-item>
        </el-descriptions>
        <!-- <el-divider v-if="updateInvoiceFrom.OrderData.length > 0" /> -->
        <!-- <el-table v-if="updateInvoiceFrom.OrderData.length > 0" :data="updateInvoiceFrom.OrderData" border>
          <el-table-column type="index" width="50" />
          <el-table-column label="账单名称" prop="ContractOrderName" min-width="250" show-overflow-tooltip />
          <el-table-column prop="ApplicationTime" label="账单申请日期" min-width="110" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="scope.row.ApplicationTime">
                <i class="el-icon-time" />
                <span style="margin-left: 6px">{{ dateFormat(scope.row.ApplicationTime) }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="CollectionAmount" label="使用金额" min-width="120">
            <template slot-scope="scope">
              <span v-format="'¥#,##0.00'">{{ scope.row.CollectionAmount }}</span>
            </template>
          </el-table-column>
        </el-table> -->
        <el-collapse
          v-if="updateInvoiceFrom.OrderData.length > 0"
          v-model="activeName"
          accordion
        >
          <el-collapse-item
            v-for="item in updateInvoiceFrom.OrderData"
            :key="item.name"
            :name="item.name"
          >
            <template slot="title">
              <i class="el-icon-money" /> {{ "\xa0\xa0"
              }}{{ item.ContractOrderName }}
            </template>
            <div
              v-for="itemChild in item.OrderDetailData"
              :key="itemChild"
              style="padding: 5px 0"
            >
              <el-tag type="info" effect="plain">{{ itemChild }}</el-tag>
            </div>
          </el-collapse-item>
        </el-collapse>
        <!-- <el-divider /> -->
        <el-row class="buttonCenter">
          <el-col>
            <el-button
              icon="el-icon-circle-check"
              type="primary"
              :loading="LoadingUpdate || uploadServerLoading"
              @click="saveUpdate"
            >保 存</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog
      append-to-body
      :visible="isshowpdf"
      width="65%"
      top="5vh"
      @close="isshowpdf = false"
    >
      <iframe
        v-if="isshowpdf"
        style="width: 100%; height: calc(100vh - 200px)"
        :src="srcDocx"
      />
    </el-dialog>
    <el-dialog
      :visible.sync="IvStateVisible"
      width="30%"
      top="15vh"
      @close="IvStateClosed"
    >
      <div slot="title" class="dialog-title">
        <span>编辑发票状态</span>
      </div>
      <el-form
        ref="updateInvoiceRef"
        :rules="updateContractsRules"
        label-width="100px"
        class="formClass"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="发票状态" prop="IvState">
              <el-select v-model="IvStateUpdate" placeholder="发票状态">
                <el-option
                  v-for="item in InvoiceStatusList"
                  :key="item.Code"
                  :class="item.Class"
                  :label="item.Name"
                  :value="item.Code"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button
              icon="el-icon-circle-check"
              type="primary"
              :loading="LoadingBatchUpdate"
              @click="BatchUpdate"
            >保 存</el-button>
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
  BatchUpdateCommit,
} from "@/api/CollectionMangement";
import {
  GetInvoiceAccount,
  DeleteInvoiceAttachment,
  Uploads,
  GetDicCategoryC,
  GetCompanySystem,
} from "@/api/SystemManagement";
// import { showLoading, hideLoading } from "@/common/loading";
import { parseTime } from "@/utils"; // 时间日期格式化成字符串
import collapse from "../../assets/js/collapse";
import pickerOptions from "@/utils/pickerOptions";
export default {
  name: "InvoiceList",
  components: { collapse },
  data() {
    return {
      LoadingBatchUpdate: false,
      IvStateUpdate: null,
      IvStateVisible: false,
      pickerOptions: pickerOptions,
      IssuingTime: [],
      InvoiceTypes: null,
      activeName: "",
      DicCategoryList: null,
      isActive: false,
      DicCategoryListAll: [],
      SecondPartyName: "",
      isshowpdf: false,
      srcDocx: "",
      uploadServerLoading: false,
      fileListUpload: [],
      header: { Authorization: sessionStorage.getItem("token") },
      // 发票类型*：全额（默认）/差额
      InvoiceTypesList: [
        { Code: 1, Name: "全额" },
        { Code: 2, Name: "差额" },
      ],
      InvoiceAccountList: [],
      fixedLeftShow: true,
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
      updateDialogVisible: false,
      InvoiceData: [],
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
        OrderData: [],
        FileLists: [],
        AttachmentLists: [],
        FileList: [],
      },
      loading: false,
      updateContractsRules: {},
      LoadingUpdateState: false,
      InvoiceStatusList: [],
      InvoiceTypeList: [],
      CompanyId: "",
      InvoiceType: null,
      IvState: null,
      SYearSMonth: "",
      // SYear: null,
      // SMonth: null,
      InvoiceHeader: "",
      ApplyPerson: "",
      IssuingPerson: "",
      ApplyPersonList: [],
      IssuingPersonList: [],
      disabledFlag: false,
      MinMoney: "",
      MaxMoney: "",
      multipleSelection: [],
      RoleName: sessionStorage.getItem("RoleName"),
      UpdateShow: false,
      IdStr: "",
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
    if (this.RoleName == "超级管理员" || this.RoleName == "财务") {
      this.UpdateShow = true;
    }
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
    // 获取发票科目数据
    this.GetInvoiceAccountList();
    // 获取乙方公司数据
    this.GetDicCategoryC();
  },
  methods: {
    // 样式
    isRed({ row }) {
      var checkIdList = this.multipleSelection.map((item) => item.Id);
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
    // 点击当前行数据进行选中或取消复选框
    toggleSelection(row, column, event) {
      if (column.label != "操作") {
        // 通过ref绑定后这里使用$refs.table来操作bom元素
        this.$refs.multipleTable.toggleRowSelection(row);
      }
    },
    // 复选框选中事件
    TableSelect(selection) {
      this.multipleSelection = selection;
      if (selection.length != 0) {
        this.IdStr = "";
        selection.forEach((element) => {
          this.IdStr += element.Id + ",";
        });
        this.IdStr = this.IdStr.substring(0, this.IdStr.lastIndexOf(","));
      } else {
        this.IdStr = "";
      }
    },
    IvStateClosed() {
      this.IvStateUpdate = null;
      this.IvStateVisible = false;
    },
    BatchUpdateDialog() {
      if (!this.IdStr) {
        this.$message.warning("请勾选要批量修改的发票");
        return;
      }
      this.IvStateVisible = true;
    },
    // 批量修改
    BatchUpdate() {
      if (!this.IvStateUpdate) {
        this.$message.warning("请选择发票状态");
        return;
      }
      const parameter = {
        IdStr: this.IdStr,
        IvState: this.IvStateUpdate,
      };
      this.LoadingBatchUpdate = true;
      BatchUpdateCommit(parameter).then((res) => {
        if (res.success) {
          this.IvStateVisible = false;
          this.$message({
            message:
              "操作成功！（此页面根据发票状态排序修改后的发票可能在此页面查询不到，请搜索查看）",
            type: "success",
            duration: 8000,
          });
          this.GetInvoiceData();
        } else {
          return this.$message.error(res.resultMessage);
        }
        setTimeout(() => {
          this.LoadingBatchUpdate = false;
        }, 300);
      });
    },
    datetimeChange(time) {
      // 强制刷新
      this.$forceUpdate();
    },
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
    clickView(src) {
      this.srcDocx = src.url;
      this.isshowpdf = true;
    },
    downView(src) {
      window.location.href = src.urlDown;
    },
    submitUploadUpdate() {
      this.uploadServerLoading = true;
      const formData = new FormData();
      this.fileListUpload.forEach((item) => {
        formData.append("Files", item.raw);
      });
      if (!formData) {
        this.$message.warning("请选择要上传到服务器的文件");
      }
      this.updateInvoiceFrom.FileList = [];
      Uploads(formData)
        .then((response) => {
          if (response.length > 0) {
            for (const index in response) {
              var addForm = {
                AttachmentName: response[index].attachmentName,
                FileName: response[index].fileName,
              };
              // 给添加表单的列表赋值
              this.updateInvoiceFrom.FileList.push(addForm);
            }
            this.$message.success("上传成功");
          } else {
            this.$message.error("上传失败");
          }
          this.uploadServerLoading = false;
        })
        .catch((error) => {
          this.uploadServerLoading = false;
          this.$message.error(error);
        });
    },
    // 修改-上传文件
    handleChangeAddUpload(file, fileList) {
      this.fileListUpload = fileList;
    },
    handleExceedAddUpdate(files, fileList) {
      this.$message.warning("当前文件数量超过限制");
    },
    AttachmentCodeRemoveUpdate(file, fileList) {
      this.fileListUpload = fileList;
    },
    AttachmentCodePreview(file) {
      window.open(file.url);
    },
    // 修改中对以前的文件进行编辑操作
    async beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove(file, fileList) {
      DeleteInvoiceAttachment(
        this.updateInvoiceFrom.AttachmentRelationCode,
        file.name
      ).then((res) => {
        if (res.success) {
          this.$message.success("操作成功！");
        } else {
          return this.$message.error(res.resultMessage);
        }
      });
    },
    // 获取发票科目数据
    GetInvoiceAccountList() {
      GetInvoiceAccount("", 1, 100000).then((res) => {
        if (res.success) {
          this.InvoiceAccountList = res.result.list;
          this.total = res.result.totalNumber;
        } else {
          this.InvoiceAccountList = [];
          this.total = 0;
        }
      });
    },
    // 列表时间格式化
    dateFormat(row) {
      if (row) {
        return this.$moment(row).format("YYYY-MM-DD");
      } else {
        return null;
      }
    },
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
      this.SecondPartyName = "";
      this.CompanyId = "";
      this.InvoiceType = null;
      this.IvState = "";
      this.SYearSMonth = "";
      // this.SYear = null;
      // this.SMonth = null;
      this.InvoiceHeader = "";
      this.ApplyPerson = "";
      this.IssuingPerson = "";
      this.IssuingTime = [];
      this.InvoiceTypes = null;
      this.queryInfo.pagesize = 20;
      this.queryInfo.pagenum = 1;
      this.GetInvoiceData();
    },
    ivStateChange(val) {
      if (val == "1") {
        const nowDate = new Date();
        this.updateInvoiceFrom.IssuingTime = parseTime(nowDate, "{y}-{m}-{d}");
        this.updateInvoiceFrom.IssuingPerson =
          sessionStorage.getItem("User_RealName");
      }
    },
    changeCompanyIdUpdate(e) {
      var item = this.selectCorporationDatas.filter((item) => {
        return item.value == e;
      });
      this.updateInvoiceFrom.FirstPartyName = item[0].label;
    },
    detailUpdateDialogVisibleClosed() {
      this.activeName = "";
      this.$refs.updateInvoiceRef.resetFields();
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
      this.fileListUpload = [];
      this.updateInvoiceFrom.FileList = [];
      this.remoteMethodShow(item.CompanyId);
      // this.updateInvoiceFrom = item;
      this.disabledFlag = item.IvState != 0;
      // 超级管理员可以进行回车操作（别的角色当发票状态是已开时不能再进行修改操作）
      if (sessionStorage.getItem("RoleName") == "超级管理员") {
        this.disabledFlag = false;
      }
      this.updateInvoiceFrom.InvoiceType = item.InvoiceType + "";
      this.updateInvoiceFrom.IvState = item.IvState + "";
      this.updateInvoiceFrom.IssuingTime = item.IssuingTime
        ? parseTime(new Date(item.IssuingTime), "{y}-{m}-{d}")
        : null;
      this.updateInvoiceFrom.ApplyTime = item.ApplyTime
        ? parseTime(new Date(item.ApplyTime), "{y}-{m}-{d}")
        : null;
      this.updateInvoiceFrom.Id = item.Id;
      this.updateInvoiceFrom.CompanyId = item.CompanyId;
      this.updateInvoiceFrom.InvoiceHeader = item.InvoiceHeader;
      this.updateInvoiceFrom.InvoiceAmount = item.InvoiceAmount;
      this.updateInvoiceFrom.SYear = item.SYear ? item.SYear + "" : "";
      this.updateInvoiceFrom.SMonth = item.SMonth ? item.SMonth + "" : "";
      this.updateInvoiceFrom.ApplyPerson = item.ApplyPerson;
      this.updateInvoiceFrom.IssuingPerson = item.IssuingPerson;
      this.updateInvoiceFrom.InvoiceContent = item.InvoiceContent;
      this.updateInvoiceFrom.InvoiceRemark = item.InvoiceRemark;
      this.updateInvoiceFrom.InvoiceAccount = item.InvoiceAccount;
      this.updateInvoiceFrom.InvoiceTypes = item.InvoiceTypes;
      this.updateInvoiceFrom.OrderData = item.OrderData;
      this.updateInvoiceFrom.AttachmentLists = item.AttachmentLists;
      this.updateInvoiceFrom.FileLists = item.FileLists;
      this.updateInvoiceFrom.AttachmentRelationCode =
        item.AttachmentRelationCode;
      this.updateInvoiceFrom.SecondPartyName = item.SecondPartyName;
      // 根据公司编号获取公司发票信息
      GetCompanySystem(
        item.PayerCompanyId, // 公司编号
        "",
        1,
        100000
      ).then((res) => {
        if (res.success) {
          this.DicCategoryList = res.result.list[0];
        } else {
          this.DicCategoryList = null;
        }
      });
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
          // 如果有附件，那么需要进行判断
          if (
            this.fileListUpload.length != 0 ||
            this.updateInvoiceFrom.FileList.length != 0
          ) {
            for (const index in this.fileListUpload) {
              var flagz = this.updateInvoiceFrom.FileList.filter((item) => {
                return item.FileName == this.fileListUpload[index].name;
              });
              if (flagz.length == 0) {
                this.LoadingUpdate = false;
                this.$message.warning(
                  "文件上传完成或者修改需要点击一下上传服务器"
                );
                return;
              }
            }
          }
          // 反向对比
          if (
            this.fileListUpload.length != 0 ||
            this.updateInvoiceFrom.FileList.length != 0
          ) {
            for (const index in this.updateInvoiceFrom.FileList) {
              var flagf = this.fileListUpload.filter((item) => {
                return (
                  item.name == this.updateInvoiceFrom.FileList[index].FileName
                );
              });
              if (flagf.length == 0) {
                this.LoadingUpdate = false;
                this.$message.warning(
                  "文件上传完成或者修改需要点击一下上传服务器"
                );
                return;
              }
            }
          }
          this.updateInvoiceFrom.SYear = this.updateInvoiceFrom.SYear || null;
          this.updateInvoiceFrom.SMonth = this.updateInvoiceFrom.SMonth || null;
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
      // if (this.SYear) { this.SYear = parseTime(new Date(this.SYear), "{y}") }
      // if (this.SMonth) { this.SMonth = parseTime(new Date(this.SMonth), "{m}") }
      if (this.SYearSMonth) {
        this.SYearSMonth = parseTime(new Date(this.SYearSMonth), "{y}-{m}");
      }
      let IssuingTimeBegin = "";
      let IssuingTimeEnd = "";
      if (this.IssuingTime && this.IssuingTime.length > 0) {
        IssuingTimeBegin = this.$moment(this.IssuingTime[0]).format(
          "YYYY-MM-DD"
        );
        IssuingTimeEnd = this.$moment(this.IssuingTime[1]).format("YYYY-MM-DD");
      } else {
        this.IssuingTimeBegin = "";
        this.IssuingTimeEnd = "";
      }
      var parameters = {
        CompanyId: this.CompanyId,
        InvoiceType:
          this.InvoiceType === ""
            ? null
            : parseInt(this.InvoiceType, 10) || null,
        IvState: this.IvState === "" ? null : parseInt(this.IvState, 10),
        SYearSMonth: this.SYearSMonth,
        InvoiceHeader: this.InvoiceHeader,
        ApplyPerson: this.ApplyPerson,
        IssuingPerson: this.IssuingPerson,
        Flag: false,
        SecondPartyName: this.SecondPartyName,
        IssuingTimeBegin: IssuingTimeBegin,
        IssuingTimeEnd: IssuingTimeEnd,
        InvoiceTypes: this.InvoiceTypes || null,
        PageIndex: this.queryInfo.pagenum,
        PageSize: this.queryInfo.pagesize,
      };
      GetInvoiceDataMethod(parameters).then((res) => {
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
        this.fixedLeftShow = false;
      } else {
        this.fixedLeftShow = true;
      }
    },
  },
};
</script>

<style scoped>
/* ::v-deep .el-collapse-item__header {
    font-weight: 550;
} */
.formClass {
  width: 100%;
}

.moneyClass {
  color: #13ce66;
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
  background-color: #fef0f0;
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

.button {
  margin-left: 1rem;
}
.comentClass {
  width: 100%;
}
</style>
