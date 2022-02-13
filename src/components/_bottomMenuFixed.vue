<template>
  <nav class="bottom-menu-fixed">
    <ul>
      <li v-for="(item, i) in menuDefault" :key="i">
        <router-link :to="item.link">
          <i :class="isActive ? item.icon : item.iconActive"></i>
          <span v-if="isActive">item.text</span>
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
      isActive: false,
      menuDefault: {
        settings: {
          icon: "icon__settings",
          iconActive: "icon_settings-fill",
          text: "Ajustes",
          link: "Settings",
        },
        search: {
          icon: "icon__search",
          iconActive: this.icon,
          text: "Buscar",
          link: "Search",
        },
        favorite: {
          icon: "icon__favorite",
          iconActive: "icon_favorite-fill",
          text: "Ajustes",
          link: "Favorite",
        },
      },
    };
  },
};
</script>
