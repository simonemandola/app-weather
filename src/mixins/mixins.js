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

export const isNight = (date, sunsetDate) => {
  return date > sunsetDate;
};

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
    if (this.$store.state.isNight) {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    }
  },
}
