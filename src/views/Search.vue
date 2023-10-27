<template>
  <section class="search-view">
    <background />
    <return :title="title" />
    <search-form />
  </section>
</template>

<script>
// components
import SearchForm from "@/components/_searchForm.vue";
import Return from "@/components/_return.vue";
import GradientBackground from "@/components/_gradientBackground.vue";

// mixins
import { toggleMode } from "@/mixins/mixins";

export default {
  name: "Search",
  mixins: [toggleMode],
  components: {
    return: Return,
    background: GradientBackground,
    searchForm: SearchForm,
  },
  data() {
    return {
      title: "Buscar",
    };
  },
};
</script>
