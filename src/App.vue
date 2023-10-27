<template>
  <router-view v-slot="{ Component }">
    <main>
      <component :is="Component"></component>
      <bottom-menu v-if="showBottomMenu" />
      <transition name="fade-in">
        <loading :show-loading="showLoading" />
      </transition>
    </main>
  </router-view>
</template>

<script>
// components
import BottomMenuFixed from "@/components/_bottomMenuFixed.vue";
import Loading from "@/components/_loading.vue";

const MOBILE_BREAK_POINT = 821;

export default {
  name: "APP",
  components: {
    bottomMenu: BottomMenuFixed,
    loading: Loading,
  },
  computed: {
    showBottomMenu() {
      return this.$store.state.isMobile && this.$route.name !== "Screensplash";
    },
    showLoading() {
      return this.$store.state.showLoading;
    },
  },
  created() {
    this.$store.state.isMobile = window.innerWidth < MOBILE_BREAK_POINT;
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.$store.state.isMobile = window.innerWidth < MOBILE_BREAK_POINT;
    });
  },
};
</script>
