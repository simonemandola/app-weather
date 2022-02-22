<template>
  <div>
    <div class="main-background" :style="{ filter: 'hue-rotate(' + hueRotate + 'deg)' }"></div>
  </div>
</template>

<script>
export default {
  name: "MainBackground",
  data() {
    return {
      min: 0,
      max: 90,
      hueRotate: 0,
    };
  },
  methods: {
    randomX() {
      return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min; // Número random entre dos valores
    },
  },
  created() {
    this.hueRotate = this.randomX();
  },
};
</script>
