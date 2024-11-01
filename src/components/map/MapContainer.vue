<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { log } from "console";

declare global {
    interface Window {
        _AMapSecurityConfig?: {
            securityJsCode: string;
        };
    }
}

let map: AMap.Map | null = null;
const positon = ref('待选择')
const temp = [
    { id: 2, name: '万达广场(成都东)', value: '104.103805,30.629259' },
    { id: 3, name: '天府立交(成都南)', value: '104.074102,30.604497' },
    { id: 4, name: '天府四街(成都南)', value: '104.063327,30.548391' },
    { id: 5, name: '中川商贸城(成都西)', value: '103.929771,30.63474' },
    { id: 6, name: '龙湖时代天街(成都西)', value: '103.929673,30.762141' },
    { id: 8, name: '万象城双桥路(成都东)', value: '104.11922,30.653052' },
    { id: 33, name: '北星大道一段(成都北)', value: '104.082841,30.7951' },
    { id: 39, name: '一环路牛市口(成都东)', value: '104.113555,30.644238' },
    { id: 40, name: '一环路磨子桥(成都南)', value: '104.082657,30.639643' },
    { id: 41, name: '三官堂(成都东)', value: '104.101571,30.635351' },
    { id: 42, name: '驷马桥(成都北)', value: '104.098393,30.701422' },
    { id: 43, name: '西南财大光华校区(成都西)', value: '104.027809,30.676482' },
    { id: 44, name: '刃具立交(成都北)', value: '104.108592,30.691371' },
    { id: 46, name: '解放路一段(成都北)', value: '104.096141,30.69766' },
    { id: 47, name: '荷花金池市场(成都北)', value: '104.087867,30.70033' },
    { id: 49, name: '大丰立交(成都北)', value: '104.050748,30.78929' },
    { id: 50, name: '四川省统计局(成都西)', value: '104.028434,30.657893' },
    { id: 51, name: '蜀汉路东(成都西)', value: '104.036859,30.688296' },
    { id: 52, name: '成都中医大省医院(成都西)', value: '104.047051,30.672348' },
    { id: 53, name: '成都紫荆西路(成都西)', value: '104.05603,30.622537' },
    { id: 54, name: '蓟门桥(北三环)', value: '116.360471,39.973668' },
    { id: 55, name: '温榆桥', value: '116.578938,40.041933' }
];


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
                mapStyle: "amap://styles/light", //设置地图的显示样式
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

            //异步加载控件
            AMap.plugin('AMap.ToolBar', function () {
                var toolbar = new AMap.ToolBar(); //缩放工具条实例化
                // var hawkEye = new AMap.HawkEye(); //鹰眼控件实例化
                // var hapType = new AMap.MapType(); //图层切换条实例化
                map.addControl(toolbar); //添加控件
                // map.addControl(hawkEye); //添加控件
                // map.addControl(hapType); //添加控件
            })

            AMap.plugin('AMap.Scale', function () {
                var scale = new AMap.Scale(); //比例尺实例化
                map.addControl(scale); //添加控件
            })

            AMap.plugin('AMap.ControlBar', function () {
                var controlBar = new AMap.ControlBar(); //比例尺实例化
                map.addControl(controlBar); //添加控件
            })

            AMap.plugin('AMap.Geolocation', function () {
                var geolocation = new AMap.Geolocation({
                    position: 'RT'
                });
                map.addControl(geolocation);
            })

            var contextMenu = new AMap.ContextMenu();
            var lnglat = ''
            contextMenu.addItem("添加标记", function (e: any) {
                console.log(lnglat);
                var marker = new AMap.Marker({
                    map: map,
                    position: lnglat, //基点位置
                });
                marker.on('click', () => {
                    console.log(123123);

                })
                map.add(marker);


            }, 0);
            map.on('rightclick', function (e: any) {
                lnglat = e.lnglat
                contextMenu.open(map, e.lnglat);
            });

            for (let i = 0; i < temp.length; i++) {
                const coords = temp[i].value.split(',').map(Number); // 分割字符串并转为数字
                var marker = new AMap.Marker({
                    map: map,
                    position: new AMap.LngLat(coords[0], coords[1]), // 使用 LngLat 对象
                });
                marker.on('click', () => {
                    emit('updateData', temp[i].id + "", temp[i].name);
                });
                map.add(marker);
            }

        })
        .catch((e) => {
            console.log(e);
        });

});


// //异步加载控件
// AMap.plugin('AMap.ToolBar',function(){ 
//   var toolbar = new AMap.ToolBar(); //缩放工具条实例化
//   map.addControl(toolbar); //添加控件
// })

onUnmounted(() => {
    map?.destroy();
});
import { defineEmits } from 'vue';
const emit = defineEmits<{
    (event: 'updateData', data: string, name: string): void;
}>();
</script>

<template>
    <div id="container"></div>
</template>

<style>
#container {
    width: 100%;
    height: 100%;
}

.amap-markers .amap-marker {
    background-color: rgba(135, 207, 235, 0.679);
    width: 50px;
    height: 50px;
    display: flex !important;
    justify-content: center;
    align-items: center;
    border-radius: 90%;
}
</style>