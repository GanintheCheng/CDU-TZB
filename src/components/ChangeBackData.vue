<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'
const router = useRouter()

// import { computed } from 'vue';

const region = ref()
</script>

<template>
    <div>
        <div style="margin: 20px" />
        <el-form label-position="top" label-width="auto" style="max-width: 600px">
            <el-form-item label="level">
                <el-select v-model="region" placeholder="道路等级" clearable>
                    <el-option label="1" value="1" />
                    <el-option label="2" value="2" />
                    <el-option label="3" value="3" />
                    <el-option label="4" value="4" />
                    <el-option label="5" value="5" />
                    <el-option label="6" value="6" />
                </el-select>
            </el-form-item>
            <el-form-item label="location">
                <el-input />
            </el-form-item>
            <el-button type="primary" round>提交</el-button>
            <el-button type="danger" round @click="router.push('/backdata')">返回</el-button>
        </el-form>
    </div>
</template>

<style scoped></style>
