<template>
  <div class="loader" v-if="showLoading">
    <div class="loader__point"></div>
    <div class="loader__point"></div>
    <div class="loader__point"></div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    showLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
