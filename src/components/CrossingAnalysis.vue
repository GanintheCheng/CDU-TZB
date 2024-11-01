<script setup lang="ts">
// echarts imports
import * as echarts from 'echarts/core';
import axios from 'axios'
import {
    BarChart,
    LineChart
} from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type {
    BarSeriesOption,
    LineSeriesOption
} from 'echarts/charts';
import type {
    TitleComponentOption,
    TooltipComponentOption,
    GridComponentOption,
    DatasetComponentOption
} from 'echarts/components';
import type {
    ComposeOption,
} from 'echarts/core';
import { useRouter } from 'vue-router'
const router = useRouter()

type ECOption = ComposeOption<
    | BarSeriesOption
    | LineSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DatasetComponentOption
>;

// Register necessary components
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    BarChart,
    LineChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
]);

const dateArray = ref(['2024-07-01', '2024-07-02', '2024-07-03', '2024-07-04', '2024-07-05', '2024-07-06', '2024-07-07'])
const status = ref('')

const option1 = ref({
    title: {
        text: '路口图',
        textStyle: {
            color: '#fff' // 标题字体颜色
        }
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params: any) {
            let tooltipHtml = '<strong style="color:#6e84da;">' + params[0].axisValueLabel + '</strong><br>';
            params.forEach((param: any) => {
                tooltipHtml +=
                    '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' +
                    param.color +
                    '"></span>' +
                    param.seriesName + ': <strong style="color: #6e84da;">' + param.value + '%</strong><br>';
            });
            return tooltipHtml;
        }
    },
    legend: {
        data: [ '缓行比', '拥堵比'],
        textStyle: {
            color: '#fff' // 图例字体颜色
        }
    },
    grid: {
        left: '0%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: true,
        data: dateArray.value,
        axisLabel: {
            color: '#fff' // X轴标签颜色
        }
    },
    yAxis: {
        type: 'value',
        max: 10,
        min: 0,
        axisLabel: {
            formatter: '{value}%',
            color: '#fff' // Y轴标签颜色
        }
    },
    series: [
        {
            name: '缓行比',
            type: 'bar',
            color: '#00bfff', // 明亮蓝色
            data: [6.09, 8.43, 6.81, 2.95, 5.75, 8.26, 6.83, 6.22]
        },
        {
            name: '拥堵比',
            type: 'bar',
            color: '#ff4500', // 明亮橙红色
            data: [1.08, 2.18, 1.4, 0.46, 1.25, 2.88, 1.99, 1.42]
        }
    ]
});

const option2: ECOption = {
    title: {
        text: '路段图',
        textStyle: {
            color: '#fff' // 标题字体颜色
        }
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params: any) {
            let tooltipHtml = '<strong style="color: #6e84da;">状态次数</strong><br>';
            params.forEach((param: any) => {
                tooltipHtml +=
                    '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' +
                    param.color +
                    '"></span>' +
                    '次数: <strong style="color: #6e84da;">' + param.value + '</strong><br>';
            });
            return tooltipHtml;
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '0%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: ['天府大道北段', '科华南路', '天府大道中段', '成都绕城高速', '成灌高速', '水碾河路', '川陕路'],
        axisLabel: {
            interval: 0,
            rotate: 45,
            color: '#fff' // X轴标签颜色
        }
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            color: '#fff' // Y轴标签颜色
        }
    },
    series: [
        {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'bar',
            itemStyle: {
                color: '#00bfff' // 明亮蓝色
            }
        }
    ]
};

import { ref, onMounted, watchEffect, watch } from "vue";
import { useRoute } from 'vue-router';
const date = ref(['2024-07-01', '2024-07-07']);
const chartRef1 = ref(null);
const chartRef2 = ref(null);

//info
const name = ref<string | null>('1')
//loading
const loading = ref(true)

// 路径参数
const id = ref<string | null>(null);
const route = useRoute();
watchEffect(() => {
    id.value = route.query.id as string | null;
    name.value = route.query.name as string | null;
});
// import { defineProps } from 'vue';

// const props = defineProps({
//     id: Number
// });

