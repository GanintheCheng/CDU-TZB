<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Search, Delete } from '@element-plus/icons-vue';
//加载动画
const loading = ref(true)
const status = ref()
const block = ref()
const description = ref()
const options1 = [
    {
        value: '',
        label: '清空'
    },
    {
        value: '0',
        label: '0:未知'
    },
    {
        value: '1',
        label: '1:畅通'
    },
    {
        value: '2',
        label: '2:缓行'
    },
    {
        value: '3',
        label: '3:拥堵'
    }
]
const options2 = [
    {
        value: '',
        label: '清空'
    },
    {
        value: '0-10',
        label: '0-10%',
    },
    {
        value: '10-20',
        label: '10%-20%',
    },
    {
        value: '20-30',
        label: '20%-30%',
    },
    {
        value: '30-40',
        label: '30%-40%',
    },
    {
        value: '40-50',
        label: '40%-50%',
    },
    {
        value: '50-60',
        label: '50%-60%',
    },
    {
        value: '60-70',
        label: '60%-70%',
    },
    {
        value: '70-80',
        label: '70%-80%',
    },
    {
        value: '90-100',
        label: '90%-100%',
    }
]
const name = ref()
import { ElNotification, ElTable } from 'element-plus'
import axios from 'axios';

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

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<records[]>([])
const toggleSelection = (rows?: records[]) => {
    if (rows) {
        rows.forEach((row) => {
            // TODO: improvement typing when refactor table
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            multipleTableRef.value!.toggleRowSelection(row, undefined)
        })
    } else {
        multipleTableRef.value!.clearSelection()
    }
}
const handleSelectionChange = (val: records[]) => {
    multipleSelection.value = val
    console.log(multipleSelection.value)
}
const tableData = ref<records[]>([
    {
        id: 46,
        name: "万象城双桥路(成都东)",
        expedite: "84.31%",
        congested: "13.73%",
        blocked: "1.96%",
        unknown: "0.00%",
        status: 2,
        createTime: "2024-05-22T19:39:03",
        description: "二环高架路：从杉板桥立交到二环高架路入口严重拥堵；水碾河路：从一环路东四段到水碾河南街行驶缓慢；双福二路：从双成二路到二环路东三段行驶缓慢；双林北支路：从二环路东三段到双林北横路行驶缓慢；二环路东三段：双桥子立交桥附近自南向北行驶缓慢。",
        crossingId: 8
    },
    {
        id: 46,
        name: "万象城双桥路(成都东)",
        expedite: "84.31%",
        congested: "13.73%",
        blocked: "1.96%",
        unknown: "0.00%",
        status: 2,
        createTime: "2024-05-22T19:39:03",
        description: "二环高架路：从杉板桥立交到二环高架路入口严重拥堵；水碾河路：从一环路东四段到水碾河南街行驶缓慢；双福二路：从双成二路到二环路东三段行驶缓慢；双林北支路：从二环路东三段到双林北横路行驶缓慢；二环路东三段：双桥子立交桥附近自南向北行驶缓慢。",
        crossingId: 8
    },
    {
        id: 46,
        name: "万象城双桥路(成都东)",
        expedite: "84.31%",
        congested: "13.73%",
        blocked: "1.96%",
        unknown: "0.00%",
        status: 2,
        createTime: "2024-05-22T19:39:03",
        description: "二环高架路：从杉板桥立交到二环高架路入口严重拥堵；水碾河路：从一环路东四段到水碾河南街行驶缓慢；双福二路：从双成二路到二环路东三段行驶缓慢；双林北支路：从二环路东三段到双林北横路行驶缓慢；二环路东三段：双桥子立交桥附近自南向北行驶缓慢。",
        crossingId: 8
    },
    {
        id: 46,
        name: "万象城双桥路(成都东)",
        expedite: "84.31%",
        congested: "13.73%",
        blocked: "1.96%",
        unknown: "0.00%",
        status: 2,
        createTime: "2024-05-22T19:39:03",
        description: "二环高架路：从杉板桥立交到二环高架路入口严重拥堵；水碾河路：从一环路东四段到水碾河南街行驶缓慢；双福二路：从双成二路到二环路东三段行驶缓慢；双林北支路：从二环路东三段到双林北横路行驶缓慢；二环路东三段：双桥子立交桥附近自南向北行驶缓慢。",
        crossingId: 8
    },
    {
        id: 46,
        name: "万象城双桥路(成都东)",
        expedite: "84.31%",
        congested: "13.73%",
        blocked: "1.96%",
        unknown: "0.00%",
        status: 2,
        createTime: "2024-05-22T19:39:03",
        description: "二环高架路：从杉板桥立交到二环高架路入口严重拥堵；水碾河路：从一环路东四段到水碾河南街行驶缓慢；双福二路：从双成二路到二环路东三段行驶缓慢；双林北支路：从二环路东三段到双林北横路行驶缓慢；二环路东三段：双桥子立交桥附近自南向北行驶缓慢。",
        crossingId: 8
    },
    {
        id: 46,
        name: "万象城双桥路(成都东)",
        expedite: "84.31%",
        congested: "13.73%",
        blocked: "1.96%",
        unknown: "0.00%",
        status: 2,
        createTime: "2024-05-22T19:39:03",
        description: "二环高架路：从杉板桥立交到二环高架路入口严重拥堵；水碾河路：从一环路东四段到水碾河南街行驶缓慢；双福二路：从双成二路到二环路东三段行驶缓慢；双林北支路：从二环路东三段到双林北横路行驶缓慢；二环路东三段：双桥子立交桥附近自南向北行驶缓慢。",
        crossingId: 8
    },
    {
        id: 46,
        name: "万象城双桥路(成都东)",
        expedite: "84.31%",
        congested: "13.73%",
        blocked: "1.96%",
        unknown: "0.00%",
        status: 2,
        createTime: "2024-05-22T19:39:03",
        description: "二环高架路：从杉板桥立交到二环高架路入口严重拥堵；水碾河路：从一环路东四段到水碾河南街行驶缓慢；双福二路：从双成二路到二环路东三段行驶缓慢；双林北支路：从二环路东三段到双林北横路行驶缓慢；二环路东三段：双桥子立交桥附近自南向北行驶缓慢。",
        crossingId: 8
    }, {
        id: 46,
        name: "万象城双桥路(成都东)",
        expedite: "84.31%",
        congested: "13.73%",
        blocked: "1.96%",
        unknown: "0.00%",
        status: 2,
        createTime: "2024-05-22T19:39:03",
        description: "二环高架路：从杉板桥立交到二环高架路入口严重拥堵；水碾河路：从一环路东四段到水碾河南街行驶缓慢；双福二路：从双成二路到二环路东三段行驶缓慢；双林北支路：从二环路东三段到双林北横路行驶缓慢；二环路东三段：双桥子立交桥附近自南向北行驶缓慢。",
        crossingId: 8
    },
    {
        id: 46,
        name: "万象城双桥路(成都东)",
        expedite: "84.31%",
        congested: "13.73%",
        blocked: "1.96%",
        unknown: "0.00%",
        status: 2,
        createTime: "2024-05-22T19:39:03",
        description: "二环高架路：从杉板桥立交到二环高架路入口严重拥堵；水碾河路：从一环路东四段到水碾河南街行驶缓慢；双福二路：从双成二路到二环路东三段行驶缓慢；双林北支路：从二环路东三段到双林北横路行驶缓慢；二环路东三段：双桥子立交桥附近自南向北行驶缓慢。",
        crossingId: 8
    },
    {
        id: 46,
        name: "万象城双桥路(成都东)",
        expedite: "84.31%",
        congested: "13.73%",
        blocked: "1.96%",
        unknown: "0.00%",
        status: 2,
        createTime: "2024-05-22T19:39:03",
        description: "二环高架路：从杉板桥立交到二环高架路入口严重拥堵；水碾河路：从一环路东四段到水碾河南街行驶缓慢；双福二路：从双成二路到二环路东三段行驶缓慢；双林北支路：从二环路东三段到双林北横路行驶缓慢；二环路东三段：双桥子立交桥附近自南向北行驶缓慢。",
        crossingId: 8
    },
])

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
    pageSize.value = val
    getData({
        page: currentPage.value,
        pageSize: pageSize.value,
        name: name.value,
        description: description.value,
        status: status.value,
        blocked: block.value
    })
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    currentPage.value = val
    getData({
        page: currentPage.value,
        pageSize: pageSize.value,
        name: name.value,
        description: description.value,
        status: status.value,
        blocked: block.value
    })
}
//弹出层 
const openSuccess = (message: string) => {
    ElNotification({
        title: 'Success',
        message: message,
        type: 'success',
    })
}
const openWarning = (message: string) => {
    ElNotification({
        title: 'Warning',
        message: message,
        type: 'warning',
    })
}
const openError = (message: string) => {
    ElNotification({
        title: 'Error',
        message: '失败,错误码为' + message + ',请联系管理员',
        type: 'error',
    })
}
//请求
interface RequestParams {
    page?: number;
    pageSize?: number;
    name?: string;
    description?: string;
    status?: string;
    blocked?: boolean;
}

