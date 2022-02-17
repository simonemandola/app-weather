<template>
  <div class="weather-seven-days container">
    <div
      v-for="(day, key, i) in days"
      :key="i"
      class="weather-seven-days__wrap"
    >
      <p class="text-xs">{{ day.name }}</p>
      <p class="weather-seven-days__temperature text-xs">{{ day.tempMin }}</p>
      <p class="weather-seven-days__temperature text-xs">{{ day.tempMax }}</p>
      <div class="weather-seven-days__image">
        <img src="/img/weather-status/day/cloudy-day.png" alt="weather">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "weatherSevenDays",
  data() {
    return {
      days: {
        currentDay: {
          name: "Lunes",
          tempMin: "6º",
          tempMax: "22º",
        },
        DayOne: {
          name: "Martes",
          tempMin: "6º",
          tempMax: "22º",
        },
        DayTwo: {
          name: "Miercoles",
          tempMin: "6º",
          tempMax: "22º",
        },
        DayThree: {
          name: "Jueves",
          tempMin: "6º",
          tempMax: "22º",
        },
        DayFour: {
          name: "Viernes",
          tempMin: "6º",
          tempMax: "22º",
        },
        DayFive: {
          name: "Sabado",
          tempMin: "6º",
          tempMax: "22º",
        },
        DaySix: {
          name: "Domingo",
          tempMin: "6º",
          tempMax: "22º",
        },
        DaySeven: {
          name: "Lunes",
          tempMin: "6º",
          tempMax: "22º",
        },
      },
    };
  },
};
</script>
