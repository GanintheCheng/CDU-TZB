<script setup lang="ts">
import MapContainner from '@/components/map/MapContainer.vue'
import { ElMessage, ElMessageBox, ElNotification, ElTable } from 'element-plus';
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import { useCounterStore } from '@/stores/counter'
// echarts imports
import * as echarts from 'echarts/core';
import axios from 'axios'
import {
    BarChart,
    LineChart
} from 'echarts/charts';
import { LegendComponent } from 'echarts/components';
echarts.use([LegendComponent]);
import { PieChart } from 'echarts/charts';
echarts.use([PieChart]);
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
const navigateToAnalysis = () => {
    router.push({ path: '/crossinganalysis', query: { id: receivedData.value, name: roadName.value } });
};

const navigateToQuestionNaire = () => {
    router.push({ path: '/QuestionNaire' });
};

const navigateToBackdatamanagement = () => {
    router.push({ path: '/backdatamanagement' });
};

const navigateToFeedBack = () => {
    router.push({ path: '/feedback' });
};

const navigateToAi = () => {
    router.push({ path: '/aianswer' });
};

const navigateToResult = () => {
    router.push({ path: '/showresult' });
};

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
const date = ref(new Date())

const store = useCounterStore()
const Expedite = ref()
const Congested = ref()
const Blocked = ref()
const Status = ref()
const loading = ref(true)

const formatDate = (date: any | never) => {
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\//g, '-');
};

const getData = () => {
    axios(({
        url: 'http://47.108.190.192:8090/api/trafficInfo/average',
        method: 'GET',
        params: {
            beginDate: choiceDate.value[0],
            endDate: choiceDate.value[1],
            beginTime: '11',
            endTime: '18'
        }
    })).then(res => {
        config1.value.data[0] = Math.round(res.data.data.expediteAvg);
        config2.value.data[0] = Math.round(res.data.data.congestedAvg);
        config3.value.data[0] = Math.round(res.data.data.blockedAvg);

        Status.value = res.data.data.statusAvg;
        ElNotification({
            title: 'Success',
            message: '加载成功',
            type: 'success',
        });
    }).catch(error => {
        console.log(error);
        console.log(12312312312312312);
    }).finally(() => {
        loading.value = false
    })
}
onBeforeMount(() => {
    getData()
})
onMounted(() => {
    const chartInstance1 = echarts.init(chartRef1.value);
    chartInstance1.setOption(option1.value);

    const chartInstance3 = echarts.init(chartRef3.value);
    chartInstance3.setOption(option3.value);

    const chartInstance4 = echarts.init(chartRef4.value);
    chartInstance4.setOption(option4.value);
})

const choiceDate = ref([
    formatDate(new Date(new Date(date.value).setDate(new Date(date.value).getDate() - 7))), // 减去七天
    formatDate(new Date(date.value)) // 当前日期
]);

