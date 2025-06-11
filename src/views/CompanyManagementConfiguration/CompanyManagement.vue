<template>
  <div style="padding: 8px">
    <el-card>
      <el-row>
        <el-col :xs="10" :sm="5" :md="5" :lg="5" :xl="5">
          <el-input
            v-model="Name"
            placeholder="公司名称（模糊搜索）"
            class="input-with-select"
            clearable=""
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="GetCompanySearch"
            />
          </el-input>
        </el-col>
        <el-col :xs="6" :sm="15" :md="15" :lg="15" :xl="15">
          <el-button
            type="primary"
            style="margin-left: 15px"
            icon="el-icon-circle-plus-outline"
            @click="AddDialog(true, null)"
          >添 加
          </el-button>
        </el-col>
        <el-col
          :xs="8"
          :sm="4"
          :md="4"
          :lg="4"
          :xl="4"
          style="text-align: right"
        >
          <el-button
            type="success"
            style="margin-left: 15px"
            icon="el-icon-location-information"
            @click="MapClick"
          >地图分布
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="CardTableClass">
      <!-- default-expand-all:true
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"    row-key="RowKey"-->
      <el-table
        v-loading="loading"
        highlight-current-row
        :data="DicCategoryList"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="注册地址：">
                <span>{{ props.row.RegisteredAddress }}</span>
              </el-form-item>
              <el-form-item label="联系电话：">
                <span>{{ props.row.Phone }}</span>
              </el-form-item>
              <el-form-item label="开户银行：">
                <span>{{ props.row.DepositBank }}</span>
              </el-form-item>
              <el-form-item label="银行账号：">
                <span>{{ props.row.Account }}</span>
              </el-form-item>
              <el-form-item label="状态：">
                <span>{{
                  props.row.IsUsed
                    ? props.row.IsUsed == 1
                      ? "启用"
                      : "禁用"
                    : props.row.IsUsed == 0
                      ? "禁用"
                      : "启用"
                }}</span>
              </el-form-item>
              <el-form-item label="最后修改时间：">
                <div v-if="props.row.BillingUpdateTime">
                  <i class="el-icon-time" />
                  <span style="margin-left: 6px">{{
                    dateFormat(props.row.BillingUpdateTime)
                  }}</span>
                </div>
              </el-form-item>
              <el-form-item label="已上传文件：">
                <div>
                  <el-link
                    v-for="item in props.row.FileListUpload"
                    :key="item"
                    icon="el-icon-document"
                    style="margin-right: 1rem"
                    :href="item.url"
                    target="_blank"
                  >{{ item.name }}</el-link>
                </div>
              </el-form-item>
              <el-form-item label="曾用名：">
                <div>
                  <el-tag
                    v-for="(tag, index) in props.row.childrenStr"
                    :key="index"
                    :type="colorArray[index]"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag, props)"
                  >
                    {{ tag }}
                  </el-tag>
                  <el-input
                    v-if="inputVisible"
                    ref="saveTagInput"
                    v-model="inputValue"
                    class="input-new-tag"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(props)"
                    @blur="handleInputConfirm(props)"
                  />
                  <el-button
                    v-else
                    icon="el-icon-plus"
                    class="button-new-tag"
                    size="small"
                    @click="showInput"
                  >
                    添加公司曾用名</el-button>
                </div>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="ComID" label="公司编号" width="80" />
        <el-table-column
          prop="CompanyNumber"
          label="自定义公司编号"
          width="130"
          sortable
        />
        <el-table-column
          prop="ComName"
          label="公司名称"
          width="250"
          show-overflow-tooltip
        />
        <el-table-column
          prop="TaxpayerIdentificationNumber"
          label="信用代码"
          width="180"
          show-overflow-tooltip
        />
        <el-table-column
          prop="ShortName"
          label="公司简称"
          width="200"
          show-overflow-tooltip
        />
        <el-table-column width="150" property="CreateTime" label="创建时间">
          <template slot-scope="scope">
            <div v-if="scope.row.CreateTime">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{
                dateFormat(scope.row.CreateTime)
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="150" property="UpdateTime" label="修改时间">
          <template slot-scope="scope">
            <div v-if="scope.row.UpdateTime">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{
                dateFormat(scope.row.UpdateTime)
              }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="ComAddress"
          label="公司地址"
          show-overflow-tooltip
        />
        <el-table-column label="操作" width="170px">
          <template slot-scope="scope">
            <!-- <el-button v-if="scope.row.Flag" icon="el-icon-circle-plus-outline" type="text" size="mini"
              @click="showAddDialog(scope.row)">曾用名</el-button>
            <el-button v-else icon="el-icon-remove-outline" type="text" size="mini" :loading="deleteLoading"
              @click="deleteDialog(scope.row)">删除</el-button> -->
            <el-button
              icon="el-icon-edit"
              type="text"
              size="mini"
              @click="AddDialog(false, scope.row)"
            >编辑</el-button>
            <el-button
              icon="el-icon-s-ticket"
              type="text"
              size="mini"
              @click="showEditDialog(scope.row)"
            >开票信息</el-button>
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
      :title="UpdateTitle"
      :visible.sync="addDialogVisible"
      top="5vh"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form
        ref="addRef"
        :model="AddCompanyForm"
        :rules="AddCompanyRules"
        label-width="90px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司名称" prop="ComName">
              <el-input
                v-model="AddCompanyForm.ComName"
                :disabled="disabledFlag && !flag"
                placeholder="公司名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司简称" prop="ShortName">
              <el-input
                v-model="AddCompanyForm.ShortName"
                :disabled="disabledFlag && !flag"
                placeholder="公司简称"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="信用代码" prop="TaxpayerIdentificationNumber">
          <el-input
            v-model="AddCompanyForm.TaxpayerIdentificationNumber"
            placeholder="统一信用代码/税号"
          />
        </el-form-item>
        <el-form-item label="公司地址" prop="ComAddress">
          <el-input
            v-model="AddCompanyForm.ComAddress"
            readonly
            placeholder="选取地图后自动获取"
          />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司经度" prop="lng">
              <el-input
                v-model="AddCompanyForm.lng"
                readonly
                placeholder="选取地图后自动获取"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司纬度" prop="lat">
              <el-input
                v-model="AddCompanyForm.lat"
                readonly
                placeholder="选取地图后自动获取"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="公司地图">
          <baidu-map
            class="bm-view"
            scroll-wheel-zoom
            :center="location"
            :zoom="zoom"
            ak="eRCv7o5j4Rmj4U2GsODMb71V2r4t4FIt"
            @ready="mapReady"
          >
            <bm-view class="map" style="width: 100%; height: 100%; flex: 1" />
            <!-- 自定义控件 -->
            <bm-control :offset="{ width: '50px', height: '10px' }">
              <!-- 自动填充 -->
              <bm-auto-complete :sug-style="{ zIndex: 999999 }">
                <el-input
                  v-model="inputValue"
                  placeholder="输入关键字进行模糊查询"
                  @change="confirmAddress"
                />
              </bm-auto-complete>
            </bm-control>

            <!-- 手动放大缩小到省市街道 位置：右下方-->
            <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" />
          </baidu-map>
        </el-form-item>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button
              icon="el-icon-circle-check"
              type="primary"
              :loading="LoadingAdd"
              @click="saveAdd"
            >保 存</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog
      title="修改公司开票信息"
      :visible.sync="updateDialogVisible"
      top="5vh"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        ref="updateRef"
        :model="updateCompanyNameAForm"
        :rules="addRules"
        label-width="120px"
      >
        <!-- <el-form-item label="纳税人识别号" prop="TaxpayerIdentificationNumber">
          <el-input v-model="updateCompanyNameAForm.TaxpayerIdentificationNumber" />
        </el-form-item> -->
        <el-form-item label="注册地址" prop="RegisteredAddress">
          <el-input v-model="updateCompanyNameAForm.RegisteredAddress" />
        </el-form-item>
        <el-form-item label="联系电话" prop="Phone">
          <el-input v-model="updateCompanyNameAForm.Phone" />
        </el-form-item>
        <el-form-item label="开户银行" prop="DepositBank">
          <el-input v-model="updateCompanyNameAForm.DepositBank" />
        </el-form-item>
        <el-form-item label="银行账号" prop="Account">
          <el-input v-model="updateCompanyNameAForm.Account" />
        </el-form-item>
        <el-form-item label="状态" prop="IsUsed">
          <el-switch
            v-model="updateCompanyNameAForm.IsUsed"
            active-color="#1E90FF"
            inactive-color="#FFB6C1"
            active-text="启用"
            inactive-text="禁用"
          />
        </el-form-item>
        <el-form-item label="已上传文件">
          <el-upload
            ref="upload"
            class="upload-demo"
            action=""
            :headers="header"
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png,.gif,.bmp,.ppt,.pptx,.rtf,.txt"
            :before-remove="beforeRemove"
            :on-remove="handleRemove"
            :file-list="updateCompanyNameAForm.FileLists"
            :on-preview="AttachmentCodePreview"
          >
            <div slot="tip" style="margin-top: -30px" class="el-upload__tip">
              之前上传的文件，可对其进行删除操作（执行确定会立马删除）
            </div>
          </el-upload>
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
            :on-change="handleChangeUpdate"
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
  </div>
</template>

<script>
import {
  GetCompanySystemList,
  AddCompany,
  AddCompanyRelation,
  DeleteCompanyRelation,
  Uploads,
  GetCompanyNameAFirst,
  DeleteAttachment,
  UpdateCompanyNameA,
  UpdateCompany,
} from "@/api/SystemManagement";
let geocoder;
export default {
  name: "CompanyManagement",
  data() {
    return {
      UpdateTitle: "",
      deleteLoading: false,
      Name: "",
      LoadingAdd: false,
      // 获取用户列表查询参数对象
      queryInfo: {
        pagenum: 1,
        pagesize: 20,
      },
      total: 0,
      DicCategoryList: [],
      AddCompanyForm: {
        ComID: "",
        ComName: "",
        ShortName: "",
        ComAddress: "",
        lat: null,
        lng: null,
        TaxpayerIdentificationNumber: "",
      },
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
      loading: false,

      // 百度地图参数
      model: {},
      BMap: {},
      map: {},
      location: {
        lng: 116.4,
        lat: 39.92,
      },
      zoom: 12,
      keyword: "",
      ComID: null,
      addDialogVisible: false,
      FileList: [],
      // 正则验证
      addRules: {
        ComID: [
          { required: true, message: "请选择公司名称", trigger: "change" },
        ],
      },
      header: { Authorization: sessionStorage.getItem("token") },
      updateCompanyNameAForm: {
        BillingCode: "",
        ComID: "",
        TaxpayerIdentificationNumber: "",
        RegisteredAddress: "",
        Phone: "",
        DepositBank: "",
        Account: "",
        FileList: [],
        FileLists: [],
        AttachmentLists: [],
        IsUsed: true,
      },
      LoadingUpdate: false,
      uploadServerLoading: false,
      fileListUpload: [],
      // 公司列表下拉数据结果列表
      selectCorporationDatas: [],
      updateDialogVisible: false,
      fileList: [],
      inputVisible: false,
      inputValue: "",
      colorArr: ["success", "info", "warning", "danger"],
      colorArray: [],
      flag: false,
      disabledFlag: true,
    };
  },
  watch: {},
  created() {
    if (sessionStorage.getItem("RoleName") == "超级管理员") {
      this.disabledFlag = false;
    }
    this.GetCompanySystem();
  },
  methods: {
    // 列表时间格式化
    dateFormat(row) {
      if (row) {
        return this.$moment(row).format("YYYY-MM-DD HH:mm:ss");
      } else {
        return null;
      }
    },
    // 编辑获取反填信息
    showEditDialog(row) {
      GetCompanyNameAFirst(row.ComID).then((res) => {
        if (res.success) {
          this.updateCompanyNameAForm = res.result;
          this.fileListUpload = [];
          this.updateCompanyNameAForm.FileList = [];
          this.updateCompanyNameAForm.IsUsed =
            res.result.IsUsed == 1;
          this.updateDialogVisible = true;
        } else {
          return this.$message.error("获取失败！");
        }
      });
    },
    async handleClose(tag, props) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该条, 是否继续?",
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
      DeleteCompanyRelation(tag, props.row.ComID).then((res) => {
        if (res.success) {
          this.$message.success("操作成功！");
          props.row.childrenStr.splice(props.row.childrenStr.indexOf(tag), 1);
        } else {
          return this.$message.error(res.resultMessage);
        }
      });
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm(props) {
      const inputValue = this.inputValue;
      if (inputValue) {
        AddCompanyRelation(props.row.ComID, inputValue).then((res) => {
          if (res.success) {
            this.$message.success("操作成功！");
            props.row.childrenStr = props.row.childrenStr
              ? props.row.childrenStr
              : [];
            const inputValuecatch = inputValue;
            props.row.childrenStr.push(inputValuecatch);
          } else {
            this.$message.error(res.resultMessage);
          }
        });
      }
      this.inputVisible = false;
      this.inputValue = "";
    },

    AttachmentCodePreview(file) {
      window.open(file.url);
    },

    // 修改-上传文件
    handleChangeUpdate(file, fileList) {
      this.fileListUpload = fileList;
    },
    handleExceedAddUpdate(files, fileList) {
      this.$message.warning("当前文件数量超过限制");
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
      this.updateCompanyNameAForm.FileList = [];
      Uploads(formData)
        .then((response) => {
          if (response.length > 0) {
            for (const index in response) {
              var addForm = {
                AttachmentName: response[index].attachmentName,
                FileName: response[index].fileName,
              };
              // 给添加表单的列表赋值
              this.updateCompanyNameAForm.FileList.push(addForm);
            }
            this.$message.success("上传成功");
          } else {
            this.$message.error("上传失败");
          }
          this.uploadServerLoading = false;
        })
        .catch((err) => {
          this.uploadServerLoading = false;
          this.$message.error(err);
        });
    },
    AttachmentCodeRemoveUpdate(file, fileList) {
      this.fileListUpload = fileList;
    },

    // 修改中对以前的文件进行编辑操作
    async beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove(file, fileList) {
      DeleteAttachment(this.updateCompanyNameAForm.BillingCode, file.name).then(
        (res) => {
          if (res.success) {
            this.$message.success("操作成功！");
          } else {
            return this.$message.error(res.resultMessage);
          }
        }
      );
    },
    // 保存修改
    saveUpdate() {
      this.LoadingUpdate = true;
      this.$refs.updateRef.validate(async (valid) => {
        if (!valid) {
          this.LoadingUpdate = false;
          return;
        }
        if (
          this.fileListUpload.length != 0 ||
          this.updateCompanyNameAForm.FileList.length != 0
        ) {
          for (const index in this.fileListUpload) {
            var flagz = this.updateCompanyNameAForm.FileList.filter((item) => {
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
          this.updateCompanyNameAForm.FileList.length != 0
        ) {
          for (const index in this.updateCompanyNameAForm.FileList) {
            var flagf = this.fileListUpload.filter((item) => {
              return (
                item.name ==
                this.updateCompanyNameAForm.FileList[index].FileName
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
        this.updateCompanyNameAForm.IsUsed =
          this.updateCompanyNameAForm.IsUsed == false ? 0 : 1;
        UpdateCompanyNameA(this.updateCompanyNameAForm).then((res) => {
          this.LoadingUpdate = false;
          if (res.success) {
            this.$message.success("操作成功");
            this.GetCompanySystem();
            this.updateDialogVisible = false;
          } else {
            this.$message.error(res.resultMessage);
          }
        });
      });
    },
    // 删除信息
    async deleteDialog(row) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该条, 是否继续?",
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
      this.deleteLoading = true;
      DeleteCompanyRelation(row.ComID).then((res) => {
        if (res.success) {
          this.$message.success("操作成功！");
          this.GetCompanySearch();
        } else {
          this.deleteLoading = false;
          return this.$message.error(res.resultMessage);
        }
        this.deleteLoading = false;
      });
    },

    addDialogClosed() {
      this.$refs.addRef.resetFields();
      this.addDialogVisible = false;
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.updateRef.resetFields();
    },
    MapClick() {
      this.$router.push({
        path: `/ContractEntry/ContractsMap?type=` + 1,
      });
    },
    completeAdd(e) {
      this.AddCompanyForm.Remarks = e.toUpperCase();
    },
    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.GetCompanySystem();
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newSize) {
      this.queryInfo.pagenum = newSize;
      this.GetCompanySystem();
    },
    // 添加模块
    AddDialog(flag, row) {
      this.flag = flag;
      if (flag) {
        this.UpdateTitle = "添加公司";
      } else {
        this.UpdateTitle = "修改公司";
      }
      // this.$options.data()//是原始data中的数据
      // this.$data //是改变后的data中的数据
      // this.$root //表示app.vue中data的数据
      // 初始化组件data中的数据:
      // Object.assign(this.$data, this.$options.data())
      if (flag) {
        this.AddCompanyForm.ComName = "";
        this.AddCompanyForm.ShortName = "";
        this.AddCompanyForm.ComAddress = "";
        this.AddCompanyForm.TaxpayerIdentificationNumber = "";
        this.inputValue = "";
      } else {
        this.AddCompanyForm.ComID = row.ComID;
        this.AddCompanyForm.ComName = row.ComName;
        this.AddCompanyForm.ShortName = row.ShortName;
        this.AddCompanyForm.ComAddress = row.ComAddress;
        this.AddCompanyForm.lat = row.lat;
        this.AddCompanyForm.lng = row.lng;
        this.AddCompanyForm.TaxpayerIdentificationNumber =
          row.TaxpayerIdentificationNumber;
      }
      this.addDialogVisible = true;
    },
    saveAdd() {
      // let ComAddress = this.AddCompanyForm.ComAddress;
      // let that = this;
      //  this.$jsonp('http://api.map.baidu.com/geocoding/v3/', {
      //   address: "北京市昌平区高新三街3号",
      //   output: 'jsonp',
      //   ak: 'eRCv7o5j4Rmj4U2GsODMb71V2r4t4FIt'
      // }).then(json => {
      //
      //   // 得到我们想要的经纬度 状态0代表找到了经纬度
      //   if (json.status == 0) {
      //     that.AddCompanyForm.lat = json.result.location.lat;
      //     that.AddCompanyForm.lng = json.result.location.lng;
      //   }
      // }).catch(err => {
      //
      // })

      this.LoadingAdd = true;
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) {
          this.LoadingAdd = false;
          return;
        }
        if (this.flag) {
          this.AddCompanyForm.ComID = "0";
          AddCompany(this.AddCompanyForm).then((res) => {
            if (res.success) {
              this.addDialogVisible = false;
              this.$message.success("操作成功");
              this.GetCompanySystem();
            } else {
              this.$message.error(res.resultMessage);
            }
            this.LoadingAdd = false;
          });
        } else {
          UpdateCompany(this.AddCompanyForm).then((res) => {
            if (res.success) {
              this.addDialogVisible = false;
              this.$message.success("操作成功");
              this.GetCompanySystem();
            } else {
              this.$message.error(res.resultMessage);
            }
            this.LoadingAdd = false;
          });
        }
      });
    },
    GetCompanySearch() {
      this.queryInfo.pagenum = 1;
      this.queryInfo.pagesize = 20;
      this.GetCompanySystem();
    },
    // 获取数据
    GetCompanySystem() {
      this.loading = true;
      GetCompanySystemList(
        null, // 公司编号
        this.Name,
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      ).then((res) => {
        if (res.success) {
          this.DicCategoryList = res.result.list;
          this.colorArray = this.$options.data().colorArray;
          // 默认添加100个颜色先,此目的是为了为不同的曾用名设置不同的颜色
          for (let s = 0; s < 100; s++) {
            this.colorArray.push(
              this.colorArr[Math.floor(Math.random() * this.colorArr.length)]
            );
          }
          this.total = res.result.totalNumber;
        } else {
          this.DicCategoryList = [];
          this.total = 0;
        }
        this.loading = false;
      });
    },

    // 搜索框的搜索事件
    confirmAddress(e) {
      // console.log("this.model.address:",this.model.address)
      if (this.inputValue != "") {
        // console.log("搜索字段为:" + this.inputValue)
        this.keyword = this.inputValue;
      }

      // 为啥使用延时？？
      // 因为上面搜索框是change事件，变化的太快了看起来效果不好所以添加了延时
      // setTimeout(() => {
      // 搜索时把需要标点的地址传入local.search中
      var local = new this.BMap.LocalSearch(this.map, {
        renderOptions: { map: this.map },
      });
      local.search(this.keyword);
      // }, 600)
    },

    // baidu-map组件的ready事件
    mapReady({ BMap, map }) {
      this.BMap = BMap;
      this.map = map;

      geocoder = new BMap.Geocoder(); // 创建地址解析器的实例
      if (Object.prototype.hasOwnProperty.call(this.model, "address")) {
        // 如果当前model中包含address 则证明是修改弹框里面的地址数据（地址存在，打开弹框显示地址标点）
        this.keyword = this.model.address;
        this.inputValue = this.model.address;
      } else {
        // 否则显示默认标点（这里的经纬度代表成都）
        // 第二个参数  10 代表地图缩 放级别,最大为19,最小为0

        setTimeout(() => {
          this.map.centerAndZoom(new BMap.Point(116.4, 39.92), 12);
        }, 1000);
        this.keyword = "";
        this.inputValue = "";
      }
      // 点击百度地图上的搜索出来的红色标记点
      map.addEventListener("click", ({ point }) => {
        this.location.lng = point.lng;
        this.location.lat = point.lat;
        geocoder.getLocation(point, (res) => {
          this.inputValue = res.address;
          this.model.address = res.address;
          this.model.storeLongitude = point.lng;
          this.model.storeLatitude = point.lat;
          this.AddCompanyForm.ComAddress = res.address;
          this.AddCompanyForm.lng = point.lng;
          this.AddCompanyForm.lat = point.lat;

          this.$forceUpdate();
        });
      });
    },

    // 地区组件的markersset事件
    setAddressList(e) {
    },
  },
};
</script>

<style scoped>
.bm-view {
  display: block;
  width: 100%;
  height: 500px;
}

.BMap_noprint.anchorTL {
  width: 35%;
  top: 10px !important;
  left: 10px !important;
}

.demo-table-expand label {
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-left: 3.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 175px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
