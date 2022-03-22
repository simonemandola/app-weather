<template>
  <div>
    <div class="screensplash">
      <img src="/img/weather-status/icons/dark/02d.svg" alt="icon app" />
      <p class="text-center text-s text-bold">Weather APP</p>
    </div>
    <geolocation-error :show-geolocation-error="showGeolocationError" />
  </div>
</template>

<script>
import GeolocationError from "@/components/_geolocationError.vue";

// mixins
import { isNight } from "@/mixins/mixins";

// API Geocoding Mapbox, constants
const API_URL = process.env.VUE_APP_URL_API_GEOCODING_MAPBOX;
const FORMAT = ".json?";
const TOKEN = "access_token=";
const PK = process.env.VUE_APP_KEY_PUBLIC_MAPBOX;
const TYPES = "&types=place,country";

// constants Open Weather - One Call
const API_URL_OPW_ONE_CALL = process.env.VUE_APP_URL_API_OPEN_WEATHER_ONE_CALL;
const OPW_LAT = "lat=";
const OPW_LON = "&lon=";
const OPW_UNITS = "&units=";
const OPW_LANG = "&lang=es";
const OPW_EXCLUDE = "&exclude=minutely";
const OPW_KEY = `&appid=${process.env.VUE_APP_APP_ID_API_OPEN_WEATHER}`;
export default {
  name: "Screensplash",
  components: {
    geolocationError: GeolocationError,
  },
  data() {
    return {
      currentPosition: {
        lat: 0,
        lon: 0,
      },
      weatherData: [],
      showGeolocationError: false,
      geolocationOptions: {
        enableHighAccuracy: true,
        timeout: 8000,
      },
    };
  },
  methods: {
    async getGeocoding(lon, lat) {
      this.suggestions = [];
      try {
        const res = await fetch(
          API_URL + lon + "," + lat + FORMAT + TOKEN + PK + TYPES
        );
        const data = await res.json();
        this.$store.state.locationData[0].name = data.features[0].text;
        this.$store.state.locationData[0].country =
          data.features[1].properties.short_code;
      } catch (error) {
        console.warn(error);
      }
    },
    async getWeatherData(lat, lon) {
      try {
        const res = await fetch(
          API_URL_OPW_ONE_CALL +
            OPW_LAT +
            lat +
            OPW_LON +
            lon +
            OPW_UNITS +
            this.$store.state.units.selected +
            OPW_LANG +
            OPW_EXCLUDE +
            OPW_KEY
        );
        this.weatherData = await res.json();
        console.log("Current weather data downloaded successfully!");
        console.log(this.weatherData);
      } catch (error) {
        console.warn(error);
      }
    },
    isNightCurrentDate() {
      return isNight(
        this.weatherData.current.dt,
        this.weatherData.current.sunset
      );
    },
    setNewData() {
      this.$store.state.locationData[0].coord.lat = this.currentPosition.lat;
      this.$store.state.locationData[0].coord.lon = this.currentPosition.lon;
      this.$store.state.locationData[0].id =
        this.$store.state.locationData[0].coord.lat.toString() +
        this.$store.state.locationData[0].coord.lon.toString();
      this.$store.state.locationData[0].current = this.weatherData.current;
      this.$store.state.locationData[0].hourly = this.weatherData.hourly;
      this.$store.state.locationData[0].daily = this.weatherData.daily;
      this.$store.state.locationData[0].favorite = false;
      this.$store.state.locationData[0].alerts = this.weatherData.alerts;
      this.$store.state.locationData[0].timeZoneOffset =
        this.weatherData.timezone_offset;
      // Check if is night or day
      this.$store.state.isNight = this.isNightCurrentDate();
      console.log(this.$store.state.isNight);
    },
    async showResult() {
      await this.getWeatherData(
        this.currentPosition.lat,
        this.currentPosition.lon
      );
      await this.getGeocoding(this.weatherData.lon, this.weatherData.lat);
      await this.setNewData();
      setTimeout(() => {
        this.$router.push({ name: "Home", query: { active: "home" } });
      }, 1200);
    },
    getPosition(position) {
      this.currentPosition.lat = position.coords.latitude;
      this.currentPosition.lon = position.coords.longitude;
      this.showResult();
    },
    geolocationError(error) {
      if (error) {
        console.log(error);
        this.showGeolocationError = true;
      }
    },
  },
  async created() {
    window.localStorage.removeItem("user-weather-data");
    navigator.geolocation.getCurrentPosition(
      this.getPosition,
      this.geolocationError,
      this.geolocationOptions
    );
  },
};
</script>
