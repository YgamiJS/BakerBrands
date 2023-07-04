<script setup lang="ts">
import type { ICategories, IProduct } from "@/types";

import Category from "./Category.vue";

const { categories, isOpenFilterButton, onClick } = defineProps<{
  categories: ICategories;
  isOpenFilterButton: boolean;
  onClick: (category?: IProduct["category"]) => void;
}>();
</script>

<template>
  <ul class="Filter__categories-list" :class="{ active: isOpenFilterButton }">
    <Category
      v-for="category of categories.categories"
      :key="category"
      :category="category"
      @click="onClick"
    />
  </ul>
</template>

<style scoped lang="scss">
.Filter__categories-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.Filter__categories-list.active {
  display: flex !important;
  flex-direction: column;
  padding: 5px 0;
}

@media (max-width: 950px) {
  .Filter__categories-list {
    display: none;
  }
}
</style>
