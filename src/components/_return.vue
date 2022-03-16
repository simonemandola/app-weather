<template>
  <div class="return" :class="{ 'background-top-bar': backgroundStyle }">
    <p class="return__title text-s text-white" v-if="title">
      {{ title }}
      <span class="text-xxs" v-if="location">{{ location }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "Return",
  props: {
    title: String,
    location: String,
  },
  data() {
    return {
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
