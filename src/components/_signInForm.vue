<template>
  <div class="user-account-modal" v-if="showUserForm">
    <div class="user-account-modal__wrap">
      <div class="user-account-modal__img fade-up">
        <img :src="`/img/${illustrationName}.png`" :alt="illustrationName" />
      </div>
      <h1
        class="user-account-modal__title title-xxs text-center fade-up delay-2"
      >
        {{ titleForm }}
      </h1>
      <form class="user-account-modal__form">
        <div v-if="isLogged">
          <button
            class="user-account-modal__btn fade-up delay-4"
            type="submit"
            @click.prevent="doLogOut"
          >
            Sí, quiero salir
          </button>
        </div>
        <div class="user-account-modal__form-not-logged fade-up delay-4" v-else>
          <label
            class="user-account-modal__form-label"
            :class="{ 'input-error': errors.username }"
          >
            <span class="text-xxxs">Username</span>
            <input type="text" v-model="user.username" placeholder="Username" />
            <i
              v-if="errors.username"
              class="icon__cross text-red form-icon-field"
            ></i>
            <i
              v-else-if="showIcon.username"
              class="icon__tick text-green form-icon-field"
            ></i>
          </label>
          <label
            class="user-account-modal__form-label"
            :class="{ 'input-error': errors.email }"
          >
            <span class="text-xxxs">Correo</span>
            <input
              type="email"
              v-model="user.email"
              placeholder="mi@correo.com"
            />
            <i
              v-if="errors.email"
              class="icon__cross text-red form-icon-field"
            ></i>
            <i
              v-else-if="showIcon.email"
              class="icon__tick text-green form-icon-field"
            ></i>
          </label>
          <label
            class="user-account-modal__form-label"
            :class="{ 'input-error': errors.password }"
          >
            <span class="text-xxxs">Password</span>
            <input
              type="password"
              v-model="user.password"
              placeholder="Password"
            />
            <i
              v-if="errors.password"
              class="icon__cross text-red form-icon-field"
            ></i>
            <i
              v-else-if="showIcon.password"
              class="icon__tick text-green form-icon-field"
            ></i>
          </label>
          <label
            class="user-account-modal__form-label"
            v-if="isAddNewUser"
            :class="{ 'input-error': errors.rePassword }"
          >
            <span class="text-xxxs">Repetir password</span>
            <input
              type="password"
              v-model="user.rePassword"
              placeholder="Repetir password"
            />
            <i
              v-if="errors.rePassword"
              class="icon__cross text-red form-icon-field"
            ></i>
            <i
              v-else-if="showIcon.rePassword"
              class="icon__tick text-green form-icon-field"
            ></i>
          </label>
          <button
            class="user-account-modal__btn"
            v-if="isAddNewUser"
            type="submit"
            @click.prevent="doAddNewUser"
          >
            Crear cuenta
          </button>
          <button
            class="user-account-modal__btn"
            type="submit"
            @click.prevent="doSignIn"
            v-else
          >
            Acceder
          </button>
          <div
            v-if="!isAddNewUser"
            class="text-xs text-center user-account-modal__divider-line"
          >
            o
          </div>
          <div
            class="user-account-modal__form-not-logged-no-user text-center"
            v-if="!isAddNewUser"
          >
            <span class="text-xxs">¿Eres nuevo?</span>
            <button
              class="text-xxs"
              type="button"
              @click.prevent="showAddNewUserForm"
            >
              Registrarse.
            </button>
          </div>
        </div>
        <button
          class="user-account-modal__btn-close"
          type="button"
          @click.prevent="hideUserForm"
        >
          <i class="icon__return"></i>
        </button>
      </form>
    </div>
    <error-notification
      :show-error="showErrorMessage"
      :errors-messages="errorsMessages"
      @hide-notification="showErrorMessage = $event"
    />
    <animations />
  </div>
</template>

<script>
// supabase client
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ydyyzkyuojfqqeuyaagh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkeXl6a3l1b2pmcXFldXlhYWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYzODYxNjksImV4cCI6MTk2MTk2MjE2OX0.2zTcwxb_-8jB0dK6wySOItJI2gXdCo3hhazbiYfalRY";
const supabase = createClient(supabaseUrl, supabaseKey);

// components
import Animations from "@/components-mixins/_animations.vue";
import ErrorNotification from "@/components/_errorNotification";

// mixins
import { isEmpty, areEqual } from "@/mixins/mixins.js";
import { checkRegExpPattern, emailPattern } from "@/mixins/_regExPattern.js";

