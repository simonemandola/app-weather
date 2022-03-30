<template>
  <div class="map point-of-interest">
    <h2 class="subtitle-xs map__title">Sitios de comida a 10 min</h2>
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
  name: "PointOfInterest",
  data() {
    return {
      map: {},
      key: process.env.VUE_APP_KEY_PUBLIC_MAPBOX,
      zoom: 15,
      refMap: "",
      refMarker: "",
      lat: this.$store.state.locationData[0].coord.lat,
      lon: this.$store.state.locationData[0].coord.lon,
      mapStyle: {
        light: "mapbox://styles/mapbox/light-v10",
        dark: "mapbox://styles/mapbox/dark-v10",
      },
      isDarkMode: this.$store.state.isDarkMode,
      colorPoint: {
        blue: "#036ffa",
        purple: "#23165e",
      },
      urlGoogleMaps: "https://www.google.com/maps/search/?api=1&query="
    };
  },
  computed: {
    iconColorMarker() {
      return this.isDarkMode ? "light" : "dark";
    },
    mapStyleColor() {
      return this.isDarkMode ? this.mapStyle.dark : this.mapStyle.light;
    },
    colorCircle() {
      return this.isDarkMode ? this.colorPoint.purple : this.colorPoint.blue;
    },
  },
  methods: {
    async getPointsOfInteres() {
      const res = await fetch(
        `https://api.geoapify.com/v2/place-details?lat=${this.lat}&lon=${this.lon}&features=radius_500,radius_500.restaurant,walk_10,walk_10.restaurant&lang=es&apiKey=9bc29986ad8f47f4b1caf3430faa56b2`
      );
      const result = await res.json();
      const restaurantsPoints = result.features.filter(
        (feature) => feature.geometry.type === "Point"
      );
      // remove previourly added layers and source
      if (this.map.getSource("restaurants")) {
        if (this.map.getLayer("restaurants")) {
          this.map.removeLayer("restaurants");
        }

        if (this.map.getLayer("restaurants")) {
          this.map.removeLayer("restaurants");
        }

        if (this.map.getLayer("restaurants")) {
          this.map.removeLayer("restaurants");
        }

        this.map.removeSource("restaurants");
      }
      const radius500Restaurants = {
        type: "FeatureCollection",
        features: restaurantsPoints,
      };
      this.map.addSource("restaurants", {
        type: "geojson",
        data: radius500Restaurants,
      });
      this.map.addLayer({
        id: "restaurants",
        type: "circle",
        source: "restaurants",
        paint: {
          "circle-radius": 14,
          "circle-color": this.colorCircle,
          "circle-opacity": 0.5,
          "circle-blur": 0,
        },
        filter: ["==", "$type", "Point"],
      });
    },
  },
  mounted() {
    this.refMap = this.$refs.map;
    this.refMarker = this.$refs.marker;
    mapboxgl.accessToken = this.key;
    this.map = new mapboxgl.Map({
      container: this.refMap, // container ref
      style: this.mapStyleColor, // style URL
      center: [this.lon, this.lat], // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });
    this.getPointsOfInteres();
    this.map.on("click", "restaurants", (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const restaurantName = e.features[0].properties.address_line1;
      const restaurantAddress = e.features[0].properties.address_line2;
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(
          `
          <article class="custom-popup">
            <a href="${this.urlGoogleMaps}${restaurantName}" target="_blank">
              <h1 class="text-xs text-black text-bold">${restaurantName}</h1>
            </a>
            <p class="text-xxs text-black">${restaurantAddress}</p>
          </article>
        `
        )
        .addTo(this.map);
    });
    // Add marker to map
    new mapboxgl.Marker(this.refMarker)
      .setLngLat([this.lon, this.lat])
      .addTo(this.map);
  },
};
</script>
