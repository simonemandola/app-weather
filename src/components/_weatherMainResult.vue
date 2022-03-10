<template>
  <div class="main-weather-result">
    <div class="main-weather-result__wrap">
      <div class="main-weather-result__image">
        <img
          :src="`/img/weather-status/icons/${directory}/${weatherData.current.weather[0].icon}.svg`"
          alt=""
        />
      </div>
      <div class="main-weather-result__text">
        <p class="main-weather-result__temperature text-end">
          {{ weatherData.current.temp }}º
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
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherMainResult",
  data() {
    return {
      weatherData: this.$store.state.locationData[0],
    };
  },
  computed: {
    directory() {
      return "dark";
    },
  },
  mounted() {
    this.weatherData.current.temp = this.weatherData.current.temp.toFixed(0);
  },
};
</script>
