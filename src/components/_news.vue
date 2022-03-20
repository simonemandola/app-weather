<template>
  <div class="article-news">
    <div v-if="existArticles">
      <h2 class="subtitle-xs article-news__main-title fade-up">
        Entérate de lo más nuevo
      </h2>
      <article
        class="article-news__article fade-up"
        v-for="(singleArticle, i) in allArticles"
        :key="i"
        :style="{ 'animation-delay': i * 2 + '00ms' }"
      >
        <div class="article-news__image">
          <img :src="singleArticle.urlToImage" :alt="singleArticle.title" />
        </div>
        <div class="article-news__text">
          <h1 class="title-xxs text-bold article-news__title">
            {{ singleArticle.title }}
          </h1>
          <p class="text-xxs article-news__description">
            {{ singleArticle.description }}
          </p>
        </div>
        <div class="text-xs article-news__link">
          <a :href="singleArticle.url" target="_blank"
            >Ir a la noticia <i class="icon__logout"></i
          ></a>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
// constants
const PROXY_URL = process.env.VUE_APP_PROXY_URL;
const API_URL = process.env.VUE_APP_NEWS_API_URL;
const QUERY = "q=";
const DATE_FROM = "&from=";
const SORT_BY = "&sortBy=publishedAt";
const COUNTRY = "&language=es";
const PAGE_SIZE = "&pageSize=10";
const API_KEY = `&apiKey=${process.env.VUE_APP_API_KEY_NEWS}`;
export default {
  name: "News",
  data() {
    return {
      query: "",
      dateFrom: new Date() - 2,
      allArticles: [],
      max: 19,
      min: 0,
    };
  },
  computed: {
    existArticles() {
      return this.allArticles?.length > 0;
    },
  },
  methods: {
    async getNews() {
      try {
        const res = await fetch(
          PROXY_URL +
            API_URL +
            QUERY +
            this.query +
            COUNTRY +
            DATE_FROM +
            this.dateFrom +
            SORT_BY +
            PAGE_SIZE +
            API_KEY
        );
        this.allArticles = await res.json();
        console.log("News data downloaded successfully!");
      } catch (e) {
        console.warn(e);
      }
      this.allArticles = this.allArticles.articles;
      this.$store.state.newsArticles = this.allArticles;
    },
  },
  mounted() {
    this.allArticles = this.$store.state.newsArticles;
    this.query = this.$store.state.locationData[0].name;
    if (
      this.$store.state.previousData.id !== this.$store.state.locationData[0].id
    ) {
      this.getNews();
      // update previous location id
      this.$store.state.previousData.id = this.$store.state.locationData[0].id;
    }
  },
};
</script>
