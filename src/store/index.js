import { createStore } from "vuex";

export default createStore({
  state: {
    isMobile: false,
    isDarkMode: true,
    showLoading: false,
    previousData: {
      id: "",
    },
    previuosLocationId: "",
    locationData: [
      {
        alerts: [],
        id: "",
        name: "",
        country: "",
        coord: {
          lat: 0,
          lon: 0,
        },
        timeZoneOffset: 0,
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
    user: {
      isLogged: false,
      favoriteLocations: [],
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
