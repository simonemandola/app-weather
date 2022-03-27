<template>
  <main>
    <main-background />
    <location-top-bar />
    <transition tag="div" name="slide-up" class="favorite-bar" data-observer-el>
      <div v-show="elementIsIntercepted" class="favorite-bar__wrap">
        <p class="text-xs text-bold">{{ todayDate }}</p>
        <button @click.prevent="addToFavorite">
          <i :class="locationIsFavorite ? icon.checked : icon.unchecked"></i>
        </button>
      </div>
    </transition>
    <main-results />
    <weather-by-hour />
    <air-pollution />
    <compass-rose />
    <w-table-hour />
    <v-apexchart />
    <map-location />
    <weather-seven-days />
    <w-details-grid
      :sunrise="sunrise"
      :sunset="sunset"
      :feelsLike="feelsLike"
      :pressure="pressure"
      :humidity="humidity"
      :cloudiness="cloudiness"
      :uvi="uvi"
      :visibility="visibility"
    />
    <notification
      :show-notification="showNotification"
      :notifications-messages="notificationsMessages"
      :icon-type="iconType"
      @hide-notification="showNotification = $event"
    />
  </main>
</template>

<script>
// components
import MainBackground from "@/components/_mainBackground.vue";
import LocationTopBar from "@/components/_locationTopBar.vue";
import WeatherMainResult from "@/components/_weatherMainResult.vue";
import WeatherByHour from "@/components/_weatherByHour.vue";
import AirPollution from "@/components/_airPollution.vue";
import CompassRose from "@/components/_compassRose.vue";
import WeatherTableHour from "@/components/_weatherDetailsTableHour.vue";
import MapLocation from "@/components/_mapLocation.vue";
import WeatherSevenDays from "@/components/_weatherSevenDays.vue";
import WeatherDetailsGrid from "@/components/_weatherDetailsGrid";
import NotificationMessage from "@/components/_notificationMessage.vue";

// mixins
import { toggleMode, observerElement } from "@/mixins/mixins";

// component mixins
import SupabaseCli from "@/components-mixins/SupabaseCli.vue";

// graph
import Graph from "@/components/_graph.vue";
import { getCardFormatDateLong } from "../mixins/mixins";

export default {
  name: "Home",
  mixins: [toggleMode, observerElement],
  components: {
    locationTopBar: LocationTopBar,
    mainResults: WeatherMainResult,
    mainBackground: MainBackground,
    weatherByHour: WeatherByHour,
    airPollution: AirPollution,
    compassRose: CompassRose,
    weatherSevenDays: WeatherSevenDays,
    vApexchart: Graph,
    wTableHour: WeatherTableHour,
    wDetailsGrid: WeatherDetailsGrid,
    mapLocation: MapLocation,
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
      timeZoneOffset: 0,
      isNegativeTimeZoneOffset: false,
      defaultTimeOffset: 3600,
      sunrise: 0,
      sunset: 0,
      feelsLike: 0,
      pressure: 0,
      humidity: 0,
      cloudiness: 0,
      uvi: 0,
      visibility: 0,
      tempUserData: {},
      elementIsIntercepted: false,
    };
  },
  computed: {
    todayDate() {
      return getCardFormatDateLong(new Date);
    },
  },
  methods: {
    async updateSupabaseData(userID) {
      const { error } = await this.supabase
        .from("user-favorite-locations")
        .update({
          favorite_locations: this.favoriteLocations,
        })
        .eq("id", userID);
      if (error) console.log(error);
    },
    /***
     * Update local data
     * @param user <Object> all user data
     */
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
    /***
     * Get user access token
     * @return {string | CHANNEL_EVENTS.access_token}
     */
    getUserAccessToken() {
      this.userAccessToken = this.supabase.auth.session()?.access_token;
      return this.userAccessToken;
    },
    /***
     * Add current location to favorite
     * @return {Promise<void>}
     */
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
      // Add user id to favorite locations if user is logged in
      if (this.tempUserData) this.locationToAdd.userID = this.tempUserData.id;
      if (!this.locationIsFavorite) {
        // if not a favorite set the variable to true
        this.locationIsFavorite = true;
        // Add the new location to the favorite locations array
        this.favoriteLocations.push(this.locationToAdd);
        // Update local Store
        this.updateLocalsStores(this.tempUserData);
        // Update supabase data
        if (this.tempUserData) this.updateSupabaseData(this.tempUserData.id);
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
        this.updateLocalsStores(this.tempUserData);
        // Update supabase data
        if (this.tempUserData) this.updateSupabaseData(this.tempUserData.id);
        // Show notification
        this.showNotification = true;
        this.notificationsMessages = [];
        this.notificationsMessages.push("Ubicación eliminada de favoritos.");
        this.iconType = "icon__cross text-red";
      }
    },
  },
  created() {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    // Props data for grid weather details component
    this.timeZoneOffset = this.$store.state.locationData[0].timeZoneOffset;
    this.sunrise = this.$store.state.locationData[0].current.sunrise;
    this.sunset = this.$store.state.locationData[0].current.sunset;
    this.feelsLike = this.$store.state.locationData[0].current.feels_like;
    this.pressure = this.$store.state.locationData[0].current.pressure;
    this.humidity = this.$store.state.locationData[0].current.humidity;
    this.cloudiness = this.$store.state.locationData[0].current.clouds;
    this.uvi = this.$store.state.locationData[0].current.uvi;
    this.visibility = this.$store.state.locationData[0].current.visibility;
    if (Math.sign(this.timeZoneOffset) === -1) {
      this.timeZoneOffset = Math.abs(this.timeZoneOffset);
      this.timeZoneOffset = this.timeZoneOffset + this.defaultTimeOffset;
      this.isNegativeTimeZoneOffset = true;
    } else {
      this.timeZoneOffset = this.timeZoneOffset - this.defaultTimeOffset * 2;
    }
    if (this.isNegativeTimeZoneOffset) {
      this.sunrise = this.sunrise - this.timeZoneOffset;
      this.sunset = this.sunset - this.timeZoneOffset;
      this.$store.state.locationData[0].current.dt = this.$store.state.locationData[0].current.dt - this.timeZoneOffset;
    } else {
      this.sunrise = this.sunrise + this.timeZoneOffset;
      this.sunset = this.sunset + this.timeZoneOffset;
      this.$store.state.locationData[0].current.dt = this.$store.state.locationData[0].current.dt + this.timeZoneOffset;
    }
    // Notification if user is logged in or logged out
    if (this.$route.query.isLogged !== undefined) {
      if (this.$route.query.isLogged === "1") {
        this.showNotification = true;
        this.notificationsMessages = [];
        this.notificationsMessages.push("Has iniciado sesión.");
        this.iconType = "icon__login text-green";
      } else {
        this.showNotification = true;
        this.notificationsMessages = [];
        this.notificationsMessages.push("Has cerrado sesión.");
        this.iconType = "icon__logout text-red";
      }
    }
    this.supabase = SupabaseCli.methods.getSupabaseCli();
    await this.getUserAccessToken();
    // If user is logged in, get their favorite locations list
    if (this.userAccessToken) {
      // Get the JSON object for the logged in user.
      const { user, error } = await this.supabase.auth.api.getUser(
        this.userAccessToken
      );
      if (error) console.log(error);
      // Get the user's favorite locations from the database
      let { data: locationsDataFromDatabase, errorGetFavorite } =
        await this.supabase
          .from("user-favorite-locations")
          .select("favorite_locations")
          .eq("id", user.id);
      if (errorGetFavorite) console.log(errorGetFavorite);
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
      this.tempUserData = user;
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
