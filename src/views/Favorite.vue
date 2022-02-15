<template>
  <main>
    <background />
    <return :title="title" />
  </main>
</template>

<script>
// components
import Return from "@/components/_return.vue";
import GradientBackground from "@/components/_gradientBackground.vue";

export default {
  name: "Favorite",
  components: {
    return: Return,
    background: GradientBackground,
  },
  data() {
    return {
      title: "Favoritos",
    };
  },
};
</script>
