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
        <h5 class="mb-2" style="text-wrap: nowrap;">菜单选取</h5>
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          :router="true">
          <el-menu-item index="dashboard" @click="store.TopName = '可视化中控大屏'">
            <el-icon>
              <House />
            </el-icon>
            <span>可视化中控大屏</span>
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
              <span>用户数据与反馈</span>
            </template>
            <el-menu-item-group title="数据收集">
              <el-menu-item index="questionnaire" @click="store.TopName = '调查问卷'">调查问卷</el-menu-item>
              <!-- <el-menu-item index="2-2">待补充</el-menu-item> -->
            </el-menu-item-group>
            <el-menu-item-group title="意见反馈">
              <el-menu-item index="feedback" @click="store.TopName = '意见反馈'">意见反馈</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="结果展示">
              <el-menu-item index="showresult" @click="store.TopName = '结果展示'">结果展示</el-menu-item>
            </el-menu-item-group>
            <!-- <el-sub-menu index="2-4">
              <template #title>待补充</template>
              <el-menu-item index="2-4-1">待补充</el-menu-item>
            </el-sub-menu> -->
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <Finished />
              </el-icon>
              <span>解决方案</span>
            </template>
            <el-menu-item-group title="统计">
              <el-menu-item index="crossinganalysis" @click="store.TopName = '路口分析'">路口分析</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="aboutus">
            <el-icon>
              <setting />
            </el-icon>
            <span>关于我们</span>
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
