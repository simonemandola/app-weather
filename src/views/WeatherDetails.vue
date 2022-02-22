<template>
  <main>
    <background />
    <return :title="'Detalles'" :location="locationInfo" />
    <div class="weather-details">
      <card />
      <v-apexchart />
      <w-table-hour />
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
  },
  data() {
    return {
      country: "",
      location: "",
      locationInfo: "",
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    this.country =
      this.$store.state.locationData[0].country.toLocaleUpperCase();
    this.location = this.$store.state.locationData[0].name;
    this.locationInfo = `${this.location}, ${this.country}`;
  },
};
</script>
