<template>
  <nav class="bottom-menu-fixed container">
    <ul class="bottom-menu-fixed__ul">
      <li v-for="(item, i) in menuDefault" :key="i">
        <router-link :to="item.link">
          <i :class="isActive ? item.iconActive : item.icon"></i>
          <span class="text-xs" v-if="isActive">item.text</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "_bottomMenu-Fixed",
  data() {
    return {
      menuDefault: {
        settings: {
          icon: "icon__settings",
          iconActive: "icon_settings-fill",
          text: "Ajustes",
          link: "Settings",
          isActive: false,
        },
        search: {
          icon: "icon__search",
          iconActive: "icon__search",
          text: "Buscar",
          link: "Search",
          isActive: false,
        },
        favorite: {
          icon: "icon__favorite",
          iconActive: "icon_favorite-fill",
          text: "Ajustes",
          link: "Favorite",
          isActive: false,
        },
      },
    };
  },
};
</script>
