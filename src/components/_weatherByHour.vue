<template>
  <div class="weather-by-hour">
    <transition name="fade-in">
      <h2 class="subtitle-xs weather-by-hour__title">Próximas 24 horas</h2>
    </transition>
    <transition-group
      class="weather-by-hour__items-wrap"
      tag="ul"
      name="slide-right"
    >
      <li
        v-for="(hour, i) in weatherByHour"
        :key="i"
        class="weather-by-hour__item"
        :class="{ 'dark-mode-card-bg-color': isDarkMode }"
        :style="{ 'transition-delay': i * 2 + '00ms' }"
      >
        <p class="text-xxs">{{ hour.dt }}</p>
        <div class="weather-by-hour__icon">
          <img
            :src="`/img/weather-status/icons/solid/${
              i === 0 ? currentWeatherIcon : hour.weather[0].icon
            }.png`"
            :alt="hour.weather[0].icon"
            draggable="false"
          />
        </div>
        <p v-if="hour.pop > 20" class="text-xxs text-rain-blue">
          {{ hour.pop }}%
        </p>
        <p class="text-s">{{ hour.temp }}º</p>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "WeatherByHour",
  data() {
    return {
      weatherByHour: [],
      timeZoneOffset: 0,
      isDarkMode: this.$store.state.isDarkMode,
      isNegativeTimeZoneOffset: false,
      defaultTimeOffset: 3600,
      currentWeatherIcon:
        this.$store.state.locationData[0].current.weather[0].icon,
    };
  },
  mounted() {
    this.timeZoneOffset = this.$store.state.locationData[0].timeZoneOffset;
    this.weatherByHour = this.$store.state.locationData[0].hourly.slice(0, 25);
    if (Math.sign(this.timeZoneOffset) === -1) {
      this.timeZoneOffset = Math.abs(this.timeZoneOffset);
      this.timeZoneOffset = this.timeZoneOffset + this.defaultTimeOffset;
      this.isNegativeTimeZoneOffset = true;
    } else {
      this.timeZoneOffset = this.timeZoneOffset - this.defaultTimeOffset * 2;
    }
    this.weatherByHour.forEach((hour) => {
      if (this.isNegativeTimeZoneOffset) {
        hour.dt = hour.dt - this.timeZoneOffset;
      } else {
        hour.dt = hour.dt + this.timeZoneOffset;
      }
      hour.dt = new Date(new Date(hour.dt * 1000)).getHours();
      if (hour.dt < 10) {
        hour.dt = "0" + hour.dt;
      }
      hour.dt = hour.dt + ":00";
      hour.temp = hour.temp.toFixed(0);
      hour.pop = hour.pop.toFixed(1) * 100;
    });
    this.weatherByHour[0].dt = "Ahora";
    this.weatherByHour[0].temp =
      this.$store.state.locationData[0].current.temp.toFixed(0);
  },
};
</script>
