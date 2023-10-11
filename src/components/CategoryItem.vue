<script setup lang="ts">
import type { ICategory } from "@/types";

defineEmits<{
  (e: "changeCategory", category: ICategory): void;
  (e: "click", category: ICategory): void;
}>();
const props = defineProps<{ activeCategory: ICategory; category: ICategory }>();
</script>
<template>
  <li
    class="Filter__category"
    :class="{ Filter__category_active: props.category == props.activeCategory }"
    @click="$emit('click', props.category), $emit('changeCategory', props.category)"
  >
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
  &_active,
  &:hover {
    color: $whiteGrey;
    font-weight: 500;
  }
}
</style>
