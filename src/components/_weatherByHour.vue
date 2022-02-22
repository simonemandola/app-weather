<template>
  <div class="weather-by-hour">
    <div
      class="weather-by-hour__item"
      v-for="(weatherByHourItem, key) in weatherByHour"
      :key="key"
    >
      <p class="text-xxs">{{ weatherByHourItem.dt }}</p>
      <div class="weather-by-hour__icon">
        <img src="/img/weather-status/icons/day/02d.png" alt="sunny" />
      </div>
      <p class="text-xxs">{{ weatherByHourItem.temp }}º</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherByHour",
  data() {
    return {
      weatherByHour: this.$store.state.locationData[0].hourly,
    };
  },
  mounted() {
    this.weatherByHour.forEach((hour) => {
      hour.dt = new Date(hour.dt * 1000).getUTCHours();
      if (hour.dt < 10) {
        hour.dt = "0" + hour.dt;
      }
      hour.dt = hour.dt + ":00";
      // hour.temp = hour.temp.toFixed(0);
    });
  },
};
</script>
