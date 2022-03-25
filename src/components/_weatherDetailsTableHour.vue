<template>
  <div class="weather-details-hour">
    <h2 class="subtitle-xs weather-details-hour__title">
      Previsión detallada por hora
    </h2>
    <div
      class="weather-details-hour__head-table"
      :class="{ 'dark-mode-card-bg-color': isDarkMode }"
    >
      <span class="text-xs text-grey" :class="{ 'text-white': isDarkMode }"
        >Hora</span
      >
      <span class="text-xs text-grey" :class="{ 'text-white': isDarkMode }"
        >Temp.</span
      >
      <span class="text-xs text-grey" :class="{ 'text-white': isDarkMode }"
        >UV</span
      >
      <span class="text-xs text-grey" :class="{ 'text-white': isDarkMode }"
        >Hum.</span
      >
      <span class="text-xs text-grey" :class="{ 'text-white': isDarkMode }"
        ><span>Vel.</span><span>Viento</span></span
      >
      <span class="text-xs text-grey" :class="{ 'text-white': isDarkMode }"
        ><span>Dir.</span><span>Viento</span></span
      >
    </div>
    <div
      class="weather-details-hour__wrap"
      :class="{ 'dark-mode-card-bg-color': isDarkMode }"
    >
      <div class="weather-details-hour__table">
        <ul>
          <li
            class="weather-details-hour__row"
            v-for="(hour, key) in wheatherDataHourly"
            :key="key"
          >
            <span class="weather-details-hour__table-item text-xs">{{
              hour.dt
            }}</span>
            <span class="weather-details-hour__table-item text-xs"
              >{{ hour.temp }}º</span
            >
            <span class="weather-details-hour__table-item text-xs"
              >{{ hour.uvi }}%</span
            >
            <span class="weather-details-hour__table-item text-xs"
              >{{ hour.humidity }}%</span
            >
            <span class="weather-details-hour__table-item text-xs"
              >{{ hour.wind_speed }}km/h</span
            >
            <span class="weather-details-hour__table-item text-xs"
              ><i
                class="icon__arrow"
                :style="'transform: rotate(' + hour.wind_deg + 'deg)'"
              ></i>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherDetailsTableHour",
  data() {
    return {
      wheatherDataHourly: this.$store.state.locationData[0].hourly,
      isDarkMode: this.$store.state.isDarkMode,
    };
  },
  mounted() {
    this.wheatherDataHourly.forEach((hour) => {
      hour.wind_speed = hour.wind_speed.toFixed(1);
      hour.uvi = hour.uvi.toFixed(1);
    });
  },
};
</script>
