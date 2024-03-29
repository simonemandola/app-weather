<template>
  <section :class="{ 'show-background': showFormBackground }">
    <form @submit.prevent class="search-form">
      <label>
        <i class="icon__location"></i>
        <input type="search" :placeholder="placeholder" v-model="city.value" />
        <button
          v-if="speechRecSupported"
          class="search-form__icon-mic"
          type="button"
          @click.prevent="activeSearchByVoice"
          title="Buscar con voz"
        >
          <i ref="icon-mic" class="icon__mic"></i>
        </button>
      </label>
      <Transition name="fade-in">
        <ul class="search-form__suggestions" v-if="suggestions.length > 0">
          <li
            v-for="(suggestion, key) in suggestions"
            :key="key"
            @click.prevent="showResult(suggestion)"
          >
            {{ suggestion.place_name }}
          </li>
        </ul>
      </Transition>
    </form>
  </section>
</template>

<script>
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
  emits: ["reRenderAndSetNewData"],
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
  computed: {
    showFormBackground() {
      return !!this.city.value;
    },
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
      this.$store.state.showLoading = true;
      this.suggestions = [];
      this.city.value = citySelected.place_name;
      this.city.selected = citySelected.place_name;
      this.locationCoord.lon = citySelected.geometry.coordinates[0];
      this.locationCoord.lat = citySelected.geometry.coordinates[1];
      await this.getWeatherData(this.locationCoord.lat, this.locationCoord.lon);
      await this.setNewData(citySelected);
      window.localStorage.removeItem("user-weather-data");
      await this.$nextTick(() => {
        this.$store.state.showLoading = false;
      });
      if (this.$route.name === "Home") {
        // clear input field
        this.city.value = this.city.selected = "";
        this.$emit("reRenderAndSetNewData", true);
      } else {
        await this.$router.push({ name: "Home", query: { active: "home" } });
      }
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
