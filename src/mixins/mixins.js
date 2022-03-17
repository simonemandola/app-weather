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
}

/*
  Field validations
 */

export const isEmpty = (value) => {
  return !value || value.toString().trim().length === 0;
};

export const areEqual = (valueA, valueB) => {
  return valueA === valueB;
};