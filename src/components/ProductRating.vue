<script setup lang="ts">
import type { IProduct } from "@/types";

const props = defineProps<{
  rating: IProduct["rating"];
}>();
</script>

<template>
  <div class="rating" :class="$attrs.class">
    <div
      class="rating__star"
      v-for="n of 5"
      :key="n"
      :class="{ active: n <= props.rating.rating }"
    ></div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";
.rating {
  display: flex;
  justify-content: center;
  gap: 10px;

  &__star {
    background: $whiteGrey;
    width: 20px;
    height: 20px;
    clip-path: polygon(
      50% 0%,
      61% 35%,
      98% 35%,
      68% 57%,
      79% 91%,
      50% 70%,
      21% 91%,
      32% 57%,
      2% 35%,
      39% 35%
    );
    &.active {
      background: $yellow;
    }
  }
}
</style>
