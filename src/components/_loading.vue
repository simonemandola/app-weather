<template>
  <article class="loader" v-if="showLoading">
    <div class="loader__img">
      <img src="/img/loading-illustration.png" alt="loading">
    </div>
    <div class="loader__points">
      <h1 class="title-xxs">Cargando</h1>
      <div class="loader__point"></div>
      <div class="loader__point"></div>
      <div class="loader__point"></div>
    </div>
  </article>
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