const config1 = ref({
    data: [66],
    shape: 'round',
    formatter: '{value}%',
    waveHeight: 20,
    waveNum: 1
})
const config2 = ref({
    data: [66],
    shape: 'round',
    formatter: '{value}%',
    waveHeight: 20,
    waveNum: 1
})
const config3 = ref({
    data: [66],
    shape: 'round',
    formatter: '{value}%',
    waveHeight: 20,
    waveNum: 1
})
const config4 = ref({
    data: [
        {
            name: '车辆数量过多',
            value: 543
        },
        {
            name: '高峰时段',
            value: 456
        },
        {
            name: '交通事故',
            value: 400
        },
        {
            name: '施工区域',
            value: 366
        },
        {
            name: '交通管制',
            value: 280
        },
        {
            name: '天气恶劣',
            value: 145
        },
    ],
    rowNum: 2
})
const chartRef1 = ref(null);
const chartRef2 = ref(null);
const option1 = ref({
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'right',
        textStyle: { color: '#fft' }
    },
    series:
        [
            {
                name: '占比',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 80, name: '畅通' },
                    { value: 6, name: '缓行' },
                    { value: 3, name: '拥堵' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
})

import WordCloud from './WordCloud.vue'

const wordCloudData = [
    { name: '技术', value: 400 },
    { name: '编程', value: 200 },
    { name: 'JavaScript', value: 350 },
    { name: 'Python', value: 450 },
    { name: '数据分析', value: 600 },
    { name: '人工智能', value: 580 },
    { name: "ABAP", value: 447 }, { name: "Scala", value: 442 },
    { name: "Fortran", value: 439 }, { name: "LiveCode", value: 169 },
    { name: "Lisp", value: 409 }, { name: "F#", value: 391 },
    { name: "Rust", value: 356 }, { name: "Kotlin", value: 319 },
    { name: "Ada", value: 316 }, { name: "Logo", value: 261 },
    { name: "SQL", value: 335 }, { name: "RPG", value: 274 },
    { name: "PHP", value: 209 }, { name: "LabVIEW", value: 243 },
    { name: "Haskell", value: 209 }, { name: "Bash", value: 196 },
    { name: "ActionScript", value: 182 }, { name: "Transact-SQL", value: 569 },
    { name: "PowerShell", value: 178 }, { name: "VBScript", value: 203 },
]

const receivedData = ref('2')
const handleUpdateData = (data: string, name: string) => {
    receivedData.value = data;
    roadName.value = name
};
watch(receivedData, () => {
    avaLoading.value = true
    console.log("new=" + receivedData.value);
    getAnalysis()

})
const getAnalysis = async () => {
    try {
        await getAva();
        await getRoad();

        // 检查图表引用是否不为空
        if (chartRef3.value) {
            // 在创建新实例之前先销毁现有的实例
            const chartInstance3 = echarts.getInstanceByDom(chartRef3.value);
            if (chartInstance3) {
                chartInstance3.dispose();
            }
            // 初始化新的图表实例
            const newChartInstance3 = echarts.init(chartRef3.value);
            newChartInstance3.setOption(option3.value);
        }

        if (chartRef4.value) {
            // 在创建新实例之前先销毁现有的实例
            const chartInstance4 = echarts.getInstanceByDom(chartRef4.value);
            if (chartInstance4) {
                chartInstance4.dispose();
            }
            // 初始化新的图表实例
            const newChartInstance4 = echarts.init(chartRef4.value);
            newChartInstance4.setOption(option4.value);
        }
        avaLoading.value = false
    } catch (error) {
        console.error('在 onMounted 中发生错误:', error);
        // 在此添加错误处理逻辑,如显示错误消息给用户
    }
};
const avaLoading = ref(false)
const getAva = async () => {
    const today = new Date(); // 获取今天的日期
    const sevenDaysAgo = new Date(today); // 创建今天日期的副本
    sevenDaysAgo.setDate(today.getDate() - 7); // 设置为七天前的日期
    try {
        const response = await axios({
            method: 'GET',
            url: `http://47.108.190.192:8090/api/report/crossing?beginDate=${formatDate(sevenDaysAgo)}&endDate=${formatDate(today)}&crossingId=${receivedData.value}`,
        });
        response.data.data[0].type = 'bar'
        response.data.data[1].type = 'bar'
        response.data.data[2].type = 'bar'
        option3.value.series[0] = response.data.data[1];
        option3.value.series[1] = response.data.data[2];
        for (let i = 0; i < option1.value.series[0].data.length; i++) {
            if (option3.value.series[0].data[i] > 10 || option3.value.series[1].data[i] > 10) {
                option3.value.yAxis.max = 20
                break
            }
            option3.value.yAxis.max = 10
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
                crossing_id: receivedData.value,
                status: statusValue
            }
        });

        // 处理返回的数据
        option4.value.series[0].data = response.data.data.countList;
        option4.value.xAxis.data = response.data.data.nameList;
        console.log(response.data.data);
        console.log(option4);

        return response.data; // 返回数据，以便在需要时使用
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // 重新抛出错误，以便在调用处处理
    }
};

