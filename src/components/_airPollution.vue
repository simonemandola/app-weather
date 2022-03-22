<template>
  <div class="air-pollution">
    <h2 class="subtitle-xs air-pollution__title">Calidad del aire</h2>
    <div class="air-pollution__wrap" :class="{ 'dark-mode-card-bg-color': isNight }">
      <div class="air-pollution__bg">
        <div class="air-pollution__color"></div>
        <div class="air-pollution__point" :style="positionPoint"></div>
      </div>
      <p class="text-xs air-pollution__text">{{ airQualityText }}</p>
    </div>
  </div>
</template>

<script>
// constants Open Weather - Air pollution
const API_URL = process.env.VUE_APP_URL_API_AIR_PULLING_MAPBOX;
const LAT = "lat=";
const LON = "&lon=";
const KEY = `&appid=${process.env.VUE_APP_APP_ID_API_OPEN_WEATHER}`;
export default {
  name: "AirPollution",
  data() {
    return {
      currentCoords: {
        lat: 0,
        lon: 0,
      },
      positionPoint: {
        left: "",
      },
      airPollutionData: {},
      airQualityText: "",
      airQuality: [
        "Buena",
        "Razonablemente buena",
        "Moderada",
        "Poco saludable",
        "Muy poco saludable",
      ],
      isNight: this.$store.state.isNight,
    };
  },
  methods: {
    setPointBarPosition() {
      switch (this.airPollutionData.list[0].main.aqi) {
        case 1:
          this.positionPoint.left = "5%";
          this.airQualityText = this.airQuality[0];
          break;
        case 2:
          this.positionPoint.left = "25%";
          this.airQualityText = this.airQuality[1];
          break;
        case 3:
          this.positionPoint.left = "45%";
          this.airQualityText = this.airQuality[2];
          break;
        case 4:
          this.positionPoint.left = "70%";
          this.airQualityText = this.airQuality[3];
          break;
        case 5:
          this.positionPoint.left = "90%";
          this.airQualityText = this.airQuality[4];
          break;
      }
    },
    async getAirPollutionData() {
      try {
        const airPollutionFetch = await fetch(
          API_URL +
            LAT +
            this.currentCoords.lat +
            LON +
            this.currentCoords.lon +
            KEY
        );
        this.airPollutionData = await airPollutionFetch.json();
        this.setPointBarPosition();
      } catch (e) {
        console.warn(e);
      }
    },
  },
  mounted() {
    this.currentCoords.lat = this.$store.state.locationData[0].coord.lat;
    this.currentCoords.lon = this.$store.state.locationData[0].coord.lon;
    this.getAirPollutionData();
  },
};
</script>
