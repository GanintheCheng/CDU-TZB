<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import type { MessageItem } from './types'
import { ElMessage } from 'element-plus'
import ai from '@/static/AI.png';
import user from '@/static/user.png';
import axios from 'axios';

// 常量配置
const MAX_MESSAGE_LENGTH = 20 // 最大字数限制

// 聊天记录
const chatMessages = ref<MessageItem[]>([
    {
        role: 'assistant',
        content: '您好！我是AI助手，请问有什么可以帮助您的吗？',
        time: new Date().toLocaleTimeString()
    }
])

// 用户输入
const userInput = ref('')
const inputRef = ref()
const loading = ref(false)
const scrollbarRef = ref() // 添加滚动条引用

// 字数检查
const checkMessageLength = (message: string): boolean => {
    if (message.length > MAX_MESSAGE_LENGTH) {
        ElMessage({
            message: `输入内容超过${MAX_MESSAGE_LENGTH}字限制，请精简后重试`,
            type: 'warning',
            duration: 3000,
            showClose: true
        })
        return false
    }
    return true
}

// 滚动到底部
const scrollToBottom = async () => {
    await nextTick()
    if (scrollbarRef.value) {
        const scrollbar = scrollbarRef.value.$el.querySelector('.el-scrollbar__wrap')
        scrollbar.scrollTop = scrollbar.scrollHeight
    }
}

const answer = ref('')
const getAnswer = async (input) => {
    const trimmedInput = input.trim();
    try {
        const response = await axios.get(`http://47.108.190.192:8090/api/ai/chat?message=${encodeURIComponent(trimmedInput)}`);
        return response.data.data;
    } catch (error) {
        console.error('获取回答失败:', error);
        ElMessage.error('获取回答失败，请稍后重试');
        return null;
    }
}

// 发送消息
const sendMessage = async () => {
    sendNums.value++;
    const trimmedInput = userInput.value.trim();

    if (!trimmedInput) {
        ElMessage.warning('请输入内容');
        return;
    }

    if (!checkMessageLength(trimmedInput)) {
        return;
    }

    // 添加用户消息
    chatMessages.value.push({
        role: 'user',
        content: trimmedInput,
        time: new Date().toLocaleTimeString()
    });

    await scrollToBottom(); // 用户消息后滚动

    loading.value = true;
    userInput.value = ''; // 清空输入框

    try {
        // 获取AI回答
        const aiAnswer = await getAnswer(trimmedInput);
        if (aiAnswer) {
            // 添加AI回复
            chatMessages.value.push({
                role: 'assistant',
                content: aiAnswer,
                time: new Date().toLocaleTimeString()
            });
            await scrollToBottom(); // AI回复后滚动
        }
    } catch (error) {
        ElMessage.error('发送失败，请重试');
    } finally {
        loading.value = false;
    }
}

// 清空对话
const clearChat = () => {
    chatMessages.value = [{
        role: 'assistant',
        content: '您好！我是AI助手，请问有什么可以帮助您的吗？',
        time: new Date().toLocaleTimeString()
    }]
}

const sendNums = ref(1)
// 监听消息变化
watch(() => sendNums.value, async () => {
    setTimeout(() => {
        scrollToBottom();
    }, 0.5)
}, { deep: true });

</script>

<template>
    <div style="height: 100%; display: flex; flex-direction: column;">
        <dv-border-box-11 title="AI智能问答" style="width: 100%; height: 100%; position: relative;">
            <div
                style="position: relative; width: 100%; height: 100%; padding: 60px 20px 40px 20px; display: flex; flex-direction: column;">
                <!-- 对话区域 -->
                <div class="chat-container">
                    <el-scrollbar ref="scrollbarRef" height="500px" class="custom-scrollbar">
                        <div class="messages">
                            <!-- 正常消息显示 -->
                            <div v-for="(message, index) in chatMessages" :key="index"
                                :class="['message', message.role]">
                                <div class="message-content">
                                    <div class="avatar">
                                        <el-avatar :size="40" :src="message.role === 'assistant' ? ai : user"
                                            :icon="message.role === 'assistant' ? 'ChatDots' : 'User'" />
                                    </div>
                                    <div class="content">
                                        <div class="text">{{ message.content }}</div>
                                        <div class="time">{{ message.time }}</div>
                                    </div>
                                </div>
                            </div>

                            <!-- 加载动画 -->
                            <div v-if="loading" class="message assistant">
                                <div class="message-content">
                                    <div class="avatar">
                                        <el-avatar :size="40" :src="ai" icon="ChatDots" />
                                    </div>
                                    <div class="content thinking-content">
                                        <div class="thinking-dots">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>

                <!-- 输入区域 -->
                <div class="input-area">
                    <el-input v-model="userInput" type="textarea" :rows="3" placeholder="请输入您的问题..." ref="inputRef"
                        resize="none" @keyup.enter.prevent="sendMessage" :maxlength="MAX_MESSAGE_LENGTH"
                        show-word-limit />
                    <div class="button-group">
                        <dv-button @click="clearChat()" border="Border3" color="#c8161d" font-color="#e18a3b">
                            清空对话</dv-button>
                        <!-- <el-button type="danger" @click="clearChat">
                            清空对话
                        </el-button> -->
                        <dv-button @click="sendMessage()" border="Border6" color="#e18a3b">发送消息</dv-button>
                        <!-- <el-button type="primary" @click="sendMessage" :loading="loading">
                            发送消息
                        </el-button> -->
                    </div>
                </div>
            </div>
        </dv-border-box-11>
    </div>