const chartRef3 = ref(null)
const chartRef4 = ref(null)
const dateArray = ref([]);

const today = new Date(); // 获取今天的日期
for (let i = 6; i >= 0; i--) {
    const previousDate = new Date(today); // 复制今天的日期
    previousDate.setDate(today.getDate() - i); // 减去 i 天
    dateArray.value.push(formatDate(previousDate)); // 格式化并添加到数组
}
const status = ref('')
const option3 = ref({
    title: {
        text: '路口图',
        textStyle: {
            color: '#57bcf4' // 标题颜色为白色
        }
    },
    tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(50, 50, 50, 0.7)', // 设置 tooltip 背景颜色
        borderColor: '#FFFFFF',
        borderWidth: 1,
        formatter: function (params: any) {
            let tooltipHtml = '<strong style="color: #FFFFFF;">' + params[0].axisValueLabel + '</strong><br>';
            params.forEach((param: any) => {
                tooltipHtml +=
                    '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' +
                    param.color +
                    '"></span>' +
                    '<span style="color: #FFFFFF;">' + param.seriesName + ': <strong>' + param.value + '%</strong></span><br>';
            });
            return tooltipHtml;
        }
    },
    legend: {
        data: ['缓行比', '拥堵比'],
        textStyle: {
            color: '#FFFFFF' // 图例文字颜色
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
            color: '#FFFFFF' // x 轴标签颜色
        },
        axisLine: {
            lineStyle: {
                color: '#FFFFFF' // x 轴线颜色
            }
        }
    },
    yAxis: {
        type: 'value',
        max: 10,
        min: 0,
        axisLabel: {
            formatter: '{value}%',
            color: '#FFFFFF' // y 轴标签颜色
        },
        axisLine: {
            lineStyle: {
                color: '#FFFFFF' // y 轴线颜色
            }
        }
    },
    series: [
        {
            name: '缓行比',
            type: 'bar',
            color: '#BAA381', // 保留缓行比的颜色
            data: [6.09, 8.43, 6.81, 2.95, 5.75, 8.26, 6.83, 6.22]
        },
        {
            name: '拥堵比',
            type: 'bar',
            color: '#FF5722', // 使用适合深色背景的颜色
            data: [1.08, 2.18, 1.4, 0.46, 1.25, 2.88, 1.99, 1.42]
        }
    ]
});

const option4 = ref({
    title: {
        text: '畅通路段图',
        textStyle: {
            color: '#57bcf4'
        }
    },
    tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(50, 50, 50, 0.7)', // 设置 tooltip 背景颜色
        borderColor: '#FFFFFF',
        borderWidth: 1,
        formatter: function (params: any) {
            let tooltipHtml = '<strong style="color: #FFFFFF;">' + '状态次数' + '</strong><br>';
            params.forEach((param: any) => {
                tooltipHtml +=
                    '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' +
                    param.color +
                    '"></span>' +
                    '<span style="color: #FFFFFF;">次数: <strong>' + param.value + '</strong></span><br>';
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
            rotate: 45,    // 旋转标签
            color: '#FFFFFF' // 标签颜色为白色
        },
        axisLine: {
            lineStyle: {
                color: '#FFFFFF' // x 轴线颜色
            }
        }
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            color: '#FFFFFF' // y 轴标签颜色
        },
        axisLine: {
            lineStyle: {
                color: '#FFFFFF' // y 轴线颜色
            }
        }
    },
    series: [
        {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'bar',
            color: '#4CAF50' // 使用适合深色背景的颜色
        }
    ]
});

