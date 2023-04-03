<template>
  <el-row :gutter="20" class="panel-group row-bg">
    <el-col class="card-panel-col grid-content" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-AuditFailed">
          <svg-icon style="color: inherit;" icon-class="iconfont icon-lurupizhunwenhao" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            录入未送审
          </div>
          <count-to :start-val="0" :end-val="10" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col class="card-panel-col grid-content" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-UnderReview">
          <svg-icon style="color: inherit;" icon-class="iconfont icon-shenhezhong" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            审核中
          </div>
          <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col class="card-panel-col grid-content" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-Entry">
          <svg-icon style="color: inherit;" icon-class="iconfont icon-shenheshibai" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            审核失败
          </div>
          <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col class="card-panel-col grid-content" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-AuditSuccess">
          <svg-icon style="color: inherit;" icon-class="iconfont icon-tijiaochenggong" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            审核成功
          </div>
          <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <!-- <el-col class="card-panel-col grid-content" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-ToVoid">
          <svg-icon style="color: inherit;"  icon-class="iconfont icon-zuofei" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            作废
          </div>
          <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col> -->
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .card-panel-col {
    margin-bottom: 20px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-Entry {
        background: #ff4949;
      }

      .icon-UnderReview {
        background: #1890ff;
      }

      .icon-AuditFailed {
        background: #ffba00;
      }

      .icon-AuditSuccess {
        background: #13ce66;
      }

      .icon-ToVoid {
        background: #909399;
      }
    }

    .icon-Entry {
      color: #ff4949;
    }

    .icon-UnderReview {
      color: #1890ff;
    }

    .icon-AuditFailed {
      color: #ffba00;
    }

    .icon-AuditSuccess {
      color: #13ce66;
    }

    .icon-ToVoid {
      color: #909399;
    }

    .card-panel-icon-wrapper {
      float: left !important;
      margin: 23px 0 0 23px !important;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 33px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
        text-align: right;
      }
      .card-panel-num {
        font-size: 20px;
        display: block;
        text-align: right;
      }
    }
  }
}

// @media (max-width:550px) {
//   .card-panel-description {
//     display: none;
//   }
//   .card-panel-icon-wrapper {
//     float: none !important;
//     width: 100%;
//     height: 100%;
//     margin: 0 !important;
//   }
// }

// 只在这个页面这样配置，别的页面先不管
::v-deep .iconfont {
  display: block;
  margin: 9px 12px 9px 12px !important;
  float: none !important;
  font-size: 40px;
}
</style>
