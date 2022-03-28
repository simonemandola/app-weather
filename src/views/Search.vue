<template>
  <section>
    <background />
    <return :title="title" />
    <form @submit.prevent class="search-form">
      <label>
        <i class="icon__location"></i>
        <input type="search" :placeholder="placeholder" v-model="city.value" />
        <button
          v-if="speechRecSupported"
          class="search-form__icon-mic"
          type="button"
          @click.prevent="activeSearchByVoice"
        >
          <i ref="icon-mic" class="icon__mic"></i>
        </button>
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
      <div v-if="isRecording" class="wave-recording">
        <svg
          class="wave-recording__wave"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 38.05"
        >
          <title>Audio Wave</title>
          <path
            id="Line_1"
            data-name="Line 1"
            d="M0.91,15L0.78,15A1,1,0,0,0,0,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H0.91Z"
          />
          <path
            id="Line_2"
            data-name="Line 2"
            d="M6.91,9L6.78,9A1,1,0,0,0,6,10V28a1,1,0,1,0,2,0s0,0,0,0V10A1,1,0,0,0,7,9H6.91Z"
          />
          <path
            id="Line_3"
            data-name="Line 3"
            d="M12.91,0L12.78,0A1,1,0,0,0,12,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H12.91Z"
          />
          <path
            id="Line_4"
            data-name="Line 4"
            d="M18.91,10l-0.12,0A1,1,0,0,0,18,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H18.91Z"
          />
          <path
            id="Line_5"
            data-name="Line 5"
            d="M24.91,15l-0.12,0A1,1,0,0,0,24,16v6a1,1,0,0,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H24.91Z"
          />
          <path
            id="Line_6"
            data-name="Line 6"
            d="M30.91,10l-0.12,0A1,1,0,0,0,30,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H30.91Z"
          />
          <path
            id="Line_7"
            data-name="Line 7"
            d="M36.91,0L36.78,0A1,1,0,0,0,36,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H36.91Z"
          />
          <path
            id="Line_8"
            data-name="Line 8"
            d="M42.91,9L42.78,9A1,1,0,0,0,42,10V28a1,1,0,1,0,2,0s0,0,0,0V10a1,1,0,0,0-1-1H42.91Z"
          />
          <path
            id="Line_9"
            data-name="Line 9"
            d="M48.91,15l-0.12,0A1,1,0,0,0,48,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H48.91Z"
          />
        </svg>
      </div>
      <loading :show-loading="showLoading" />
    </form>
  </section>
</template>

<script>
// components
import Return from "@/components/_return.vue";
import GradientBackground from "@/components/_gradientBackground.vue";
import Loading from "@/components/_loading.vue";

// mixins
import { toggleMode } from "@/mixins/mixins";

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
  mixins: [toggleMode],
  components: {
    return: Return,
    background: GradientBackground,
    loading: Loading,
  },
  data() {
    return {
      title: "Buscar",
      placeholder: "¿Qué tiempo hace en...",
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
      cityRecordered: "",
      speechRecSupported: true,
      timeoutSpeechRec: 8000,
      isRecording: false,
    };
  },
  methods: {
    activeSearchByVoice() {
      this.isRecording = true;
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      const that = this;
      function recordingUserWord(e) {
        this.cityRecordered = e.results[e.results.length - 1][0].transcript;
        that.city.value = this.cityRecordered;
      }
      if (this.$refs["icon-mic"].classList.contains("recording-anim")) {
        this.$refs["icon-mic"].classList.remove("recording-anim");
        rec.stop();
      } else {
        this.$refs["icon-mic"].classList.add("recording-anim");
        rec.lang = "es-ES";
        rec.continuous = true;
        rec.interim = true;
        rec.addEventListener("result", recordingUserWord);
        rec.start();
        setTimeout(() => {
          this.$refs["icon-mic"].classList.remove("recording-anim");
          rec.stop();
          this.isRecording = false;
        }, this.timeoutSpeechRec);
      }
    },
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
          throw new Error("No city matches found.");
        } else {
          this.suggestions = data.features;
        }
      } catch (error) {
        console.warn(error);
      }
    },
    async getWeatherData(lat, lon) {
      this.showLoading = true;
      this.suggestions = [];
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
          throw new Error("No city match found.");
        } else {
          this.weatherData = data;
        }
      } catch (error) {
        console.warn(error);
      }
    },
    setNewData(city) {
      this.$store.state.locationData[0].name = city.text;
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
      this.$store.state.locationData[0].timeZoneOffset =
        this.weatherData.timezone_offset;
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
  mounted() {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      console.log("SpeechRecognition is supported.");
    } else {
      console.log("SpeechRecognition not supported.");
      this.speechRecSupported = false;
    }
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