export default {
  name: "SignInForm",
  props: {
    showUserForm: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    animations: Animations,
    errorNotification: ErrorNotification,
  },
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
        rePassword: "",
      },
      fieldMinLength: 6,
      title: {
        signIn: "¡Hola! Bienvenido de nuevo.",
        createNewUser: "Crear una nueva cuenta",
        logOut: "¿Seguro que quieres salir?",
      },
      titleForm: "",
      isLogged: this.$store.state.user.isLogged,
      isAddNewUser: false,
      showForm: true,
      myLocalStorage: window.localStorage,
      userFavoriteLocations: [],
      illustrations: {
        login: "login-illustration",
        newUser: "new-user-illustration",
        logout: "logout-illustration",
      },
      illustrationName: "",
      errors: {
        username: false,
        email: false,
        password: false,
        rePassword: false,
      },
      showIcon: {
        username: false,
        email: false,
        password: false,
        rePassword: false,
      },
      showErrorMessage: false,
      errorsMessages: [],
    };
  },
  computed: {
    isEmptyUsername() {
      return isEmpty(this.user.username);
    },
    usernameHasMinLength() {
      return this.user.username.length > this.fieldMinLength;
    },
    isEmptyEmail() {
      return isEmpty(this.user.email);
    },
    passwordHasMinLength() {
      return this.user.password.length >= this.fieldMinLength;
    },
    isEmptyPassword() {
      return isEmpty(this.user.password);
    },
    emailIsValidPattern() {
      return checkRegExpPattern(emailPattern, this.user.email);
    },
    passwordsAreEquals() {
      return areEqual(this.user.password, this.user.rePassword);
    },
    fieldsHaveErrors() {
      return (
        this.isEmptyUsername ||
        this.isEmptyEmail ||
        !this.passwordHasMinLength ||
        this.isEmptyPassword ||
        !this.emailIsValidPattern
      );
    },
  },
  methods: {
    manageErrors() {
      this.showErrorMessage = true;
      this.errorsMessages = [];
      if (this.isEmptyUsername || this.isEmptyEmail || this.isEmptyPassword) {
        this.errorsMessages.push("Rellena todos los campos.");
      }
      if (!this.passwordHasMinLength) {
        this.errorsMessages.push(
          "La password debe contener mínimo 6 caracteres."
        );
      }
      if (!this.emailIsValidPattern) {
        this.errorsMessages.push("El formato del email no es valido.");
      }
      if (this.isAddNewUser) {
        if (!this.passwordsAreEquals) {
          this.errorsMessages.push("Las contraseñas no coinciden.");
        }
      }
    },
    async doSignIn() {
      if (this.fieldsHaveErrors) {
        this.manageErrors();
      } else {
        console.log("Signing in...");
        let { user, error } = await supabase.auth.signIn({
          email: this.user.email,
          password: this.user.password,
        });
        if (user) {
          this.$store.state.user.isLogged = true;
          this.$router.push({
            name: "Home",
            query: { active: "home", isLogged: "1" },
          });
        } else {
          console.log(error);
        }
        this.updateLocalsStores();
      }
    },
    async doAddNewUser() {
      if (this.fieldsHaveErrors || !this.passwordsAreEquals) {
        this.manageErrors();
      } else {
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
      }
    },
    async doLogOut() {
      console.log("Log out...");
      let { error } = await supabase.auth.signOut();
      if (error) console.log(error);
      this.$store.state.user.isLogged = false;
      this.updateLocalsStores();
      this.$router.push({
        name: "Home",
        query: { active: "home", isLogged: "0" },
      });
    },
    showAddNewUserForm() {
      console.log("Show create new user.");
      this.isAddNewUser = true;
      this.titleForm = this.title.createNewUser;
      this.illustrationName = this.illustrations.newUser;
      this.user.username = "";
      this.user.email = "";
      this.user.password = "";
      this.errors.username = false;
      this.errors.email = false;
      this.errors.password = false;
      this.showIcon.username = false;
      this.showIcon.email = false;
      this.showIcon.password = false;
    },
    hideUserForm() {
      console.log("User form closed.");
      this.isAddNewUser = false;
      if (this.isLogged) {
        this.titleForm = this.title.logOut;
      } else {
        this.titleForm = this.title.signIn;
        this.illustrationName = this.illustrations.login;
      }
      this.user.username = "";
      this.user.email = "";
      this.user.password = "";
      this.user.rePassword = "";
      this.errors.username = false;
      this.errors.email = false;
      this.errors.password = false;
      this.errors.rePassword = false;
      this.showIcon.username = false;
      this.showIcon.email = false;
      this.showIcon.password = false;
      this.showIcon.rePassword = false;
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
      this.illustrationName = this.illustrations.logout;
    } else {
      this.titleForm = this.title.signIn;
      this.illustrationName = this.illustrations.login;
    }
  },
  watch: {
    user: {
      handler(newValue) {
        if (newValue.username) {
          this.showIcon.username = true;
          this.isEmptyUsername || !this.usernameHasMinLength
            ? (this.errors.username = true)
            : (this.errors.username = false);
        }
        if (newValue.email) {
          this.showIcon.email = true;
          this.isEmptyEmail || !this.emailIsValidPattern
            ? (this.errors.email = true)
            : (this.errors.email = false);
        }
        if (newValue.password) {
          this.showIcon.password = true;
          !this.passwordHasMinLength || this.isEmptyPassword
            ? (this.errors.password = true)
            : (this.errors.password = false);
          if (this.isAddNewUser) {
            this.showIcon.rePassword = true;
            this.passwordsAreEquals
              ? (this.errors.rePassword = false)
              : (this.errors.rePassword = true);
          }
        }
      },
      deep: true,
    },
  },
};
</script>
