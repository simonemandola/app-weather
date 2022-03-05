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
        v-touch:swipe="toggleAllowToDelete(location.locations.id)"
        v-for="(location, i) in favoriteLocations"
        :key="i"
        :location-name="location.locations.name"
        :weather-description="location.locations.current.weather[0].description"
        :temperature="location.locations.current.temp"
        :wind-speed="location.locations.current.wind_speed"
        :humidity="location.locations.current.humidity"
        :icon-weather="location.locations.current.weather[0].icon"
        :class="{ 'allow-delete-favorite': sets.has(location.locations.id) }"
        :enable-delete="true"
        @delete-from-favorite="
          deleteLocationFromFavorite(location.locations.id)
        "
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
      favoriteLocations: [],
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
        (location) => location.locations.id !== id
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
    if (this.myLocalStorage.getItem("supabase.auth.token")) {
      this.favoriteLocations = this.$store.state.user.favoriteLocations;
    } else {
      this.favoriteLocations = this.$store.state.favoriteLocations;
    }
    console.log("********");
    console.log(this.favoriteLocations);
    this.favoriteLocations.forEach((location) => {
      location.locations.current.temp = parseInt(
        location.locations.current.temp
      );
      location.locations.current.temp =
        location.locations.current.temp.toString();
      return location.locations.current.temp;
    });
  },
};
</script>
