<script setup lang="ts">

</script>

<template>
    <div>
        <el-card style="max-width: 480px">
            <template #header>
                <div class="card-header">
                    <span>成员介绍</span>
                </div>
            </template>
            <div class="demo-collapse">
                <el-collapse>
                    <el-collapse-item title="指导老师" name="1">
                        <div>
                            覃艳
                        </div>
                        <div>
                            曾宇
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="项目学生组长" name="2">
                        <div>
                            软件工程 - 李函
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="前端开发组" name="3">
                        <div>
                            软件工程 - 甘在呈
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="后端开发组" name="4">
                        <div>
                            软件工程 - 王楠
                        </div>
                        <div>
                            软件工程 - 肖國行
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="项目企划组" name="5">
                        <div>
                            计算机科学与技术 - 杨珏
                        </div>
                        <div>
                            计算机科学与技术 - 邓曦
                        </div>
                        <div>
                            计算机科学与技术 - 黄佳凝
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </el-card>

    </div>
</template>

<style scoped></style>
