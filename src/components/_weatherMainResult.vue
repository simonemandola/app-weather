<template>
  <div class="main-weather-result">
    <div class="main-weather-result__wrap">
      <div class="main-weather-result__image">
        <img
          :src="`/img/weather-status/icons/${directory}/${weatherData.current.weather[0].icon}.svg`"
          alt="current weather forecast"
        />
      </div>
      <div class="main-weather-result__text">
        <p class="main-weather-result__temperature text-end">
          {{ temperature }}º
        </p>
        <p class="main-weather-result__state text-s text-end">
          {{ weatherData.current.weather[0].description }}
        </p>
        <div class="main-weather-result__state-info">
          <p class="text-xs">
            <i class="icon__temp-min"></i>{{ weatherData.daily[0].temp.min }}
          </p>
          <p class="text-xs">
            <i class="icon__temp-max"></i>{{ weatherData.daily[0].temp.max }}
          </p>
        </div>
      </div>
      <weather-alert />
    </div>
  </div>
</template>

<script>
// components
import WeatherAlerts from "@/components/_weatherAlerts.vue";

export default {
  name: "WeatherMainResult",
  components: {
    weatherAlert: WeatherAlerts,
  },
  data() {
    return {
      weatherData: this.$store.state.locationData[0],
      temperature: 0,
    };
  },
  computed: {
    directory() {
      return this.$store.state.isNight ? "dark" : "light";
    },
  },
  mounted() {
    let temp = this.$store.state.locationData[0].current.temp;
    temp = temp.toFixed(0);
    this.temperature = temp;
    this.temperature = this.temperature - 4;
    setInterval(() => {
      if (this.temperature < temp) this.temperature++;
    }, 400);
    // this.weatherData.current.temp = this.weatherData.current.temp.toFixed(0);
  },
};
</script>
