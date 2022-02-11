// Mixins for VUE

let heightTransition = {
  methods: {
    beforeEnterHeightTransition: function (el) {
      el.style.height = "0";
    },
    enterHeightTransition: function (el) {
      el.style.height = `${el.scrollHeight}px`;
    },
    leaveHeightTransition: function (el) {
      el.style.height = "0";
    },
  },
};
