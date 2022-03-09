<template>
  <div class="compass-rose">
    <h2 class="subtitle-xs compass-rose__title">
      Viento <span class="text-xxs">{{ speedWind }}km/h</span>
    </h2>
    <div class="compass-rose__wrap">
      <img
        class="compass-rose__back"
        src="/img/compass-rose-1.svg"
        alt="compass-rose 1"
      />
      <div class="compass-rose__img-container">
        <img
          class="compass-rose__middle"
          src="/img/compass-rose-2.svg"
          alt="compass-rose 2"
        />
      </div>
      <div class="compass-rose__img-container">
        <img
          class="compass-rose__front"
          src="/img/compass-rose-3.svg"
          alt="compass-rose 3"
          :style="
            'transform: rotateZ(' +
            $store.state.locationData[0].current.wind_deg +
            'deg)'
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompassRose",
  mounted() {
    console.log("hey");
  },
  data() {
    return {
      speedWind: this.$store.state.locationData[0].current.wind_speed,
    };
  },
};
</script>
