<template>
  <router-view v-slot="{ Component }">
    <transition name="" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>
