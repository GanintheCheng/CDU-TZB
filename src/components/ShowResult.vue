<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import axios from 'axios'
import * as echarts from 'echarts'
import WordCloud from './WordCloud.vue' // 引入词云组件

const chartRefs = ref<(HTMLElement | null)[]>([])

interface Answer {
  text: string
  count: number
}

interface Question {
  question: string
  answers: Answer[]
  totalResponses: number
}

const loading = ref(true)
const surveyData = ref<Question[]>([])

const processData = (rawData: string) => {
  const cleanData = rawData.replace(/<br>/g, '\n')

  const sections = cleanData.split(/\d+\./).filter(Boolean)
  return sections.map(section => {
    const lines = section.trim().split('\n').filter(line => line.trim())
    const question = lines[0].trim()

    const processedAnswers = lines.slice(1)
      .filter(answer => answer.includes('被选择的次数是:'))
      .map(answer => {
        const [text, count] = answer.split('被选择的次数是:')
        return {
          text: text.trim(),
          count: parseInt(count.trim())
        }
      })

    const totalResponses = processedAnswers.reduce((sum, answer) => sum + answer.count, 0)

    return {
      question,
      answers: processedAnswers,
      totalResponses
    }
  })
}

const totalSurveyResponses = computed(() => {
  if (surveyData.value.length === 0) return 0
  return surveyData.value[0].totalResponses
})

// 词云数据生成
const generateWordCloudData = (answers: Answer[]) => {
  return answers.map(answer => ({
    name: answer.text,
    value: answer.count
  }))
}

const renderCharts = async () => {
  await nextTick()
  surveyData.value.forEach((question, index) => {
    if (index < surveyData.value.length - 4) {
      // 饼状图逻辑
      if (chartRefs.value[index]) {
        const chartDom = chartRefs.value[index]!
        const chart = echarts.init(chartDom)

        const option = {
          backgroundColor: 'transparent', // 透明背景以融入深蓝色背景
          title: {
            text: question.question,
            left: 'center',
            textStyle: {
              color: '#fff', // 白色文本以提升在深色背景上的可读性
              fontSize: 16,
              fontWeight: 'normal'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
            backgroundColor: 'rgba(50, 50, 50, 0.9)', // 深色工具提示背景
            borderColor: 'rgba(100, 100, 100, 0.5)',
            textStyle: {
              color: '#fff' // 工具提示中的文本为白色
            }
          },
          series: [
            {
              name: '回答分布',
              type: 'pie',
              radius: '60%',
              color: [
                '#3498db', // 柔和的蓝色
                '#2ecc71', // 绿色
                '#e74c3c', // 红色
                '#f39c12', // 橙色
                '#9b59b6', // 紫色
                '#1abc9c'  // 青色
              ],
              data: question.answers.map(answer => ({
                value: answer.count,
                name: `${answer.text} (${answer.count})`
              })),
              label: {
                color: '#fff', // 标签为白色
                fontSize: 12
              },
              labelLine: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.5)' // 柔和的白色线条
                }
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 20,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.7)', // 深色阴影
                  borderColor: 'rgba(255, 255, 255, 0.2)', // 边框为柔和白色
                  borderWidth: 2
                }
              }
            }
          ]
        }


        chart.setOption(option)
      }
    } else {
      // 词云逻辑
      const wordCloudData = generateWordCloudData(question.answers)
      // 这里需要你放置词云的渲染逻辑，可能需要在 WordCloud 组件内完成
    }
  })
}

onMounted(async () => {
  try {
    const response = await axios.get('http://47.108.190.192:8090/api/survey')
    surveyData.value = processData(response.data.data)
    loading.value = false

    // 延迟渲染图表，确保 DOM 已经准备好
    setTimeout(renderCharts, 100)
  } catch (error) {
    console.error('Failed to fetch survey data:', error)
    loading.value = false
  }
})
</script>

<template>
  <div style="height: 100%; overflow: hidden;">
    <dv-border-box-11 title="问卷结果展示" style="width: 100%; height: 100%; position: relative;">
      <div style="position: absolute; top: 60px; bottom: 40px; left: 20px; right: 20px; overflow: auto;">
        <div class="survey-container">
          <el-card class="summary-card">
            <template #header>
              <div class="card-header">
                <div class="total-responses">
                  总计回答: <span class="response-number">{{ totalSurveyResponses }}</span> 份
                </div>
              </div>
            </template>
            <el-skeleton :loading="loading" animated :rows="6">
              <template #default>
                <div class="questions-grid">
                  <el-card v-for="(item, index) in surveyData" :key="index" class="question-card" shadow="hover" style="overflow: visible;">
                    <div v-if="index < surveyData.length - 4">
                      <div ref="chartRefs" class="pie-chart" style="width: 100%; height: 400px;"></div>
                    </div>
                    <div v-else>
                      <h3 class="word-cloud-title">{{ item.question }}</h3>
                      <WordCloud :data="generateWordCloudData(item.answers)" class="word-cloud"
                        style="width: 100%; height: 400px;" />
                    </div>
                  </el-card>
                </div>
              </template>
            </el-skeleton>
          </el-card>
        </div>
      </div>
    </dv-border-box-11>
  </div>
</template>

<style scoped>
.survey-container {
  width: 100%;
  height: 100%;
  background-color: #001f3f;
  /* 深蓝色背景 */
}

.summary-card {
  margin-bottom: 24px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  /* 半透明白色 */
  border-radius: 8px;
}

.card-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.total-responses {
  font-size: 16px;
  color: #ffffff;
  /* 白色文本 */
}

.response-number {
  font-size: 20px;
  color: #1e90ff;
  /* 明亮蓝色 */
  font-weight: bold;
}

.questions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  width: 100%;
}

.question-card {
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  /* 半透明白色 */
  border-radius: 8px;
  color: #ffffff;
  /* 白色文本 */
}

.pie-chart {
  width: 100%;
  height: 400px;
}

.word-cloud {
  width: 100%;
  height: 400px;
}

.word-cloud-title {
  font-size: 20px;
  margin: 16px 0;
  text-align: center;
  color: #ffffff;
  /* 白色文本 */
}

/* 自定义下拉条样式 */
.el-select {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid #1e90ff;
  /* 明亮蓝色边框 */
  border-radius: 4px;
  color: #ffffff;
  /* 白色文本 */
}

.el-select__caret {
  color: #1e90ff;
  /* 明亮蓝色 */
}

@media (max-width: 768px) {
  .questions-grid {
    grid-template-columns: 1fr;
  }
}
</style>
