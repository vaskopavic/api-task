<script>
import axios from 'axios';
import Story from '../components/Story.vue'
import { searchQueryRef } from '@/utils';

export default {
  name: "home",
  components: {
    Story
  },
  data() {
    return {
      err: "",
      stories: [],
    };
  },
  computed: {
    activeSearchQuery() {
      return searchQueryRef.value;
    }
  },
  watch: {
    activeSearchQuery(newQuery) {
      this.searchStories(newQuery);
    }
  },
  created() {
    this.fetchTopStories();
  },
  methods: {
    async fetchTopStories() {
      try {
        if (navigator.onLine) {
          const response = await axios.get("https://hacker-news.firebaseio.com/v0/topstories.json");
          const data = response.data.slice(0, 25);
          const stories = await Promise.all(
            data.map(id => axios.get(`https://hn.algolia.com/api/v1/items/${id}`))
          );
          this.stories = stories.map(res => res.data);

          this.cacheApiResponse("top-stories", this.stories);
        } else {
          const cachedStories = await this.getCachedApiResponse("top-stories");
          if (cachedStories) {
            this.stories = cachedStories;
          } else {
            console.error("No cached stories available.");
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    async searchStories(query) {
      if (query.trim() === "") {
        this.fetchTopStories();
        return;
      }
      try {
        if (navigator.onLine) {
          const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=${query}&tags=story`);
          this.stories = response.data.hits.slice(0, 25).map(hit => ({
            ...hit,
            id: hit.objectID
          }));


          this.cacheApiResponse(`search-${query}`, this.stories);
        } else {
          const cachedResults = await this.getCachedApiResponse(`search-${query}`);
          if (cachedResults) {
            this.stories = cachedResults;
          } else {
            console.error("No cached search results available.");
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    async cacheApiResponse(key, data) {
      const cache = await caches.open("api-cache");
      const response = new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });
      await cache.put(key, response);
    },
    async getCachedApiResponse(key) {
      const cache = await caches.open("api-cache");
      const cachedResponse = await cache.match(key);
      if (cachedResponse) {
        return await cachedResponse.json();
      }
      return null;
    }
  }
};
</script>


<template>
  <main class="flex flex-col items-center justify-center min-h-screen pt-36">
    <Story v-for="story in stories" :key="story.id" :story="story" />
  </main>
</template>
