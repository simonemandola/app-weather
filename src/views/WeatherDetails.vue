<template>
  <main>
    <return :title="'Detalles'" />
  </main>
</template>

<script>
// components
import Return from "@/components/_return.vue";

export default {
  name: "WeatherDetails",
  components: {
    return: Return,
  },
};
</script>
