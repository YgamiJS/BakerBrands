<script setup lang="ts">
import type { ICategories, IProduct } from "@/types";

import CategoryItem from "./CategoryItem.vue";

const props = defineProps<{
  categories: ICategories;
  isOpenFilterButton: boolean;
  onClick: (category?: IProduct["category"]) => void;
}>();
</script>

<template>
  <ul class="Filter__categories-list" :class="{ active: props.isOpenFilterButton }">
    <CategoryItem
      v-for="category of props.categories.categories"
      :key="category"
      :category="category"
      @click="props.onClick"
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
