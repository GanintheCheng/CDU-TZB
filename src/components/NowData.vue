<script setup lang="ts">
import { reactive } from 'vue'

const formInline = reactive({
  user: '',
  region: '',
  date: '',
})

const tableData = [
  {
    data: 'level',
    example: 'Tom',
    note: '指定道路等级，下面各值代表的含义： 1：高速（京藏高速） 2：城市快速路、国道(西三环、103 国道) 3：高速辅路（G6 辅路） 4：主要道路（长安街、三环辅路） 5：一般道路（彩和坊路） 6：无名道路 注：以上值是包含关系，如 5 除自身道路以外还包含 1，2，3，4 的道路',
    compulsory: '是'
  },
  {
    data: 'name',
    example: '建国门外大街',
    note: '道路名称',
    compulsory: '是'
  },
  {
    data: 'city',
    example: '背景',
    note: '由于开发者可能对城市称呼和高德的称呼存在差异（例如开发者称呼为深圳，但高德仅识别深圳市）。故强烈建议使用 adcode，不使用 city字段',
    compulsory: 'city 与 adcode 必填一个'
  },
  {
    data: 'level',
    example: 'Tom',
    note: '由于开发者可能对城市称呼和高德的称呼存在差异（例如开发者称呼为深圳，但高德仅识别深圳市）。 故强烈建议使用 adcode，不使用 city字段 adcode信息可参考城市编码表获取',
    compulsory: 'city 与 adcode 必填一个'
  },
]

const onSubmit = () => {
  console.log('submit!')
}
</script>

<template>
  <div>
    <div class="data">
      <el-row>
        <el-col :span="6">
          <el-statistic title="道路名称" :value="268500" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="畅通所占百分比" :value="268500" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="缓行所占百分比" :value="268500" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="拥堵所占百分比" :value="268500" />
        </el-col><el-col :span="6">
          <el-statistic title="未知路段所占百分比" :value="268500" />
        </el-col><el-col :span="6">
          <el-statistic title="路况" :value="268500" />
        </el-col><el-col :span="6">
          <el-statistic title="平均速度" :value="268500" />
        </el-col><el-col :span="6">
          <el-statistic title="道路坐标集，坐标集合" :value="268500" />
        </el-col>
      </el-row>
    </div>
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="name">
          <el-input v-model="formInline.user" placeholder="道路名称" clearable />
        </el-form-item>
        <el-form-item label="level">
          <el-select v-model="formInline.region" placeholder="道路等级" clearable>
            <el-option label="1" value="1" />
            <el-option label="2" value="2" />
            <el-option label="3" value="3" />
            <el-option label="4" value="4" />
            <el-option label="5" value="5" />
            <el-option label="6" value="6" />
          </el-select>
        </el-form-item>
        <el-form-item label="city">
          <el-input v-model="formInline.user" placeholder="城市名" clearable />
        </el-form-item>
        <el-form-item label="adcode">
          <el-input v-model="formInline.user" placeholder="城市编码" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Query</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      数据详解:<br /><br />
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="data" label="参数" width="180" />
        <el-table-column prop="example" label="例值" width="180" />
        <el-table-column prop="note" width="600" label="备注" />
        <el-table-column prop="compulsory" width="300" label="必选" />
      </el-table>
    </div>
  </div>

</template>

<style scoped>
.data {
  margin-bottom: 50px;
}

.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
