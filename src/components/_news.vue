<template>
  <div class="article-news">
    <h2 class="subtitle-xs">News</h2>
    <article class="article-news__article">
      <div class="article-news__image">
        <img
          src="https://zambianfootball.co.zm/wp-content/uploads/2022/01/breaking-news.jpg"
          alt=""
        />
      </div>
      <div class="article-news__text">
        <h1 class="title-xxs text-bold article-news__title">
          CDC eases mask recommendations, other restrictions, for most Americans
          - The Washington Post
        </h1>
        <p class="text-xxs article-news__description">
          The new guidelines reflect the view that the United States has entered
          a potentially less dangerous phase of the pandemic.
        </p>
      </div>
      <div class="text-xs article-news__link">Ir a la noticia >></div>
    </article>
    <article class="article-news__article">
      <div class="article-news__image">
        <img
          src="https://zambianfootball.co.zm/wp-content/uploads/2022/01/breaking-news.jpg"
          alt=""
        />
      </div>
      <div class="article-news__text">
        <h1 class="title-xxs text-bold article-news__title">
          CDC eases mask recommendations, other restrictions, for most Americans
          - The Washington Post
        </h1>
        <p class="text-xxs article-news__description">
          The new guidelines reflect the view that the United States has entered
          a potentially less dangerous phase of the pandemic.
        </p>
      </div>
      <div class="text-xs article-news__link">Ir a la noticia >></div>
    </article>
    <article class="article-news__article">
      <div class="article-news__image">
        <img
          src="https://zambianfootball.co.zm/wp-content/uploads/2022/01/breaking-news.jpg"
          alt=""
        />
      </div>
      <div class="article-news__text">
        <h1 class="title-xxs text-bold article-news__title">
          CDC eases mask recommendations, other restrictions, for most Americans
          - The Washington Post
        </h1>
        <p class="text-xxs article-news__description">
          The new guidelines reflect the view that the United States has entered
          a potentially less dangerous phase of the pandemic.
        </p>
      </div>
      <div class="text-xs article-news__link">Ir a la noticia >></div>
    </article>
  </div>
</template>

<script>
// constants
const API_URL = "https://newsapi.org/v2/everything?";
const QUERY = "q=";
const DATE_FROM = "&from=";
const SORT_BY = "&sortBy=popularity";
const COUNTRY = "&country=es";
const PAGE_SIZE = "&pageSize=10";
const API_KEY = "&apiKey=";
export default {
  name: "News",
  data() {
    return {
      apiKey: "a515538b10f84c498a02f9cb900f7035",
      query: this.$store.state.locationData[0].name,
      dateFrom: new Date() - 2,
      newsData: [],
      max: 19,
      min: 0,
    };
  },
  methods: {
    async getNews() {
      try {
        const res = await fetch(
          API_URL +
            QUERY +
            this.query +
            DATE_FROM +
            this.dateFrom +
            SORT_BY +
            COUNTRY +
            PAGE_SIZE +
            API_KEY +
            this.apiKey
        );
        this.newsData = await res.json();
      } catch (e) {
        console.warn(e);
      }
      console.log(this.newsData.articles);
    },
  },
  mounted() {
    // this.getNews();
  },
};
</script>
