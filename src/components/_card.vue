<template>
  <article class="card">
    <div class="card__wrap">
      <div class="card__text">
        <h1 class="card__location">Valencia</h1>
        <div class="card__data-cont">
          <div class="card__date-state">
            <p class="text-xxxs card__date">10-02-2022</p>
            <p class="text-xxxs card__state">Parcialmente soleado</p>
          </div>
          <div class="card__temperature">
            <p class="text-s text-bold">20º</p>
          </div>
          <div class="card__wind-humidity">
            <div class="card__wind">
              <i class="icon__wind"></i>
              <p class="text-xxxs">Viento</p>
            </div>
            <div class="card__humidity">
              <i class="icon__humidity"></i>
              <p class="text-xxxs">Humedad</p>
            </div>
          </div>
        </div>
      </div>
      <div class="card__image">
        <img src="/img/weather-status/icons/day/02d.png" alt="weather">
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "Card",
};
</script>
