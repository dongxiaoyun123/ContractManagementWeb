<template>
  <div style="padding: 8px;">
    <el-card>
      <el-row>
        <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="4">
          <el-input v-model="UserName" clearable placeholder="用户名称" />
        </el-col>
        <el-col :xs="12" :sm="3" :md="3" :lg="2" :xl="2">
          <el-button type="primary" style="margin-left:15px ;" icon="el-icon-search" @click="GetBindingUserSearch">查
            询</el-button>
        </el-col>
        <el-col :xs="24" :sm="15" :md="15" :lg="18" :xl="18" :style="formShow">
          <el-button-group>
            <el-button type="success" icon="el-icon-circle-plus" :loading="ExportLoading1" @click="saveUpdate(true)">
              关联用户</el-button>
            <el-button type="danger" icon="el-icon-remove" :loading="ExportLoading2" @click="saveUpdate(false)">取消关联
            </el-button>
          </el-button-group>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="CardTableClass">
      <el-table ref="multipleTable" v-loading="loading" :data="BindingUserList" fit
                :cell-style="isRed" @selection-change="TableSelect" @row-click="toggleSelection"
      >
        <el-table-column type="selection" width="50" />
        <el-table-column prop="UserName" label="用户名称" width="150" />
        <el-table-column prop="LoginName" label="登录名称" width="150" />
        <el-table-column prop="LastLoginTime" label="最后登陆时间" width="200">
          <template slot-scope="scope">
            <div v-if="scope.row.LastLoginTime">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.LastLoginTime }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="States" label="状态" width="150" sortable>
          <template slot-scope="scope">
            <el-tag v-if="scope.row.States == 1" effect="plain" type="success">已关联</el-tag>
            <el-tag v-else effect="plain" type="danger">未关联</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="CreateTime" label="创建时间" min-width="150" align="left">
          <template slot-scope="scope">
            <div v-if="scope.row.CreateTime">
              <i class="el-icon-time" />
              <span style="margin-left: 6px">{{ scope.row.CreateTime }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination background :current-page="queryInfo.pagenum" :page-sizes="[20, 50, 100]"
                     :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"
                     @size-change="handleSizeChange" @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script>
import { GetBindingUserList, UpdateStates } from "@/api/CollectionMangement";
export default {
  data() {
    return {
      formShow: '',
      ExportLoading1: false,
      ExportLoading2: false,
      UserStr: "",
      UserName: "",
      uploadLoading: false,
      Flag: false,
      States: 1, // 回款状态
      // 获取用户列表查询参数对象
      queryInfo: {
        pagenum: 1,
        pagesize: 20,
      },
      total: 0,
      BindingUserList: [],
      loading: false,
      multipleSelection: [],
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
  // 加载完成后执行调取回款数据接口
  mounted() {
    this.GetBindingUser();
  },
  methods: {
    // 点击当前行数据进行选中或取消复选框
    toggleSelection(row, column, event) {
      if (column.label != "操作")
        // 通过ref绑定后这里使用$refs.table来操作bom元素
        { this.$refs.multipleTable.toggleRowSelection(row); }
    },
    TableSelect(selection) {
      this.multipleSelection = selection;
      if (selection.length != 0) {
        this.UserStr = "";
        selection.forEach((element) => {
          this.UserStr += element.UserID + ",";
        });
        this.UserStr = this.UserStr.substring(0, this.UserStr.lastIndexOf(","));
      } else {
        this.UserStr = "";
      }
    },
    isRed({ row }) {
      const checkIdList = this.multipleSelection.map((item) => item.LoginName);
      if (checkIdList.includes(row.LoginName)) {
        return {
          backgroundColor: "#E6F7FF",
        };
      } else {
        return {
          backgroundColor: "#FFFFFF",
        };
      }
    },
    // 保存修改
    saveUpdate(Flag) {
      if (!this.UserStr) {
        this.$message.warning("请勾选要修改的用户！");
        return;
      }
      if (Flag) this.ExportLoading1 = true;
      else this.ExportLoading2 = true;
      UpdateStates(this.UserStr, Flag).then((res) => {
        if (res.success) {
          this.$message.success("操作成功");
          this.UserStr = "";
          this.GetBindingUser();
        } else {
          this.$message.error(res.resultMessage);
        }
        if (Flag) this.ExportLoading1 = false;
        else this.ExportLoading2 = false;
      });
    },

    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.GetBindingUser();
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newSize) {
      this.queryInfo.pagenum = newSize;
      this.GetBindingUser();
    },
    GetBindingUserSearch() {
      this.queryInfo.pagenum = 1;
      this.queryInfo.pagesize = 20;
      this.GetBindingUser();
    },
    // 获取关联用户数据
    GetBindingUser() {
      this.loading = true;
      GetBindingUserList(
        this.UserName,
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      ).then((res) => {
        if (res.success) {
          this.BindingUserList = res.result.list;
          this.total = res.result.totalNumber;
        } else {
          this.BindingUserList = [];
          this.total = 0;
        }
        this.UserStr = "";
        this.loading = false;
      });
    },
    fixedShowMethod(newVal) {
      // 上方表单距下方间距
      if (newVal < 768) {
        this.formShow = 'margin-top:18px';
      } else {
        this.formShow = 'text-align: right';
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
</style>
