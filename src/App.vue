<template>
  <router-view v-slot="{ Component }">
    <transition name="slide" mode="in-out">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>
