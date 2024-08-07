<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Search, Delete } from '@element-plus/icons-vue';
import { useCounterStore } from '@/stores/counter'
import { ElMessage, ElMessageBox, ElNotification, ElTable } from 'element-plus';
import axios from 'axios';

const store = useCounterStore();
const loading = ref(true);
const status = ref();
const block = ref();
const description = ref();
const name = ref();
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const value1 = ref('');
const isLog = ref(store.isLog);
const tableData = ref([]);
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref([]);
const options1 = [
    { value: '', label: '清空' },
    { value: '0', label: '0:未知' },
    { value: '1', label: '1:畅通' },
    { value: '2', label: '2:缓行' },
    { value: '3', label: '3:拥堵' }
];
const options2 = [
    { value: '', label: '清空' },
    { value: '0-10', label: '0-10%' },
    { value: '10-20', label: '10%-20%' },
    { value: '20-30', label: '20%-30%' },
    { value: '30-40', label: '30%-40%' },
    { value: '40-50', label: '40%-50%' },
    { value: '50-60', label: '50%-60%' },
    { value: '60-70', label: '60%-70%' },
    { value: '70-80', label: '70%-80%' },
    { value: '90-100', label: '90%-100%' }
];

interface records {
    blocked: string;
    congested: string;
    createTime: string;
    crossingId: number;
    description: string;
    expedite: string;
    id: number;
    name: string;
    status: number;
    unknown: string;
}

const toggleSelection = (rows?: records[]) => {
    if (rows) {
        rows.forEach((row) => {
            multipleTableRef.value!.toggleRowSelection(row, undefined);
        });
    } else {
        multipleTableRef.value!.clearSelection();
    }
};

const handleSelectionChange = (val: records[]) => {
    multipleSelection.value = val;
    console.log(multipleSelection.value);
};

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`);
    pageSize.value = val;
    search();
};

const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`);
    currentPage.value = val;
    search();
};

const openSuccess = (message: string) => {
    ElNotification({
        title: 'Success',
        message: message,
        type: 'success',
    });
};

const openWarning = (message: string) => {
    ElNotification({
        title: 'Warning',
        message: message,
        type: 'warning',
    });
};

const openError = (message: string) => {
    ElNotification({
        title: 'Error',
        message: '失败,错误码为' + message + ',请联系管理员',
        type: 'error',
    });
};

interface RequestParams {
    page?: number;
    pageSize?: number;
    name?: string;
    description?: string;
    status?: string;
    blocked?: boolean;
    beginTime?: string;
}

const getData = (params: RequestParams) => {
    const queryParams: { [key: string]: any } = {};
    loading.value = true;

    if (params.page !== undefined) {
        queryParams.page = params.page;
    }
    if (params.pageSize !== undefined) {
        queryParams.pageSize = params.pageSize;
    }
    if (params.name !== undefined) {
        queryParams.name = params.name;
    }
    if (params.description !== undefined) {
        queryParams.description = params.description;
    }
    if (params.status !== undefined) {
        queryParams.status = params.status;
    }
    if (params.blocked !== undefined) {
        queryParams.blocked = params.blocked;
    }
    if (params.beginTime !== undefined) {
        queryParams.beginTime = params.beginTime;
    }

    axios.get('https://city.cybercodefarmer.group/api/trafficInfo/trafficInfoPage', { params: queryParams })
        .then(res => {
            tableData.value = res.data.data.records as records[];
            total.value = res.data.data.total;
            openSuccess('后台数据加载成功');
        })
        .catch(error => {
            openError(error.response.status);
        })
        .finally(() => {
            loading.value = false;
        });
};

const search = () => {
    // 检查 value1.value 是否为有效的数组并且有两个元素
    const beginTime = (Array.isArray(value1.value) && value1.value.length > 0) ? value1.value[0] : undefined;
    const endTime = (Array.isArray(value1.value) && value1.value.length > 1) ? value1.value[1] : undefined;

    // 调用 getData 方法时使用这些安全检查后的值
    getData({
        page: currentPage.value,
        pageSize: pageSize.value,
        name: name.value,
        description: description.value,
        status: status.value,
        blocked: block.value,
        beginTime: beginTime,
        endTime: endTime,
    });

    // 打印 value1.value 进行调试
    console.log(value1.value);
};


const goDelete = () => {
    const ids = multipleSelection.value.map(record => record.id);
    const queryString = ids.map(id => `ids=${id}`).join('&');
    const url = `https://city.cybercodefarmer.group/api/trafficInfo?${queryString}`;

    axios.delete(url)
        .then(res => {
            if (res.data.code === 1) {
                openSuccess('删除成功！');
                search();
            } else {
                openError('删除失败！');
            }
        })
        .catch(error => {
            openError(error.response.status);
        });
};

