<template>
  <div class="compass-rose">
    <h2 class="subtitle-xs compass-rose__title">
      Viento <span class="text-xxs">{{ windSpeed }}km/h</span>
    </h2>
    <div class="compass-rose__wrap" :class="{ 'dark-mode-card-bg-color': isDarkMode }">
      <img
        class="compass-rose__back"
        :src="`/img/${directory}/compass-rose-1.svg`"
        alt="compass-rose 1"
      />
      <div class="compass-rose__img-container">
        <img
          class="compass-rose__middle"
          :src="`/img/${directory}/compass-rose-2.svg`"
          alt="compass-rose 2"
        />
      </div>
      <div class="compass-rose__img-container">
        <img
          class="compass-rose__front"
          :src="`/img/${directory}/compass-rose-3.svg`"
          alt="compass-rose 3"
          :style="'transform: rotateZ(' + windDeg + 'deg)'"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompassRose",
  data() {
    return {
      windSpeed: this.$store.state.locationData[0].hourly[0].wind_speed,
      windDeg: this.$store.state.locationData[0].hourly[0].wind_deg,
      isDarkMode: this.$store.state.isDarkMode,
    };
  },
  computed: {
    directory() {
      return this.isDarkMode ? "compass-rose-light" : "compass-rose-dark";
    },
  },
  methods: {
    windDegAnimation() {
      let add = false;
      setInterval(() => {
        if (add) {
          this.windDeg = this.windDeg + 7;
          add = false;
        } else {
          this.windDeg = this.windDeg - 7;
          add = true;
        }
      }, 800);
    },
  },
  mounted() {
    this.windDegAnimation();
  },
};
</script>
