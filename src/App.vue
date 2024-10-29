<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter'
import MyMenu from '@/components/MyMenu.vue'
import TopView from './components/TopView.vue'
import MyFooter from './components/MyFooter.vue'
import { ElDrawer } from 'element-plus'

const store = useCounterStore()
store.num = store.num +1
const isDrawerVisible = ref(false)

import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

watch(() => route.fullPath, (newPath:string, oldPath:string) => {
  if(newPath.includes('/dashboard')){
    store.TopName = '控制台'
  }else if(newPath.includes('/nowdata')){
    store.TopName = '实时数据查询'
  }else if(newPath.includes('/backdata')){
    store.TopName = '后台数据参数设置'
  }else if(newPath.includes('/backdatamanagement')){
    store.TopName = '后台数据管理'
  }else if(newPath.includes('/questionnaire')){
    store.TopName = '调查问卷'
  }else if(newPath.includes('/feedback')){
    store.TopName = '意见反馈'
  }else if(newPath.includes('/crossinganalysis')){
    store.TopName = '路口分析'
  }else if(newPath.includes('/aboutus')){
    store.TopName = '关于我们'
  }
})
</script>

<template>
  <div class="page">
    <el-container>
      <el-header class="head">
        <TopView />
        <!-- Button to toggle menu on mobile -->
        <el-icon class="menu-button" @click="isDrawerVisible = true" :size="30"><Grid /></el-icon>
        <!-- <el-button class="menu-button" @click="isDrawerVisible = true">Menu</el-button> -->
      </el-header>
      <el-container>
        <el-aside class="menu" style="max-width: 200px;">
          <MyMenu />
        </el-aside>
        <el-container class="right">
          <el-header class="righttop">{{ store.TopName }}</el-header>
          <el-main>
            <router-view v-slot="{ Component, route }">
              <transition name="Mainfade" mode="out-in">
                <component :is="Component" :key="route.path" />
              </transition>
            </router-view>
          </el-main>
          <el-footer>
            <MyFooter />
          </el-footer>
        </el-container>
      </el-container>
    </el-container>

    <!-- Drawer for Mobile Menu -->
    <el-drawer
      v-model="isDrawerVisible"
      direction="ltr"
      size="220px"
      :with-header="false"
    >
      <MyMenu />
    </el-drawer>
  </div>
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

.menu-button{
  display: none;
}

/* Media Queries for Mobile Devices */
@media only screen and (max-width: 768px) {
  .menu {
    display: none;
  }

  .menu-button {
    display: block;
    margin-left: auto;
  }

  .head {
    padding-right: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .right {
    padding: 0 10px;
  }

  .righttop {
    font-size: 16px;
    padding: 10px 0;
  }

  .el-footer {
    padding: 10px 0;
  }

  .page {
    padding: 0;
  }
}
</style>
