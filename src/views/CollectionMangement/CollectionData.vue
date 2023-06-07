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
              <el-form-item label="回款状态">
                <el-select v-model="States" class="comentClass" filterable placeholder="回款状态" clearable="" collapse-tags>
                  <el-option v-for="item in PaymentCollectionStateArray" :key="item.Code" :label="item.Name"
                    :value="item.Code">
                    <template slot-scope="scope">
                      <!-- <el-tag effect="plain" key="全部"  type="info" v-if="item.Code == 0">全部</el-tag> -->
                      <el-tag v-if="item.Code == 1" key="未回款" effect="plain" type="danger">未回款</el-tag>
                      <el-tag v-if="item.Code == 2" key="已回款" effect="plain" type="success">已回款</el-tag>
                      <el-tag v-if="item.Code == 3" key="有余额" effect="plain">有余额</el-tag>
                    </template>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item label="公司名称">
                <el-input v-model="Condition" clearable placeholder="公司名称" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item label="到账时间">
                <el-date-picker v-model="PaymentDate" class="comentClass" type="daterange" range-separator="至"
                  start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" clearable=""
                  @input="datetimeChange" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item label="收款公司" prop="SecondPartyName">
                <el-select v-model="SecondPartyName" class="comentClass" filterable placeholder="收款公司" clearable="">
                  <el-option v-for="item in DicCategoryList" :key="item.Id" :label="item.Name" :value="item.Id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="colRight">
              <el-button-group style="margin-left: 1.3rem;margin-bottom: 18px;">
                <el-button type="primary" icon="el-icon-search" @click="GetAdmin_PermissionSearch">查 询
                </el-button>
                <el-dropdown trigger="click" style="margin-left: 0;" @command="(command) => {
                  handleButtonCommand(command);
                }
                  ">
                  <el-button type="success">
                    更 多<i class="el-icon-arrow-down el-icon--right" />
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :disabled="IfUser" command="a" icon="el-icon-download">模板下载{{ "\xa0\xa0" }}
                    </el-dropdown-item>
                    <el-dropdown-item :disabled="IfUser" command="b" icon="el-icon-upload2">上传文件 {{ "\xa0\xa0" }}
                    </el-dropdown-item>
                    <el-dropdown-item :disabled="!StatesShow" command="c" icon="el-icon-document">导出数据
                      {{ "\xa0\xa0" }}</el-dropdown-item>
                    <!-- <el-dropdown-item command="d" v-if="StatesShow" icon="el-icon-edit">改为已回款
                    </el-dropdown-item> -->
                    <el-dropdown-item :disabled="IfUser" command="e" icon="el-icon-delete">批量撤回 {{ "\xa0\xa0" }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-button-group>
            </el-col>
            <el-col :span="tipWidth" style="text-align: right;">
              <el-tooltip placement="left">
                <div slot="content" style="line-height: 20px;font-size: 13px;width: 300px;">
                  <span style="font-weight: bold;font-size: 14px;">公司数据不显示问题：</span>
                  <el-divider content-position="left">解决方案如下</el-divider>
                  <div style="margin-bottom:15px ; color: #ffba00;">1. 检查保险管理后台系统查看是否存在该公司</div>
                  <div style="margin-bottom:15px ;color: #13ce66;">
                    2. 在回款系统中回款管理——关联用户中查看是否已经关联了所需要的用户(只针对客服角色)</div>
                  <div style="color: #ff4949; ;">
                    3. 如果前两项没有问题则需要联系管理员检查一下导入的公司名称是否和保险管理后台系统的公司名称是否完全一致（很重要）！
                  </div>
                </div>
                <el-badge value="hot" class="item">
                  <el-button icon="el-icon-warning-outline">提示</el-button>
                </el-badge>
              </el-tooltip>
            </el-col>
          </el-row>
          <el-descriptions style="margin-left: 1.3rem;" class="margin-top" :column="descriptionColumn" border>
            <el-descriptions-item v-for="item in TotalSecondPartyNameList" :labelStyle="DescriptionStyle">
              <template slot="label">
                <i class="el-icon-money"></i>
                {{ item.SecondPartyName }}
              </template>
              <div>
                <el-tooltip v-if="item.Sum > 0" class="item" :content="item.SumDetail" placement="bottom">
                  <span style="font-weight: bold;" v-format="'¥#,##0.00'">{{
                    item.Sum
                  }}</span>
                </el-tooltip>
                <span style="font-weight: bold;" v-else v-format="'¥#,##0.00'">{{
                  item.Sum
                }}</span>
              </div>

            </el-descriptions-item>
          </el-descriptions>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="CardTableClass">
      <el-table class="tableCheckClass" ref="multipleTable" v-loading="loading" :data="CollectionList" fit
        :cell-style="showBackground" @selection-change="TableSelect" @row-click="toggleSelection">
        <el-table-column type="selection" width="50" />
        <el-table-column prop="EnterPriseName" label="公司名称" min-width="200" show-overflow-tooltip />
        <el-table-column prop="SecondPartyName" label="收款公司" min-width="100" show-overflow-tooltip>
          <template slot-scope="{}" slot="header">
            <span>收款公司</span>
            <el-tooltip class="item" effect="light" placement="bottom" style="margin-left: 5px;margin-bottom: 0.2rem">
              <i class="el-icon-question" style="font-size: 14px; vertical-align: middle;"></i>
              <div slot="content">
                <div style="display: flex;  align-items: center;">
                  <span slot="reference" style="margin-right: 10px;" class="SecondPartyNameClass">
                    <div> <i class="dotClass" style="background-color: #EB2F96" />{{ "\xa0\xa0" }}格信诺诚<br /></div>
                    <div><i class="dotClass" style="background-color: #1890FF" />{{ "\xa0\xa0" }}格锐智诚<br /></div>
                    <div><i class="dotClass" style="background-color: #304156" />{{ "\xa0\xa0" }}人保直投<br /></div>
                    <div> <i class="dotClass" style="background-color: #212121" />{{ "\xa0\xa0" }}点米科技<br /></div>
                    <div> <i class="dotClass" style="background-color: #11A983" />{{ "\xa0\xa0" }}其他保司直投<br /></div>
                    <div> <i class="dotClass" style="background-color: #13C2C2" />{{ "\xa0\xa0" }}格锐博金<br /></div>
                    <div> <i class="dotClass" style="background-color: #6959CD" />{{ "\xa0\xa0" }}马鞍山格信<br /></div>
                    <div> <i class="dotClass" style="background-color: #F5222D" />{{ "\xa0\xa0" }}南京公司<br /></div>
                    <div> <i class="dotClass" style="background-color: #ffba00" />{{ "\xa0\xa0" }}格锐商业<br /></div>
                    <div style="margin-bottom: 0;"> <i class="dotClass" style="background-color: #FA8C16" />{{ "\xa0\xa0"
                    }}安欣智诚</div>
                  </span>
                </div>
              </div>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <div style="display: flex;  align-items: center;">
              <span slot="reference" style="margin-right: 8px;">
                <i v-if="scope.row.SecondPartyName == '格信诺诚'" class="dotClass" style="background-color: #EB2F96" />
                <i v-if="scope.row.SecondPartyName == '格锐智诚'" class="dotClass" style="background-color: #1890FF" />
                <i v-if="scope.row.SecondPartyName == '人保直投'" class="dotClass" style="background-color: #304156" />
                <i v-if="scope.row.SecondPartyName == '点米科技'" class="dotClass" style="background-color: #212121" />
                <i v-if="scope.row.SecondPartyName == '其他保司直投'" class="dotClass" style="background-color: #11A983" />
                <i v-if="scope.row.SecondPartyName == '格锐博金'" class="dotClass" style="background-color: #13C2C2" />
                <i v-if="scope.row.SecondPartyName == '马鞍山格信'" class="dotClass" style="background-color: #6959CD" />
                <i v-if="scope.row.SecondPartyName == '南京公司'" class="dotClass" style="background-color: #F5222D" />
                <i v-if="scope.row.SecondPartyName == '格锐商业'" class="dotClass" style="background-color: #ffba00" />
                <i v-if="scope.row.SecondPartyName == '安欣智诚'" class="dotClass" style="background-color: #FA8C16" />
              </span>
              {{ scope.row.SecondPartyName }}
            </div>
          </template>

        </el-table-column>
        <el-table-column prop="AmountMoney" label="金额" min-width="100" sortable="">
          <template slot-scope="scope">
            <span v-format="'¥#,##0.00'">{{ scope.row.AmountMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="RemainingAmount" label="余额" min-width="100" sortable="">
          <template slot-scope="scope">
            <span v-format="'¥#,##0.00'" style="color:#13C2C2 ;">{{ scope.row.RemainingAmount }}</span>
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
        <el-table-column prop="States" label="回款状态" min-width="100">
          <template slot-scope="{}" slot="header">
            <span>回款状态</span>
            <el-tooltip class="item" effect="light" placement="bottom" style="margin-left: 5px;margin-bottom: 0.2rem">
              <i class="el-icon-question" style="font-size: 14px; vertical-align: middle;"></i>
              <div slot="content">
                <div style="display: flex;  align-items: center;">
                  <span slot="reference" style="margin: 0 10px 0 6px;" class="SecondPartyNameClass">
                    <div> <el-tag key="未回款" effect="plain" type="danger">未回款</el-tag></div>
                    <div><el-tag key="已回款" effect="plain" type="success">已回款</el-tag></div>
                    <div style="margin-bottom: 0;"><el-tag key="有余额" effect="plain">有余额</el-tag></div>
                  </span>
                </div>
              </div>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-tag v-if="scope.row.States == 1" key="未回款" effect="plain" type="danger">未回款</el-tag>
            <el-tag v-if="scope.row.States == 2" key="已回款" effect="plain" type="success">已回款</el-tag>
            <el-tag v-if="scope.row.States == 3" key="有余额" effect="plain">有余额</el-tag>
            <!-- <el-tag  type="danger" v-if="scope.row.States == 1">未回款</el-tag>
              <el-tag  type="success" v-if="scope.row.States == 2">已回款</el-tag>
              <el-tag v-if="scope.row.States == 3">有余额</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column prop="CreateTimeStr" label="导入时间" sortable min-width="170">
          <template slot-scope="scope">
            <div v-if="scope.row.CreateTimeStr">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.CreateTimeStr }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="User_Name" label="收取人" min-width="100" />
        <el-table-column prop="CollectionTime" label="收取时间" min-width="170">
          <template slot-scope="scope">
            <div v-if="scope.row.CollectionTime">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.CollectionTime }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="Remark" label="备注" align="left" min-width="250" show-overflow-tooltip />
        <el-table-column label="操作" fixed="right" :width="DynamicColumn" v-if="fixedLeftShow">
          <template slot-scope="scope">
            <div v-if="RoleName == '客服'">
              <el-button v-if="scope.row.States != 2" icon="el-icon-refresh-left" type="text" size="mini" @click="
                UpdateDialog(scope.row)
                ">回款</el-button>
              <el-button icon="el-icon-view" type="text" size="mini" @click="
                ShowDialog(scope.row)
                ">详情</el-button>
              <el-button icon="el-icon-edit" type="text" size="mini" @click="
                UpdateDetailDialog(scope.row.InsProductPayCode, scope.row.Remark)
                ">修改</el-button>
            </div>
            <div v-else-if="RoleName == '超级管理员'">
              <el-button-group>
                <el-dropdown trigger="click" @command="(command) => {
                  handleCommand(command, scope.row);
                }
                  ">
                  <el-button type="text" size="mini">
                    更多操作<i class="el-icon-arrow-down el-icon--right" />
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-if="scope.row.States != 2" command="a" icon="el-icon-refresh-left">回款(客服){{ "\xa0\xa0" }}
                    </el-dropdown-item>
                    <el-dropdown-item command="b" icon="el-icon-view">详情(客服){{ "\xa0\xa0" }}</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.States != 2" command="c" icon="el-icon-refresh-left">回款(其它){{ "\xa0\xa0" }}
                    </el-dropdown-item>
                    <el-dropdown-item command="d" icon="el-icon-view">详情(其它){{ "\xa0\xa0" }}</el-dropdown-item>
                    <el-dropdown-item command="e" icon="el-icon-edit">修改{{ "\xa0\xa0" }}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-button-group>
            </div>
            <div v-else>
              <el-button v-if="scope.row.States != 2" icon="el-icon-refresh-left" type="text" size="mini" @click="
                UpdateOtherDialog(scope.row)
                ">回款</el-button>
              <el-button icon="el-icon-view" type="text" size="mini" @click="
                ShowOtherDialog(scope.row)
                ">详情</el-button>
              <el-button icon="el-icon-edit" type="text" size="mini" @click="
                UpdateDetailDialog(scope.row.InsProductPayCode, scope.row.Remark)
                ">修改</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" :width="DynamicColumn" v-else>
          <template slot-scope="scope">
            <div v-if="RoleName == '客服'">
              <el-button v-if="scope.row.States != 2" icon="el-icon-refresh-left" type="text" size="mini" @click="
                UpdateDialog(scope.row)
                ">回款</el-button>
              <el-button icon="el-icon-view" type="text" size="mini" @click="
                ShowDialog(scope.row)
                ">详情</el-button>
              <el-button icon="el-icon-edit" type="text" size="mini" @click="
                UpdateDetailDialog(scope.row.InsProductPayCode, scope.row.Remark)
                ">修改</el-button>
            </div>
            <div v-else-if="RoleName == '超级管理员'">
              <el-button-group>
                <el-dropdown trigger="click" @command="(command) => {
                  handleCommand(command, scope.row);
                }
                  ">
                  <el-button type="text" size="mini">
                    更多操作<i class="el-icon-arrow-down el-icon--right" />
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-if="scope.row.States != 2" command="a" icon="el-icon-refresh-left">回款(客服){{ "\xa0\xa0" }}
                    </el-dropdown-item>
                    <el-dropdown-item command="b" icon="el-icon-view">详情(客服){{ "\xa0\xa0" }}</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.States != 2" command="c" icon="el-icon-refresh-left">回款(其它){{ "\xa0\xa0" }}
                    </el-dropdown-item>
                    <el-dropdown-item command="d" icon="el-icon-view">详情(其它){{ "\xa0\xa0" }}</el-dropdown-item>
                    <el-dropdown-item command="e" icon="el-icon-edit">修改{{ "\xa0\xa0" }}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-button-group>
            </div>
            <div v-else>
              <el-button v-if="scope.row.States != 2" icon="el-icon-refresh-left" type="text" size="mini" @click="
                UpdateOtherDialog(scope.row)
                ">回款</el-button>
              <el-button icon="el-icon-view" type="text" size="mini" @click="
                ShowOtherDialog(scope.row)
                ">详情</el-button>
              <el-button icon="el-icon-edit" type="text" size="mini" @click="
                UpdateDetailDialog(scope.row.InsProductPayCode, scope.row.Remark)
                ">修改</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination background :current-page="queryInfo.pagenum" :page-sizes="[20, 50, 100, 500]"
        :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-card>
    <el-dialog title="客服回款" :visible.sync="updateDialogVisible" top="5vh" width="70%">
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
          <el-badge is-dot class="itemClass">{{ ClickRow.PaymentDate }}</el-badge>

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
          <span style="color: #ff4949;font-weight: bolder;">{{ ClickRow.RemainingAmount }}</span>
          <el-tag type="success" effect="plain" style="margin-left:20px">输入本次回款金额会自动计算临时剩余金额</el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <el-divider></el-divider>
      <el-table :data="CollectionOrderData" border :span-method="rowSpanMethod" v-loading="CollectionLoading"
        @cell-click="CollectionOrderClick" :cell-style="showCollection">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column label="通道名称" prop="ChName" width="100"></el-table-column>
        <el-table-column label="合同方名称" prop="ConName" show-overflow-tooltip min-width="90"></el-table-column>
        <el-table-column label="付款方名称" prop="CorpName" show-overflow-tooltip min-width="90"></el-table-column>
        <el-table-column label="账单月份" prop="OrderDateStr" width="80"></el-table-column>
        <el-table-column label="账单应收" prop="ShouldInAmt" width="90">
          <template slot-scope="scope">
            <span v-format="'¥#,##0.00'">{{ scope.row.ShouldInAmt }}</span>
          </template>
        </el-table-column>
        <el-table-column label="实际应缴" prop="ServShouldIn" width="95">
          <template slot-scope="{}" slot="header">
            <span>实际应缴</span>
            <el-tooltip class="item" effect="dark" placement="top" style="margin-left: 5px;margin-bottom: 0.2rem">
              <i class="el-icon-question" style="font-size: 14px; vertical-align: middle;"></i>
              <div slot="content">
                <p style="color: #ffba00;font-weight: bolder;">便捷操作：点击实际应缴会自动填充 “本次回款金额” 列（ 实际应缴 - 回款金额 ）。</p>
              </div>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <span v-format="'¥#,##0.00'">{{ scope.row.ServShouldIn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="回款金额" prop="ServReceive" width="90">
          <template slot-scope="scope">
            <span v-format="'¥#,##0.00'">{{ scope.row.ServReceive }}</span>
          </template>
        </el-table-column>
        <el-table-column label="本次回款金额" prop="ServReceiveNew" width="120">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.ServReceiveNew" placeholder="金额" clearable
              @input="handleChange(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column label="回款状态" prop="ReceiveState" width="90">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.ReceiveState == 0" effect="plain" type="danger">未回款</el-tag>
            <el-tag v-if="scope.row.ReceiveState == 2" effect="plain">部分回款</el-tag>
            <el-tag v-if="scope.row.ReceiveState == 5" effect="plain" type="warning">挂账</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-divider />
      <el-form ref="updateRef" :model="updateCollectionFrom" label-width="40px">
        <el-form-item label="备注">
          <el-input v-model="updateCollectionFrom.Remark" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <el-divider />
      <el-row style="text-align:center;">
        <el-col :span="24">
          <el-button icon="el-icon-circle-check" :loading="LoadingUpdate" type="primary" @click="saveUpdate">保 存</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog title="除客服之外其它角色回款" :visible.sync="updateDialogOtherVisible" top="5vh" width="70%">
      <el-descriptions v-if="ClickRowOther" class="margin-top" :column="3" border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            收款公司
          </template>
          {{ ClickRowOther.SecondPartyName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            公司名称
          </template>
          {{ ClickRowOther.EnterPriseName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-date"></i>
            到账时间
          </template>
          <el-badge is-dot class="itemClass">{{ ClickRowOther.PaymentDate }}</el-badge>

        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-money"></i>
            总金额
          </template>
          <span style="font-weight:bolder;">{{ ClickRowOther.AmountMoney }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-money"></i>
            剩余金额
          </template>
          <span style="color: #ff4949;font-weight: bolder;">{{ ClickRowOther.RemainingAmount }}</span>
          <el-tag type="success" effect="plain" style="margin-left:20px">输入本次回款金额会自动计算临时剩余金额</el-tag>
        </el-descriptions-item>
      </el-descriptions>
       <el-divider />
      <el-table :data="CollectionOrderOtherData" border :span-method="rowSpanMethodOther"
        v-loading="CollectionOtherLoading" @cell-click="CollectionOrderClickOther" :cell-style="showCollectionOther">
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
          <template slot-scope="{}" slot="header">
            <span>收款金额</span>
            <el-tooltip class="item" effect="dark" placement="top" style="margin-left: 5px;margin-bottom: 0.2rem">
              <i class="el-icon-question" style="font-size: 14px; vertical-align: middle;"></i>
              <div slot="content">
                <p style="color: #ffba00;font-weight: bolder;">便捷操作：点击收款金额会自动填充 “本次回款金额” 列（ 收款金额 - 回款金额 ）。</p>
              </div>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <span v-format="'¥#,##0.00'">{{ scope.row.CustomAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="回款金额" prop="OrderAmount" width="90">
          <template slot-scope="scope">
            <span v-format="'¥#,##0.00'">{{ scope.row.OrderAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="本次回款金额" prop="ServReceiveNew" width="120">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.ServReceiveNew" placeholder="金额" clearable
              @input="handleChangeOther(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column label="回款状态" prop="OrderState" width="90">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.OrderState == 1" effect="plain" type="danger">未回款</el-tag>
            <el-tag v-if="scope.row.OrderState == 3" effect="plain">部分回款</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-divider />
      <el-form ref="updateRef" :model="updateCollectionFrom" label-width="40px">
        <el-form-item label="备注">
          <el-input v-model="updateCollectionFrom.Remark" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <el-divider />
      <el-row style="text-align:center;">
        <el-col :span="24">
          <el-button icon="el-icon-circle-check" :loading="LoadingUpdateOther" type="primary" @click="saveUpdateOther">保 存</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog title="上传文件" :visible.sync="importDialogVisible" width="30%">
      <el-form ref="importRef" label-width="120px">
        <el-form-item label="重复数据判断" prop="Flag">
          <el-switch v-model="Flag" active-color="#1E90FF" inactive-color="#FFB6C1" active-text="是" inactive-text="否" />
        </el-form-item>
        <el-form-item label="文 件">
          <el-upload ref="upload" :action="actionUrl" :on-preview="handlePreview" :on-remove="handleRemove"
            :on-success="fileUploadSuccess" :on-error="fileUploadFail" :on-change="fileChange" :file-list="fileList"
            :limit="1" :auto-upload="false" :headers="myHeaders">
            <el-button icon="el-icon-position"   plain slot="trigger" type="primary" class="buttonM">选取文件</el-button>
          </el-upload>
        </el-form-item>
        <el-divider />
        <el-row style="text-align:center;">
          <el-col :span="24">
            <el-button icon="el-icon-upload2"  :loading="uploadLoading" type="success" @click="submitUpload">开始导入</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog title="修改备注" :visible.sync="updateDetailDialogVisible" width="30%">
      <el-form ref="updateRef" :model="updateCollectionDetailFrom" label-width="80px">
        <el-form-item label="备注">
          <el-input v-model="updateCollectionDetailFrom.Remark" type="textarea" :rows="3" placeholder="" />
        </el-form-item>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button icon="el-icon-circle-check" v-loading.fullscreen.lock="LoadingDetailUpdate" type="primary" @click="saveDetailUpdate">保 存</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <Customer :visible="dialogVisible" :ClickRow="ClickRow" @CloseDialog="CloseComponentsDialog"
      @CloseDialogReflesh="RenovateDataDialog">
    </Customer>
    <CustomerOther :visible="dialogOtherVisible" :ClickRow="ClickRowOther" @CloseDialog="CloseComponentsOtherDialog"
      @CloseDialogReflesh="RenovateDataOtherDialog">
    </CustomerOther>
    <div v-if="isShowProgress" class="popContainer">
      <el-progress type="circle" :percentage="parseInt(fakes.progress * 100)" :stroke-width="9" :color="customColors"
        style="top: 30%; left: calc(50vw - 58px);color:white"></el-progress>
    </div>
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
} from "@/api/CollectionMangement";
import {
  GetDicCategoryC,
} from "@/api/SystemManagement";
import { cutOutNum } from '@/utils/decimals'
import axios from "axios";
import { showLoading, hideLoading } from "@/common/loading";
import Customer from "./Components/Customer"
import CustomerOther from "./Components/CustomerOther"
import moment from 'moment';
import FakeProgress from 'fake-progress';
import { BigNumber } from 'bignumber.js';

export default {
  name: 'CollectionData',
  components: { Customer,CustomerOther },
  data() {
    return {
      LoadingUpdateOther:false,
      RoleName: sessionStorage.getItem("RoleName"),
      DynamicColumn: '',
      fixedLeftShow: true,
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
      LoadingDetailUpdate: false,
      CollectionLoading: false,
      dialogVisible: false,
      dialogOtherVisible: false,
      CollectionOrderData: [],
      ClickRow: null,
      ClickRowOld: null,
      DescriptionStyle: 'width:170px',
      SecondPartyName: '',
      DicCategoryList: [],
      descriptionColumn: 3,
      TotalSecondPartyNameList: [],
      multipleSelection: [],
      colRight: 20,
      tipWidth: 4,
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
      myHeaders: { 'X-Token': sessionStorage.getItem("token") },
      RoleName: sessionStorage.getItem("RoleName"),
      actionUrl: "",
      fileList: [], // 文件列表
      fileListCopy: [], // 文件列表
      file: null,
      loading: false,
      // 回款状态
      PaymentCollectionStateArray: [
        // { Code: 0, Name: "全部" },
        { Code: 1, Name: "未回款" },
        { Code: 2, Name: "已回款" },
        { Code: 3, Name: "有余额" },
      ],
      // 判断选中的数据回款状态是否都是未回款，只要有一个是已回款，那么这个状态为true
      collectionStateFlag: false,
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
      isShowProgress: false,
      ClickRowOther: null,
      ClickRowOldOther: null,
      CollectionOtherLoading: false,
      CollectionOrderOtherData: [],
      updateDialogOtherVisible: false,

    };
  },
  watch: {
    '$store.getters.clientWidth'(newVal, oldVal) {
      this.fixedShowMethod(newVal);
    },
    Flag(newValue) {
      this.actionUrl =
        process.env.VUE_APP_BASE_API + "/CollectionMangement/UploadFiles?Flag=" + newValue;
    },
  },
  created() {
    if (sessionStorage.getItem("RoleName") == "超级管理员")
      this.DynamicColumn = '120';
    else
      this.DynamicColumn = '250';
    this.PaymentDate = [moment().subtract(1, 'months').startOf('month').format("YYYY-MM-DD"), moment().format('YYYY-MM-DD')];
  },
  // 加载完成后执行调取回款数据接口
  mounted() {
    this.fixedShowMethod(this.$store.getters.clientWidth);
    switch (sessionStorage.getItem("RoleName")) {
      case "超级管理员":
      case "总客服":
        this.IfUser = false;
        this.StatesShow = true;
        break;
      case "财务":
        this.IfUser = false;
        this.StatesShow = false;
        break;
      case "HRO":
      case "客服":
        this.IfUser = true;
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
      process.env.VUE_APP_BASE_API + "/CollectionMangement/UploadFiles?Flag=" + this.Flag;
  },
  methods: {
    // 列表时间格式化
    dateFormat(row) {
      if (row) {
        return this.$moment(row).format("YYYY-MM-DD");
      } else { return null; }
    },
    // 执行列表右侧关联操作
    handleCommand(flag, row) {
      switch (flag) {
        case "a":
          this.UpdateDialog(row)
          break;
        case "b":
          this.ShowDialog(row)
          break;
        case "c":
          this.UpdateOtherDialog(row)
          break;
        case "d":
          this.ShowOtherDialog(row)
          break
        case "e":
          this.UpdateDetailDialog(row.InsProductPayCode, row.Remark)
          break
      }
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
    //为要复制的单元格填充背景颜色
    showCollection({ row, column }) {
      if (column.label == "实际应缴") {
        return {
          backgroundColor: "#E6F7FF",
        };
      } else {
        return {
          backgroundColor: "#FFFFFF",
        };
      }
    },
    //为要复制的单元格填充背景颜色
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
    //点击单元格时触发
    CollectionOrderClick(row, column, cell, event) {
      if (column.label == "实际应缴") {
        row.ServReceiveNew = this.minus(row.ServShouldIn, row.ServReceive);
        this.handleChange(row);
      }
    },
    handleChange(row) {
      //验证输入是否金额，如果不是直接返回
      row.ServReceiveNew = /^\d+\.?\d{0,2}$/.test(row.ServReceiveNew) ?
        row.ServReceiveNew :
        (row.ServReceiveNew.indexOf('.') == -1 ?
          "" :
          cutOutNum(parseFloat(row.ServReceiveNew)));

      this.RecalculateMoney();
      // //临时金额，判断剩余金额-当前输入金额是否>=0
      // let remainingAmount = this.ClickRow.RemainingAmount - row.ServReceiveNew;
      //如果该行的实际应缴减去回款金额小于当前输入金额或者临时金额小于零，那么证明输入金额不合法
      if (parseFloat((row.ServShouldIn - row.ServReceive).toFixed(2)) < parseFloat(row.ServReceiveNew) || parseFloat(this.ClickRow.RemainingAmount) < 0) {
        row.ServReceiveNew = "";
        this.$message.warning("金额输入不合理，请重新输入");
      }
      this.RecalculateMoney();
      return;
    },
    RecalculateMoney() {
      let totalInputMoney = 0;
      this.CollectionOrderData.forEach((item) => {
        totalInputMoney += item.ServReceiveNew ? parseFloat(item.ServReceiveNew) : 0;
      })
      this.ClickRow.RemainingAmount = (this.ClickRowOld.RemainingAmount - totalInputMoney).toFixed(2);
    },
    //点击单元格时触发
    CollectionOrderClickOther(row, column, cell, event) {
      if (column.label == "收款金额") {
        row.ServReceiveNew = this.minus(row.CustomAmount, row.OrderAmount);
        this.handleChangeOther(row);
      }
    },
    handleChangeOther(row) {
      //验证输入是否金额，如果不是直接返回
      row.ServReceiveNew = /^\d+\.?\d{0,2}$/.test(row.ServReceiveNew) ?
        row.ServReceiveNew :
        (row.ServReceiveNew.indexOf('.') == -1 ?
          "" :
          cutOutNum(parseFloat(row.ServReceiveNew)));

      this.RecalculateMoneyOther();
      //如果该行的收款金额减去回款金额小于当前输入金额或者临时金额小于零，那么证明输入金额不合法
      if (parseFloat((row.CustomAmount - row.OrderAmount).toFixed(2)) < parseFloat(row.ServReceiveNew) || parseFloat(this.ClickRowOther.RemainingAmount) < 0) {
        row.ServReceiveNew = "";
        this.$message.warning("金额输入不合理，请重新输入");
      }
      this.RecalculateMoneyOther();
      return;
    },
    RecalculateMoneyOther() {
      let totalInputMoney = 0;
      this.CollectionOrderOtherData.forEach((item) => {
        totalInputMoney += item.ServReceiveNew ? parseFloat(item.ServReceiveNew) : 0;
      })
      this.ClickRowOther.RemainingAmount = (this.ClickRowOldOther.RemainingAmount - totalInputMoney).toFixed(2);
    },
    //减法（高精度）
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
    //撤回操作并刷新页面
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
    //撤回操作并刷新页面
    RenovateDataOtherDialog() {
      this.dialogOtherVisible = false;
      this.GetAdmin_Permission();
    },
    rowSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        // 合并第一列的相同行
        if (rowIndex === 0 || row.ChName !== this.CollectionOrderData[rowIndex - 1].ChName) {
          const rowspan = this.CollectionOrderData.filter(item => item.ChName === row.ChName).length;
          return { rowspan, colspan: 1 };
        } else {
          return { rowspan: 0, colspan: 0 };
        }
      } else if (columnIndex === 2) {
        // 合并第一列的相同行
        if (rowIndex === 0 || row.ConID !== this.CollectionOrderData[rowIndex - 1].ConID) {
          const rowspan = this.CollectionOrderData.filter(item => item.ConID === row.ConID).length;
          return { rowspan, colspan: 1 };
        } else {
          return { rowspan: 0, colspan: 0 };
        }
      }
      else if (columnIndex === 3) {
        // 合并第一列的相同行
        if (rowIndex === 0 || row.CorpID !== this.CollectionOrderData[rowIndex - 1].CorpID) {
          const rowspan = this.CollectionOrderData.filter(item => item.CorpID === row.CorpID).length;
          return { rowspan, colspan: 1 };
        } else {
          return { rowspan: 0, colspan: 0 };
        }
      }
      else {
        return { rowspan: 1, colspan: 1 };
      }
    },
    rowSpanMethodOther({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        // 合并第一列的相同行
        if (rowIndex === 0 || row.ContractOrderName !== this.CollectionOrderOtherData[rowIndex - 1].ContractOrderName) {
          const rowspan = this.CollectionOrderOtherData.filter(item => item.ContractOrderName === row.ContractOrderName).length;
          return { rowspan, colspan: 1 };
        } else {
          return { rowspan: 0, colspan: 0 };
        }
      } else if (columnIndex === 2) {
        // 合并第一列的相同行
        if (rowIndex === 0 || row.ApplicationTime !== this.CollectionOrderOtherData[rowIndex - 1].ApplicationTime) {
          const rowspan = this.CollectionOrderOtherData.filter(item => item.ApplicationTime === row.ApplicationTime).length;
          return { rowspan, colspan: 1 };
        } else {
          return { rowspan: 0, colspan: 0 };
        }
      }
      else if (columnIndex === 3) {
        // 合并第一列的相同行
        if (rowIndex === 0 || row.CompanyName !== this.CollectionOrderOtherData[rowIndex - 1].CompanyName) {
          const rowspan = this.CollectionOrderOtherData.filter(item => item.CompanyName === row.CompanyName).length;
          return { rowspan, colspan: 1 };
        } else {
          return { rowspan: 0, colspan: 0 };
        }
      }
      else {
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

    // 点击当前行数据进行选中或取消复选框
    toggleSelection(row, column, eventow) {
      if (column.label != "操作")
        // 通过ref绑定后这里使用$refs.table来操作bom元素
        this.$refs.multipleTable.toggleRowSelection(row);
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
          if (element.States == 2) { this.collectionStateFlag = true; }
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
    showBackground({ row }) {
      const checkIdList = this.multipleSelection.map((item) => item.EnterPriseName + item.AmountMoney + item.PaymentDate + item.CreateTimeStr);
      if (checkIdList.includes(row.EnterPriseName + row.AmountMoney + row.PaymentDate + row.CreateTimeStr)) {
        return {
          backgroundColor: "#E6F7FF",
        };
      } else {
        return {
          backgroundColor: "#FFFFFF",
        };
      }
    },
    // 保存修改回款(客服)
    saveUpdate() {
      if (this.ClickRowOld.RemainingAmount == this.ClickRow.RemainingAmount) {
        this.$message.info("无修改");
        return;
      }
      let changedData = [];
      this.CollectionOrderData.forEach((item) => {
        if (item.ServReceiveNew)
          changedData.push(item);
      })
      let parameters = {
        InsProductPayCode: this.ClickRow.InsProductPayCode,//选中的回款编号
        RemainingAmount: this.ClickRow.RemainingAmount,//剩余金额
        ChangedData: changedData,//输入金额的数据
        Remark: this.updateCollectionFrom.Remark,//修改备注
      }
      this.LoadingUpdate = true;
      UpdateData(parameters).then((res) => {
        if (res.success) {
          this.updateDialogVisible = false;
          this.$message.success("操作成功");
          this.GetAdmin_PermissionSearch();
        } else {
          this.$message.error(res.resultMessage);
        }
        this.LoadingUpdate = false;
      });
    },
    //除客服之外的其它角色保存修改回款
    saveUpdateOther() {
      if (this.ClickRowOldOther.RemainingAmount == this.ClickRowOther.RemainingAmount) {
        this.$message.info("无修改");
        return;
      }
      let changedData = [];
      this.CollectionOrderOtherData.forEach((item) => {
        if (item.ServReceiveNew)
          changedData.push(item);
      })
      let parameters = {
        InsProductPayCode: this.ClickRowOther.InsProductPayCode,//选中的回款编号
        RemainingAmount: this.ClickRowOther.RemainingAmount,//剩余金额
        ChangedData: changedData,//输入金额的数据
        Remark: this.updateCollectionFrom.Remark,//修改备注
      }
      this.LoadingUpdateOther = true;
      UpdateOtherData(parameters).then((res) => {
        if (res.success) {
          this.updateDialogOtherVisible = false;
          this.$message.success("操作成功");
          this.GetAdmin_PermissionSearch();
        } else {
          this.$message.error(res.resultMessage);
        }
        this.LoadingUpdateOther = false;
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
    UpdateDialog(row) {
      if (row.States == 2) {
        this.$message.warning("不能选择已回款的数据！");
        return;
      }
      this.ClickRow = Object.assign({}, row); // 创建新的对象副本;
      this.ClickRowOld = Object.assign({}, row); // 创建新的对象副本;
      this.CollectionLoading = true;
      var sendEnterPriseName = row.EnterPriseName;
      if (row.EnterPriseName == "祝惟")
        sendEnterPriseName = "北京天首聚智管理咨询有限公司";
      GetCollectionOrderNyName(
        sendEnterPriseName,
      ).then((res) => {
        if (res.success) {
          // this.CollectionOrderData = res.result;
          this.CollectionOrderData = res.result.map(v => {
            this.$set(v, 'ServReceiveNew', "");
            return v
          });
        } else {
          this.CollectionOrderData = [];
        }
        this.CollectionLoading = false;
      });
      this.updateCollectionFrom.Remark = "";
      this.updateDialogVisible = true;
    },
    //除客服之外的人员弹出窗口
    UpdateOtherDialog(row) {
      if (row.States == 2) {
        this.$message.warning("不能选择已回款的数据！");
        return;
      }
      this.ClickRowOther = Object.assign({}, row); // 创建新的对象副本;
      this.ClickRowOldOther = Object.assign({}, row); // 创建新的对象副本;
      this.CollectionOtherLoading = true;
      var sendEnterPriseName = row.EnterPriseName;
      if (row.EnterPriseName == "祝惟")
        sendEnterPriseName = "北京天首聚智管理咨询有限公司";
      GetOtherOrder(
        sendEnterPriseName,
      ).then((res) => {
        if (res.success) {
          this.CollectionOrderOtherData = res.result.map(v => {
            this.$set(v, 'ServReceiveNew', "");
            return v
          });
        } else {
          this.CollectionOrderOtherData = [];
        }
        this.CollectionOtherLoading = false;
      });
      this.updateCollectionFrom.Remark = "";
      this.updateDialogOtherVisible = true;
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
      DeleteCollectionData(this.updateCollectionFrom.InsProductPayCode).then((res) => {
        if (res.success) {
          this.$message.success("操作成功！");
          this.GetAdmin_Permission();
          hideLoading();
        } else {
          hideLoading();
          return this.$message.error(res.resultMessage);
        }
      });
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
        this.PaymentDateBegin = this.$moment(this.PaymentDate[0]).format("YYYY-MM-DD");
        this.PaymentDateEnd = this.$moment(this.PaymentDate[1]).format("YYYY-MM-DD");
      } else {
        this.PaymentDateBegin = '';
        this.PaymentDateEnd = '';
      }
      GetAdmin_Permission(
        this.Condition,
        this.States,
        this.PaymentDateBegin,
        this.PaymentDateEnd,
        '', '',
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
        this.updateCollectionFrom.InsProductPayCode = "";
        this.loading = false;
      });
    },
    // 导出数据
    ExportCollection() {
      this.isShowProgress = true;
      this.fakes.start();
      if (this.PaymentDate && this.PaymentDate.length > 0) {
        this.PaymentDateBegin = this.$moment(this.PaymentDate[0]).format("YYYY-MM-DD");
        this.PaymentDateEnd = this.$moment(this.PaymentDate[1]).format("YYYY-MM-DD");
      } else {
        this.PaymentDateBegin = '';
        this.PaymentDateEnd = '';
      }
      GetAdmin_PermissionExport(
        this.Condition,
        this.States,
        this.PaymentDateBegin,
        this.PaymentDateEnd,
        '', '',
        this.SecondPartyName,
      ).then(
        (res) => {
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
            this.CollectionList = [];
            this.total = 0;
          }
        }
      );
    },
    // 导入方法
    async submitUpload(param) {
      if (this.fileList.length <= 0) {
        this.$message.warning("请先选择需要上传的文件！");
        return false;
      }
      this.uploadLoading = true;
      this.$refs.upload.submit();
    },
    // 文件上传服务端失败时的钩子
    fileUploadFail: function (err, file, fileList) { },
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
      console.log(file);
    },
    // 模板下载
    downloadTemplate() {
      axios({
        // 用axios发送post请求
        method: "post",
        url: process.env.VUE_APP_BASE_API + "/CollectionMangement/ExportEmployee", // 请求地址
        responseType: "blob", // 表明返回服务器返回的数据类型
        headers: {
          "Content-Type": "application/json",
          'X-Token': sessionStorage.getItem("token"),
        },
      }).then((res) => {
        // 处理返回的文件流
        const blob = new Blob([res.data]); // new Blob([res])中不加data就会返回下图中[objece objece]内容（少取一层）
        const fileName = "回款导入模板.xlsx"; // 下载文件名称
        const elink = document.createElement("a");
        elink.download = fileName;
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
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
      }
      else {
        this.descriptionColumn = 3;
        this.fixedLeftShow = true;
      }
    }
  },
};
</script>

<style scoped>
.MiddleClass {
  margin-top: 10px;
}

.displayNoneClass {
  display: none;
}

.comentClass {
  width: 100%;
}

.el-divider__text {
  padding: 0 3;
  font-size: 12px;
  color: #FFFFFF;
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
</style>
