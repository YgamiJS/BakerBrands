<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  percent: number;
  rating: number;
}>();

const percentComputed = computed<string>(() => `${props.percent}%`);
</script>

<template>
  <li class="RatingTable-ratings__rating">
    <span class="RatingTable-ratings__number">{{ props.rating }}</span>
    <div class="RatingTable-ratings__wrap-line">
      <div class="RatingTable-ratings__line"></div>
    </div>
  </li>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.RatingTable-ratings {
  &__rating {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__number {
    font-family: sans-serif;
  }

  &__wrap-line {
    width: 200px;
    height: 5px;
    background: $spacegrey;
    border-radius: 8px;
  }

  &__line {
    background: $graySkeletonLoading;
    width: v-bind(percentComputed);
    max-width: 200px;
    height: 5px;
    border-radius: 8px;
  }
}
</style>
