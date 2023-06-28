
<template>
  <div style="padding: 16px;">
    <el-card v-loading="mapShow">
      <el-row>
        <el-col v-if="typeParameter" class="titleClass" :span="24" style="text-align: right">
          <el-button icon="el-icon-back" type="primary" @click="ReturnClick">返 回</el-button>
        </el-col>
        <el-col :span="24">
          <div class="contact">
            <baidu-map class="map" :style="mapHeights" :center="markerPoint" :zoom="13"
                       :scroll-wheel-zoom="true"
            >
              <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT" />
              <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" />
              <!-- <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT">
                                        </bm-map-type> -->
              <!-- //定位 -->
              <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :show-address-bar="true" :auto-location="true" />
              <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT" />
              <!-- <bm-label v-for="item in mapData" :content="item.ComName"
                            :position="{ lng: item.lng, lat: item.lat }" :labelStyle="{ color: 'red', fontSize: '12px' }"
                                                       /> -->
              <!-- <bm-marker v-for="item in mapData" :position="{ lng: item.lng, lat: item.lat }"
                            @click="infoWindowOpen(item)" :title="item.ComName" zIndex="1">
                            <bm-info-window :position="{ lng: item.lng, lat: item.lat }" :show="item.show"
                                @close="infoWindowClose(item)" @open="infoWindowOpen(item)" style="font-size:13px">
                                <el-descriptions class="margin-top" :title="item.ComName" :column="2" :size="size"
                                    border>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-location"></i>
                                            经 度
                                        </template>
                                        {{ item.lng.toFixed(6) }}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-location"></i>
                                            纬 度
                                        </template>
                                        {{ item.lat.toFixed(6) }}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label" style="width:180px;">
                                            <i class="el-icon-map-location"></i>
                                            地 址
                                        </template>
                                        {{ item.ComAddress }}
                                    </el-descriptions-item>

                                </el-descriptions>

                            </bm-info-window>
                                                    </bm-marker> -->

              <bm-marker v-for="item in mapData" :position="{ lng: item.lng, lat: item.lat }"
                         @click="collectionOpen(item)"
              />

              <!-- <bm-point-collection :points="mapData" :shape='BMAP_POINT_SHAPE_STAR'
                                                        :size="BMAP_POINT_SIZE_BIGGER" color="red" @click="collectionOpen"></bm-point-collection> -->
              <bm-info-window v-for="item in mapData" :position="{ lng: item.lng, lat: item.lat }"
                              :show="item.show" style="font-size:13px" @close="infoWindowClose(item)"
                              @open="infoWindowOpen(item)"
              >
                <el-descriptions class="margin-top" :title="item.ComName" :column="2" :size="size" border>
                  <el-descriptions-item>
                    <template slot="label">
                      <i class="el-icon-location" />
                      经 度
                    </template>
                    {{ item.lng.toFixed(6) }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      <i class="el-icon-location" />
                      纬 度
                    </template>
                    {{ item.lat.toFixed(6) }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label" style="width:180px;">
                      <i class="el-icon-map-location" />
                      地 址
                    </template>
                    {{ item.ComAddress }}
                  </el-descriptions-item>
                </el-descriptions>
              </bm-info-window>
            </baidu-map>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import {
    GetCompanyAddress,
} from "@/api/SystemManagement";
import { showLoading, hideLoading } from "@/common/loading";
export default {
    name: 'ContractsMap',
    data() {
        return {
            markerPoint: { lng: 116.4, lat: 39.9 },
            show: false,
            mapData: [],
            size: '12px',
            BMAP_POINT_SHAPE_STAR: 'BMAP_POINT_SHAPE_STAR',
            BMAP_POINT_SIZE_BIGGER: 'BMAP_POINT_SIZE_BIGGER',
            mapShow: false,
            typeParameter: this.$route.query.type,
            mapHeight: 'calc(100vh - 185px)'
        };
    },
    computed: {
        // 动态设置样式
        mapHeights() {
            if (!this.$route.query.type) {
                this.mapHeight = 'calc(100vh - 145px)';
                return 'height:' + this.mapHeight;
            } else {
                return 'height:' + this.mapHeight;
            }
        }
    },
    created() {
        this.mapShow = true;
        // showLoading();
        GetCompanyAddress().then((res) => {
            if (res.success) {
                res.result.forEach(element => {
                    const first = element;
                    // this.$jsonp('http://api.map.baidu.com/geocoding/v3/', {
                    //     address: first.ComAddress,
                    //     output: 'json',
                    //     ak: 'eRCv7o5j4Rmj4U2GsODMb71V2r4t4FIt'
                    // }).then(json => {
                    //     // 得到我们想要的经纬度 状态0代表找到了经纬度
                    //     if (json.status == 0) {
                    //         let item = {
                    //             lat: json.result.location.lat,
                    //             lng: json.result.location.lng,
                    //             show: false,
                    //             ComName: first.ComName,
                    //             ComAddress: first.ComAddress,
                    //         }
                    //         this.mapData.push(item);
                    //     }
                    // }).catch(err => {
                    //     console.log(err)
                    // })
                    const item = {
                        lat: first.lat,
                        lng: first.lng,
                        show: false,
                        ComName: first.ComName,
                        ComAddress: first.ComAddress,
                    }
                    this.mapData.push(item);
                });
            } else {
                this.mapData = [];
            }
            // hideLoading();
            setTimeout(() => {
                this.mapShow = false;
            }, 2000)
        });
    },
    // 加载完成后执行调取回款数据接口
    mounted() {

    },
    methods: {
        clickHandler(e) {
            alert(`单击点的坐标为：${e.point.lng}, ${e.point.lat}`);
        },

        ReturnClick() {
            switch (this.$route.query.type) {
                case '1':
                    this.$router.push({
                        path: `/CompanyManagementConfiguration/CompanyManagement`,
                    });
                    break;
                case '2':
                    this.$router.push({
                        path: `/ContractEntry/ContractsList`,
                    });
                    break;
            }
        },
        infoWindowClose(item) {
            if (item) { item.show = false }
        },
        infoWindowOpen(item) {
            if (item) { item.show = true; }
        },
        collectionOpen(item) {
            if (item) { item.show = true; }
        },
    }
};
</script>

<style scoped>
.map {
    width: 100%;

    /* margin-top: 1rem; */
    /* padding: 15px 0 15px 0 ; */
}

.titleClass {
    height: 40px;
}

.el-descriptions :not(.is-bordered) .el-descriptions-item__cell {
    padding-bottom: 12px;
    width: 80px;
}
</style>
