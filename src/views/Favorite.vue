<template>
  <main>
    <background />
    <return :title="title" />
    <div class="favorite">
      <div class="favorite__no-results" v-if="favoriteLocations.length === 0">
        <div class="favorite__no-results-img">
          <img src="/img/weather-status/icons/light/11d.svg" alt="" />
        </div>
        <p class="text-s text-white text-center">¡Oops!</p>
        <p class="text-s text-white text-center">
          Parece que tienes ubicaciones favoritas.
        </p>
        <p class="text-s text-white text-center">
          Pulsa el icono <i class="icon__favorite"></i> para añadir.
        </p>
      </div>
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
        :class="{
          'allow-delete-favorite':
            sets.has(location.locations.id) || (shakeCard && i === 0),
        }"
        :enable-delete="true"
        @delete-from-favorite="
          deleteLocationFromFavorite(location.locations.id)
        "
      />
    </div>
    <loading :show-loading="showLoading" />
  </main>
</template>

<script>
// components
import Return from "@/components/_return.vue";
import GradientBackground from "@/components/_gradientBackground.vue";
import Card from "@/components/_card.vue";
import Loading from "@/components/_loading.vue";

// component mixins
import SupabaseCli from "@/components-mixins/SupabaseCli.vue";

export default {
  name: "Favorite",
  components: {
    return: Return,
    background: GradientBackground,
    card: Card,
    loading: Loading,
  },
  data() {
    return {
      supabase: undefined,
      title: "Ubicaciones favoritas",
      favoriteLocations: [],
      sets: new Set(),
      myLocalStorage: window.localStorage,
      userAccessToken: "",
      showLoading: false,
      shakeCard: false,
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
      const userAccessToken = this.supabase.auth.session()?.access_token;
      return (this.userAccessToken = userAccessToken);
    },
    async updateSupabaseData(userID) {
      const { error } = await this.supabase
        .from("user-favorite-locations")
        .update({
          favorite_locations: this.favoriteLocations,
        })
        .eq("id", userID);
      if (error) console.log(error);
    },
    updateLocalsStores(user) {
      // Update the list of favorite locations in the store
      if (user.user) {
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
      await this.getUserAccessToken();
      // Get the JSON object for the logged in user.
      const user = await this.supabase.auth.api.getUser(this.userAccessToken);
      // Return an updated list of favorite locations
      this.favoriteLocations = this.favoriteLocations.filter(
        (location) => location.locations.id !== id
      );
      // Update local Store
      this.updateLocalsStores(user);
      // Update supabase data
      if (user.user) this.updateSupabaseData(user.user.id);
    },
  },
  async mounted() {
    this.showLoading = true;
    window.scrollTo(0, 0);
    this.supabase = SupabaseCli.methods.getSupabaseCli();
    await this.getUserAccessToken();
    // Get the JSON object for the logged in user.
    const user = await this.supabase.auth.api.getUser(this.userAccessToken);
    // If user is logged in get their favorite locations list
    if (user.user) {
      // Get the user's favorite locations from the database
      let { data: locationsDataFromDatabase, error } = await this.supabase
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
      // Update the list of favorite locations in the local storage
      this.myLocalStorage.removeItem("favorite-locations");
      this.myLocalStorage.setItem(
        "favorite-locations",
        JSON.stringify(this.favoriteLocations)
      );
      this.showLoading = false;
    } else {
      // Get data from the local store
      this.favoriteLocations = this.$store.state.favoriteLocations;
      this.showLoading = false;
    }
    this.favoriteLocations.forEach((location) => {
      location.locations.current.temp = parseInt(
        location.locations.current.temp
      );
      location.locations.current.temp =
        location.locations.current.temp.toString();
      return location.locations.current.temp;
    });
    setTimeout(() => {
      this.shakeCard = true;
      setTimeout(() => (this.shakeCard = false), 140);
    }, 600);
  },
};
</script>
