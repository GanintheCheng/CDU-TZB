import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/nowdata",
      component: () => import("@/components/NowData.vue"),
    },
    {
      path: "/backdata",
      component: () => import("@/components/BackData.vue"),
    },
    {
      path: "/backdatamanagement",
      component: () => import("@/components/BackDataManagement.vue"),
    },
    {
      path:"/changebackdata",
      component:()=>import("@/components/ChangeBackData.vue")
    },{
      path:"/dashboard",
      component:()=>import("@/components/DashBoard.vue")
    },
    {
      path:"/",
      redirect:"/dashboard"
    }
  ],
});

export default router;