const config5 = ref({
    header: ['名称', '链接'],
    data: [
        ['《交通领域科技创新中长期发展规划纲要（2021—2035年）》', 'https://www.gov.cn/zhengce/zhengceku/2022-04/06/content_5683595.htm',],
        ['交通运输厅推进办督导全省“智慧交通”建设', 'https://www.sc.gov.cn/10462/10464/10465/10574/2015/11/30/10360744.shtml'],
        ['成都市“十四五”新型智慧城市建设规划', 'https://www.chengdu.gov.cn/cdsrmzf/c147315/2023-12/14/19b95675d5804d21a210fdeacea6f671/files/16bd228c1ff8453c940a6c342e990f99.pdf',],
    ],
    rowNum: 2,
    index: true,
    columnWidth: [50],
    align: ['center']
})
const roadName = ref('万达广场(成都东)')
const test = (e) => {
    if (e.columnIndex === 2) {
        const url = e.ceil; // 假设 e.cell 是要打开的 URL
        window.open(url, '_blank'); // 在新标签页中打开
    }
}
</script>

<template>
    <div style="height: 100%; width: 100%; display: flex; justify-content: center;">
        <dv-border-box-11 title="可视化中控大屏" style="width: 100%; height: 100%; position: relative;">
            <!-- 添加一个内容容器，设置padding来避免与边框重叠 -->
            <div style="position: relative; width: 100%; height: 100%; padding: 40px 20px 20px 20px;">
                <div style="display: flex; justify-content: space-around; width: 100%; height: 100%;">
                    <!-- 左侧列 -->
                    <div style="width: 25%; display: flex; flex-direction: column; gap: 15px;" class="left">
                        <!-- HTML部分 -->
                        <dv-border-box-10 style="width: 100%; height: 20%;" v-loading="loading">
                            <div class="white data-container">
                                <div class="today">今日拥堵数据</div>
                                <div class="todayData">
                                    <!-- <div class="todayItems"> -->
                                    <!-- <div class="circle-content">
                                            <div class="percentage">{{ Expedite }}%</div>
                                            <div class="label">畅通比</div>
                                        </div> -->
                                    <!-- <dv-water-level-pond :config="config" style="width: 32%; height: auto; aspect-ratio: 1 / 1;" /> -->

                                    <div style="width: 28%; height: auto; position: relative;">
                                        <dv-water-level-pond :config="config1"
                                            style="width: 100%; height: auto; aspect-ratio: 1 / 1;" />
                                        <div
                                            style="position: absolute; top: 70%; left: 50%; transform: translate(-50%, -50%); font-size: 10px; color: #61c9e7;">
                                            畅通比
                                        </div>
                                    </div>
                                    <!-- </div> -->

                                    <div style="width: 28%; height: auto; position: relative;">
                                        <dv-water-level-pond :config="config2"
                                            style="width: 100%; height: auto; aspect-ratio: 1 / 1;" />
                                        <div
                                            style="position: absolute; top: 70%; left: 50%; transform: translate(-50%, -50%); font-size: 10px; color: #61c9e7;">
                                            缓行比
                                        </div>
                                    </div>

                                    <div style="width: 28%; height: auto; position: relative;">
                                        <dv-water-level-pond :config="config3"
                                            style="width: 100%; height: auto; aspect-ratio: 1 / 1;" />
                                        <div
                                            style="position: absolute; top: 70%; left: 50%; transform: translate(-50%, -50%); font-size: 10px; color: #61c9e7;">
                                            拥堵比
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </dv-border-box-10>

                        <dv-border-box-10 style="width: 100%; height: 46%; padding: 15px;">
                            <!-- 标题 -->
                            <div class="title white"
                                style="font-size: 16px; font-weight: bold;display: flex;justify-content: space-between;align-items: center;">
                                <div>后台数据分析</div>
                                <dv-button @click="navigateToBackdatamanagement()" border="Border2"
                                    color="#4c8045">后台详情数据</dv-button>
                            </div>
                            <div class="white data-container"
                                style="height: 100%; display: flex; flex-direction: column;">
                                <div style="flex: 1; display: flex; flex-direction: column; min-height: 0;">
                                    <!-- 上半部分：数据卡片区域 -->
                                    <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 10px;">
                                        <!-- 数据总量卡片 -->
                                        <dv-border-box-13 style="width: 100%; height: 50px;" class="data-container">
                                            <div
                                                style="height: 100%; width: 100%;;display: flex; align-items: center; justify-content: space-around;">
                                                <dv-decoration-7 style="width: 40%; height: 25px;">
                                                    <span style="font-size: 13px; font-weight: bold;">数据总量</span>
                                                </dv-decoration-7>
                                                <span
                                                    style="font-size: 18px; color: red; font-weight: 900;">35.3w条</span>
                                            </div>
                                        </dv-border-box-13>

                                        <!-- 监测数据卡片区域 -->
                                        <div style="display: flex; height: 50px; gap: 5px;">
                                            <!-- 监测路口卡片 -->
                                            <dv-border-box-8 style="flex: 1;" class="data-container">
                                                <div
                                                    style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 5px;">
                                                    <dv-decoration-7 style="height: 20px;">
                                                        <span style="font-size: 13px; font-weight: bold;">监测路口</span>
                                                    </dv-decoration-7>
                                                    <span style="font-size: 14px; font-weight: 500;">20条</span>
                                                </div>
                                            </dv-border-box-8>

                                            <!-- 监测路段卡片 -->
                                            <dv-border-box-8 style="flex: 1;" class="data-container">
                                                <div
                                                    style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 5px;">
                                                    <dv-decoration-7 style="height: 20px;">
                                                        <span style="font-size: 13px; font-weight: bold;">监测路段</span>
                                                    </dv-decoration-7>
                                                    <span style="font-size: 14px; font-weight: 500;">243条</span>
                                                </div>
                                            </dv-border-box-8>
                                        </div>
                                    </div>

                                    <!-- 下半部分：扇形图分析 -->
                                    <div style="flex: 0.85; min-height: 0;">
                                        <dv-border-box-9 style="width: 100%; height: 100%;">
                                            <div style="height: 100%; display: flex; align-items: center;">
                                                <!-- 左侧扇形图 -->
                                                <div style="flex: 1; height: 100%;" id="pieChart">
                                                    <div ref="chartRef1" style="width:100%;height: 100%;"></div>
                                                </div>
                                            </div>
                                        </dv-border-box-9>
                                    </div>
                                </div>
                            </div>
                        </dv-border-box-10>

                        <dv-border-box-10 style="width: 100%; height: 30%; padding: 15px;">
                            <div class="title white"
                                style="font-size: 16px; font-weight: bold;display: flex;justify-content: space-between;align-items: center;">
                                <div>反馈中心</div>
                                <dv-button @click="navigateToAi()" border="Border3" color="#63cbe4"
                                    font-color="#5a6fc0">Ai问答</dv-button>
                                <dv-decoration2 :reverse="true" style="width:10px;height:20px;" />
                                <dv-button @click="navigateToFeedBack()" border="Border3" color="#63cbe4"
                                    font-color="#5a6fc0">点我反馈</dv-button>
                            </div>
                            <div class="white data-container"
                                style="height: 100%; display: flex; flex-direction: column;justify-content:first baseline;">
                                <dv-border-box-6 style="width: 100%; height: 50px;" class="data-container">
                                    <div
                                        style="height: 100%; display: flex; align-items: center; justify-content: space-between; padding: 0 15px;margin-bottom: 20px;">
                                        <dv-decoration-7 style="width: 40%; height: 25px;">
                                            <span style="font-size: 13px; font-weight: bold;">反馈总量</span>
                                        </dv-decoration-7>
                                        <span style="font-size: 18px; color: red; font-weight: 900;">2302次</span>
                                    </div>
                                    <div>
                                        <dv-scroll-ranking-board :config="config4" style="width:100%;height:60px" />
                                    </div>
                                </dv-border-box-6>
                            </div>
                        </dv-border-box-10>
                    </div>

                    <!-- 中间列 -->
                    <div style="width: 40%; display: flex; flex-direction: column; gap: 15px;padding-top: 30px;">
                        <dv-border-box-10 style="width: 100%; height: 60%;">
                            <MapContainner @updateData="handleUpdateData" />
                        </dv-border-box-10>
                        <div style="display: flex; gap: 15px; height: 40%;">
                            <dv-border-box-10 style="width: 50%; height: 100%;">
                                <div class="white data-container">
                                    <div style="display: flex;justify-content: space-between;align-items: center;">
                                        <div style="font-size: medium;">问卷调查</div>
                                        <dv-button @click="navigateToQuestionNaire()" border="Border4"
                                            color="#a6559d">点我填卷</dv-button>
                                    </div>
                                    <img src="@/static/header01.svg" alt="" style="height: 60%;margin-bottom: 10px;">
                                    <div class="text" style="margin: 0 auto;font-size: large;">匿名回答 我们保证您的信息安全</div>
                                </div>
                            </dv-border-box-10>
                            <dv-border-box-10 style="width: 50%; height: 100%;">
                                <div class="white data-container">
                                    <div style="display: flex;justify-content: space-between;align-items: center;">
                                        <div style="font-size: medium;">问卷词云</div>
                                        <dv-button @click="navigateToResult()" border="Border4"
                                            color="#615ea8">查看结果</dv-button>
                                    </div>
                                    <WordCloud :data="wordCloudData" style="width: 100%;height: 100%;" />
                                </div>
                            </dv-border-box-10>
                        </div>
                    </div>

                    <!-- 右侧列 -->
                    <div style="width: 25%; display: flex; flex-direction: column; gap: 15px;">
                        <dv-border-box-10 style="width: 100%; height: 80%;">
                            <div class="white data-container">
                                <div style="display: flex;justify-content: space-between;align-items: center;">
                                    <div style="font-size: medium;">路口分析:{{ roadName }}</div>
                                    <dv-button @click="navigateToAnalysis()" border="Border4"
                                        color="red">历史与预测</dv-button>
                                </div>
                                <div class="pic" ref="chartRef3" style="height: 100%;" v-loading="avaLoading"></div>
                                <dv-decoration-6 style="width:100%;height:30px;" />
                                <div class="pic" ref="chartRef4" style="height: 100%;" v-loading="avaLoading"></div>
                            </div>
                        </dv-border-box-10>
                        <!-- <dv-border-box-8 style="width: 100%; height: 35%;">
                            <div class="white">123123444</div>
                        </dv-border-box-8> -->
                        <dv-border-box-10 style="width: 100%; height: 20%;">
                            <div class="white" style="margin-left: 4px;">相关文件</div>
                            <dv-scroll-board :config="config5" style="width:100%;height: 100px;" @click="test" />
                        </dv-border-box-10>
                    </div>
                </div>
            </div>
        </dv-border-box-11>
    </div>
</template>

<style>
* {
    box-sizing: border-box;
}

.padding {
    padding: 5px;
}

.white {
    color: white;
}

.data-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 2% 3%;
    box-sizing: border-box;
}

.today {
    height: 20%;
    display: flex;
    align-items: center;
    /* 标题文字大小为容器高度的25% */
    font-size: min(2.5vh, 16px);
}

.todayData {
    height: 80%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 2%;
}

.todayItems {
    position: relative;
    width: 30%;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #afd7f1;
    border-radius: 50%;
    box-sizing: border-box;
}

.circle-content {
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.percentage {
    /* 百分比文字大小为圆圈宽度的25% */
    font-size: min(100%, 16px);
    color: #52b7eb;
    line-height: 1.2;
    margin-bottom: 4%;
}

.label {
    /* 标签文字大小为圆圈宽度的20% */
    font-size: min(100%, 14px);
    line-height: 1.2;
    white-space: nowrap;
}


.dv-border-box-13 .border-box-content {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.dv-border-box-8 .border-box-content {
    display: flex;
    align-items: center;
    justify-content: space-around;
    /* padding-left: 20px; */
    /* padding-right: 20px; */
}
</style>
