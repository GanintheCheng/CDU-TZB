<script setup lang="ts">
import axios from 'axios';
import  MapContainner  from '@/components/map/MapContainer.vue'
import { onBeforeMount, ref } from 'vue';
const date = ref(new Date())

const Expedite = ref()
const Congested = ref()
const Blocked = ref()
const Status = ref()
const loading = ref(true)

const getData = () => {
    axios(({
        url: 'http://47.108.190.192:8090/trafficInfoPage',
        method: 'GET',
        params: {
            page: 1,
            pageSize: 30000
        }
    })).then(res => {
        const total = res.data.data.total;
        const records = res.data.data.records;
        let expediteTotal = 0;
        let congestedTotal = 0;
        let blockedTotal = 0;
        let statusTotal = 0;

        for (let i = 0, len = records.length; i < len; i++) {
            const record = records[i];
            expediteTotal += parseFloat(record.expedite);
            congestedTotal += parseFloat(record.congested);
            blockedTotal += parseFloat(record.blocked);
            statusTotal += record.status;
        }

        const expediteAverage = (expediteTotal / total).toFixed(2);
        const congestedAverage = (congestedTotal / total).toFixed(2);
        const blockedAverage = (blockedTotal / total).toFixed(2);
        const statusAverage = (statusTotal / total).toFixed(2);

        Expedite.value = expediteAverage;
        Congested.value = congestedAverage;
        Blocked.value = blockedAverage;
        Status.value = statusAverage;
    }).catch(error => {
        console.log(error);
    }).finally(() => {
        loading.value = false
    })
}
onBeforeMount(() => {
    getData()
})


</script>

<template>
    <div>
        <div class="box" v-loading="loading">
            <div style="margin-bottom: 20px;">
                城市拥堵情况平均值
                <span style="font-size: small;">{{ date.getMonth() + 1 }}月{{ date.getDate() }}日</span>
            </div>
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="grid-content ep-bg-purple">
                        <div class="title">
                            拥堵平均占比:
                        </div>
                        <div class="content">
                            {{ Blocked }}%
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content ep-bg-purple">
                        <div class="title">
                            缓慢平均占比:
                        </div>
                        <div class="content">
                            {{ Congested }}%
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content ep-bg-purple">
                        <div class="title">
                            畅通平均占比:
                        </div>
                        <div class="content">
                            {{ Expedite }}%
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content ep-bg-purple">
                        <div class="title">
                            路况平均值:<span style="font-size: 10px;">1：畅通;2：缓行;3：拥堵</span>
                        </div>

                        <div class="content">
                            {{ Status }}
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="box">
            <div style="margin-bottom: 20px;">
                城市地图
            </div>
            <MapContainner/>
        </div>
    </div>
</template>

<style scoped>
.box {
    background-color: white;
    padding: 20px;
    margin-bottom: 40px;
}

.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
    height: 100px;
    background-color: #d9ecff;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1),
        0 6px 20px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease-in-out;
}

.grid-content:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2),
        0 12px 40px rgba(0, 0, 0, 0.2);
}

.title {
    font-size: larger;
    margin-bottom: 20px;
}

.content {
    font-size: xx-large;
    font-weight: 900;
}
</style>
