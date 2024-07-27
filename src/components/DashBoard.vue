<script setup lang="ts">
import axios from 'axios';
import MapContainner from '@/components/map/MapContainer.vue'
import { onBeforeMount, ref } from 'vue';
const date = ref(new Date())

const Expedite = ref()
const Congested = ref()
const Blocked = ref()
const Status = ref()
const loading = ref(true)

const formatDate = (date:any) => {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\//g, '-');
};

const getData = () => {
    axios(({
        url: 'https://city.cybercodefarmer.group/api/trafficInfo/average',
        method: 'GET',
        params: {
            beginDate: '2024-05-27',
            endDate: formatDate(date.value),
            beginTime:'11',
            endTime:'18'
        }
    })).then(res => {
        // for (let i = 0, len = records.length; i < len; i++) {
        //     const record = records[i];
        //     expediteTotal += parseFloat(record.expedite);
        //     congestedTotal += parseFloat(record.congested);
        //     blockedTotal += parseFloat(record.blocked);
        //     statusTotal += record.status;
        // }

        // const expediteAverage = (expediteTotal / total).toFixed(2);
        // const congestedAverage = (congestedTotal / total).toFixed(2);
        // const blockedAverage = (blockedTotal / total).toFixed(2);
        // const statusAverage = (statusTotal / total).toFixed(2);

        Expedite.value = res.data.data.expediteAvg;
        Congested.value = res.data.data.congestedAvg;
        Blocked.value = res.data.data.blockedAvg;
        Status.value = res.data.data.statusAvg;
    }).catch(error => {
        console.log(error);
        console.log(12312312312312312);
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
            <div style="margin-bottom: 20px;font-size: 20px;">
                城市拥堵情况平均值
                <span style="font-size: small;">{{ date.getMonth() + 1 }}月{{ date.getDate() }}日</span>
            </div>
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="grid-content ep-bg-purple">
                        <div class="title">
                            拥堵平均占比
                        </div>
                        <div class="content">
                            {{ Blocked }}%
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content ep-bg-purple">
                        <div class="title">
                            缓慢平均占比
                        </div>
                        <div class="content">
                            {{ Congested }}%
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content ep-bg-purple">
                        <div class="title">
                            畅通平均占比
                        </div>
                        <div class="content">
                            {{ Expedite }}%
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content ep-bg-purple">
                        <div class="title">
                            路况值平均值
                            <span style="font-size: 10px;">(路况0:未知,1:畅通,2:缓慢,3:拥堵)</span>
                        </div>

                        <div class="content">
                            {{ Status }}
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="box">
            <div style="margin-bottom: 20px;font-size: 20px;">
                城市地图
            </div>
            <MapContainner />
        </div>
    </div>
</template>

<style scoped>
.box {
    background-color: white;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
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
    font-size: 12px;
    font-weight: bolder;
    margin-bottom: 10px;
}

.content {
    font-size: 18px;
    font-weight: 900;
}
</style>