const getData = (params: RequestParams) => {
    // const params
    // 创建一个空对象来存储最终请求参数
    const queryParams: { [key: string]: any } = {};
    loading.value = true
    // 动态添加参数
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

    axios(({
        url: 'http://47.108.190.192:8090/trafficInfoPage',
        method: 'GET',
        params: queryParams
    })).then(res => {
        const data = res.data.data.records as records[]
        tableData.value = data
        total.value = res.data.data.total
        openSuccess('后台数据加载成功')
    }).catch(error => {
        openError(error.response.status)
    }).finally(() => {
        loading.value = false
    })
}
onMounted(() => {
    getData({
        page: currentPage.value,
        pageSize: pageSize.value,
        name: name.value,
        description: description.value,
        status: status.value,
        blocked: block.value
    })
})
//条件查询
const search = () => {
    getData({
        page: currentPage.value,
        pageSize: pageSize.value,
        name: name.value,
        description: description.value,
        status: status.value,
        blocked: block.value
    })
}
//删除
const goDelete = () => {
    const ids = multipleSelection.value.map(record => record.id);
    console.log(ids);

    // 拼接URL参数
    const queryString = ids.map(id => `ids=${id}`).join('&');
    const url = `http://47.108.190.192:8090/trafficInfo?${queryString}`;

    axios({
        url: url,
        method: 'DELETE',
    }).then((res) => {
        if (res.data.code === 1) {
            openSuccess('删除成功！');
            getData({
                page: currentPage.value,
                pageSize: pageSize.value,
                name: name.value,
                description: description.value,
                status: status.value,
                blocked: block.value
            })
        } else {
            openError('删除失败！');
        }
    }).catch((error) => {
        openError(error.response.status);
    });
};
const myDelete = () => {
    if (multipleSelection.value.length == 0) {
        openWarning('请检查是否选择了删除内容')
        return
    }
    goDelete()
    // openSuccess('删除成功')
}
//选择日期
const value1 = ref('')
//格式化日期
function formatDate(date: Date): string {
  const pad = (n: number): string => n < 10 ? '0' + n : n.toString();

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // 月份从0开始，所以要加1
  const day = pad(date.getDate());

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
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
                    <span class="label">时间范围</span>
                    <div class="block">
                        <el-date-picker v-model="value1" type="datetimerange" range-separator="To"
                            start-placeholder="Start date" end-placeholder="End date" size="large"
                            style="width:200px" />
                    </div>
                </div>
                <el-button type="primary" :icon="Search" class="bt" @click="search">查询</el-button>
            </div>
            <div class="right">
                <el-button type="danger" :icon="Delete" class="bt" @click="myDelete">批量删除</el-button>
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
            @current-change="handleCurrentChange" style="display: flex;justify-content: center;" />
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

        .item {
            display: flex;
            align-items: center;
            margin-right: 10px;
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
</style>
