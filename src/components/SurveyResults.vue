<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Answer {
  label: string
  count: number
}

interface Question {
  question: string
  answers: Answer[]
}

const loading = ref(true)
const surveyData = ref<Question[]>([])

// 计算百分比
const calculatePercentage = (count: number, total: number): string => {
  return ((count / total) * 100).toFixed(1)
}

// 获取进度条颜色
const getBarColor = (percentage: number): string => {
  if (percentage >= 75) return 'bg-blue-800'
  if (percentage >= 50) return 'bg-blue-600'
  if (percentage >= 25) return 'bg-blue-400'
  return 'bg-blue-200'
}

// 解析问卷数据
const parseResults = (rawText: string): Question[] => {
  const questions: Question[] = []
  const sections = rawText.split(/\d+\./)
  
  sections.forEach(section => {
    if (!section.trim()) return
    
    const lines = section.trim().split('\n').filter(Boolean)
    const question = lines[0].trim()
    const answers = lines.slice(1).map(line => {
      const [label, countStr] = line.split('被选择的次数是:').map(s => s.trim())
      return {
        label,
        count: parseInt(countStr) || 0
      }
    })
    
    if (question && answers.length > 0) {
      questions.push({ question, answers })
    }
  })
  
  return questions
}

// 获取数据
const fetchData = async () => {
  try {
    const response = await axios.get('http://47.108.190.192:8090/api/survey')
    surveyData.value = parseResults(response.data.data)
  } catch (error) {
    console.error('获取数据失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto">
      <el-card class="survey-card">
        <div class="survey-content">
          <h1 class="text-2xl font-bold mb-8">调查问卷结果分析</h1>
          
          <el-skeleton :rows="10" animated v-if="loading" />
          
          <template v-else>
            <div v-for="(item, index) in surveyData" :key="index" class="question-block">
              <h2 class="text-xl font-semibold mb-4">{{ item.question }}</h2>
              
              <div class="answers-container">
                <div v-for="(answer, answerIndex) in item.answers" 
                     :key="answerIndex" 
                     class="answer-item">
                  <div class="answer-header">
                    <span class="answer-label">{{ answer.label }}</span>
                    <span class="answer-count">
                      {{ answer.count }} 
                      ({{ calculatePercentage(
                        answer.count,
                        item.answers.reduce((sum, a) => sum + a.count, 0)
                      ) }}%)
                    </span>
                  </div>
                  
                  <div class="progress-bar-bg">
                    <div class="progress-bar"
                         :class="getBarColor(
                           (answer.count / 
                            item.answers.reduce((sum, a) => sum + a.count, 0)) * 100
                         )"
                         :style="{
                           width: `${(answer.count / 
                                    item.answers.reduce((sum, a) => sum + a.count, 0)) * 100}%`
                         }"
                    />
                  </div>
                </div>
              </div>
              
              <div class="total-responses">
                总回答数: {{ item.answers.reduce((sum, answer) => sum + answer.count, 0) }}
              </div>
            </div>
          </template>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.survey-card {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.survey-content {
  padding: 2rem;
}

.question-block {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.question-block:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.answers-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.answer-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.answer-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
}

.answer-count {
  color: #6b7280;
}

.progress-bar-bg {
  width: 100%;
  height: 0.5rem;
  background-color: #f3f4f6;
  border-radius: 9999px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  transition: width 0.5s ease;
}

.bg-blue-800 {
  background-color: #1e40af;
}

.bg-blue-600 {
  background-color: #2563eb;
}

.bg-blue-400 {
  background-color: #60a5fa;
}

.bg-blue-200 {
  background-color: #bfdbfe;
}

.total-responses {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

@media (max-width: 640px) {
  .survey-content {
    padding: 1rem;
  }
  
  .question-block {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
  }
}
</style>