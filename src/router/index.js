import { createRouter, createWebHistory } from "vue-router";
import Screensplash from "@/views/Screensplash.vue";
import Home from "@/views/Home.vue";
import WeatherDetails from "@/views/WeatherDetails.vue";
import Favorite from "@/views/Favorite.vue";
import Search from "@/views/Search.vue";
import Settings from "@/views/Settings.vue";

const routes = [
  {
    path: "/",
    name: "Screensplash",
    component: Screensplash,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/weather-details",
    name: "WeatherDetails",
    component: WeatherDetails,
  },
  {
    path: "/favorite",
    name: "Favorite",
    component: Favorite,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
