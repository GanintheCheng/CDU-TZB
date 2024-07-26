<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
const res = ref('')
const yes = ref(true)
axios({
    method: 'GET',
    url: 'https://city.cybercodefarmer.group/api/survey',
}).then(re => {
    res.value = re.data.data
    yes.value = !yes.value
}).catch(() => {
    
})

</script>

<template>
    <div>
        <el-card style="max-width: 960px">
            <template #header>
                <div class="card-header">
                    <span>调查问卷结果</span>
                </div>
            </template>
            <div v-html="res" v-loading="yes">

            </div>
        </el-card>
    </div>
</template>

<style scoped></style>