<template>
  <transition name="slide-down">
    <div
      class="error-notification"
      v-if="showError"
      v-touch:swipe.top="hideNotification"
    >
      <ul>
        <li v-for="(error, i) in errorsMessages" :key="i">
          <span class="text-xs text-white">{{ error }}</span>
          <i class="icon__alert text-white"></i>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ErrorNotification",
  props: {
    showError: {
      type: Boolean,
      default: false,
    },
    errorsMessages: Array,
  },
  methods: {
    hideNotification() {
      this.$emit("hideNotification", false);
    },
  },
  watch: {
    showError() {
      if (this.showError)
        setTimeout(() => {
          this.hideNotification();
        }, 3000);
    },
  },
};
</script>
