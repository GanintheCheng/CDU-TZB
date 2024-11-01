<script setup lang="ts">
import { Edit, View as IconView } from '@element-plus/icons-vue'
import { useCounterStore } from '@/stores/counter'
import { ref } from 'vue';
import axios from 'axios';
//store定义
const store = useCounterStore()
const num = ref(store.num)
const date = ref(new Date())
const formatDate = (date: any) => {
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\//g, '-');
};

const getTodayData = () => {
    axios({
        url: 'http://47.108.190.192:8090/api/visits'
    }).then((data) => {
        todayData.value = data.data.data
    })
}
const todayData = ref('200')
getTodayData()

import { useRouter } from 'vue-router'
const router = useRouter()
const navigateToDashboard = () => {
    router.push({ path: '/dashboard' });
};
</script>

<template>
    <div class="top">
        <div class="left">
            <img src="@/static/cduLogo.png" alt="">
            <img src="@/static/cdu.png" alt="">
            <img src="@/static/index.png" alt="" @click="navigateToDashboard()">
            <div class="text" @click="navigateToDashboard()">城市交通病治理管理平台</div>
        </div>
        <div class="right" style="color: white;">
            <span style="margin-right: 20px;" class="none">{{ formatDate(date) }}</span>
            <span style="margin-right: 20px;" class="none">今日访问量:{{ todayData }}</span>
            <el-link type="danger" target="_blank" href="https://computer.cdu.edu.cn/" :icon="Edit">友情连接</el-link>
        </div>
    </div>
</template>

<style scoped>
img {
    background-color: rgba(255, 255, 255, 0.8);
    /* 白色半透明背景 */
    padding: 4px;
    /* 添加内边距 */
    border-radius: 5px;
    /* 圆角效果 */
}

.top {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
        display: flex;
        align-items: center;

        img {
            width: 50px;
            height: 50px;
            margin-right: 10px;
        }

        .text {
            font-weight: 900;
            color: white;
            font-size: 15px;
            /* 初始的字体阴影效果 */
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
            /* 可以根据需要调整阴影的偏移量、模糊半径和颜色 */
            transition: text-shadow 0.3s ease;
            /* 平滑过渡效果 */
        }

        .text:hover {
            /* 鼠标悬停时的字体阴影效果 */
            text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5),
                0px 0px 20px rgba(255, 255, 255, 0.5),
                0px 0px 30px rgba(255, 255, 255, 0.5),
                0px 0px 40px rgba(255, 255, 255, 0.5);
            /* 这里使用了多层阴影来创建更丰富的效果，可以根据喜好调整 */
            /* color: #fff; */
            /* 可以改变文字颜色以配合阴影效果 */
        }
    }

    .right {
        background-color: #162a7a;
        text-wrap: nowrap;
    }
}

@media only screen and (max-width: 768px) {
    .none {
        display: none;
    }
}
</style>
