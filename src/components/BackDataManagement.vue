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
    endTime?: string;
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
    if (params.endTime !== undefined) {
        queryParams.endTime = params.endTime;
    }

    axios.get('http://47.108.190.192:8090/api/trafficInfo/trafficInfoPage', { params: queryParams })
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
    const url = `http://47.108.190.192:8090/api/trafficInfo?${queryString}`;

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
    <div style="height: 100%; display: flex; flex-direction: column;">
        <dv-border-box-11 title="城市数据中心" style="width: 100%; height: 100%; position: relative;">
            <div style="position: relative; width: 100%; height: 100%; padding: 100px 20px 40px 20px; display: flex; flex-direction: column;">
                <div>
                    <dv-decoration-2 style="width:100%;height:10px;" />
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
                                    <el-option v-for="item in options1" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </div>
                            <div class="item">
                                <span class="label">道路拥堵值:</span>
                                <el-select placeholder="道路拥堵值" size="large" style="width: 130px" v-model="block">
                                    <el-option v-for="item in options2" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </div>
                            <div class="item">
                                <span class="label">时间范围:</span>
                                <div class="block">
                                    <el-date-picker v-model="value1" type="datetimerange" range-separator="To"
                                        start-placeholder="Start date" end-placeholder="End date" size="large"
                                        format="YYYY/MM/DD" value-format="YYYY-MM-DD hh:mm:ss" style="width:210px" />
                                </div>
                            </div>
                            <el-button type="primary" :icon="Search" class="bt" @click="search">查询</el-button>
                            <el-button type="danger" :icon="Delete" class="bt" @click="myDelete"
                                v-if="isLog">批量删除</el-button>
                            <el-button type="primary" :icon="Search" class="bt" @click="open" v-else>登录解锁</el-button>
                        </div>
                        <div class="right"></div>
                    </div>
                    <div v-loading="loading">
                        <el-table ref="multipleTableRef" :data="tableData" style="width: 100%; margin-bottom: 50px;"
                            @selection-change="handleSelectionChange">
                            <el-table-column type="selection" width="55" />
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
                        </el-table>
                    </div>
                    <dv-decoration-2 style="width:100%;height:10px;" />
                    <!-- :page-sizes="[10, 20, 30, 40]" -->
                    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :small="small"
                        :disabled="disabled" :background="background" layout="total, pager, jumper" :total="total"
                        @size-change="handleSizeChange" @current-change="handleCurrentChange" class="big" />
                    <el-pagination background layout="pager" :total="total" pager-count="4"
                        @current-change="handleCurrentChange" class="small" />
                </div>
            </div>
        </dv-border-box-11>
    </div>
</template>

<style scoped>
*{
    box-sizing: border-box;
}
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
        }

        .label {
            margin-right: 8px;
            line-height: 40px;
            font-size: 16px;
            font-weight: bold;
            color: #e1e1ff;
            text-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
        }

        .input {
            width: 100px;
            height: 40px;
        }

        /* 输入框样式 */
        :deep(.el-input__inner) {
            height: 40px;
            line-height: 40px;
            background-color: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            /* color: #ffffff; */
        }

        /* Select 下拉框样式 */
        :deep(.el-select) {
            .el-input__inner {
                background-color: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: #ffffff;
            }
        }

        /* DatePicker 样式 */
        :deep(.el-date-editor) {
            .el-input__inner {
                background-color: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: #ffffff;
            }
        }
    }
}

/* 按钮样式 */
.bt {
    height: 40px;
    width: 80px;
    font-weight: 700;
    color: #ffffff;
    background: rgba(64, 158, 255, 0.8);
    border: none;

    &:hover {
        background: rgba(64, 158, 255, 1);
    }
}

/* 表格样式 */
:deep(.el-table) {
    background-color: rgba(25, 35, 60, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);

    /* 表头样式 */
    .el-table__header-wrapper th {
        background-color: rgba(30, 40, 70, 0.9);
        color: #e1e1ff;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    /* 表格单元格样式 */
    .el-table__body-wrapper td {
        background-color: rgba(25, 35, 60, 0.8);
        color: #ffffff;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    /* 斑马纹样式 */
    .el-table__row--striped td {
        background-color: rgba(35, 45, 70, 0.8);
    }

    /* 鼠标悬停效果 */
    .el-table__body tr:hover>td {
        background-color: rgba(45, 55, 80, 0.9) !important;
    }
}

/* 分页器样式 */
:deep(.el-pagination) {
    justify-content: center;
    background: transparent;

    .el-pagination__total,
    .el-pagination__jump,
    .btn-prev,
    .btn-next {
        color: #e1e1ff;
    }

    .el-pager li {
        background-color: rgba(255, 255, 255, 0.1);
        color: #e1e1ff;

        &.is-active {
            background-color: #409EFF;
            color: #ffffff;
        }

        &:hover {
            background-color: rgba(64, 158, 255, 0.8);
        }
    }
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
