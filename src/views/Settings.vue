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
        <li class="settings__row text-white" v-if="userIsLogged">
          <button class="settings__item-title" @click.prevent="showUserModal">
            Salir
          </button>
        </li>
        <li class="settings__row" v-if="userIsLogged">
          <button
            class="settings__item-title text-red"
            @click.prevent="showUserModal"
          >
            Borrar cuenta
          </button>
        </li>
        <li class="settings__row" v-else>
          <button class="text-white settings__item-title" @click.prevent="showUserModal">
            Acceder
          </button>
        </li>
        <li class="settings__row">
          <p class="text-xxs version-text text-white text-end">Version 0.1</p>
        </li>
      </ul>
    </nav>
    <sign-in-modal
      @show-user-form="showForm = $event"
      :show-user-form="showForm"
    />
    <bottom-menu />
  </main>
</template>

<script>
// components
import Return from "@/components/_return.vue";
import GradientBackground from "@/components/_gradientBackground.vue";
import SignInForm from "@/components/_signInForm.vue";
import BottomMenuFixed from "@/components/_bottomMenuFixed.vue";

export default {
  name: "Settings",
  components: {
    return: Return,
    background: GradientBackground,
    signInModal: SignInForm,
    bottomMenu: BottomMenuFixed,
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
      userIsLogged: false,
      showForm: false,
      myLocalStorage: window.localStorage,
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
    showUserModal() {
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
    this.myLocalStorage.getItem("supabase.auth.token")
      ? (this.$store.state.user.isLogged = true)
      : (this.$store.state.user.isLogged = false);
    this.userIsLogged = this.$store.state.user.isLogged;
  },
};
</script>
