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
                :checked="checked"
                @change="doSelect($event.target.checked)"
              />
              <span class="settings__option-label text-white"
                >{{ unitsOptions.farenheit.value }}º</span
              >
            </label>
          </form>
        </li>
        <li class="settings__row" v-if="userIsLogged">
          <button class="settings__item-title" @click.prevent="showAccountModal">
            Salir
          </button>
        </li>
        <li class="settings__row" v-if="userIsLogged">
          <button class="settings__item-title text-red" @click.prevent="showAccountModal">
            Borrar cuenta
          </button>
        </li>
        <li class="settings__row" v-else>
          <button class="settings__item-title" @click.prevent="showAccountModal">
            Acceder
          </button>
        </li>
      </ul>
    </nav>
    <sign-in-modal @show-account-form="showForm = $event" :show-account-form="showForm" />
    <p class="text-xxs version-text text-white">Version 1.0</p>
  </main>
</template>

<script>
// components
import Return from "@/components/_return.vue";
import GradientBackground from "@/components/_gradientBackground.vue";
import SignInForm from "@/components/_signInForm.vue";

export default {
  name: "Settings",
  components: {
    return: Return,
    background: GradientBackground,
    signInModal: SignInForm,
  },
  data() {
    return {
      title: "Ajustes",
      units: this.$store.state.units.selected,
      checked: false,
      unitsOptions: {
        celsius: {
          name: "celsius",
          unit: "metric",
          value: "c",
        },
        farenheit: {
          name: "farenheit",
          unit: "imperial",
          value: "f",
        },
      },
      userIsLogged: this.$store.state.user.isLogged,
      showForm: false,
    };
  },
  methods: {
    // convertToCelsius() {
    //   let weatherData = window.localStorage.getItem("user-weather-data");
    //   weatherData = JSON.parse(weatherData);
    //   console.log(weatherData);
    //   weatherData.current.temp = weatherData.current.temp * (9 / 5) + 32;
    //   console.log(weatherData);
    // },
    doSelect(checked) {
      switch (checked) {
        case true:
          this.$store.state.units.selected = this.unitsOptions.farenheit.unit;
          this.units = this.unitsOptions.farenheit.name;
          // this.convertToCelsius();
          break;
        case false:
          this.$store.state.units.selected = this.unitsOptions.celsius.unit;
          this.units = this.unitsOptions.celsius.name;
          break;
      }
    },
    showAccountModal() {
      this.showForm = true;
    },
  },
  mounted() {
    if (this.$store.state.units.selected === "imperial") {
      this.checked = true;
      this.units = this.unitsOptions.farenheit.name;
    } else {
      this.checked = false;
      this.units = this.unitsOptions.celsius.name;
    }
  },
};
</script>
