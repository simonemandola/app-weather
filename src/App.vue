<template>
  <router-view v-slot="{ Component }">
    <transition name="fade-id" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>
