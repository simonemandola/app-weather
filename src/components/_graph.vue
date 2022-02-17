<template>
  <div class="mt-8">
    <apexchart
      type="area"
      :height="heightGraph"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "Graph",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      heightGraph: 256,
      series: [
        {
          name: "series1",
          data: [38, 40, 38, 39, 42, 45, 40],
        },
      ],
      chartOptions: {
        chart: {
          type: "area",
          fontFamily: "Telegraf, sans-serif",
          foreColor: "#ffffff",
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
        },
        xaxis: {
          type: "datetime",
          categories: [
            "2018-09-19T00:00:00.000Z",
            "2018-09-19T01:30:00.000Z",
            "2018-09-19T02:30:00.000Z",
            "2018-09-19T03:30:00.000Z",
            "2018-09-19T04:30:00.000Z",
            "2018-09-19T05:30:00.000Z",
            "2018-09-19T06:30:00.000Z",
          ],
        },
        tooltip: {
          enabled: false,
        },
      },
    };
  },
};
</script>
