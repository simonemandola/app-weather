<template>
  <main>
    <background />
    <return :title="title" />
    <div class="favorite">
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
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>
