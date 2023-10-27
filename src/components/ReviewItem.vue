<script setup lang="ts">
import type { IReview } from "@/types";

const props = defineProps<{
  isRemainder: boolean;
  remainderCount?: number;
  review: IReview;
  reviewIndex: number;
}>();

const emit = defineEmits<{
  (e: "setCurrentReview", index: number): void;
  (e: "toggleIsOpen"): void;
}>();
</script>

<template>
  <button class="reviews-list__button" :key="review.id" @click="emit('toggleIsOpen')">
    <span class="reviews-list__count" v-if="props.isRemainder">+ {{ props?.remainderCount }}</span>
    <img
      class="reviews-list__img"
      v-else
      :src="review.images[0]"
      @click="emit('setCurrentReview', props.reviewIndex)"
    />
  </button>
</template>

<style scoped lang="scss">
.reviews-list {
  &__button {
    background: none;
    transition: 100ms all ease;
    cursor: pointer;
    border-radius: 10px;
    display: inline-flex;
    outline: none;
    border: none;

    @media (min-width: 880px) {
      &:hover {
        filter: brightness(70%);
      }
    }
    &:active {
      filter: brightness(70%);
    }
  }

  &__count {
    align-items: center;
    justify-content: center;
  }

  &__img {
    border-radius: 10px;
    width: 100px;
    height: 100%;
    object-fit: cover;
  }
}
</style>
