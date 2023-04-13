<template>
  <div style="padding: 8px;">
    <el-card>
      <el-row>
        <el-col :xs="10" :sm="5" :md="5" :lg="5" :xl="5">
          <el-input v-model="Name" placeholder="公司名称" class="input-with-select" clearable="">
            <el-button slot="append" icon="el-icon-search" @click="GetCompanySearch" />
          </el-input>
        </el-col>
        <el-col :xs="6" :sm="15" :md="15" :lg="15" :xl="15">
          <el-button type="primary" style="margin-left: 15px" icon="el-icon-circle-plus-outline" @click="AddDialog">添 加
          </el-button>
        </el-col>
        <el-col :xs="8" :sm="4" :md="4" :lg="4" :xl="4" style="text-align:right">
          <el-button type="success" style="margin-left: 15px" icon="el-icon-location-information" @click="MapClick">地图分布
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="CardTableClass">
      <el-table v-loading="loading" highlight-current-row :data="DicCategoryList" default-expand-all:true
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" row-key="RowKey"
      >
        <el-table-column prop="ComID" label="公司编号" width="120" />
        <el-table-column prop="ComName" label="公司名称" width="300" show-overflow-tooltip />
        <el-table-column prop="CompanyNumber" label="自定义公司编号" width="200" sortable />
        <el-table-column prop="ShortName" label="公司简称" width="200" show-overflow-tooltip />
        <el-table-column prop="ComAddress" label="公司地址" />
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button v-if="scope.row.Flag" icon="el-icon-circle-plus-outline" type="text" size="mini"
                       @click="showAddDialog(scope.row)"
            >曾用名</el-button>
            <el-button v-else icon="el-icon-remove-outline" type="text" size="mini" :loading="deleteLoading"
                       @click="deleteDialog(scope.row)"
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

    <el-dialog title="添加公司" :visible.sync="addDialogVisible" top="5vh" width="50%" @close="addDialogClosed">
      <el-form ref="addRef" :model="AddCompanyForm" :rules="AddCompanyRules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司名称" prop="ComName">
              <el-input v-model="AddCompanyForm.ComName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司简称" prop="ShortName">
              <el-input v-model="AddCompanyForm.ShortName" />
            </el-form-item>
          </el-col>
        </el-row>
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
                     ak="eRCv7o5j4Rmj4U2GsODMb71V2r4t4FIt" @ready="mapReady"
          >
            <bm-view class="map" style="width: 100%; height:100%; flex: 1" />
            <!-- 自定义控件 -->
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
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button type="primary" :loading="LoadingAdd" @click="saveAdd">确 定</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="addCompanyRelationVisible" width="30%" @close="showAddDialogClosed">
      <div slot="title" class="dialog-title">
        <span>添加曾用名</span>
      </div>
      <el-form ref="addCompanyRelationRef" :model="addCompanyRelationFrom" label-width="120px">
        <el-form-item label="曾用名" prop="CompanyrelationName" :rules="[
          { required: true, message: '请输入曾用名', trigger: 'blur' }
        ]"
        >
          <el-input v-model="addCompanyRelationFrom.CompanyrelationName" />
        </el-form-item>
        <el-divider />
        <el-row class="buttonCenter">
          <el-col>
            <el-button v-loading.fullscreen.lock="LoadingCompanyAdd" type="primary" @click="saveCompanyAdd">确 定
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetCompany,
  AddCompany,
  AddCompanyRelation,
  DeleteCompanyRelation
} from "@/api/SystemManagement";
import { showLoading, hideLoading } from "@/common/loading";
let geocoder;
export default {
  data() {
    return {
      addCompanyRelationFrom: {
        CompanyrelationName: '',
      },
      deleteLoading: false,
      LoadingCompanyAdd: false,
      addCompanyRelationVisible: false,
      Name: "",
      LoadingAdd: false,
      // 获取用户列表查询参数对象
      queryInfo: {
        pagenum: 1,
        pagesize: 20,
      },
      total: 0,
      addDialogVisible: false,
      DicCategoryList: [],
      AddCompanyForm: {
        ComName: "",
        ShortName: "",
        ComAddress: "",
        lat: null,
        lng: null,
      },
      AddCompanyRules: {
        // ComName: [
        //   {
        //     required: true,
        //     message: "请输入公司名称",
        //     trigger: "blur",
        //   },
        // ],
      },
      loading: false,

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
      ComID: null,
    };
  },
  watch: {},
  created() {
    this.GetCompany();
  },
  methods: {
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

    saveCompanyAdd() {
      this.LoadingCompanyAdd = true;
      this.$refs.addCompanyRelationRef.validate(async (valid) => {
        if (!valid) {
          this.LoadingCompanyAdd = false;
          return;
        }
        AddCompanyRelation(this.ComID, this.addCompanyRelationFrom.CompanyrelationName).then((res) => {
          if (res.success) {
            this.addCompanyRelationVisible = false;
            this.$message.success("操作成功");
            this.GetCompanySearch();
          } else {
            this.$message.error(res.resultMessage);
          }
          this.LoadingCompanyAdd = false;
        });
      });
    },
    showAddDialog(row) {
      this.ComID = row.ComID;
      this.addCompanyRelationVisible = true;
    },
    showAddDialogClosed() {
      this.addCompanyRelationFrom.CompanyrelationName = '';
      this.addCompanyRelationVisible = false;
    },
    addDialogClosed() {
      this.$refs.addRef.resetFields();
      this.addDialogVisible = false;
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
      this.GetCompany();
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newSize) {
      this.queryInfo.pagenum = newSize;
      this.GetCompany();
    },
    // 添加模块
    AddDialog() {
      // this.$options.data()//是原始data中的数据
      // this.$data //是改变后的data中的数据
      // this.$root //表示app.vue中data的数据
      // 初始化组件data中的数据:
      // Object.assign(this.$data, this.$options.data())
      this.AddCompanyForm.ComName = "";
      this.AddCompanyForm.ShortName = "";
      this.AddCompanyForm.ComAddress = "";
      this.inputValue = '';
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
      //   console.log(err)
      // })

      this.LoadingAdd = true;
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) {
          this.LoadingAdd = false;
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
          this.LoadingAdd = false;
        });
      });
    },
    GetCompanySearch() {
      this.queryInfo.pagenum = 1;
      this.queryInfo.pagesize = 20;
      this.GetCompany();
    },
    // 获取数据
    GetCompany() {
      this.loading = true;
      GetCompany(
        this.Name,
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      ).then((res) => {
        if (res.success) {
          this.DicCategoryList = res.result.list;
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

    // 地区组件的markersset事件
    setAddressList(e) {
      console.log(e);
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
</style>
