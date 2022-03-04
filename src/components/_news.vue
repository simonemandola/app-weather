<template>
  <div class="article-news" v-if="existArticles">
    <h2 class="subtitle-xs">Últimas noticias</h2>
    <article
      class="article-news__article"
      v-for="(singleArticle, i) in allArticles"
      :key="i"
    >
      <div class="article-news__image">
        <img
          :src="singleArticle.urlToImage"
          :alt="singleArticle.title"
        />
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
        <a :href="singleArticle.url" target="_blank">Ir a la noticia >></a>
      </div>
    </article>
  </div>
</template>

<script>
// constants
const API_URL = "https://newsapi.org/v2/everything?";
const QUERY = "q=";
const DATE_FROM = "&from=";
const SORT_BY = "&sortBy=popularity";
const COUNTRY = "&language=es";
const PAGE_SIZE = "&pageSize=10";
const API_KEY = "&apiKey=";
export default {
  name: "News",
  data() {
    return {
      apiKey: "a515538b10f84c498a02f9cb900f7035",
      query: this.$store.state.locationData[0].name,
      dateFrom: new Date() - 2,
      allArticles: [],
      max: 19,
      min: 0,
    };
  },
  computed: {
    existArticles() {
      return this.allArticles.length > 0;
    },
  },
  methods: {
    async getNews() {
      try {
        const res = await fetch(
          API_URL +
            QUERY +
            this.query +
            COUNTRY +
            DATE_FROM +
            this.dateFrom +
            SORT_BY +
            PAGE_SIZE +
            API_KEY +
            this.apiKey
        );
        this.allArticles = await res.json();
      } catch (e) {
        console.warn(e);
      }
      this.allArticles = this.allArticles.articles;
    },
  },
  mounted() {
    this.getNews();
  },
};
</script>
