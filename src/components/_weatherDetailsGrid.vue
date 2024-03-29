<template>
  <div class="weather-details-grid">
    <h2 class="subtitle-xs weather-seven-days__title">Más detalles</h2>
    <div
      class="weather-details-grid__sun"
      :class="{ 'dark-mode-card-bg-color': isDarkMode }"
      :style="sunSectionHeight"
    >
      <div class="weather-details-grid__sun-icon">
        <h3 class="text-xxs sunrise-text">Amanecer</h3>
        <i class="icon__sunrise"></i>
        <p class="text-xxs text-center">
          {{ sunriseHour }}:{{ sunriseMinutes }}
        </p>
      </div>
      <div
        class="weather-details-grid__sun-arc-cont"
        :class="{ 'dark-mode-card-bg-color': isDarkMode }"
        ref="sun-arc-cont"
      >
        <div
          class="weather-details-grid__sun-arc-line"
          :style="{ '--degrees': sunDegreesRotation, '--scale': sunScale }"
        ></div>
      </div>
      <div class="weather-details-grid__sun-icon">
        <h3 class="text-xxs sunset-text">Puesta de sol</h3>
        <i class="icon__sunset"></i>
        <p class="text-xxs text-center">{{ sunsetHour }}:{{ sunsetMinutes }}</p>
      </div>
    </div>
    <div class="weather-details-grid__row">
      <div
        class="weather-details-grid__row-item"
        :class="{ 'dark-mode-card-bg-color': isDarkMode }"
        ref="item-row"
        :style="`--height-item-row: ${itemRowWidth}`"
      >
        <h3 class="text-xxs">Percepción humana</h3>
        <i class="icon__thermometer"></i>
        <p class="text-m text-center">{{ feelsLikeToFixed }}º</p>
      </div>
      <div
        class="weather-details-grid__row-item"
        :class="{ 'dark-mode-card-bg-color': isDarkMode }"
      >
        <h3 class="text-xxs">Presión</h3>
        <i class="icon__pressure"></i>
        <p class="text-m text-center">{{ pressure }}hPa</p>
      </div>
    </div>
    <div class="weather-details-grid__row">
      <div
        class="weather-details-grid__row-item"
        :class="{ 'dark-mode-card-bg-color': isDarkMode }"
        :style="`--height-item-row: ${itemRowWidth}`"
      >
        <h3 class="text-xxs">Humedad</h3>
        <i class="icon__humidity"></i>
        <p class="text-m text-center">{{ humidity }}%</p>
      </div>
      <div
        class="weather-details-grid__row-item"
        :class="{ 'dark-mode-card-bg-color': isDarkMode }"
      >
        <h3 class="text-xxs">Nubes</h3>
        <i class="icon__cloudiness size-icon-cloud"></i>
        <p class="text-m text-center">{{ cloudiness }}%</p>
      </div>
    </div>
    <div class="weather-details-grid__row">
      <div
        class="weather-details-grid__row-item"
        :class="{ 'dark-mode-card-bg-color': isDarkMode }"
        :style="`--height-item-row: ${itemRowWidth}`"
      >
        <h3 class="text-xxs">Uvi</h3>
        <i class="icon__sun"></i>
        <p class="text-m text-center">{{ uviToFixed }}%</p>
      </div>
      <div
        class="weather-details-grid__row-item"
        :class="{ 'dark-mode-card-bg-color': isDarkMode }"
      >
        <h3 class="text-xxs">Visibilidad</h3>
        <i class="icon__visibility size-icon-visibility"></i>
        <p class="text-m text-center">{{ visibilityKm }}km</p>
      </div>
    </div>
  </div>
</template>

<script>
import { addZeroToNumberIfSmallerThenTen } from "@/mixins/mixins";

export default {
  name: "WeatherDetailsGrid",
  props: {
    sunrise: Number,
    sunset: Number,
    feelsLike: Number,
    pressure: Number,
    humidity: Number,
    cloudiness: Number,
    uvi: Number,
    visibility: Number,
  },
  data() {
    return {
      sunArcContainer: 0,
      itemRowWidth: 0,
      isDarkMode: this.$store.state.isDarkMode,
    };
  },
  computed: {
    sunScale() {
      return window.innerWidth < 420 ? "scale(115%)" : "scale(105%)";
    },
    sunDegreesRotation() {
      const secondsSun = this.getSunsetToSeconds - this.getSunriseToSeconds;
      const secondsBetweenSunriseAndCurrentHour =
        new Date(this.$store.state.locationData[0].current.dt).getTime() -
        this.getSunriseToSeconds;
      return `rotateZ(${
        (180 * secondsBetweenSunriseAndCurrentHour) / secondsSun
      }deg)`;
    },
    getSunriseToSeconds() {
      return new Date(this.sunrise).getTime().toFixed(0);
    },
    getSunsetToSeconds() {
      return new Date(this.sunset).getTime().toFixed(0);
    },
    sunriseHour() {
      return addZeroToNumberIfSmallerThenTen(
        new Date(this.sunrise * 1000).getHours()
      );
    },
    sunriseMinutes() {
      return addZeroToNumberIfSmallerThenTen(
        new Date(this.sunrise * 1000).getMinutes()
      );
    },
    sunsetHour() {
      return addZeroToNumberIfSmallerThenTen(
        new Date(this.sunset * 1000).getHours()
      );
    },
    sunsetMinutes() {
      return addZeroToNumberIfSmallerThenTen(
        new Date(this.sunset * 1000).getMinutes()
      );
    },
    sunSectionHeight() {
      return `height: ${this.sunArcContainer / 2 + 35}px`;
    },
    feelsLikeToFixed() {
      return this.feelsLike.toFixed(0);
    },
    uviToFixed() {
      return this.uvi.toFixed(1);
    },
    visibilityKm() {
      return this.visibility / 1000;
    },
  },
  mounted() {
    this.sunArcContainer = this.$refs["sun-arc-cont"].scrollHeight;
    this.itemRowWidth = this.$refs["item-row"].scrollWidth + "px";
  },
};
</script>

