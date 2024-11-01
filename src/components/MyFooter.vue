<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const navigateToAnalysis = () => {
    router.push({ path: '/aboutus' });
};
</script>

<template>
    <div style="font-size: 20px;" @click="navigateToAnalysis()">designed by @时空因果机理战队</div>
</template>

<style scoped></style>
