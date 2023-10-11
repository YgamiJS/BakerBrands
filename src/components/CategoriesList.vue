<script setup lang="ts">
import type { ICategories, ICategory } from "@/types";

import { ref } from "vue";

import CategoryItem from "./CategoryItem.vue";

defineEmits<{
  (e: "click", category?: ICategory): void;
}>();

const props = defineProps<{
  categories: ICategories;
  isOpenFilterButton: boolean;
}>();

const activeCategory = ref<ICategory>("all");

const changeActiveCategory = (category: ICategory) => (activeCategory.value = category);
</script>

<template>
  <ul class="Filter__categories-list" :class="{ active: props.isOpenFilterButton }">
    <CategoryItem
      v-for="category of props.categories.categories"
      :key="category"
      :category="category"
      :active-category="activeCategory"
      @change-category="changeActiveCategory"
      @click="(category) => $emit('click', category)"
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
