<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "setRating", rating: number): void;
}>();

const props = defineProps<{
  grade: number;
  maxStars: number;
}>();

const stars = ref<number>(props.grade);

const rate = (star: number) => {
  if (typeof star === "number" && star <= props.maxStars && star >= 0) {
    stars.value = stars.value === star ? star - 1 : star;
    emit("setRating", stars.value);
  }
};
</script>

<template>
  <div class="rating" @click.stop>
    <ul class="list">
      <li
        v-for="star in maxStars"
        @click="rate(star)"
        :class="{ active: star <= stars }"
        :key="star"
        class="star"
      >
        <i :class="star <= stars ? 'fas fa-star' : 'far fa-star'">.</i>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.rating {
  .list {
    display: inline-block;
    padding: 0;
    margin: 0 20px 0 0;
    &:hover {
      .star {
        background: #ffe100;
        color: #ffe100;
      }
    }
    .star {
      display: inline-block;
      background: grey;
      color: grey;
      font-size: 35px;
      transition: all 0.2s ease-in-out;
      width: 40px;
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
      cursor: pointer;

      &:hover {
        ~ .star:not(.active) {
          color: inherit;
        }
      }
      &:first-child {
        margin-left: 0;
      }
      &.active {
        background: #ffe100;
        color: #ffe100;
      }
    }
  }
}
</style>
