<template>
  <div class="error-notification" v-if="showError">
    <transition-group tag="ul" name="slide-down">
      <li v-for="(error, i) in errorsMessages" :key="i">
        <span class="text-xs text-white">{{ error }}</span>
        <i class="icon__alert text-white"></i>
      </li>
    </transition-group>
  </div>
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
