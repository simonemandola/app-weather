<template>
  <main>
    <main-background />
    <div class="top-bar">
      <div class="top-bar__wrap">
        <p class="text-xs text-bold">Ten un buen día.</p>
        <button @click.prevent="addToFavorite">
          <i class="icon__favorite"></i>
        </button>
      </div>
    </div>
    <main-results />
    <weather-by-hour />
    <weather-seven-days />
    <bottom-menu />
  </main>
</template>

<script>
// components
import WeatherMainResult from "@/components/_weatherMainResult.vue";
import MainBackground from "@/components/_mainBackground.vue";
import WeatherByHour from "@/components/_weatherByHour.vue";
import BottomMenuFixed from "@/components/_bottomMenuFixed.vue";
import WeatherSevenDays from "@/components/_weatherSevenDays.vue";

export default {
  name: "Home",
  components: {
    mainResults: WeatherMainResult,
    mainBackground: MainBackground,
    weatherByHour: WeatherByHour,
    bottomMenu: BottomMenuFixed,
    weatherSevenDays: WeatherSevenDays,
  },
  methods: {
    addToFavorite() {
      console.log("Añadido a favoritos");
    },
  },
  created() {
    window.scrollTo(0, 0);
    if (!window.localStorage.getItem("user-weather-data")) {
      window.localStorage.setItem(
        "user-weather-data",
        JSON.stringify(this.$store.state.locationData[0])
      );
    } else {
      const data = window.localStorage.getItem("user-weather-data");
      this.$store.state.locationData[0] = JSON.parse(data);
    }
  },
};
</script>
