<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter'
import MyMenu from '@/components/MyMenu.vue'
import TopView from './components/TopView.vue';
import MyFooter from './components/MyFooter.vue';

const store = useCounterStore()

</script>

<template>
  <div class="page">
    <el-container>
      <el-header class="head">
        <TopView></TopView>
      </el-header>
      <el-container>
        <el-aside width="200px" class="menu">
          <MyMenu></MyMenu>
        </el-aside>
        <el-container class="right">
          <el-header class="righttop">{{ store.TopName }}</el-header>
          <el-main>
            <router-view v-slot="{ Component, route }">
              <transition name="Mainfade" mode="out-in">
                <component :is="Component" :key="route.path"></component>
              </transition>
            </router-view>
          </el-main>
          <el-footer>
            <MyFooter />
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
  <!-- <TopView></TopView>
  <MyMenu></MyMenu> -->
</template>

<style>
.Mainfade-enter-from,
.Mainfade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.Mainfade-enter-to,
.Mainfade-leave-from {
  opacity: 1;
}

.Mainfade-enter-active {
  transition: all 0.7s ease;
}

.Mainfade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.6, 0.6, 1);
}

body {
  height: 100%;
}

.right {
  background-color: #f3f4f7;

  .righttop {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

#app {
  height: 100%;
}

.head {
  background-color: #a0cfff;
  border-radius: 10px;
  padding-right: 20px;
}

.menu {
  background-color: white;
}

.el-footer {
  background-color: #909399;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 8px;
}

.el-container {
  height: 100%;
}

.page {
  height: 100%;
  width: 100%;
}

html {
  font-family: 'alibaba';
  height: 100%;
}
</style>
