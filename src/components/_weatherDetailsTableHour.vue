<template>
  <div class="weather-details-hour">
    <div class="weather-details-hour__wrap">
      <div class="weather-details-hour__head-table">
        <span class="text-xs text-grey">Hora</span>
        <span class="text-xs text-grey">Temp.</span>
        <span class="text-xs text-grey">UV</span>
        <span class="text-xs text-grey">Hum.</span>
        <span class="text-xs text-grey"><span>Vel.</span><span>Viento</span></span>
        <span class="text-xs text-grey"><span>Dir.</span><span>Viento</span></span>
      </div>
      <div class="weather-details-hour__table">
        <ul>
          <li class="weather-details-hour__row" v-for="(hourStat, key) in hourStats" :key="key">
            <span class="weather-details-hour__table-item text-xs text-white">{{ hourStat.dt }}:00</span>
            <span class="weather-details-hour__table-item text-xs text-white">{{ hourStat.temp }}º</span>
            <span class="weather-details-hour__table-item text-xs text-white">{{ hourStat.uvi }}</span>
            <span class="weather-details-hour__table-item text-xs text-white">{{ hourStat.humidity }}%</span>
            <span class="weather-details-hour__table-item text-xs text-white">{{ hourStat.wind_speed }}</span>
            <span class="weather-details-hour__table-item text-xs text-white">{{ hourStat.wind_deg }}</span>
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
      hourStats:[
        {
          dt: new Date(1618315200).getHours(),
          temp: 22.5,
          humidity: 68,
          uvi: 1.4,
          wind_speed: 4.12,
          wind_deg: 296,
        },
        {
          dt: new Date(1618315200).getHours(),
          temp: 22.5,
          humidity: 68,
          uvi: 1.4,
          wind_speed: 4.12,
          wind_deg: 296,
        },
        {
          dt: new Date(1618315200).getHours(),
          temp: 22.5,
          humidity: 68,
          uvi: 1.4,
          wind_speed: 4.12,
          wind_deg: 296,
        },
        {
          dt: new Date(1618315200).getHours(),
          temp: 22.5,
          humidity: 68,
          uvi: 1.4,
          wind_speed: 4.12,
          wind_deg: 296,
        },
        {
          dt: new Date(1618315200).getHours(),
          temp: 22.5,
          humidity: 68,
          uvi: 1.4,
          wind_speed: 4.12,
          wind_deg: 296,
        },
      ]
    };
  }
};
</script>
