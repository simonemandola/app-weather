<template>
  <div class="account-modal" v-if="showUserForm">
    <div class="account-modal__wrap modal-sign-in">
      <h1 class="title-xxs text-center">{{ titleForm }}</h1>
      <form>
        <div v-if="!isLogged">
          <label>
            <span class="text-xxxs">Username</span>
            <input type="text" v-model="user.username" placeholder="Username" />
          </label>
          <label>
            <span class="text-xxxs">Correo</span>
            <input type="email" v-model="user.email" placeholder="@" />
          </label>
          <label>
            <span class="text-xxxs">Password</span>
            <input
              type="password"
              v-model="user.password"
              placeholder="Password"
            />
          </label>
          <button
            v-if="isAddNewUser"
            type="submit"
            @click.prevent="doAddNewUser"
          >
            Crear cuenta
          </button>
          <button type="submit" @click.prevent="doLogIn" v-else>Entrar</button>
          <div v-if="!isAddNewUser">
            <p class="text-xxs">¿No tienes una cuenta?</p>
            <button
              class="text-xxs"
              type="button"
              @click.prevent="showAddNewUserForm"
            >
              Crear nueva cuenta.
            </button>
          </div>
          <div>
            <button
              class="text-xxs"
              type="button"
              @click.prevent="hideUserForm"
            >
              Cerrar
            </button>
          </div>
        </div>
        <div v-else>
          <button type="submit" @click.prevent="doLogOut">
            Sí, quiero salir
          </button>
          <button type="button" @click.prevent="hideUserForm">No</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// supabase
import { addNewUser, logIn } from "@/supabase/fetchFunctions.js";

export default {
  name: "SignInForm",
  props: {
    showUserForm: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      title: {
        signIn: "Acceder",
        createNewAccount: "Crear una nueva cuenta",
        logOut: "¿Seguro que quieres salir?",
      },
      titleForm: "",
      isLogged: this.$store.state.user.isLogged,
      isAddNewUser: false,
      showForm: true,
      myLocalStorage: window.localStorage,
      userFavoriteLocations: [],
    };
  },
  methods: {
    async doLogIn() {
      console.log("Logging in...");
      const userData = await logIn(undefined, undefined, this.user.username);
      this.$store.state.user.isLogged = true;
      this.$store.state.user.favoriteLocations = JSON.parse(
        userData[0].favorite_locations
      );
    },
    async doAddNewUser() {
      console.log("Creating new user...");
      if (this.myLocalStorage.getItem("favorite-locations")) {
        this.userFavoriteLocations =
          this.myLocalStorage.getItem("favorite-locations");
      }
      const newUser = {
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
        favorite_locations: this.userFavoriteLocations,
      };
      await addNewUser(undefined, undefined, JSON.stringify(newUser));
    },
    doLogOut() {
      console.log("Log out...");
      this.$store.state.user.isLogged = false;
      this.$store.state.user.favoriteLocations = [];
    },
    showAddNewUserForm() {
      console.log("Show create new account.");
      this.isAddNewUser = true;
      this.titleForm = this.title.createNewAccount;
    },
    hideUserForm() {
      console.log("Account form closed.");
      this.$emit("showUserForm", this.closeForm);
    },
  },
  mounted() {
    this.$store.state.user.isLogged
      ? (this.titleForm = this.title.logOut)
      : (this.titleForm = this.title.signIn);
  },
};
</script>