const getAva = async () => {
    try {
        const response = await axios({
            method: 'GET',
            url: `http://47.108.190.192:8090/api/report/crossing?beginDate=${date.value[0]}&endDate=${date.value[1]}&crossingId=${id.value}`,
        });
        response.data.data[0].type = 'bar'
        response.data.data[1].type = 'bar'
        response.data.data[2].type = 'bar'
        console.log(response.data);

        option1.value.series[0] = response.data.data[1];
        option1.value.series[1] = response.data.data[2];
        for (let i = 0; i < option1.value.series[0].data.length; i++) {
            if (option1.value.series[0].data[i] > 10 || option1.value.series[1].data[i] > 10) {
                option1.value.yAxis.max = 20
                break
            }
            option1.value.yAxis.max = 10
        }
        console.log(response.data.data);
        if (response.data.data[1])
            return response.data; // 返回数据，以便在需要时使用
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // 重新抛出错误，以便在调用处处理
    }
};

const getRoad = async () => {
    try {
        // 确保 status 参数的正确处理
        const statusValue = status.value == '' || status.value == undefined || status.value == null ? 1 : status.value;

        const response = await axios({
            method: 'GET',
            url: `http://47.108.190.192:8090/api/report/road`,
            params: {
                crossing_id: id.value,
                status: statusValue
            }
        });

        // 处理返回的数据
        option2.series[0].data = response.data.data.countList;
        option2.xAxis.data = response.data.data.nameList;
        console.log(response.data.data);
        console.log(option2);

        return response.data; // 返回数据，以便在需要时使用
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // 重新抛出错误，以便在调用处处理
    }
};

const getData = async () => {
    try {
        await getAva();
        await getRoad();
        if (chartRef1.value) {
            const chartInstance1 = echarts.init(chartRef1.value);
            chartInstance1.setOption(option1.value);
        }

        if (chartRef2.value) {
            const chartInstance2 = echarts.init(chartRef2.value);
            chartInstance2.setOption(option2);
        }
        loading.value = !loading.value
    } catch (error) {
        console.error('Error in onMounted:', error);
        // 这里可以添加错误处理逻辑，比如显示一个错误消息给用户
    }
}
onMounted(async () => {
    getData()
});

const predict = ref('')
const analysis = ref('')
const reason = ref('')
const suggest = ref('')
const nowTime = ref('')
const getPrediction = () => {
    axios({
        method: 'GET',
        url: 'http://47.108.190.192:8090/api/crossing/predict/' + id.value,
    }).then(res => {
        predict.value = res.data.data
        // console.log(res.data.data);
    }).catch(() => {

    })
}
const getAnalysis = () => {
    axios({
        method: 'GET',
        url: 'http://47.108.190.192:8090/api/crossing/history/' + id.value,
    }).then(res => {
        if (res.data.code == 1) {
            analysis.value = res.data.data.timeAnalyse
            reason.value = res.data.data.reasonAnalyse
            suggest.value = res.data.data.suggestion
            nowTime.value = res.data.data.lastUpdateTime
        }
        else {
            analysis.value = '暂无数据'
        }
        // console.log(res.data.data);
    }).catch(() => {

    })
}
watch(date, (newDate, oldDate) => {
    console.log('date 发生了变化:');
    loading.value = !loading.value;
    dateArray.value = getDatesInRange();
    option1.value.xAxis.data = dateArray.value;  // 确保 xAxis 数据被更新
    getData();
});

watch(status, (newDate) => {
    loading.value = !loading.value;
    getData()
})

const getDatesInRange = () => {
    const startDate = date.value[0]
    const endDate = date.value[1]
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
        dateArray.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
}
getPrediction()
getAnalysis()
const options = [
    {
        value: '1',
        label: '畅通',
    },
    {
        value: '2',
        label: '缓行',
    },
    {
        value: '3',
        label: '拥堵',
    },
    {
        value: '4',
        label: '严重拥堵',
    },
]
</script>

