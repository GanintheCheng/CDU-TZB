<script setup lang="ts">
import { ref } from 'vue'

// Optional: If you want to make the collapse items expandable
const activeNames = ref(['1'])
</script>

<template>
    <dv-border-box-11 title="关于我们" style="width: 100%; height: 100%; position: relative;">
        <div style="position: absolute; top: 60px; bottom: 40px; left: 20px; right: 20px; overflow: auto;">
            <div class="team-members-container">
                <el-card class="members-card">
                    <template #header>
                        <div class="card-header">
                            <span class="card-title">成员介绍</span>
                        </div>
                    </template>
                    <div class="members-collapse">
                        <el-collapse v-model="activeNames" accordion>
                            <el-collapse-item title="指导老师" name="0">
                                <div class="member-list">
                                    <div class="member-item">
                                        <i class="el-icon-user-solid"></i>
                                        <span>覃艳</span>
                                    </div>
                                    <div class="member-item">
                                        <i class="el-icon-user-solid"></i>
                                        <span>曾宇</span>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="项目学生组长" name="2">
                                <div class="member-list">
                                    <div class="member-item">
                                        <i class="el-icon-user-solid"></i>
                                        <span>软件工程 - 李函</span>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="模型架构" name="3">
                                <div class="member-list">
                                    <div class="member-item">
                                        <i class="el-icon-user-solid"></i>
                                        <span>软件工程 - 王楠</span>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="前端开发组" name="4">
                                <div class="member-list">
                                    <div class="member-item">
                                        <i class="el-icon-user-solid"></i>
                                        <span>软件工程 - 甘在呈</span>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="后端开发组" name="5">
                                <div class="member-list">
                                    <div class="member-item">
                                        <i class="el-icon-user-solid"></i>
                                        <span>软件工程 - 肖國行</span>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="项目企划组" name="6">
                                <div class="member-list">
                                    <div class="member-item">
                                        <i class="el-icon-user-solid"></i>
                                        <span>计算机科学与技术 - 杨珏</span>
                                    </div>
                                    <div class="member-item">
                                        <i class="el-icon-user-solid"></i>
                                        <span>计算机科学与技术 - 邓曦</span>
                                    </div>
                                    <div class="member-item">
                                        <i class="el-icon-user-solid"></i>
                                        <span>计算机科学与技术 - 黄佳凝</span>
                                    </div>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </el-card>
            </div>
        </div>
    </dv-border-box-11>
</template>

<style scoped>
.team-members-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 20px;
}

.members-card {
    width: 100%;
    max-width: 480px;
    background-color: #1b2975; /* 透明背景 */
    border-radius: 8px;
}

.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #1b2975; /* 深色背景 */
    padding: 10px;
    border-radius: 8px 8px 0 0; /* 圆角效果 */
}

.card-title {
    font-size: 18px;
    font-weight: bold;
    color: #fff; /* 白色字体 */
}

.members-collapse {
    margin-top: 10px;
}

.member-list {
    padding: 0 10px;
}

.member-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    color: #fff; /* 白色字体 */
}

.member-item .el-icon-user-solid {
    margin-right: 10px;
    color: #409EFF; /* 保持蓝色图标 */
}

/* 优化深色背景的样式 */
:deep(.el-collapse-item__header) {
    background-color: #040d38; /* 深色背景 */
    color: #fff; /* 白色字体 */
}

:deep(.el-collapse-item__content) {
    background-color: #677cbf; /* 半透明背景 */
    color: #fff; /* 白色字体 */
}

/* 响应式设计 */
@media (max-width: 576px) {
    .members-card {
        max-width: 100%;
        margin: 0 10px;
    }
}
</style>
