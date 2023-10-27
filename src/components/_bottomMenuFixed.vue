<template>
  <nav v-if="show" class="bottom-menu-fixed" :class="{'bg-light': !$store.state.isDarkMode}">
    <ul class="bottom-menu-fixed__ul">
      <li v-for="(item, key, i) in menu" :key="i">
        <router-link :to="{ name: item.link, query: { active: key } }">
          <i
            :class="[
              item.isActive
                ? [item.iconActive, textColorActiveView]
                : item.icon,
              { 'text-white': this.$store.state.isDarkMode },
            ]"
          ></i>
          <div v-if="item.isActive">
            <span
              class="text-xs text-menu"
              :class="item.isActive ? textColorActiveView : ''"
              >{{ item.text }}</span
            >
          </div>
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
        home: {
          icon: "icon__home",
          iconActive: "icon__home-fill",
          text: "Inicio",
          link: "Home",
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
          iconActive: "icon__favorite-checked",
          text: "Favoritos",
          link: "Favorite",
          isActive: false,
        },
        settings: {
          icon: "icon__settings",
          iconActive: "icon__settings-fill",
          text: "Ajustes",
          link: "Settings",
          isActive: false,
        },
      },
    };
  },
  computed: {
    show() {
      return this.$route.name !== "Screensplash";
    },
    textColorActiveView() {
      return this.$store.state.isDarkMode ? "text-white" : "text-light-blue";
    },
  },
  created() {
    this.menu.home.isActive = true;
  },
  watch: {
    "$route.query.active"() {
      switch (this.$route.query.active) {
        case this.menu.home.link.toLowerCase():
          this.menu.settings.isActive = false;
          this.menu.search.isActive = false;
          this.menu.favorite.isActive = false;
          this.menu.home.isActive = true;
          break;
        case this.menu.settings.link.toLowerCase():
          this.menu.home.isActive = false;
          this.menu.search.isActive = false;
          this.menu.favorite.isActive = false;
          this.menu.settings.isActive = true;
          break;
        case this.menu.search.link.toLowerCase():
          this.menu.home.isActive = false;
          this.menu.settings.isActive = false;
          this.menu.favorite.isActive = false;
          this.menu.search.isActive = true;
          break;
        case this.menu.favorite.link.toLowerCase():
          this.menu.home.isActive = false;
          this.menu.settings.isActive = false;
          this.menu.search.isActive = false;
          this.menu.favorite.isActive = true;
          break;
      }
    },
  },
};
</script>
