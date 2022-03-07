<template>
  <div class="user-account-modal" v-if="showUserForm">
    <div class="user-account-modal__wrap modal-sign-in">
      <h1 class="user-account-modal__title title-xxs text-center">
        {{ titleForm }}
      </h1>
      <form class="user-account-modal__form">
        <div class="user-account-modal__form-not-logged" v-if="!isLogged">
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
          <button type="submit" @click.prevent="doSignIn" v-else>Entrar</button>
          <div
            class="user-account-modal__form-not-logged-no-user"
            v-if="!isAddNewUser"
          >
            <span class="text-xxs">¿No tienes una cuenta?</span>
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
// supabase client
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ydyyzkyuojfqqeuyaagh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkeXl6a3l1b2pmcXFldXlhYWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYzODYxNjksImV4cCI6MTk2MTk2MjE2OX0.2zTcwxb_-8jB0dK6wySOItJI2gXdCo3hhazbiYfalRY";
const supabase = createClient(supabaseUrl, supabaseKey);

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
        createNewUser: "Crear una nueva cuenta",
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
    async doSignIn() {
      console.log("Signing in...");
      let { user, error } = await supabase.auth.signIn({
        email: this.user.email,
        password: this.user.password,
      });
      if (user) {
        this.$store.state.user.isLogged = true;
        this.$router.push({ name: "Home" });
      } else {
        console.log(error);
      }
      this.updateLocalsStores();
    },
    async doAddNewUser() {
      console.log("Creating new user...");
      if (this.myLocalStorage.getItem("favorite-locations")) {
        this.userFavoriteLocations =
          this.myLocalStorage.getItem("favorite-locations");
      }
      // SignUp
      let { user, error } = await supabase.auth.signUp({
        email: this.user.email,
        password: this.user.password,
      });
      if (user) {
        this.titleForm = this.title.signIn;
        this.isAddNewUser = false;
        const { data, error } = await supabase
          .from("user-favorite-locations")
          .insert([
            {
              id: user.id,
              favorite_locations: this.userFavoriteLocations,
            },
          ]);
        data ? console.log("Favorite locations saved") : console.log(error);
      } else {
        console.log(error);
      }
    },
    async doLogOut() {
      console.log("Log out...");
      let { error } = await supabase.auth.signOut();
      if (error) console.log(error);
      this.$store.state.user.isLogged = false;
      this.updateLocalsStores();
      this.$router.push({ name: "Home" });
    },
    showAddNewUserForm() {
      console.log("Show create new user.");
      this.isAddNewUser = true;
      this.titleForm = this.title.createNewUser;
    },
    hideUserForm() {
      console.log("User form closed.");
      this.$emit("showUserForm", this.closeForm);
    },
    updateLocalsStores() {
      // Update the list of favorite locations in the store
      this.$store.state.user.favoriteLocations = [];
      this.$store.state.favoriteLocations = [];
      // Update the list of favorite locations in the local storage
      this.myLocalStorage.removeItem("favorite-locations");
    },
  },
  mounted() {
    if (this.myLocalStorage.getItem("supabase.auth.token")) {
      this.titleForm = this.title.logOut;
    } else {
      this.titleForm = this.title.signIn;
    }
  },
};
</script>
