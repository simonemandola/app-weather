// Mixins for VUE

// let heightTransition = {
//   methods: {
//     beforeEnterHeightTransition: function (el) {
//       el.style.height = "0";
//     },
//     enterHeightTransition: function (el) {
//       el.style.height = `${el.scrollHeight}px`;
//     },
//     leaveHeightTransition: function (el) {
//       el.style.height = "0";
//     },
//   },
// };

export const addZeroToNumberIfSmallerThenTen = (myNumber) => {
  return myNumber < 10 ? `0${myNumber.toString()}` : myNumber;
};

/*
  Field validations
 */

export const isEmpty = (value) => {
  return !value || value.toString().trim().length === 0;
};

export const areEqual = (valueA, valueB) => {
  return valueA === valueB;
};

/***
 * Toggle mode
 */

export const toggleMode = {
  created() {
    if (this.$store.state.isDarkMode) {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    }
  },
};

/***
 * Search with voice
 */

export const searchLocationWithVoice = {
  data() {
    return {
      city: {
        selected: "",
        value: "",
      },
      cityRecordered: "",
    };
  },
  methods: {
    searchWithVoice() {},
  },
};

/**
 *
 * Function that returns a date according to the format of the application.
 * @param {number | string} myDate  date to work with
 * @param {string} language user's app language, ex: "es"
 * @return {string} Ex-short: "Viernes 27 Enero"
 */
export const getCardFormatDateLong = (myDate, language = "es") => {
  const date = new Date(myDate);
  const weekDay = date
    .toLocaleDateString(language, {
      weekday: "long",
    })
    .replace(/^\w/, (c) => c.toUpperCase());
  const day = date.toLocaleDateString(language, {
    day: "numeric",
  });
  const month = date
    .toLocaleDateString(language, {
      month: "long",
    })
    .replace(/^\w/, (c) => c.toUpperCase());
  return `${weekDay} ${day} de ${month}`;
};
