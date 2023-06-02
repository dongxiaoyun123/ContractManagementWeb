<template>
  <div style="padding: 8px;">
    <el-card>
      <el-row>
        <el-col :span="24">
          <el-select v-model="ComID" filterable placeholder="公司名称" remote reserve-keyword :remote-method="remoteMethod"
                     clearable @visible-change="clearselectCorporationDatas" @change="changeCompanyId"
          >
            <el-option v-for="item in selectCorporationDatas" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-button-group :style="formShow">
            <el-button type="primary" icon="el-icon-search" @click="GetCompanyNameASearch">查 询
            </el-button>
            <el-button type="success" icon="el-icon-circle-plus-outline" @click="addCompanyNameA">添 加
            </el-button>
          </el-button-group>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="CardTableClass">
      <el-table v-loading="loading" highlight-current-row :data="CompanyNameAList" fit>
        <el-table-column prop="ComName" label="公司名称" align="left" min-width="250" show-overflow-tooltip />
        <el-table-column prop="CompanyNumber" label="公司编号" align="left" min-width="120" show-overflow-tooltip sortable />
        <el-table-column prop="TaxpayerIdentificationNumber" label="纳税人识别号" align="left" min-width="150"
                         show-overflow-tooltip
        />
        <el-table-column prop="RegisteredAddress" label="注册地址" align="left" min-width="250" show-overflow-tooltip />
        <el-table-column prop="Phone" label="电话" align="left" min-width="120" show-overflow-tooltip />
        <el-table-column prop="DepositBank" label="开户银行" align="left" min-width="200" show-overflow-tooltip />
        <el-table-column prop="Account" label="账号" align="left" min-width="180" show-overflow-tooltip />
        <el-table-column prop="IsUsed" label="是否可用" align="left">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.IsUsed == 1" effect="plain" type="success">启用</el-tag>
            <el-tag v-else effect="plain" type="danger">禁用</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="UpdateUserName" label="修改人"  min-width="80" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="UpdateTimeStr" label="修改时间"  min-width="120" show-overflow-tooltip>
          </el-table-column> -->
        <el-table-column label="操作" align="left" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" type="text" size="mini"
                       @click="showEditDialog(scope.row.BillingCode)"
            >编辑</el-button>
            <el-button icon="el-icon-delete" type="text" size="mini"
                       @click="deleteDialog(scope.row.BillingCode)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination background :current-page="queryInfo.pagenum" :page-sizes="[20, 50, 100]"
                     :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"
                     @size-change="handleSizeChange" @current-change="handleCurrentChange"
      />
    </el-card>

    <el-dialog title="添加公司开票信息" :visible.sync="addDialogVisible" top="5vh" width="50%" @close="addDialogClosed">
      <el-form ref="addRef" :model="addCompanyNameAForm" :rules="addRules" label-width="120px">
        <el-form-item label="公司名称" prop="ComID">
          <el-select v-model="addCompanyNameAForm.ComID" style="width:18rem ;" filterable placeholder="公司名称" remote
                     reserve-keyword :remote-method="remoteMethod" @visible-change="clearselectCorporationDatas"
                     @change="changeCompanyId"
          >
            <el-option v-for="item in selectCorporationDatas" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="纳税人识别号" prop="TaxpayerIdentificationNumber">
          <el-input v-model="addCompanyNameAForm.TaxpayerIdentificationNumber" />
        </el-form-item>
        <el-form-item label="注册地址" prop="RegisteredAddress">
          <el-input v-model="addCompanyNameAForm.RegisteredAddress" />
        </el-form-item>
        <el-form-item label="电话" prop="Phone">
          <el-input v-model="addCompanyNameAForm.Phone" />
        </el-form-item>
        <el-form-item label="开户银行" prop="DepositBank">
          <el-input v-model="addCompanyNameAForm.DepositBank" />
        </el-form-item>
        <el-form-item label="账号" prop="Account">
          <el-input v-model="addCompanyNameAForm.Account" />
        </el-form-item>
        <el-form-item label="状态" prop="IsUsed">
          <el-switch v-model="addCompanyNameAForm.IsUsed" active-color="#1E90FF" inactive-color="#FFB6C1" active-text="启用"
                     inactive-text="禁用"
          />
        </el-form-item>
        <el-form-item label="附件上传">
          <el-upload ref="upload" class="upload-demo" action="" :headers="header" multiple
                     accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png,.gif,.bmp,.ppt,.pptx,.rtf,.txt" :limit="20"
                     :on-exceed="handleExceedAdd" :on-remove="AttachmentCodeRemove" :auto-upload="false" :file-list="fileList"
                     :on-change="handleChange"
          >
            <el-button plain slot="trigger" type="primary">选取文件</el-button>
            <el-button plain style="margin-left: 10px;" type="success" :loading="uploadServerLoading"
                       @click="submitUpload"
            >上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传文档和图片格式文件，且不超过<span style="color:#ff4949 ;">20M</span></div>
            <div slot="tip" class="el-upload__tip">可一次选取多个文件，上传完成请点击上传到服务器，否则文档不能保存。</div>
          </el-upload>
        </el-form-item>

        <!-- <el-form-item label="中文地址" prop="AttachmentCode">
          <el-upload ref="uploadChinese" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png,.gif,.bmp,.ppt,.pptx,.rtf,.txt"
            :action="Address + '/SystemManagement/Upload'" :on-remove="AttachmentCodeRemove"
            :before-remove="AttachmentCodeBeforeRemove" :on-success="AttachmentCodeSuccess"
            :on-error="AttachmentCodeFail" :on-change="AttachmentCodeChange" :file-list="ChineseAddressList" :limit="20"
            multiple :headers="myHeaders" :before-upload="AttachmentCodeUpload" :on-preview="AttachmentCodePreview">
            <el-button slot="trigger"  type="primary" class="buttonM">选取附件</el-button>
          </el-upload>
        </el-form-item> -->
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button type="primary" :loading="LoadingAdd" @click="saveAdd">确 定</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog title="修改公司开票信息" :visible.sync="updateDialogVisible" top="5vh" width="50%" @close="editDialogClosed">
      <el-form ref="updateRef" :model="updateCompanyNameAForm" :rules="addRules" label-width="120px">
        <el-form-item label="公司名称" prop="ComID">
          <el-select v-model="updateCompanyNameAForm.ComID" style="width:18rem ;" filterable placeholder="公司名称" remote
                     reserve-keyword :remote-method="remoteMethod" disabled
                     @visible-change="clearselectCorporationDatas" @change="changeCompanyId"
          >
            <el-option v-for="item in selectCorporationDatas" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="纳税人识别号" prop="TaxpayerIdentificationNumber">
          <el-input v-model="updateCompanyNameAForm.TaxpayerIdentificationNumber" />
        </el-form-item>
        <el-form-item label="注册地址" prop="RegisteredAddress">
          <el-input v-model="updateCompanyNameAForm.RegisteredAddress" />
        </el-form-item>
        <el-form-item label="电话" prop="Phone">
          <el-input v-model="updateCompanyNameAForm.Phone" />
        </el-form-item>
        <el-form-item label="开户银行" prop="DepositBank">
          <el-input v-model="updateCompanyNameAForm.DepositBank" />
        </el-form-item>
        <el-form-item label="账号" prop="Account">
          <el-input v-model="updateCompanyNameAForm.Account" />
        </el-form-item>
        <el-form-item label="状态" prop="IsUsed">
          <el-switch v-model="updateCompanyNameAForm.IsUsed" active-color="#1E90FF" inactive-color="#FFB6C1"
                     active-text="启用" inactive-text="禁用"
          />
        </el-form-item>
        <el-form-item label="已上传文件">
          <el-upload ref="upload" class="upload-demo" action="" :headers="header" multiple
                     accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png,.gif,.bmp,.ppt,.pptx,.rtf,.txt" :before-remove="beforeRemove"
                     :on-remove="handleRemove" :file-list="updateCompanyNameAForm.FileLists" :on-preview="AttachmentCodePreview"
          >
            <div slot="tip" class="el-upload__tip">之前上传的文件，可对其进行删除操作（执行确定会立马删除）</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="附件上传">
          <el-upload ref="upload" class="upload-demo" action="" :headers="header" multiple
                     accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png,.gif,.bmp,.ppt,.pptx,.rtf,.txt" :limit="20"
                     :on-exceed="handleExceedAddUpdate" :on-remove="AttachmentCodeRemoveUpdate" :auto-upload="false"
                     :file-list="fileListUpload" :on-change="handleChangeUpdate"
          >
            <el-button plain slot="trigger" type="primary">选取文件</el-button>
            <el-button plain style="margin-left: 10px;" type="success" :loading="uploadServerLoading"
                       @click="submitUploadUpdate"
            >上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传文档和图片格式文件，且不超过<span style="color:#ff4949 ;">20M</span></div>
            <div slot="tip" class="el-upload__tip">可一次选取多个文件，上传完成请点击上传到服务器，否则文档不能保存。</div>
            <div slot="tip" class="el-upload__tip">下面为新上传的文件</div>
          </el-upload>
        </el-form-item>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button type="primary" :loading="LoadingUpdate" @click="saveUpdate">修改</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  AddCompanyNameAMethod,
  Uploads,
  GetCompanyNameA,
  GetCompanyNameAFirst,
  DeleteAttachment,
  UpdateCompanyNameA,
  DeleteCompanyNameA,
  getUrl,
} from "@/api/SystemManagement";
import {
  GetCompany,
} from "@/api/CollectionMangement";
import { showLoading, hideLoading } from "@/common/loading";
export default {
  data() {
    return {
      formShow: '',
      ComID: '',
      entLoading: false,
      // 公司数据返回列表
      CorporationDatas: [],
      // 公司列表下拉数据结果列表
      selectCorporationDatas: [],
      LoadingUpdate: false,
      LoadingAdd: false,
      myHeaders: { 'X-Token': sessionStorage.getItem("token") },
      Corpid: "",
      // 获取用户列表查询参数对象
      queryInfo: {
        pagenum: 1,
        pagesize: 20,
      },
      total: 0,
      addDialogVisible: false,
      updateDialogVisible: false,
      CompanyNameAList: [],
      corp_id: "",
      addCompanyNameAForm: {
        ComID: "",
        TaxpayerIdentificationNumber: "",
        RegisteredAddress: "",
        Phone: "",
        DepositBank: "",
        Account: "",
        FileList: [],
        IsUsed: false,
      },
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
        IsUsed: false,
      },
      enterpeisePlanList: null,
      // 正则验证
      addRules: {
        ComID: [
          { required: true, message: "请选择公司名称", trigger: "change" },
        ],
        // TaxpayerIdentificationNumber: [
        //   { required: true, message: "请输入纳税人识别号", trigger: "blur" },
        //   {
        //     min: 1,
        //     max: 50,
        //     message: "纳税人识别号的长度在1～50个字",
        //     trigger: "blur",
        //   },
        // ],
        // RegisteredAddress: [
        //   { required: true, message: "请输入注册地址", trigger: "blur" },
        //   {
        //     min: 1,
        //     max: 50,
        //     message: "注册地址的长度在1～50个字",
        //     trigger: "blur",
        //   },
        // ],
        // Phone: [
        //   { required: true, message: "请输入电话", trigger: "blur" },
        //   {
        //     min: 1,
        //     max: 50,
        //     message: "电话的长度在1～50个字",
        //     trigger: "blur",
        //   },
        // ],
        // DepositBank: [
        //   { required: true, message: "请输入开户银行", trigger: "blur" },
        //   {
        //     min: 1,
        //     max: 50,
        //     message: "开户银行的长度在1～50个字",
        //     trigger: "blur",
        //   },
        // ],
        // Account: [
        //   { required: true, message: "请输入账号", trigger: "blur" },
        //   {
        //     min: 1,
        //     max: 50,
        //     message: "账号的长度在1～50个字",
        //     trigger: "blur",
        //   },
        // ],
      },
      EnterpeisePlanCodeWhere: "",
      loading: false,
      CreateUserName: "",
      CreateTime: "",
      UpdateUserName: "",
      UpdateTime: "",
      ChineseAddressList: [],
      UpdateChineseAddressList: [],

      header: { Authorization: sessionStorage.getItem("token") },
      uploading: false,
      formLoading: false,
      dialogVisible: false,
      fileList: [],
      fileListUpload: [],
      temp: {
        id: void 0,
        fileName: '',
        fileType: void 0
      },
      uploadServerLoading: false,
      // 公司列表下拉数据结果列表
      selectCorporationDatas: [],
    };
  },
  watch: {
    '$store.getters.clientWidth'(newVal, oldVal) {
      this.fixedShowMethod(newVal);
    },
  },
  created() {
    this.fixedShowMethod(document.body.clientWidth);
  },
  // 加载完成后执行获取公司数据接口
  mounted() {
    this.GetCompanyNameA();
    this.GetCompany();
  },
  methods: {
    changeCompanyId(e) {
      var item = this.selectCorporationDatas.filter((item) => {
        return item.value == e;
      });
      this.addContractsForm.FirstPartyName = item[0].label;
    },
    // 关闭远程搜索下拉时需要清空筛选出来的数据进行重新筛选
    clearselectCorporationDatas(e) {
      this.selectCorporationDatas = [];
    },
    // 输入过滤
    remoteMethod(query) {
      if (query !== "") {
        this.entLoading = true;
        setTimeout(() => {
          this.entLoading = false;
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

          this.companyList = res.result;
        } else {
          this.companyList = [];
        }
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
      this.uploadServerLoading = true;
      const formData = new FormData()
      this.fileList.forEach(item => {
        formData.append('files', item.raw)
      })
      if (!formData) {
        this.$message.warning("请选择要上传到服务器的文件");
      }
      this.addCompanyNameAForm.FileList = [];
      Uploads(formData).then(response => {
        if (response.success) {
          for (const index in response.result) {
            var addForm = {
              AttachmentName: response.result[index].AttachmentName,
              FileName: response.result[index].FileName,
            };
            // 给添加表单的列表赋值
            this.addCompanyNameAForm.FileList.push(addForm);
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
    AttachmentCodePreview(file) {
      window.open(file.url);
    },

    // 修改-上传文件
    handleChangeUpdate(file, fileList) {
      this.fileListUpload = fileList
    },
    handleExceedAddUpdate(files, fileList) {
      this.$message.warning('当前文件数量超过限制');
    },
    submitUploadUpdate() {
      this.uploadServerLoading = true;
      const formData = new FormData()
      this.fileListUpload.forEach(item => {
        formData.append('files', item.raw)
      })
      if (!formData) {
        this.$message.warning("请选择要上传到服务器的文件");
      }
      this.updateCompanyNameAForm.FileList = [];
      Uploads(formData).then(response => {
        if (response.success) {
          for (const index in response.result) {
            var addForm = {
              AttachmentName: response.result[index].AttachmentName,
              FileName: response.result[index].FileName,
            };
            // 给添加表单的列表赋值
            this.updateCompanyNameAForm.FileList.push(addForm);
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
    async beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove(file, fileList) {
      DeleteAttachment(this.updateCompanyNameAForm.BillingCode, file.name).then((res) => {
        if (res.success) {
          this.$message.success("操作成功！");
        } else {
          return this.$message.error(res.resultMessage);
        }
      });
    },

    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.GetCompanyNameA();
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newSize) {
      this.queryInfo.pagenum = newSize;
      this.GetCompanyNameA();
    },
    // 监听 添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addRef.resetFields();
    },

    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.updateRef.resetFields();
    },
    // 添加弹出页面
    addCompanyNameA() {
      this.fileList = [];
      this.addCompanyNameAForm.FileList = [];
      this.addDialogVisible = true;
    },
    // 添加保存
    saveAdd() {
      this.LoadingAdd = true;
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) {
          this.LoadingAdd = false;
          return;
        }
        // 正向对比
        if (this.fileList.length != 0 || this.addCompanyNameAForm.FileList.length != 0) {
          for (const index in this.fileList) {
            var flag = this.addCompanyNameAForm.FileList.filter((item) => {
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
        if (this.fileList.length != 0 || this.addCompanyNameAForm.FileList.length != 0) {
          for (const index in this.addCompanyNameAForm.FileList) {
            var flag = this.fileList.filter((item) => {
              return item.name == this.addCompanyNameAForm.FileList[index].FileName;
            });
            if (flag.length == 0) {
              this.LoadingUpdate = false;
              this.$message.warning("文件上传完成或者修改需要点击一下上传服务器");
              return;
            }
          }
        }
        this.addCompanyNameAForm.IsUsed =
          this.addCompanyNameAForm.IsUsed == false ? 0 : 1;
        AddCompanyNameAMethod(this.addCompanyNameAForm).then((res) => {
          if (res.success) {
            this.$message.success("操作成功");
            this.GetCompanyNameA();
            this.corp_id = "";
            this.addDialogVisible = false;
          } else {
            this.addCompanyNameAForm.Isused =
              this.addCompanyNameAForm.Isused != 0;
            this.$message.error(res.resultMessage);
          }
          this.LoadingAdd = false;
        });
      });
    },
    isObject(obj) {
      return obj !== null && typeof obj === 'object'
    },

    // 保存修改
    saveUpdate() {
      this.LoadingUpdate = true;
      this.$refs.updateRef.validate(async (valid) => {
        if (!valid) {
          this.LoadingUpdate = false;
          return;
        }
        if (this.fileListUpload.length != 0 || this.updateCompanyNameAForm.FileList.length != 0) {
          for (const index in this.fileListUpload) {
            var flag = this.updateCompanyNameAForm.FileList.filter((item) => {
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
        if (this.fileListUpload.length != 0 || this.updateCompanyNameAForm.FileList.length != 0) {
          for (const index in this.updateCompanyNameAForm.FileList) {
            var flag = this.fileListUpload.filter((item) => {
              return item.name == this.updateCompanyNameAForm.FileList[index].FileName;
            });
            if (flag.length == 0) {
              this.LoadingUpdate = false;
              this.$message.warning("文件上传完成或者修改需要点击一下上传服务器");
              return;
            }
          }
        }
        this.updateCompanyNameAForm.IsUsed =
          this.updateCompanyNameAForm.IsUsed == false ? 0 : 1;
        UpdateCompanyNameA(this.updateCompanyNameAForm).then((res) => {
          if (res.success) {
            this.$message.success("操作成功");
            this.GetCompanyNameA();
            this.updateDialogVisible = false;
          } else {
            this.$message.error(res.resultMessage);
          }
          this.LoadingUpdate = false;
        });
      });
    },
    GetCompanyNameASearch() {
      this.queryInfo.pagenum = 1;
      this.queryInfo.pagesize = 20;
      this.GetCompanyNameA();
    },
    // 获取甲方公司列表数据
    GetCompanyNameA() {
      this.loading = true;
      GetCompanyNameA(
        this.ComID,
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      ).then((res) => {
        if (res.success) {
          this.CompanyNameAList = res.result.list;
          this.total = res.result.totalNumber;
        } else {
          this.CompanyNameAList = [];
          this.total = 0;
        }
        this.loading = false;
      });
    },
    // 编辑获取反填信息
    showEditDialog(BillingCode) {
      GetCompanyNameAFirst(BillingCode).then((res) => {
        if (res.success) {
          this.updateCompanyNameAForm = res.result;
          this.fileListUpload = [];
          this.updateCompanyNameAForm.FileList = [];
          this.updateCompanyNameAForm.IsUsed =
            res.result.IsUsed == 1;
          this.updateDialogVisible = true;
          // 远程搜索反填数据
          this.remoteMethodShow(res.result.ComID);
        } else {
          return this.$message.error("计划方案获取失败！");
        }
      });
    },
    // 删除信息
    async deleteDialog(BillingCode) {
      const confirmResult = await this.$confirm(
        "此操作将删除该公司, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      // 点击确定 返回值为：confirm
      // 点击取消 返回值为： cancel
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      showLoading();
      DeleteCompanyNameA(BillingCode).then((res) => {
        if (res.success) {
          this.GetCompanyNameA();
          this.$message.success("操作成功！");
        } else {
          hideLoading();
          return this.$message.error(res.resultMessage);
        }
        hideLoading();
      });
    },
    // 获取公司计划
    _getDep(corpid) {
      // 获取子公司下拉
      this.corpid = corpid;
      if (!corpid) {
        this.enterpeisePlanList = [];
      } else {
        GetEnterpeisePlanList(corpid).then((res) => {
          if (res.success) {
            this.enterpeisePlanList = res.result;
          }
        });
      }

      this.addCompanyNameAForm.EnterpeisePlanCode = "";
      this.updateCompanyNameAForm.EnterpeisePlanCode = "";
      this.EnterpeisePlanCodeWhere = "";
    },
    _getDepWhere(corpid) {
      // 获取子公司下拉
      this.corpid = corpid;
      if (!corpid) {
        this.enterpeisePlanList = [];
      } else {
        GetEnterpeisePlanList(corpid).then((res) => {
          if (res.success) {
            this.enterpeisePlanList = res.result;
          }
        });
      }
      this.EnterpeisePlanCodeWhere = "";
      this.GetCompanyNameA();
    },
    // 输入过滤
    remoteMethod(query) {
      if (query !== "") {
        this.entLoading = true;
        setTimeout(() => {
          this.entLoading = false;
          this.selectCorporationDatas = this.CorporationDatas.filter((item) => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.selectCorporationDatas = [];
      }
    },
    fixedShowMethod(newVal) {
      if (newVal < 768) {
        this.formShow = 'margin-top: 18px;display:block';
      } else {
        this.formShow = 'margin-left: 18px;';
      }
    }
  },
};
</script>

<style >
.el-upload__tip {
  height: 18px;
}

.buttonCenter {
  text-align: center;
  margin-top: 20px;
}
</style>
