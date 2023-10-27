<template>
  <div class="map">
    <h2 class="subtitle-xs map__title">Mapa</h2>
    <div
      class="map__map"
      :class="{ 'dark-mode-card-bg-color': isDarkMode }"
      ref="map"
    >
      <div class="marker" ref="marker">
        <i class="icon__location" :class="iconColorMarker"></i>
      </div>
    </div>
  </div>
</template>

<script>
// mapbox
import mapboxgl from "mapbox-gl";

export default {
  name: "MapLocation",
  data() {
    return {
      map: {},
      key: process.env.VUE_APP_KEY_PUBLIC_MAPBOX,
      zoom: 12,
      refMap: "",
      refMarker: "",
      lat: this.$store.state.locationData[0].coord.lat,
      lon: this.$store.state.locationData[0].coord.lon,
      mapStyle: {
        light: "mapbox://styles/mapbox/light-v10",
        dark: "mapbox://styles/mapbox/dark-v10",
      },
      isDarkMode: this.$store.state.isDarkMode,
    };
  },
  computed: {
    iconColorMarker() {
      return this.isDarkMode ? "light" : "dark";
    },
    mapStyleColor() {
      return this.isDarkMode ? this.mapStyle.dark : this.mapStyle.light;
    },
  },
  methods: {
    setMapLocation() {
      this.refMap = this.$refs.map;
      this.refMarker = this.$refs.marker;
      mapboxgl.accessToken = this.key;
      this.map = new mapboxgl.Map({
        container: this.refMap, // container ref
        style: this.mapStyleColor, // style URL
        center: [this.lon, this.lat], // starting position [lng, lat]
        zoom: this.zoom, // starting zoom
      });
      // Add marker to map
      new mapboxgl.Marker(this.refMarker)
        .setLngLat([this.lon, this.lat])
        .addTo(this.map);
    },
  },
  mounted() {
    this.setMapLocation();
  },
};
</script>
