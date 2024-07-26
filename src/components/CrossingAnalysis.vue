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

const option1: ECOption = {
    title: {
        text: '路口图'
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params: any) {
            let tooltipHtml = '<strong>' + params[0].axisValueLabel + '</strong><br>';
            params.forEach((param: any) => {
                tooltipHtml +=
                    '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' +
                    param.color +
                    '"></span>' +
                    param.seriesName +
                    ': <strong>' +
                    param.value +
                    '%</strong><br>';
            });
            return tooltipHtml;
        }
    },
    legend: {
        data: ['畅通比', '缓行比', '拥堵比']
    },
    grid: {
        left: '3%',
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
        boundaryGap: false,
        data: [
            '2024-07-01',
            '2024-07-02',
            '2024-07-03',
            '2024-07-04',
            '2024-07-05',
            '2024-07-06',
            '2024-07-07'
        ]
    },
    yAxis: {
        type: 'value',
        max: 100,
        min: 0,
        axisLabel: {
            formatter: '{value}%'
        }
    },
    series: [
        {
            name: '畅通比',
            type: 'line',
            color: 'green',
            data: [83.99, 79.88, 80.68, 83.97, 80.81, 77.04, 79.12, 80.16]
        },
        {
            name: '缓行比',
            type: 'line',
            color: '#baa381',
            data: [6.09, 8.43, 6.81, 2.95, 5.75, 8.26, 6.83, 6.22]
        },
        {
            name: '拥堵比',
            type: 'line',
            color: 'red',
            data: [1.08, 2.18, 1.4, 0.46, 1.25, 2.88, 1.99, 1.42]
        }
    ]
};

const option2: ECOption = {
    title: {
        text: '路段图'
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params: any) {
            let tooltipHtml = '<strong>' + '状态次数' + '</strong><br>';
            params.forEach((param: any) => {
                tooltipHtml +=
                    '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' +
                    param.color +
                    '"></span>' +
                    '次数' +
                    ': <strong>' +
                    param.value +
                    '</strong><br>';
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
            interval: 0,  // 强制显示所有标签
            rotate: 45  // 旋转标签
        }
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
        }
    ]
};

import { ref, onMounted, watchEffect } from "vue";
import { useRoute } from 'vue-router';
const date = ref();
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
            url: `https://city.cybercodefarmer.group/api/report/crossing?beginDate=2024-06-01&endDate=2024-06-30&crossingId=${id.value}`,
        });
        option1.series = response.data.data;
        console.log(response.data.data);
        return response.data; // 返回数据，以便在需要时使用
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // 重新抛出错误，以便在调用处处理
    }
};

const getRoad = async () => {
    try {
        const response = await axios({
            method: 'GET',
            url: `https://city.cybercodefarmer.group/api/report/road?crossing_id=${id.value}&status=1`,
        });
        option2.series[0].data = response.data.data.countList;
        option2.xAxis.data = response.data.data.nameList
        console.log(response.data.data);
        console.log(option2);

        return response.data; // 返回数据，以便在需要时使用
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // 重新抛出错误，以便在调用处处理
    }
};

onMounted(async () => {
    try {
        await getAva();
        await getRoad();
        if (chartRef1.value) {
            const chartInstance1 = echarts.init(chartRef1.value);
            chartInstance1.setOption(option1);
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
});


const predict = ref('')
const analysis = ref('')
const getPrediction = () => {
    axios({
        method: 'GET',
        url: 'https://city.cybercodefarmer.group/api/crossing/predict/' + id.value,
    }).then(res => {
        predict.value = res.data.data
        // console.log(res.data.data);
    }).catch(() => {

    })
}
const getAnalysis = () => {
    axios({
        method: 'GET',
        url: 'https://city.cybercodefarmer.group/api/crossing/history/' + id.value,
    }).then(res => {
        analysis.value = res.data.data
        // console.log(res.data.data);
    }).catch(() => {

    })
}
getPrediction()
getAnalysis()
</script>

<template>
    <div class="box" v-loading="loading" v-if="id != undefined || ''">
        {{ date }}
        <div class="top">
            <div class="topleft">
                <div class="info">
                    <div class="name">{{ name }}</div>
                    <div class="date">
                        <el-date-picker v-model="date" type="daterange" start-placeholder="起始" end-placeholder="终点"
                            format="YYYY/MM/DD" value-format="YYYY-MM-DD"
                            :default-value="[new Date(2024, 7, 1), new Date(2024, 7, 7)]" style="width: 100px;" />
                    </div>
                </div>
                <div class="pic" ref="chartRef1" style="height: 100%;"></div>
            </div>
            <div class="topright">
                <div class="info">
                    <div class="name">{{ name }}</div>
                </div>
                <div class="pic" ref="chartRef2" style="height: 100%;"></div>
            </div>
        </div>
        <div class="bt">
            <div class="btbox">
                <div class="name">
                    功能菜单
                </div>
                <el-tabs type="border-card">
                    <el-tab-pane label="数据分析" class="info">
                        <div v-html="analysis"></div>
                    </el-tab-pane>
                    <el-tab-pane label="未来预测" class="info">
                        <div v-html="predict"></div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
    <div v-else><el-empty description="请在后台数据参数设置界面进行道路选择">
            <el-button type="primary" @click="router.push(`/backdata`)">点击跳转</el-button>
        </el-empty></div>
</template>

<style scoped>
.box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* height: 100%; */
    width: 100%;
}

.top {
    display: flex;
    justify-content: space-between;
    flex: 0.4;
    min-height: 300px;
    margin-bottom: 10px;

    .topleft,
    .topright {
        flex: 0.45;
        display: flex;
        flex-direction: column;

        .info {
            flex: 0.1;
            display: flex;
            align-items: center;
            flex-wrap: wrap;

            .name {
                font-size: 10px;
                font-weight: bold;
                width: 100px;
                text-wrap: nowrap;
                flex: 0.1;
                margin-right: 20px;
            }

            .date {
                flex: 0.1;
            }
        }

        .pic {
            flex: 0.9;
        }
    }
}

.bt {
    flex: 0.55;

    .btbox {
        margin: 0 auto;
        width: 60%;
        height: 100%;

        .info {
            font-size: 15px;
        }

        .name {
            font-size: 15px;
            font-weight: bold;
        }

        /* border: 1px solid #000; */
    }
}

/* Media query for mobile devices */
@media (max-width: 768px) {
    .top {
        flex-direction: column;

        .topleft,
        .topright {
            flex: 1;
            width: 100%;

            .pic {
                height: 300px;
                /* Adjust the height as needed */
            }
        }
    }

    .bt {
        .btbox {
            width: 100%;
        }
    }

    .box {
        height: 200%;
    }
}
</style>
