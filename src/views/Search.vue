<template>
  <main>
    <return :title="title" />
  </main>
</template>

<script>
// components
import Return from "@/components/_return.vue";

export default {
  name: "Search",
  components: {
    return: Return,
  },
  data() {
    return {
      title: "Buscar",
    };
  },
};
</script>
