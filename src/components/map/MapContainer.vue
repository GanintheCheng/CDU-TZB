<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

declare global {
    interface Window {
        _AMapSecurityConfig?: {
            securityJsCode: string;
        };
    }
}

let map: AMap.Map | null = null;

onMounted(() => {
    window._AMapSecurityConfig = {
        securityJsCode: "695968d265f95ab4a1f7443410d70ddf",
    };
    AMapLoader.load({
        key: "ab0c093ff5502bd00ff48c5800aff7a4", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
    })
        .then((AMap) => {
            // map = new AMap.Map("container", {
            //     // 设置地图容器id
            //     pitch: 50, //地图俯仰角度，有效范围 0 度- 83 度
            //     viewMode: '3D', //地图模式
            //     rotateEnable: true, //是否开启地图旋转交互 鼠标右键 + 鼠标画圈移动 或 键盘Ctrl + 鼠标左键画圈移动
            //     pitchEnable: true, //是否开启地图倾斜交互 鼠标右键 + 鼠标上下移动或键盘Ctrl + 鼠标左键上下移动
            //     zoom: 17, //初始化地图层级
            //     rotation: -15, //初始地图顺时针旋转的角度
            //     zooms: [2, 20], //地图显示的缩放级别范围
            //     center: [104.065850, 30.657361], // 初始化地图中心点位置
            // });

            //初始化地图
            var map = new AMap.Map("container", {
                pitch: 50, //地图俯仰角度，有效范围 0 度- 83 度
                viewMode: '3D', //地图模式
                rotateEnable: true, //是否开启地图旋转交互 鼠标右键 + 鼠标画圈移动 或 键盘Ctrl + 鼠标左键画圈移动
                pitchEnable: true, //是否开启地图倾斜交互 鼠标右键 + 鼠标上下移动或键盘Ctrl + 鼠标左键上下移动
                zoom: 17, //初始化地图层级
                rotation: -15, //初始地图顺时针旋转的角度
                zooms: [2, 20], //地图显示的缩放级别范围
                center: [104.065850, 30.657361], // 初始化地图中心点位置
                // zoom: 10, //地图级别
            });
            //创建实施交通图层
            var traffic = new AMap.TileLayer.Traffic({
                autoRefresh: true, //是否自动刷新
                interval: 180, //刷新间隔，默认180s
            });

            // 通过 add 方法将图层添加到地图
            map.add(traffic);
        })
        .catch((e) => {
            console.log(e);
        });
});

onUnmounted(() => {
    map?.destroy();
});
</script>

<template>
    <div id="container"></div>
</template>

<style scoped>
#container {
    width: 100%;
    height: 600px;
}
</style>