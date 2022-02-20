import { createStore } from "vuex";

// constants Open Weather - One Call
// const API_URL_OPW_ONE_CALL = "https://api.openweathermap.org/data/2.5/onecall?";
// const OPW_LAT = "lat=";
// const OPW_LON = "&lon=";
// const OPW_UNITS = "&units=";
// const OPW_EXCLUDE = "&exclude=minutely,alerts";
// const OPW_KEY = "&appid=9014bc217533668d1681d0858a1ca241";

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
        current: {
          dt: 0,
          sunrise: 0,
          sunset: 0,
          temp: 0,
          pressure: 0,
          humidity: 0,
          uvi: 0,
          clouds: 0,
          visibility: 0,
          wind_speed: 0,
          wind_deg: 0,
          air_pollution: [
            {
              aqi: 0,
            },
          ],
          weather: [
            {
              id: 0,
              description: "",
              icon: "",
            },
          ],
        },
        hourly: [
          {
            dt: 0,
            temp: 0,
            humidity: 0,
            uvi: 0,
            wind_speed: 0,
            wind_deg: 0,
            weather: [
              {
                id: 0,
                icon: "",
              },
            ],
          },
        ],
        daily: [
          {
            dt: 0,
            sunrise: 0,
            sunset: 0,
            temp: {
              min: 0,
              max: 0,
            },
            weather: [
              {
                id: 0,
                description: "",
                icon: "",
              },
            ],
          },
        ],
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
  mutations: {
    setLocationData(state, payload) {
      state.locationData = payload;
    },
  },
  actions: {
    // TODO obtener lat y lon desde la api de geolocalización en la vista "Search", guardar current lat y lon en el
    //  state.
    // async weatherOneCallFetch({commit}, data) {
    //   try {
    //     const res = await fetch(API_URL_OPW_ONE_CALL + OPW_LAT + )
    //   }
    // }
  },
  modules: {},
});
