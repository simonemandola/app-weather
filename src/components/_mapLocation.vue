<template>
  <div class="map" ref="map">
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
      key: "pk.eyJ1Ijoic2ltb25lbWFuZG9sYSIsImEiOiJja3djYTY3cmkzc3dtMzByb2NnaXFqdGd3In0.LkO9Y9a2d2o50nNLp476eQ",
      zoom: 12,
      refMap: "",
      lat: this.$store.state.locationData[0].coord.lat,
      lon: this.$store.state.locationData[0].coord.lon,
    };
  },
  mounted() {
    this.refMap = this.$refs.map;
    mapboxgl.accessToken = this.key;
    this.map = new mapboxgl.Map({
      container: this.refMap, // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [this.lon, this.lat], // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });
  },
};
</script>
