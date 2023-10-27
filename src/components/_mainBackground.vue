<template>
  <div class="main-background">
    <div
      class="main-background__wrap"
      :class="{ 'bg-night': $store.state.isDarkMode }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "MainBackground",
};
</script>
