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
        v-touch:swipe="toggleAllowToDelete(location.id)"
        v-for="(location, i) in favoriteLocations"
        :key="i"
        :location-name="location.name"
        :weather-description="location.current.weather[0].description"
        :temperature="location.current.temp"
        :wind-speed="location.current.wind_speed"
        :humidity="location.current.humidity"
        :icon-weather="location.current.weather[0].icon"
        :class="{ 'allow-delete-favorite': sets.has(location.id) }"
        :enable-delete="true"
        @delete-from-favorite="deleteLocationFromFavorite(location.id)"
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
      sets: new Set(),
      myLocalStorage: window.localStorage,
    };
  },
  methods: {
    toggleAllowToDelete(id) {
      return (direction) => {
        switch (direction) {
          case "right":
            this.sets.delete(id);
            break;
          case "left":
            this.sets.add(id);
            break;
        }
      };
    },
    deleteLocationFromFavorite(id) {
      this.$store.state.favoriteLocations =
        this.myLocalStorage.getItem("favorite-locations");
      this.$store.state.favoriteLocations = JSON.parse(
        this.$store.state.favoriteLocations
      );
      this.favoriteLocations = this.$store.state.favoriteLocations.filter(
        (location) => location.id !== id
      );
      this.$store.state.favoriteLocations = this.favoriteLocations;
      console.log(this.$store.state.favoriteLocations);
      this.myLocalStorage.setItem(
        "favorite-locations",
        JSON.stringify(this.$store.state.favoriteLocations)
      );
    },
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
