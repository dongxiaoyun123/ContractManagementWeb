<template>
    <div ref="chart1" style="width:100%;height:376px" />
</template>
<script>
import {
    GetContractEnterCount,
} from "@/api/Dashboards";
import echarts from 'echarts'
import { string } from "yargs";
export default {
    data() {
        return {
            myChart1: null,
            loading: false,
            MonthData: [],
            CollectionCountData: [],
        }
    },
    //父组件传过来的数据
    props: {
        WhereParameter: {
            type: Object
        },
        Title: {
            type: String
        },
    },
    // watch: {
    //     WhereParameter: {
    //         handler() {
    //             debugger
    //             this.GetCollectionCount();
    //         },
    //         deep: true,  // 可以深度检测到 obj 对象的属性值的变化
    //     },
    // },
    mounted() {
        this.GetCollectionCount();
    },
    created() {

    },
    methods: {
        GetCollectionCount() {
            //初始化echarts
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
            //获取数据
            var parameter = {
                ContractsOption: this.WhereParameter.ContractsOption,
                UserArray: this.WhereParameter.UserArray,
                PositionStatus: this.WhereParameter.PositionStatus
            }
            GetContractEnterCount(parameter).then((res) => {
                this.loading = false;
                if (res.success) {
                    this.MonthData = res.result.monthData;
                    this.CollectionCountData = res.result.contractEnterData;
                    this.getEchartData()
                }
                else {
                    this.$message.error("获取失败");
                }
            });
        },
        getEchartData() {
            const option = {
                title: {
                    text: this.Title,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
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
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '5%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: this.MonthData
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '合同录入条数',
                        barWidth: '60%',
                        data: this.CollectionCountData,
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    var colorList = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc',];
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
