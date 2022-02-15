<template>
  <div class="return">
    <button type="button" class="return__btn" @click.prevent="goBack">
      <i class="icon__return"></i>
    </button>
    <p class="return__title text-white" v-if="title">{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: "Return",
  props: {
    title: String,
  },
  methods: {
    goBack() {
      return this.$router.go(-1);
    },
  },
};
</script>
