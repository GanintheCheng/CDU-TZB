<template>
  <div ref="chartRef" :style="{ width: width, height: height }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-wordcloud'

const props = defineProps({
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '400px'
  },
  data: {
    type: Array,
    default: () => [
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
  }
})

const chartRef = ref(null)
let chartInstance: echarts.ECharts | null = null

const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    const option = {
      // title: {
      //   text: '技术词云图',
      //   left: 'center'
      // },
      tooltip: {
        show: true,
        formatter: function(params) {
          return params.name + ': ' + params.value;
        }
      },
      series: [{
        type: 'wordCloud',
        shape: 'circle',
        left: 'center',
        top: 'center',
        width: '90%',       // 增加宽度利用更多空间
        height: '90%',      // 增加高度利用更多空间
        right: null,
        bottom: null,
        sizeRange: [8, 50], // 减小字体大小范围，使更多词能显示
        rotationRange: [-45, 45], // 减小旋转角度范围，提高可读性
        rotationStep: 15,   // 减小旋转步长
        gridSize: 6,        // 减小网格大小，使词之间可以更紧密
        drawOutOfBound: false,
        layoutAnimation: true, // 启用布局动画
        textStyle: {
          fontFamily: 'sans-serif',
          fontWeight: 'normal', // 改为normal提高辨识度
          color: function() {
            // 使用更柔和的配色
            return 'rgb(' + [
              Math.round(Math.random() * 160 + 60), // 确保颜色不会太暗
              Math.round(Math.random() * 160 + 60),
              Math.round(Math.random() * 160 + 60)
            ].join(',') + ')'
          }
        },
        emphasis: {
          textStyle: {
            fontWeight: 'bold',
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        data: props.data.sort((a, b) => b.value - a.value) // 按值大小排序
      }]
    }
    chartInstance.setOption(option)
  }
}

// 监听窗口大小变化
const handleResize = () => {
  chartInstance?.resize()
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  chartInstance?.dispose()
  window.removeEventListener('resize', handleResize)
})
</script>