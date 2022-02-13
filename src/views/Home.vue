<template>
  <main>
    <background />
    <div class="top-bar container">
      <div class="top-bar__wrap">
        <p class="text-xs text-bold">Ten un buen día.</p>
        <i class="icon__favorite"></i>
      </div>
    </div>
    <main-weather-result />
    <weather-by-hour />
    <bottom-menu />
  </main>
</template>

<script>

// components
import MainWeatherResult from "@/components/_mainWeatherResult.vue";
import BackgroundImage from "@/components/_backgroundImage.vue";
import WeatherByHour from "@/components/_weatherByHour.vue";
import BottomMenuFixed from "@/components/_bottomMenuFixed";

export default {
  name: "Home",
  components: {
    mainWeatherResult: MainWeatherResult,
    background: BackgroundImage,
    weatherByHour: WeatherByHour,
    bottomMenu: BottomMenuFixed,
  },
};
</script>
