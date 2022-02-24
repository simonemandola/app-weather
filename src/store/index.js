import { createStore } from "vuex";

export default createStore({
  state: {
    units2: "celsius",
    locationData: [
      {
        id: 0,
        name: "",
        country: "",
        coord: {
          lat: 0,
          lon: 0,
        },
        current: {},
        hourly: [],
        daily: [],
      },
    ],
    units: {
      selected: "metric",
      celsius: {
        name: "celsius",
        value: "metric",
      },
      farenheit: {
        name: "farenheit",
        value: "imperial",
      },
    },
    favoriteLocations: [],
  },
  mutations: {},
  actions: {},
  modules: {},
});
