<template>
  <div class="weather-by-hour">
    <transition name="fade-in" data-observer-el>
      <h2
        v-show="elementIsIntercepted"
        class="subtitle-xs weather-by-hour__title"
      >
        Previsión 48 horas
      </h2>
    </transition>
    <transition-group
      class="weather-by-hour__items-wrap"
      tag="ul"
      name="slide-right"
      data-observer-el
    >
      <li
        v-show="elementIsIntercepted"
        v-for="(hour, i) in weatherByHour"
        :key="i"
        class="weather-by-hour__item"
        :class="{ 'dark-mode-card-bg-color': isNight }"
        :style="{ 'transition-delay': i * 2 + '00ms' }"
      >
        <p class="text-xxs">{{ hour.dt }}</p>
        <div class="weather-by-hour__icon">
          <img
            :src="`/img/weather-status/icons/${directory}/${hour.weather[0].icon}.svg`"
            :alt="hour.weather[0].icon"
          />
        </div>
        <p class="text-xxs">{{ hour.temp }}º</p>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { observerElement } from "@/mixins/mixins";

export default {
  name: "WeatherByHour",
  mixins: [observerElement],
  data() {
    return {
      weatherByHour: [],
      timeZoneOffset: 0,
      isNight: this.$store.state.isNight,
      elementIsIntercepted: false,
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
