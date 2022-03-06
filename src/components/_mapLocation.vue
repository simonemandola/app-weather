<template>
  <div class="map" ref="map">
    <div class="marker" ref="marker">
      <i
        class="icon__location"
        :class="{ 'text-grey': !isNightCurrentDate }"
      ></i>
    </div>
  </div>
</template>

<script>
// mapbox
import mapboxgl from "mapbox-gl";

// mixins
import { isNight } from "@/mixins/mixins.js";

export default {
  name: "MapLocation",
  data() {
    return {
      map: {},
      key: "pk.eyJ1Ijoic2ltb25lbWFuZG9sYSIsImEiOiJja3djYTY3cmkzc3dtMzByb2NnaXFqdGd3In0.LkO9Y9a2d2o50nNLp476eQ",
      zoom: 12,
      refMap: "",
      refMarker: "",
      lat: this.$store.state.locationData[0].coord.lat,
      lon: this.$store.state.locationData[0].coord.lon,
      mapStyle: {
        light: "mapbox://styles/mapbox/light-v10",
        dark: "mapbox://styles/mapbox/dark-v10",
      },
    };
  },
  computed: {
    isNightCurrentDate() {
      const currentDate = this.$store.state.locationData[0].current.dt;
      const sunset = this.$store.state.locationData[0].current.sunset;
      return isNight(currentDate, sunset);
    },
  },
  mounted() {
    this.refMap = this.$refs.map;
    this.refMarker = this.$refs.marker;
    mapboxgl.accessToken = this.key;
    this.map = new mapboxgl.Map({
      container: this.refMap, // container ref
      style: this.isNightCurrentDate ? this.mapStyle.dark : this.mapStyle.light, // style URL
      center: [this.lon, this.lat], // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });
    // Add marker to map
    new mapboxgl.Marker(this.refMarker)
      .setLngLat([this.lon, this.lat])
      .addTo(this.map);
  },
};
</script>
