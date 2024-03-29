<template>
  <section>
    <background />
    <return :title="title" />
    <nav class="settings">
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
        <li class="settings__row">
          <span class="text-white">Cambiar modo</span>
          <form class="settings__options">
            <label ref="icon-mode" class="settings__wrap-option">
              <input
                class="settings__mode-toggle"
                type="checkbox"
                @change="toggleMode()"
              />
              <span class="settings__option-label icon-toggle-mode text-white"
                ><i
                  :class="
                    $store.state.isDarkMode
                      ? 'icon__sun-fill'
                      : 'icon__moon-fill'
                  "
                ></i
              ></span>
            </label>
          </form>
        </li>
        <li class="settings__row text-white" v-if="userIsLogged">
          <button @click.prevent="showUserModal">Salir</button>
          <i class="icon__logout"></i>
        </li>
        <li class="settings__row" v-else>
          <button class="text-white" @click.prevent="showUserModal">
            Acceder
          </button>
          <i class="icon__login text-white"></i>
        </li>
        <li class="settings__row settings--about">
          <p class="text-white">Acerca de...</p>
          <a :href="linkGit" target="_blank">
            <i class="icon__github text-white"></i>
          </a>
        </li>
        <li class="settings__row" v-if="userIsLogged">
          <button class="text-red" @click.prevent="doDeleteProfile()">
            Borrar cuenta
          </button>
          <i class="icon__cross text-red"></i>
        </li>
      </ul>
    </nav>
    <sign-in-modal
      @show-user-form="showForm = $event"
      :show-user-form="showForm"
    />
    <notification
      :show-notification="showNotification"
      :notifications-messages="notificationsMessages"
      :icon-type="iconType"
      @hide-notification="showNotification = $event"
    />
  </section>
</template>

<script>
// components
import Return from "@/components/_return.vue";
import GradientBackground from "@/components/_gradientBackground.vue";
import SignInForm from "@/components/_signInForm.vue";
import NotificationMessage from "@/components/_notificationMessage.vue";

export default {
  name: "Settings",
  components: {
    return: Return,
    background: GradientBackground,
    signInModal: SignInForm,
    notification: NotificationMessage,
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
      iconMode: "",
      linkGit: "https://github.com/simonemandola/app-weather",
      showNotification: false,
      notificationsMessages: [],
      iconType: "",
    };
  },
  methods: {
    toggleMode() {
      this.iconMode.classList.add("anim-toggle-mode");
      setTimeout(() => {
        this.iconMode.classList.remove("anim-toggle-mode");
      }, 500);
      this.$store.state.isDarkMode = !this.$store.state.isDarkMode;
      // Show notification
      this.showNotification = true;
      this.notificationsMessages = [];
      this.notificationsMessages.push(
        `Has cambiado a modo ${
          this.$store.state.isDarkMode ? "oscuro" : "claro"
        }`
      );
      this.iconType = "icon__info text-green";
    },
    doSelect(checked) {
      switch (checked) {
        case true:
          this.$store.state.units.selected = this.unitsOptions.farenheit.unit;
          this.units = this.unitsOptions.farenheit.name;
          break;
        case false:
          this.$store.state.units.selected = this.unitsOptions.celsius.unit;
          this.units = this.unitsOptions.celsius.name;
          break;
      }
      // Show notification
      this.showNotification = true;
      this.notificationsMessages = [];
      this.notificationsMessages.push(
        "Para visualizar los cambios, realiza una búsqueda."
      );
      this.iconType = "icon__info text-green";
    },
    showUserModal() {
      this.showForm = true;
    },
    doDeleteProfile() {
      console.log("Has borrado la cuenta.");
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
    this.iconMode = this.$refs["icon-mode"];
  },
};
</script>
