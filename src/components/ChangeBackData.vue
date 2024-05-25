<script setup lang="ts">
import { reactive, ref } from 'vue';
import MyAxios from '@/axios/MyAxios';
import type { Method } from 'axios';
import axios from 'axios';
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()

// import { computed } from 'vue';

const name = ref('')
const location = ref('')
const forbidden = ref('')
const level = ref('')
//弹窗
const openError1 = () => {
    ElMessage({
        message: '请检查是否有参数未输入',
        type: 'error',
        plain: true,
    })
}
const openError2 = (status: String) => {
    ElMessage({
        message: '添加失败,错误码为' + status + ',请联系管理员',
        type: 'error',
        plain: true,
    })
}

//提交逻辑
const commit = () => {
    //检查是否输入
    if (name.value == '' || location.value == '' || level.value == '' || forbidden.value == '') {
        openError1()
        return
    }
    axios({
        method: 'POST',
        url: 'http://47.108.190.192:8090/crossing',
        params: {
            name: name.value,
            position: location.value,
            level: level.value,
            forbidden: forbidden.value
        }
    }).then(res => {
        if (res.data.code == 1) {
            dialogVisible.value = true
        } else {
            openError2('500')
        }
    }).catch((error: any) => {
        openError2(error.response.status)
    })
}

//对话框
import { ElMessageBox } from 'element-plus'
const dialogVisible = ref(false)
const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            done()
        })
        .catch(() => {
        })
}
const comfirm = () => {
    dialogVisible.value = false
}
const notComfirm = () => {
    router.push('/backdata')
    dialogVisible.value = false
}
</script>

<template>
    <div>
        <div style="margin: 20pxy" />
        <el-form label-position="top" label-width="auto" style="max-width: 600px">
            <el-form-item label="name">
                <el-input placeholder="道路名称" v-model="name" />
            </el-form-item>
            <el-form-item label="location">
                <el-input placeholder="经纬坐标" v-model="location" />
            </el-form-item>
            <el-form-item label="level">
                <el-select v-model="level" placeholder="道路等级" clearable>
                    <el-option label="1" value="1" />
                    <el-option label="2" value="2" />
                    <el-option label="3" value="3" />
                    <el-option label="4" value="4" />
                    <el-option label="5" value="5" />
                    <el-option label="6" value="6" />
                </el-select>
            </el-form-item>
            <el-form-item label="forbidden">
                <el-select v-model="forbidden" placeholder="是否启用" clearable>
                    <el-option label="立刻启用" value="1" />
                    <el-option label="暂不启用" value="0" />
                </el-select>
            </el-form-item>
            <el-button type="primary" round @click="commit">提交</el-button>
            <el-button type="danger" round @click="router.push('/backdata')">返回</el-button>
        </el-form>

        <el-dialog v-model="dialogVisible" title="添加成功" width="500" :before-close="handleClose">
            <span>是否继续添加?</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="notComfirm()">否</el-button>
                    <el-button type="primary" @click="comfirm()">
                        是
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped></style>
