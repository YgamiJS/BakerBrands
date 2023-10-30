<script setup lang="ts">
import type { IRating } from "@/types";

import { computed } from "vue";

import RatingItem from "./RatingItem.vue";

const props = defineProps<{
  rating: IRating;
}>();

const sumRatings = computed<number>(() =>
  Object.values(props.rating.ratings).reduce((a, b) => a + b)
);
</script>

<template>
  <div class="RatingTable">
    <ul class="RatingTable-ratings">
      <RatingItem
        class="RatingTable-ratings__rating"
        v-for="(value, key) in props.rating.ratings"
        :key="key"
        :rating="+key"
        :percent="(value / sumRatings) * 100 || 0"
      />
    </ul>
  </div>
</template>

<style scoped lang="scss"></style>
