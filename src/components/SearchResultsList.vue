<script setup lang="ts">
import type { IProduct } from "@/types";

import SearchResult from "./SearchResult.vue";

const props = defineProps<{
  results: IProduct[];
}>();
</script>

<template>
  <ul class="results" v-if="props.results.length > 0">
    <SearchResult v-for="result of props.results" :key="result.id" :result="result" />
  </ul>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";
</style>
