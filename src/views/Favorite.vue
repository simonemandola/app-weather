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

// supabase client
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ydyyzkyuojfqqeuyaagh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkeXl6a3l1b2pmcXFldXlhYWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYzODYxNjksImV4cCI6MTk2MTk2MjE2OX0.2zTcwxb_-8jB0dK6wySOItJI2gXdCo3hhazbiYfalRY";
const supabase = createClient(supabaseUrl, supabaseKey);

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
      userAccessToken: "",
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
    getUserAccessToken() {
      let supaTokenData = this.myLocalStorage.getItem("supabase.auth.token");
      supaTokenData = JSON.parse(supaTokenData);
      return (this.userAccessToken = supaTokenData.currentSession.access_token);
    },
    async updateSupabaseData(userID) {
      const { data, error } = await supabase
        .from("user-favorite-locations")
        .update({
          favorite_locations: this.favoriteLocations,
        })
        .eq("id", userID);
      console.log(data);
      if (error) console.log(error);
    },
    updateLocalsStores(user) {
      // Update the list of favorite locations in the store
      if (user) {
        this.$store.state.user.favoriteLocations = this.favoriteLocations;
      } else {
        this.$store.state.favoriteLocations = this.favoriteLocations;
      }
      // Update the list of favorite locations in the local storage
      this.myLocalStorage.removeItem("favorite-locations");
      this.myLocalStorage.setItem(
        "favorite-locations",
        JSON.stringify(this.favoriteLocations)
      );
    },
    async deleteLocationFromFavorite(id) {
      // Get the JSON object for the logged in user.
      const user = await supabase.auth.api.getUser(this.userAccessToken);
      // Return an updated list of favorite locations
      this.favoriteLocations = this.favoriteLocations.filter(
        (location) =>
          location.locations.id !== id
      );
      // Update local Store
      this.updateLocalsStores(user);
      // Update supabase data
      if (user) this.updateSupabaseData(user.user.id);
    },
  },
  async mounted() {
    window.scrollTo(0, 0);
    this.getUserAccessToken();
    // Get the JSON object for the logged in user.
    const user = await supabase.auth.api.getUser(this.userAccessToken);
    console.log(user);
    // If user is logged in get their favorite locations list
    if (user) {
      // Get the user's favorite locations from the database
      let { data: locationsDataFromDatabase, error } = await supabase
        .from("user-favorite-locations")
        .select("favorite_locations")
        .eq("id", user.user.id);
      if (error) console.log(error);
      // Convert to JSON object
      this.favoriteLocations = JSON.parse(
        locationsDataFromDatabase[0].favorite_locations
      );
      // Set or upgrade at local store
      this.$store.state.user.favoriteLocations = this.favoriteLocations;
      console.log(this.$store.state.user.favoriteLocations);
      // Update the list of favorite locations in the local storage
      this.myLocalStorage.removeItem("favorite-locations");
      this.myLocalStorage.setItem(
        "favorite-locations",
        JSON.stringify(this.favoriteLocations)
      );
    } else {
      // Get data from the local store
      this.favoriteLocations = this.$store.state.favoriteLocations;
    }
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
