<template>
  <div class="weather-by-hour">
    <h2 class="subtitle-xs weather-by-hour__title">Previsión 48 horas</h2>
    <div class="weather-by-hour__items-wrap">
      <div
        class="weather-by-hour__item"
        v-for="(hour, key) in weatherByHour"
        :key="key"
      >
        <p class="text-xxs">{{ hour.dt }}</p>
        <div class="weather-by-hour__icon">

          <img :src="`/img/weather-status/icons/${directory}/${hour.weather[0].icon}.svg`" :alt="hour.weather[0].icon">
        </div>
        <p class="text-xxs">{{ hour.temp }}º</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherByHour",
  data() {
    return {
      weatherByHour: [],
    };
  },
  computed: {
    directory() {
      return "dark";
    },
  },
  mounted() {
    this.weatherByHour = this.$store.state.locationData[0].hourly;
    this.weatherByHour.forEach((hour) => {
      hour.dt = new Date(hour.dt * 1000).getHours();
      if (hour.dt < 10) {
        hour.dt = "0" + hour.dt;
      }
      hour.dt = hour.dt + ":00";
      hour.temp = hour.temp.toFixed(0);
    });
    this.weatherByHour[0].dt = "Ahora";
  },
};
</script>
