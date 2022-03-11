<template>
  <main>
    <main-background />
    <locatio-top-bar />
    <div class="top-bar">
      <div class="top-bar__wrap">
        <p class="text-xs text-bold">Ten un buen día.</p>
        <button @click.prevent="addToFavorite">
          <i :class="locationIsFavorite ? icon.checked : icon.unchecked"></i>
        </button>
      </div>
    </div>
    <main-results />
    <weather-by-hour />
    <air-pollution />
    <compass-rose />
    <w-table-hour />
    <v-apexchart />
    <map-location />
    <weather-seven-days />
    <news />
    <notification
      :show-notification="showNotification"
      :notifications-messages="notificationsMessages"
      :icon-type="iconType"
      @hide-notification="showNotification = $event"
    />
    <bottom-menu />
  </main>
</template>

<script>
// components
import LocationTopBar from "@/components/_locationTopBar.vue";
import WeatherMainResult from "@/components/_weatherMainResult.vue";
import MainBackground from "@/components/_mainBackground.vue";
import WeatherByHour from "@/components/_weatherByHour.vue";
import AirPollution from "@/components/_airPollution.vue";
import CompassRose from "@/components/_compassRose.vue";
import WeatherTableHour from "@/components/_weatherDetailsTableHour.vue";
import MapLocation from "@/components/_mapLocation.vue";
import News from "@/components/_news.vue";
import BottomMenuFixed from "@/components/_bottomMenuFixed.vue";
import WeatherSevenDays from "@/components/_weatherSevenDays.vue";
import NotificationMessage from "@/components/_notificationMessage.vue";

// component mixins
import SupabaseCli from "@/components-mixins/SupabaseCli.vue";

// graph
import Graph from "@/components/_graph.vue";

export default {
  name: "Home",
  components: {
    locatioTopBar: LocationTopBar,
    mainResults: WeatherMainResult,
    mainBackground: MainBackground,
    weatherByHour: WeatherByHour,
    airPollution: AirPollution,
    compassRose: CompassRose,
    bottomMenu: BottomMenuFixed,
    weatherSevenDays: WeatherSevenDays,
    vApexchart: Graph,
    wTableHour: WeatherTableHour,
    mapLocation: MapLocation,
    news: News,
    notification: NotificationMessage,
  },
  data() {
    return {
      supabase: undefined,
      favoriteLocations: [],
      locationToAdd: {
        userID: "",
        locations: [],
      },
      myLocalStorage: window.localStorage,
      icon: {
        unchecked: "icon__favorite",
        checked: "icon__favorite-checked",
      },
      locationIsFavorite: false,
      userAccessToken: "",
      showNotification: false,
      notificationsMessages: [],
      iconType: "",
    };
  },
  methods: {
    isScrolled() {
      console.log(window.scrollY);
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
      if (user.data) {
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
    getUserAccessToken() {
      const userAccessToken = this.supabase.auth.session()?.access_token;
      return (this.userAccessToken = userAccessToken);
    },
    async addToFavorite() {
      // Get data from LocalStorage
      this.locationToAdd.locations =
        this.myLocalStorage.getItem("user-weather-data");
      // Convert to JSON object
      this.locationToAdd.locations = JSON.parse(this.locationToAdd.locations);
      // Return true o false if the location is already a favorite
      this.locationIsFavorite = this.favoriteLocations.some(
        (location) => location.locations.id === this.locationToAdd.locations.id
      );
      await this.getUserAccessToken();
      // Get the JSON object for the logged in user.
      const user = await this.supabase.auth.api.getUser(this.userAccessToken);
      // Add user id to favorite locations if user is logged in
      if (user.user) this.locationToAdd.userID = user.user.id;
      if (!this.locationIsFavorite) {
        // if not a favorite set the variable to true
        this.locationIsFavorite = true;
        // Add the new location to the favorite locations array
        this.favoriteLocations.push(this.locationToAdd);
        // Update local Store
        this.updateLocalsStores(user);
        // Update supabase data
        if (user.user) this.updateSupabaseData(user.user.id);
        // Show notification
        this.showNotification = true;
        this.notificationsMessages = [];
        this.notificationsMessages.push("Ubicación añadida a favoritos.");
        this.iconType = "icon__tick text-green";
      } else {
        // if already a favorite set the variable to false
        this.locationIsFavorite = false;
        // Return an updated list of favorite locations
        this.favoriteLocations = this.favoriteLocations.filter(
          (location) =>
            location.locations.id !== this.locationToAdd.locations.id
        );
        // Update local Store
        this.updateLocalsStores(user);
        // Update supabase data
        if (user.user) this.updateSupabaseData(user.user.id);
        // Show notification
        this.showNotification = true;
        this.notificationsMessages = [];
        this.notificationsMessages.push("Ubicación eliminada de favoritos.");
        this.iconType = "icon__cross text-red";
      }
    },
  },
  created() {
    window.scrollTo(0, 0);
    if (!window.localStorage.getItem("user-weather-data")) {
      window.localStorage.setItem(
        "user-weather-data",
        JSON.stringify(this.$store.state.locationData[0])
      );
    } else {
      const data = window.localStorage.getItem("user-weather-data");
      this.$store.state.locationData[0] = JSON.parse(data);
    }
  },
  async mounted() {
    this.supabase = SupabaseCli.methods.getSupabaseCli();
    await this.getUserAccessToken();
    // Get the JSON object for the logged in user.
    const user = await this.supabase.auth.api.getUser(this.userAccessToken);
    // If user is logged in, get their favorite locations list
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
    } else {
      // Get data from the local store
      this.favoriteLocations = this.$store.state.favoriteLocations;
    }
    // Check if current location is already a favorite location,
    // return "true" if is favorite, return "false" if not a favorite
    this.locationIsFavorite = this.favoriteLocations.some(
      (location) =>
        location.locations.id === this.$store.state.locationData[0].id
    );
  },
};
</script>
