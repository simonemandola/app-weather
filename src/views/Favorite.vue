<template>
  <main>
    <background />
    <return :title="title" />
    <div class="container mt-8">
      <card />
      <card />
      <card />
    </div>
  </main>
</template>

<script>
// components
import Return from "@/components/_return.vue";
import GradientBackground from "@/components/_gradientBackground.vue";
import Card from "@/components/_card.vue";

export default {
  name: "Favorite",
  components: {
    return: Return,
    background: GradientBackground,
    card: Card,
  },
  data() {
    return {
      title: "Favoritos",
    };
  },
};
</script>
