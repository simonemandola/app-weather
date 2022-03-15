<template>
  <nav class="bottom-menu-fixed">
    <ul class="bottom-menu-fixed__ul">
      <li v-for="(item, key, i) in menu" :key="i">
        <router-link :to="{ name: item.link, query: { active: key } }">
          <i
            :class="
              item.isActive ? [item.iconActive, 'text-light-blue'] : item.icon
            "
          ></i>
          <div>
            <span
              class="text-xs"
              :class="{ 'text-light-blue': item.isActive }"
              v-show="item.isActive"
              >{{ item.text }}</span
            >
          </div>
        </router-link>
      </li>
    </ul>
    <div class="bottom-menu-fixed__inner-bg"></div>
    <img
      class="bottom-menu-fixed__wave"
      src="/img/wave-bottom-menu.svg"
      alt="wave bottom menu"
    />
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
  mounted() {
    console.log(this.$route.query.active);
    if (this.$route.query.active !== undefined) {
      switch (this.$route.query.active) {
        case this.menu.home.link.toLowerCase():
          this.menu.home.isActive = true;
          this.menu.settings.isActive = false;
          this.menu.search.isActive = false;
          this.menu.favorite.isActive = false;
          break;
        case this.menu.settings.link.toLowerCase():
          this.menu.home.isActive = false;
          this.menu.settings.isActive = true;
          this.menu.search.isActive = false;
          this.menu.favorite.isActive = false;
          break;
        case this.menu.search.link.toLowerCase():
          this.menu.home.isActive = false;
          this.menu.settings.isActive = false;
          this.menu.search.isActive = true;
          this.menu.favorite.isActive = false;
          break;
        case this.menu.favorite.link.toLowerCase():
          this.menu.home.isActive = false;
          this.menu.settings.isActive = false;
          this.menu.search.isActive = false;
          this.menu.favorite.isActive = true;
          break;
      }
    }
  },
};
</script>
