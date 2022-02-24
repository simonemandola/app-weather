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
    <weather-seven-days />
    <bottom-menu />
  </main>
</template>

<script>
// components
import WeatherMainResult from "@/components/_weatherMainResult.vue";
import MainBackground from "@/components/_mainBackground.vue";
import WeatherByHour from "@/components/_weatherByHour.vue";
import BottomMenuFixed from "@/components/_bottomMenuFixed.vue";
import WeatherSevenDays from "@/components/_weatherSevenDays.vue";

export default {
  name: "Home",
  components: {
    mainResults: WeatherMainResult,
    mainBackground: MainBackground,
    weatherByHour: WeatherByHour,
    bottomMenu: BottomMenuFixed,
    weatherSevenDays: WeatherSevenDays,
  },
  data() {
    return {
      favoriteLocations: this.$store.state.favoriteLocations,
      locationToAdd: "",
      myLocalStorage: window.localStorage,
      icon: {
        unchecked: "icon__favorite",
        checked: "icon__favorite-checked",
      },
      locationIsFavorite: false,
    };
  },
  methods: {
    addToFavorite() {
      this.locationToAdd = this.myLocalStorage.getItem("user-weather-data");
      this.locationToAdd = JSON.parse(this.locationToAdd);
      const locationToAddID = this.locationToAdd.id;
      this.locationIsFavorite = this.favoriteLocations.some(
        (location) => location.id === locationToAddID
      );
      if (!this.locationIsFavorite) {
        this.locationIsFavorite = true;
        this.favoriteLocations.push(this.locationToAdd);
        this.myLocalStorage.setItem(
          "favorite-locations",
          JSON.stringify(this.favoriteLocations)
        );
        this.$store.state.favoriteLocations.favorite = true;
      } else {
        this.locationIsFavorite = false;
        this.favoriteLocations = this.favoriteLocations.filter(
          (location) => location.id !== locationToAddID
        );
        this.myLocalStorage.removeItem("favorite-locations");
        this.myLocalStorage.setItem(
          "favorite-locations",
          JSON.stringify(this.favoriteLocations)
        );
        this.$store.state.favoriteLocations.favorite = false;
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
    this.locationIsFavorite = this.favoriteLocations.some(
      (location) => location.id === this.$store.state.locationData[0].id
    );
  },
};
</script>
