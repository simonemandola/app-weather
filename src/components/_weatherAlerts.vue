<template>
  <transition name="slide-up" data-observer-el>
    <div class="main-weather-result__alert" v-show="elementIsIntercepted" v-if="existAlerts">
      <p class="text-xxs main-weather-result__alert-body">
        <i class="icon__alert"></i> {{ weatherAlert }}
      </p>
      <p class="text-xxxs text-end main-weather-result__alert-source">
        {{ sourceAlert }}
      </p>
    </div>
  </transition>
</template>

<script>
// mixins
import { observerElement } from "@/mixins/mixins";

export default {
  name: "WeatherAlerts",
  mixins: [observerElement],
  data() {
    return {
      weatherAlert: "",
      sourceAlert: "",
      existAlerts: false,
      elementIsIntercepted: false,
    };
  },
  mounted() {
    if (this.$store.state.locationData[0].alerts) {
      this.existAlerts = true;
      this.weatherAlert =
        this.$store.state.locationData[0].alerts[0].description;
      this.sourceAlert =
        this.$store.state.locationData[0].alerts[0].sender_name;
    }
  },
};
</script>
