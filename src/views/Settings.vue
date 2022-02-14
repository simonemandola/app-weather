<template>
  <main>
    <return :title="title" />
    <nav class="settings container">
      <ul>
        <li class="settings__row">
          <span class="settings__item-title">{{ units }}</span>
          <form class="settings__options">
            <label class="settings__wrap-option">
              <span class="settings__option-label"
                >{{ unitsOptions.celsius.value }}º</span
              >
              <input
                class="settings__input toggle"
                type="checkbox"
                @change="doSelect($event.target.checked)"
              />
              <span class="settings__option-label"
                >{{ unitsOptions.farenheit.value }}º</span
              >
            </label>
          </form>
        </li>
      </ul>
    </nav>
  </main>
</template>

<script>
// components
import Return from "@/components/_return.vue";

export default {
  name: "Settings",
  components: {
    return: Return,
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
