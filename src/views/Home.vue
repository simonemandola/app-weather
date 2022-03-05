<template>
  <main>
    <main-background />
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
    <w-table-hour />
    <v-apexchart />
    <map-location />
    <weather-seven-days />
    <news />
    <bottom-menu />
  </main>
</template>

<script>
// components
import WeatherMainResult from "@/components/_weatherMainResult.vue";
import MainBackground from "@/components/_mainBackground.vue";
import WeatherByHour from "@/components/_weatherByHour.vue";
import WeatherTableHour from "@/components/_weatherDetailsTableHour.vue";
import MapLocation from "@/components/_mapLocation.vue";
import News from "@/components/_news.vue";
import BottomMenuFixed from "@/components/_bottomMenuFixed.vue";
import WeatherSevenDays from "@/components/_weatherSevenDays.vue";

// graph
import Graph from "@/components/_graph.vue";

// supabase client
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ydyyzkyuojfqqeuyaagh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkeXl6a3l1b2pmcXFldXlhYWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYzODYxNjksImV4cCI6MTk2MTk2MjE2OX0.2zTcwxb_-8jB0dK6wySOItJI2gXdCo3hhazbiYfalRY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default {
  name: "Home",
  components: {
    mainResults: WeatherMainResult,
    mainBackground: MainBackground,
    weatherByHour: WeatherByHour,
    bottomMenu: BottomMenuFixed,
    weatherSevenDays: WeatherSevenDays,
    vApexchart: Graph,
    wTableHour: WeatherTableHour,
    mapLocation: MapLocation,
    news: News,
  },
  data() {
    return {
      favoriteLocations: this.$store.state.favoriteLocations,
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
    };
  },
  methods: {
    async addToFavorite() {
      this.locationToAdd.locations = this.myLocalStorage.getItem("user-weather-data");
      this.locationToAdd.locations = JSON.parse(this.locationToAdd.locations);
      const locationToAddID = this.locationToAdd.locations.id;
      console.log(this.locationToAdd.locations);
      console.log(locationToAddID);
      console.log(this.favoriteLocations);
      this.locationIsFavorite = this.favoriteLocations.some(
        (location) => location.locations.id === locationToAddID
      );
      const user = await supabase.auth.user();
      // Add user id to favorite locations if user is logged in
      if (user) this.locationToAdd.userID = user.id;
      if (!this.locationIsFavorite) {
        this.locationIsFavorite = true;
        this.favoriteLocations.push(this.locationToAdd);
        // Update the list of favorite locations in the store
        this.$store.state.user.favoriteLocations = this.favoriteLocations;
        // Update the list of favorite locations in the local storage
        this.myLocalStorage.setItem(
          "favorite-locations",
          JSON.stringify(this.favoriteLocations)
        )
        console.log(this.favoriteLocations);
      } else {
        this.locationIsFavorite = false;
        this.favoriteLocations = this.favoriteLocations.filter(
          (location) => location.locations.id !== locationToAddID
        );
        // Update the list of favorite locations in the store
        this.$store.state.user.favoriteLocations = this.favoriteLocations;
        // Update the list of favorite locations in the local storage
        this.myLocalStorage.removeItem("favorite-locations");
        this.myLocalStorage.setItem(
          "favorite-locations",
          JSON.stringify(this.favoriteLocations)
        );
        console.log(this.favoriteLocations);
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
  mounted() {
    console.log(this.$store.state.locationData);
    console.log(this.favoriteLocations);
    this.locationIsFavorite = this.favoriteLocations.some(
      (location) => location.locations.id === this.$store.state.locationData[0].id
    );
  },
};
</script>
