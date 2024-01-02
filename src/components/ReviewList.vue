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
      class="reviews-list__item"
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  grid-auto-rows: 100px;
  gap: 20px;

  @media (max-width: 500px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) and (min-width: 500px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 700px) and (min-width: 600px) {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