</template>


<style scoped>
* {
    box-sizing: border-box;
}

.chat-container {
    flex: 1;
    background-color: rgba(25, 35, 60, 0.8);
    border-radius: 8px;
    margin-bottom: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    /* height: 400px; 固定高度 */
}

/* 自定义滚动条样式 */
:deep(.custom-scrollbar) {
    --el-scrollbar-bg-color: #90a9f5;
    --el-scrollbar-hover-bg-color: #90a9f5;
    --el-scrollbar-width: 6px;

    .el-scrollbar__bar.is-vertical {
        width: var(--el-scrollbar-width);
        right: 2px;
    }

    .el-scrollbar__thumb {
        background-color: var(--el-scrollbar-bg-color);
        border-radius: 3px;

        &:hover {
            background-color: var(--el-scrollbar-hover-bg-color);
        }
    }
}

.messages {
    padding: 20px;
}

.message {
    margin-bottom: 20px;
}

.message-content {
    display: flex;
    gap: 12px;
    max-width: 80%;
}

.message.user {
    display: flex;
    justify-content: flex-end;
}

.message.user .message-content {
    flex-direction: row-reverse;
}

.content {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 12px 16px;
    border-radius: 8px;
    position: relative;
}

.message.assistant .content {
    background-color: rgba(64, 158, 255, 0.1);
}

.text {
    color: #ffffff;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-word;
}

.time {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    margin-top: 4px;
}

.input-area {
    background-color: rgba(25, 35, 60, 0.8);
    border-radius: 8px;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

:deep(.el-textarea__inner) {
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;

    &:focus {
        border-color: #409EFF;
        background-color: rgba(255, 255, 255, 0.15);
    }

    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }
}

/* 字数统计样式 */
:deep(.el-input__count) {
    background: transparent;
    color: rgba(255, 255, 255, 0.7);
}

.button-group {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 12px;
}

:deep(.el-button) {
    &--primary {
        background-color: #409EFF;
        border-color: #409EFF;

        &:hover {
            background-color: #66b1ff;
            border-color: #66b1ff;
        }
    }

    &--danger {
        background-color: rgba(245, 108, 108, 0.8);
        border-color: rgba(245, 108, 108, 0.8);

        &:hover {
            background-color: rgba(245, 108, 108, 1);
            border-color: rgba(245, 108, 108, 1);
        }
    }
}

/* 响应式样式 */
@media (max-width: 768px) {
    .message-content {
        max-width: 90%;
    }

    .input-area {
        padding: 12px;
    }

    .chat-container {
        height: 400px;
        /* 移动端稍微降低高度 */
    }
}


.thinking-content {
    min-width: 60px;
    padding: 12px 20px;
}

.thinking-dots {
    display: flex;
    gap: 4px;
    align-items: center;
    height: 20px;
}

.thinking-dots span {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #409EFF;
    animation: bounce 0.8s infinite;
}

.thinking-dots span:nth-child(2) {
    animation-delay: 0.2s;
}

.thinking-dots span:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-6px);
    }
}

/* 确保消息容器正确显示 */
.messages {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

/* 调整滚动条样式 */
:deep(.custom-scrollbar) {
    overflow-y: auto;

    .el-scrollbar__wrap {
        overflow-x: hidden;
    }
}
</style>