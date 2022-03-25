<template>
  <div class="custom-apexchart">
    <h2 class="subtitle-xs custom-apexchart__title">Gráfico de temperatura</h2>
    <apexchart
      class="custom-apexchart__wrap-chart"
      type="area"
      :height="heightGraph"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

let temperatureArray = [];
let hoursArray = [];

export default {
  name: "Graph",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      weatherData: this.$store.state.locationData[0],
      watcherDate: this.$store.state.locationData[0].coord.lat,
      limitHourToShow: 8,
      heightGraph: 256,
      series: [
        {
          name: "Temperature",
          data: temperatureArray,
        },
      ],
      chartOptions: {
        chart: {
          offsetY: 0,
          offsetX: -6,
          type: "column",
          fontFamily: "Niramit, sans-serif",
          foreColor: "#202020",
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          width: 1.5,
          colors: [this.colorBlack],
          lineCap: "round",
        },
        fill: {
          colors: ["#c76e26", "#6aa79f"],
        },
        xaxis: {
          type: "string",
          categories: hoursArray,
          labels: {
            offsetY: 5,
          },
        },
        tooltip: {
          enabled: false,
        },
      },
      colorWhite: "#f5f5f5",
      colorBlack: "#202020",
    };
  },
  methods: {
    setGraphData() {
      if (hoursArray.length > 0 || temperatureArray.length > 0) {
        hoursArray = [];
        temperatureArray = [];
      }
      this.weatherData.hourly.filter((hour, i) => {
        if (i < this.limitHourToShow) {
          hoursArray.push(hour.dt);
          temperatureArray.push(hour.temp);
        }
      });
    },
  },
  mounted() {
    this.$store.state.isDarkMode
      ? (this.chartOptions.chart.foreColor = this.colorWhite)
      : (this.chartOptions.chart.foreColor = this.colorBlack);
    this.setGraphData();
  },
  watch: {
    watcherDate(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.weatherData = this.$store.state.locationData[0];
        this.setGraphData();
      }
    },
  },
};
</script>
