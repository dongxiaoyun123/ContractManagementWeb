<template>
    <div ref="chart1" style="width:100%;height:450px" />
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
                    text: '近一年发票种类统计'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: ['增值税专用发票', '增值税普通发票', '增值税电子普通发票'],
                    top: '8%'
                },
                toolbox: {
                    show: true,
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
                    top: '18%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '增值税专用发票',
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: [120, 132, 101, 134, 90, 230, 210, 345, 254, 356, 452, 512],
                        itemStyle: {
                            normal: {
                                color: '#5470c6'

                            }
                        },
                    },
                    {
                        name: '增值税普通发票',
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: [220, 182, 191, 234, 290, 330, 310, 345, 190, 325, 424, 548],
                        itemStyle: {
                            normal: {
                                color: '#91cc75'
                            }
                        },
                    },
                    {
                        name: '增值税电子普通发票',
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: [150, 232, 201, 154, 190, 330, 410, 325, 254, 356, 412, 519],
                        itemStyle: {
                            normal: {
                                color: '#fac858'
                            }
                        },
                    },
                ]
            };
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
