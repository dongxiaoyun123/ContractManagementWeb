<template>
  <div ref="chart1" style="width:100%;height:376px" />
</template>
<script>
import echarts from 'echarts'
export default {
    data() {
        return {
            myChart1: null,
        }
    },
    watch: {},
    mounted() {
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
        this.getEchartData()
    },
    created() {
    },
    methods: {
        getEchartData() {
            const option = {
                title: {
                    text: '近一年合同录入统计',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
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
                    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
                },
                yAxis: {
                    type: 'value'
                },

                series: [
                    {
                        name: '合同录入条数',
                        barWidth: '60%',
                        data: [20, 50, 60, 30, 73, 30, 46, 41, 50, 66, 31, 20],
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
