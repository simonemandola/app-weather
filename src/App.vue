<template>
  <router-view v-slot="{ Component }">
    <main>
      <component :is="Component"></component>
      <bottom-menu v-if="$route.name !== 'Screensplash'" />
    </main>
  </router-view>
</template>

<script>
// components
import BottomMenuFixed from "@/components/_bottomMenuFixed.vue";

export default {
  name: "APP",
  components: {
    bottomMenu: BottomMenuFixed,
  },
}
</script>
