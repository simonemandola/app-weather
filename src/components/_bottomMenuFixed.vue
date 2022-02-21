<template>
  <nav class="bottom-menu-fixed">
    <ul class="bottom-menu-fixed__ul">
      <li v-for="(item, key, i) in menu" :key="i">
        <router-link :to="{ name: item.link, query: { active: key } }">
          <i :class="item.isActive ? item.iconActive : item.icon"></i>
          <span class="text-xs" v-if="item.isActive">item.text</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "BottomMenuFixed",
  data() {
    return {
      menu: {
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
