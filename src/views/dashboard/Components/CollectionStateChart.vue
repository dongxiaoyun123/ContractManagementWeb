<template>
  <div ref="chart1" style="width:100%;height:376px" />
</template>
<script>
import {
    GetContractStateCount,
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
            CollectionStateData: [],
        }
    },
    watch: {
        whereParameter: {
            handler(newValue, oldValue) {
                this.GetCollectionCount();
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
            GetContractStateCount(parameter).then((res) => {
                this.loading = false;
                if (res.success) {
                    this.CollectionStateData = res.result;
                    this.getEchartData()
                } else {
                    this.$message.error("获取失败");
                }
            });
        },
        getEchartData() {
            const option = {
                title: {
                    text: '近一年合同状态统计',
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
                tooltip: {
                    trigger: 'item'
                },
                // legend: {
                //     bottom: '5%',
                //     top: 'bottom',
                //     left: 'center'
                // },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '5%',
                    containLabel: true
                },

                series: [
                    {
                        name: '合同状态',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: true,
                            formatter(param) {
                                return param.name + ' ：' + param.value;
                            }
                        },
                        // emphasis: {
                        //     label: {
                        //         show: true,
                        //         fontSize: 20,
                        //         fontWeight: 'bold'
                        //     }
                        // },
                        // labelLine: {
                        //     show: false
                        // },
                        data: this.CollectionStateData,
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    var colorList = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];
                                    var index = params.dataIndex % colorList.length;
                                    return colorList[index]
                                }
                            }
                        },
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
