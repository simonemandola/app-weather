<template>
  <article class="card">
    <div class="card__wrap">
      <div class="card__text">
        <h1 class="card__location">{{ locationName }}</h1>
        <div class="card__data-cont">
          <div class="card__date-state">
            <p class="text-xxxs card__state">
              {{ weatherDescription }}
            </p>
          </div>
          <div class="card__temperature">
            <p class="text-s text-bold">{{ temperature }}º</p>
          </div>
          <div class="card__wind-humidity">
            <div class="card__wind">
              <i class="icon__wind"></i>
              <p class="text-xxxs">{{ windSpeed }}km/h</p>
            </div>
            <div class="card__humidity">
              <i class="icon__humidity"></i>
              <p class="text-xxxs">{{ humidity }}%</p>
            </div>
          </div>
        </div>
      </div>
      <div class="card__image">
        <img
          :src="`/img/weather-status/icons/solid/${iconWeather}.png`"
          alt="weather"
        />
      </div>
    </div>
    <button
      class="card__btn-delete"
      v-if="enableDelete"
      @click.prevent="$emit('deleteFromFavorite')"
    >
      <i class="icon__bin"></i>
    </button>
  </article>
</template>

<script>
export default {
  name: "Card",
  props: {
    locationName: String,
    weatherDescription: String,
    temperature: String,
    windSpeed: Number,
    humidity: Number,
    iconWeather: String,
    enableDelete: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
