<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { useCounterStore } from '@/stores/counter'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const store = useCounterStore()
</script>

<template>
  <div>
    <el-row class="tac">
      <el-col :span="12">
        <h5 class="mb-2" style="菜单">菜单选取</h5>
        <el-menu default-active="dashboard" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          :router="true">
          <el-menu-item index="dashboard" @click="store.TopName = '控制台'">
            <el-icon>
              <House />
            </el-icon>
            <span>控制台</span>
          </el-menu-item>
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <Aim />
              </el-icon>
              <span>城市拥堵</span>
            </template>
            <el-menu-item-group title="数据查询">
              <el-menu-item index="nowdata" @click="store.TopName = '实时数据查询'">实时数据查询</el-menu-item>
              <el-menu-item index="backdata" @click="store.TopName = '后台数据参数设置'">后台数据参数设置</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="数据管理">
              <el-menu-item index="backdatamanagement" @click="store.TopName = '后台数据管理'">后台数据管理</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <location />
              </el-icon>
              <span>地图一览</span>
            </template>
            <el-menu-item-group title="待补充">
              <el-menu-item index="2-1">待补充</el-menu-item>
              <el-menu-item index="2-2">待补充</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="待补充">
              <el-menu-item index="2-3">待补充</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="2-4">
              <template #title>待补充</template>
              <el-menu-item index="2-4-1">待补充</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <Finished />
              </el-icon>
              <span>解决方案</span>
            </template>
            <el-menu-item-group title="待补充">
              <el-menu-item index="3-1">待补充</el-menu-item>
              <el-menu-item index="3-2">待补充</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="待补充">
              <el-menu-item index="3-3">待补充</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="3-4">
              <template #title>待补充</template>
              <el-menu-item index="3-4-1">待补充</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="4">
            <el-icon>
              <setting />
            </el-icon>
            <span>全局设置</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
