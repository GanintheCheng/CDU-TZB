<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

interface Answer {
  text: string;
  count: number;
}

interface Question {
  question: string;
  answers: Answer[];
  totalResponses: number;
}

const loading = ref(true)
const surveyData = ref<Question[]>([])

const processData = (rawData: string) => {
  // 首先将 HTML 标签的 <br> 转换为实际的换行符 \n
  const cleanData = rawData.replace(/<br>/g, '\n')
  
  const sections = cleanData.split(/\d+\./).filter(Boolean)
  return sections.map(section => {
    // 分割问题和答案，使用换行符分割
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

const getPercentage = (count: number, total: number) => {
  return ((count / total) * 100).toFixed(1)
}

const getColorByPercentage = (percentage: number) => {
  // 根据百分比返回不同深度的蓝色
  const baseHue = 210 // 蓝色
  const saturation = 90
  const lightness = Math.max(30, 80 - (percentage * 0.5))
  return `hsl(${baseHue}, ${saturation}%, ${lightness}%)`
}

onMounted(async () => {
  try {
    const response = await axios.get('http://47.108.190.192:8090/api/survey')
    surveyData.value = processData(response.data.data)
    loading.value = false
  } catch (error) {
    console.error('Failed to fetch survey data:', error)
    loading.value = false
  }
})
</script>

<template>
  <div class="survey-container">
    <el-card class="summary-card">
      <template #header>
        <div class="card-header">
          <h1 class="title">调查问卷统计结果</h1>
          <div class="total-responses">
            总计回答: <span class="response-number">{{ totalSurveyResponses }}</span> 份
          </div>
        </div>
      </template>

      <el-skeleton :loading="loading" animated :rows="6">
        <template #default>
          <div class="questions-grid">
            <el-card 
              v-for="(item, index) in surveyData" 
              :key="index" 
              class="question-card"
              shadow="hover"
            >
              <template #header>
                <h2 class="question-title">{{ item.question }}</h2>
              </template>

              <div class="answers-container">
                <div 
                  v-for="(answer, answerIndex) in item.answers" 
                  :key="answerIndex" 
                  class="answer-item"
                >
                  <div class="answer-header">
                    <span class="answer-text">{{ answer.text }}</span>
                    <div class="answer-stats">
                      <span class="answer-count">{{ answer.count }}</span>
                      <span class="answer-percentage">
                        ({{ getPercentage(answer.count, item.totalResponses) }}%)
                      </span>
                    </div>
                  </div>
                  
                  <div class="progress-container">
                    <div 
                      class="progress-bar"
                      :style="{
                        width: `${(answer.count / item.totalResponses) * 100}%`,
                        backgroundColor: getColorByPercentage((answer.count / item.totalResponses) * 100)
                      }"
                    ></div>
                  </div>
                </div>
              </div>

              <div class="question-footer">
                <span class="total-text">总计回答: {{ item.totalResponses }}</span>
              </div>
            </el-card>
          </div>
        </template>
      </el-skeleton>
    </el-card>
  </div>
</template>

<style scoped>
.survey-container {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.summary-card {
  margin-bottom: 24px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 24px;
  color: #303133;
  margin: 0;
}

.total-responses {
  font-size: 16px;
  color: #606266;
}

.response-number {
  font-size: 20px;
  color: #409eff;
  font-weight: bold;
}

.questions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.question-card {
  height: 100%;
}

.question-title {
  font-size: 16px;
  color: #303133;
  margin: 0;
  font-weight: 600;
}

.answers-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.answer-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.answer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.answer-text {
  font-size: 14px;
  color: #606266;
  flex: 1;
}

.answer-stats {
  white-space: nowrap;
  margin-left: 12px;
}

.answer-count {
  font-weight: 600;
  color: #409eff;
}

.answer-percentage {
  color: #909399;
  margin-left: 4px;
}

.progress-container {
  height: 8px;
  background-color: #ebeef5;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  transition: width 0.3s ease;
  border-radius: 4px;
}

.question-footer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #ebeef5;
}

.total-text {
  font-size: 14px;
  color: #909399;
}

@media (max-width: 768px) {
  .survey-container {
    padding: 12px;
  }

  .questions-grid {
    grid-template-columns: 1fr;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>