const myDelete = () => {
    if (multipleSelection.value.length == 0) {
        openWarning('请检查是否选择了删除内容');
        return;
    }
    goDelete();
};


onMounted(() => {
    search();
});
</script>


<template>
    <div>
        <div class="inputs">
            <div class="left">
                <div class="item">
                    <span class="label">道路名称:</span>
                    <el-input class="input" v-model="name" placeholder="输入道路名称" clearable />
                </div>
                <div class="item">
                    <span class="label">道路描述:</span>
                    <el-input class="input" v-model="description" placeholder="输入自定义描述查询" clearable />
                </div>
                <div class="item">
                    <span class="label">道路状态:</span>
                    <el-select placeholder="道路状态" size="large" style="width: 130px" v-model="status">
                        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </div>
                <div class="item">
                    <span class="label">道路拥堵值:</span>
                    <el-select placeholder="道路拥堵值" size="large" style="width: 130px" v-model="block">
                        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </div>
                <div class="item">
                    <span class="label">时间范围:</span>
                    <div class="block">
                        <el-date-picker v-model="value1" type="datetimerange" range-separator="To"
                            start-placeholder="Start date" end-placeholder="End date" size="large" format="YYYY/MM/DD"
                            value-format="YYYY-MM-DD hh:mm:ss" style="width:180px" />
                    </div>
                </div>
                <el-button type="primary" :icon="Search" class="bt" @click="search">查询</el-button>
                <el-button type="danger" :icon="Delete" class="bt" @click="myDelete" v-if="isLog">批量删除</el-button>
                <el-button type="primary" :icon="Search" class="bt" @click="open" v-else>登录解锁</el-button>
            </div>
            <div class="right">

            </div>
        </div>
        <div v-loading="loading"><el-table ref="multipleTableRef" :data="tableData"
                style="width: 100%;margin-bottom: 50px;" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <!-- <el-table-column label="Date" width="120">
                <template #default="scope">{{ scope.row.date }}</template>
</el-table-column> -->
                <el-table-column property="id" label="Id" width="80" />
                <el-table-column property="name" label="Name" width="160" />
                <el-table-column property="expedite" label="畅通比" width="80" show-overflow-tooltip />
                <el-table-column property="congested" label="缓行比" width="80" show-overflow-tooltip />
                <el-table-column property="blocked" label="拥堵比" width="80" show-overflow-tooltip />
                <el-table-column property="unknown" label="未知路段比" width="80" show-overflow-tooltip />
                <el-table-column property="status" label="路况" width="80" show-overflow-tooltip />
                <el-table-column property="weather" label="天气" width="160" show-overflow-tooltip />
                <el-table-column property="createTime" label="创建时间" width="160" show-overflow-tooltip />
                <el-table-column property="description" label="路况描述" show-overflow-tooltip />
                <!-- <el-table-column property="crossingId" label="CrossingId" width="80" show-overflow-tooltip /> -->

            </el-table></div>

        <!-- <div style="margin-top: 20px">
            <el-button @click="toggleSelection([tableData[1], tableData[2]])">
                Toggle selection status of second and third rows
            </el-button>
            <el-button @click="toggleSelection()">Clear selection</el-button>
        </div> -->
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
            :small="small" :disabled="disabled" :background="background"
            layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" class="big" />
        <el-pagination background layout="pager" :total="total" pager-count="4" @current-change="handleCurrentChange"
            class="small" />
    </div>

</template>

<style scoped>
.inputs {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;

    .left {
        display: flex;
        width: 100%;
        flex-wrap: wrap;

        .item {
            display: flex;
            align-items: center;
            margin-right: 10px;
            margin-bottom: 10px;
            /* 垂直对齐中心 */
        }

        .label {
            margin-right: 8px;
            /* 与输入框的间距 */
            line-height: 40px;
            /* 设置与输入框高度一致 */
            font-size: 16px;
            /* 确保字体大小一致 */
        }

        .input {
            width: 100px;
            height: 40px;
        }

        .el-input__inner {
            height: 40px;
            /* 设定输入框高度 */
            line-height: 40px;
            /* 确保输入框内文字垂直居中 */
        }
    }
}

.bt {
    height: 40px;
    width: 80px;
    font-weight: 700;
}

.el-pagination {
    justify-content: center;
}

.big {
    display: flex;
}

.small {
    display: none;
}

@media only screen and (max-width: 768px) {
    .el-pagination {
        justify-content: left;
        flex-wrap: wrap;
    }

    .big {
        display: none;
    }

    .small {
        display: flex;
    }

}
</style>
