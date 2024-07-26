import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore(
  "counter",
  () => {
    const count = ref(0);
    const doubleCount = computed(() => count.value * 2);
    function increment() {
      count.value++;
    }
    const backData = [
      {
        id: 1,
        name: "熊猫基地南门(成都北)",
        level: "6",
        position: "104.114645,30.731263",
        region: "成都市锦江区",
        cityCode: "510104",
        forbidden: 1,
      },
      {
        id: 2,
        name: "万达广场(成都东)",
        level: "6",
        position: "104.103805,30.629259",
        region: "成都市锦江区",
        cityCode: "510104",
        forbidden: 1,
      },
      {
        id: 3,
        name: "天府立交(成都南)",
        level: "6",
        position: "104.074102,30.604497",
        region: "成都市锦江区",
        cityCode: "510104",
        forbidden: 1,
      },
      {
        id: 4,
        name: "天府四街(成都南)",
        level: "6",
        position: "104.063327,30.548391",
        region: "成都市锦江区",
        cityCode: "510104",
        forbidden: 1,
      },
      {
        id: 5,
        name: "中川商贸城(成都西)",
        level: "6",
        position: "103.929771,30.63474",
        region: "成都市锦江区",
        cityCode: "510104",
        forbidden: 1,
      },
      {
        id: 6,
        name: "龙湖时代天街(成都西)",
        level: "6",
        position: "103.929673,30.762141",
        region: "成都市锦江区",
        cityCode: "510104",
        forbidden: 1,
      },
      {
        id: 7,
        name: "北部商贸城(成都北)",
        level: "6",
        position: "104.095507,30.795494",
        region: "成都市锦江区",
        cityCode: "510104",
        forbidden: 1,
      },
      {
        id: 8,
        name: "万象城双桥路(成都东)",
        level: "6",
        position: "104.11922,30",
        region: "成都市锦江区",
        cityCode: "510104",
        forbidden: 1,
      },
    ];
    const TopName = "控制台";
    const isInput = false;
    const isLog = false;
    return { count, doubleCount, increment, TopName, backData, isInput, isLog };
  },

  {
    persist: true,
  }
);
