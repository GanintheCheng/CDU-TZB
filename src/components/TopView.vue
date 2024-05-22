<script setup lang="ts">
import { Edit, View as IconView } from '@element-plus/icons-vue'
</script>

<template>
    <div class="top">
        <div class="left">
            <img src="@/static/cdu.png" alt="">
            <div class="text">城市病治理管理平台</div>
        </div>
        <div class="right">
            <el-link type="danger" target="_blank" href="https://computer.cdu.edu.cn/" :icon="Edit">友情连接</el-link>
        </div>
    </div>
</template>

<style scoped>
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
            font-weight: 300;
            color: #000;
            font-size: x-large;
        }
    }
    .right{
        background-color: #a0cfff;
    }
}
</style>
