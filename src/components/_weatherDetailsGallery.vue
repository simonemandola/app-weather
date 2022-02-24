<template>
  <div class="weather-details-gallery">
    <div
      class="weather-details-gallery__item"
      v-for="(item, key, i) in images.hits"
      :key="i"
      @click.prevent="viewImage"
    >
      <img :src="item.largeImageURL" :alt="item.tags" />
    </div>
  </div>
</template>

<script>
// Constants
const API_URL = "https://pixabay.com/api/";
const KEY = "?key=25774774-e84e21b133c120ee0a33fc5c7";
const QUERY = "&q=";
const LANG = "&lang=es";
const IMAGE_TYPE = "&image_type=photo";
const SAFESEARCH = "&safesearch=true";
const ORIENTATION = "&orientation=vertical";
const ORDER = "&order=latest";

export default {
  name: "WeatherDetailsGallery",
  data() {
    return {
      images: [],
      queryLocation: this.$store.state.locationData[0].name,
    };
  },
  methods: {
    viewImage(e) {
      console.log(e);
    },
  },
  async mounted() {
    const res = await fetch(
      API_URL +
        KEY +
        QUERY +
        this.queryLocation +
        LANG +
        IMAGE_TYPE +
        SAFESEARCH +
        ORIENTATION +
        ORDER +
        "&per_page=4"
    );
    this.images = await res.json();
  },
};
</script>
