<template>
  <main>
    <background />
    <return :title="title" />
    <div class="favorite">
      <p v-if="favoriteLocations.length === 0" class="text-s text-center">
        ¡No tienes ubicaciones favoritas!
      </p>
      <card
        v-else
        v-for="(location, i) in favoriteLocations"
        :key="i"
        :location-name="location.name"
        :weather-description="location.current.weather[0].description"
        :temperature="location.current.temp"
        :wind-speed="location.current.wind_speed"
        :humidity="location.current.humidity"
        :icon-weather="location.current.weather[0].icon"
      />
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
      favoriteLocations: this.$store.state.favoriteLocations,
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    this.favoriteLocations.forEach((location) => {
      location.current.temp = parseInt(location.current.temp);
      location.current.temp = location.current.temp.toString();
      return location.current.temp;
    });
  },
};
</script>
