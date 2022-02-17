<template>
  <div class="return" :style="backgroundStyle">
    <button type="button" class="return__btn" @click.prevent="goBack">
      <i class="icon__return"></i>
    </button>
    <p class="return__title text-s text-white" v-if="title">
      {{ title }}
      <span class="text-xxs" v-if="location">{{ location }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "Return",
  props: {
    title: String,
    location: String,
  },
  data() {
    return {
      scrollY: 0,
      backgroundStyle: {
        backgroundColor: "#ffffff40",
      },
    };
  },
  methods: {
    goBack() {
      return this.$router.go(-1);
    },
  },
};
</script>
