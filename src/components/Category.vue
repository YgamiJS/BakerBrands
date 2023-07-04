<script setup lang="ts">
import type { IProduct } from "@/types";

defineEmits<{
  (e: "click", category: IProduct["category"]): void;
}>();
const { category } = defineProps<{ category: IProduct["category"] }>();
</script>
<template>
  <li class="Filter__category" @click="$emit('click', category)">
    {{ $t(`Home.Categories.${category}`) }}
  </li>
</template>
<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.Filter__category {
  cursor: pointer;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: $black;
}
</style>
