<template>
  <router-view v-slot="{ Component }">
    <main>
      <component :is="Component"></component>
    </main>
  </router-view>
  <bottom-menu v-if="$route.name !== 'Screensplash'" />
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
