<template>
  <div class="weather-seven-days">
    <h2 class="subtitle-xs weather-seven-days__title">Previsión 7 días</h2>
    <div
      v-for="(day, i) in weatherByDays"
      :key="i"
      class="weather-seven-days__wrap fade-up"
      :class="{ 'dark-mode-card-bg-color': isNight }"
      :style="{ 'animation-delay': i * 2 + '00ms' }"
    >
      <p class="weather-seven-days__day text-xs">{{ day.dt }}</p>
      <p class="weather-seven-days__temperature text-xs">
        <i class="icon__temp-min"></i>{{ day.temp.min }}º
      </p>
      <p class="weather-seven-days__temperature text-xs">
        {{ day.temp.max }}º<i class="icon__temp-max"></i>
      </p>
      <div class="weather-seven-days__image">
        <img
          :src="`/img/weather-status/icons/${directory}/${day.weather[0].icon}.svg`"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "weatherSevenDays",
  data() {
    return {
      weatherByDays: this.$store.state.locationData[0].daily,
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
    this.weatherByDays.forEach((day) => {
      day.dt = day.dt + this.timeZoneOffset;
      day.dt = new Date(day.dt * 1000).toLocaleDateString("es-ES", {
        weekday: "long",
      });
      this.weatherByDays[0].dt = "Hoy";
      day.temp.min = day.temp.min.toFixed(0);
      day.temp.max = day.temp.max.toFixed(0);
    });
  },
};
</script>
