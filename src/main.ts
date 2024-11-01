import "@/font/font.css";

import 'amfe-flexible'
import { createApp } from "vue";
import { createPinia } from "pinia";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


import App from "./App.vue";
import router from "./router";
import DataVVue3 from '@kjgl77/datav-vue3'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App);
app.use(DataVVue3)


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}


app.use(ElementPlus, { size: "small", zIndex: 3000 });
app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount("#app");
