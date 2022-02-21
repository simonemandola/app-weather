<template>
  <router-link :to="{ name: 'WeatherDetails' }" class="main-weather-result">
    <div class="main-weather-result__wrap">
      <div class="main-weather-result__text">
        <p class="main-weather-result__date text-xs text-grey">Hoy</p>
        <h1 class="text-bold">{{ weatherData?.name }}</h1>
        <p class="main-weather-result__temperature text-bold">
          {{ weatherData.current?.temp }}º
        </p>
        <p class="main-weather-result__state text-s text-grey">
          {{ weatherData.current.weather[0]?.description }}
        </p>
      </div>
      <div class="main-weather-result__image">
        <img src="/img/weather-status/day/cloudy-day.png" alt="" />
      </div>
    </div>
    <div class="main-weather-result__state-info">
      <p class="text-xs text-grey">
        <i class="icon__wind"></i>{{ weatherData.current?.wind_speed }}
      </p>
      <p class="text-xs text-grey">
        <i class="icon__humidity"></i>{{ weatherData.current?.humidity }}
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
    // this.weatherData.current.temp = this.weatherData.current.temp.toFixed(0);
  },
};
</script>
