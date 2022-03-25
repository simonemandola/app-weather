<template>
  <div
    class="location-top-bar"
    :class="{
      'background-top-bar': addBgColor,
      'top-bar-min-height': addMinHeight,
      'dark-mode-bg-top-bar': isDarkMode && addBgColor,
    }"
  >
    <transition name="slide-down" data-observer-el>
      <h1
        v-show="elementIsIntercepted"
        class="title-xxs text-center"
        :class="{ 'text-white': isDarkMode }"
      >
        {{ locationName }}, <span>{{ country }}</span>
      </h1>
    </transition>
    <button @click.prevent="toTheTop" v-if="addMinHeight">
      <i class="icon__return" :class="{ 'text-white': isDarkMode }"></i>
    </button>
  </div>
</template>

<script>
// mixins
import { observerElement } from "@/mixins/mixins";

export default {
  name: "LocationTopBar",
  mixins: [observerElement],
  data() {
    return {
      locationName: this.$store.state.locationData[0].name,
      country: this.$store.state.locationData[0].country,
      myScrollY: 0,
      addBgColor: false,
      addMinHeight: false,
      isDarkMode: this.$store.state.isDarkMode,
      elementIsIntercepted: false,
    };
  },
  methods: {
    toTheTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  mounted() {
    document.addEventListener("scroll", () => {
      this.myScrollY = window.scrollY;
      this.myScrollY > 120
        ? (this.addBgColor = true)
        : (this.addBgColor = false);
      this.myScrollY > 1500
        ? (this.addMinHeight = true)
        : (this.addMinHeight = false);
    });
  },
};
</script>
