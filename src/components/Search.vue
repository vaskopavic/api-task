<script>
import { searchQueryRef } from '@/utils';

export default {
  name: "Search",
  data() {
    return {
      localQuery: ""
    };
  },
  watch: {
    localQuery() {
      this.updateSearch();
    }
  },
  methods: {
    updateSearch() {
      searchQueryRef.value = this.localQuery;
    }
  }
};
</script>

<template>
  <input v-model="localQuery" @input="updateSearch" v-if="this.$route.path === '/'" type="search"
    placeholder="Search stories by title, url or author" class="w-2/3 px-4 py-2 text-lg focus:outline-none" />
</template>
