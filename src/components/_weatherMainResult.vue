<template>
  <router-link :to="{ name: 'WeatherDetails' }" class="main-weather-result">
    <div class="main-weather-result__wrap">
      <div class="main-weather-result__image">
        <img
          :src="
            '/img/weather-status/icons/' +
            weatherData.current.weather[0].icon +
            '.svg'
          "
          alt=""
        />
      </div>
      <div class="main-weather-result__text">
        <h1 class="title-xs text-center">
          {{ weatherData.name }}, <span>{{ weatherData.country }}</span>
        </h1>
        <p class="main-weather-result__temperature text-center">
          {{ weatherData.current.temp }}º
        </p>
        <p class="main-weather-result__state text-s text-center">
          {{ weatherData.current.weather[0].description }}
        </p>
      </div>
    </div>
    <div class="main-weather-result__state-info">
      <p class="text-xs">
        <i class="icon__temp-min"></i>{{ weatherData.daily[0].temp.min }}
      </p>
      <p class="text-xs">
        <i class="icon__temp-max"></i>{{ weatherData.daily[0].temp.max }}
      </p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "WeatherMainResult",
  data() {
    return {
      weatherData: this.$store.state.locationData[0],
    };
  },
  mounted() {
    this.weatherData.current.temp = this.weatherData.current.temp.toFixed(0);
  },
};
</script>
