<script setup lang="ts">
import type { ICategory } from "@/types";

defineEmits<{
  (e: "click", category: ICategory): void;
}>();
const props = defineProps<{ category: ICategory }>();
</script>
<template>
  <li class="Filter__category" @click="$emit('click', props.category)">
    {{ $t(`Categories.${props.category}`) }}
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
  transition: 300ms all ease;
  &:hover {
    color: $superspacegrey;
  }
}
</style>
