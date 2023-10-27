<script setup lang="ts">
import type { IReview } from "@/types";

import ReviewItem from "./ReviewItem.vue";

const props = defineProps<{
  reviews: IReview[];
}>();

const emit = defineEmits<{
  (e: "setCurrentReview", index: number): void;
  (e: "toggleIsOpen"): void;
}>();
</script>

<template>
  <div class="reviews-list" v-if="props?.reviews?.length && props?.reviews?.length >= 1">
    <ReviewItem
      v-for="review of props?.reviews.slice(0, 11)"
      :is-remainder="
        props?.reviews?.indexOf(review) == props?.reviews.length - 1 &&
        props?.reviews.length >= 2 &&
        props?.reviews.length - props?.reviews.slice(0, 11).length >= 1
      "
      :key="review.id"
      :review="review"
      :remainder-count="props?.reviews.length - props?.reviews.slice(0, 11).length"
      @toggle-is-open="emit('toggleIsOpen')"
      @set-current-review="(index: number) => emit('setCurrentReview', index)"
      :review-index="props?.reviews?.indexOf(review)"
    />
  </div>
</template>

<style scoped lang="scss">
.reviews-list {
  display: flex;
  gap: 20px;
  width: 100%;
  height: 100px;
}
</style>
