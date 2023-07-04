<template>
  <div ref="chart1" style="width:100%;height:376px" />
</template>
<script>
import {
    GetCollectionDatastatistics,
} from "@/api/Dashboards";
import echarts from 'echarts'
export default {
    data() {
        return {
            myChart1: null,
            monthData: [],
            countData: [],
            totalMoneyData: [],
        }
    },
    mounted() {
        this.GetCollectionCount();
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
            GetCollectionDatastatistics().then((res) => {
                this.loading = false;
                if (res.success) {
                    this.monthData = res.result.monthData;
                    this.countData = res.result.countData;
                    this.totalMoneyData = res.result.totalMoneyData;
                    this.getEchartData()
                } else {
                    this.$message.error("获取失败");
                }
            });
        },
        getEchartData() {
            const option = {
                title: {
                    text: '近一年回款导入统计',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    right: '3%',
                    feature: {
                        dataView: { show: true, readOnly: false },
                        // magicType: { show: true, type: ['line', 'bar'] },
                        // restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                // legend: {
                //     data: ['Precipitation', 'Temperature']
                // },
                grid: {
                    left: '3%',
                    right: '2%',
                    bottom: '5%',
                    top: '20%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.monthData,
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '导入条数',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: '导入金额',
                        // axisLabel: {
                        //     formatter: '{value}'
                        // },
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
                    }
                ],
                series: [
                    {
                        name: '导入条数',
                        type: 'bar',
                        barWidth: '60%',
                        tooltip: {
                            valueFormatter: function (value) {
                                return value;
                            }
                        },
                        data: this.countData,
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    var colorList = ['#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];
                                    var index = params.dataIndex % colorList.length;
                                    return colorList[index]
                                }
                            }
                        },
                    },
                    {
                        name: '导入金额',
                        type: 'line',
                        yAxisIndex: 1,
                        tooltip: {
                            valueFormatter: function (value) {
                                return value;
                            }
                        },
                        data: this.totalMoneyData,
                        color: '#5470c6'
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
