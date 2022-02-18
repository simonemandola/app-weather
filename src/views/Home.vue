<template>
  <main>
    <background />
    <div class="top-bar">
      <div class="top-bar__wrap">
        <p class="text-xs text-bold">Ten un buen día.</p>
        <button @click.prevent="addToFavorite">
          <i class="icon__favorite"></i>
        </button>
      </div>
    </div>
    <main-weather-result />
    <weather-by-hour />
    <weather-seven-days />
    <bottom-menu />
  </main>
</template>

<script>
// components
import WeatherMainResult from "@/components/_weatherMainResult.vue";
import BackgroundImage from "@/components/_backgroundImage.vue";
import WeatherByHour from "@/components/_weatherByHour.vue";
import BottomMenuFixed from "@/components/_bottomMenuFixed.vue";
import WeatherSevenDays from "@/components/_weatherSevenDays.vue";

export default {
  name: "Home",
  components: {
    mainWeatherResult: WeatherMainResult,
    background: BackgroundImage,
    weatherByHour: WeatherByHour,
    bottomMenu: BottomMenuFixed,
    weatherSevenDays: WeatherSevenDays,
  },
  methods: {
    addToFavorite() {
      console.log("Añadido a favoritos");
    },
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>
