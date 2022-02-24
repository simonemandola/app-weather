<template>
  <main>
    <background />
    <return :title="'Detalles'" :location="locationInfo" />
    <div class="weather-details">
      <card
        :location-name="weatherData.name"
        :weather-description="weatherData.current.weather[0].description"
        :temperature="weatherData.current.temp"
        :wind-speed="weatherData.current.wind_speed"
        :humidity="weatherData.current.humidity"
      />
      <v-apexchart />
      <w-table-hour />
      <w-gallery />
    </div>
    <bottom-menu />
  </main>
</template>

<script>
// components
import GradientBackground from "@/components/_gradientBackground.vue";
import Return from "@/components/_return.vue";
import Card from "@/components/_card.vue";
import WeatherTableHour from "@/components/_weatherDetailsTableHour.vue";
import WeatherDetailsGallery from "@/components/_weatherDetailsGallery.vue";
import BottomMenuFixed from "@/components/_bottomMenuFixed.vue";

// graph
import Graph from "@/components/_graph.vue";

export default {
  name: "WeatherDetails",
  components: {
    background: GradientBackground,
    return: Return,
    card: Card,
    bottomMenu: BottomMenuFixed,
    vApexchart: Graph,
    wTableHour: WeatherTableHour,
    wGallery: WeatherDetailsGallery,
  },
  data() {
    return {
      country: "",
      location: "",
      locationInfo: "",
      weatherData: this.$store.state.locationData[0],
    };
  },
  mounted() {
    console.log(this.weatherData);
    window.scrollTo(0, 0);
    this.country =
      this.$store.state.locationData[0].country.toLocaleUpperCase();
    this.location = this.$store.state.locationData[0].name;
    this.locationInfo = `${this.location}, ${this.country}`;
  },
};
</script>