<template>
    <div class="datav-container">
        <dv-border-box-11 :title="name">
            <div class="content-wrapper">
                <div class="box" v-loading="loading" v-if="id != undefined || ''">
                    <div class="top">
                        <div class="topleft">
                            <dv-border-box10>
                                <div class="info">
                                    <div class="name">{{ name }}</div>
                                    <div class="date">
                                        <el-date-picker v-model="date" type="daterange" start-placeholder="起始"
                                            end-placeholder="终点" format="YYYY/MM/DD" value-format="YYYY-MM-DD"
                                            :default-value="[new Date(2024, 7, 1), new Date(2024, 7, 7)]"
                                            class="date-picker" />
                                    </div>
                                </div>
                                <div class="pic" ref="chartRef1"></div>
                            </dv-border-box10>
                        </div>
                        <div class="topright">
                            <dv-border-box10>
                                <div class="info">
                                    <div class="name">{{ name }}</div>
                                    <el-select placeholder="状态选择(默认畅通)" class="status-select" v-model="status">
                                        <el-option v-for="item in options" :key="item.value" :label="'状态:' + item.label"
                                            :value="item.value" />
                                    </el-select>
                                </div>
                                <div class="pic" ref="chartRef2"></div>
                            </dv-border-box10>
                        </div>
                    </div>
                    <dv-decoration-5 style="width:100%;" dur="10"/>
                    <dv-border-box12 class="middle-box"></dv-border-box12>
                    <div class="bt">
                        <div class="btbox">
                            <dv-decoration-3 style="width:100%;height: 10px;overflow-y: hidden;" />
                            <div class="name">
                                功能菜单 | 分析数据截止时间{{ nowTime }}
                            </div>
                            <el-tabs type="border-card" class="custom-tabs">
                                <el-tab-pane label="数据分析" class="info">
                                    <div class="content-panel" v-html="analysis"></div>
                                </el-tab-pane>
                                <el-tab-pane label="未来预测" class="info">
                                    <div class="content-panel" v-html="predict"></div>
                                </el-tab-pane>
                                <el-tab-pane label="原因" class="info">
                                    <div class="content-panel" v-html="reason"></div>
                                </el-tab-pane>
                                <el-tab-pane label="建议" class="info">
                                    <div class="content-panel" v-html="suggest"></div>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>
                </div>
                <div v-else class="empty-state">
                    <el-empty description="请在后台数据参数设置界面进行道路选择">
                        <el-button type="primary" @click="router.push(`/backdata`)">点击跳转</el-button>
                    </el-empty>
                </div>
            </div>
        </dv-border-box-11>
    </div>
</template>

<style scoped>
* {
    overflow-x: hidden;
    /* 禁止左右滑动 */
}

.datav-container {
    width: 100%;
    /* height: 100vh; */
    background-color: #061d3c;
    color: #fff;
    overflow-x: hidden;
    /* 禁止左右滑动 */
}

.content-wrapper {
    height: 100%;
    padding: 60px 20px 20px 20px;
    /* overflow-y: auto; */
}

.box {
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: auto;
    min-height: 100%;
}

.top {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    height: 400px;
}

.topleft,
.topright {
    flex: 0.5;
    display: flex;
    flex-direction: column;
    background: rgba(6, 30, 93, 0.5);
    border-radius: 8px;
}

.info {
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 20px;
    background: rgba(255, 255, 255, 0.05);
}

.name {
    font-size: 16px;
    font-weight: bold;
    color: #00f0ff;
    white-space: nowrap;
}

.date-picker,
.status-select {
    width: 240px;
    --el-select-bg-color: rgba(0, 0, 0, 0.3);
    --el-select-text-color: #fff;
    --el-select-border-color: #00f0ff;
}

.pic {
    flex: 1;
    min-height: 300px;
    padding: 15px;
}

.bt {
    flex: 1;
    height: 200px;
    overflow-y: auto;
    /* 允许bt区上下滚动 */
}

.btbox {
    width: 80%;
    height:300px;
    margin: 0 auto;
    background: rgba(6, 30, 93, 0.5);
    border-radius: 8px;
    padding: 20px;
}

.custom-tabs {
    margin-top: 15px;
    background: transparent;
    border: none;
}

.content-panel {
    line-height: 1.6;
    text-indent: 20px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    color: #fff;
    margin: 10px 0;
}

/* 深色主题下的Tab样式 */
:deep(.el-tabs) {
    --el-tabs-header-background-color: rgba(0, 0, 0, 0.3);
    --el-tabs-border-color: #00f0ff;
    --el-color-primary: #00f0ff;
}

:deep(.el-tabs__item) {
    color: black !important;
}

:deep(.el-tabs__item.is-active) {
    color: red !important;
}


/* 自定义滚动条 */
.btbox::-webkit-scrollbar {
    width: 6px;
}

.btbox::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
}

.btbox::-webkit-scrollbar-thumb {
    background: rgba(0, 240, 255, 0.5);
    border-radius: 3px;
}

.el-main ::-webkit-scrollbar {
    width: 6px;
}

.el-main ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
}

.el-main ::-webkit-scrollbar-thumb {
    background: rgba(0, 240, 255, 0.5);
    border-radius: 3px;
}
</style>
