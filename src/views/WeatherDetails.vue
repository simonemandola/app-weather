<template>
  <main>
    <background />
    <return :title="'Detalles'" :location="'Valencia'" />
    <div class="container mt-8">
      <card />
    </div>
    <bottom-menu />
  </main>
</template>

<script>
// components
import GradientBackground from "@/components/_gradientBackground.vue";
import Return from "@/components/_return.vue";
import Card from "@/components/_card.vue";
import BottomMenuFixed from "@/components/_bottomMenuFixed.vue";

export default {
  name: "WeatherDetails",
  components: {
    background: GradientBackground,
    return: Return,
    card: Card,
    bottomMenu: BottomMenuFixed,
  },
};
</script>
