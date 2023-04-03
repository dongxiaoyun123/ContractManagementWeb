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
                    text: '近一年合同状态统计',
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                // legend: {
                //     top: '5%',
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
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 20,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 5900, name: '正在执行' },
                            { value: 150, name: '到期，未结款' },
                            { value: 930, name: '已完结' },
                            { value: 3, name: '未知' },
                        ],
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
