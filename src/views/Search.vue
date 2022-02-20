<template>
  <main>
    <background />
    <return :title="title" />
    <form @submit.prevent class="search-form">
      <label>
        <i class="icon__location"></i>
        <input type="search" :placeholder="placeholder" v-model="city.value" />
      </label>
      <div class="search-form__suggestions" v-if="suggestions.length !== 0">
        <ul>
          <li
            v-for="(suggestion, key, i) in suggestions"
            :key="key"
            @click.prevent="showResult(suggestions.features[i])"
          >
            {{ suggestions.features[i].place_name }}
          </li>
        </ul>
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
      minChars: 3,
      suggestions: [],
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
          throw "New error";
        } else {
          this.suggestions = await data;
        }
      } catch (error) {
        console.warn("No se encontraron coincidencias.");
      }
    },
    showResult(value) {
      this.city.value = value.place_name;
      this.city.selected = value.place_name;
      this.$store.state.locationData[0].coord.lon =
        value.geometry.coordinates[0];
      this.$store.state.locationData[0].coord.lat =
        value.geometry.coordinates[1];
      this.$router.push({ name: "Home" });
    },
  },
  watch: {
    city: {
      handler(newValue) {
        if (
          newValue.value.length > this.minChars &&
          newValue.value.length !== this.city.selected
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
