<template>
  <main>
    <background />
    <return :title="title" />
    <form @submit.prevent class="search-form">
      <label>
        <i class="icon__location"></i>
        <input type="search" :placeholder="placeholder" v-model="city.value" />
      </label>
      <div class="search-form__suggestions" v-if="suggestions.length > 0">
        <ul>
          <li
            v-for="(suggestion, key) in suggestions"
            :key="key"
            @click.prevent="showResult(suggestion)"
          >
            {{ suggestion.place_name }}
          </li>
        </ul>
      </div>
      <loading :show-loading="showLoading" />
    </form>
    <bottom-menu />
  </main>
</template>

<script>
// components
import Return from "@/components/_return.vue";
import GradientBackground from "@/components/_gradientBackground.vue";
import Loading from "@/components/_loading.vue";
import BottomMenuFixed from "@/components/_bottomMenuFixed.vue";

// API Geocoding Mapbox, constants
const API_URL = process.env.VUE_APP_URL_API_GEOCODING_MAPBOX;
const FORMAT = ".json?";
const TOKEN = "access_token=";
const PK = process.env.VUE_APP_KEY_PUBLIC_MAPBOX;
const AUTOCOMPLETE = "&autocomplete=true";
const TYPES = "&types=place";
const LANG = "&language=es";

// constants Open Weather - One Call
const API_URL_OPW_ONE_CALL = process.env.VUE_APP_URL_API_OPEN_WEATHER_ONE_CALL;
const OPW_LAT = "lat=";
const OPW_LON = "&lon=";
const OPW_UNITS = "&units=";
const OPW_LANG = "&lang=es";
const OPW_EXCLUDE = "&exclude=minutely";
const OPW_KEY = `&appid=${process.env.VUE_APP_APP_ID_API_OPEN_WEATHER}`;

export default {
  name: "Search",
  components: {
    return: Return,
    background: GradientBackground,
    loading: Loading,
    bottomMenu: BottomMenuFixed,
  },
  data() {
    return {
      title: "Buscar",
      placeholder: "Introduce una ciudad...",
      city: {
        selected: "",
        value: "",
      },
      locationCoord: {
        lon: 0,
        lat: 0,
      },
      minChars: 2,
      suggestions: [],
      showLoading: false,
      weatherData: [],
    };
  },
  methods: {
    async getGeocoding() {
      this.suggestions = [];
      try {
        const res = await fetch(
          API_URL +
            this.city.value +
            FORMAT +
            TOKEN +
            PK +
            AUTOCOMPLETE +
            TYPES +
            LANG
        );
        const data = await res.json();
        // Si no se encontraron coincidencias, crea un nuevo error y muestra un mensaje en la consola
        if (data.features.length === 0) {
          throw new Error("No se encontraron coincidencias.");
        } else {
          this.suggestions = data.features;
        }
      } catch (error) {
        console.warn(error);
      }
    },
    async getWeatherData(lat, lon) {
      this.suggestions = [];
      this.showLoading = true;
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
        const data = await res.json();
        // Si no se encontraron coincidencias, crea un nuevo error y muestra un mensaje en la consola
        if (data.daily.length === 0) {
          throw new Error("No se encontró coincidencia de ciudad.");
        } else {
          this.showLoading = false;
          this.weatherData = data;
          console.log(this.weatherData);
        }
      } catch (error) {
        console.warn(error);
      }
    },
    setNewData(city) {
      this.$store.state.locationData[0].name = city.text;
      console.log(city);
      this.$store.state.locationData[0].country =
        city.context[0].short_code ?? city.context[1].short_code;
      this.$store.state.locationData[0].coord.lat = this.weatherData.lat;
      this.$store.state.locationData[0].coord.lon = this.weatherData.lon;
      this.$store.state.locationData[0].id =
        this.$store.state.locationData[0].coord.lat.toString() +
        this.$store.state.locationData[0].coord.lon.toString();
      this.$store.state.locationData[0].current = this.weatherData.current;
      this.$store.state.locationData[0].hourly = this.weatherData.hourly;
      this.$store.state.locationData[0].daily = this.weatherData.daily;
      this.$store.state.locationData[0].alerts = this.weatherData.alerts;
    },
    async showResult(citySelected) {
      this.suggestions = [];
      this.city.value = citySelected.place_name;
      this.city.selected = citySelected.place_name;
      this.locationCoord.lon = citySelected.geometry.coordinates[0];
      this.locationCoord.lat = citySelected.geometry.coordinates[1];
      await this.getWeatherData(this.locationCoord.lat, this.locationCoord.lon);
      await this.setNewData(citySelected);
      window.localStorage.removeItem("user-weather-data");
      this.$router.push({ name: "Home", query: { active: "home" } });
    },
  },
  watch: {
    city: {
      handler(newValue) {
        if (
          newValue.value.length > this.minChars &&
          newValue.value !== this.city.selected
        ) {
          this.getGeocoding();
        } else {
          this.suggestions = [];
        }
      },
      deep: true,
    },
  },
};
</script>
