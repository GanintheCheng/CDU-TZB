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
            font-weight: 900;
            color: #000;
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
        background-color: #a0cfff;
    }
}
</style>
