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
                    text: '近一年合同金额统计',
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
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
                    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [12000, 56875, 63527, 12045, 79531, 62185, 52987, 98764, 56859, 72698, 53968, 77259],
                        type: 'line',
                        smooth: true,
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
