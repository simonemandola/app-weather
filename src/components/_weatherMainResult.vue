<template>
  <div class="main-weather-result">
    <div class="main-weather-result__wrap">
      <transition
        tag="div"
        name="slide-up"
        class="main-weather-result__image"
        data-observer-el
      >
        <img
          v-show="elementIsIntercepted"
          :src="`/img/weather-status/icons/solid/${weatherData.current.weather[0].icon}.png`"
          alt="current weather forecast"
          draggable="false"
        />
      </transition>
      <transition-group
        tag="div"
        name="slide-up"
        class="main-weather-result__text"
        data-observer-el
      >
        <p
          v-show="elementIsIntercepted"
          class="main-weather-result__temperature text-end"
          key="1"
        >
          {{ temperature }}º
        </p>
        <p
          v-show="elementIsIntercepted"
          class="main-weather-result__state text-s text-end"
          key="2"
        >
          {{ weatherData.current.weather[0].description }}
        </p>
        <div
          v-show="elementIsIntercepted"
          class="main-weather-result__state-info"
          key="3"
        >
          <p class="text-xs">
            <i class="icon__temp-min"></i>{{ weatherData.daily[0].temp.min }}
          </p>
          <p class="text-xs">
            <i class="icon__temp-max"></i>{{ weatherData.daily[0].temp.max }}
          </p>
        </div>
      </transition-group>
      <weather-alert />
    </div>
  </div>
</template>

<script>
// components
import WeatherAlerts from "@/components/_weatherAlerts.vue";

// mixins
import { observerElement } from "@/mixins/mixins";

export default {
  name: "WeatherMainResult",
  mixins: [observerElement],
  components: {
    weatherAlert: WeatherAlerts,
  },
  data() {
    return {
      weatherData: this.$store.state.locationData[0],
      temperature: 0,
      elementIsIntercepted: false,
    };
  },
  mounted() {
    let temp = this.$store.state.locationData[0].current.temp;
    temp = temp.toFixed(0);
    this.temperature = temp;
    this.temperature = this.temperature - 4;
    setInterval(() => {
      if (this.temperature < temp) this.temperature++;
    }, 400);
  },
};
</script>
