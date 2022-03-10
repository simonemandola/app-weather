<template>
  <div
    class="location-top-bar"
    :class="{ 'background-return': backgroundStyle }"
  >
    <h1 class="title-xxs text-center">
      {{ locationName }}, <span>{{ country }}</span>
    </h1>
  </div>
</template>

<script>
export default {
  name: "LocationTopBar",
  data() {
    return {
      locationName: this.$store.state.locationData[0].name,
      country: this.$store.state.locationData[0].country,
      backgroundStyle: false,
    };
  },
  mounted() {
    document.addEventListener("scroll", () => {
      window.scrollY > 95
        ? (this.backgroundStyle = true)
        : (this.backgroundStyle = false);
    });
  },
};
</script>
