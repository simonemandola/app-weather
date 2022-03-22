<template>
  <div class="weather-by-hour">
    <h2 class="subtitle-xs weather-by-hour__title">Previsión 48 horas</h2>
    <div class="weather-by-hour__items-wrap fade-right">
      <div
        class="weather-by-hour__item"
        :class="{ 'dark-mode-card-bg-color': isNight }"
        v-for="(hour, i) in weatherByHour"
        :key="i"
        :style="{ 'animation-delay': i * 2 + '00ms' }"
      >
        <p class="text-xxs">{{ hour.dt }}</p>
        <div class="weather-by-hour__icon">
          <img
            :src="`/img/weather-status/icons/${directory}/${hour.weather[0].icon}.svg`"
            :alt="hour.weather[0].icon"
          />
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
      timeZoneOffset: 0,
      isNight: this.$store.state.isNight,
    };
  },
  computed: {
    directory() {
      return this.isNight ? "light" : "dark";
    },
  },
  mounted() {
    this.timeZoneOffset = this.$store.state.locationData[0].timeZoneOffset;
    this.weatherByHour = this.$store.state.locationData[0].hourly;
    this.weatherByHour.forEach((hour) => {
      hour.dt = hour.dt + this.timeZoneOffset;
      hour.dt = new Date(new Date(hour.dt * 1000)).getHours();
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
