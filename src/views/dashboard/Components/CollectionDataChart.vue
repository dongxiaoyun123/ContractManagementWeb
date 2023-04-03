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
                    text: '回款周统计'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['已回款', '未回款'],
                    top: '8%',
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '5%',
                    top: '15%',
                    containLabel: true
                },
                toolbox: {
                    show: true,
                    // feature: {
                    //     dataZoom: {
                    //         yAxisIndex: 'none'
                    //     },
                    //     dataView: { readOnly: false },
                    //     magicType: { type: ['line', 'bar'] },
                    //     restore: {},
                    //     saveAsImage: {}
                    // }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['2022第49周', '2022第50周', '2022第51周', '2022第52周', '2022第53周', '2022第54周', '2022第55周', '2023第1周', '2023第2周', '2023第3周', '2023第4周']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '已回款',
                        type: 'line',
                        stack: 'Total',
                        data: [120, 132, 101, 134, 90, 230, 210, 412, 635, 745, 865],
                        color: '#5470c6'
                    },
                    {
                        name: '未回款',
                        type: 'line',
                        stack: 'Total',
                        data: [220, 182, 191, 234, 290, 330, 310, 254, 536, 765, 848],
                        color: '#91cc75'
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
