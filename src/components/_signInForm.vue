<template>
  <div class="account-modal" v-if="showAccountForm">
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
            <input
              type="email"
              v-model="user.email"
              placeholder="@"
            />
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
            v-if="isCreateNewAccount"
            type="submit"
            @click.prevent="doCreateNewAccount"
          >
            Crear cuenta
          </button>
          <button type="submit" @click.prevent="doSignIn" v-else>Entrar</button>
          <div v-if="!isCreateNewAccount">
            <p class="text-xxs">¿No tienes una cuenta?</p>
            <button
              class="text-xxs"
              type="button"
              @click.prevent="showCreateNewAccount"
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
export default {
  name: "SignInForm",
  props: {
    showAccountForm: {
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
      isCreateNewAccount: false,
      showForm: true,
    };
  },
  methods: {
    doSignIn() {
      console.log("Sign In");
    },
    doCreateNewAccount() {
      console.log("Creating new account...");
    },
    doLogOut() {
      console.log("Log out...");
    },
    showCreateNewAccount() {
      console.log("Show create new account.");
      this.isCreateNewAccount = true;
      this.titleForm = this.title.createNewAccount;
    },
    hideUserForm() {
      console.log("Account form closed.");
      this.$emit("showAccountForm", this.closeForm);
    },
  },
  mounted() {
    this.$store.state.user.isLogged
      ? (this.titleForm = this.title.logOut)
      : (this.titleForm = this.title.signIn);
  },
};
</script>
