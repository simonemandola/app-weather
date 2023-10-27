import { createApp } from "vue";
import VueApexCharts from "vue3-apexcharts";
import Vue3TouchEvents from "vue3-touch-events";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

createApp(App)
  .use(store)
  .use(router)
  .use(VueApexCharts)
  .use(Vue3TouchEvents)
  .mount("#app");
