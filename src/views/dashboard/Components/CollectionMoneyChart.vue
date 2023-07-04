<template>
  <div ref="chart1" style="width:100%;height:376px" />
</template>
<script>
import {
    GetContractMoneyCount,
} from "@/api/Dashboards";
import echarts from 'echarts'
export default {
    // 父组件传过来的数据
    props: {
        whereParameter: {
            type: Object,
            default() {
                return [];
            }
        },
    },
    data() {
        return {
            myChart1: null,
            MonthData: [],
            CollectionCountData: [],
        }
    },
    watch: {
        whereParameter: {
            handler() {
                if (this.whereParameter.ContractsOption == "客户合同录入") { this.GetCollectionCount(); }
            },
            deep: true,  // 可以深度检测到 obj 对象的属性值的变化
        },
    },
    mounted() {
    },
    created() {
    },
    methods: {
        GetCollectionCount() {
            // 初始化echarts
            var chart1 = this.$refs.chart1
            this.myChart1 = echarts.init(chart1);
            this.myChart1.clear();
            this.myChart1.showLoading({
                text: 'loading',
                color: this.$store.state.settings.theme,
                textColor: '#000',
                maskColor: 'rgba(255, 255, 255, 0.8)',
                zlevel: 0,
            });
            // 获取数据
            var parameter = {
                ContractsOption: this.whereParameter.ContractsOption,
                UserArray: this.whereParameter.UserArray,
                PositionStatus: this.whereParameter.PositionStatus
            }
            GetContractMoneyCount(parameter).then((res) => {
                this.loading = false;
                if (res.success) {
                    this.MonthData = res.result.monthData;
                    this.CollectionCountData = res.result.contractEnterData;
                    this.getEchartData()
                } else {
                    this.$message.error("获取失败");
                }
            });
        },
        getEchartData() {
            const option = {
                title: {
                    text: '近一年合同金额统计',
                },
                toolbox: {
                    right: '3%',
                    feature: {
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    // formatter: function (v) {
                    //     let value=v[0].data;
                    //     if (value >= 100000000) {
                    //             return value / 100000000 + "亿";
                    //         } else if (value >= 10000000) {
                    //             return value / 10000000 + "千万";
                    //         } else if (value >= 1000000) {
                    //             return value / 1000000 + "百万";
                    //         } else if (value >= 100000) {
                    //             return value / 100000 + "十万";
                    //         } else if (value >= 10000) {
                    //             return value / 10000 + "万";
                    //         } else if (value >= 1000) {
                    //             return value / 1000 + "千";
                    //         } else {
                    //             return value;
                    //         }
                    //         }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '5%',
                    containLabel: true
                },
                // toolbox: {
                //     show: true,
                //     feature: {
                //         dataZoom: {
                //             yAxisIndex: 'none'
                //         },
                //         dataView: { readOnly: false },
                //         magicType: { type: ['line', 'bar'] },
                //         restore: {},
                //         saveAsImage: {}
                //     }
                // },
                xAxis: {
                    type: 'category',
                    data: this.MonthData
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: function (value, index) {
                            if (value >= 100000000) {
                                return value / 100000000 + "亿";
                            } else if (value >= 10000000) {
                                return value / 10000000 + "千万";
                            } else if (value >= 1000000) {
                                return value / 1000000 + "百万";
                            } else if (value >= 100000) {
                                return value / 100000 + "十万";
                            } else if (value >= 10000) {
                                return value / 10000 + "万";
                            } else if (value >= 1000) {
                                return value / 1000 + "千";
                            } else {
                                return value;
                            }
                        }
                    }
                },
                series: [
                    {
                        data: this.CollectionCountData,
                        type: 'line',
                        smooth: true,
                        color: '#5470c6',
                    }
                ]
            }
            this.myChart1.setOption(option);
            this.myChart1.hideLoading();
            window.addEventListener("resize", () => {
                this.myChart1.resize()
            })

            this.$on('hook:destroyed', () => {
                window.removeEventListener("resize", () => {
                    this.myChart1.resize();
                });
            })
        },
    }
}
</script>
