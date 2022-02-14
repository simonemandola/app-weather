<template>
  <main>
    <background />
    <div class="top-bar container">
      <div class="top-bar__wrap">
        <p class="text-xs text-bold">Ten un buen día.</p>
        <button @click.prevent="addToFavorite">
          <i class="icon__favorite"></i>
        </button>
      </div>
    </div>
    <main-weather-result />
    <router-link class="text-xxs link-more-details" to="Settings"
      >Más detalles</router-link
    >
    <weather-by-hour />
    <weather-seven-days />
    <bottom-menu />
  </main>
</template>

<script>
// components
import MainWeatherResult from "@/components/_mainWeatherResult.vue";
import BackgroundImage from "@/components/_backgroundImage.vue";
import WeatherByHour from "@/components/_weatherByHour.vue";
import BottomMenuFixed from "@/components/_bottomMenuFixed.vue";
import WeatherSevenDays from "@/components/_weatherSevenDays.vue";

export default {
  name: "Home",
  components: {
    mainWeatherResult: MainWeatherResult,
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
};
</script>
