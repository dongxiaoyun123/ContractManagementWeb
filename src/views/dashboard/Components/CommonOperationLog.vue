<template>
  <div style="height: 550px;">
    <el-card class="box-card cardTopClass" style="float: right ;width:99%;height:530px;">
      <div slot="header" class="clearfix">
        <div slot="header" class="clearfix">
          <h4 style="float: left;margin: 0;">操作记录</h4>
        </div>
      </div>
      <!-- <el-backtop target=".infinite-list" :bottom="45">
                <div class="TopClass">
                    UP
                </div>
            </el-backtop> -->
      <div v-loading="loading" class="block">
        <el-timeline>
          <!-- 无限滚动组件有一个bug必须加上阈值，否则可能导致不能滚动或者只能滚动一次等诸多问题 -->
          <ul v-infinite-scroll="loadLogPaymentList" class="infinite-list" style="overflow:auto"
              infinite-scroll-distance="1"
          >
            <el-timeline-item v-for="item in LogPaymentList" :timestamp="item.CreateTimeStr"
                              placement="top"
            >
              <div style="width:95% ;">
                <h4 style="margin: 0;">{{ item.PermissionName }}</h4>
                <p>{{ item.CreateUserName }}>>>{{ item.MenuDescription }}>>>{{ item.Description }}</p>
              </div>
            </el-timeline-item>
          </ul>
        </el-timeline>
      </div>
    </el-card>
  </div>
</template>
<script>
import {
    GetSystemLog,
} from "@/api/SystemManagement";
export default {
    data() {
        return {
            LoadingAdd: false,
            // 获取用户列表查询参数对象
            queryInfo: {
                pagenum: 1,
                pagesize: 1,
            },
            total: 0,
            loading: false,
            LogPaymentList: [],
        };
    },
    watch: {},
    created() {
    },
    methods: {
        loadLogPaymentList() {
            this.queryInfo.pagesize += 5;
            this.GetSystemLog();
        },
        // 获取数据
        GetSystemLog() {
            this.loading = true;
            GetSystemLog("", "", "", this.queryInfo.pagenum, this.queryInfo.pagesize).then((res) => {
                if (res.success) {
                    this.LogPaymentList = res.result.list;
                    this.total = res.result.totalNumber;
                } else {
                    this.LogPaymentList = [];
                    this.total = 0;
                }
                this.loading = false;
            });
        },
    },
}
</script>
<style  scoped>
.components-container {
    position: relative;
    height: calc(100vh - 100px);
}

.left-container {
    height: 100%;
}

.right-container {
    background-color: #F38181;
    height: 100%;
}

.top-container {
    width: 100%;
    height: calc(50vh - 54px);
}

.bottom-container {
    width: 100%;
    height: calc(50vh - 54px);
    margin-top: 8px;
}

.buttonCenter {
    text-align: center;
}

.infinite-list {
    height: 430px;
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e8f3fe;
    margin: 10px;
    color: #7dbcfc;
}

.TopClass {
    height: 100%;
    width: 100%;
    background-color: #f2f5f6;
    box-shadow: 0 0 6px rgba(0, 0, 0, .12);
    text-align: center;
    line-height: 40px;
    color: #1989fa;
}
</style>
