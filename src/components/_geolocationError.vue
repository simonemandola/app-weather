<template>
  <article v-if="showGeolocationError" class="geolocation-error">
    <div class="geolocation-error__img fade-up">
      <img
        src="img/geolocation-error-illustration.png"
        alt="geolocation error illustration"
      />
    </div>
    <div class="geolocation-error__text">
      <h1
        class="geolocation-error__title title-xxs text-center fade-up delay-2"
      >
        ¡Oh no! Algo ha ido mal.
      </h1>
      <p class="text-s text-center fade-up delay-4">
        Para utilizar la aplicación es necesario que permitas utilizar tu
        ubicación actual.
      </p>
      <button
        class="geolocation-error__btn fade-up delay-6"
        type="button"
        @click.prevent="doCloseWindow"
      >
        Cerrar
      </button>
    </div>
  </article>
</template>

<script>
export default {
  name: "GeolocationError",
  props: {
    showGeolocationError: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    doCloseWindow() {
      return window.open(".", "_self").close();
    },
  },
};
</script>
