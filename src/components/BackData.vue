<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted, onBeforeMount } from 'vue'
import { ElTable } from 'element-plus'
import { useCounterStore } from '@/stores/counter'
import axios from 'axios'
const router = useRouter()
// import { computed } from 'vue';
const change = () => {
    router.push('/changebackdata')
}

const store = useCounterStore()

interface User {
    Name: string
    Level: string
    Positono: string
}

const currentRow = ref()
const singleTableRef = ref<InstanceType<typeof ElTable>>()

const setCurrent = (row?: User) => {
    singleTableRef.value!.setCurrentRow(row)
}
const handleCurrentChange = (val: User | undefined) => {
    currentRow.value = val
    console.log(currentRow.value);

}
const tableData: User[] = store.backData
const handleEdit = (index: number, row: User) => {
    console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
    console.log(index, row)
}
onBeforeMount(() => {
    axios({
        method: 'get',
        url: 'http://47.108.190.192:8090/crossing',

    })
})
onMounted(() => {
    setCurrent(tableData[0])
})

const nowName = ref('null')
</script>

<template>
    <div style="max-width: 800px;">
        当前参数: {{ nowName }}<el-button type="primary" @click="change" style="float: right;">增加</el-button><br /><br />
        <el-table ref="singleTableRef" :data="tableData" highlight-current-row style="width: 100%"
            @current-change="handleCurrentChange">
            <el-table-column type="index" width="50" />
            <el-table-column property="Name" label="name" width="180" />
            <el-table-column property="Level" label="level" width="120" />
            <el-table-column property="Positono" label="position" />
            <el-table-column label="Operations">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)" type="danger">
                        禁用
                    </el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                        Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<style scoped></style>
