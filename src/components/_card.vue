<template>
  <article class="card">
    <div class="card__wrap">
      <div class="card__text">
        <h1 class="card__location">{{ weatherData.name }}</h1>
        <div class="card__data-cont">
          <div class="card__date-state">
            <p class="text-xxxs card__state">
              {{ weatherData.current.weather[0].description }}
            </p>
          </div>
          <div class="card__temperature">
            <p class="text-s text-bold">{{ weatherData.current.temp }}º</p>
          </div>
          <div class="card__wind-humidity">
            <div class="card__wind">
              <i class="icon__wind"></i>
              <p class="text-xxxs">{{ weatherData.current.wind_speed }}</p>
            </div>
            <div class="card__humidity">
              <i class="icon__humidity"></i>
              <p class="text-xxxs">{{ weatherData.current.humidity }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="card__image">
        <img src="/img/weather-status/icons/day/02d.svg" alt="weather" />
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "Card",
  data() {
    return {
      weatherData: this.$store.state.locationData[0],
    };
  },
};
</script>
