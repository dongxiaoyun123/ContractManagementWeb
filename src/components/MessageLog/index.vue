<template>
  <div>
    <!-- <el-badge :is-dot="true" style="line-height: 25px;margin-top: -5px;" @click.native="dialogTableVisible=true"> -->
    <!-- <el-button style="padding: 8px 10px;"  type="danger"> -->
    <svg-icon icon-class="question" style="font-weight:bloder ;" @click.native="dialogTableVisible = true" />
    <!-- </el-button> -->
    <!-- </el-badge> -->

    <el-dialog :visible.sync="dialogTableVisible" top="5vh" width="80%" append-to-body>
      <!-- <div slot="title">
        <span style="padding-right: 10px;">Error Log</span>
        <el-button size="mini" type="primary" icon="el-icon-delete" @click="clearAll">Clear All</el-button>
      </div> -->
      <el-table :data="MessageLogList" border height="calc(100vh - 180px)">
        <el-table-column label="操作人信息">
          <template slot-scope="{row}">
            <div class="divClass">
              <span class="message-title">菜单名称：</span>
              <el-tag type="primary">
                {{ row.MenuName }}
              </el-tag>
            </div>
            <div class="divClass">
              <span class="message-title">提交人：</span>
              {{ row.User_RealName }}
            </div>
            <div class="divClass">
              <span class="message-title">提交时间：</span>
              <i class="el-icon-time" /> {{ dateFormat(row.CreateTime) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="意见与建议">
          <template slot-scope="scope">
            {{ scope.row.ProblemDescription }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>

import {
  GetMessageLog,
} from "@/api/Dashboards";
export default {
  name: 'MessageLog',
  data() {
    return {
      dialogTableVisible: false,
      MessageLogList: [],
    }
  },
  computed: {
    errorLogs() {
      return this.$store.getters.errorLogs
    }
  },
  mounted() {
    this.GetMessageLog();
  },
  methods: {
    // 列表时间格式化
    dateFormat(row) {
      if (row) {
        return this.$moment(row).format("YYYY-MM-DD HH:mm:ss");
      } else { return null; }
    },
    // clearAll() {
    //   this.dialogTableVisible = false
    //   this.$store.dispatch('errorLog/clearErrorLog')
    // },
    // 获取数据
    GetMessageLog() {
      GetMessageLog().then((res) => {
        if (res.success) {
          this.MessageLogList = res.result;
        } else {
          this.MessageLogList = [];
        }
      });
    },
  },
}
</script>

<style scoped>

.message-title {
  color: #333;
  font-weight: bold;
  padding-right: 8px;
}

.divClass {
  margin: 4px 0;
}

</style>
