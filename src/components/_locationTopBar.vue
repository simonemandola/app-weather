<template>
  <div
    class="location-top-bar"
    :class="{
      dark: isDarkMode,
      'background-top-bar': addBgColor,
      'top-bar-min-height': addMinHeight,
      'dark-mode-bg-top-bar': isDarkMode && addBgColor,
    }"
  >
    <transition name="slide-down">
      <h1 class="title-xxs text-center" :class="{ 'text-white': isDarkMode }">
        {{ locationName }}, <span>{{ country }}</span>
        <span v-show="addMinHeight"> - {{ temperature }}º</span>
      </h1>
    </transition>
    <transition name="slide-down">
      <button @click.prevent="toTheTop" v-if="addMinHeight">
        <i class="icon__return" :class="{ 'text-white': isDarkMode }"></i>
      </button>
    </transition>
  </div>
</template>

<script>
export default {
  name: "LocationTopBar",
  data() {
    return {
      locationName: this.$store.state.locationData[0].name,
      country: this.$store.state.locationData[0].country,
      myScrollY: 0,
      addBgColor: false,
      addMinHeight: false,
      isDarkMode: this.$store.state.isDarkMode,
      temperature: 0,
    };
  },
  methods: {
    toTheTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  mounted() {
    let temp = this.$store.state.locationData[0].current.temp;
    temp = temp?.toFixed(0);
    this.temperature = temp;
    document.addEventListener("scroll", () => {
      this.myScrollY = window.scrollY;
      this.addBgColor = this.myScrollY > 120;
      this.addMinHeight = this.myScrollY > 1500;
    });
  },
};
</script>
