import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }
  const backData = [
    {
      Name: '熊猫基地南门(成都北)',
      Level: '6',
      Positono: '104.114645,30.731263',
    },
    {
      Name: '万达广场(成都东)',
      Level: '6',
      Positono: '104.103805,30.629259',
    },
    {
      Name: '天府立交(成都南)',
      Level: '6',
      Positono: '104.074102,30.604497',
    },
    {
      Name: '天府四街(成都南)',
      Level: '6',
      Positono: '104.063327,30.548391',
    }, {
      Name: '中川商贸城(成都西)',
      Level: '6',
      Positono: '103.929771,30.63474',
    },
    {
      Name: '龙湖时代天街(成都西)',
      Level: '6',
      Positono: '103.929673,30.762141',
    },
    {
      Name: '北部商贸城(成都北)',
      Level: '6',
      Positono: '104.095507,30.795494',
    },
    {
      Name: '万象城双桥路(成都东)',
      Level: '6',
      Positono: '104.11922,30',
    }, 
]
  const TopName = "请选择菜单功能";
  return { count, doubleCount, increment, TopName,backData };
});
