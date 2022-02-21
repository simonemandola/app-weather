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
      <div class="loader" v-if="loader">
        <div class="loader__point"></div>
        <div class="loader__point"></div>
        <div class="loader__point"></div>
      </div>
    </form>
  </main>
</template>

<script>
// components
import Return from "@/components/_return.vue";
import GradientBackground from "@/components/_gradientBackground.vue";

// API Geocoding Mapbox, constants
const API_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const FORMAT = ".json?";
const TOKEN = "access_token=";
const PK =
  "pk.eyJ1Ijoic2ltb25lbWFuZG9sYSIsImEiOiJja3djYTY3cmkzc3dtMzByb2NnaXFqdGd3In0.LkO9Y9a2d2o50nNLp476eQ";
const AUTOCOMPLETE = "&autocomplete=true";
const TYPES = "&types=place";
const LANG = "&language=es";

// constants Open Weather - One Call
const API_URL_OPW_ONE_CALL = "https://api.openweathermap.org/data/2.5/onecall?";
const OPW_LAT = "lat=";
const OPW_LON = "&lon=";
const OPW_UNITS = "&units=";
const OPW_EXCLUDE = "&exclude=minutely,alerts";
const OPW_KEY = "&appid=9014bc217533668d1681d0858a1ca241";

export default {
  name: "Search",
  components: {
    return: Return,
    background: GradientBackground,
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
      minChars: 3,
      suggestions: [],
      loader: false,
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
      this.loader = true;
      try {
        const res = await fetch(
          API_URL_OPW_ONE_CALL +
            OPW_LAT +
            lat +
            OPW_LON +
            lon +
            OPW_UNITS +
            this.$store.state.units.selected +
            OPW_EXCLUDE +
            OPW_KEY
        );
        const data = await res.json();
        // Si no se encontraron coincidencias, crea un nuevo error y muestra un mensaje en la consola
        if (data.daily.length === 0) {
          throw new Error("No se encontró coincidencia de ciudad.");
        } else {
          this.loader = false;
          this.weatherData = data;
          console.log(this.weatherData);
          console.log("todo bien");
        }
      } catch (error) {
        console.warn(error);
      }
    },
    uniqueID(id) {
      this.$store.state.idCounter = id + 1;
      return id;
    },
    setNewData(city) {
      this.$store.state.locationData[0].id = this.uniqueID(
        this.$store.state.idCounter
      );
      this.$store.state.locationData[0].name = city.text;
      this.$store.state.locationData[0].country = city.context[1].short_code;
      this.$store.state.locationData[0].coord.lat = this.weatherData.lat;
      this.$store.state.locationData[0].coord.lon = this.weatherData.lon;
      this.$store.state.locationData[0].current = this.weatherData.current;
      this.$store.state.locationData[0].hourly = this.weatherData.hourly;
      this.$store.state.locationData[0].daily = this.weatherData.daily;
    },
    async showResult(citySelected) {
      this.suggestions = [];
      this.city.value = citySelected.place_name;
      this.city.selected = citySelected.place_name;
      this.locationCoord.lon = citySelected.geometry.coordinates[0];
      this.locationCoord.lat = citySelected.geometry.coordinates[1];
      await this.getWeatherData(this.locationCoord.lat, this.locationCoord.lon);
      await this.setNewData(citySelected);
      this.$router.push({ name: "Home" });
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
