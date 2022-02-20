import { createStore } from "vuex";

export default createStore({
  state: {
    idCounter: 0,
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
  },
  mutations: {},
  actions: {},
  modules: {},
});
