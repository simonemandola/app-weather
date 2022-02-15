<template>
  <main>
    <background />
    <return :title="title" />
    <nav class="settings container">
      <ul>
        <li class="settings__row">
          <span class="settings__item-title text-white">{{ units }}</span>
          <form class="settings__options">
            <label class="settings__wrap-option">
              <span class="settings__option-label text-white"
                >{{ unitsOptions.celsius.value }}º</span
              >
              <input
                class="settings__input toggle text-white"
                type="checkbox"
                @change="doSelect($event.target.checked)"
              />
              <span class="settings__option-label text-white"
                >{{ unitsOptions.farenheit.value }}º</span
              >
            </label>
          </form>
        </li>
      </ul>
    </nav>
    <p class="text-xxs version-text text-white">Version 1.0</p>
  </main>
</template>

<script>
// components
import Return from "@/components/_return.vue";
import GradientBackground from "@/components/_gradientBackground.vue";

export default {
  name: "Settings",
  components: {
    return: Return,
    background: GradientBackground,
  },
  data() {
    return {
      title: "Ajustes",
      units: this.$store.state.units,
      unitsOptions: {
        celsius: {
          name: "celsius",
          value: "c",
        },
        farenheit: {
          name: "farenheit",
          value: "f",
        },
      },
    };
  },
  methods: {
    doSelect(checked) {
      if (checked) {
        this.$store.state.units = this.unitsOptions.farenheit.name;
        this.units = this.unitsOptions.farenheit.name;
      } else {
        this.$store.state.units = this.unitsOptions.celsius.name;
        this.units = this.unitsOptions.celsius.name;
      }
    },
  },
};
</script>
