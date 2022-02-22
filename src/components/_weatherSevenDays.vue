<template>
  <div class="weather-seven-days container">
    <div
      v-for="(day, key, i) in weatherByDays"
      :key="i"
      class="weather-seven-days__wrap"
    >
      <p class="text-xs">{{ day.dt }}</p>
      <p class="weather-seven-days__temperature text-xs">{{ day.temp.min }}º</p>
      <p class="weather-seven-days__temperature text-xs">{{ day.temp.max }}º</p>
      <div class="weather-seven-days__image">
        <img src="/img/weather-status/icons/day/02d.png" alt="weather" />
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
    };
  },
  mounted() {
    this.weatherByDays.forEach((day) => {
      day.dt = new Date(day.dt * 1000).toLocaleDateString("es-ES", { weekday: "long" });
      //// console.log(day.dt.toLocaleDateString("es-ES", options));
      //// .toLocaleDateString("es-ES", options);
      // day.temp.min = day.temp.min.toFixed(0);
      // day.temp.max = day.temp.max.toFixed(0);
    });
  },
};
</script>
