<template>
  <div>
    <main-background />
    <div class="screensplash">
      <img src="/img/weather-status/icons/02d.svg" alt="icon app" />
      <p class="text-center text-s">Weather APP</p>
    </div>
  </div>
</template>

<script>
// components
import MainBackground from "@/components/_mainBackground.vue";

// API get IP address
const API_IP_URL = "https://api.ipgeolocation.io/ipgeo?";
const API_KEY_IP = "apiKey=4f48c9c8d5a242deabd6962ffcecbf36";

// API Geocoding Mapbox, constants
const API_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const FORMAT = ".json?";
const TOKEN = "access_token=";
const PK =
  "pk.eyJ1Ijoic2ltb25lbWFuZG9sYSIsImEiOiJja3djYTY3cmkzc3dtMzByb2NnaXFqdGd3In0.LkO9Y9a2d2o50nNLp476eQ";
const TYPES = "&types=place,country";

// constants Open Weather - One Call
const API_URL_OPW_ONE_CALL = "https://api.openweathermap.org/data/2.5/onecall?";
const OPW_LAT = "lat=";
const OPW_LON = "&lon=";
const OPW_UNITS = "&units=";
const OPW_LANG = "&lang=es";
const OPW_EXCLUDE = "&exclude=minutely,alerts";
const OPW_KEY = "&appid=9014bc217533668d1681d0858a1ca241";
export default {
  name: "Screensplash",
  components: {
    mainBackground: MainBackground,
  },
  data() {
    return {
      currentPosition: {
        lat: 0,
        lon: 0,
      },
      weatherData: [],
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
        console.log("Weather data getted successfully!");
      } catch (error) {
        console.warn(error);
      }
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
    },
    async showResult() {
      await this.getWeatherData(
        this.currentPosition.lat,
        this.currentPosition.lon
      );
      await this.getGeocoding(this.weatherData.lon, this.weatherData.lat);
      await this.setNewData();
      setTimeout(() => {
        this.$router.push({ name: "Home" });
      }, 1500);
    },
    async getIpAddress() {
      const res = await fetch(API_IP_URL + API_KEY_IP);
      const data = await res.json();
      this.currentPosition.lat = data.latitude;
      this.currentPosition.lon = data.longitude;
    },
  },
  async created() {
    window.localStorage.removeItem("user-weather-data");
    await this.getIpAddress();
    await this.showResult();
  },
};
</script>
