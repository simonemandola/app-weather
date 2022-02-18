<template>
  <router-link
    :to="{ name: 'WeatherDetails' }"
    class="main-weather-result"
  >
    <div class="main-weather-result__wrap">
      <div class="main-weather-result__text">
        <p class="main-weather-result__date text-xs text-grey">Hoy</p>
        <h1 class="text-bold">Valencia</h1>
        <p class="main-weather-result__temperature text-bold">20º</p>
        <p class="main-weather-result__state text-s text-grey">
          Parcialmente soleado.
        </p>
      </div>
      <div class="main-weather-result__image">
        <img src="/img/weather-status/day/cloudy-day.png" alt="" />
      </div>
    </div>
    <div class="main-weather-result__state-info">
      <p class="text-xs text-grey"><i class="icon__wind"></i>10%</p>
      <p class="text-xs text-grey"><i class="icon__humidity"></i>80%</p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "_mainWeatherResult",
};
</script>
