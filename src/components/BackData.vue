<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted, onBeforeMount } from 'vue'
import { ElNotification, ElTable, rowProps } from 'element-plus'
import { useCounterStore } from '@/stores/counter'
import axios from 'axios'
import { ro } from 'element-plus/es/locale/index.mjs'
import { ElMessage, ElMessageBox } from 'element-plus'
//点击添加后的切换页面逻辑
const router = useRouter()
// import { computed } from 'vue';
const change = () => {
    router.push('/changebackdata')
}
//store定义
const store = useCounterStore()
//User 类
interface User {
    id: Number,
    name: string,
    level: string,
    position: string,
    forbidden: Number
}
//弹出层 
const openSuccess = (message: string) => {
    ElNotification({
        title: 'Success',
        message: message,
        type: 'success',
    })
}
const openError = (message: string) => {
    ElNotification({
        title: 'Error',
        message: message,
        type: 'error',
    })
}
//显示选中
const currentRow = ref()
const singleTableRef = ref<InstanceType<typeof ElTable>>()
//点击行后的处理逻辑
const setCurrent = (row?: User) => {
    singleTableRef.value!.setCurrentRow(row)
}
const handleCurrentChange = (val: User | undefined) => {
    currentRow.value = val
    console.log(currentRow.value);

}
const tableData = ref(store.backData as User[])
const handleEdit = (index: number, row: User) => {
    let nowForbidden = store.backData[index].forbidden
    axios({
        method: 'put',
        url: 'https://city.cybercodefarmer.group/api/crossing',
        data: {
            id: row.id,
            forbidden: nowForbidden
        },
        headers: {
            'Content-Type': 'application/json' // 设置请求头
        }
    }).then(res => {
        store.backData[index].forbidden = store.backData[index].forbidden === 0 ? 1 : 0;
        tableData.value = store.backData
        if (res.data.code == 1) openSuccess('切换成功')
    }).catch(() => {
        openError('切换失败,请联系管理员')
    })
}
const handleDelete = (index: number, row: User) => {
    axios({
        method: 'DELETE',
        url: `https://city.cybercodefarmer.group/api/crossing/${row.id}`
    }).then(res => {
        if (res.data.code == 1) {
            getData()
            openSuccess('删除成功')
        }
    }).catch(() => {
        openError('删除失败,请联系管理员')
    })
}
//获取数据 
const getData = () => {
    loading.value = true
    axios({
        method: 'get',
        url: 'https://city.cybercodefarmer.group/api/crossing'
    }).then(res => {
        store.backData = res.data.data
        tableData.value = res.data.data
        openSuccess('后台参数加载成功')
    }).catch(error => {
        console.log(error);
        openError('数据加载失败,请联系管理员')
    }).finally(() => {
        loading.value = false
    })
}
onMounted(() => {
    getData()
    // setCurrent(tableData[0])
})

const loading = ref(true)
const isLog = ref(store.isLog)
// const nowName = ref('null')
//弹出
const open = () => {
    ElMessageBox.prompt('请输入密钥', '管理员确认', {
        confirmButtonText: '确认',
        cancelButtonText: '退出'
    })
        .then(({ value }) => {
            if (value == 'lstlst') {
                ElMessage({
                    type: 'success',
                    message: `密码正确`,
                })
                isLog.value = true
                store.isLog = true
            } else {
                ElMessage({
                    type: 'error',
                    message: `密码错误`,
                })
            }
        })
}

</script>

<template>
    <div style="max-width: 1200px;" v-if="isLog">
        参数一览:<el-button type="primary" @click="change" style="float: right;">增加</el-button><br /><br />
        <el-table ref="singleTableRef" :data="tableData" highlight-current-row style="width: 100%"
            @current-change="handleCurrentChange" v-loading="loading">
            <el-table-column type="index" width="50" />
            <el-table-column property="name" label="name" width="180" />
            <el-table-column property="level" label="level" width="120" />
            <el-table-column property="position" label="position" />
            <el-table-column property="region" label="region" />
            <el-table-column property="cityCode" label="cityCode" />
            <el-table-column label="点击切换状态">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)" type="danger"
                        v-if="scope.row.forbidden == 0">
                        当前禁用
                    </el-button>
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)" type="primary" v-else>
                        当前启用
                    </el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                        删除
                    </el-button>
                    <!-- @click="router.push(`/crossinganalysis?id=${scope.row.id}`)" -->
                    <el-button size="small" type="success" :info="scope.row" @click="router.push(`/crossinganalysis?id=${scope.row.id}&&name=${scope.row.name}`)">
                        分析
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div v-else>
        <el-empty description="未登录管理员 无法访问该页面">
            <el-button type="primary" @click="open()">输入密钥</el-button>
        </el-empty>
    </div>
</template>

<style scoped></style>
