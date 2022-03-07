<template>
  <transition name="slide-down">
    <div
      class="notification"
      v-if="showNotification"
      v-touch:swipe.top="hideNotification"
    >
      <ul>
        <li v-for="(notification, i) in notificationsMessages" :key="i">
          <span class="text-xs text-white">{{ notification }}</span>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
export default {
  name: "NotificationMessage",
  emits: ["hideNotification"],
  props: {
    showNotification: Boolean,
    notificationsMessages: Array,
  },
  methods: {
    hideNotification() {
      this.$emit("hideNotification", false);
    },
  },
  watch: {
    showNotification(newValue) {
      if (newValue)
        setTimeout(() => {
          this.hideNotification();
        }, 2500);
    },
  },
};
</script>
