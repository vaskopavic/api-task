<script setup>
import { RouterView } from 'vue-router'
import Search from './components/Search.vue'
</script>

<template>
  <header class="fixed top-0 flex items-center justify-start w-screen gap-10 px-10 py-4 bg-orange-500 h-fit">
    <RouterLink to="/">
      <div class="flex items-center justify-center gap-4">
        <div class="px-2 py-1 text-3xl text-white border-2 border-white select-none w-fit">H</div>
        <div class="text-xl">
          <span class="block">Search</span>
          <span class="block">Hacker News</span>
        </div>
      </div>
    </RouterLink>
    <Search />
  </header>
  <RouterView />
</template>