<template>
  <article class="loading" v-if="showLoading">
    <div class="loading__img">
      <img src="/img/loading-illustration.png" alt="loading">
    </div>
    <div class="loading__points">
      <h1 class="title-xxs">Cargando</h1>
      <div class="loading__point"></div>
      <div class="loading__point"></div>
      <div class="loading__point"></div>
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
