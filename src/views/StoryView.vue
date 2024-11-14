<script>
import axios from 'axios';
import { HeartIcon, UserIcon, ClockIcon, ChatBubbleLeftIcon } from '@heroicons/vue/24/outline';
import Comment from '../components/Comment.vue';

export default {
  name: "story",
  data() {
    return {
      story: {},
    };
  },
  created() {
    this.fetchStory();
  },
  methods: {
    async fetchStory() {
      const cacheKey = `story-${this.$route.params.id}`;
      try {
        if (navigator.onLine) {
          const response = await axios.get(`https://hn.algolia.com/api/v1/items/${this.$route.params.id}`);
          this.story = response.data;

          await this.cacheApiResponse(cacheKey, { story: this.story });
        } else {
          const cachedStory = await this.getCachedApiResponse(cacheKey);
          if (cachedStory) {
            this.story = cachedStory.story;
          } else {
            console.error("No cached story available.");
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
  },
  components: {
    HeartIcon,
    UserIcon,
    ClockIcon,
    ChatBubbleLeftIcon,
    Comment
  }
};
</script>

<template>
  <main class="flex flex-col items-center justify-start min-h-screen pt-36">
    <div class="w-2/3 p-4 bg-white">
      <div class="text-lg font-semibold">{{ story.title }}
        <a :href="'//' + story.url" target="_blank" class="text-sm text-gray-400 hover:text-gray-500 hover:underline">
          ({{ $utils.getHostFromUrl(story.url) }})
        </a>
      </div>
      <span class="inline-block mb-8 text-gray-500">
        <HeartIcon class="inline-block size-4" /> {{ story.points }} points |
        <UserIcon class="inline-block size-4" /> {{ story.author }} |
        <ClockIcon class="inline-block size-4" /> {{ $utils.formatTimeAgo(story.created_at) }} |
        <ChatBubbleLeftIcon class="inline-block size-4" /> {{ $utils.countComments(story) }} comments
      </span>
      <div v-for="comment in story.children" :key="comment.id">
        <Comment :comment="comment" />
      </div>
    </div>
  </main>
</template>
