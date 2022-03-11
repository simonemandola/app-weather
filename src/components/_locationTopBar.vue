<template>
  <div
    class="location-top-bar"
    :class="{
      'background-top-bar': addBgColor,
      'top-bar-min-height': addMinHeight,
    }"
  >
    <h1 class="title-xxs text-center">
      {{ locationName }}, <span>{{ country }}</span>
    </h1>
    <button @click.prevent="toTheTop" v-if="addMinHeight">
      <i class="icon__return"></i>
    </button>
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
