<template>
  <div class="main-background">
    <div
      class="main-background__wrap"
      :class="{ 'bg-night': currentIsNight }"
    ></div>
  </div>
</template>

<script>
import { isNight } from "@/mixins/mixins";

export default {
  name: "MainBackground",
  computed: {
    currentIsNight() {
      const currentDate = this.$store.state.locationData[0].current.dt * 1000;
      const sunset = this.$store.state.locationData[0].current.sunset * 1000;
      return isNight(currentDate, sunset);
    },
  },
};
</script>
